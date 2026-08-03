/**
 * Bing Webmaster Tools API — gratuite, cle API illimitee en pratique.
 * Seule source gratuite qui donne des VOLUMES CHIFFRES precis
 * (Google Keyword Planner ne donne que des fourchettes sans budget Ads).
 *
 * Cle : bing.com/webmasters -> Parametres -> Acces API -> generer une cle
 * export BING_WEBMASTER_API_KEY=xxxx
 */

const BASE = "https://ssl.bing.com/webmaster/api.svc/json";

function apiKey() {
  const k = process.env.BING_WEBMASTER_API_KEY;
  if (!k) {
    throw new Error(
      "BING_WEBMASTER_API_KEY manquante. Genere une cle sur bing.com/webmasters -> Parametres -> Acces API."
    );
  }
  return k;
}

async function call(endpoint, params) {
  const qs = new URLSearchParams({ apikey: apiKey(), ...params });
  const res = await fetch(`${BASE}/${endpoint}?${qs}`, {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Bing API ${endpoint} -> HTTP ${res.status} ${body.slice(0, 200)}`);
  }
  const json = await res.json();
  return json?.d ?? json;
}

function isoDate(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/**
 * Volume de recherche estime pour un mot-cle.
 * country: 'fr', 'sn', 'ci'... / language: 'fr-FR'
 */
export async function keywordStats(query, { country = "fr", language = "fr-FR", months = 6 } = {}) {
  const end = new Date();
  const start = new Date();
  start.setMonth(start.getMonth() - months);

  const rows = await call("GetKeywordStats", {
    q: query,
    country,
    language,
    startDate: isoDate(start),
    endDate: isoDate(end),
  });

  const list = Array.isArray(rows) ? rows : [];
  const impressions = list.map((r) => r.Impressions ?? r.Broad ?? 0);
  const total = impressions.reduce((s, v) => s + v, 0);

  return {
    query,
    country,
    monthlyAverage: list.length ? Math.round(total / list.length) : 0,
    dataPoints: list.length,
    history: list.map((r) => ({
      date: r.Date,
      impressions: r.Impressions ?? null,
      broad: r.Broad ?? null,
      phrase: r.Phrase ?? null,
      exact: r.Exact ?? null,
    })),
  };
}

/** Mots-cles associes selon Bing. */
export async function relatedKeywords(query, { country = "fr", language = "fr-FR" } = {}) {
  const end = new Date();
  const start = new Date();
  start.setMonth(start.getMonth() - 6);

  const rows = await call("GetRelatedKeywords", {
    q: query,
    country,
    language,
    startDate: isoDate(start),
    endDate: isoDate(end),
  });
  const list = Array.isArray(rows) ? rows : [];
  return list.map((r) => ({
    keyword: r.Query ?? r.Keyword,
    impressions: r.Impressions ?? r.Broad ?? null,
  }));
}

/** Volumes pour un lot de mots-cles, en sequentiel doux. */
export async function bulkVolumes(keywords, opts = {}) {
  const out = [];
  for (const kw of keywords) {
    try {
      const s = await keywordStats(kw, opts);
      out.push({ keyword: kw, monthlyAverage: s.monthlyAverage, ok: true });
    } catch (e) {
      out.push({ keyword: kw, monthlyAverage: null, ok: false, error: e.message });
    }
    await new Promise((r) => setTimeout(r, 250));
  }
  return out;
}
