import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import {
  faqSchema,
  breadcrumbSchema,
  articleSchema,
  SITE_URL,
  socialMetadata,
} from "@/lib/seo";

// SEO (Search Console 2026-T3) — recommandation n°3 : capitaliser sur la niche
// géographique. La Côte d'Ivoire apparaît déjà dans nos données (position ~7,9),
// ce guide étend le même angle « formation IA locale » à ce marché.
const TITLE =
  "Se Former à l'IA en Côte d'Ivoire 2026 : Formations Gratuites & Écoles | Guide Complet";
const DESCRIPTION =
  "Formations IA en Côte d'Ivoire : écoles et universités d'Abidjan, programmes publics, MOOC gratuits et parcours pour débuter sans budget. Débouchés, salaires et étapes concrètes — guide complet 2026.";
const URL = `${SITE_URL}/guides/se-former-ia-cote-divoire`;

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "formation ia côte d'ivoire",
    "école intelligence artificielle Abidjan",
    "formation ia gratuite CI",
    "apprendre l'IA Cocody",
  ],
  authors: [{ name: "PromptForums" }],
  alternates: {
    canonical: URL,
  },
  ...socialMetadata({ title: TITLE, description: DESCRIPTION, url: URL }),
};

const FAQ = [
  {
    q: "Existe-t-il des formations gratuites en IA en Côte d'Ivoire ?",
    a: "Oui. Tu peux démarrer gratuitement avec des MOOC comme Elements of AI (traduit en français), les cours introductifs de Google (Digital Skills / Google for Education) et DeepLearning.AI, puis mettre en pratique avec les outils IA gratuits accessibles depuis un smartphone. Les structures privées et partenaires (Latrille Hub, Orange Digital Center) proposent aussi régulièrement des ateliers gratuits ou subventionnés — vérifie leurs agendas, car les sessions tournent vite.",
  },
  {
    q: "Quelle école choisir pour apprendre l'IA à Abidjan ?",
    a: "Trois profils de parcours : (1) la voie universitaire — les filières informatique/data de l'Université Félix Houphouët-Boigny (Cocody) et des grandes écoles comme l'ESATIC ou les écoles d'ingénieurs privées, avec des masters orientés data science ; (2) les bootcamps et hubs — Latrille Technologies, Startup Academy ou les cursus courts des centres numériques ; (3) l'autodidaxie encadrée par des MOOC certifiants. Le bon choix dépend de ton budget, de ton niveau actuel et du poste visé : privilégie une certification reconnue + un portfolio de projets concrets.",
  },
  {
    q: "Peut-on travailler dans l'IA en Côte d'Ivoire sans diplôme spécialisé ?",
    a: "Pour les métiers d'usage de l'IA (automatisation, prompting, analyse de données appliquée, marketing digital assisté par IA), oui : les employeurs regardent d'abord les compétences démontrables. Un portfolio de 3-5 projets réels (étude de marché automatisée, tableau de bord, chatbot métier) compète souvent un diplôme. Pour les postes d'ingénieur ML ou de chercheur, une formation solide en mathématiques/informatique reste attendue.",
  },
  {
    q: "Quels sont les débouchés et salaires dans l'IA en Côte d'Ivoire ?",
    a: "La demande vient des télécoms, de la banque et de la fintech (Wave, Moov, Orange Money…), de l'agritech, de la fonction publique numérique et des startups incubées dans les hubs d'Abidjan. Les salaires varient fortement selon le profil : les chiffres circulant en ligne sont rarement audités, donc base-toi sur les offres d'emploi réelles (Emploi.ci, LinkedIn) plutôt que sur les moyennes affichées par les écoles.",
  },
  {
    q: "Faut-il parler anglais pour se former à l'IA ?",
    a: "Ce n'est pas obligatoire pour démarrer : une partie croissante des ressources est disponible en français (cours, chaînes YouTube, communautés). Mais la documentation technique de référence reste en anglais — viser un niveau intermédiaire en quelques mois élargit beaucoup tes options, notamment pour l'emploi à distance.",
  },
];

const BREADCRUMB_ITEMS = [
  { name: "Accueil", url: SITE_URL },
  { name: "Guides", url: `${SITE_URL}/guides` },
  {
    name: "Se former à l'IA en Côte d'Ivoire",
    url: URL,
  },
];

