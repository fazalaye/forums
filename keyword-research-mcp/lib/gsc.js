/**
 * Google Search Console — API officielle, gratuite, illimitee en pratique.
 * C'est LA meilleure source : ce sont tes vraies requetes Google.
 *
 * Auth : compte de service (le plus simple pour un solo).
 *   1. console.cloud.google.com -> nouveau projet -> activer "Search Console API"
 *   2. Creer un compte de service -> telecharger la cle JSON
 *   3. Dans Search Console -> Parametres -> Utilisateurs -> ajouter l'email
 *      du compte de service en lecture seule
 *   4. export GSC_CREDENTIALS_PATH=/chemin/vers/cle.json
 */

let cachedClient = null;

async function getClient() {
  if (cachedClient) return cachedClient;

  const keyFile = process.env.GSC_CREDENTIALS_PATH || process.env.GOOGLE_APPLICATION_CREDENTIALS;
  if (!keyFile) {
    throw new Error(
      "GSC non configure. Definis GSC_CREDENTIALS_PATH vers le JSON de ton compte de service, " +
        "et ajoute l'email du compte de service comme utilisateur dans Search Console."
    );
  }

  const { google } = await import("googleapis");
  const auth = new google.auth.GoogleAuth({
    keyFile,
    scopes: ["https://www.googleapis.com/auth/webmasters.readonly"],
  });
  cachedClient = google.searchconsole({ version: "v1", auth });
  return cachedClient;
}

export async function listSites() {
  const client = await getClient();
  const res = await client.sites.list();
  return (res.data.siteEntry ?? []).map((s) => ({
    site: s.siteUrl,
    permission: s.permissionLevel,
  }));
}

function isoDaysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().slice(0, 10);
}

/**
 * Requetes reelles avec impressions / clics / CTR / position.
 * @param {string} siteUrl ex: "sc-domain:promptforums.org" ou "https://promptforums.org/"
 */
export async function topQueries(siteUrl, opts = {}) {
  const {
    days = 90,
    rowLimit = 250,
    country = null, // ex: 'sen', 'civ', 'fra'
    dimension = "query",
    filterContains = null,
  } = opts;

  const client = await getClient();
  const filters = [];
  if (country) filters.push({ dimension: "country", operator: "equals", expression: country });
  if (filterContains)
    filters.push({ dimension: "query", operator: "contains", expression: filterContains });

  const res = await client.searchanalytics.query({
    siteUrl,
    requestBody: {
      startDate: isoDaysAgo(days),
      endDate: isoDaysAgo(1),
      dimensions: dimension === "query_page" ? ["query", "page"] : [dimension],
      rowLimit,
      ...(filters.length ? { dimensionFilterGroups: [{ filters }] } : {}),
    },
  });

  return (res.data.rows ?? []).map((r) => ({
    query: r.keys[0],
    ...(r.keys[1] ? { page: r.keys[1] } : {}),
    clicks: r.clicks,
    impressions: r.impressions,
    ctr: Math.round(r.ctr * 10000) / 100,
    position: Math.round(r.position * 10) / 10,
  }));
}

/**
 * Le filon le plus rentable : les requetes en position 5-20.
 * Beaucoup d'impressions, peu de clics -> une optimisation suffit souvent.
 */
export async function strikingDistance(siteUrl, opts = {}) {
  const { days = 90, minImpressions = 30, minPos = 4, maxPos = 20 } = opts;
  const rows = await topQueries(siteUrl, { days, rowLimit: 1000 });
  return rows
    .filter(
      (r) => r.position >= minPos && r.position <= maxPos && r.impressions >= minImpressions
    )
    .map((r) => ({
      ...r,
      // clics potentiels si la requete passait en top 3 (~20% CTR)
      clicsPotentiels: Math.round(r.impressions * 0.2) - r.clicks,
    }))
    .sort((a, b) => b.clicsPotentiels - a.clicsPotentiels)
    .slice(0, 50);
}
