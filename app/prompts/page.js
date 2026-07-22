import { dbConnect } from "@/lib/mongodb";
import Prompt from "@/models/Prompt";
import { SEED_PROMPTS } from "@/data/prompts";
import PromptsClient from "@/components/PromptsClient";

export const metadata = {
  title: "Prompts communautaires",
  description:
    "Découvrez et partagez les meilleurs prompts IA de la communauté PromptForums, classés par catégorie.",
};

export const dynamic = "force-dynamic";

async function getPrompts() {
  const conn = await dbConnect();
  if (!conn) return SEED_PROMPTS;
  const dbPrompts = await Prompt.find({}).sort({ createdAt: -1 }).lean();
  return dbPrompts.length > 0
    ? JSON.parse(JSON.stringify(dbPrompts))
    : SEED_PROMPTS;
}

export default async function PromptsPage() {
  const prompts = await getPrompts();
  return <PromptsClient prompts={prompts} />;
}
