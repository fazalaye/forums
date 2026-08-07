import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import { faqSchema, breadcrumbSchema, articleSchema, SITE_URL } from "@/lib/seo";

export const metadata = {
  title: "Nano Banana : les meilleurs prompts en français (2026)",
  description:
    "Prompts Nano Banana prêts à copier : photo LinkedIn pro, photo CV, logo, retouche d'image. Comment accéder gratuitement à l'outil de Google.",
  alternates: {
    canonical: `${SITE_URL}/guides/nano-banana-prompts`,
  },
};

const PROMPT_LINKEDIN = `Transforme cette photo en portrait professionnel pour LinkedIn : arrière-plan
neutre flou (bureau moderne ou gris uni), éclairage doux et uniforme,
tenue business formelle, cadrage buste, expression confiante et naturelle.
Garde mon visage et mes traits identiques, ne les modifie pas.`;

const PROMPT_CV = `Transforme cette photo en photo d'identité professionnelle pour CV :
fond blanc ou gris clair uni, éclairage frontal doux sans ombre dure,
cadrage épaules et visage centré, tenue soignée. Conserve exactement
mon visage, ma coiffure et mes traits d'origine.`;

const PROMPT_LOGO = `Crée un logo minimaliste pour [nom de l'entreprise/activité] : style plat
(flat design), 2 couleurs maximum ([couleur 1] et [couleur 2]), forme
géométrique simple évoquant [idée/secteur], fond transparent, lisible
en petite taille comme icône d'application.`;

const PROMPT_RETOUCHE_QUALITE = `Améliore la qualité de cette image : augmente la netteté et la résolution,
corrige la luminosité et le contraste, réduis le bruit/grain, sans changer
le contenu, les couleurs dominantes ni la composition d'origine.`;

const PROMPT_RETOUCHE_EXTENSION = `Étends cette image vers [le haut/la gauche/la droite] en prolongeant
naturellement l'arrière-plan existant, sans ajouter d'éléments nouveaux
qui ne seraient pas cohérents avec la scène.`;

const JSON_EXAMPLE = `{
  "prompt": "Portrait professionnel en studio",
  "style": {
    "genre": "photographie corporate",
    "lighting": "lumière douce trois points",
    "mood": "confiant, accessible"
  },
  "technical": {
    "camera_angle": "légèrement en contre-plongée",
    "framing": "buste, centré",
    "aspect_ratio": "1:1"
  },
  "constraints": "conserver les traits du visage d'origine"
}`;

const FAQ = [
  {
    q: "Nano Banana est-il gratuit ?",
    a: "Oui, avec des limites quotidiennes. Via l'app Gemini ou Google AI Studio, tu as accès à un usage gratuit chaque jour (le nombre exact d'images évolue selon les mises à jour de Google — vérifie les chiffres actuels sur le site officiel).",
  },
  {
    q: "Comment utiliser Nano Banana pour une photo LinkedIn ?",
    a: "Pars d'une photo existante et utilise un prompt qui précise : arrière-plan neutre, éclairage doux, tenue professionnelle, et surtout une consigne explicite pour conserver tes traits de visage d'origine.",
  },
  {
    q: "Quelle est la différence entre Nano Banana, Nano Banana 2 et Nano Banana Pro ?",
    a: "Nano Banana Pro (Gemini 3 Pro Image) est la version la plus avancée, avec texte lisible dans l'image et résolution jusqu'à 4K. Nano Banana 2 est un bon compromis quotidien. Nano Banana Lite privilégie la vitesse pour un usage en volume.",
  },
  {
    q: "Le format JSON est-il obligatoire pour écrire un prompt Nano Banana ?",
    a: "Non. Le texte libre fonctionne très bien pour un usage courant. Le format JSON est une option pour les usages avancés où tu veux fixer précisément plusieurs paramètres techniques.",
  },
];

const BREADCRUMB_ITEMS = [
  { name: "Accueil", url: SITE_URL },
  { name: "Guides", url: `${SITE_URL}/guides` },
  {
    name: "Nano Banana : les meilleurs prompts",
    url: `${SITE_URL}/guides/nano-banana-prompts`,
  },
];

