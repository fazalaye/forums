import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { dbConnect } from "@/lib/mongodb";
import Prompt from "@/models/Prompt";
import { SEED_PROMPTS } from "@/data/prompts";

export const dynamic = "force-dynamic";

/**
 * Admin-only. Copies the demo prompts from SEED_PROMPTS into the real
 * Prompt collection, so they persist as real documents instead of only
 * appearing while the collection is empty. Skips titles that already
 * exist, so re-running is safe.
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

  for (const p of SEED_PROMPTS) {
    const exists = await Prompt.exists({ title: p.title });
    if (exists) {
      skipped += 1;
      continue;
    }
    try {
      await Prompt.create({
        title: p.title,
        content: p.content,
        category: p.category,
        tags: p.tags,
        author: p.author,
        upvotes: p.upvotes,
        comments: (p.comments || []).map((c) => ({
          author: c.author,
          body: c.body,
        })),
      });
      inserted += 1;
    } catch {
      // Unique-index race or validation issue — count as skipped, keep going.
      skipped += 1;
    }
  }

  return NextResponse.json({
    total: SEED_PROMPTS.length,
    inserted,
    skipped,
    message: `${inserted} prompt(s) importé(s) dans la base de données, ${skipped} déjà existant(s) ou ignoré(s).`,
  });
}
