import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Site from "@/models/Site";
import { SEED_SITES } from "@/data/sites";

function slugify(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const q = searchParams.get("q")?.toLowerCase();

  const conn = await dbConnect();
  let sites;

  if (conn) {
    const dbSites = await Site.find({ status: "approved" })
      .sort({ featured: -1, createdAt: -1 })
      .lean();
    sites = dbSites.length > 0 ? dbSites : SEED_SITES;
  } else {
    sites = SEED_SITES;
  }

  let filtered = sites;
  if (category && category !== "all") {
    filtered = filtered.filter((s) => s.category === category);
  }
  if (q) {
    filtered = filtered.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        (s.tags || []).some((t) => t.toLowerCase().includes(q))
    );
  }

  return NextResponse.json({ sites: filtered, demoMode: !conn });
}

export async function POST(request) {
  const body = await request.json();
  const { name, url, category, description, pricing, priceLabel, submittedBy, featured } =
    body || {};

  if (!name || !url || !category || !description) {
    return NextResponse.json(
      { error: "Champs requis manquants (nom, url, catégorie, description)." },
      { status: 400 }
    );
  }

  const conn = await dbConnect();
  if (!conn) {
    return NextResponse.json({
      message:
        "Soumission reçue en mode démo. Configurez MONGODB_URI pour activer la persistance et la modération.",
      demoMode: true,
    });
  }

  const slug = slugify(name) + "-" + Math.random().toString(36).slice(2, 6);

  const site = await Site.create({
    name,
    url,
    slug,
    category,
    description,
    pricing: pricing || "gratuit",
    priceLabel: priceLabel || "Gratuit",
    submittedBy: submittedBy || "",
    featured: Boolean(featured),
    status: "pending",
  });

  return NextResponse.json({
    message:
      "Merci ! Votre site a été soumis et sera examiné avant publication.",
    site,
  });
}
