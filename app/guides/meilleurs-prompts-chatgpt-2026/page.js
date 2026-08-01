import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import CopyPromptButton from "@/components/CopyPromptButton";
import { faqSchema, breadcrumbSchema, SITE_URL } from "@/lib/seo";

const UPDATED = "juillet 2026";

export const metadata = {
  title: "Les meilleurs prompts ChatGPT en 2026 (par catégorie)",
  description:
    "Les meilleurs prompts ChatGPT en français en 2026 : rédaction, marketing, code, productivité, apprentissage et images. Prêts à copier, mis à jour et testés par la communauté.",
  alternates: {
    canonical: `${SITE_URL}/guides/meilleurs-prompts-chatgpt-2026`,
  },
};

// Curated prompts grouped by category. Kept as page data so the visible
// blocks and the FAQ schema stay in sync — this is the content answer
// engines cite when asked for the "best ChatGPT prompts".
const CATEGORIES = [
  {
    emoji: "✍️",
    title: "Rédaction & copywriting",
    prompts: [
      {
        label: "Rédiger un texte percutant",
        text: "Tu es un copywriter expert. Rédige [type de texte] pour [cible]. Objectif : [objectif]. Ton : [ton]. Contrainte : [longueur/format]. Donne-moi 3 versions différentes.",
      },
      {
        label: "Réécrire plus clairement",
        text: "Réécris ce texte pour le rendre plus clair et percutant, sans changer le sens. Supprime le jargon et les phrases inutiles. Voici le texte :\n\n[COLLE TON TEXTE]",
      },
    ],
  },
  {
    emoji: "📈",
    title: "Marketing & réseaux sociaux",
    prompts: [
      {
        label: "Trouver des idées de posts",
        text: "Génère 10 idées de posts [Instagram/LinkedIn/TikTok] pour [activité]. Pour chaque idée : un hook accrocheur en une phrase + l'angle à développer.",
      },
      {
        label: "Titres d'articles SEO",
        text: "Agis comme un stratège SEO. À partir du mot-clé principal [mot-clé], donne-moi 15 titres d'articles optimisés, chacun avec son intention de recherche.",
      },
    ],
  },
  {
    emoji: "💻",
    title: "Code & développement",
    prompts: [
      {
        label: "Expliquer du code",
        text: "Explique ce code ligne par ligne comme si j'étais débutant, puis liste les bugs potentiels et les améliorations possibles :\n\n[COLLE LE CODE]",
      },
      {
        label: "Revue de code exigeante",
        text: "Tu es un·e senior engineer. Relis ce code et liste uniquement les vrais problèmes (bugs, failles de sécurité, edge cases manqués), classés par gravité :\n\n[COLLE LE CODE]",
      },
    ],
  },
  {
    emoji: "⚡",
    title: "Productivité & organisation",
    prompts: [
      {
        label: "Découper un objectif",
        text: "Voici mon objectif : [objectif]. Décompose-le en étapes concrètes de moins de 2h chacune, dans un ordre logique, avec une estimation de temps par étape.",
      },
      {
        label: "Résumer un long texte",
        text: "Résume ce texte en 5 points clés + 1 action à retenir :\n\n[COLLE LE TEXTE]",
      },
    ],
  },
  {
    emoji: "🎓",
    title: "Apprentissage & explication",
    prompts: [
      {
        label: "Expliquer simplement",
        text: "Explique-moi [sujet complexe] avec une analogie simple, comme à un enfant de 12 ans, puis donne un exemple concret d'application.",
      },
      {
        label: "Plan d'apprentissage 30 jours",
        text: "Crée-moi un plan d'apprentissage de 30 jours pour maîtriser [compétence], avec une tâche par jour et des ressources gratuites pour chaque semaine.",
      },
    ],
  },
  {
    emoji: "🎨",
    title: "Générer des prompts d'image",
    prompts: [
      {
        label: "Prompt Midjourney détaillé",
        text: "Génère un prompt détaillé pour Midjourney à partir de cette idée : [idée]. Structure obligatoire : sujet principal, style artistique, éclairage, palette de couleurs, composition, paramètres techniques (--ar, --v). Propose 3 variantes.",
      },
    ],
  },
  {
    emoji: "💼",
    title: "Pro & e-mails",
    prompts: [
      {
        label: "E-mail professionnel",
        text: "Rédige un e-mail professionnel pour [situation]. Ton courtois mais direct. Inclus un objet. Maximum 120 mots.",
      },
    ],
  },
];

