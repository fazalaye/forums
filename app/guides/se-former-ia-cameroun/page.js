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
// géographique. Le Cameroun apparaît déjà dans nos données avec de bonnes
// positions ; ce guide étend le même angle « formation IA locale ».
const TITLE =
  "Se Former à l'IA au Cameroun 2026 : Formations Gratuites & Écoles | Guide Complet";
const DESCRIPTION =
  "Formations IA au Cameroun : écoles de Yaoundé et Douala, universités, initiatives publiques, cours gratuits en ligne et méthode pour se lancer sans budget. Débouchés et salaires — guide complet 2026.";
const URL = `${SITE_URL}/guides/se-former-ia-cameroun`;

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "formation ia cameroun",
    "école intelligence artificielle Yaoundé",
    "formation ia gratuite Douala",
    "apprendre l'IA Cameroun",
  ],
  authors: [{ name: "PromptForums" }],
  alternates: {
    canonical: URL,
  },
  ...socialMetadata({ title: TITLE, description: DESCRIPTION, url: URL }),
};

const FAQ = [
  {
    q: "Existe-t-il des formations gratuites en IA au Cameroun ?",
    a: "Oui. Les MOOC internationaux accessibles depuis le Cameroun — Elements of AI (en français), les parcours Google Digital Skills, DeepLearning.AI ou Courser en mode audit — couvrent la gratuité complète du niveau débutant à intermédiaire. À Yaoundé et Douala, certains hubs numériques et programmes soutenus par GIZ, la Coopération française ou des opérateurs télécom (Orange Digital Center) proposent des ateliers gratuits ou subventionnés par cohorte. Surveille leurs réseaux sociaux : les appels à candidatures sont courts.",
  },
  {
    q: "Quelles écoles ou universités forment à l'IA au Cameroun ?",
    a: "Côté public : les filières informatique et mathématiques des universités de Yaoundé I et II, de Douala et de Buea, avec des masters orientés data science / génie informatique dans certaines. Côté privé : les écoles d'ingénieurs et bootcamps tech (Ecole 241 et assimilés, centres de formation numérique à Douala et Yaoundé). Vérifie systématiquement le programme, les intervenants et les témoignages d'anciens avant tout engagement financier — la qualité varie beaucoup d'un acteur à l'autre.",
  },
  {
    q: "Le Cameroun est-il bilingue anglais/français : faut-il l'anglais pour l'IA ?",
    a: "C'est un atout majeur : une partie des meilleures ressources et offres (y compris en freelance international) sont en anglais. Si tu es francophone, viser un niveau technique intermédiaire en anglais en 6-12 mois multiplie tes débouchés. Les zones anglophones (Douala, Bamenda, Buea) partent déjà avec cet avantage.",
  },
  {
    q: "Quels débouchés concrets pour les compétences IA au Cameroun ?",
    a: "Banque et fintech (mobile money, scoring crédit), télécoms, agritech, e-commerce, administration publique (digitalisation), et le freelance international à distance. Comme ailleurs, les postes purs « data scientist » restent rares : la demande la plus immédiate concerne les profils qui savent automatiser des tâches, analyser des données métier et intégrer les outils IA dans des process existants.",
  },
  {
    q: "Peut-on apprendre l'IA depuis le Cameroun avec seulement un smartphone ?",
    a: "Pour la phase « utiliser l'IA » (prompting, automatisation no-code, création de contenu), oui — les assistants IA sur mobile et WhatsApp Business suffisent pour s'exercer. Pour la phase « construire » (coder des modèles), un ordinateur portable devient nécessaire ; des espaces de coworking abordables à Douala et Yaoundé permettent de louer à la journée.",
  },
];

