"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession, signIn } from "next-auth/react";
import { CATEGORIES } from "@/data/categories";

const PRICINGS = [
  { value: "gratuit", label: "Gratuit" },
  { value: "freemium", label: "Freemium" },
  { value: "payant", label: "Payant" },
];

function PendingCard({ site, onModerate }) {
  const [form, setForm] = useState({
    name: site.name,
    description: site.description,
    category: site.category,
    pricing: site.pricing,
    priceLabel: site.priceLabel,
    featured: site.featured,
  });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function act(action) {
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin/sites", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: site._id, action, patch: form }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur.");
      onModerate(site._id);
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  }

  return (
    <div className="glass-card flex flex-col gap-3 p-5">
      <div className="flex items-center justify-between gap-2">
        <a href={site.url} target="_blank" rel="noopener" className="text-sm text-brand-300 underline break-all">
          {site.url} ↗
        </a>
        <span className="shrink-0 rounded-full bg-white/5 px-2 py-1 text-xs text-slate-400">
          {site.submittedBy || "manuel"}
        </span>
      </div>

      <input
        className="input-field py-2 font-semibold"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        placeholder="Nom de l'outil"
      />

      <textarea
        rows={3}
        className="input-field py-2 text-sm"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        placeholder="Réécris une description originale (min. 20 caractères)…"
      />

      <div className="grid grid-cols-2 gap-2">
        <select
          className="input-field py-2 text-sm"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          {CATEGORIES.map((c) => (
            <option key={c.slug} value={c.slug}>{c.emoji} {c.label}</option>
          ))}
        </select>
        <select
          className="input-field py-2 text-sm"
          value={form.pricing}
          onChange={(e) => setForm({ ...form, pricing: e.target.value })}
        >
          {PRICINGS.map((p) => (
            <option key={p.value} value={p.value}>{p.label}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 items-center gap-2">
        <input
          className="input-field py-2 text-sm"
          value={form.priceLabel}
          onChange={(e) => setForm({ ...form, priceLabel: e.target.value })}
          placeholder="Tarif affiché"
        />
        <label className="flex items-center gap-2 text-sm text-slate-300">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => setForm({ ...form, featured: e.target.checked })}
          />
          ⭐ Featured
        </label>
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <div className="flex gap-2">
        <button onClick={() => act("approve")} disabled={busy} className="btn-primary flex-1 disabled:opacity-60">
          {busy ? "…" : "✓ Publier"}
        </button>
        <button onClick={() => act("reject")} disabled={busy} className="btn-secondary disabled:opacity-60">
          ✕ Rejeter
        </button>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const { data: session, status } = useSession();
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [importing, setImporting] = useState(false);
  const [notice, setNotice] = useState("");
  const [forbidden, setForbidden] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/sites?status=pending");
    if (res.status === 403) {
      setForbidden(true);
      setLoading(false);
      return;
    }
    const data = await res.json();
    setPending(data.sites || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (session) load();
  }, [session, load]);

  async function runImport() {
    setImporting(true);
    setNotice("");
    try {
      const res = await fetch("/api/admin/import", { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur.");
      setNotice(data.message);
      await load();
    } catch (err) {
      setNotice(err.message);
    } finally {
      setImporting(false);
    }
  }

  if (status === "loading") {
    return <p className="text-center text-slate-400">Chargement…</p>;
  }

  if (!session) {
    return (
      <div className="glass-card mx-auto max-w-lg p-10 text-center">
        <h1 className="mb-3 text-2xl font-bold">Espace administrateur</h1>
        <p className="mb-6 text-slate-300">Connectez-vous pour accéder à la modération.</p>
        <button onClick={() => signIn()} className="btn-primary">Se connecter</button>
      </div>
    );
  }

  if (forbidden) {
    return (
      <div className="glass-card mx-auto max-w-lg p-10 text-center">
        <h1 className="mb-3 text-2xl font-bold">Accès refusé</h1>
        <p className="text-slate-300">
          Ce compte n'est pas administrateur. Ajoutez votre e-mail à la variable
          <code className="mx-1 rounded bg-white/10 px-1">ADMIN_EMAILS</code>
          sur Vercel.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold">Modération</h1>
          <p className="text-sm text-slate-400">
            {pending.length} outil(s) en attente de validation
          </p>
        </div>
        <button onClick={runImport} disabled={importing} className="btn-primary disabled:opacity-60">
          {importing ? "Import en cours…" : "⬇ Importer depuis Hacker News"}
        </button>
      </div>

      {notice && (
        <p className="glass mb-6 rounded-xl p-4 text-sm text-slate-200">{notice}</p>
      )}

      {loading ? (
        <p className="text-slate-400">Chargement…</p>
      ) : pending.length === 0 ? (
        <p className="glass-card p-8 text-center text-slate-400">
          Rien à modérer. Clique « Importer depuis Hacker News » pour récupérer
          de nouveaux outils IA.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {pending.map((site) => (
            <PendingCard
              key={site._id}
              site={site}
              onModerate={(id) => setPending((prev) => prev.filter((s) => s._id !== id))}
            />
          ))}
        </div>
      )}
    </div>
  );
}
