#!/usr/bin/env node
/**
 * keyword-research — a self-contained MCP (Model Context Protocol) stdio server
 * for SEO keyword research, tuned for PromptForums (French annuaire of AI tools
 * and prompts).
 *
 * It speaks the MCP stdio transport (newline-delimited JSON-RPC 2.0) with no
 * external dependencies, so it runs directly with:
 *
 *     claude mcp add --transport stdio keyword-research -- node $(pwd)/index.js
 *
 * IMPORTANT: this server has no live search-data provider. Volume, difficulty
 * and CPC figures are *modeled estimates* produced by a deterministic heuristic
 * (stable for a given keyword), NOT live data from Google/Ahrefs/etc. Every
 * result is labelled accordingly so consumers never mistake them for measured
 * numbers. Wire in a real provider by replacing the functions in the METRICS
 * section if you have an API key.
 *
 * Tools:
 *   - generate_keyword_ideas : expand a seed into French SEO keyword variations
 *   - analyze_keyword        : deep-dive metrics + intent + content suggestion
 *   - cluster_keywords       : group a list into topical clusters with a pillar
 *   - keyword_gap            : opportunity keywords mapped to the site's taxonomy
 */

"use strict";

const fs = require("fs");
const path = require("path");
const readline = require("readline");

const SERVER_NAME = "keyword-research";
const SERVER_VERSION = "1.0.0";
const DEFAULT_PROTOCOL_VERSION = "2025-06-18";

// ---------------------------------------------------------------------------
// Domain vocabulary
// ---------------------------------------------------------------------------

// Kept in sync with data/categories.js (duplicated because that file is an ESM
// module and this server runs as CommonJS via `node index.js`).
const CATEGORIES = [
  { slug: "chatbots", label: "Chatbots & Assistants", emoji: "🤖" },
  { slug: "ecriture", label: "Écriture & Copywriting", emoji: "✍️" },
  { slug: "image", label: "Génération d'images", emoji: "🎨" },
  { slug: "code", label: "Code & Développement", emoji: "💻" },
  { slug: "marketing", label: "Marketing & SEO", emoji: "📈" },
  { slug: "productivite", label: "Productivité", emoji: "⚡" },
  { slug: "video", label: "Vidéo & Audio", emoji: "🎬" },
  { slug: "business", label: "Business & Stratégie", emoji: "💼" },
  { slug: "emploi", label: "Emploi & Carrière", emoji: "👔" },
];

// French SEO modifier sets used to expand a seed keyword.
const MODIFIERS = {
  questions: [
    "comment",
    "pourquoi",
    "qu'est-ce que",
    "c'est quoi",
    "quel est le meilleur",
    "comment utiliser",
  ],
  commercial: [
    "meilleur",
    "meilleurs",
    "top",
    "comparatif",
    "avis",
    "test",
    "alternative à",
    "alternative gratuite à",
  ],
  transactional: ["prix", "tarif", "abonnement", "acheter", "essai gratuit"],
  qualifiers: [
    "gratuit",
    "en ligne",
    "français",
    "sans inscription",
    "pour débutant",
    "professionnel",
    "exemple",
    "tutoriel",
    "guide",
  ],
  domain: ["prompt", "prompts", "outil ia", "générateur ia", "avec l'ia"],
};

// Tokens that reliably pull French AI-tool search volume upward.
const POPULAR_TOKENS = [
  "chatgpt",
  "ia",
  "intelligence artificielle",
  "prompt",
  "prompts",
  "midjourney",
  "gpt",
  "claude",
  "gemini",
  "gratuit",
  "seo",
  "marketing",
];

// Intent-signalling tokens.
const INTENT_SIGNALS = {
  transactional: ["prix", "tarif", "acheter", "abonnement", "essai", "commander", "s'abonner"],
  commercial: [
    "meilleur",
    "meilleurs",
    "top",
    "comparatif",
    "avis",
    "test",
    "alternative",
    "vs",
    "review",
  ],
  informational: [
    "comment",
    "pourquoi",
    "qu'est-ce",
    "c'est quoi",
    "tutoriel",
    "guide",
    "exemple",
    "définition",
    "quoi",
    "quand",
    "où",
  ],
};

