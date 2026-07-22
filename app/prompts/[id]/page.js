import { notFound } from "next/navigation";
import { dbConnect } from "@/lib/mongodb";
import Prompt from "@/models/Prompt";
import { SEED_PROMPTS } from "@/data/prompts";
import { CATEGORIES } from "@/data/categories";
import CommentForm from "@/components/CommentForm";

export const dynamic = "force-dynamic";

async function getPrompt(id) {
  const conn = await dbConnect();
  if (!conn) {
    return SEED_PROMPTS.find((p) => p._id === id) || null;
  }
  try {
    const prompt = await Prompt.findById(id).lean();
    return prompt ? JSON.parse(JSON.stringify(prompt)) : null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const prompt = await getPrompt(params.id);
  if (!prompt) return { title: "Prompt introuvable" };
  return {
    title: prompt.title,
    description: prompt.content.slice(0, 150),
  };
}

export default async function PromptDetailPage({ params }) {
  const prompt = await getPrompt(params.id);
  if (!prompt) notFound();

  const category = CATEGORIES.find((c) => c.slug === prompt.category);

  return (
    <div className="mx-auto max-w-3xl">
      <div className="glass-card p-8">
        <div className="mb-4 flex items-center justify-between">
          {category && (
            <span className="chip !cursor-default">
              {category.emoji} {category.label}
            </span>
          )}
          <span className="flex items-center gap-1 text-sm font-semibold text-amber-300">
            ▲ {prompt.upvotes || 0}
          </span>
        </div>
        <h1 className="mb-2 text-3xl font-extrabold text-white">
          {prompt.title}
        </h1>
        <p className="mb-6 text-sm text-slate-400">par {prompt.author}</p>
        <pre className="whitespace-pre-wrap rounded-xl bg-black/30 p-5 font-sans text-slate-200">
          {prompt.content}
        </pre>
        {(prompt.tags || []).length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {prompt.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-slate-300">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="mt-8">
        <h2 className="mb-4 text-xl font-bold">
          Commentaires ({(prompt.comments || []).length})
        </h2>
        <div className="mb-6 flex flex-col gap-4">
          {(prompt.comments || []).map((c, i) => (
            <div key={i} className="glass rounded-xl p-4">
              <p className="mb-1 text-sm font-semibold text-slate-200">
                {c.author}
              </p>
              <p className="text-sm text-slate-300">{c.body}</p>
            </div>
          ))}
          {(prompt.comments || []).length === 0 && (
            <p className="text-sm text-slate-400">
              Aucun commentaire pour le moment. Soyez le premier à réagir !
            </p>
          )}
        </div>
        <CommentForm promptId={prompt._id} />
      </div>
    </div>
  );
}
