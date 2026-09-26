import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import { faqSchema, breadcrumbSchema, articleSchema, SITE_URL, socialMetadata } from "@/lib/seo";

const TITLE = "IA en Afrique de l'Ouest : les stratégies nationales en 2026";
const DESCRIPTION =
  "Sénégal, Bénin, Mali, Côte d'Ivoire : où en sont les stratégies nationales d'intelligence artificielle en Afrique de l'Ouest francophone. Faits et chiffres vérifiés, sources officielles.";
const URL = `${SITE_URL}/guides/strategies-nationales-ia-afrique-ouest`;
export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  ...socialMetadata({ title: TITLE, description: DESCRIPTION, url: URL, type: "article" }),
};

const FAQ = [
  {
    q: "Le Bénin a-t-il vraiment un ministère de l'intelligence artificielle ?",
    a: "Oui. Dans le nouveau gouvernement du président Romuald Wadagni (mandat 2026-2033), le Bénin a créé un ministère dédié à la Transformation digitale et à l'Innovation, en charge de la stratégie nationale d'IA. Il est dirigé par Mahuna Akplogan, ingénieur et titulaire d'un doctorat en intelligence artificielle.",
  },
  {
    q: "Qu'est-ce que le CIAR-Mali ?",
    a: "Le Centre d'Intelligence Artificielle et de Robotique (CIAR-Mali) est un établissement public à caractère scientifique, technique et culturel dédié à la recherche, à la formation et à l'incubation de jeunes startups en IA et robotique. Son ordonnance de création a été adoptée en Conseil des ministres le 25 juillet 2023 et ratifiée par le CNT le 19 octobre 2023 (130 voix pour, 0 contre, 0 abstention). Le site, à Kati Sirakoro Niaré, couvre 50 hectares et a été entièrement financé par le budget national malien, pour un coût de 3,3 milliards de FCFA.",
  },
  {
    q: "Quel est l'objectif chiffré de la stratégie IA du Sénégal ?",
    a: "La Stratégie nationale d'IA du Sénégal, qui court jusqu'en 2028, vise à former environ 90 000 Sénégalais en data science et intelligence artificielle d'ici 2028.",
  },
  {
    q: "Où se former à l'IA au Sénégal ?",
    a: "Notre guide dédié « Se former à l'IA au Sénégal » recense les universités, bootcamps, plateformes en ligne et ressources gratuites disponibles, avec les débouchés et une méthode pour débuter sans budget.",
  },
  {
    q: "Est-ce que le Mali a une stratégie nationale d'IA comme le Sénégal ou la Côte d'Ivoire ?",
    a: "Pas au même sens. Le Sénégal, la Côte d'Ivoire et le Bénin ont chacun un document de stratégie nationale ou un ministère dédié. Le Mali, lui, a créé un centre de recherche et de formation spécifique (le CIAR-Mali) — c'est une initiative publique concrète, mais d'une nature différente d'une stratégie nationale globale publiée.",
  },
];

const BREADCRUMB_ITEMS = [
  { name: "Accueil", url: SITE_URL },
  { name: "Guides", url: `${SITE_URL}/guides` },
  {
    name: "Stratégies nationales IA en Afrique de l'Ouest",
    url: `${SITE_URL}/guides/strategies-nationales-ia-afrique-ouest`,
  },
];

