import Link from "next/link";
import { GUIDES } from "@/data/guides";

const FEATURED_GUIDE_HREFS = [
  "/guides/meilleurs-prompts-claude",
  "/guides/se-former-ia-senegal",
  "/guides/ia-pronostics-foot-gratuit",
  "/guides/affiche-produit-chatgpt-etude-de-cas",
];

const FEATURED_GUIDES = FEATURED_GUIDE_HREFS.map((href) =>
  GUIDES.find((guide) => guide.href === href)
).filter(Boolean);

export default function FeaturedGuides() {
  return (
    <section aria-labelledby="featured-guides-title">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-brand-300">
            Pour aller plus loin
          </p>
          <h2
            id="featured-guides-title"
            className="text-2xl font-extrabold text-white sm:text-3xl"
          >
            Guides à la une
          </h2>
        </div>
        <Link
          href="/guides"
          className="text-sm font-medium text-brand-300 hover:underline"
        >
          Tous les guides →
        </Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURED_GUIDES.map((guide) => (
          <article key={guide.href} className="glass-card flex flex-col p-5">
            {guide.featuredImage && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={guide.featuredImage}
                alt={guide.featuredImageAlt || ""}
                width={800}
                height={450}
                loading="lazy"
                className="mb-4 aspect-video w-full rounded-xl border border-white/10 object-cover"
              />
            )}
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-brand-300">
              {guide.featuredCategory}
            </p>
            <h3 className="mb-3 text-lg font-bold leading-snug text-white">
              <Link href={guide.href} className="hover:text-brand-200">
                {guide.title}
              </Link>
            </h3>
            <p className="mb-5 flex-1 text-sm leading-relaxed text-slate-300">
              {guide.featuredExcerpt}
            </p>
            <p className="text-xs text-slate-400">
              Lecture estimée · {guide.readingMinutes} min
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
