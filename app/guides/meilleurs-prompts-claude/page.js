import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import { faqSchema, breadcrumbSchema, articleSchema, SITE_URL } from "@/lib/seo";

export const metadata = {
  title: "Les meilleurs prompts Claude en français (2026)",
  description:
    "Prompts Claude prêts à copier : CV, création de site web, PowerPoint, apprentissage d'une langue, étude de marché. Plus la technique des balises XML.",
  alternates: {
    canonical: `${SITE_URL}/guides/meilleurs-prompts-claude`,
  },
};

const PROMPT_CV = `Aide-moi à rédiger un CV pour un poste de [intitulé du poste]. Voici mon
parcours : [colle ton expérience, formation, compétences]. Structure le CV
en sections claires (profil, expérience, formation, compétences), avec des
phrases courtes orientées résultats plutôt que des listes de tâches. Adapte
le vocabulaire au secteur [nom du secteur].`;

const PROMPT_SITE_WEB = `Je veux créer un site web pour [décris ton activité : ex. un restaurant,
un portfolio, une boutique en ligne]. Propose-moi : 1) la structure des
pages nécessaires, 2) le contenu texte pour la page d'accueil, 3) les
sections indispensables pour ce type de site. Public cible : [décris ton
audience].`;

const PROMPT_POWERPOINT = `Prépare le plan d'une présentation sur [sujet], pour une durée de
[X minutes], destinée à [type de public : direction, clients, étudiants...].
Pour chaque slide, donne : le titre, les points clés (3-4 max), et une
suggestion de visuel. Ton : [professionnel / pédagogique / convaincant].`;

const PROMPT_LANGUE = `Aide-moi à apprendre [langue] niveau [débutant/intermédiaire/avancé].
Fais-moi pratiquer à travers une conversation sur le thème [sujet de ton
choix : voyage, travail, quotidien]. Corrige mes erreurs de grammaire et
de vocabulaire après chaque réponse, en expliquant pourquoi, puis relance
la conversation.`;

const PROMPT_CONTENU = `Rédige [type de contenu : article de blog / post réseaux sociaux / newsletter]
sur le sujet [sujet], pour l'audience [décris ton audience]. Longueur :
[nombre de mots]. Ton : [ton souhaité]. Inclus une accroche forte en
introduction et un appel à l'action en conclusion.`;

const PROMPT_ETUDE_MARCHE = `Aide-moi à structurer une étude de marché pour [produit/service/activité]
sur le marché de [zone géographique]. Couvre : la taille et les tendances
du marché, les principaux concurrents, le profil du client cible, et les
opportunités/risques. Indique clairement quand une donnée doit être
vérifiée avec une vraie source plutôt qu'estimée.`;

const PROMPT_GESTION_PROJET = `Aide-moi à planifier le projet suivant : [décris le projet]. Découpe-le
en étapes avec un ordre logique, estime une durée réaliste pour chacune,
identifie les dépendances entre étapes, et signale les risques principaux
à anticiper.`;

const PROMPT_CLAUDE_CODE = `Corrige [décris le bug précisément, avec le comportement attendu vs.
observé]. Ne modifie que le fichier concerné, n'ajoute pas de fonctionnalité
supplémentaire, et explique en une phrase la cause du bug avant de proposer
le correctif.`;

const XML_EXAMPLE = `<role>Tu es un rédacteur spécialisé en copywriting e-commerce.</role>

<context>
Je vends des produits artisanaux en ligne, public jeune actif, ton
décontracté mais professionnel.
</context>

<task>
Rédige une fiche produit pour : [nom et description du produit].
</task>

<output_format>
Titre accrocheur, description en 3 paragraphes courts, 3 points clés en
liste à puces.
</output_format>`;

