import StarRating from "./StarRating";
import { CATEGORIES } from "@/data/categories";

const PRICING_LABELS = {
  gratuit: "bg-emerald-500/20 text-emerald-300",
  freemium: "bg-sky-500/20 text-sky-300",
  payant: "bg-fuchsia-500/20 text-fuchsia-300",
};

export default function SiteCard({ site, index = 0 }) {
  const category = CATEGORIES.find((c) => c.slug === site.category);

  return (
    <article
      className="glass-card animate-fade-up flex flex-col gap-4 p-6"
      style={{ animationDelay: `${Math.min(index * 60, 400)}ms` }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-gradient-soft text-2xl">
            {site.logo || "✨"}
          </div>
          <div>
            <h3 className="text-lg font-bold leading-tight text-white">
              {site.name}
            </h3>
            {category && (
              <span className="text-xs text-slate-400">
                {category.emoji} {category.label}
              </span>
            )}
          </div>
        </div>
        {site.featured && <span className="badge-featured">⭐ Featured</span>}
      </div>

      <p className="line-clamp-3 flex-1 text-sm text-slate-300">
        {site.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {(site.tags || []).slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-slate-300"
          >
            #{tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-white/10 pt-4">
        <StarRating rating={site.rating || 0} count={site.reviewsCount} />
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            PRICING_LABELS[site.pricing] || PRICING_LABELS.gratuit
          }`}
        >
          {site.priceLabel}
        </span>
      </div>

      <a
        href={`/out/${site.slug}`}
        target="_blank"
        rel="noopener sponsored"
        className="btn-primary w-full"
      >
        Visiter le site ↗
      </a>
    </article>
  );
}
