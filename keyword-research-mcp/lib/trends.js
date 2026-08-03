/**
 * Google Trends — gratuit, sans cle. Utilise le paquet non officiel
 * `google-trends-api` (Google peut changer ses endpoints : on echoue proprement).
 */

let gt = null;
async function loadTrends() {
  if (gt) return gt;
  try {
    const mod = await import("google-trends-api");
    gt = mod.default ?? mod;
    return gt;
  } catch (e) {
    throw new Error(
      "google-trends-api indisponible. Lance `npm install` dans le dossier du serveur. Detail: " + e.message
    );
  }
}

function safeParse(raw) {
  try {
    return JSON.parse(raw);
  } catch {
    throw new Error("Reponse Google Trends illisible (Google a probablement change son endpoint ou limite le debit).");
  }
}

/**
 * Interet dans le temps pour un ou plusieurs termes.
 * geo: 'SN', 'CI', 'ML', 'FR', '' (monde)
 */
export async function interestOverTime(keywords, { geo = "SN", months = 12, hl = "fr-FR" } = {}) {
  const api = await loadTrends();
  const startTime = new Date();
  startTime.setMonth(startTime.getMonth() - months);

  const raw = await api.interestOverTime({
    keyword: keywords,
    geo,
    startTime,
    hl,
  });
  const parsed = safeParse(raw);
  const timeline = parsed?.default?.timelineData ?? [];

  const series = keywords.map((kw, i) => {
    const values = timeline.map((p) => p.value?.[i] ?? 0);
    const half = Math.floor(values.length / 2);
    const avgOld = avg(values.slice(0, half));
    const avgNew = avg(values.slice(half));
    return {
      keyword: kw,
      points: timeline.map((p, idx) => ({ date: p.formattedTime, value: values[idx] })),
      average: round(avg(values)),
      trend:
        avgOld === 0
          ? (avgNew > 0 ? "emergent" : "aucune donnee")
          : avgNew > avgOld * 1.15
            ? "hausse"
            : avgNew < avgOld * 0.85
              ? "baisse"
              : "stable",
      variationPct: avgOld === 0 ? null : round(((avgNew - avgOld) / avgOld) * 100),
    };
  });

  return { geo, months, series };
}

/** Comparaison de la popularite relative par region/pays. */
export async function interestByRegion(keywords, { geo = "", resolution = "COUNTRY", hl = "fr-FR" } = {}) {
  const api = await loadTrends();
  const raw = await api.interestByRegion({ keyword: keywords, geo, resolution, hl });
  const parsed = safeParse(raw);
  const data = parsed?.default?.geoMapData ?? [];
  return data
    .filter((d) => d.hasData?.some(Boolean))
    .map((d) => ({ region: d.geoName, code: d.geoCode, values: d.value }))
    .slice(0, 40);
}

/** Requetes associees (montantes + top). */
export async function relatedQueries(keyword, { geo = "SN", hl = "fr-FR" } = {}) {
  const api = await loadTrends();
  const raw = await api.relatedQueries({ keyword, geo, hl });
  const parsed = safeParse(raw);
  const ranked = parsed?.default?.rankedList ?? [];
  const pick = (idx) =>
    (ranked[idx]?.rankedKeyword ?? []).map((k) => ({
      query: k.query,
      value: k.value,
      growth: k.formattedValue,
    }));
  return { top: pick(0), rising: pick(1) };
}

const avg = (a) => (a.length ? a.reduce((s, v) => s + v, 0) / a.length : 0);
const round = (n) => Math.round(n * 10) / 10;
