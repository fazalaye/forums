/**
 * Google Autocomplete — source gratuite, sans cle API, sans quota officiel.
 * Endpoint public utilise par la barre de recherche Google.
 */

const SUGGEST_URL = "https://suggestqueries.google.com/complete/search";

// Prefixes de questions en francais -> approxime le bloc "Autres questions posees"
export const QUESTION_PREFIXES = [
  "comment", "pourquoi", "quel", "quelle", "quels", "combien",
  "ou", "quand", "est ce que", "c est quoi", "qui", "faut il",
];

// Modificateurs commerciaux / transactionnels
export const COMMERCIAL_MODIFIERS = [
  "prix", "tarif", "gratuit", "meilleur", "avis", "vs", "alternative",
  "acheter", "pas cher", "en ligne", "formation", "exemple", "sans carte bancaire",
];

// Modificateurs geo — le coeur du positionnement Afrique de l'Ouest francophone
export const GEO_MODIFIERS = [
  "senegal", "dakar", "cote d ivoire", "abidjan", "afrique",
  "fcfa", "wave", "orange money", "mobile money",
];

const ALPHABET = "abcdefghijklmnopqrstuvwxyz".split("");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * Une requete autocomplete.
 * @param {string} query
 * @param {{hl?: string, gl?: string, timeoutMs?: number}} opts
 * @returns {Promise<string[]>}
 */
export async function suggest(query, opts = {}) {
  const { hl = "fr", gl = "sn", timeoutMs = 8000 } = opts;
  const url = `${SUGGEST_URL}?client=firefox&hl=${encodeURIComponent(hl)}&gl=${encodeURIComponent(gl)}&q=${encodeURIComponent(query)}`;

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
        "Accept-Language": `${hl},fr;q=0.9`,
      },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return Array.isArray(data?.[1]) ? data[1] : [];
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Expansion "alphabet soup" : seed + a..z, seed + questions, seed + modificateurs.
 * @param {string} seed
 * @param {object} opts
 * @returns {Promise<{keyword: string, source: string}[]>}
 */
export async function expandSeed(seed, opts = {}) {
  const {
    hl = "fr",
    gl = "sn",
    useAlphabet = true,
    useQuestions = true,
    useCommercial = true,
    useGeo = true,
    delayMs = 120,
    maxConcurrent = 4,
  } = opts;

  /** @type {{q: string, source: string}[]} */
  const jobs = [{ q: seed, source: "seed" }];

  if (useAlphabet) {
    for (const l of ALPHABET) jobs.push({ q: `${seed} ${l}`, source: "alphabet" });
  }
  if (useQuestions) {
    for (const p of QUESTION_PREFIXES) jobs.push({ q: `${p} ${seed}`, source: "question" });
  }
  if (useCommercial) {
    for (const m of COMMERCIAL_MODIFIERS) jobs.push({ q: `${seed} ${m}`, source: "commercial" });
  }
  if (useGeo) {
    for (const g of GEO_MODIFIERS) jobs.push({ q: `${seed} ${g}`, source: "geo" });
  }

  /** @type {Map<string, string>} */
  const found = new Map();
  const errors = [];

  // Execution par petits lots pour ne pas se faire limiter
  for (let i = 0; i < jobs.length; i += maxConcurrent) {
    const batch = jobs.slice(i, i + maxConcurrent);
    const results = await Promise.allSettled(
      batch.map((j) => suggest(j.q, { hl, gl }).then((r) => ({ job: j, results: r })))
    );
    for (const r of results) {
      if (r.status === "fulfilled") {
        for (const kw of r.value.results) {
          const key = kw.toLowerCase().trim();
          if (!found.has(key)) found.set(key, r.value.job.source);
        }
      } else {
        errors.push(String(r.reason?.message ?? r.reason));
      }
    }
    if (delayMs) await sleep(delayMs);
  }

  const keywords = [...found.entries()].map(([keyword, source]) => ({ keyword, source }));
  // errorCount = nombre total d'echecs (errors est tronque a 5 pour l'affichage).
  // Sans lui, un run throttle (beaucoup de 503) est indiscernable d'un run vide.
  return { keywords, requestsMade: jobs.length, errorCount: errors.length, errors: errors.slice(0, 5) };
}

/**
 * Expansion recursive : on re-suggere a partir des meilleures suggestions.
 */
export async function deepExpand(seed, opts = {}) {
  const { depth = 2, branchLimit = 8, ...rest } = opts;

  const first = await expandSeed(seed, rest);
  if (depth <= 1) return first;

  const branches = first.keywords
    .filter((k) => k.keyword !== seed.toLowerCase())
    .slice(0, branchLimit)
    .map((k) => k.keyword);

  const all = new Map(first.keywords.map((k) => [k.keyword, k.source]));
  let requests = first.requestsMade;
  let errorCount = first.errorCount;

  for (const b of branches) {
    const sub = await expandSeed(b, { ...rest, useAlphabet: false, useGeo: false });
    requests += sub.requestsMade;
    errorCount += sub.errorCount;
    for (const k of sub.keywords) {
      if (!all.has(k.keyword)) all.set(k.keyword, `depth2:${k.source}`);
    }
  }

  return {
    keywords: [...all.entries()].map(([keyword, source]) => ({ keyword, source })),
    requestsMade: requests,
    errorCount,
    errors: first.errors,
  };
}
