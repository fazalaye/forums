import Link from "next/link";
import { CATEGORIES } from "@/data/categories";
import VoteButton from "@/components/VoteButton";

export default function PromptCard({ prompt }) {
  const category = CATEGORIES.find((c) => c.slug === prompt.category);
  const excerpt =
    prompt.content.length > 180
      ? prompt.content.slice(0, 180) + "…"
      : prompt.content;

  return (
    <div className="glass-card flex flex-col gap-3 p-6">
      <div className="flex items-center justify-between">
        {category && (
          <span className="chip !cursor-default text-xs">
            {category.emoji} {category.label}
          </span>
        )}
        <VoteButton promptId={prompt._id} initialUpvotes={prompt.upvotes || 0} />
      </div>
      <Link href={`/prompts/${prompt.slug || prompt._id}`} className="flex flex-col gap-3">
        <h3 className="text-lg font-bold text-white">{prompt.title}</h3>
        <p className="line-clamp-3 text-sm text-slate-300">{excerpt}</p>
        <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
          <span>par {prompt.author}</span>
          <span>{(prompt.comments || []).length} commentaire(s)</span>
        </div>
      </Link>
    </div>
  );
}