export default function GuidePage() {
  return (
    <article className="mx-auto max-w-3xl">
      <JsonLd data={faqSchema(FAQ)} />
      <JsonLd data={breadcrumbSchema(BREADCRUMB_ITEMS)} />
      <JsonLd
        data={articleSchema({
          title: TITLE,
          description: DESCRIPTION,
          url: URL,
          datePublished: "2026-10-01",
          dateModified: "2026-10-01",
        })}
      />

      <Breadcrumbs items={BREADCRUMB_ITEMS} />
      <p className="mb-3 text-sm text-slate-400">Guide · Emploi & Carrière</p>
      <h1 className="mb-4 text-4xl font-extrabold leading-tight">
        Se former à l'IA en Côte d'Ivoire : le guide complet
      </h1>
      <p className="mb-6 text-lg text-slate-300">
        Abidjan est l'un des écosystèmes numériques les plus dynamiques d'Afrique
        francophone : fintech, télécoms, e-commerce, startups incubées dans les
        hubs… Et partout, les entreprises cherchent des profils capables
        d'utiliser l'intelligence artificielle — sans la trouver.
      </p>
      <p className="mb-6 text-slate-300">
        Ce guide fait le tour des voies de formation disponibles en Côte
        d'Ivoire : universités et grandes écoles, bootcamps et hubs numériques,
        et surtout les ressources 100 % gratuites pour débuter dès aujourd'hui,
        même sans budget. Tu y trouveras aussi un plan d'action concret et les
        débouchés réels du marché ivoirien.
      </p>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">
          Pourquoi se former à l'IA en Côte d'Ivoire maintenant
        </h2>
        <ul className="flex flex-col gap-3 text-slate-300">
          <li>
            <strong className="text-white">
              Une économie numérique qui accélère.
            </strong>{" "}
            Mobile money, fintech, plateformes logistiques : les acteurs
            ivoiriens produisent d'énormes volumes de données et commencent à
            peine à les exploiter avec l'IA. Les premiers profils compétents
            seront très demandés.
          </li>
          <li>
            <strong className="text-white">
              Des initiatives publiques et privées structurantes.
            </strong>{" "}
            La stratégie nationale numérique, les hubs (Latrille, Orange Digital
            Center, incubateurs et académies partenaires) lancent régulièrement
            des cohortes — certaines partiellement financées. Le contexte
            régional est détaillé dans notre guide{" "}
            <Link
              href="/guides/strategies-nationales-ia-afrique-ouest"
              className="text-brand-300 hover:underline"
            >
              stratégies nationales d'IA en Afrique de l'Ouest
            </Link>
            .
          </li>
          <li>
            <strong className="text-white">On peut démarrer gratuit.</strong>{" "}
            Un smartphone, une connexion et de la régularité suffisent pour les
            premières étapes. Les outils IA gratuits en français sont listés dans
            notre guide{" "}
            <Link
              href="/guides/outils-ia-gratuits-francais-afrique"
              className="text-brand-300 hover:underline"
            >
              outils IA gratuits pour l'Afrique
            </Link>
            .
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">
          Les voies de formation : universités, écoles, bootcamps, en ligne
        </h2>

        <h3 className="mb-3 mt-6 text-xl font-bold text-white">
          1. La voie universitaire et les grandes écoles
        </h3>
        <p className="mb-4 text-slate-300">
          Les filières informatique, mathématiques et data science de
          l'Université Félix Houphouët-Boigny (Cocody), de l'ESATIC et des écoles
          d'ingénieurs privées offrent les bases solides (programmation,
          statistiques, machine learning). C'est la voie la plus longue et la
          plus coûteuse, mais pertinente si tu vises un poste d'ingénieur IA ou
          de data scientist. Vérifie toujours le programme réel, les
          intervenants et les taux d'insertion communiqués par l'école — chiffres
          à croiser avec des anciens élèves.
        </p>

        <h3 className="mb-3 mt-6 text-xl font-bold text-white">
          2. Bootcamps, hubs et centres numériques
        </h3>
        <p className="mb-4 text-slate-300">
          Formats courts (quelques semaines à quelques mois) orientés pratique :
          développement web puis data, automatisation, outils no-code + IA. Les
          hubs abidjanais (Latrille Technologies, Orange Digital Center,
          incubateurs et académies partenaires) lancent régulièrement des
          cohortes — certaines partiellement financées. Avantage : portfolio et
          réseau. Inconvénient : qualité variable, compare avant de payer.
        </p>

        <h3 className="mb-3 mt-6 text-xl font-bold text-white">
          3. L'autodidaxie guidée (gratuite) — notre recommandation pour débuter
        </h3>
        <p className="mb-4 text-slate-300">
          Si ton objectif est d'<em>utiliser</em> l'IA dans un métier (marketing,
          gestion, entrepreneuriat, support client) plutôt que de la construire,
          une feuille de route en ligne bien suivie sur 2-3 mois suffit souvent :
        </p>
        <ol className="flex list-decimal flex-col gap-3 pl-5 text-slate-300">
          <li>
            <strong className="text-white">Semaines 1-2 — Comprendre.</strong>{" "}
            Les bases conceptuelles sans maths lourdes : Elements of AI (en
            français), notre{" "}
            <Link
              href="/guides/definition-intelligence-artificielle"
              className="text-brand-300 hover:underline"
            >
              définition simple de l'IA
            </Link>
            .
          </li>
          <li>
            <strong className="text-white">Semaines 3-6 — Pratiquer.</strong>{" "}
            ChatGPT/Claude au quotidien : rédaction, analyse, automatisation.
            Travaille avec les{" "}
            <Link
              href="/guides/meilleurs-prompts-chatgpt-2026"
              className="text-brand-300 hover:underline"
            >
              meilleurs prompts ChatGPT
            </Link>{" "}
            et les{" "}
            <Link
              href="/guides/meilleurs-prompts-claude"
              className="text-brand-300 hover:underline"
            >
              prompts Claude prêts à copier
            </Link>
            .
          </li>
          <li>
            <strong className="text-white">
              Semaines 7-10 — Professionnaliser.
            </strong>{" "}
            Applique à un contexte ivoirien : business plan assisté par IA, étude
            de marché locale, CV et lettre de motivation — nos guides dédiés{" "}
            <Link
              href="/guides/creer-business-plan-etude-marche-ia-afrique"
              className="text-brand-300 hover:underline"
            >
              business plan avec l'IA
            </Link>{" "}
            et{" "}
            <Link
              href="/guides/cv-lettre-motivation-entretien-ia-afrique"
              className="text-brand-300 hover:underline"
            >
              CV & entretien avec l'IA
            </Link>{" "}
            te donnent les prompts exacts.
          </li>
          <li>
            <strong className="text-white">Semaines 11-12 — Prouver.</strong>{" "}
            Publie 3 mini-projets (posts, page Notion, vidéo courte) qui montrent
            ce que tu as automatisé ou créé avec l'IA. C'est ton portfolio.
          </li>
        </ol>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">
          Combien ça coûte (et les pièges à éviter)
        </h2>
        <p className="mb-4 text-slate-300">
          Le premier niveau — comprendre et utiliser l'IA — peut coûter 0 FCFA :
          les MOOC cités, les outils gratuits et la communauté suffisent. Les
          formations payantes (bootcamps, écoles) vont de quelques centaines de
          milliers à plusieurs millions de FCFA. Avant de signer :
        </p>
        <ul className="flex list-disc flex-col gap-2 pl-5 text-slate-300">
          <li>Demande à parler à 2-3 anciens élèves, pas seulement à l'école.</li>
          <li>Méfie-toi des promesses « garanti emploi » ou « salaire à vie ».</li>
          <li>Vérifie si la certification est reconnue hors de Côte d'Ivoire.</li>
          <li>Calcule le coût par heure de pratique réelle, pas par promesse.</li>
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

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">
          Guides liés — même démarche, autres pays
        </h2>
        <ul className="flex list-disc flex-col gap-2 pl-5 text-brand-300">
          <li>
            <Link href="/guides/se-former-ia-senegal" className="hover:underline">
              Se former à l'IA au Sénégal : formations et écoles (2026)
            </Link>
          </li>
          <li>
            <Link href="/guides/se-former-ia-cameroun" className="hover:underline">
              Se former à l'IA au Cameroun : formations et écoles (2026)
            </Link>
          </li>
          <li>
            <Link
              href="/guides/strategies-nationales-ia-afrique-ouest"
              className="hover:underline"
            >
              IA en Afrique de l'Ouest : les stratégies nationales en 2026
            </Link>
          </li>
          <li>
            <Link
              href="/guides/outils-ia-gratuits-francais-afrique"
              className="hover:underline"
            >
              Outils IA gratuits en français pour l'Afrique (2026)
            </Link>
          </li>
        </ul>
      </section>

      <div className="glass-card flex flex-col items-start gap-4 p-6">
        <p className="text-slate-200">
          Ce guide est un point de départ. Sur{" "}
          <strong className="text-white">PromptForums</strong>, retrouvez chaque
          outil testé, noté et comparé — mis à jour chaque semaine — et une
          bibliothèque de prompts prêts à copier.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/?category=emploi#annuaire" className="btn-primary">
            Explorer les outils IA
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
