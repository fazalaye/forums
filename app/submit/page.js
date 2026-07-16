"use client";

import { useState } from "react";
import { CATEGORIES } from "@/data/categories";

const PLANS = [
  {
    id: "gratuit",
    label: "Listing gratuit",
    price: "0 €",
    perks: ["Fiche standard", "Visible dans l'annuaire", "Lien vers votre site"],
  },
  {
    id: "featured",
    label: "Listing Featured",
    price: "49 €/mois",
    perks: [
      "Badge « Featured » en tête de liste",
      "Mise en avant sur la page d'accueil",
      "Priorité dans les résultats de recherche",
    ],
    highlight: true,
  },
];

export default function SubmitPage() {
  const [form, setForm] = useState({
    name: "",
    url: "",
    category: CATEGORIES[0].slug,
    description: "",
    pricing: "gratuit",
    priceLabel: "Gratuit",
    submittedBy: "",
    plan: "gratuit",
  });
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/sites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          featured: form.plan === "featured",
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur inconnue.");
      setStatus("success");
      setMessage(data.message);
    } catch (err) {
      setStatus("error");
      setMessage(err.message);
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-10 text-center">
        <h1 className="mb-3 text-4xl font-extrabold">Soumettre votre site</h1>
        <p className="text-slate-300">
          Référencez votre outil ou site IA dans l'annuaire PromptForums et
          touchez une audience qualifiée de créateurs de prompts.
        </p>
      </div>

      <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {PLANS.map((plan) => (
          <button
            type="button"
            key={plan.id}
            onClick={() =>
              setForm({
                ...form,
                plan: plan.id,
                pricing: plan.id === "featured" ? "payant" : form.pricing,
              })
            }
            className={`glass-card p-6 text-left ${
              form.plan === plan.id ? "border-brand-400 shadow-glow" : ""
            }`}
          >
            {plan.highlight && <span className="badge-featured mb-3 inline-flex">⭐ Populaire</span>}
            <h3 className="text-xl font-bold text-white">{plan.label}</h3>
            <p className="mb-3 text-2xl font-extrabold text-brand-300">{plan.price}</p>
            <ul className="space-y-1 text-sm text-slate-300">
              {plan.perks.map((perk) => (
                <li key={perk}>✓ {perk}</li>
              ))}
            </ul>
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="glass-card flex flex-col gap-5 p-8">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-300">
            Nom du site
          </label>
          <input
            required
            className="input-field"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-300">
            URL
          </label>
          <input
            required
            type="url"
            className="input-field"
            placeholder="https://"
            value={form.url}
            onChange={(e) => setForm({ ...form, url: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
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
              Tarification affichée
            </label>
            <input
              className="input-field"
              placeholder="Ex : Gratuit, Freemium, 19€/mois"
              value={form.priceLabel}
              onChange={(e) => setForm({ ...form, priceLabel: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-300">
            Description
          </label>
          <textarea
            required
            rows={4}
            className="input-field"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-300">
            Votre e-mail
          </label>
          <input
            required
            type="email"
            className="input-field"
            value={form.submittedBy}
            onChange={(e) => setForm({ ...form, submittedBy: e.target.value })}
          />
        </div>

        {message && (
          <p className={status === "error" ? "text-sm text-red-400" : "text-sm text-emerald-400"}>
            {message}
          </p>
        )}

        <button type="submit" disabled={status === "loading"} className="btn-primary disabled:opacity-60">
          {status === "loading" ? "Envoi…" : "Soumettre mon site"}
        </button>
      </form>
    </div>
  );
}
