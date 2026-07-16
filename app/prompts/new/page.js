"use client";

import { useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { CATEGORIES } from "@/data/categories";

export default function NewPromptPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    content: "",
    category: CATEGORIES[0].slug,
    tags: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (status === "loading") {
    return <p className="text-center text-slate-400">Chargement…</p>;
  }

  if (!session) {
    return (
      <div className="glass-card mx-auto max-w-lg flex-col gap-4 p-10 text-center">
        <h1 className="mb-3 text-2xl font-bold">Connectez-vous pour publier</h1>
        <p className="mb-6 text-slate-300">
          Vous devez être connecté pour partager un prompt avec la communauté.
        </p>
        <button onClick={() => signIn()} className="btn-primary">
          Se connecter
        </button>
      </div>
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/prompts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          tags: form.tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur inconnue.");
      router.push(`/prompts/${data.prompt._id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 text-3xl font-extrabold">Publier un prompt</h1>
      <form onSubmit={handleSubmit} className="glass-card flex flex-col gap-5 p-8">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-300">
            Titre
          </label>
          <input
            required
            className="input-field"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Ex : Assistant de révision de code impitoyable"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-300">
            Catégorie
          </label>
          <select
            className="input-field"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat.slug} value={cat.slug}>
                {cat.emoji} {cat.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-300">
            Contenu du prompt
          </label>
          <textarea
            required
            rows={8}
            className="input-field"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            placeholder="Écrivez votre prompt ici…"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-300">
            Tags (séparés par des virgules)
          </label>
          <input
            className="input-field"
            value={form.tags}
            onChange={(e) => setForm({ ...form, tags: e.target.value })}
            placeholder="ex : review, qualité"
          />
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <button type="submit" disabled={loading} className="btn-primary disabled:opacity-60">
          {loading ? "Publication…" : "Publier le prompt"}
        </button>
      </form>
    </div>
  );
}