// French stopwords for tokenisation / clustering.
const STOPWORDS = new Set(
  [
    "le", "la", "les", "un", "une", "des", "de", "du", "d", "l", "et", "ou",
    "à", "a", "au", "aux", "en", "pour", "par", "avec", "sur", "dans", "ce",
    "cet", "cette", "ces", "que", "qui", "quoi", "est", "c", "s", "the", "of",
    "to", "vs",
  ]
);

// ---------------------------------------------------------------------------
// Text utilities
// ---------------------------------------------------------------------------

function stripAccents(str) {
  return String(str || "").normalize("NFD").replace(/[̀-ͯ]/g, "");
}

function normalize(str) {
  return stripAccents(String(str || "").toLowerCase()).trim().replace(/\s+/g, " ");
}

function tokenize(str) {
  return normalize(str)
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t && !STOPWORDS.has(t));
}

/** Deterministic FNV-1a 32-bit hash → float in [0, 1). */
function hashFloat(str) {
  let h = 0x811c9dc5;
  const s = normalize(str);
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return ((h >>> 0) % 100000) / 100000;
}

function roundNice(n) {
  if (n < 100) return Math.max(10, Math.round(n / 10) * 10);
  if (n < 1000) return Math.round(n / 10) * 10;
  if (n < 10000) return Math.round(n / 50) * 50;
  return Math.round(n / 100) * 100;
}

function clamp(n, lo, hi) {
  return Math.max(lo, Math.min(hi, n));
}

function titleCase(str) {
  return String(str || "").replace(/\b\w/g, (c) => c.toUpperCase());
}

// ---------------------------------------------------------------------------
// METRICS — deterministic heuristic model (NOT live search data)
// ---------------------------------------------------------------------------

function popularBoost(kw) {
  const n = normalize(kw);
  let boost = 1;
  for (const tok of POPULAR_TOKENS) {
    if (n.includes(tok)) boost += 0.22;
  }
  return clamp(boost, 1, 2.3);
}

function classifyIntent(kw) {
  const n = normalize(kw);
  const words = tokenize(kw);
  const has = (list) => list.some((t) => n.includes(t));
  if (has(INTENT_SIGNALS.transactional)) return "transactional";
  if (has(INTENT_SIGNALS.commercial)) return "commercial";
  if (has(INTENT_SIGNALS.informational)) return "informational";
  // Single brand-like token with nothing else → navigational.
  if (words.length <= 2 && POPULAR_TOKENS.some((t) => n === t || n.includes(t))) {
    return "navigational";
  }
  return "informational";
}

function estVolume(kw) {
  const words = tokenize(kw).length || 1;
  const h = hashFloat(kw + "|vol");
  let base;
  if (words <= 2) base = 800 + h * 19200; // head terms
  else if (words <= 4) base = 150 + h * 4850; // mid tail
  else base = 20 + h * 680; // long tail
  return roundNice(base * popularBoost(kw));
}

function estDifficulty(kw, volume) {
  const words = tokenize(kw).length || 1;
  const intent = classifyIntent(kw);
  const h = hashFloat(kw + "|kd");
  const volScore = clamp(volume / 20000, 0, 1); // higher volume ⇒ harder
  const intentWeight =
    intent === "transactional" ? 22 : intent === "commercial" ? 16 : intent === "navigational" ? 10 : 6;
  const lengthPenalty = words <= 2 ? 22 : words <= 4 ? 8 : -8; // long tail is easier
  const kd = 12 + volScore * 45 + intentWeight + lengthPenalty + h * 16;
  return Math.round(clamp(kd, 1, 96));
}

