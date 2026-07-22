"use client";

import { useMemo, useState } from "react";
import SiteCard from "./SiteCard";
import { CATEGORIES } from "@/data/categories";

export default function DirectoryClient({ sites }) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = useMemo(() => {
    let result = sites;
    if (activeCategory !== "all") {
      result = result.filter((s) => s.category === activeCategory);
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          (s.tags || []).some((t) => t.toLowerCase().includes(q))
      );
    }
    return [...result].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }, [sites, query, activeCategory]);

  return (
    <div className="flex flex-col gap-8">
      <div className="mx-auto w-full max-w-2xl">
        <div className="relative">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-xl">
            🔍
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un site, un outil, une catégorie…"
            className="input-field pl-12 text-base"
          />
        </div>
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

      <p className="text-center text-sm text-slate-400">
        {filtered.length} résultat{filtered.length > 1 ? "s" : ""}
      </p>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((site, i) => (
            <SiteCard key={site.slug} site={site} index={i} />
          ))}
        </div>
      ) : (
        <p className="py-12 text-center text-slate-400">
          Aucun résultat. Essayez une autre recherche ou catégorie.
        </p>
      )}
    </div>
  );
}
