import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { dbConnect } from "@/lib/mongodb";
import Site from "@/models/Site";
import { CURATED_SITES } from "@/data/curatedSites";

export const dynamic = "force-dynamic";

/**
 * Admin-only. Inserts the editorially-curated, well-known AI tools from
 * CURATED_SITES into the real Site collection as approved staff picks.
 * Skips tools that already exist (by slug or URL), so re-running is safe.
 */
export async function GET() {
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

  let inserted = 0;
  let skipped = 0;

  for (const c of CURATED_SITES) {
    const exists = await Site.exists({
      $or: [{ slug: c.slug }, { url: c.url }],
    });
    if (exists) {
      skipped += 1;
      continue;
    }
    try {
      await Site.create({
        ...c,
        status: "approved",
        staffPick: true,
      });
      inserted += 1;
    } catch {
      // Unique-index race or validation issue — count as skipped, keep going.
      skipped += 1;
    }
  }

  return NextResponse.json({
    total: CURATED_SITES.length,
    inserted,
    skipped,
    message: `${inserted} outil(s) ajouté(s) à l'annuaire, ${skipped} déjà existant(s) ou ignoré(s).`,
  });
}
