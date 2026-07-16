import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { dbConnect } from "@/lib/mongodb";
import Prompt from "@/models/Prompt";
import { SEED_PROMPTS } from "@/data/prompts";

export async function GET(request, { params }) {
  const conn = await dbConnect();

  if (!conn) {
    const prompt = SEED_PROMPTS.find((p) => p._id === params.id);
    if (!prompt) {
      return NextResponse.json({ error: "Prompt introuvable." }, { status: 404 });
    }
    return NextResponse.json({ prompt, demoMode: true });
  }

  const prompt = await Prompt.findById(params.id).lean();
  if (!prompt) {
    return NextResponse.json({ error: "Prompt introuvable." }, { status: 404 });
  }
  return NextResponse.json({ prompt });
}

export async function POST(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { error: "Vous devez être connecté pour commenter." },
      { status: 401 }
    );
  }

  const { body } = (await request.json()) || {};
  if (!body || !body.trim()) {
    return NextResponse.json({ error: "Commentaire vide." }, { status: 400 });
  }

  const conn = await dbConnect();
  if (!conn) {
    return NextResponse.json(
      {
        error:
          "La base de données n'est pas configurée (MONGODB_URI manquant) : impossible d'enregistrer ce commentaire en mode démo.",
      },
      { status: 503 }
    );
  }

  const prompt = await Prompt.findByIdAndUpdate(
    params.id,
    {
      $push: {
        comments: {
          author: session.user?.name || "Anonyme",
          authorEmail: session.user?.email || "",
          body,
        },
      },
    },
    { new: true }
  );

  if (!prompt) {
    return NextResponse.json({ error: "Prompt introuvable." }, { status: 404 });
  }

  return NextResponse.json({ prompt });
}
