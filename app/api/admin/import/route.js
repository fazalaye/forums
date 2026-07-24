import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { dbConnect } from "@/lib/mongodb";
import Site from "@/models/Site";
import { fetchHackerNewsCandidates } from "@/lib/sources/hackernews";

export const dynamic = "force-dynamic";

/**
 * Admin-only. Pulls fresh AI-tool candidates from Hacker News and inserts the
 * new ones as `status: "pending"` for review. Never publishes automatically —
 * duplicates (same URL host or slug) are skipped so re-running is safe.
 */
export async function POST() {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Accès réservé à l'administrateur." }, { status: 403 });
  }

  const conn = await dbConnect();
  if (!conn) {
    return NextResponse.json(
      { error: "Base de données non configurée (MONGODB_URI manquant)." },
      { status: 503 }
    );
  }

  let candidates;
  try {
    candidates = await fetchHackerNewsCandidates({ minPoints: 15, limit: 25 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 502 });
  }

  let inserted = 0;
  let skipped = 0;

  for (const c of candidates) {
    // Skip if we already have this tool (by exact URL or by slug) in any state.
    const exists = await Site.exists({
      $or: [{ url: c.url }, { slug: c.slug }],
    });
    if (exists) {
      skipped += 1;
      continue;
    }
    try {
      await Site.create({
        name: c.name,
        url: c.url,
        slug: c.slug,
        description: c.description,
        category: c.category,
        pricing: c.pricing,
        priceLabel: c.priceLabel,
        tags: c.tags,
        submittedBy: c.submittedBy,
        status: "pending",
      });
      inserted += 1;
    } catch {
      // Unique-index race or validation issue — count as skipped, keep going.
      skipped += 1;
    }
  }

  return NextResponse.json({
    source: "Hacker News",
    found: candidates.length,
    inserted,
    skipped,
    message: `${inserted} nouvel(le)s outil(s) ajouté(s) en attente de validation, ${skipped} déjà connu(s) ou ignoré(s).`,
  });
}
