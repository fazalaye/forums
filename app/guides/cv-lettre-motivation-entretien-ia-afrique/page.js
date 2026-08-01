import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import CopyPromptButton from "@/components/CopyPromptButton";
import { faqSchema, breadcrumbSchema, SITE_URL } from "@/lib/seo";

export const metadata = {
  title: "CV, lettre de motivation, entretien : décroche un emploi avec l'IA",
  description:
    "Utilise ChatGPT gratuitement pour rédiger un CV percutant, une lettre de motivation convaincante et te préparer à l'entretien. Prompts prêts à copier pour le marché de l'emploi en Afrique.",
  alternates: {
    canonical: `${SITE_URL}/guides/cv-lettre-motivation-entretien-ia-afrique`,
  },
};

const PROMPT_CV =
  "Tu es un recruteur expérimenté et coach carrière. Voici mon parcours : [COLLE TON EXPÉRIENCE, TA FORMATION, TES COMPÉTENCES]. Le poste visé est : [TITRE DU POSTE]. Rédige-moi un CV clair et percutant en français : accroche professionnelle en 2 lignes, expériences reformulées avec des résultats concrets (même si informels ou associatifs), compétences classées par pertinence pour ce poste, formation, et une mise en forme simple à copier dans Word ou Canva. Signale-moi aussi les 3 points faibles de mon profil actuel et comment les compenser dans le CV.";

const PROMPT_LETTRE =
  "Tu es un coach en recherche d'emploi. Je postule pour le poste de [TITRE DU POSTE] chez [NOM DE L'ENTREPRISE]. Voici mon profil : [DÉCRIS TON EXPÉRIENCE ET TES MOTIVATIONS]. Rédige-moi une lettre de motivation en français, 200 mots maximum, qui : capte l'attention dès la première phrase, relie mon expérience aux besoins réels du poste (pas une liste générique de qualités), montre que je connais l'entreprise, et se termine par une demande d'entretien claire. Évite les formules toutes faites et le ton trop formel ou distant.";

const PROMPT_ENTRETIEN =
  "Tu es un recruteur qui va me faire passer un entretien d'embauche pour le poste de [TITRE DU POSTE] dans le secteur [SECTEUR]. Voici mon profil : [DÉCRIS TON EXPÉRIENCE]. Pose-moi 8 questions d'entretien réalistes une par une (mélange de questions générales, techniques et de mise en situation), attends ma réponse à chaque fois, puis donne-moi un feedback honnête sur ma réponse (ce qui est bon, ce qui manque, comment la reformuler) avant de passer à la question suivante. À la fin, donne-moi une note globale sur 10 et mes 3 axes d'amélioration prioritaires.";

const FAQ = [
  {
    q: "L'IA peut-elle vraiment améliorer mon CV ?",
    a: "Oui. Elle aide à reformuler vos expériences avec un langage professionnel et à structurer clairement votre CV — mais les informations doivent toujours rester vraies et vérifiables.",
  },
  {
    q: "Est-ce que les recruteurs remarquent un CV fait avec l'IA ?",
    a: "Pas si le contenu reste personnalisé et honnête. Évitez de copier-coller un texte générique : adaptez toujours la réponse de l'IA à votre parcours réel et au poste visé.",
  },
  {
    q: "Quel outil IA utiliser gratuitement pour son CV ?",
    a: "ChatGPT, Claude ou Le Chat de Mistral suffisent largement et sont gratuits, sans carte bancaire requise.",
  },
  {
    q: "Comment se préparer à un entretien avec l'IA ?",
    a: "En simulant l'entretien : demandez à l'IA de vous poser des questions réalistes une par une et de vous donner un retour honnête sur chaque réponse, comme dans le prompt de ce guide.",
  },
];

const BREADCRUMB_ITEMS = [
  { name: "Accueil", url: SITE_URL },
  { name: "Guides", url: `${SITE_URL}/guides` },
  {
    name: "CV, lettre de motivation, entretien : décroche un emploi avec l'IA",
    url: `${SITE_URL}/guides/cv-lettre-motivation-entretien-ia-afrique`,
  },
];

