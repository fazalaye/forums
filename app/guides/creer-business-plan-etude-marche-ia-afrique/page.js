import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import CopyPromptButton from "@/components/CopyPromptButton";
import { faqSchema, breadcrumbSchema, SITE_URL } from "@/lib/seo";

export const metadata = {
  title: "Créer un business plan avec l'IA en Afrique (guide + prompts gratuits)",
  description:
    "Comment utiliser ChatGPT et l'IA gratuite pour créer un business plan, une étude de marché locale et une stratégie commerciale en Afrique. Prompts prêts à copier.",
  alternates: {
    canonical: `${SITE_URL}/guides/creer-business-plan-etude-marche-ia-afrique`,
  },
};

const PROMPT_BUSINESS_PLAN =
  "Tu es un consultant en création d'entreprise spécialisé dans le marché africain. Aide-moi à rédiger un business plan complet pour mon projet : [DÉCRIS TON IDÉE DE BUSINESS]. Le document doit inclure : résumé exécutif, description du produit/service, analyse du marché local (taille, concurrence, clientèle cible), stratégie commerciale, plan opérationnel adapté aux réalités locales (accès au financement, secteur informel vs formel, logistique), prévisionnel financier simple sur 12 mois en FCFA, et les risques principaux avec des solutions concrètes. Pose-moi d'abord 5 questions pour cerner mon projet, puis rédige le business plan section par section.";

const PROMPT_ETUDE_MARCHE =
  "Tu es un analyste de marché spécialisé en Afrique de l'Ouest. Je veux valider cette idée : [DÉCRIS TON IDÉE/PRODUIT]. Aide-moi à structurer une étude de marché locale : qui sont mes clients potentiels dans ma ville/région (âge, pouvoir d'achat, habitudes d'achat), qui sont mes concurrents directs et indirects (formels et informels), quel est le prix psychologique acceptable en FCFA, quels canaux de distribution et de vente fonctionnent le mieux ici (marché physique, WhatsApp, réseaux sociaux, boutique), et quels obstacles culturels ou logistiques dois-je anticiper. Donne-moi une méthode simple pour collecter ces informations avec un budget limité (enquêtes informelles, observation terrain, réseaux sociaux).";

const PROMPT_STRATEGIE_COMMERCIALE =
  "Tu es un directeur commercial expérimenté sur le marché africain. Voici mon activité : [DÉCRIS TON ACTIVITÉ]. Construis-moi une stratégie commerciale sur 90 jours pour augmenter mes ventes, adaptée à mon contexte (budget limité, vente via WhatsApp/réseaux sociaux/boutique physique). Structure ta réponse en : objectifs chiffrés réalistes, canaux de vente prioritaires, actions concrètes semaine par semaine, argumentaire de vente adapté à ma clientèle, et 3 indicateurs simples à suivre pour savoir si ça fonctionne.";

const FAQ = [
  {
    q: "Peut-on créer un business plan gratuitement avec l'IA ?",
    a: "Oui. ChatGPT, Claude ou Mistral (Le Chat) permettent de générer un business plan complet gratuitement, en décrivant votre idée avec des instructions précises comme celles de ce guide.",
  },
  {
    q: "L'IA connaît-elle vraiment le marché africain ?",
    a: "L'IA généraliste connaît les grandes tendances mais pas les chiffres locaux précis. Elle est surtout utile pour structurer votre réflexion et vos documents — vérifiez toujours les statistiques avec des sources locales réelles.",
  },
  {
    q: "Quel outil IA choisir pour un business plan ?",
    a: "Claude et ChatGPT sont très adaptés à la rédaction longue et structurée. Le Chat de Mistral est une bonne option gratuite, sans carte bancaire et souveraine, disponible en français.",
  },
  {
    q: "Combien de temps faut-il pour obtenir un business plan avec l'IA ?",
    a: "Quelques échanges suffisent pour un premier jet complet. Prévoyez ensuite du temps pour vérifier et adapter les informations à votre contexte réel avant de le présenter à un partenaire ou une banque.",
  },
];

const BREADCRUMB_ITEMS = [
  { name: "Accueil", url: SITE_URL },
  { name: "Guides", url: `${SITE_URL}/guides` },
  {
    name: "Créer un business plan avec l'IA en Afrique (guide + prompts gratuits)",
    url: `${SITE_URL}/guides/creer-business-plan-etude-marche-ia-afrique`,
  },
];