const FAQ = [
  {
    q: "Comment faire un bon prompt pour Claude ?",
    a: "Donne du contexte (qui tu es, pour quoi), précise le format de réponse attendu (longueur, ton, structure), et itère : si la réponse n'est pas parfaite, précise ce qui manque plutôt que de reformuler depuis zéro.",
  },
  {
    q: "Quel prompt utiliser pour créer un CV avec Claude ?",
    a: "Colle ton parcours (expérience, formation, compétences) et demande une structure en sections avec des phrases orientées résultats plutôt que des listes de tâches, en précisant le secteur visé pour adapter le vocabulaire.",
  },
  {
    q: "Les balises XML sont-elles vraiment utiles pour prompter Claude ?",
    a: "Oui — c'est une recommandation officielle d'Anthropic, pas une astuce communautaire. Claude a été entraîné à bien reconnaître cette structure. Elle est surtout utile pour les prompts complexes à plusieurs sections ; pour une question simple, le texte libre suffit.",
  },
  {
    q: "Peut-on utiliser Claude pour apprendre une langue ?",
    a: "Oui, en lui demandant explicitement de tenir une conversation sur un thème précis et de corriger tes erreurs de grammaire/vocabulaire après chaque réponse, avec une explication — pas juste une conversation libre.",
  },
];

const BREADCRUMB_ITEMS = [
  { name: "Accueil", url: SITE_URL },
  { name: "Guides", url: `${SITE_URL}/guides` },
  {
    name: "Les meilleurs prompts Claude",
    url: `${SITE_URL}/guides/meilleurs-prompts-claude`,
  },
];

