/**
 * Scoring d'opportunite — heuristique TRANSPARENTE, pas un KD Ahrefs.
 * On ne peut pas mesurer la vraie difficulte sans base de backlinks payante.
 * On approxime avec des signaux qui, pour un site jeune, predisent bien :
 *   - longue traine (plus de mots = moins de concurrence)
 *   - intention (transactionnelle > informationnelle pour la conversion)
 *   - ancrage geo/local (quasi zero concurrence en francophone ouest-africain)
 *   - volume Bing si dispo
 *   - tendance Google Trends si dispo
 */

const TRANSACTIONNEL = /\b(prix|tarif|acheter|abonnement|combien coute|devis|commander|souscrire|payer)\b/i;
const COMPARATIF = /\b(meilleur|meilleure|top \d|vs|versus|alternative|comparatif|ou choisir|avis|test)\b/i;
const INFORMATIONNEL = /\b(comment|pourquoi|c est quoi|qu est ce que|definition|guide|tutoriel|exemple|apprendre)\b/i;
const GEO_OUEST = /\b(senegal|senegalais|dakar|cote d ivoire|ivoirien|abidjan|mali|bamako|burkina|togo|benin|guinee|afrique|africain|fcfa|cfa|wave|orange money|mobile money|sans carte bancaire|sans visa)\b/i;

export function classifyIntent(keyword) {
  if (TRANSACTIONNEL.test(keyword)) return "transactionnel";
  if (COMPARATIF.test(keyword)) return "comparatif";
  if (INFORMATIONNEL.test(keyword)) return "informationnel";
  return "navigationnel/autre";
}

const INTENT_WEIGHT = {
  transactionnel: 1.35,
  comparatif: 1.25,
  informationnel: 1.0,
  "navigationnel/autre": 0.85,
};

const TREND_WEIGHT = {
  hausse: 1.2,
  emergent: 1.25,
  stable: 1.0,
  baisse: 0.75,
  "aucune donnee": 1.0,
};

/**
 * @param {{keyword: string, volume?: number|null, trend?: string|null, inGsc?: boolean, gscPosition?: number|null}} k
 */
export function scoreKeyword(k) {
  const kw = k.keyword.toLowerCase();
  const words = kw.split(/\s+/).filter(Boolean).length;

  const intent = classifyIntent(kw);
  const geo = GEO_OUEST.test(kw);

  // Longue traine : 1 mot = dur, 5+ mots = accessible
  const longTail = Math.min(words / 5, 1); // 0 -> 1

  // Volume : echelle log pour ne pas ecraser la longue traine
  const vol = typeof k.volume === "number" && k.volume > 0 ? Math.log10(k.volume + 1) / 4 : 0.35; // 0.35 = neutre si inconnu

  const base = (vol * 0.45 + longTail * 0.35 + (geo ? 0.2 : 0.05)) * 100;

  let score = base * (INTENT_WEIGHT[intent] ?? 1) * (TREND_WEIGHT[k.trend ?? "aucune donnee"] ?? 1);

  // Bonus fort : deja en position 4-20 dans GSC = victoire rapide
  if (k.inGsc && k.gscPosition && k.gscPosition >= 4 && k.gscPosition <= 20) score *= 1.4;
  // Deja top 3 : rien a gagner
  if (k.inGsc && k.gscPosition && k.gscPosition < 4) score *= 0.5;

  const reasons = [];
  if (geo) reasons.push("ancrage Afrique de l'Ouest francophone (concurrence tres faible)");
  if (words >= 4) reasons.push(`longue traine (${words} mots)`);
  if (intent === "transactionnel") reasons.push("intention d'achat");
  if (intent === "comparatif") reasons.push("intention de comparaison, bon pour l'affiliation");
  if (k.trend === "hausse" || k.trend === "emergent") reasons.push(`tendance ${k.trend}`);
  if (k.inGsc && k.gscPosition >= 4 && k.gscPosition <= 20)
    reasons.push(`deja en position ${k.gscPosition} : gain rapide`);
  if (typeof k.volume === "number") reasons.push(`~${k.volume} rech./mois (Bing)`);

  return {
    keyword: k.keyword,
    score: Math.round(Math.min(score, 100) * 10) / 10,
    intent,
    words,
    geoLocal: geo,
    volume: k.volume ?? null,
    trend: k.trend ?? null,
    reasons,
  };
}

export function scoreBatch(keywords) {
  return keywords.map(scoreKeyword).sort((a, b) => b.score - a.score);
}

/** Regroupement lexical simple (pour degrossir avant l'analyse semantique de Claude). */
export function clusterByToken(keywords, { minClusterSize = 2 } = {}) {
  const STOP = new Set([
    "le","la","les","de","des","du","un","une","et","en","pour","avec","sur","au","aux",
    "dans","par","plus","est","ce","que","qui","comment","pourquoi","quel","quelle","a","the",
  ]);
  /** @type {Map<string, string[]>} */
  const buckets = new Map();
  for (const kw of keywords) {
    const tokens = kw.toLowerCase().split(/\s+/).filter((t) => t.length > 2 && !STOP.has(t));
    for (const t of tokens) {
      if (!buckets.has(t)) buckets.set(t, []);
      buckets.get(t).push(kw);
    }
  }
  return [...buckets.entries()]
    .filter(([, v]) => v.length >= minClusterSize)
    .sort((a, b) => b[1].length - a[1].length)
    .slice(0, 25)
    .map(([token, kws]) => ({ pivot: token, count: kws.length, keywords: kws.slice(0, 30) }));
}
