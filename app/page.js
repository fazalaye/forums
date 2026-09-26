import { dbConnect } from "@/lib/mongodb";
import Site from "@/models/Site";
import { SEED_SITES } from "@/data/sites";
import DirectoryClient from "@/components/DirectoryClient";
import AdBanner from "@/components/AdBanner";
import NewsletterCTA from "@/components/NewsletterCTA";
import NewsletterInline from "@/components/NewsletterInline";
import FeaturedGuides from "@/components/FeaturedGuides";
import JsonLd from "@/components/JsonLd";
import {
  directoryItemListSchema,
  SITE_URL,
  socialMetadata,
} from "@/lib/seo";

export const dynamic = "force-dynamic";

const HOME_TITLE = "PromptForums — L'annuaire des meilleurs sites et prompts IA";
const HOME_DESCRIPTION =
  "Découvrez et comparez des outils IA ainsi que des prompts en français pour ChatGPT, Claude, Midjourney et plus. Explorez l'annuaire et des guides pratiques pour mieux utiliser l'intelligence artificielle.";

export const metadata = {
  title: { absolute: HOME_TITLE },
  description: HOME_DESCRIPTION,
  alternates: {
    canonical: SITE_URL,
  },
  ...socialMetadata({
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: SITE_URL,
  }),
};

async function getSites() {
  const conn = await dbConnect();
  if (!conn) return SEED_SITES;
  const dbSites = await Site.find({ status: "approved" })
    .sort({ featured: -1, createdAt: -1 })
    .lean();
  return dbSites.length > 0 ? JSON.parse(JSON.stringify(dbSites)) : SEED_SITES;
}

export default async function HomePage({ searchParams }) {
  const sites = await getSites();
  const initialCategory = searchParams?.category || "all";

  return (
    <div className="flex flex-col gap-16">
      <JsonLd data={directoryItemListSchema(sites)} />
      <section className="relative flex flex-col items-center gap-6 py-12 text-center">
        <span className="chip !cursor-default border-none bg-brand-gradient-soft text-brand-200">
          🚀 {sites.length}+ sites & outils IA référencés
        </span>
        <h1 className="max-w-3xl text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl">
          L'annuaire des{" "}
          <span className="bg-brand-gradient bg-clip-text text-transparent">
            meilleurs prompts
          </span>{" "}
          et outils IA
        </h1>
        <p className="max-w-2xl text-lg text-slate-300">
          Comparez, notez et découvrez les sites et prompts les plus utiles pour
          ChatGPT, Midjourney, Claude et bien plus — mis à jour chaque semaine.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <a href="#annuaire" className="btn-primary">
            Explorer l'annuaire
          </a>
          <a href="/submit" className="btn-secondary">
            Soumettre votre site
          </a>
        </div>
      </section>

      <AdBanner slotId="home-under-hero" />

      <NewsletterInline />

      <FeaturedGuides />

      <AdBanner />

      <section id="annuaire" className="scroll-mt-24">
        <DirectoryClient sites={sites} initialCategory={initialCategory} />
      </section>

      <NewsletterCTA />
    </div>
  );
}
