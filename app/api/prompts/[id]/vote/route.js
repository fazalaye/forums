import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { dbConnect } from "@/lib/mongodb";
import Prompt from "@/models/Prompt";

export async function POST(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { error: "Vous devez être connecté pour voter." },
      { status: 401 }
    );
  }

  const conn = await dbConnect();
  if (!conn) {
    return NextResponse.json(
      { error: "Base de données non configurée (MONGODB_URI manquant)." },
      { status: 503 }
    );
  }

  const email = (session.user?.email || "").toLowerCase();

  const prompt = await Prompt.findById(params.id);
  if (!prompt) {
    return NextResponse.json({ error: "Prompt introuvable." }, { status: 404 });
  }

  if (prompt.voters.includes(email)) {
    return NextResponse.json(
      {
        error: "Vous avez déjà voté pour ce prompt.",
        upvotes: prompt.upvotes,
      },
      { status: 409 }
    );
  }

  const updated = await Prompt.findByIdAndUpdate(
    params.id,
    { $inc: { upvotes: 1 }, $addToSet: { voters: email } },
    { new: true }
  );

  return NextResponse.json({ upvotes: updated.upvotes });
}
