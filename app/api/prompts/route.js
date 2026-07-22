import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { dbConnect } from "@/lib/mongodb";
import Prompt from "@/models/Prompt";
import { SEED_PROMPTS } from "@/data/prompts";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const q = searchParams.get("q")?.toLowerCase();

  const conn = await dbConnect();
  let prompts;

  if (conn) {
    const dbPrompts = await Prompt.find({}).sort({ createdAt: -1 }).lean();
    prompts = dbPrompts.length > 0 ? dbPrompts : SEED_PROMPTS;
  } else {
    prompts = SEED_PROMPTS;
  }

  let filtered = prompts;
  if (category && category !== "all") {
    filtered = filtered.filter((p) => p.category === category);
  }
  if (q) {
    filtered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.content.toLowerCase().includes(q)
    );
  }

  return NextResponse.json({ prompts: filtered, demoMode: !conn });
}

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { error: "Vous devez être connecté pour publier un prompt." },
      { status: 401 }
    );
  }

  const { title, content, category, tags } = (await request.json()) || {};
  if (!title || !content || !category) {
    return NextResponse.json(
      { error: "Titre, contenu et catégorie sont requis." },
      { status: 400 }
    );
  }

  const conn = await dbConnect();
  if (!conn) {
    return NextResponse.json(
      {
        error:
          "La base de données n'est pas configurée (MONGODB_URI manquant) : impossible d'enregistrer ce prompt en mode démo.",
      },
      { status: 503 }
    );
  }

  const prompt = await Prompt.create({
    title,
    content,
    category,
    tags: Array.isArray(tags) ? tags : [],
    author: session.user?.name || "Anonyme",
    authorEmail: session.user?.email || "",
  });

  return NextResponse.json({ prompt });
}
