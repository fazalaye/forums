import { SITE_URL } from "@/lib/seo";
import { CATEGORIES } from "@/data/categories";
import { dbConnect } from "@/lib/mongodb";
import Prompt from "@/models/Prompt";

export const dynamic = "force-dynamic";

// Real publication / last-update dates, taken from each page's git history.
// Never derive these from `new Date()`: the route is force-dynamic, so every
// fetch would claim the whole site had just changed. Google drops lastmod
// entirely for sites whose values it finds unreliable, which costs us the
// crawl prioritisation a young site depends on.
//
// When you meaningfully edit a page, bump its date here.
const ROUTES = [
  { path: "", lastModified: "2026-07-30", changeFrequency: "daily", priority: 1 },
  { path: "/prompts", lastModified: "2026-08-01" },
  { path: "/submit", lastModified: "2026-07-16" },
  { path: "/a-propos", lastModified: "2026-07-22" },
  { path: "/contact", lastModified: "2026-07-28" },
  { path: "/legal", lastModified: "2026-07-28" },
  { path: "/privacy", lastModified: "2026-07-28" },
  { path: "/guides", lastModified: "2026-08-05" },
  { path: "/boutique", lastModified: "2026-08-07" },
  {
    path: "/guides/meilleurs-outils-ia-francophones-2026",
    lastModified: "2026-07-30",
  },
  { path: "/guides/meilleurs-prompts-chatgpt-2026", lastModified: "2026-08-01" },
  {
    path: "/guides/affiche-produit-chatgpt-etude-de-cas",
    lastModified: "2026-08-01",
  },
  {
    path: "/guides/outils-ia-gratuits-francais-afrique",
    lastModified: "2026-08-06",
  },
  {
    path: "/guides/creer-business-plan-etude-marche-ia-afrique",
    lastModified: "2026-08-01",
  },
  {
    path: "/guides/cv-lettre-motivation-entretien-ia-afrique",
    lastModified: "2026-08-06",
  },
  {
    path: "/guides/deepseek-avis-performances-limites-2026",
    lastModified: "2026-08-02",
  },
  {
    path: "/guides/definition-intelligence-artificielle",
    lastModified: "2026-08-05",
  },
  { path: "/guides/ia-pronostics-foot-gratuit", lastModified: "2026-08-07" },
  { path: "/guides/se-former-ia-senegal", lastModified: "2026-08-03" },
];

const CATEGORIES_LAST_MODIFIED = "2026-08-01";

export default async function sitemap() {
  const staticEntries = ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: new Date(route.lastModified),
    changeFrequency: route.changeFrequency ?? "weekly",
    priority: route.priority ?? 0.7,
  }));

  const categoryEntries = CATEGORIES.map((c) => ({
    url: `${SITE_URL}/category/${c.slug}`,
    lastModified: new Date(CATEGORIES_LAST_MODIFIED),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  let promptEntries = [];
  const conn = await dbConnect();
  if (conn) {
    const prompts = await Prompt.find({ slug: { $exists: true, $ne: null } })
      .select("slug updatedAt createdAt")
      .lean();
    promptEntries = prompts.map((p) => ({
      url: `${SITE_URL}/prompts/${p.slug}`,
      lastModified: p.updatedAt || p.createdAt,
      changeFrequency: "monthly",
      priority: 0.5,
    }));
  }

  return [...staticEntries, ...categoryEntries, ...promptEntries];
}