function estCpc(kw) {
  const intent = classifyIntent(kw);
  const h = hashFloat(kw + "|cpc");
  const ranges = {
    transactional: [1.4, 6.0],
    commercial: [0.7, 3.6],
    navigational: [0.1, 0.6],
    informational: [0.05, 0.9],
  };
  const [lo, hi] = ranges[intent] || ranges.informational;
  return Number((lo + h * (hi - lo)).toFixed(2));
}

/** Opportunity: reward decent volume + low difficulty. 0-100. */
function opportunityScore(volume, difficulty) {
  const volScore = clamp(Math.log10(volume + 1) / Math.log10(20000), 0, 1);
  const easeScore = 1 - difficulty / 100;
  return Math.round(clamp((volScore * 0.55 + easeScore * 0.45) * 100, 1, 100));
}

function suggestContentType(kw) {
  const intent = classifyIntent(kw);
  const n = normalize(kw);
  if (intent === "transactional") return "Page de conversion / landing (comparatif de prix)";
  if (intent === "commercial") {
    if (n.includes("alternative") || n.includes("vs")) return "Article comparatif / alternatives";
    return "Article \"meilleurs outils\" (listicle) avec tableau";
  }
  if (n.includes("comment") || n.includes("tutoriel") || n.includes("guide"))
    return "Guide pratique / tutoriel étape par étape";
  if (n.includes("qu'est-ce") || n.includes("c'est quoi") || n.includes("definition"))
    return "Article de définition / page glossaire";
  return "Article de blog informationnel";
}

function metricsFor(keyword) {
  const kw = normalize(keyword);
  const volume = estVolume(kw);
  const difficulty = estDifficulty(kw, volume);
  const words = tokenize(kw).length || 1;
  return {
    keyword: kw,
    estimated_monthly_volume: volume,
    estimated_difficulty: difficulty,
    estimated_cpc_eur: estCpc(kw),
    intent: classifyIntent(kw),
    opportunity_score: opportunityScore(volume, difficulty),
    word_count: words,
    long_tail: words >= 4,
  };
}

// ---------------------------------------------------------------------------
// Keyword generation
// ---------------------------------------------------------------------------

// Light singular/plural stem so "prompt" and "prompts" count as the same word.
function stemWord(w) {
  return w.length > 3 && w.endsWith("s") ? w.slice(0, -1) : w;
}

// A keyword variation should never contain the same (stemmed) word twice, e.g.
// seed "prompt chatgpt" + domain modifier "prompt" would otherwise yield
// "prompt prompt chatgpt" / "prompts prompt chatgpt".
function hasRepeatedWord(str) {
  const seen = new Set();
  for (const w of str.split(/\s+/).filter(Boolean)) {
    const s = stemWord(w);
    if (seen.has(s)) return true;
    seen.add(s);
  }
  return false;
}

function expandSeed(seed, extraCategories) {
  const base = normalize(seed);
  if (!base) return [];

  // The seed itself is always kept, even if the user's own phrase repeats a
  // word; the repeat guard only filters generated variations.
  const out = new Set([base]);
  const add = (candidate) => {
    const c = normalize(candidate);
    if (c.length >= 3 && !hasRepeatedWord(c)) out.add(c);
  };

  for (const q of MODIFIERS.questions) add(`${q} ${base}`);
  for (const c of MODIFIERS.commercial) add(`${c} ${base}`);
  for (const t of MODIFIERS.transactional) add(`${base} ${t}`);
  for (const q of MODIFIERS.qualifiers) add(`${base} ${q}`);
  for (const d of MODIFIERS.domain) {
    add(`${base} ${d}`);
    add(`${d} ${base}`);
  }
  // A couple of high-intent long-tails.
  add(`meilleur ${base} gratuit`);
  add(`comment utiliser ${base}`);
  add(`${base} en français`);

  // Blend with any requested site categories.
  if (Array.isArray(extraCategories)) {
    for (const slug of extraCategories) {
      const cat = CATEGORIES.find((c) => c.slug === slug);
      if (cat) add(`${base} ${normalize(cat.label.split("&")[0])}`);
    }
  }

  return Array.from(out);
}

