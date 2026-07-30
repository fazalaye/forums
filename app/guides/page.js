import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, SITE_URL } from "@/lib/seo";

export const metadata = {
  title: "Guides",
  description:
    "Tous les guides PromptForums : comparatifs d'outils IA, bibliothèques de prompts et études de cas, en français.",
  alternates: {
    canonical: `${SITE_URL}/guides`,
  },
};

const GUIDES = [
  {
    href: "/guides/meilleurs-outils-ia-francophones-2026",
    title: "Les 10 meilleurs outils IA en 2026 (comparatif francophone)",
    description:
      "Comparatif à jour des meilleurs outils d'intelligence artificielle en 2026 : ChatGPT, Claude, Midjourney, Perplexity et plus. Prix, usages et notes de la communauté PromptForums.",
  },
  {
    href: "/guides/meilleurs-prompts-chatgpt-2026",
    title: "Les meilleurs prompts ChatGPT en 2026 (par catégorie)",
    description:
      "Les meilleurs prompts ChatGPT en français en 2026 : rédaction, marketing, code, productivité, apprentissage et images. Prêts à copier, mis à jour et testés par la communauté.",
  },
  {
    href: "/guides/affiche-produit-chatgpt-etude-de-cas",
    title: "Créer une affiche produit avec ChatGPT : étude de cas (2026)",
    description:
      "Comment j'ai transformé une photo produit fournisseur brute en affiche publicitaire professionnelle avec ChatGPT : la méthode, le prompt exact utilisé et le résultat avant/après.",
  },
  {
    href: "/guides/outils-ia-gratuits-francais-afrique",
    title: "Outils IA gratuits en français pour l'Afrique (2026)",
    description:
      "Les meilleurs outils IA gratuits, sans carte bancaire et en français, pour entrepreneurs d'Afrique de l'Ouest. Testés, classés par usage. Mobile-first.",
  },
];

export default function GuidesIndexPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Accueil", url: SITE_URL },
          { name: "Guides", url: `${SITE_URL}/guides` },
        ])}
      />

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
