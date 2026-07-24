import { slugify } from "@/lib/slugify";
import { CATEGORIES } from "@/data/categories";

// Hacker News' Algolia search API — public, no key required. We query
// "Show HN" posts sorted by date: these are product launches (i.e. tools)
// rather than general discussion threads.
const HN_API = "https://hn.algolia.com/api/v1/search_by_date";

// Keywords used to guess a category from the HN title. First match wins;
// falls back to "chatbots". The admin can always change it before approving.
const CATEGORY_HINTS = [
  { slug: "image", words: ["image", "photo", "art", "diffusion", "midjourney", "avatar", "design"] },
  { slug: "video", words: ["video", "audio", "voice", "speech", "music", "podcast"] },
  { slug: "code", words: ["code", "coding", "developer", "dev", "api", "sdk", "agent", "github"] },
  { slug: "ecriture", words: ["write", "writing", "copy", "essay", "blog", "text"] },
  { slug: "marketing", words: ["marketing", "seo", "ads", "growth", "email"] },
  { slug: "productivite", words: ["productivity", "notes", "task", "workflow", "assistant", "automation"] },
  { slug: "business", words: ["business", "startup", "sales", "finance", "pitch"] },
];

function guessCategory(title) {
  const t = title.toLowerCase();
  for (const hint of CATEGORY_HINTS) {
    if (hint.words.some((w) => t.includes(w))) return hint.slug;
  }
  return "chatbots";
}

// Strips the common "Show HN: " / "Launch HN: " prefixes and any trailing
// " – tagline" so the provisional name is clean. The admin refines it after.
function cleanTitle(title) {
  return title
    .replace(/^(show hn:|launch hn:|ask hn:)\s*/i, "")
    .replace(/\s+[–—-]\s+.*$/, "")
    .trim();
}

/**
 * Fetches recent AI-related launches from Hacker News that link to an external
 * URL (the tool's own site). Returns normalized candidate objects ready to be
 * inserted as `status: "pending"` sites for admin review.
 *
 * @param {object} opts
 * @param {number} opts.minPoints  minimum HN points (default 15)
 * @param {number} opts.limit      max candidates returned (default 25)
 */
export async function fetchHackerNewsCandidates({ minPoints = 10, limit = 25 } = {}) {
  const params = new URLSearchParams({
    query: "AI",
    tags: "show_hn",
    numericFilters: `points>=${minPoints}`,
    hitsPerPage: "80",
  });

  const res = await fetch(`${HN_API}?${params.toString()}`, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Hacker News API a répondu ${res.status}`);
  }
  const data = await res.json();
  const hits = Array.isArray(data.hits) ? data.hits : [];

  const seen = new Set();
  const candidates = [];

  for (const hit of hits) {
    // Keep only launches with an external link (the tool's website) and an
    // AI-relevant title, and drop discussion-only / self posts.
    if (!hit.url || !hit.title) continue;
    const title = String(hit.title);
    if (!/\b(ai|llm|gpt|genai|artificial intelligence|prompt)\b/i.test(title)) continue;

    let parsed;
    try {
      parsed = new URL(hit.url);
    } catch {
      continue;
    }
    const host = parsed.hostname.replace(/^www\./, "");
    // Dedup on host + path so two different projects on the same platform
    // (e.g. github.com/a/x and github.com/b/y) are both kept.
    const key = (host + parsed.pathname.replace(/\/$/, "")).toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);

    const name = cleanTitle(title) || host;
    candidates.push({
      name,
      url: hit.url,
      slug: `${slugify(name) || slugify(host)}-hn${(hit.objectID || "").slice(-4)}`,
      description: title, // provisional — the admin rewrites this before approving
      category: guessCategory(title),
      pricing: "freemium",
      priceLabel: "Freemium",
      tags: ["Hacker News"],
      submittedBy: "hackernews",
      source: {
        name: "Hacker News",
        externalId: hit.objectID,
        points: hit.points,
        url: `https://news.ycombinator.com/item?id=${hit.objectID}`,
      },
    });

    if (candidates.length >= limit) break;
  }

  return candidates;
}

// Exposed so the API layer can validate a category the admin submits.
export const VALID_CATEGORY_SLUGS = CATEGORIES.map((c) => c.slug);
