import { SITE_URL } from "@/lib/seo";
import { CATEGORIES } from "@/data/categories";
import { dbConnect } from "@/lib/mongodb";
import Prompt from "@/models/Prompt";

export default async function sitemap() {
  const now = new Date();
  const routes = [
    "",
    "/prompts",
    "/submit",
    "/a-propos",
    "/contact",
    "/legal",
    "/privacy",
    "/guides",
    "/guides/meilleurs-outils-ia-francophones-2026",
    "/guides/meilleurs-prompts-chatgpt-2026",
    "/guides/affiche-produit-chatgpt-etude-de-cas",
    "/guides/outils-ia-gratuits-francais-afrique",
    "/guides/creer-business-plan-etude-marche-ia-afrique",
    "/guides/cv-lettre-motivation-entretien-ia-afrique",
    ...CATEGORIES.map((c) => `/category/${c.slug}`),
  ];

  const staticEntries = routes.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: path.startsWith("/category/")
      ? "weekly"
      : path === ""
        ? "daily"
        : "weekly",
    priority: path.startsWith("/category/") ? 0.6 : path === "" ? 1 : 0.7,
  }));

  let promptEntries = [];
  const conn = await dbConnect();
  if (conn) {
    const prompts = await Prompt.find({ slug: { $exists: true, $ne: null } })
      .select("slug updatedAt")
      .lean();
    promptEntries = prompts.map((p) => ({
      url: `${SITE_URL}/prompts/${p.slug}`,
      lastModified: p.updatedAt || now,
      changeFrequency: "monthly",
      priority: 0.5,
    }));
  }

  return [...staticEntries, ...promptEntries];
}
