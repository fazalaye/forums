import Link from "next/link";

export default function AdBanner({ slotId }) {
  if (slotId) {
    return (
      <aside
        aria-label="Emplacement publicitaire"
        data-ad-slot={slotId}
        className="flex min-h-24 items-center justify-center rounded-xl border border-dashed border-white/15 bg-white/[0.02] p-4 text-center text-xs text-slate-500"
      >
        Espace publicitaire réservé · AdSense non activé
      </aside>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl bg-brand-gradient p-1 shadow-glow animate-fade-up">
      <div className="flex flex-col items-center justify-between gap-4 rounded-2xl bg-slate-950/40 px-6 py-6 backdrop-blur-sm sm:flex-row">
        <div className="flex items-center gap-4">
          <span className="text-3xl">📢</span>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-amber-300">
              Espace publicitaire
            </p>
            <p className="text-lg font-bold text-white">
              Votre outil IA vu par des milliers de créateurs de prompts.
            </p>
          </div>
        </div>
        <Link href="/submit" className="btn-secondary whitespace-nowrap bg-white/10">
          Réserver cet espace →
        </Link>
      </div>
    </div>
  );
}
