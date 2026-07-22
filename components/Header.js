"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";

const NAV_LINKS = [
  { href: "/", label: "Annuaire" },
  { href: "/prompts", label: "Prompts" },
  { href: "/guides/meilleurs-outils-ia-francophones-2026", label: "Guides" },
  { href: "/submit", label: "Soumettre un site" },
];

export default function Header() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass border-x-0 border-t-0">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 text-xl font-extrabold">
          <span className="text-2xl">🧠</span>
          <span className="bg-brand-gradient bg-clip-text text-transparent">
            PromptForums
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="chip">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {session ? (
            <>
              <Link href="/profile" className="btn-secondary">
                {session.user?.name || "Profil"}
              </Link>
              <button onClick={() => signOut()} className="btn-secondary">
                Déconnexion
              </button>
            </>
          ) : (
            <Link href="/login" className="btn-primary">
              Connexion
            </Link>
          )}
        </div>

        <button
          className="rounded-lg p-2 text-2xl md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Ouvrir le menu"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <div className="flex flex-col gap-2 border-t border-white/10 px-6 py-4 md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="chip"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {session ? (
            <>
              <Link href="/profile" className="btn-secondary" onClick={() => setOpen(false)}>
                {session.user?.name || "Profil"}
              </Link>
              <button onClick={() => signOut()} className="btn-secondary">
                Déconnexion
              </button>
            </>
          ) : (
            <Link href="/login" className="btn-primary" onClick={() => setOpen(false)}>
              Connexion
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
