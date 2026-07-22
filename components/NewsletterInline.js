"use client";

import { useState } from "react";

/**
 * Compact newsletter capture placed high on the home page. The full Premium
 * pitch lives in NewsletterCTA at the bottom; this one exists to convert
 * passing organic traffic into owned audience before they scroll away.
 */
export default function NewsletterInline() {
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
        body: JSON.stringify({ email, plan: "free" }),
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
    <section className="glass flex flex-col items-center gap-4 rounded-2xl px-6 py-6 text-center sm:flex-row sm:justify-between sm:text-left">
      <div className="flex items-center gap-3">
        <span className="text-2xl">📩</span>
        <p className="text-sm text-slate-200 sm:text-base">
          <span className="font-semibold text-white">
            Les meilleurs outils & prompts IA, chaque semaine.
          </span>{" "}
          Rejoins la newsletter gratuite.
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-md flex-col gap-2 sm:flex-row"
      >
        <input
          type="email"
          required
          placeholder="votre@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field py-2.5"
          aria-label="Adresse e-mail"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="btn-primary whitespace-nowrap disabled:opacity-60"
        >
          {status === "loading" ? "…" : "S'inscrire"}
        </button>
      </form>
      {message && (
        <p
          className={`w-full text-xs sm:hidden ${
            status === "error" ? "text-red-400" : "text-emerald-400"
          }`}
        >
          {message}
        </p>
      )}
    </section>
  );
}
