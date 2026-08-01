import { redirect, notFound } from "next/navigation";
import mongoose from "mongoose";
import { dbConnect } from "@/lib/mongodb";
import Prompt from "@/models/Prompt";
import { SEED_PROMPTS } from "@/data/prompts";
import { CATEGORIES } from "@/data/categories";
import CommentForm from "@/components/CommentForm";
import VoteButton from "@/components/VoteButton";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import CopyPromptButton from "@/components/CopyPromptButton";
import { breadcrumbSchema, SITE_URL } from "@/lib/seo";

export const dynamic = "force-dynamic";

async function getPrompt(slugOrId) {
  const conn = await dbConnect();
  if (!conn) {
    const bySlug = SEED_PROMPTS.find((p) => p.slug === slugOrId);
    if (bySlug) return { doc: bySlug, redirectTo: null };
    const byId = SEED_PROMPTS.find((p) => p._id === slugOrId);
    if (byId) return { doc: byId, redirectTo: null };
    return null;
  }

  const bySlug = await Prompt.findOne({ slug: slugOrId }).lean();
  if (bySlug) return { doc: JSON.parse(JSON.stringify(bySlug)), redirectTo: null };

  if (mongoose.isValidObjectId(slugOrId)) {
    const byId = await Prompt.findById(slugOrId).lean();
    if (byId) {
      // Legacy ID-based URL still works, but redirect to the canonical slug URL.
      return { doc: JSON.parse(JSON.stringify(byId)), redirectTo: byId.slug || null };
    }
  }

  return null;
}

export async function generateMetadata({ params }) {
  const result = await getPrompt(params.slug);
  if (!result || !result.doc) return { title: "Prompt introuvable" };
  const { doc } = result;
  return {
    title: doc.title,
    description: doc.content.slice(0, 150),
    alternates: {
      canonical: `${SITE_URL}/prompts/${doc.slug || doc._id}`,
    },
  };
}

export default async function PromptDetailPage({ params }) {
  const result = await getPrompt(params.slug);
  if (!result || !result.doc) notFound();
  if (result.redirectTo) redirect(`/prompts/${result.redirectTo}`);
  const prompt = result.doc;

  const category = CATEGORIES.find((c) => c.slug === prompt.category);

  const breadcrumbItems = [
    { name: "Accueil", url: SITE_URL },
    { name: "Prompts", url: `${SITE_URL}/prompts` },
    { name: prompt.title, url: `${SITE_URL}/prompts/${prompt.slug || prompt._id}` },
  ];

  return (
    <div className="mx-auto max-w-3xl">
      <JsonLd data={breadcrumbSchema(breadcrumbItems)} />
      <Breadcrumbs items={breadcrumbItems} />
      <div className="glass-card p-8">
        <div className="mb-4 flex items-center justify-between">
          {category && (
            <span className="chip !cursor-default">
              {category.emoji} {category.label}
            </span>
          )}
          <VoteButton promptId={prompt._id} initialUpvotes={prompt.upvotes || 0} />
        </div>
        <h1 className="mb-2 text-3xl font-extrabold text-white">
          {prompt.title}
        </h1>
        <p className="mb-6 text-sm text-slate-400">par {prompt.author}</p>
        <div className="mb-3 flex justify-end">
          <CopyPromptButton text={prompt.content} />
        </div>
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
