"use client";

import { useState } from "react";

export default function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, plan: "premium" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Une erreur est survenue.");
      setStatus("success");
      setMessage(data.message || "Merci pour votre inscription !");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(err.message);
    }
  }

  return (
    <section className="glass-card relative overflow-hidden p-8 sm:p-10">
      <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand-gradient opacity-30 blur-3xl animate-float" />
      <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <span className="badge-featured mb-3 inline-flex">✨ Premium</span>
          <h3 className="text-2xl font-extrabold text-white sm:text-3xl">
            Newsletter Premium — 19€/mois
          </h3>
          <p className="mt-2 text-slate-300">
            Recevez chaque semaine les meilleurs prompts, sites et outils IA en
            avant-première, plus des analyses exclusives et des réductions
            partenaires.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
          <input
            type="email"
            required
            placeholder="votre@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="btn-primary whitespace-nowrap disabled:opacity-60"
          >
            {status === "loading" ? "Envoi..." : "S'abonner"}
          </button>
        </form>
      </div>
      {message && (
        <p
          className={`relative mt-4 text-sm ${
            status === "error" ? "text-red-400" : "text-emerald-400"
          }`}
        >
          {message}
        </p>
      )}
    </section>
  );
}
