import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import ChariowWidget from "@/components/ChariowWidget";
import { breadcrumbSchema, SITE_URL } from "@/lib/seo";

const TITLE = "Boutique — nos produits IA à télécharger";
const DESCRIPTION =
  "Les produits numériques édités par PromptForums : packs de prompts et ressources prêtes à l'emploi, en français, téléchargeables immédiatement après achat.";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/boutique` },
};

const STORE_DOMAIN = "bundledeals.store";

const BREADCRUMB_ITEMS = [
  { name: "Accueil", url: SITE_URL },
  { name: "Boutique", url: `${SITE_URL}/boutique` },
];

export default function BoutiquePage() {
  return (
    <div className="mx-auto max-w-3xl">
      <JsonLd data={breadcrumbSchema(BREADCRUMB_ITEMS)} />

      <Breadcrumbs items={BREADCRUMB_ITEMS} />
      <h1 className="mb-4 text-4xl font-extrabold leading-tight">Boutique</h1>
      <p className="mb-10 text-lg text-slate-300">
        Les ressources que nous éditons nous-mêmes, à télécharger immédiatement
        après l'achat. Tout le reste du site — l'annuaire, les prompts, les
        guides — reste gratuit et le restera.
      </p>

      {/* Pack Emploi Premium */}
      <section className="glass-card mb-8 p-6">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-amber-300">
          Pack de prompts
        </p>
        <h2 className="mb-3 text-2xl font-bold text-white">
          Pack Emploi Premium — 18 prompts pour décrocher un emploi
        </h2>
        <p className="mb-4 text-slate-300">
          Notre guide gratuit sur le CV et la lettre de motivation donne trois
          prompts. Ce pack couvre toute la démarche, de la première candidature
          à la négociation salariale — 18 prompts testés, prêts à copier dans
          ChatGPT, Claude ou Le Chat.
        </p>
        <ul className="mb-5 flex flex-col gap-2 text-slate-300">
          <li>
            <strong className="text-white">CV &amp; candidature</strong> — poste
            précis, reconversion, jeune diplômé sans expérience, profil
            LinkedIn, traduction en anglais. <em>5 prompts</em>
          </li>
          <li>
            <strong className="text-white">Lettre &amp; prise de contact</strong>{" "}
            — candidature spontanée, message de networking, relance après
            candidature, bourse ou formation. <em>4 prompts</em>
          </li>
          <li>
            <strong className="text-white">Entretien</strong> — simulation
            complète avec feedback, questions pièges, négociation salariale,
            email de remerciement, débrief d'un entretien raté.{" "}
            <em>5 prompts</em>
          </li>
          <li>
            <strong className="text-white">Après l'embauche</strong> — réussir
            sa période d'essai, demander une augmentation, plan de carrière sur
            5 ans, lettre de démission. <em>4 prompts</em>
          </li>
        </ul>
        <p className="mb-5 text-sm text-slate-400">
          Chaque prompt est accompagné de ses champs à remplir et des règles
          pour obtenir un résultat exploitable. Format PDF, téléchargement
          immédiat.
        </p>
        <ChariowWidget
          productId="prd_824w69na"
          storeDomain={STORE_DOMAIN}
          style="tap"
          borderStyle="rounded"
          ctaWidth="xs"
          ctaAnimation="shine"
          locale="fr"
          primaryColor="#ffcc00"
          backgroundColor="#FFFFFF"
        />
        <p className="mt-4 text-sm text-slate-400">
          Tu hésites ? Le{" "}
          <Link
            href="/guides/cv-lettre-motivation-entretien-ia-afrique"
            className="text-brand-300 hover:underline"
          >
            guide gratuit CV, lettre de motivation et entretien
          </Link>{" "}
          te donne déjà trois de ces prompts, avec des exemples réels.
        </p>
      </section>

      {/* Catalogue 1000 idées */}
      <section className="glass-card mb-10 p-6">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-amber-300">
          Catalogue
        </p>
        <h2 className="mb-3 text-2xl font-bold text-white">
          1000 idées de produits digitaux
        </h2>
        <p className="mb-4 text-slate-300">
          Le plus dur, quand on veut vendre un produit numérique, c'est rarement
          de le fabriquer — c'est de savoir quoi faire. Ce catalogue rassemble
          1000 idées de produits digitaux réparties sur de nombreuses
          thématiques, pour sortir de la page blanche et repérer une piste qui
          correspond à tes compétences.
        </p>
        <div className="mb-4 rounded-xl border border-amber-400/30 bg-amber-400/5 p-4">
          <p className="text-sm text-slate-200">
            <strong className="text-white">
              À lire avant d'acheter :
            </strong>{" "}
            ce catalogue contient des <strong className="text-white">idées</strong>{" "}
            de produits à créer toi-même. Ce ne sont{" "}
            <strong className="text-white">pas</strong> des produits finis
            livrés prêts à la revente. Tu repars avec une liste de pistes, pas
            avec un stock à vendre en l'état.
          </p>
        </div>
        <ul className="mb-5 flex flex-col gap-2 text-slate-300">
          <li>
            <strong className="text-white">1000 idées</strong> de produits
            numériques, classées par thématique.
          </li>
          <li>
            <strong className="text-white">Plusieurs niches couvertes</strong>,
            pour trouver un angle proche de ce que tu sais déjà faire.
          </li>
          <li>
            <strong className="text-white">Bonus inclus :</strong> un lot de
            presets Lightroom.
          </li>
        </ul>
        <p className="mb-5 text-sm text-slate-400">
          Téléchargement immédiat après l'achat.
        </p>
        <ChariowWidget
          productId="prd_66t2es"
          storeDomain={STORE_DOMAIN}
          style="tap"
          borderStyle="rounded"
          ctaWidth="xs"
          ctaAnimation="shine"
          locale="fr"
          primaryColor="#FFCC00"
          backgroundColor="#ffffff"
          customCtaText="Acheter maintenant"
        />
      </section>

      <div className="glass-card flex flex-col items-start gap-4 p-6">
        <p className="text-slate-200">
          Le paiement est géré par notre boutique Chariow, avec paiement par
          carte ou Mobile Money selon ton pays. Une question sur un produit ?{" "}
          <Link href="/contact" className="text-brand-300 hover:underline">
            Écris-nous
          </Link>
          .
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/prompts" className="btn-primary">
            Voir les prompts gratuits
          </Link>
          <Link href="/" className="btn-secondary">
            Explorer l'annuaire
          </Link>
        </div>
      </div>
    </div>
  );
}
