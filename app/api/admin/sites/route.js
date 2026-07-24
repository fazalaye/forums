import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { dbConnect } from "@/lib/mongodb";
import Site from "@/models/Site";
import { VALID_CATEGORY_SLUGS } from "@/lib/sources/hackernews";

export const dynamic = "force-dynamic";

const PRICINGS = ["gratuit", "freemium", "payant"];

/**
 * Admin-only. Lists sites awaiting moderation (default status=pending).
 */
export async function GET(request) {
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

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status") || "pending";

  const sites = await Site.find({ status })
    .sort({ createdAt: -1 })
    .limit(100)
    .lean();

  return NextResponse.json({ sites: JSON.parse(JSON.stringify(sites)) });
}

/**
 * Admin-only. Approve / reject a pending site, optionally editing its fields
 * in the same call (the human value-add: rewrite the description, fix the
 * category, mark as featured) before it goes live.
 *
 * Body: { id, action: "approve" | "reject", patch?: {...} }
 */
export async function PATCH(request) {
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

  const { id, action, patch } = (await request.json()) || {};
  if (!id || !["approve", "reject"].includes(action)) {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const update = { status: action === "approve" ? "approved" : "rejected" };

  if (patch && typeof patch === "object") {
    if (typeof patch.name === "string" && patch.name.trim()) update.name = patch.name.trim();
    if (typeof patch.description === "string" && patch.description.trim())
      update.description = patch.description.trim();
    if (typeof patch.priceLabel === "string") update.priceLabel = patch.priceLabel.trim();
    if (VALID_CATEGORY_SLUGS.includes(patch.category)) update.category = patch.category;
    if (PRICINGS.includes(patch.pricing)) update.pricing = patch.pricing;
    if (typeof patch.featured === "boolean") update.featured = patch.featured;
  }

  // Approving requires a real, human-written description, not the raw HN title.
  if (action === "approve") {
    const site = await Site.findById(id).lean();
    const finalDescription = update.description || site?.description || "";
    if (finalDescription.length < 20) {
      return NextResponse.json(
        { error: "Rédigez une description (20 caractères min.) avant de publier." },
        { status: 400 }
      );
    }
  }

  const site = await Site.findByIdAndUpdate(id, update, { new: true });
  if (!site) {
    return NextResponse.json({ error: "Site introuvable." }, { status: 404 });
  }

  return NextResponse.json({ site: JSON.parse(JSON.stringify(site)) });
}
