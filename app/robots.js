import { SITE_URL } from "@/lib/seo";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        // NextAuth's client fetches /api/auth/session on every page render.
        // Blocking it makes Googlebot report the page's own resources as
        // unreachable and triggers a client-side error logged to
        // /api/auth/_log. The endpoint returns an empty session for an
        // anonymous crawler, so it is safe to expose while /api/ stays closed.
        allow: ["/", "/api/auth/session"],
        disallow: ["/api/", "/profile"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