export default function GuidePage() {
  return (
    <article className="mx-auto max-w-3xl">
      <JsonLd data={faqSchema(FAQ)} />
      <JsonLd data={breadcrumbSchema(BREADCRUMB_ITEMS)} />

      <Breadcrumbs items={BREADCRUMB_ITEMS} />
      <p className="mb-3 text-sm text-slate-400">Guide · Emploi & Carrière</p>
      <h1 className="mb-4 text-4xl font-extrabold leading-tight">
        CV, lettre de motivation, entretien : décroche un emploi avec l'IA
      </h1>
      <p className="mb-6 text-lg text-slate-300">
        Le marché de l'emploi francophone en Afrique est compétitif, et faire
        rédiger son CV ou sa lettre de motivation par un professionnel coûte
        souvent cher. Les outils IA gratuits changent la donne.
      </p>
      <p className="mb-6 text-slate-300">
        En quelques minutes et sans dépenser un franc, ChatGPT, Claude ou Le
        Chat de Mistral peuvent produire un CV percutant, une lettre de
        motivation personnalisée, et même simuler un entretien pour vous
        entraîner. Ce guide donne 3 prompts prêts à copier qui couvrent tout
        le processus de candidature.
      </p>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">
          Pourquoi utiliser l'IA pour sa recherche d'emploi
        </h2>
        <p className="text-slate-300">
          C'est gratuit, rapide, disponible à toute heure, et ça aide à
          structurer votre candidature sans écrire à votre place. L'IA
          reformule et organise ce que vous lui donnez — mais le contenu
          doit rester vrai et personnel : n'inventez jamais une expérience
          que vous n'avez pas.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">
          1. Rédige un CV qui sort du lot
        </h2>
        <p className="mb-4 text-slate-300">
          Colle ton parcours et le poste visé, et l'IA te propose un CV
          structuré, plus les points faibles de ton profil à corriger.
        </p>
        <div className="glass-card p-6">
          <div className="mb-3 flex justify-end">
            <CopyPromptButton text={PROMPT_CV} />
          </div>
          <pre className="whitespace-pre-wrap rounded-xl bg-black/30 p-5 font-sans text-slate-200">
            {PROMPT_CV}
          </pre>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">
          2. Écris une lettre de motivation qui capte l'attention
        </h2>
        <p className="mb-4 text-slate-300">
          Ce prompt te donne une lettre courte et directe, centrée sur le
          poste précis plutôt que sur des formules génériques.
        </p>
        <div className="glass-card p-6">
          <div className="mb-3 flex justify-end">
            <CopyPromptButton text={PROMPT_LETTRE} />
          </div>
          <pre className="whitespace-pre-wrap rounded-xl bg-black/30 p-5 font-sans text-slate-200">
            {PROMPT_LETTRE}
          </pre>
        </div>
        <p className="mb-4 mt-6 text-sm text-slate-400">
          Voici un exemple réel, envoyé depuis un téléphone :
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <figure>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/guide-assets/emploi-lettre-prompt-rempli.jpg"
              alt="Exemple réel : le prompt lettre de motivation rempli et envoyé dans ChatGPT"
              className="w-full rounded-2xl border border-white/10"
            />
            <figcaption className="mt-2 text-center text-sm text-slate-400">
              Le prompt rempli avec un exemple concret
            </figcaption>
          </figure>
          <figure>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/guide-assets/emploi-lettre-resultat.jpg"
              alt="Exemple réel : lettre de motivation générée par ChatGPT à partir du prompt"
              className="w-full rounded-2xl border border-white/10"
            />
            <figcaption className="mt-2 text-center text-sm text-slate-400">
              Le résultat obtenu
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">
          3. Prépare-toi à l'entretien comme un pro
        </h2>
        <p className="mb-4 text-slate-300">
          L'IA joue le rôle du recruteur, te pose des questions réalistes une
          par une et te donne un retour honnête après chaque réponse.
        </p>
        <div className="glass-card p-6">
          <div className="mb-3 flex justify-end">
            <CopyPromptButton text={PROMPT_ENTRETIEN} />
          </div>
          <pre className="whitespace-pre-wrap rounded-xl bg-black/30 p-5 font-sans text-slate-200">
            {PROMPT_ENTRETIEN}
          </pre>
        </div>
        <p className="mb-4 mt-6 text-sm text-slate-400">
          Voici un exemple réel, envoyé depuis un téléphone :
        </p>
        <figure>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/guide-assets/emploi-entretien-exemple.jpg"
            alt="Exemple réel : simulation d'entretien avec ChatGPT à partir du prompt"
            className="w-full rounded-2xl border border-white/10"
          />
          <figcaption className="mt-2 text-center text-sm text-slate-400">
            Exemple réel de simulation d'entretien avec ChatGPT
          </figcaption>
        </figure>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">
          Conseils pour un bon résultat
        </h2>
        <ul className="flex flex-col gap-3 text-slate-300">
          <li>
            <strong className="text-white">
              Reste honnête, n'invente jamais d'expérience.
            </strong>{" "}
            L'IA reformule ce que vous lui donnez, elle ne fabrique pas un
            parcours crédible à partir de rien.
          </li>
          <li>
            <strong className="text-white">Personnalise toujours.</strong>{" "}
            Adapte la réponse de l'IA à ton parcours réel plutôt que de la
            copier-coller telle quelle.
          </li>
          <li>
            <strong className="text-white">
              Adapte chaque candidature au poste précis.
            </strong>{" "}
            Évite d'envoyer le même CV ou la même lettre partout : reprends
            le prompt pour chaque offre.
          </li>
          <li>
            <strong className="text-white">
              Entraîne-toi plusieurs fois avant le jour J.
            </strong>{" "}
            Relance le prompt d'entretien à plusieurs reprises pour gagner en
            aisance avant le vrai rendez-vous.
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
          Retrouvez d'autres prompts pour l'emploi et la carrière, ou
          explorez l'annuaire complet des outils IA.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/prompts?category=emploi" className="btn-primary">
            Voir tous les prompts Emploi
          </Link>
          <Link href="/" className="btn-secondary">
            Explorer l'annuaire
          </Link>
        </div>
      </div>
    </article>
  );
}