export default function GuidePage() {
  return (
    <article className="mx-auto max-w-3xl">
      <JsonLd data={faqSchema(FAQ)} />
      <JsonLd data={breadcrumbSchema(BREADCRUMB_ITEMS)} />
      <JsonLd
        data={articleSchema({
          title: "Les meilleurs prompts Claude en français (2026)",
          description:
            "Prompts Claude prêts à copier : CV, création de site web, PowerPoint, apprentissage d'une langue, étude de marché. Plus la technique des balises XML.",
          url: `${SITE_URL}/guides/meilleurs-prompts-claude`,
          datePublished: "2026-08-07",
        })}
      />

      <Breadcrumbs items={BREADCRUMB_ITEMS} />
      <p className="mb-3 text-sm text-slate-400">Guide · Chatbots & Assistants</p>
      <h1 className="mb-4 text-4xl font-extrabold leading-tight">
        Les meilleurs prompts Claude : CV, site web, PowerPoint, apprentissage
      </h1>
      <p className="mb-6 text-lg text-slate-300">
        Claude (Anthropic) répond différemment selon la façon dont tu formules
        ta demande. Un bon prompt peut faire la différence entre une réponse
        générique et un résultat directement utilisable. Ce guide rassemble
        des prompts prêts à copier pour les usages les plus recherchés, plus
        une technique avancée recommandée officiellement par Anthropic.
      </p>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">
          Comment faire un bon prompt Claude
        </h2>
        <p className="mb-6 text-slate-300">
          Trois principes simples, avant les exemples :
        </p>
        <ol className="mb-6 list-decimal space-y-3 pl-5 text-slate-300">
          <li>
            <strong className="text-white">Donne du contexte</strong> — qui tu
            es, pour qui c'est destiné, dans quel but.
          </li>
          <li>
            <strong className="text-white">
              Sois précis sur le format attendu
            </strong>{" "}
            — longueur, ton, structure (liste, tableau, paragraphes).
          </li>
          <li>
            <strong className="text-white">Itère</strong> — si la première
            réponse n'est pas parfaite, précise ce qui manque plutôt que de
            tout recommencer.
          </li>
        </ol>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">
          Prompts prêts à copier par usage
        </h2>

        <h3 className="mb-3 text-xl font-semibold text-white">CV</h3>
        <div className="glass-card mb-8 p-6">
          <pre className="whitespace-pre-wrap rounded-xl bg-black/30 p-5 font-sans text-slate-200 text-sm">
            {PROMPT_CV}
          </pre>
        </div>

        <h3 className="mb-3 text-xl font-semibold text-white">
          Créer un site web
        </h3>
        <div className="glass-card mb-8 p-6">
          <pre className="whitespace-pre-wrap rounded-xl bg-black/30 p-5 font-sans text-slate-200 text-sm">
            {PROMPT_SITE_WEB}
          </pre>
        </div>

        <h3 className="mb-3 text-xl font-semibold text-white">
          PowerPoint / présentation
        </h3>
        <div className="glass-card mb-8 p-6">
          <pre className="whitespace-pre-wrap rounded-xl bg-black/30 p-5 font-sans text-slate-200 text-sm">
            {PROMPT_POWERPOINT}
          </pre>
        </div>

        <h3 className="mb-3 text-xl font-semibold text-white">
          Apprendre une langue
        </h3>
        <div className="glass-card mb-8 p-6">
          <pre className="whitespace-pre-wrap rounded-xl bg-black/30 p-5 font-sans text-slate-200 text-sm">
            {PROMPT_LANGUE}
          </pre>
        </div>

        <h3 className="mb-3 text-xl font-semibold text-white">
          Création de contenu
        </h3>
        <div className="glass-card mb-8 p-6">
          <pre className="whitespace-pre-wrap rounded-xl bg-black/30 p-5 font-sans text-slate-200 text-sm">
            {PROMPT_CONTENU}
          </pre>
        </div>

        <h3 className="mb-3 text-xl font-semibold text-white">
          Étude de marché
        </h3>
        <div className="glass-card mb-8 p-6">
          <pre className="whitespace-pre-wrap rounded-xl bg-black/30 p-5 font-sans text-slate-200 text-sm">
            {PROMPT_ETUDE_MARCHE}
          </pre>
        </div>

        <h3 className="mb-3 text-xl font-semibold text-white">
          Gestion de projet
        </h3>
        <div className="glass-card p-6">
          <pre className="whitespace-pre-wrap rounded-xl bg-black/30 p-5 font-sans text-slate-200 text-sm">
            {PROMPT_GESTION_PROJET}
          </pre>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">
          Prompts pour Claude Code
        </h2>
        <p className="mb-6 text-slate-300">
          Claude Code (l'outil qui a d'ailleurs servi à construire une partie
          de PromptForums) répond bien à des instructions précises sur le
          périmètre du changement :
        </p>
        <div className="glass-card p-6">
          <pre className="whitespace-pre-wrap rounded-xl bg-black/30 p-5 font-sans text-slate-200 text-sm">
            {PROMPT_CLAUDE_CODE}
          </pre>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">
          Technique avancée : les balises XML
        </h2>
        <p className="mb-6 text-slate-300">
          Pour les prompts complexes (plusieurs consignes à la fois),
          Anthropic recommande officiellement de structurer le prompt avec
          des balises XML plutôt qu'en texte libre continu — Claude a été
          entraîné à bien reconnaître ce type de structure :
        </p>
        <div className="glass-card mb-6 p-6">
          <pre className="whitespace-pre-wrap rounded-xl bg-black/30 p-5 font-sans text-slate-200 text-sm">
            {XML_EXAMPLE}
          </pre>
        </div>
        <p className="text-slate-300">
          Utile surtout quand ton prompt a plusieurs sections distinctes
          (contexte, tâche, format attendu) — pour une question simple, le
          texte libre présenté plus haut suffit largement.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">
          Pour aller plus loin
        </h2>
        <p className="text-slate-300">
          Retrouve Claude et d'autres assistants IA comparés dans la{" "}
          <Link
            href="/?category=chatbots#annuaire"
            className="text-brand-300 hover:underline"
          >
            catégorie Chatbots & Assistants
          </Link>{" "}
          de PromptForums, ou pioche directement dans notre{" "}
          <Link href="/prompts" className="text-brand-300 hover:underline">
            bibliothèque de prompts
          </Link>
          .
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">Conclusion</h2>
        <p className="text-slate-300">
          Un bon prompt Claude n'a rien de mystérieux : du contexte clair, un
          format de réponse précisé, et l'habitude d'itérer plutôt que de
          tout réécrire. Les exemples ci-dessus couvrent les usages les plus
          recherchés — copie-les, adapte les détails entre crochets à ta
          situation, et essaie la structure XML dès que ton prompt a
          plusieurs consignes à la fois.
        </p>
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
          <Link href="/?category=chatbots#annuaire" className="btn-primary">
            Explorer les chatbots IA
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