export default function GuidePage() {
  return (
    <article className="mx-auto max-w-3xl">
      <JsonLd data={faqSchema(FAQ)} />
      <JsonLd data={breadcrumbSchema(BREADCRUMB_ITEMS)} />

      <Breadcrumbs items={BREADCRUMB_ITEMS} />
      <p className="mb-3 text-sm text-slate-400">Guide · Business & Afrique</p>
      <h1 className="mb-4 text-4xl font-extrabold leading-tight">
        Créer un business plan avec l'IA en Afrique
      </h1>
      <p className="mb-6 text-lg text-slate-300">
        Rédiger un business plan a longtemps voulu dire payer un consultant
        ou passer des semaines à assembler des documents. Aujourd'hui, un
        outil IA gratuit comme ChatGPT, Claude ou Mistral peut produire un
        premier jet solide en quelques minutes — à condition de savoir quoi
        lui demander.
      </p>
      <p className="mb-6 text-slate-300">
        Ce guide s'adresse aux entrepreneurs du Sénégal et d'Afrique de
        l'Ouest : on parle en FCFA, on tient compte du secteur informel et
        d'un accès au financement souvent limité. Vous trouverez ci-dessous
        3 prompts prêts à copier qui couvrent tout le processus : business
        plan, étude de marché, puis stratégie commerciale.
      </p>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">
          Pourquoi utiliser l'IA pour préparer son business plan
        </h2>
        <p className="mb-2 text-slate-300">
          Le principal avantage, c'est que ça ne coûte rien : pas besoin de
          consultant, l'outil comprend et répond en français, et vous pouvez
          reformuler et relancer autant de fois que nécessaire jusqu'à
          obtenir un document qui vous convient.
        </p>
        <p className="text-slate-300">
          Une réserve honnête toutefois : l'IA ne connaît pas les chiffres
          exacts de votre marché local. Elle sert à structurer et à rédiger,
          pas à remplacer une vraie vérification des données — croisez
          toujours ses estimations avec des sources locales réelles avant de
          les présenter à un partenaire ou une banque.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">
          1. Rédige ton business plan complet
        </h2>
        <p className="mb-4 text-slate-300">
          Décris ton idée, et l'IA te pose d'abord les bonnes questions avant
          de rédiger le document section par section.
        </p>
        <div className="glass-card p-6">
          <div className="mb-3 flex justify-end">
            <CopyPromptButton text={PROMPT_BUSINESS_PLAN} />
          </div>
          <pre className="whitespace-pre-wrap rounded-xl bg-black/30 p-5 font-sans text-slate-200">
            {PROMPT_BUSINESS_PLAN}
          </pre>
        </div>
        <p className="mb-4 mt-6 text-sm text-slate-400">
          Voici un exemple réel, envoyé depuis un téléphone :
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <figure>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/guide-assets/business-plan-prompt-rempli.jpg"
              alt="Exemple réel : le prompt business plan rempli et envoyé dans ChatGPT"
              className="w-full rounded-2xl border border-white/10"
            />
            <figcaption className="mt-2 text-center text-sm text-slate-400">
              Le prompt rempli avec un exemple concret (un pressing)
            </figcaption>
          </figure>
          <figure>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/guide-assets/business-plan-reponse.jpg"
              alt="Exemple réel : ChatGPT pose ses questions de cadrage avant de rédiger le business plan"
              className="w-full rounded-2xl border border-white/10"
            />
            <figcaption className="mt-2 text-center text-sm text-slate-400">
              La réponse de ChatGPT, avec les questions de cadrage avant de générer le document
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">
          2. Valide ton idée avec une étude de marché locale
        </h2>
        <p className="mb-4 text-slate-300">
          Avant de te lancer, ce prompt t'aide à vérifier que ton idée
          correspond vraiment à un besoin, une clientèle et un prix qui
          existent dans ta zone.
        </p>
        <div className="glass-card p-6">
          <div className="mb-3 flex justify-end">
            <CopyPromptButton text={PROMPT_ETUDE_MARCHE} />
          </div>
          <pre className="whitespace-pre-wrap rounded-xl bg-black/30 p-5 font-sans text-slate-200">
            {PROMPT_ETUDE_MARCHE}
          </pre>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">
          3. Construis ta stratégie commerciale sur 90 jours
        </h2>
        <p className="mb-4 text-slate-300">
          Une fois le business plan et l'étude de marché en main, ce prompt
          transforme tout ça en plan d'action concret pour les trois
          prochains mois.
        </p>
        <div className="glass-card p-6">
          <div className="mb-3 flex justify-end">
            <CopyPromptButton text={PROMPT_STRATEGIE_COMMERCIALE} />
          </div>
          <pre className="whitespace-pre-wrap rounded-xl bg-black/30 p-5 font-sans text-slate-200">
            {PROMPT_STRATEGIE_COMMERCIALE}
          </pre>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">
          Conseils pour un bon résultat
        </h2>
        <ul className="flex flex-col gap-3 text-slate-300">
          <li>
            <strong className="text-white">Itère par petites retouches.</strong>{" "}
            Plutôt que d'attendre un seul prompt parfait, demande des
            ajustements ciblés sur ce qui ne va pas plutôt que de tout
            recommencer.
          </li>
          <li>
            <strong className="text-white">
              Vérifie toujours les chiffres.
            </strong>{" "}
            Les statistiques et estimations données par l'IA doivent être
            recoupées avec des sources locales réelles avant d'être
            présentées à un partenaire ou une banque.
          </li>
          <li>
            <strong className="text-white">
              Adapte le vocabulaire et les montants.
            </strong>{" "}
            Précise le FCFA et les réalités de ton marché à chaque étape pour
            éviter des réponses trop génériques.
          </li>
          <li>
            <strong className="text-white">
              Garde une trace de tes meilleurs prompts.
            </strong>{" "}
            Une fois qu'une formulation te donne un bon résultat, sauvegarde-la
            pour la réutiliser à ta prochaine étape.
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
          Continuez avec les autres outils et prompts IA pensés pour
          entreprendre en Afrique.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/category/business" className="btn-primary">
            Voir les outils IA Business
          </Link>
          <Link href="/prompts?category=business" className="btn-secondary">
            Voir tous les prompts Business
          </Link>
        </div>
      </div>
    </article>
  );
}
