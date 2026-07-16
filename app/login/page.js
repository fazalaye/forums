"use client";

import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) router.replace("/profile");
  }, [session, router]);

  return (
    <div className="glass-card mx-auto flex max-w-md flex-col items-center gap-6 p-10 text-center">
      <span className="text-4xl">🧠</span>
      <h1 className="text-2xl font-extrabold">Connexion à PromptForums</h1>
      <p className="text-slate-300">
        Connectez-vous pour publier des prompts, commenter et suivre vos
        contributions préférées.
      </p>

      {status === "loading" ? (
        <p className="text-slate-400">Chargement…</p>
      ) : (
        <div className="flex w-full flex-col gap-3">
          <button
            onClick={() => signIn("google")}
            className="btn-secondary w-full"
          >
            Continuer avec Google
          </button>
          <button
            onClick={() => signIn("github")}
            className="btn-secondary w-full"
          >
            Continuer avec GitHub
          </button>
        </div>
      )}

      <p className="text-xs text-slate-500">
        Si aucun bouton ne fonctionne, l'administrateur du site doit configurer
        les identifiants OAuth (GOOGLE_CLIENT_ID, GITHUB_CLIENT_ID…) dans les
        variables d'environnement.
      </p>
    </div>
  );
}
