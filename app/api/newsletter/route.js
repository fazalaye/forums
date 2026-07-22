import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Subscriber from "@/models/Subscriber";

export async function POST(request) {
  const { email, plan } = (await request.json()) || {};

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Adresse e-mail invalide." }, { status: 400 });
  }

  const conn = await dbConnect();
  if (!conn) {
    return NextResponse.json({
      message:
        "Inscription confirmée en mode démo (configurez MONGODB_URI pour la persistance réelle).",
      demoMode: true,
    });
  }

  try {
    await Subscriber.findOneAndUpdate(
      { email: email.toLowerCase() },
      { email: email.toLowerCase(), plan: plan === "premium" ? "premium" : "free" },
      { upsert: true, new: true }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Impossible d'enregistrer l'inscription." },
      { status: 500 }
    );
  }

  return NextResponse.json({
    message: "Merci ! Vérifiez votre boîte mail pour confirmer votre abonnement Premium.",
  });
}