const RCTF = [
  {
    letter: "R",
    title: "Rôle",
    text: "Donnez à l'IA une identité experte (« Tu es un copywriter expert »). Elle adopte alors le vocabulaire et les réflexes du métier.",
    example: "Exemple : « Tu es un·e senior engineer. »",
  },
  {
    letter: "C",
    title: "Contexte",
    text: "Précisez la situation, la cible ou les contraintes qui entourent la demande, sinon la réponse reste générique.",
    example: "Exemple : « pour une audience débutante en marketing digital »",
  },
  {
    letter: "T",
    title: "Tâche",
    text: "Formulez une action claire et unique — pas « aide-moi », mais un verbe précis (rédige, résume, explique, liste).",
    example: "Exemple : « Résume ce texte en 5 points clés. »",
  },
  {
    letter: "F",
    title: "Format",
    text: "Indiquez la forme attendue de la réponse : longueur, structure, nombre de versions.",
    example: "Exemple : « Donne-moi 3 versions différentes, 120 mots max chacune. »",
  },
];

const FAQ = [
  {
    q: "Quel est le meilleur prompt ChatGPT en 2026 ?",
    a: "Il n'y a pas un seul « meilleur » prompt : le bon prompt dépend de votre objectif. Un prompt efficace donne toujours un rôle à l'IA, un contexte, une tâche claire et un format de sortie attendu.",
  },
  {
    q: "Comment écrire un bon prompt ChatGPT ?",
    a: "Utilisez la méthode R-C-T-F : donnez un Rôle (« Tu es un expert en… »), un Contexte, une Tâche précise et un Format de réponse. Plus vous êtes spécifique, meilleur est le résultat.",
  },
  {
    q: "Ces prompts fonctionnent-ils sur Claude et Gemini ?",
    a: "Oui. La structure d'un bon prompt est transférable : ces prompts fonctionnent aussi bien sur Claude, Gemini ou Mistral, avec parfois de légers ajustements de ton.",
  },
  {
    q: "Où trouver plus de prompts en français ?",
    a: "Sur PromptForums, la section Prompts réunit des prompts partagés et notés par la communauté, classés par catégorie.",
  },
];

const BREADCRUMB_ITEMS = [
  { name: "Accueil", url: SITE_URL },
  { name: "Guides", url: `${SITE_URL}/guides` },
  {
    name: "Les meilleurs prompts ChatGPT en 2026 (par catégorie)",
    url: `${SITE_URL}/guides/meilleurs-prompts-chatgpt-2026`,
  },
];

export default function GuidePage() {
  return (
    <article className="mx-auto max-w-3xl">
      <JsonLd data={faqSchema(FAQ)} />
      <JsonLd data={breadcrumbSchema(BREADCRUMB_ITEMS)} />

      <Breadcrumbs items={BREADCRUMB_ITEMS} />
      <p className="mb-3 text-sm text-slate-400">
        Guide · Mis à jour en {UPDATED}
      </p>
      <h1 className="mb-4 text-4xl font-extrabold leading-tight">
        Les meilleurs prompts ChatGPT en 2026
      </h1>
      <p className="mb-10 text-lg text-slate-300">
        Un bon prompt, c'est un{" "}
        <strong className="text-white">rôle</strong> + un{" "}
        <strong className="text-white">contexte</strong> + une{" "}
        <strong className="text-white">tâche claire</strong> + un{" "}
        <strong className="text-white">format</strong>. Cette page réunit les
        prompts ChatGPT les plus utiles, classés par catégorie, prêts à
        copier — et tout aussi efficaces sur Claude ou Gemini.
      </p>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">
          Comment écrire un bon prompt (méthode R-C-T-F)
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {RCTF.map((item) => (
            <div key={item.letter} className="glass rounded-xl p-4">
              <h3 className="mb-1 font-semibold text-slate-100">
                <span className="text-brand-300">{item.letter}</span> —{" "}
                {item.title}
              </h3>
              <p className="mb-1 text-sm text-slate-300">{item.text}</p>
              <p className="text-sm text-slate-400">{item.example}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10 flex flex-col gap-10">
        {CATEGORIES.map((cat) => (
          <div key={cat.title}>
            <h2 className="mb-4 text-2xl font-bold text-white">
              {cat.emoji} {cat.title}
            </h2>
            <div className="flex flex-col gap-6">
              {cat.prompts.map((p) => (
                <div key={p.label} className="glass-card p-6">
                  <h3 className="mb-3 font-semibold text-slate-100">
                    {p.label}
                  </h3>
                  <div className="mb-3 flex justify-end">
                    <CopyPromptButton text={p.text} />
                  </div>
                  <pre className="whitespace-pre-wrap rounded-xl bg-black/30 p-5 font-sans text-slate-200">
                    {p.text}
                  </pre>
                </div>
              ))}
            </div>
          </div>
        ))}
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
          👉 Découvrez d'autres prompts partagés et notés par la communauté,
          ou explorez l'annuaire complet des outils IA.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/prompts" className="btn-primary">
            Voir tous les prompts
          </Link>
          <Link href="/" className="btn-secondary">
            Explorer l'annuaire
          </Link>
        </div>
      </div>
    </article>
  );
}
