import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10 bg-black/20">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-12 md:grid-cols-4">
        <div className="col-span-2 md:col-span-1">
          <div className="mb-3 flex items-center gap-2 text-lg font-extrabold">
            <span className="text-xl">🧠</span>
            <span className="bg-brand-gradient bg-clip-text text-transparent">
              PromptForums
            </span>
          </div>
          <p className="text-sm text-slate-400">
            Le répertoire francophone des meilleurs sites et prompts d'intelligence
            artificielle.
          </p>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold text-slate-200">Explorer</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><Link href="/" className="hover:text-white">Annuaire de sites</Link></li>
            <li><Link href="/prompts" className="hover:text-white">Prompts communautaires</Link></li>
            <li><Link href="/submit" className="hover:text-white">Soumettre un site</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold text-slate-200">Légal</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><Link href="/legal" className="hover:text-white">Mentions légales</Link></li>
            <li><Link href="/privacy" className="hover:text-white">Confidentialité</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold text-slate-200">Premium</h4>
          <p className="text-sm text-slate-400">
            Boostez la visibilité de votre site ou passez à la newsletter Premium.
          </p>
          <Link href="/submit" className="btn-primary mt-3 inline-flex text-xs">
            Devenir Featured
          </Link>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} PromptForums.org — Tous droits réservés.
      </div>
    </footer>
  );
}