export default function GuidePage() {
  return (
    <article className="mx-auto max-w-3xl">
      <JsonLd data={faqSchema(FAQ)} />
      <JsonLd data={breadcrumbSchema(BREADCRUMB_ITEMS)} />
      <JsonLd
        data={articleSchema({
          title: "IA en Afrique de l'Ouest : les stratégies nationales en 2026",
          description:
            "Sénégal, Bénin, Mali, Côte d'Ivoire : où en sont les stratégies nationales d'intelligence artificielle en Afrique de l'Ouest francophone. Faits et chiffres vérifiés, sources officielles.",
          url: `${SITE_URL}/guides/strategies-nationales-ia-afrique-ouest`,
          datePublished: "2026-08-10",
        })}
      />

      <Breadcrumbs items={BREADCRUMB_ITEMS} />
      <p className="mb-3 text-sm text-slate-400">Guide · Afrique de l'Ouest</p>
      <h1 className="mb-4 text-4xl font-extrabold leading-tight">
        Où en est l'intelligence artificielle dans les gouvernements
        d'Afrique de l'Ouest ?
      </h1>
      <p className="mb-6 text-lg text-slate-300">
        Depuis un à deux ans, plusieurs gouvernements d'Afrique de
        l'Ouest sont passés du discours sur l'IA au financement
        d'institutions et de stratégies concrètes. Ce guide dresse un état
        des lieux factuel et sourcé — Sénégal, Côte d'Ivoire, Bénin et Mali —
        sans battage médiatique : uniquement des faits vérifiés, avec leurs
        sources officielles.
      </p>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">Sénégal</h2>
        <p className="mb-4 text-slate-300">
          Le président Bassirou Diomaye Faye a officiellement lancé le{" "}
          <Link
            href="https://www.presidence.sn/fr/actualites/new-deal-technologique-une-ambition-nationale-pour-faire-du-senegal-un-leader-de-leconomie-numerique-en-afrique/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-300 hover:underline"
          >
            « New Deal Technologique »
          </Link>
          , la stratégie numérique du Sénégal, en février 2025. Son programme
          « IA & Digital Factory » vise à faire du Sénégal un pôle qui
          produit, utilise et exporte des technologies d'IA, de cloud
          computing, de cybersécurité, de réalité virtuelle, de jeu vidéo et
          de robotique.
        </p>
        <p className="mb-4 text-slate-300">
          La Stratégie nationale d'IA, qui court jusqu'en 2028, s'articule
          autour de 4 objectifs et 6 orientations stratégiques couvrant 52
          actions (capital humain, passage de l'innovation au marché, cluster
          national d'IA, coopération régionale). Objectif chiffré affiché :
          former environ 90 000 Sénégalais en data science et IA d'ici 2028.
        </p>
        <p className="mb-6 text-slate-300">
          Les projets prévus incluent un institut national de recherche et de
          formation en IA, un « Cluster Sénégal IA » (visé pour fin 2025), un
          financement public dédié à la recherche et aux startups IA, ainsi
          qu'un data lake public/privé organisé par secteur.
        </p>
        <p className="text-slate-300">
          Pour le détail des formations, écoles et débouchés disponibles au
          Sénégal, consulte notre guide{" "}
          <Link
            href="/guides/se-former-ia-senegal"
            className="text-brand-300 hover:underline"
          >
            se former à l'IA au Sénégal
          </Link>
          .
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">
          Côte d'Ivoire
        </h2>
        <p className="mb-4 text-slate-300">
          Le gouvernement ivoirien a présenté sa Stratégie Nationale de
          l'Intelligence Artificielle (SNIA 2030) et sa Stratégie Nationale
          de Gouvernance des Données (SNGD 2030) le 13 mars 2025. Le Premier
          ministre Robert Beugré Mambé a affirmé l'ambition que la Côte
          d'Ivoire soit « non pas seulement consommateurs, mais aussi
          concepteurs » d'IA.
        </p>
        <p className="mb-4 text-slate-300">
          La stratégie donne la priorité à une IA au service de
          l'agriculture, de l'éducation, de la santé et de la modernisation
          de l'administration publique. Le gouvernement vise à disposer d'une
          capacité de calcul nationale adaptée au développement de l'IA dans
          les 12 mois suivant la présentation de la stratégie.
        </p>
        <p className="text-slate-300">
          Source :{" "}
          <Link
            href="https://www.gouv.ci/actualite/strategies-nationales-de-lintelligence-artificielle-et-de-la-gouvernance-des-donnees-le-ministre-kalil-konate-remet-officiellement-les-documents-au-premier-ministre-2374"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-300 hover:underline"
          >
            l'annonce officielle sur le site du gouvernement ivoirien
          </Link>
          .
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">Bénin</h2>
        <p className="mb-4 text-slate-300">
          Le Bénin dispose d'une Stratégie Nationale d'Intelligence
          Artificielle et des Mégadonnées courant sur la période 2023-2027.
          En 2026, dans le nouveau gouvernement du président Romuald Wadagni
          (mandat de 7 ans, 2026-2033), le pays a créé un ministère
          spécifiquement dédié à la Transformation digitale et à
          l'Innovation, en charge de la stratégie nationale d'IA — dirigé par{" "}
          <Link
            href="https://www.gouv.bj/article/3565/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-300 hover:underline"
          >
            Mahuna Akplogan, ingénieur et titulaire d'un doctorat en
            intelligence artificielle
          </Link>
          .
        </p>
        <p className="mb-4 text-slate-300">
          Le Bénin a organisé en 2026 des « Olympiades Nationales
          d'Intelligence Artificielle » pour sélectionner les talents devant
          représenter le pays lors d'une compétition internationale au
          Kazakhstan.
        </p>
        <p className="text-slate-300">
          Les domaines d'application prioritaires nommés dans la stratégie
          sont l'éducation, la santé, l'agriculture, le cadre de vie et le
          tourisme.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">Mali</h2>
        <p className="mb-4 text-slate-300">
          Le Mali a créé le{" "}
          <Link
            href="https://ciar-mali.net/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-300 hover:underline"
          >
            Centre d'Intelligence Artificielle et de Robotique (CIAR-Mali)
          </Link>
          , un établissement public à caractère scientifique, technique et
          culturel de recherche et de formation. L'ordonnance qui le crée a
          été adoptée en Conseil des ministres le 25 juillet 2023, puis
          ratifiée par le Conseil National de Transition (CNT) le 19 octobre
          2023, par un vote unanime (130 voix pour, 0 contre, 0 abstention).
        </p>
        <p className="mb-4 text-slate-300">
          Le président de la Transition, le colonel Assimi Goïta, a posé la
          première pierre du site à Kati Sirakoro Niaré. Le site couvre 50
          hectares (dont 5 hectares de bâtiments), entièrement financés par
          le budget national malien, pour un coût de 3,3 milliards de FCFA.
          Sa mission : recherche, formation, et incubation de jeunes
          startups en IA et robotique, en collaboration avec le secteur
          industriel.
        </p>
        <p className="text-slate-300">
          Une nuance importante : contrairement au Sénégal, à la Côte
          d'Ivoire et au Bénin, l'initiative publique identifiée ici pour le
          Mali est un centre de recherche et de formation spécifique, et non
          un document de stratégie nationale globale publié. Il ne faut pas
          confondre les deux — ce sont des choses différentes.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">
          Synthèse : des initiatives de nature différente
        </h2>
        <p className="mb-4 text-slate-300">
          Ces quatre initiatives ne se comparent pas terme à terme : une
          stratégie nationale assortie d'objectifs chiffrés comme celle du
          Sénégal, un ministère tout juste créé comme au Bénin, un cadre
          stratégique publié comme en Côte d'Ivoire, et un centre de
          recherche physique unique comme au Mali. Les classer sur une seule
          échelle serait trompeur.
        </p>
        <p className="text-slate-300">
          Le fil conducteur, lui, est clair : les gouvernements d'Afrique de
          l'Ouest sont passés des déclarations d'intention à des actions
          financées, à peu près en un à deux ans.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">
          Pour aller plus loin
        </h2>
        <ul className="flex flex-col gap-3 text-slate-300">
          <li>
            <strong className="text-white">
              Tu veux comprendre les bases de l'IA ?
            </strong>{" "}
            Notre guide{" "}
            <Link
              href="/guides/definition-intelligence-artificielle"
              className="text-brand-300 hover:underline"
            >
              qu'est-ce que l'intelligence artificielle ?
            </Link>{" "}
            explique le concept simplement, avec les définitions officielles.
          </li>
          <li>
            <strong className="text-white">
              Tu veux utiliser l'IA dès aujourd'hui, sans attendre les
              stratégies gouvernementales ?
            </strong>{" "}
            Découvre notre sélection{" "}
            <Link
              href="/guides/outils-ia-gratuits-francais-afrique"
              className="text-brand-300 hover:underline"
            >
              d'outils IA gratuits en français
            </Link>
            , classés par usage.
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">
          Questions fréquentes
        </h2>
        <div className="flex flex-col gap-4">
          {FAQ.map((item) => (
            <div key={item.q} className="glass rounded-xl p-4">
              <h3 className="mb-1 font-semibold text-slate-100">{item.q}</h3>
              <p className="text-sm text-slate-300">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="glass-card flex flex-col items-start gap-4 p-6">
        <p className="text-slate-200">
          Ce guide est un point de départ. Sur{" "}
          <strong className="text-white">PromptForums</strong>, retrouvez
          chaque outil testé, noté et comparé — mis à jour chaque semaine —
          et une bibliothèque de prompts prêts à copier.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/" className="btn-primary">
            Explorer l'annuaire
          </Link>
          <Link href="/prompts" className="btn-secondary">
            Voir les prompts
          </Link>
        </div>
        <p className="mt-2 text-sm text-slate-400">
          📩 Recevez chaque semaine les meilleurs outils et prompts IA, en
          français.{" "}
          <Link href="/#newsletter" className="text-brand-300 hover:underline">
            Rejoignez la newsletter gratuite.
          </Link>
        </p>
      </div>
    </article>
  );
}
