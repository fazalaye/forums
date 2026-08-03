#!/usr/bin/env node
/**
 * keyword-research-mcp
 * Serveur MCP de recherche de mots-cles 100% gratuit.
 * Sources : Google Autocomplete, Google Trends, Google Search Console, Bing Webmaster Tools.
 * Optimise par defaut pour le francophone ouest-africain (fr / SN).
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

import { suggest, expandSeed, deepExpand } from "./lib/google.js";
import * as trends from "./lib/trends.js";
import * as gsc from "./lib/gsc.js";
import * as bing from "./lib/bing.js";
import { scoreBatch, clusterByToken, classifyIntent } from "./lib/score.js";

const DEFAULT_SITE = process.env.GSC_DEFAULT_SITE || null;

const TOOLS = [
  {
    name: "keyword_suggest",
    description:
      "Suggestions Google Autocomplete pour une requete. Rapide, gratuit, sans cle. Donne le vocabulaire reel des internautes.",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "La requete de depart" },
        hl: { type: "string", description: "Langue, defaut 'fr'" },
        gl: { type: "string", description: "Pays, defaut 'sn' (Senegal). Ex: ci, fr, ml" },
      },
      required: ["query"],
    },
  },
  {
    name: "keyword_expand",
    description:
      "Expansion massive d'un mot-cle seed : alphabet soup (a-z), prefixes de questions francais, modificateurs commerciaux et modificateurs geo Afrique de l'Ouest (senegal, fcfa, wave...). Retourne des centaines de mots-cles longue traine. C'est l'outil principal de decouverte.",
    inputSchema: {
      type: "object",
      properties: {
        seed: { type: "string" },
        hl: { type: "string" },
        gl: { type: "string" },
        depth: { type: "number", description: "1 ou 2. 2 = expansion recursive (plus lent, beaucoup plus de resultats)" },
        useAlphabet: { type: "boolean" },
        useQuestions: { type: "boolean" },
        useCommercial: { type: "boolean" },
        useGeo: { type: "boolean" },
      },
      required: ["seed"],
    },
  },
  {
    name: "keyword_questions",
    description:
      "Uniquement les questions que les gens posent autour d'un sujet (comment, pourquoi, combien, c'est quoi...). Ideal pour construire un plan d'article ou une FAQ.",
    inputSchema: {
      type: "object",
      properties: { seed: { type: "string" }, gl: { type: "string" } },
      required: ["seed"],
    },
  },
  {
    name: "trends_over_time",
    description:
      "Google Trends : evolution de l'interet sur 12 mois pour un ou plusieurs termes, avec detection hausse/baisse/emergent. Permet de comparer des synonymes (ex: 'IA' vs 'intelligence artificielle') sur un pays precis.",
    inputSchema: {
      type: "object",
      properties: {
        keywords: { type: "array", items: { type: "string" }, description: "1 a 5 termes" },
        geo: { type: "string", description: "SN, CI, ML, FR, ou '' pour le monde" },
        months: { type: "number" },
      },
      required: ["keywords"],
    },
  },
  {
    name: "trends_by_region",
    description: "Google Trends : ou un terme est le plus recherche (par pays ou par region).",
    inputSchema: {
      type: "object",
      properties: {
        keywords: { type: "array", items: { type: "string" } },
        geo: { type: "string", description: "'' = comparaison mondiale par pays ; 'SN' = regions du Senegal" },
        resolution: { type: "string", enum: ["COUNTRY", "REGION", "CITY"] },
      },
      required: ["keywords"],
    },
  },
  {
    name: "trends_related",
    description: "Google Trends : requetes associees (top + en forte hausse). Excellent detecteur de sujets emergents.",
    inputSchema: {
      type: "object",
      properties: { keyword: { type: "string" }, geo: { type: "string" } },
      required: ["keyword"],
    },
  },
  {
    name: "bing_volume",
    description:
      "Volume de recherche mensuel CHIFFRE via Bing Webmaster Tools (gratuit). Seule source gratuite qui donne de vrais nombres. Necessite BING_WEBMASTER_API_KEY.",
    inputSchema: {
      type: "object",
      properties: {
        keywords: { type: "array", items: { type: "string" }, description: "Liste de mots-cles (max ~30 par appel)" },
        country: { type: "string", description: "fr, sn, ci... defaut fr" },
        language: { type: "string", description: "defaut fr-FR" },
      },
      required: ["keywords"],
    },
  },
  {
    name: "bing_related",
    description: "Mots-cles associes selon Bing, avec impressions. Necessite BING_WEBMASTER_API_KEY.",
    inputSchema: {
      type: "object",
      properties: { query: { type: "string" }, country: { type: "string" } },
      required: ["query"],
    },
  },
  {
    name: "gsc_sites",
    description: "Liste les sites accessibles dans Google Search Console avec le compte de service configure.",
    inputSchema: { type: "object", properties: {} },
  },
  {
    name: "gsc_queries",
    description:
      "Les VRAIES requetes Google qui amenent des impressions et des clics sur le site (clics, impressions, CTR, position). Source de verite absolue, personne d'autre n'y a acces.",
    inputSchema: {
      type: "object",
      properties: {
        siteUrl: { type: "string", description: "ex: sc-domain:promptforums.org (defaut: GSC_DEFAULT_SITE)" },
        days: { type: "number", description: "defaut 90" },
        country: { type: "string", description: "code ISO-3 minuscule: sen, civ, fra" },
        filterContains: { type: "string" },
        rowLimit: { type: "number" },
      },
    },
  },
  {
    name: "gsc_striking_distance",
    description:
      "Le filon le plus rentable : les requetes deja en position 4-20 avec beaucoup d'impressions. Une optimisation on-page suffit souvent a les faire monter. Trie par clics potentiels gagnables.",
    inputSchema: {
      type: "object",
      properties: {
        siteUrl: { type: "string" },
        days: { type: "number" },
        minImpressions: { type: "number" },
      },
    },
  },
  {
    name: "score_opportunities",
    description:
      "Score et classe une liste de mots-cles selon une heuristique transparente : longue traine, intention (transactionnel/comparatif/informationnel), ancrage geo Afrique de l'Ouest, volume Bing si fourni, tendance si fournie. Retourne les raisons du score. Ce n'est PAS un KD Ahrefs : c'est une priorisation explicable.",
    inputSchema: {
      type: "object",
      properties: {
        keywords: {
          type: "array",
          items: {
            type: "object",
            properties: {
              keyword: { type: "string" },
              volume: { type: "number" },
              trend: { type: "string" },
              inGsc: { type: "boolean" },
              gscPosition: { type: "number" },
            },
            required: ["keyword"],
          },
        },
        limit: { type: "number" },
      },
      required: ["keywords"],
    },
  },
  {
    name: "cluster_keywords",
    description:
      "Regroupement lexical rapide d'une grande liste de mots-cles par terme pivot. Sert a degrossir avant de faire le regroupement semantique fin toi-meme.",
    inputSchema: {
      type: "object",
      properties: {
        keywords: { type: "array", items: { type: "string" } },
        minClusterSize: { type: "number" },
      },
      required: ["keywords"],
    },
  },
  {
    name: "full_research",
    description:
      "PIPELINE COMPLET en un appel : expansion Autocomplete -> tendances Trends -> volumes Bing (si cle) -> croisement Search Console (si configure) -> scoring -> clusters. Utilise-le quand on te demande 'fais une recherche de mots-cles sur X'.",
    inputSchema: {
      type: "object",
      properties: {
        seed: { type: "string" },
        gl: { type: "string", description: "defaut sn" },
        geo: { type: "string", description: "geo Trends, defaut SN" },
        siteUrl: { type: "string", description: "site GSC a croiser (optionnel)" },
        bingCountry: { type: "string", description: "defaut fr" },
        maxBingLookups: { type: "number", description: "defaut 20, mets 0 pour sauter Bing" },
        depth: { type: "number" },
      },
      required: ["seed"],
    },
  },
];

const server = new Server(
  { name: "keyword-research-mcp", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({ tools: TOOLS }));

const ok = (data) => ({ content: [{ type: "text", text: JSON.stringify(data, null, 2) }] });
const fail = (msg) => ({ content: [{ type: "text", text: `ERREUR: ${msg}` }], isError: true });

server.setRequestHandler(CallToolRequestSchema, async (req) => {
  const { name, arguments: a = {} } = req.params;

  try {
    switch (name) {
      case "keyword_suggest": {
        const r = await suggest(a.query, { hl: a.hl, gl: a.gl });
        return ok({ query: a.query, count: r.length, suggestions: r });
      }

      case "keyword_expand": {
        const opts = {
          hl: a.hl,
          gl: a.gl,
          useAlphabet: a.useAlphabet !== false,
          useQuestions: a.useQuestions !== false,
          useCommercial: a.useCommercial !== false,
          useGeo: a.useGeo !== false,
        };
        const r = a.depth === 2 ? await deepExpand(a.seed, { ...opts, depth: 2 }) : await expandSeed(a.seed, opts);
        return ok({
          seed: a.seed,
          total: r.keywords.length,
          requetesEnvoyees: r.requestsMade,
          requetesEnEchec: r.errorCount,
          erreurs: r.errors,
          keywords: r.keywords,
        });
      }

      case "keyword_questions": {
        const r = await expandSeed(a.seed, {
          gl: a.gl,
          useAlphabet: false,
          useCommercial: false,
          useGeo: false,
          useQuestions: true,
        });
        const questions = r.keywords
          .map((k) => k.keyword)
          .filter((k) => /^(comment|pourquoi|quel|quelle|quels|combien|ou |quand|est ce que|c est quoi|qui |faut il)/i.test(k));
        return ok({ seed: a.seed, count: questions.length, questions });
      }

      case "trends_over_time":
        return ok(await trends.interestOverTime(a.keywords, { geo: a.geo ?? "SN", months: a.months ?? 12 }));

      case "trends_by_region":
        return ok(await trends.interestByRegion(a.keywords, { geo: a.geo ?? "", resolution: a.resolution ?? "COUNTRY" }));

      case "trends_related":
        return ok(await trends.relatedQueries(a.keyword, { geo: a.geo ?? "SN" }));

      case "bing_volume":
        return ok(await bing.bulkVolumes(a.keywords.slice(0, 30), { country: a.country, language: a.language }));

      case "bing_related":
        return ok(await bing.relatedKeywords(a.query, { country: a.country }));

      case "gsc_sites":
        return ok(await gsc.listSites());

      case "gsc_queries": {
        const site = a.siteUrl || DEFAULT_SITE;
        if (!site) return fail("Pas de siteUrl. Passe-le en argument ou definis GSC_DEFAULT_SITE.");
        return ok(await gsc.topQueries(site, {
          days: a.days ?? 90,
          country: a.country ?? null,
          filterContains: a.filterContains ?? null,
          rowLimit: a.rowLimit ?? 250,
        }));
      }

      case "gsc_striking_distance": {
        const site = a.siteUrl || DEFAULT_SITE;
        if (!site) return fail("Pas de siteUrl. Passe-le en argument ou definis GSC_DEFAULT_SITE.");
        return ok(await gsc.strikingDistance(site, { days: a.days ?? 90, minImpressions: a.minImpressions ?? 30 }));
      }

      case "score_opportunities": {
        const scored = scoreBatch(a.keywords);
        return ok(scored.slice(0, a.limit ?? 60));
      }

      case "cluster_keywords":
        return ok(clusterByToken(a.keywords, { minClusterSize: a.minClusterSize ?? 2 }));

      case "full_research":
        return ok(await fullResearch(a));

      default:
        return fail(`Outil inconnu: ${name}`);
    }
  } catch (e) {
    return fail(e?.message ?? String(e));
  }
});

/** Pipeline complet, tolerant aux pannes : chaque source qui echoue est signalee sans bloquer. */
async function fullResearch(a) {
  const notes = [];
  const seed = a.seed;
  const gl = a.gl ?? "sn";
  const geo = a.geo ?? "SN";

  // 1. Expansion
  const exp =
    a.depth === 2
      ? await deepExpand(seed, { gl, depth: 2 })
      : await expandSeed(seed, { gl });
  const allKeywords = exp.keywords.map((k) => k.keyword);
  const echecs = exp.errorCount
    ? ` — ${exp.errorCount}/${exp.requestsMade} requetes en echec (throttling/503 probable, resultats possiblement incomplets : relance plus tard ou reduis l'expansion)`
    : "";
  notes.push(`Autocomplete: ${allKeywords.length} mots-cles en ${exp.requestsMade} requetes${echecs}.`);
  if (allKeywords.length === 0 && exp.errorCount) {
    notes.push("ATTENTION: 0 mot-cle ET des requetes en echec = throttling, pas un seed vide. Le resultat n'est PAS concluant.");
  }

  // 2. Tendance du seed
  let trendLabel = null;
  try {
    const t = await trends.interestOverTime([seed], { geo });
    trendLabel = t.series[0]?.trend ?? null;
    notes.push(`Trends (${geo}): tendance "${trendLabel}" pour le seed.`);
  } catch (e) {
    notes.push(`Trends indisponible: ${e.message}`);
  }

  // 3. Priorisation heuristique avant les appels Bing (couteux en temps)
  const preScored = scoreBatch(allKeywords.map((k) => ({ keyword: k, trend: trendLabel })));
  const maxBing = a.maxBingLookups ?? 20;
  const volumes = new Map();
  if (maxBing > 0) {
    try {
      const top = preScored.slice(0, maxBing).map((k) => k.keyword);
      const vols = await bing.bulkVolumes(top, { country: a.bingCountry ?? "fr" });
      for (const v of vols) if (v.ok) volumes.set(v.keyword, v.monthlyAverage);
      notes.push(`Bing: volumes recuperes pour ${volumes.size}/${top.length} mots-cles.`);
    } catch (e) {
      notes.push(`Bing indisponible: ${e.message}`);
    }
  }

  // 4. Croisement Search Console
  const gscMap = new Map();
  const site = a.siteUrl || DEFAULT_SITE;
  if (site) {
    try {
      const rows = await gsc.topQueries(site, { days: 90, rowLimit: 1000 });
      for (const r of rows) gscMap.set(r.query.toLowerCase(), r.position);
      notes.push(`Search Console: ${rows.length} requetes reelles croisees.`);
    } catch (e) {
      notes.push(`Search Console indisponible: ${e.message}`);
    }
  } else {
    notes.push("Search Console non configure (pas de siteUrl / GSC_DEFAULT_SITE).");
  }

  // 5. Scoring final
  const final = scoreBatch(
    allKeywords.map((k) => ({
      keyword: k,
      volume: volumes.has(k) ? volumes.get(k) : null,
      trend: trendLabel,
      inGsc: gscMap.has(k.toLowerCase()),
      gscPosition: gscMap.get(k.toLowerCase()) ?? null,
    }))
  );

  return {
    seed,
    notes,
    totalKeywords: final.length,
    repartitionIntention: final.reduce((acc, k) => {
      acc[k.intent] = (acc[k.intent] ?? 0) + 1;
      return acc;
    }, {}),
    top: final.slice(0, 50),
    clusters: clusterByToken(allKeywords),
  };
}

const transport = new StdioServerTransport();
await server.connect(transport);
console.error("keyword-research-mcp demarre (stdio)");
