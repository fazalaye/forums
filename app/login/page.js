"use client";

import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const isDev = process.env.NODE_ENV !== "production";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [devName, setDevName] = useState("");
  const [devEmail, setDevEmail] = useState("");
  const [devLoading, setDevLoading] = useState(false);

  useEffect(() => {
    if (session) router.replace("/profile");
  }, [session, router]);

  async function handleDevLogin(e) {
    e.preventDefault();
    setDevLoading(true);
    await signIn("dev-test-login", {
      name: devName,
      email: devEmail,
      callbackUrl: "/profile",
    });
    setDevLoading(false);
  }

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

      {isDev && (
        <form
          onSubmit={handleDevLogin}
          className="mt-2 w-full border-t border-white/10 pt-6 text-left"
        >
          <p className="mb-3 text-center text-xs font-semibold uppercase tracking-wide text-amber-300">
            🧪 Connexion de test (dev uniquement)
          </p>
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Nom (optionnel)"
              value={devName}
              onChange={(e) => setDevName(e.target.value)}
              className="input-field"
            />
            <input
              type="email"
              required
              placeholder="test@example.com"
              value={devEmail}
              onChange={(e) => setDevEmail(e.target.value)}
              className="input-field"
            />
            <button
              type="submit"
              disabled={devLoading}
              className="btn-secondary w-full disabled:opacity-60"
            >
              {devLoading ? "Connexion…" : "Se connecter en mode test"}
            </button>
          </div>
          <p className="mt-2 text-center text-xs text-slate-500">
            Aucun mot de passe requis — désactivé automatiquement en
            production.
          </p>
        </form>
      )}
    </div>
  );
}
