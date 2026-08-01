"use client";

import { useState } from "react";

export default function CopyPromptButton({ text }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable or permission denied — silently no-op.
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="chip !cursor-pointer text-xs"
    >
      {copied ? "✓ Copié !" : "📋 Copier le prompt"}
    </button>
  );
}
