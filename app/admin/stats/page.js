import Link from "next/link";
import { requireAdmin } from "@/lib/admin";
import { dbConnect } from "@/lib/mongodb";
import Site from "@/models/Site";
import { CATEGORIES } from "@/data/categories";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Clics sortants",
  robots: { index: false, follow: false },
};

const CATEGORY_LABELS = Object.fromEntries(
  CATEGORIES.map((c) => [c.slug, c.label])
);

export default async function StatsPage() {
  const session = await requireAdmin();
  if (!session) {
    return (
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-4 text-3xl font-extrabold">Accès réservé</h1>
        <p className="text-slate-300">
          Cette page est réservée à l&apos;administration du site.
        </p>
      </div>
    );
  }

  const conn = await dbConnect();
  if (!conn) {
    return (
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-4 text-3xl font-extrabold">Clics sortants</h1>
        <p className="text-slate-300">
          Base de données injoignable — impossible de lire les compteurs.
        </p>
      </div>
    );
  }

  const sites = await Site.find({ status: "approved" })
    .select("name slug url category clicks")
    .sort({ clicks: -1, name: 1 })
    .lean();

  const totalClicks = sites.reduce((sum, s) => sum + (s.clicks || 0), 0);
  const clicked = sites.filter((s) => (s.clicks || 0) > 0);

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-2 text-3xl font-extrabold">Clics sortants</h1>
      <p className="mb-4 text-slate-300">
        Nombre de fois où chaque outil a été ouvert depuis l&apos;annuaire, via
        le redirecteur <code className="text-brand-300">/out/[slug]</code>. Les
        robots identifiés ne sont pas comptés — seules les visites réelles
        incrémentent le compteur.
      </p>
      <div className="mb-8 rounded-xl border border-amber-400/30 bg-amber-400/5 p-4">
        <p className="text-sm text-slate-200">
          <strong className="text-white">Lecture des chiffres.</strong> Si tous
          les outils affichent un total proche et que 100 % d&apos;entre eux ont
          été cliqués, ce sont des robots : ils parcourent chaque lien
          systématiquement. Un vrai trafic donne l&apos;inverse — quelques
          outils en tête et beaucoup à zéro. Les compteurs accumulés avant le
          filtrage anti-robots peuvent être remis à zéro via{" "}
          <code className="text-brand-300">/api/admin/reset-clicks</code>{" "}
          (action définitive).
        </p>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <div className="glass-card p-5">
          <p className="text-sm text-slate-400">Clics totaux</p>
          <p className="text-3xl font-bold text-white">{totalClicks}</p>
        </div>
        <div className="glass-card p-5">
          <p className="text-sm text-slate-400">Outils déjà cliqués</p>
          <p className="text-3xl font-bold text-white">{clicked.length}</p>
        </div>
        <div className="glass-card p-5">
          <p className="text-sm text-slate-400">Outils dans l&apos;annuaire</p>
          <p className="text-3xl font-bold text-white">{sites.length}</p>
        </div>
      </div>

      {totalClicks === 0 ? (
        <div className="glass-card p-6">
          <p className="text-slate-300">
            Aucun clic enregistré pour l&apos;instant. Le compteur ne démarre
            qu&apos;à partir des visites réelles — reviens dans quelques jours.
          </p>
        </div>
      ) : (
        <div className="glass-card overflow-x-auto p-2">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-slate-400">
                <th className="p-3 font-semibold">#</th>
                <th className="p-3 font-semibold">Outil</th>
                <th className="p-3 font-semibold">Catégorie</th>
                <th className="p-3 text-right font-semibold">Clics</th>
                <th className="p-3 font-semibold">Destination</th>
              </tr>
            </thead>
            <tbody>
              {sites.map((site, i) => (
                <tr
                  key={site.slug}
                  className="border-b border-white/5 text-slate-300"
                >
                  <td className="p-3 text-slate-500">{i + 1}</td>
                  <td className="p-3 font-medium text-white">{site.name}</td>
                  <td className="p-3">
                    {CATEGORY_LABELS[site.category] || site.category}
                  </td>
                  <td className="p-3 text-right font-bold text-white">
                    {site.clicks || 0}
                  </td>
                  <td className="max-w-xs truncate p-3 text-xs text-slate-400">
                    {site.url}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="mt-6 text-sm text-slate-400">
        Pour monétiser un outil, remplace sa destination par ton lien
        d&apos;affiliation depuis la{" "}
        <Link href="/admin" className="text-brand-300 hover:underline">
          page d&apos;administration
        </Link>
        . Le lien public ne change pas : il continue de passer par{" "}
        <code className="text-brand-300">/out/[slug]</code>, qui reste en
        <code className="text-brand-300"> nofollow sponsored</code> et bloqué
        dans le robots.txt.
      </p>
    </div>
  );
}