function generateKeywordIdeas(args) {
  const seed = args && args.seed;
  if (!seed || typeof seed !== "string") {
    throw new Error("`seed` (string) is required.");
  }
  const limit = clamp(Number(args.limit) || 30, 1, 200);
  const ideas = expandSeed(seed, args.categories)
    .map(metricsFor)
    .sort((a, b) => b.opportunity_score - a.opportunity_score)
    .slice(0, limit);

  return {
    seed: normalize(seed),
    locale: args.locale || "fr-FR",
    note:
      "Volume/difficulté/CPC sont des ESTIMATIONS heuristiques déterministes, pas des données live d'un fournisseur SEO.",
    count: ideas.length,
    ideas,
  };
}

// ---------------------------------------------------------------------------
// Single-keyword analysis
// ---------------------------------------------------------------------------

function serpFeatureGuess(kw) {
  const intent = classifyIntent(kw);
  const feats = [];
  if (intent === "informational") feats.push("Featured snippet", "People Also Ask", "AI Overview");
  if (intent === "commercial") feats.push("Reviews", "Site links", "AI Overview");
  if (intent === "transactional") feats.push("Shopping / Ads", "Site links");
  if (intent === "navigational") feats.push("Site links", "Knowledge panel");
  return feats;
}

function analyzeKeyword(args) {
  const keyword = args && args.keyword;
  if (!keyword || typeof keyword !== "string") {
    throw new Error("`keyword` (string) is required.");
  }
  const m = metricsFor(keyword);
  return {
    ...m,
    locale: args.locale || "fr-FR",
    suggested_content_type: suggestContentType(keyword),
    likely_serp_features: serpFeatureGuess(keyword),
    note:
      "Estimations heuristiques déterministes (modèle interne), pas des données live d'un fournisseur SEO.",
  };
}

// ---------------------------------------------------------------------------
// Clustering
// ---------------------------------------------------------------------------

function clusterKeywords(args) {
  const keywords = args && args.keywords;
  if (!Array.isArray(keywords) || keywords.length === 0) {
    throw new Error("`keywords` (non-empty array of strings) is required.");
  }
  const maxClusters = clamp(Number(args.maxClusters) || 8, 1, 30);

  const items = keywords
    .filter((k) => typeof k === "string" && k.trim())
    .map((k) => ({ keyword: normalize(k), tokens: tokenize(k) }));

  // Seed clusters greedily by most frequent significant token.
  const tokenFreq = new Map();
  for (const it of items) {
    for (const t of new Set(it.tokens)) tokenFreq.set(t, (tokenFreq.get(t) || 0) + 1);
  }
  const rankedTokens = Array.from(tokenFreq.entries())
    .filter(([, c]) => c >= 2)
    .sort((a, b) => b[1] - a[1])
    .map(([t]) => t);

  const clusters = [];
  const assigned = new Set();

  for (const token of rankedTokens) {
    if (clusters.length >= maxClusters) break;
    const members = items.filter((it, i) => !assigned.has(i) && it.tokens.includes(token));
    if (members.length < 2) continue;
    items.forEach((it, i) => {
      if (!assigned.has(i) && it.tokens.includes(token)) assigned.add(i);
    });
    clusters.push({ label: token, members: members.map((m) => m.keyword) });
  }

  // Leftovers → their own singleton "divers" cluster.
  const leftovers = items.filter((it, i) => !assigned.has(i)).map((m) => m.keyword);
  if (leftovers.length) clusters.push({ label: "divers", members: leftovers });

  // Attach metrics + pillar keyword (highest volume) per cluster.
  const enriched = clusters.map((c) => {
    const withMetrics = c.members.map(metricsFor).sort((a, b) => b.estimated_monthly_volume - a.estimated_monthly_volume);
    const pillar = withMetrics[0];
    const totalVolume = withMetrics.reduce((s, m) => s + m.estimated_monthly_volume, 0);
    return {
      label: titleCase(c.label),
      pillar_keyword: pillar ? pillar.keyword : null,
      total_estimated_volume: totalVolume,
      dominant_intent: modeIntent(withMetrics),
      keywords: withMetrics.map((m) => ({
        keyword: m.keyword,
        estimated_monthly_volume: m.estimated_monthly_volume,
        estimated_difficulty: m.estimated_difficulty,
        intent: m.intent,
      })),
    };
  });

  enriched.sort((a, b) => b.total_estimated_volume - a.total_estimated_volume);

  return {
    clusters: enriched,
    cluster_count: enriched.length,
    input_count: items.length,
    note: "Regroupement par token partagé ; estimations heuristiques déterministes.",
  };
}

