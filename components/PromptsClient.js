"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import PromptCard from "./PromptCard";
import { CATEGORIES } from "@/data/categories";

export default function PromptsClient({ prompts }) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = useMemo(() => {
    let result = prompts;
    if (activeCategory !== "all") {
      result = result.filter((p) => p.category === activeCategory);
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.content.toLowerCase().includes(q)
      );
    }
    return result;
  }, [prompts, query, activeCategory]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-4xl font-extrabold sm:text-5xl">
          Prompts{" "}
          <span className="bg-brand-gradient bg-clip-text text-transparent">
            communautaires
          </span>
        </h1>
        <p className="max-w-2xl text-slate-300">
          Partagez vos meilleurs prompts et découvrez ceux de la communauté,
          classés par catégorie.
        </p>
        <Link href="/prompts/new" className="btn-primary">
          + Publier un prompt
        </Link>
      </div>

      <div className="mx-auto w-full max-w-2xl">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher un prompt…"
          className="input-field"
        />
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <button
          onClick={() => setActiveCategory("all")}
          className={`chip ${activeCategory === "all" ? "chip-active" : ""}`}
        >
          Toutes les catégories
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => setActiveCategory(cat.slug)}
            className={`chip ${activeCategory === cat.slug ? "chip-active" : ""}`}
          >
            {cat.emoji} {cat.label}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {filtered.map((prompt) => (
            <PromptCard key={prompt._id} prompt={prompt} />
          ))}
        </div>
      ) : (
        <p className="py-12 text-center text-slate-400">
          Aucun prompt ne correspond à votre recherche.
        </p>
      )}
    </div>
  );
}
