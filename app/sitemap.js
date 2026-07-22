import { SITE_URL } from "@/lib/seo";

export default function sitemap() {
  const now = new Date();
  const routes = [
    "",
    "/prompts",
    "/submit",
    "/a-propos",
    "/contact",
    "/legal",
    "/privacy",
    "/guides/meilleurs-outils-ia-francophones-2026",
  ];
  return routes.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1 : 0.7,
  }));
}