function modeIntent(metricsList) {
  const counts = {};
  for (const m of metricsList) counts[m.intent] = (counts[m.intent] || 0) + 1;
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
}

// ---------------------------------------------------------------------------
// Keyword gap vs. the site's own taxonomy / coverage
// ---------------------------------------------------------------------------

/**
 * Reads the ESM data files as plain text (they can't be `require`d from CJS)
 * and extracts, per category slug, how many directory entries exist. Purely
 * for coverage counts — best-effort, never throws.
 */
function readCoverage() {
  const files = ["data/sites.js", "data/curatedSites.js"];
  const counts = {};
  for (const cat of CATEGORIES) counts[cat.slug] = 0;
  let toolNames = [];

  for (const rel of files) {
    const abs = path.join(__dirname, rel);
    let text = "";
    try {
      text = fs.readFileSync(abs, "utf8");
    } catch (_) {
      continue;
    }
    // Count category: "slug" occurrences.
    for (const cat of CATEGORIES) {
      const re = new RegExp(`category:\\s*["']${cat.slug}["']`, "g");
      const m = text.match(re);
      counts[cat.slug] += m ? m.length : 0;
    }
    // Collect tool names for dedupe awareness.
    const nameRe = /name:\s*["']([^"']+)["']/g;
    let match;
    while ((match = nameRe.exec(text))) toolNames.push(match[1]);
  }

  return { counts, toolNames: Array.from(new Set(toolNames)) };
}

function keywordGap(args) {
  args = args || {};
  const limit = clamp(Number(args.limit) || 8, 1, 50);
  const { counts, toolNames } = readCoverage();

  const targetCats = args.category
    ? CATEGORIES.filter((c) => c.slug === args.category)
    : CATEGORIES;

  if (args.category && targetCats.length === 0) {
    throw new Error(
      `Unknown category "${args.category}". Valid slugs: ${CATEGORIES.map((c) => c.slug).join(", ")}.`
    );
  }

  const results = targetCats.map((cat) => {
    const label = normalize(cat.label.split("&")[0]);
    const seedBases = [label, `outil ${label}`, `ia ${label}`];
    if (args.topic) seedBases.push(`${normalize(args.topic)} ${label}`);

    const candidates = new Set();
    for (const base of seedBases) {
      candidates.add(`meilleur ${base} gratuit`);
      candidates.add(`meilleurs ${base} 2026`);
      candidates.add(`comparatif ${base}`);
      candidates.add(`${base} en français`);
      candidates.add(`comment choisir ${base}`);
      candidates.add(`alternative gratuite ${base}`);
    }

    const scored = Array.from(candidates)
      .map(metricsFor)
      .sort((a, b) => b.opportunity_score - a.opportunity_score)
      .slice(0, limit)
      .map((m) => ({
        keyword: m.keyword,
        estimated_monthly_volume: m.estimated_monthly_volume,
        estimated_difficulty: m.estimated_difficulty,
        opportunity_score: m.opportunity_score,
        intent: m.intent,
        suggested_content_type: suggestContentType(m.keyword),
      }));

    return {
      category: cat.slug,
      category_label: cat.label,
      current_directory_entries: counts[cat.slug] || 0,
      coverage_note:
        (counts[cat.slug] || 0) < 3
          ? "Faible couverture — priorité d'acquisition de contenu/listings."
          : "Couverture correcte — viser les mots-clés long-tail restants.",
      opportunity_keywords: scored,
    };
  });

  results.sort((a, b) => a.current_directory_entries - b.current_directory_entries);

  return {
    topic: args.topic || null,
    indexed_tools_sampled: toolNames.length,
    categories: results,
    note:
      "Cibles générées à partir de la taxonomie du site ; volumes/difficultés estimés (heuristique déterministe).",
  };
}