const BREADCRUMB_ITEMS = [
  { name: "Accueil", url: SITE_URL },
  { name: "Guides", url: `${SITE_URL}/guides` },
  {
    name: "Se former à l'IA au Cameroun",
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
        Se former à l'IA au Cameroun : le guide complet
      </h1>
      <p className="mb-6 text-lg text-slate-300">
        Avec Yaoundé et Douala comme pôles technologiques régionaux, une économie
        digitalisée en pleine mutation et une communauté tech parmi les plus
        actives d'Afrique centrale, le Cameroun manque encore de talents capables
        d'exploiter l'intelligence artificielle. C'est exactement ce qui rend la
        formation intéressante aujourd'hui.
      </p>
      <p className="mb-6 text-slate-300">
        Ce guide passe en revue les universités, écoles privées, bootcamps, hubs
        et ressources entièrement gratuites accessibles depuis le Cameroun, avec
        une feuille de route concrète pour débuter sans budget et les débouchés
        réels du marché.
      </p>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">
          Pourquoi se former à l'IA au Cameroun maintenant
        </h2>
        <ul className="flex flex-col gap-3 text-slate-300">
          <li>
            <strong className="text-white">
              Une transformation numérique en cours.
            </strong>{" "}
            Mobile money, e-commerce, digitalisation des administrations : les
            volumes de données explosent et les entreprises cherchent les
            premiers profils capables de les exploiter.
          </li>
          <li>
            <strong className="text-white">Un écosystème de hubs actif.</strong>{" "}
            Coworkings, incubateurs et programmes internationaux (GIZ, Orange
            Digital Center, initiatives universitaires) à Yaoundé et Douala
            forment des cohortes régulières — souvent partiellement financées.
          </li>
          <li>
            <strong className="text-white">Le bilinguisme comme accélérateur.</strong>{" "}
            Français + anglais = accès direct aux meilleures ressources et au
            freelance international. Notre{" "}
            <Link
              href="/guides/outils-ia-gratuits-francais-afrique"
              className="text-brand-300 hover:underline"
            >
              guide des outils IA gratuits
            </Link>{" "}
            couvre les deux langues.
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">
          Les voies de formation : universités, écoles, bootcamps, en ligne
        </h2>

        <h3 className="mb-3 mt-6 text-xl font-bold text-white">
          1. La voie universitaire
        </h3>
        <p className="mb-4 text-slate-300">
          Les départements informatique, mathématiques et génie logiciel des
          universités de Yaoundé I/II, Douala et Buea posent les bases
          (algorithmique, statistiques, programmation), avec quelques cursus
          orientés data science au niveau master. Voie longue et exigeante, elle
          reste pertinente pour les postes d'ingénieur ML. Renseigne-toi sur les
          options réellement proposées chaque année : les programmes évoluent
          plus vite que les brochures.
        </p>

        <h3 className="mb-3 mt-6 text-xl font-bold text-white">
          2. Écoles privées, bootcamps et hubs numériques
        </h3>
        <p className="mb-4 text-slate-300">
          À Douala et Yaoundé, les écoles tech privées et les bootcamps proposent
          des parcours courts (data, développement, automatisation). Les hubs et
          incubateurs organisent des sessions parfois gratuites, financées par
          des programmes de coopération. Points de contrôle avant de payer :
          heures de pratique réelle, matériel pédagogique, réseau d'alumni, et
          surtout — parle à d'anciens participants.
        </p>

        <h3 className="mb-3 mt-6 text-xl font-bold text-white">
          3. L'autodidaxie guidée (gratuite) — notre recommandation pour débuter
        </h3>
        <p className="mb-4 text-slate-300">
          Pour la grande majorité des actifs camerounais — entrepreneurs,
          employés, étudiants — l'objectif n'est pas de créer des modèles mais
          d'utiliser l'IA au travail. Dans ce cas, une feuille de route gratuite
          sur 2-3 mois suffit :
        </p>
        <ol className="flex list-decimal flex-col gap-3 pl-5 text-slate-300">
          <li>
            <strong className="text-white">Semaines 1-2 — Comprendre.</strong>{" "}
            Elements of AI (français) + notre{" "}
            <Link
              href="/guides/definition-intelligence-artificielle"
              className="text-brand-300 hover:underline"
            >
              définition simple de l'IA
            </Link>{" "}
            pour poser les bases sans jargon.
          </li>
          <li>
            <strong className="text-white">Semaines 3-6 — Pratiquer.</strong>{" "}
            Utilise ChatGPT et Claude chaque jour sur de vrais problèmes :{" "}
            <Link
              href="/guides/meilleurs-prompts-chatgpt-2026"
              className="text-brand-300 hover:underline"
            >
              prompts ChatGPT
            </Link>{" "}
            et{" "}
            <Link
              href="/guides/meilleurs-prompts-claude"
              className="text-brand-300 hover:underline"
            >
              prompts Claude prêts à copier
            </Link>
            .
          </li>
          <li>
            <strong className="text-white">Semaines 7-10 — Appliquer.</strong>{" "}
            Contexte camerounais :{" "}
            <Link
              href="/guides/creer-business-plan-etude-marche-ia-afrique"
              className="text-brand-300 hover:underline"
            >
              business plan et étude de marché avec l'IA
            </Link>
            , rédaction pro,{" "}
            <Link
              href="/guides/creer-vendre-ebook-ia"
              className="text-brand-300 hover:underline"
            >
              création d'ebook monétisable
            </Link>
            .
          </li>
          <li>
            <strong className="text-white">Semaines 11-12 — Prouver.</strong>{" "}
            Publie 3 mini-projets documentés (avant/après, temps gagné). C'est
            ton portfolio, bien plus convaincant qu'un certificat seul.
          </li>
        </ol>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">
          Combien ça coûte (et les pièges à éviter)
        </h2>
        <p className="mb-4 text-slate-300">
          Niveau 1 (utiliser l'IA) : 0 FCFA est possible. Les formations payantes
          vont de quelques dizaines de milliers à plusieurs millions de FCFA. Avant
          de t'engager :
        </p>
        <ul className="flex list-disc flex-col gap-2 pl-5 text-slate-300">
          <li>Exige un programme détaillé semaine par semaine, pas des slogans.</li>
          <li>Contacte des anciens élèves hors des témoignages choisis par l'école.</li>
          <li>Méfie-toi des « certifications » sans examen ni référence connue.</li>
          <li>Compare le coût au nombre d'heures de pratique sur machine.</li>
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
            <Link
              href="/guides/se-former-ia-cote-divoire"
              className="hover:underline"
            >
              Se former à l'IA en Côte d'Ivoire : formations et écoles (2026)
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
              href="/guides/cv-lettre-motivation-entretien-ia-afrique"
              className="hover:underline"
            >
              CV, lettre de motivation, entretien : décroche un emploi avec l'IA
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
