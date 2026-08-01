import { dbConnect } from "@/lib/mongodb";
import Prompt from "@/models/Prompt";
import { SEED_PROMPTS } from "@/data/prompts";
import PromptsClient from "@/components/PromptsClient";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import { breadcrumbSchema, SITE_URL } from "@/lib/seo";

export const metadata = {
  title: "Prompts communautaires",
  description:
    "Découvrez et partagez les meilleurs prompts IA de la communauté PromptForums, classés par catégorie.",
  alternates: {
    canonical: `${SITE_URL}/prompts`,
  },
};

const BREADCRUMB_ITEMS = [
  { name: "Accueil", url: SITE_URL },
  { name: "Prompts", url: `${SITE_URL}/prompts` },
];

export const dynamic = "force-dynamic";

async function getPrompts() {
  const conn = await dbConnect();
  if (!conn) return SEED_PROMPTS;
  const dbPrompts = await Prompt.find({}).sort({ createdAt: -1 }).lean();
  return dbPrompts.length > 0
    ? JSON.parse(JSON.stringify(dbPrompts))
    : SEED_PROMPTS;
}

export default async function PromptsPage({ searchParams }) {
  const prompts = await getPrompts();
  const initialCategory = searchParams?.category || "all";
  return (
    <div className="flex flex-col gap-4">
      <JsonLd data={breadcrumbSchema(BREADCRUMB_ITEMS)} />
      <Breadcrumbs items={BREADCRUMB_ITEMS} />
      <PromptsClient prompts={prompts} initialCategory={initialCategory} />
    </div>
  );
}