// ---------------------------------------------------------------------------
// Tool registry
// ---------------------------------------------------------------------------

const TOOLS = [
  {
    name: "generate_keyword_ideas",
    description:
      "Étend un mot-clé racine (seed) en variations SEO françaises (questions, intention commerciale/transactionnelle, long-tail, vocabulaire IA/prompts) avec volume, difficulté, CPC et score d'opportunité ESTIMÉS (heuristique déterministe, pas de données live). Idéal pour trouver des angles de contenu pour l'annuaire.",
    inputSchema: {
      type: "object",
      properties: {
        seed: { type: "string", description: "Mot-clé racine, ex. 'générateur d'images ia'." },
        locale: { type: "string", description: "Locale, défaut 'fr-FR'." },
        limit: { type: "number", description: "Nombre max d'idées (1-200, défaut 30)." },
        categories: {
          type: "array",
          items: { type: "string" },
          description: "Slugs de catégories du site à mélanger (chatbots, image, code, …).",
        },
      },
      required: ["seed"],
    },
  },
  {
    name: "analyze_keyword",
    description:
      "Analyse détaillée d'un seul mot-clé : volume, difficulté, CPC, intention de recherche, score d'opportunité, type de contenu recommandé et fonctionnalités SERP probables. Estimations heuristiques déterministes (pas de données live).",
    inputSchema: {
      type: "object",
      properties: {
        keyword: { type: "string", description: "Le mot-clé à analyser." },
        locale: { type: "string", description: "Locale, défaut 'fr-FR'." },
      },
      required: ["keyword"],
    },
  },
  {
    name: "cluster_keywords",
    description:
      "Regroupe une liste de mots-clés en clusters thématiques (par tokens partagés), avec un mot-clé pilier, le volume total estimé et l'intention dominante par cluster. Utile pour planifier des pages piliers / cocons sémantiques.",
    inputSchema: {
      type: "object",
      properties: {
        keywords: {
          type: "array",
          items: { type: "string" },
          description: "Liste de mots-clés à regrouper.",
        },
        maxClusters: { type: "number", description: "Nombre max de clusters (1-30, défaut 8)." },
      },
      required: ["keywords"],
    },
  },
  {
    name: "keyword_gap",
    description:
      "Propose des mots-clés d'opportunité alignés sur la taxonomie de PromptForums (9 catégories) et indique la couverture actuelle de l'annuaire par catégorie (lue depuis les données du site). Priorise les catégories peu couvertes. Estimations heuristiques déterministes.",
    inputSchema: {
      type: "object",
      properties: {
        topic: { type: "string", description: "Thème optionnel pour affiner (ex. 'vidéo courte')." },
        category: {
          type: "string",
          description: "Restreindre à une catégorie (slug). Sinon, toutes les catégories.",
        },
        limit: { type: "number", description: "Mots-clés par catégorie (1-50, défaut 8)." },
      },
    },
  },
];

const TOOL_HANDLERS = {
  generate_keyword_ideas: generateKeywordIdeas,
  analyze_keyword: analyzeKeyword,
  cluster_keywords: clusterKeywords,
  keyword_gap: keywordGap,
};

// ---------------------------------------------------------------------------
// MCP stdio JSON-RPC server
// ---------------------------------------------------------------------------

