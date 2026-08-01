import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { dbConnect } from "@/lib/mongodb";
import Prompt from "@/models/Prompt";
import { slugify, truncateSlug } from "@/lib/slugify";

export const dynamic = "force-dynamic";

/**
 * Admin-only, one-time migration. Assigns a readable slug (derived from the
 * title) to every existing Prompt document that doesn't have one yet.
 * Safe to re-run: only touches documents without a slug.
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

  const withoutSlug = await Prompt.find({
    $or: [{ slug: { $exists: false } }, { slug: null }],
  });

  const existingSlugs = new Set(
    (await Prompt.find({ slug: { $exists: true, $ne: null } }).select("slug").lean()).map(
      (p) => p.slug
    )
  );

  let updated = 0;
  for (const prompt of withoutSlug) {
    const baseSlug = truncateSlug(slugify(prompt.title));
    let slug = baseSlug;
    let suffix = 2;
    while (existingSlugs.has(slug)) {
      slug = `${baseSlug}-${suffix}`;
      suffix += 1;
    }
    existingSlugs.add(slug);
    prompt.slug = slug;
    await prompt.save();
    updated += 1;
  }

  return NextResponse.json({
    total: withoutSlug.length,
    updated,
    message: `${updated} prompt(s) ont reçu un slug lisible.`,
  });
}
