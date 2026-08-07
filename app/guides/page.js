import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
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
    href: "/guides/definition-intelligence-artificielle",
    title: "Qu'est-ce que l'intelligence artificielle ? Définition simple",
    description:
      "Définition claire de l'intelligence artificielle, avec les définitions officielles (OCDE, UE), des exemples concrets au quotidien, et les avantages et inconvénients.",
  },
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
    href: "/guides/meilleurs-prompts-claude",
    title: "Les meilleurs prompts Claude en français (2026)",
    description:
      "Prompts Claude prêts à copier : CV, création de site web, PowerPoint, apprentissage d'une langue, étude de marché. Plus la technique des balises XML.",
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
  {
    href: "/guides/nano-banana-prompts",
    title: "Nano Banana : les meilleurs prompts en français (2026)",
    description:
      "Prompts Nano Banana prêts à copier : photo LinkedIn pro, photo CV, logo, retouche d'image. Comment accéder gratuitement à l'outil de Google.",
  },
  {
    href: "/guides/creer-business-plan-etude-marche-ia-afrique",
    title: "Créer un business plan avec l'IA en Afrique (guide + prompts gratuits)",
    description:
      "Comment utiliser ChatGPT et l'IA gratuite pour créer un business plan, une étude de marché locale et une stratégie commerciale en Afrique. Prompts prêts à copier.",
  },
  {
    href: "/guides/cv-lettre-motivation-entretien-ia-afrique",
    title: "CV, lettre de motivation, entretien : décroche un emploi avec l'IA",
    description:
      "Utilise ChatGPT gratuitement pour rédiger un CV percutant, une lettre de motivation convaincante et te préparer à l'entretien. Prompts prêts à copier pour le marché de l'emploi en Afrique.",
  },
  {
    href: "/guides/deepseek-avis-performances-limites-2026",
    title: "DeepSeek : la vérité sur les performances du modèle chinois gratuit (2026)",
    description:
      "DeepSeek est-il vraiment gratuit ? Performances réelles face à ChatGPT, limites du quota gratuit et ce qui consomme le plus de ressources. Analyse honnête, sans chiffres inventés.",
  },
  {
    href: "/guides/ia-pronostics-foot-gratuit",
    title: "Meilleures IA gratuites pour les pronostics foot (2026)",
    description:
      "Comparatif honnête des outils IA gratuits de pronostics football : ce qu'ils font vraiment, leurs limites, et pourquoi aucun ne garantit de gains.",
  },
  {
    href: "/guides/se-former-ia-senegal",
    title: "Se former à l'IA au Sénégal : le guide complet 2026",
    description:
      "Formations, écoles, masters et ressources gratuites pour se former à l'intelligence artificielle au Sénégal. Débouchés, salaires et comment débuter sans budget.",
  },
];

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
