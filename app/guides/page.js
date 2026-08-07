import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import { breadcrumbSchema, SITE_URL } from "@/lib/seo";
import { GUIDES } from "@/data/guides";

export const metadata = {
  title: "Guides",
  description:
    "Tous les guides PromptForums : comparatifs d'outils IA, bibliothèques de prompts et études de cas, en français.",
  alternates: {
    canonical: `${SITE_URL}/guides`,
  },
};



const breadcrumbItems = [
  { name: "Accueil", url: SITE_URL },
  { name: "Guides", url: `${SITE_URL}/guides` },
];

export default function GuidesIndexPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <JsonLd data={breadcrumbSchema(breadcrumbItems)} />

      <Breadcrumbs items={breadcrumbItems} />
      <h1 className="mb-4 text-4xl font-extrabold leading-tight">Guides</h1>
      <p className="mb-8 text-lg text-slate-300">
        Comparatifs d'outils, bibliothèques de prompts et études de cas testés
        par la communauté PromptForums.
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
