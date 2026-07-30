"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function VoteButton({ promptId, initialUpvotes }) {
  const router = useRouter();
  const [count, setCount] = useState(initialUpvotes || 0);
  const [voted, setVoted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleClick() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/prompts/${promptId}/vote`, {
        method: "POST",
      });

      if (res.status === 401) {
        router.push("/login");
        return;
      }

      const data = await res.json();

      if (res.status === 409) {
        setCount(data.upvotes ?? count);
        setVoted(true);
        return;
      }

      if (!res.ok) throw new Error(data.error || "Erreur inconnue.");

      setCount(data.upvotes);
      setVoted(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        type="button"
        onClick={handleClick}
        disabled={voted || loading}
        aria-pressed={voted}
        className="flex items-center gap-1 text-sm font-semibold text-amber-300 hover:text-amber-200 transition-colors disabled:opacity-50"
      >
        ▲ {count}
      </button>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
