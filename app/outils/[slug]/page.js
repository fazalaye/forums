import Link from "next/link";
import { notFound } from "next/navigation";
import AdBanner from "@/components/AdBanner";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { CATEGORIES } from "@/data/categories";
import { SEED_SITES } from "@/data/sites";
import { CURATED_SITES } from "@/data/curatedSites";
import { dbConnect } from "@/lib/mongodb";
import Site from "@/models/Site";
import { breadcrumbSchema, SITE_URL, socialMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

const CATEGORY_GUIDANCE = {
  chatbots:
    "Un assistant conversationnel peut aider à rédiger, résumer ou explorer une question. La qualité dépend du contexte fourni et de la version du service ; vérifiez les informations importantes et ne saisissez pas de données confidentielles sans avoir consulté les règles de confidentialité de l’éditeur.",
  ecriture:
    "Les outils d’écriture peuvent assister la rédaction et la correction, mais un texte destiné à être publié doit être relu. Vérifiez les faits, les citations, le ton et les droits sur les contenus utilisés.",
  image:
    "Un outil d’image transforme une consigne ou un visuel en création graphique selon ses fonctions disponibles. Contrôlez le rendu final, les détails du produit, les marques et les droits d’utilisation avant toute diffusion commerciale.",
  code:
    "Les assistants de code peuvent proposer ou expliquer des modifications. Testez le code dans un environnement adapté, examinez les dépendances et ne transmettez jamais de secrets ou de données de production.",
  marketing:
    "Les outils marketing peuvent aider à préparer des idées et des textes. Ils ne garantissent ni visibilité ni conversion : vérifiez les chiffres, les allégations et l’adéquation du contenu à votre audience.",
  productivite:
    "Les outils de productivité servent à organiser ou accélérer certaines tâches. Avant de connecter vos documents ou votre calendrier, vérifiez les permissions, les réglages de partage et les modalités de traitement des données.",
  video:
    "Les outils vidéo et audio peuvent générer ou modifier des médias. Vérifiez les droits des éléments importés, l’exactitude des sous-titres et l’autorisation d’utiliser les voix ou images de personnes identifiables.",
  business:
    "Les outils de stratégie peuvent aider à structurer des idées, mais les estimations produites restent des hypothèses. Confirmez les coûts, les règles locales et la demande avec des données indépendantes avant de prendre une décision.",
  emploi:
    "Les outils liés à l’emploi peuvent aider à préparer une candidature, sans remplacer votre expérience réelle. Vérifiez chaque affirmation et retirez les données personnelles inutiles avant d’utiliser un service tiers.",
};

async function getSite(slug) {
  const conn = await dbConnect();
  if (conn) {
    const site = await Site.findOne({ slug, status: "approved" }).lean();
    if (site) return JSON.parse(JSON.stringify(site));
  }

  return (
    [...SEED_SITES, ...CURATED_SITES].find((site) => site.slug === slug) || null
  );
}

async function getSimilarSites(site) {
  const conn = await dbConnect();
  const databaseSites = conn
    ? await Site.find({
        status: "approved",
        category: site.category,
        slug: { $ne: site.slug },
      })
        .select("name slug description logo priceLabel")
        .limit(3)
        .lean()
    : [];

  const matches = [...databaseSites, ...SEED_SITES, ...CURATED_SITES].filter(
    (item) =>
      item.category === site.category &&
      item.slug !== site.slug &&
      item.name &&
      item.slug
  );
  return [...new Map(matches.map((item) => [item.slug, item])).values()].slice(
    0,
    3
  );
}

export async function generateMetadata({ params }) {
  const site = await getSite(params.slug);
  if (!site) return { title: "Outil introuvable" };
  const title = `${site.name} : présentation et informations`;
  const description =
    `${site.description} Consultez sa catégorie, son modèle tarifaire et les points à vérifier avant de l’utiliser.`.slice(
      0,
      160
    );
  const url = `${SITE_URL}/outils/${site.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    ...socialMetadata({ title, description, url, type: "article" }),
  };
}

export default async function ToolDetailPage({ params }) {
  const site = await getSite(params.slug);
  if (!site) notFound();

  const category = CATEGORIES.find((item) => item.slug === site.category);
  const similarSites = await getSimilarSites(site);
  const tags = Array.isArray(site.tags) ? site.tags : [];
  const reviews = Array.isArray(site.reviews) ? site.reviews : [];
  const guidance =
    CATEGORY_GUIDANCE[site.category] ||
    "Avant de choisir cet outil, vérifiez sa documentation, ses conditions tarifaires, ses exigences techniques et ses règles de confidentialité directement auprès de son éditeur.";
  const url = `${SITE_URL}/outils/${site.slug}`;
  const breadcrumbs = [
    { name: "Accueil", url: SITE_URL },
    { name: "Annuaire", url: SITE_URL },
    { name: site.name, url },
  ];

  return (
    <div className="mx-auto max-w-3xl">
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <Breadcrumbs items={breadcrumbs} />

      <article className="glass-card p-6 sm:p-8">
        <div className="mb-4 flex items-center gap-4">
          <span
            aria-hidden="true"
            className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-gradient-soft text-3xl"
          >
            {site.logo || "✨"}
          </span>
          {category && (
            <p className="chip !cursor-default">
              {category.emoji} {category.label}
            </p>
          )}
        </div>

        <h1 className="mb-5 text-3xl font-extrabold text-white sm:text-4xl">
          {site.name} : présentation de l’outil IA
        </h1>

        <p className="mb-6 text-lg leading-relaxed text-slate-300">
          {site.description}
        </p>

        <dl className="mb-6 grid gap-4 rounded-xl border border-white/10 bg-black/20 p-4 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-slate-400">Catégorie</dt>
            <dd className="mt-1 font-medium text-slate-200">
              {category?.label || "Non précisée"}
            </dd>
          </div>
          <div>
            <dt className="text-slate-400">Tarification indiquée dans l’annuaire</dt>
            <dd className="mt-1 font-medium text-slate-200">
              {site.priceLabel || site.pricing || "À vérifier auprès de l’éditeur"}
            </dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-slate-400">Éditeur / site officiel</dt>
            <dd className="mt-1 break-all font-medium text-slate-200">
              {site.url}
            </dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-slate-400">Tags de la fiche</dt>
            <dd className="mt-1 text-slate-200">
              {tags.length > 0 ? tags.join(", ") : "Aucun tag renseigné"}
            </dd>
          </div>
        </dl>

        <AdBanner slotId="tool-detail-content" />

        <section className="mt-8">
          <h2 className="mb-3 text-xl font-bold text-white">
            Présentation &amp; contexte d’utilisation
          </h2>
          <p className="mb-4 text-slate-300">
            Cette fiche reprend les informations disponibles dans l’annuaire
            PromptForums : le nom, la catégorie, le descriptif et le tarif
            indiqué au moment de la publication. Elle ne constitue pas un test
            indépendant et ne prétend pas mesurer les performances du service.
            Les fonctionnalités, prix et conditions peuvent évoluer ; confirmez
            toujours les détails sur le site de l’éditeur avant de vous inscrire
            ou de payer.
          </p>
          <p className="mb-4 text-slate-300">{guidance}</p>
          <p className="text-slate-300">
            Pour évaluer si l’outil vous convient, partez d’une tâche concrète
            que vous souhaitez accomplir. Vérifiez si le service propose cette
            fonction, si elle est incluse dans son offre actuelle, si elle est
            utilisable depuis votre appareil et si les modalités de partage de
            vos données sont acceptables pour votre usage. Lorsque ces éléments
            ne figurent pas dans cette fiche, ils restent à confirmer auprès de
            l’éditeur.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="mb-3 text-xl font-bold text-white">
            Tarifs, accès et points à vérifier
          </h2>
          <p className="mb-4 text-slate-300">
            L’annuaire indique le modèle tarifaire suivant :{" "}
            <strong className="text-white">
              {site.priceLabel || site.pricing || "information non renseignée"}
            </strong>
            . Cette mention est un repère et peut devenir obsolète ; consultez
            les tarifs officiels, les limites d’usage, les options de
            résiliation et les modes de paiement acceptés avant toute décision.
          </p>
          <ul className="list-disc space-y-2 pl-5 text-slate-300">
            <li>Vérifiez les fonctions réellement disponibles dans votre pays.</li>
            <li>Consultez les conditions d’utilisation et la politique de confidentialité de l’éditeur.</li>
            <li>Testez l’outil avec des données non sensibles avant de l’intégrer à un processus professionnel.</li>
            <li>Comparez le coût total et les limites avec votre besoin réel.</li>
          </ul>
        </section>

        {reviews.length > 0 && (
          <section className="mt-8">
            <h2 className="mb-3 text-xl font-bold text-white">
              Retours publiés par la communauté
            </h2>
            <ul className="flex flex-col gap-3">
              {reviews.slice(0, 5).map((review, index) => (
                <li
                  key={review._id || `${review.author}-${index}`}
                  className="rounded-xl border border-white/10 bg-black/20 p-4"
                >
                  <p className="mb-1 text-sm font-semibold text-slate-100">
                    {review.author || "Membre"} · {review.rating}/5
                  </p>
                  {review.comment && (
                    <p className="text-sm text-slate-300">{review.comment}</p>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        <a
          href={`/out/${site.slug}`}
          target="_blank"
          rel="noopener nofollow sponsored"
          className="btn-primary mt-8 inline-flex"
        >
          Visiter le site officiel ↗
        </a>
      </article>

      <section className="mt-10" aria-labelledby="similar-tools-title">
        <h2 id="similar-tools-title" className="mb-4 text-xl font-bold text-white">
          Outils similaires
        </h2>
        {similarSites.length > 0 ? (
          <ul className="grid gap-4 sm:grid-cols-3">
            {similarSites.map((similar) => (
              <li key={similar.slug} className="glass-card p-4">
                <p className="mb-2 text-2xl" aria-hidden="true">
                  {similar.logo || "✨"}
                </p>
                <Link
                  href={`/outils/${encodeURIComponent(similar.slug)}`}
                  className="font-semibold text-slate-100 hover:text-brand-200"
                >
                  {similar.name}
                </Link>
                <p className="mt-2 line-clamp-3 text-sm text-slate-400">
                  {similar.description}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-slate-400">
            Aucun autre outil de cette catégorie n’est disponible pour le moment.
          </p>
        )}
      </section>
    </div>
  );
}