function send(msg) {
  process.stdout.write(JSON.stringify(msg) + "\n");
}

function sendResult(id, result) {
  send({ jsonrpc: "2.0", id, result });
}

function sendError(id, code, message, data) {
  const error = { code, message };
  if (data !== undefined) error.data = data;
  send({ jsonrpc: "2.0", id, error });
}

function handleToolCall(id, params) {
  const name = params && params.name;
  const args = (params && params.arguments) || {};
  const handler = TOOL_HANDLERS[name];
  if (!handler) {
    return sendError(id, -32602, `Unknown tool: ${name}`);
  }
  try {
    const result = handler(args);
    sendResult(id, {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      structuredContent: result,
      isError: false,
    });
  } catch (err) {
    // Tool-level errors are reported as isError content, per MCP conventions,
    // so the model can see and recover from bad arguments.
    sendResult(id, {
      content: [{ type: "text", text: `Error in ${name}: ${err.message}` }],
      isError: true,
    });
  }
}

function handleMessage(msg) {
  if (!msg || msg.jsonrpc !== "2.0") return;
  const { id, method, params } = msg;

  // Notifications (no id) — never respond.
  if (id === undefined || id === null) {
    // notifications/initialized, notifications/cancelled, etc. — ignore.
    return;
  }

  switch (method) {
    case "initialize": {
      const requested = params && params.protocolVersion;
      sendResult(id, {
        protocolVersion: requested || DEFAULT_PROTOCOL_VERSION,
        capabilities: { tools: { listChanged: false } },
        serverInfo: { name: SERVER_NAME, version: SERVER_VERSION },
        instructions:
          "Serveur de recherche de mots-clés SEO (français, orienté outils/prompts IA). " +
          "Les métriques sont des estimations heuristiques déterministes, pas des données live.",
      });
      break;
    }
    case "ping":
      sendResult(id, {});
      break;
    case "tools/list":
      sendResult(id, { tools: TOOLS });
      break;
    case "tools/call":
      handleToolCall(id, params);
      break;
    case "resources/list":
      sendResult(id, { resources: [] });
      break;
    case "prompts/list":
      sendResult(id, { prompts: [] });
      break;
    default:
      sendError(id, -32601, `Method not found: ${method}`);
  }
}

function main() {
  // --selftest: exercise each tool locally and print to stderr, no MCP loop.
  if (process.argv.includes("--selftest")) {
    const out = {
      generate_keyword_ideas: generateKeywordIdeas({ seed: "générateur d'images ia", limit: 5 }),
      analyze_keyword: analyzeKeyword({ keyword: "meilleur chatbot ia gratuit" }),
      cluster_keywords: clusterKeywords({
        keywords: [
          "meilleur chatbot ia",
          "chatbot ia gratuit",
          "générateur image ia",
          "générateur image gratuit",
          "prompt chatgpt marketing",
          "prompt chatgpt seo",
        ],
      }),
      keyword_gap: keywordGap({ limit: 3 }),
    };
    process.stderr.write(JSON.stringify(out, null, 2) + "\n");
    return;
  }

  const rl = readline.createInterface({ input: process.stdin, terminal: false });
  rl.on("line", (line) => {
    const trimmed = line.trim();
    if (!trimmed) return;
    let msg;
    try {
      msg = JSON.parse(trimmed);
    } catch (_) {
      // Malformed line — cannot recover an id, so drop it (per JSON-RPC we may
      // omit a response when id is unknowable).
      return;
    }
    try {
      handleMessage(msg);
    } catch (err) {
      if (msg && msg.id !== undefined && msg.id !== null) {
        sendError(msg.id, -32603, `Internal error: ${err.message}`);
      }
    }
  });
  rl.on("close", () => process.exit(0));

  // Never let a stray write to stdout corrupt the protocol.
  process.on("uncaughtException", (err) => {
    process.stderr.write(`[keyword-research] uncaught: ${err && err.stack}\n`);
  });
}

main();