export default function GuidePage() {
  return (
    <article className="mx-auto max-w-3xl">
      <JsonLd data={faqSchema(FAQ)} />
      <JsonLd data={breadcrumbSchema(BREADCRUMB_ITEMS)} />
      <JsonLd
        data={articleSchema({
          title: "Nano Banana : les meilleurs prompts en français (2026)",
          description:
            "Prompts Nano Banana prêts à copier : photo LinkedIn pro, photo CV, logo, retouche d'image. Comment accéder gratuitement à l'outil de Google.",
          url: `${SITE_URL}/guides/nano-banana-prompts`,
          datePublished: "2026-08-06",
        })}
      />

      <Breadcrumbs items={BREADCRUMB_ITEMS} />
      <p className="mb-3 text-sm text-slate-400">Guide · Génération d'images</p>
      <h1 className="mb-4 text-4xl font-extrabold leading-tight">
        Nano Banana : les meilleurs prompts (photo LinkedIn, CV, logo,
        retouche)
      </h1>
      <p className="mb-6 text-lg text-slate-300">
        Depuis février 2026, un nom improbable circule partout dans les
        communautés IA : Nano Banana. Derrière ce nom se cache l'un des
        générateurs d'images les plus impressionnants du moment, développé
        par Google. Résultat : des centaines de guides de prompts existent
        déjà... en anglais. Ce guide te donne les meilleurs prompts, traduits
        et adaptés, prêts à copier-coller.
      </p>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">
          C'est quoi Nano Banana ?
        </h2>
        <p className="mb-6 text-slate-300">
          Nano Banana est le nom donné par Google à sa famille de modèles de
          génération et retouche d'images, basée sur Gemini. Il existe en
          plusieurs versions :
        </p>
        <ul className="mb-6 flex flex-col gap-3 text-slate-300">
          <li>
            <strong className="text-white">Nano Banana Pro</strong> (Gemini 3
            Pro Image) — la version la plus avancée : texte lisible dans
            l'image même en plusieurs langues, résolution jusqu'à 4K.
          </li>
          <li>
            <strong className="text-white">Nano Banana 2</strong> (Gemini 3.1
            Flash Image) — un bon compromis qualité/vitesse pour un usage
            quotidien.
          </li>
          <li>
            <strong className="text-white">Nano Banana Lite</strong> (Gemini
            3.1 Flash Lite Image) — la version rapide et légère, pensée pour
            un usage en masse.
          </li>
        </ul>
        <p className="text-slate-300">
          Sa vraie force : il garde la cohérence d'un visage ou d'un objet
          sur plusieurs générations — utile pour retoucher une vraie photo
          sans la dénaturer, contrairement à beaucoup de générateurs qui
          repartent de zéro à chaque fois.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">
          Comment utiliser Nano Banana gratuitement
        </h2>
        <p className="mb-6 text-slate-300">
          Deux façons d'y accéder sans payer :
        </p>
        <ol className="mb-6 list-decimal space-y-3 pl-5 text-slate-300">
          <li>
            <strong className="text-white">L'app Gemini</strong> (web ou
            mobile) — connecte-toi et ouvre les outils image. Compte tenu des
            quotas gratuits observés au moment de la rédaction (~20 images
            Nano Banana 2 et 2 images Pro par jour), c'est largement
            suffisant pour un usage personnel occasionnel.
          </li>
          <li>
            <strong className="text-white">Google AI Studio</strong> (
            <Link
              href="https://aistudio.google.com/models/nano-banana"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-300 hover:underline"
            >
              aistudio.google.com
            </Link>
            ) — pensé pour les développeurs, mais accessible à tous : un tier
            gratuit avec plusieurs dizaines de requêtes par jour, jusqu'à 2K
            de résolution, sans filigrane.
          </li>
        </ol>

        <div className="glass-card p-6">
          <p className="text-sm text-slate-300">
            ⚠️ Ces quotas évoluent régulièrement — vérifie les chiffres
            actuels directement sur la page du produit avant de construire un
            usage professionnel dessus.
          </p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">
          Les meilleurs prompts Nano Banana par usage
        </h2>

        <h3 className="mb-3 text-xl font-semibold text-white">
          Photo professionnelle pour LinkedIn
        </h3>
        <p className="mb-4 text-slate-300">
          C'est le cas d'usage le plus recherché. Pars d'une photo existante
          (même prise au téléphone) et transforme-la :
        </p>
        <div className="glass-card mb-8 p-6">
          <pre className="whitespace-pre-wrap rounded-xl bg-black/30 p-5 font-sans text-slate-200 text-sm">
            {PROMPT_LINKEDIN}
          </pre>
        </div>

        <h3 className="mb-3 text-xl font-semibold text-white">
          Photo pour CV
        </h3>
        <div className="glass-card mb-8 p-6">
          <pre className="whitespace-pre-wrap rounded-xl bg-black/30 p-5 font-sans text-slate-200 text-sm">
            {PROMPT_CV}
          </pre>
        </div>

        <h3 className="mb-3 text-xl font-semibold text-white">
          Logo simple
        </h3>
        <div className="glass-card mb-8 p-6">
          <pre className="whitespace-pre-wrap rounded-xl bg-black/30 p-5 font-sans text-slate-200 text-sm">
            {PROMPT_LOGO}
          </pre>
        </div>

        <h3 className="mb-3 text-xl font-semibold text-white">
          Retouche et amélioration d'image
        </h3>
        <p className="mb-4 text-slate-300">
          Un des usages les plus demandés dans les recherches : améliorer
          une photo existante plutôt que d'en créer une nouvelle.
        </p>
        <div className="glass-card mb-4 p-6">
          <pre className="whitespace-pre-wrap rounded-xl bg-black/30 p-5 font-sans text-slate-200 text-sm">
            {PROMPT_RETOUCHE_QUALITE}
          </pre>
        </div>
        <div className="glass-card p-6">
          <pre className="whitespace-pre-wrap rounded-xl bg-black/30 p-5 font-sans text-slate-200 text-sm">
            {PROMPT_RETOUCHE_EXTENSION}
          </pre>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">
          Le format JSON : pour un contrôle plus précis
        </h2>
        <p className="mb-6 text-slate-300">
          Pour les usages avancés (ou via l'API), Nano Banana accepte aussi
          un prompt structuré en JSON plutôt qu'en texte libre — utile quand
          tu veux fixer précisément plusieurs paramètres (style, éclairage,
          cadrage) sans dépendre de la façon dont l'IA interprète une
          phrase :
        </p>
        <div className="glass-card mb-6 p-6">
          <pre className="whitespace-pre-wrap rounded-xl bg-black/30 p-5 font-sans text-slate-200 text-sm">
            {JSON_EXAMPLE}
          </pre>
        </div>
        <p className="text-slate-300">
          C'est optionnel : le format texte libre présenté plus haut
          fonctionne très bien pour un usage courant — le JSON devient utile
          surtout si tu automatises la génération de plusieurs images avec
          des variations contrôlées.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">
          Pour aller plus loin
        </h2>
        <p className="text-slate-300">
          Retrouve d'autres outils IA de génération d'images, testés et
          classés, dans la{" "}
          <Link
            href="/?category=image#annuaire"
            className="text-brand-300 hover:underline"
          >
            catégorie Génération d'images
          </Link>{" "}
          de PromptForums.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">Conclusion</h2>
        <p className="text-slate-300">
          Nano Banana s'est imposé en quelques mois comme l'un des outils de
          génération et retouche d'images les plus utilisés — mais
          l'essentiel de la documentation reste en anglais. Les prompts
          ci-dessus couvrent les usages les plus demandés (photo pro, CV,
          logo, retouche) : copie-les, adapte les détails entre crochets à ta
          situation, et garde toujours une consigne explicite pour préserver
          les traits d'un visage quand tu retouches une vraie photo plutôt
          que d'en générer une nouvelle.
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
          <Link href="/?category=image#annuaire" className="btn-primary">
            Explorer les outils de génération d'images
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
