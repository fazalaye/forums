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

// Retire les accents (NFD) et met en minuscules. Les regex ci-dessous sont
// écrites SANS accent (senegal, coute…), mais Google renvoie le texte accentué
// (sénégal, coûte…). Sans deburr, « au sénégal » ratait le bonus géo — or
// l'ancrage ouest-africain est tout l'intérêt de l'outil.
function deburr(s) {
  return String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

const TRANSACTIONNEL = /\b(prix|tarif|acheter|abonnement|combien coute|devis|commander|souscrire|payer|telecharger)\b/i;
// Signaux commerciaux / d'évaluation. Les pluriels (meilleurs, gratuites…) sont
// couverts par `s?` — sans quoi le « s » cassait le \b et « meilleurs » passait
// en navigationnel. `gratuit` compte : chercher un outil gratuit = intention
// d'adoption, pas une simple navigation.
const COMPARATIF = /\b(meilleurs?|meilleures?|top \d|classement|vs|versus|alternative|comparatif|comparaison|ou choisir|avis|test|gratuits?|gratuites?|pas cher)\b/i;
// Ajout des tournures interrogatives « quel(s)/quelle(s) sont », « combien »,
// « liste »… qui manquaient et faisaient tomber les requêtes-liste en autre.
const INFORMATIONNEL = /\b(comment|pourquoi|c est quoi|qu est ce que|quels?|quelles?|combien|definition|guide|tutoriel|exemple|apprendre|liste|ou trouver|faut il|est ce que)\b/i;
const GEO_OUEST = /\b(senegal|senegalais|dakar|cote d ivoire|ivoirien|abidjan|mali|bamako|burkina|togo|benin|guinee|afrique|africain|fcfa|cfa|wave|orange money|mobile money|sans carte bancaire|sans visa)\b/i;

export function classifyIntent(keyword) {
  keyword = deburr(keyword);
  // Ordre = priorité. Transactionnel d'abord (« combien coûte », « prix »).
  // Puis interrogatif : une question (« quels sont… », « comment… ») définit le
  // format de contenu (article/FAQ pilier), même si elle contient « gratuit ».
  // Le commercial (comparatif/gratuit) capte le reste.
  if (TRANSACTIONNEL.test(keyword)) return "transactionnel";
  if (INFORMATIONNEL.test(keyword)) return "informationnel";
  if (COMPARATIF.test(keyword)) return "comparatif";
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
  // deburr : le test géo (GEO_OUEST) et le comptage de mots opèrent sur du
  // texte sans accent, pour que « sénégal », « café »… matchent bien.
  const kw = deburr(k.keyword);
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
