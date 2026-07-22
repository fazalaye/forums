"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function ProfilePage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p className="text-center text-slate-400">Chargement…</p>;
  }

  if (!session) {
    return (
      <div className="glass-card mx-auto max-w-lg flex-col gap-4 p-10 text-center">
        <h1 className="mb-3 text-2xl font-bold">Vous n'êtes pas connecté</h1>
        <p className="mb-6 text-slate-300">
          Connectez-vous pour accéder à votre profil.
        </p>
        <button onClick={() => signIn()} className="btn-primary">
          Se connecter
        </button>
      </div>
    );
  }

  const user = session.user || {};

  return (
    <div className="mx-auto max-w-xl">
      <div className="glass-card flex flex-col items-center gap-4 p-10 text-center">
        {user.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={user.image}
            alt={user.name || "Avatar"}
            className="h-20 w-20 rounded-full border border-white/20"
          />
        ) : (
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-gradient text-3xl font-bold">
            {(user.name || user.email || "?")[0].toUpperCase()}
          </div>
        )}
        <h1 className="text-2xl font-extrabold">{user.name || "Utilisateur"}</h1>
        <p className="text-slate-400">{user.email}</p>

        <div className="mt-4 flex gap-3">
          <a href="/prompts/new" className="btn-primary">
            Publier un prompt
          </a>
          <button onClick={() => signOut()} className="btn-secondary">
            Se déconnecter
          </button>
        </div>
      </div>
    </div>
  );
}
