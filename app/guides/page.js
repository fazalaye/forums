import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import { breadcrumbSchema, SITE_URL, socialMetadata } from "@/lib/seo";
import { GUIDES } from "@/data/guides";

const GUIDE_INDEX_URL = `${SITE_URL}/guides`;

export async function generateMetadata() {
  const year = new Date().getFullYear();
  const title = `Guides IA ${year} : tutoriels, prompts et outils pratiques`;
  const description =
    `Découvrez nos guides pratiques ${year} pour choisir des outils IA, copier des prompts et appliquer l’intelligence artificielle à vos projets.`;

  return {
    title,
    description,
    alternates: { canonical: GUIDE_INDEX_URL },
    ...socialMetadata({ title, description, url: GUIDE_INDEX_URL }),
  };
}

const TITLE = "Guides pratiques sur l'intelligence artificielle";
const DESCRIPTION =
  "Parcourez les guides PromptForums sur les prompts, les outils d'intelligence artificielle, la formation et des cas d'usage concrets, en français.";



const breadcrumbItems = [
  { name: "Accueil", url: SITE_URL },
  { name: "Guides", url: `${SITE_URL}/guides` },
];

export default function GuidesIndexPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <JsonLd data={breadcrumbSchema(breadcrumbItems)} />

      <Breadcrumbs items={breadcrumbItems} />
      <h1 className="mb-4 text-4xl font-extrabold leading-tight">{TITLE}</h1>
      <p className="mb-8 text-lg text-slate-300">
        {DESCRIPTION}
      </p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {GUIDES.map((guide) => (
          <Link
            key={guide.href}
            href={guide.href}
            className="glass-card flex flex-col gap-3 p-6"
          >
            <h2 className="text-lg font-bold text-white">{guide.title}</h2>
            <p className="text-sm text-slate-300">{guide.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
