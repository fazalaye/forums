import { notFound } from "next/navigation";
import Link from "next/link";
import { dbConnect } from "@/lib/mongodb";
import Site from "@/models/Site";
import { SEED_SITES } from "@/data/sites";
import { CATEGORIES } from "@/data/categories";
import SiteCard from "@/components/SiteCard";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import { breadcrumbSchema, directoryItemListSchema, SITE_URL } from "@/lib/seo";

export const dynamic = "force-dynamic";

async function getSites(slug) {
  const conn = await dbConnect();
  if (!conn) return SEED_SITES.filter((s) => s.category === slug);
  const dbSites = await Site.find({ status: "approved", category: slug })
    .sort({ featured: -1, createdAt: -1 })
    .lean();
  return JSON.parse(JSON.stringify(dbSites));
}

export function generateMetadata({ params }) {
  const category = CATEGORIES.find((c) => c.slug === params.slug);
  if (!category) return {};
  return {
    title: `Meilleurs outils IA — ${category.label}`,
    description: `Découvrez et comparez les meilleurs outils IA de la catégorie ${category.label} sur l'annuaire PromptForums.`,
    alternates: {
      canonical: `${SITE_URL}/category/${params.slug}`,
    },
  };
}

export default async function CategoryPage({ params }) {
  const category = CATEGORIES.find((c) => c.slug === params.slug);
  if (!category) notFound();

  const sites = await getSites(params.slug);

  const breadcrumbItems = [
    { name: "Accueil", url: SITE_URL },
    { name: "Annuaire", url: SITE_URL },
    { name: category.label, url: `${SITE_URL}/category/${params.slug}` },
  ];

  return (
    <div className="flex flex-col gap-8">
      <JsonLd data={breadcrumbSchema(breadcrumbItems)} />
      <JsonLd data={directoryItemListSchema(sites)} />

      <Breadcrumbs items={breadcrumbItems} />
      <h1 className="text-4xl font-extrabold leading-tight">
        {category.emoji} {category.label}
      </h1>
      <p className="max-w-2xl text-lg text-slate-300">
        Les meilleurs sites et outils IA de la catégorie{" "}
        {category.label}, comparés et notés par la communauté PromptForums.
      </p>

      {sites.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sites.map((site, i) => (
            <SiteCard key={site.slug} site={site} index={i} />
          ))}
        </div>
      ) : (
        <p className="py-12 text-center text-slate-400">
          Aucun outil dans cette catégorie pour le moment.
        </p>
      )}

      <div>
        <Link href="/" className="btn-secondary">
          Voir tout l'annuaire
        </Link>
      </div>
    </div>
  );
}
