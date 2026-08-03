import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import { faqSchema, breadcrumbSchema, articleSchema, SITE_URL } from "@/lib/seo";

export const metadata = {
  title: "Se former à l'IA au Sénégal : le guide complet 2026",
  description:
    "Formations, écoles, masters et ressources gratuites pour se former à l'intelligence artificielle au Sénégal. Débouchés, salaires et comment débuter sans budget.",
  alternates: {
    canonical: `${SITE_URL}/guides/se-former-ia-senegal`,
  },
};

const FAQ = [
  {
    q: "Quelle formation en IA choisir quand on débute au Sénégal ?",
    a: "Commence par une initiation gratuite en ligne (comme Elements of AI, disponible en français) pour valider ton intérêt, puis oriente-toi vers un bootcamp ou une plateforme comme OpenClassrooms. Réserve le master aux profils visant un poste d'ingénieur ou de chercheur.",
  },
  {
    q: "Peut-on se former à l'intelligence artificielle gratuitement au Sénégal ?",
    a: "Oui. Elements of AI, Kaggle Learn, Google AI, de nombreux cours Coursera/edX en accès libre et les tutoriels YouTube permettent d'acquérir de vraies bases sans payer. Certains programmes locaux, comme Sonatel Academy, sont également gratuits mais sélectifs.",
  },
  {
    q: "Existe-t-il un master en intelligence artificielle au Sénégal ?",
    a: "Oui, plusieurs établissements (AIMS Sénégal, ESP-UCAD, UAM, DIT) proposent des cursus de niveau master en data science et intelligence artificielle. Les intitulés changeant régulièrement, vérifie l'offre en cours auprès de chaque école.",
  },
  {
    q: "Quels débouchés après une formation en IA au Sénégal ?",
    a: "Data analyst, data scientist, ingénieur machine learning, développeur IA, consultant ou freelance. Ces profils sont recherchés par les banques, télécoms, fintech et startups, et le freelance permet aussi de facturer des clients à l'international.",
  },
  {
    q: "Faut-il savoir coder pour se former à l'IA ?",
    a: "Pour les métiers techniques (ingénieur, data scientist), oui — Python est incontournable. Mais pour utiliser l'IA dans un métier non technique (marketing, gestion, création), on peut être très efficace sans coder, en maîtrisant les outils IA génératifs.",
  },
];

const BREADCRUMB_ITEMS = [
  { name: "Accueil", url: SITE_URL },
  { name: "Guides", url: `${SITE_URL}/guides` },
  {
    name: "Se former à l'IA au Sénégal",
    url: `${SITE_URL}/guides/se-former-ia-senegal`,
  },
];

export default function GuidePage() {
  return (
    <article className="mx-auto max-w-3xl">
      <JsonLd data={faqSchema(FAQ)} />
      <JsonLd data={breadcrumbSchema(BREADCRUMB_ITEMS)} />
      <JsonLd
        data={articleSchema({
          title: "Se former à l'IA au Sénégal : le guide complet 2026",
          description:
            "Formations, écoles, masters et ressources gratuites pour se former à l'intelligence artificielle au Sénégal. Débouchés, salaires et comment débuter sans budget.",
          url: `${SITE_URL}/guides/se-former-ia-senegal`,
          datePublished: "2026-08-03",
        })}
      />

      <Breadcrumbs items={BREADCRUMB_ITEMS} />
      <p className="mb-3 text-sm text-slate-400">Guide · Emploi & Carrière</p>
      <h1 className="mb-4 text-4xl font-extrabold leading-tight">
        Se former à l'IA au Sénégal : le guide complet
      </h1>
      <p className="mb-6 text-lg text-slate-300">
        L'intelligence artificielle n'est plus une affaire réservée à la
        Silicon Valley. À Dakar comme à Thiès ou Saint-Louis, les entreprises
        cherchent déjà des profils capables d'automatiser, d'analyser des
        données et de créer avec l'IA — et elles peinent à les trouver.
        Résultat : se former à l'IA au Sénégal est aujourd'hui l'un des paris
        de carrière les plus rentables du pays.
      </p>
      <p className="mb-6 text-slate-300">
        Mais par où commencer ? Faut-il un master, un bootcamp, ou suffit-il
        d'apprendre en ligne ? Ce guide fait le tour complet des voies de
        formation en intelligence artificielle au Sénégal : universités,
        écoles privées, plateformes en ligne et ressources 100 % gratuites.
        Tu y trouveras aussi les débouchés réels, une idée des salaires en
        FCFA, et une méthode concrète pour te lancer même sans budget.
      </p>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">
          Pourquoi se former à l'IA au Sénégal maintenant
        </h2>
        <p className="mb-4 text-slate-300">
          Trois raisons rendent le moment idéal :
        </p>
        <ul className="flex flex-col gap-3 text-slate-300">
          <li>
            <strong className="text-white">
              La demande explose et l'offre manque.
            </strong>{" "}
            Banques, télécoms, fintech, agritech, e-commerce, santé : tous les
            secteurs sénégalais adoptent l'IA. Les profils data et IA sont
            rares, donc mieux payés.
          </li>
          <li>
            <strong className="text-white">
              Le Sénégal investit dans le numérique.
            </strong>{" "}
            La stratégie « Sénégal Numérique » et les initiatives publiques
            de formation (comme Force-N) placent les compétences tech au
            cœur du développement du pays.
          </li>
          <li>
            <strong className="text-white">Les barrières tombent.</strong>{" "}
            Une bonne connexion, un ordinateur et de la discipline suffisent
            pour démarrer. Beaucoup d'outils et de cours sont gratuits — nous
            y revenons plus bas.
          </li>
        </ul>

        <div className="my-6 sm:max-w-md">
          <figure>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/guide-assets/se-former-ia-senegal-offres-emploi-dakar.jpg"
              alt="Offres d'emploi en intelligence artificielle à Dakar : chargé de projets IA & Innovation, spécialiste IA & automatisation"
              className="w-full rounded-2xl border border-white/10"
            />
            <figcaption className="mt-2 text-center text-sm text-slate-400">
              Exemples réels d'offres actuellement ouvertes à Dakar : stage
              chargé de projets IA & Innovation (L3M Holding), spécialiste IA
              & automatisation (Sabma Digital)…
            </figcaption>
          </figure>
        </div>

        <p className="text-slate-300">
          En clair : c'est une compétence qui se monnaie, dans un marché où
          la concurrence entre candidats reste faible. Le train est en gare.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">
          Les voies de formation en intelligence artificielle au Sénégal
        </h2>
        <p className="mb-6 text-slate-300">
          Il n'existe pas une seule bonne route, mais quatre grandes voies.
          Choisis selon ton temps, ton budget et ton niveau de départ.
        </p>

        <h3 className="mb-3 text-xl font-semibold text-white">
          Universités et masters en intelligence artificielle
        </h3>
        <p className="mb-4 text-slate-300">
          Pour un parcours diplômant et reconnu, les établissements
          sénégalais montent en puissance sur la data science et l'IA :
        </p>
        <ul className="mb-4 flex flex-col gap-3 text-slate-300">
          <li>
            <strong className="text-white">
              AIMS Sénégal
            </strong>{" "}
            (African Institute for Mathematical Sciences, à Mbour) —
            référence continentale en mathématiques appliquées et machine
            learning, à l'origine de programmes d'IA panafricains de haut
            niveau.
          </li>
          <li>
            <strong className="text-white">
              École Supérieure Polytechnique (ESP) – UCAD
            </strong>{" "}
            — filières informatique et data où l'IA prend une place
            croissante.
          </li>
          <li>
            <strong className="text-white">
              Université Amadou Mahtar Mbow (UAM)
            </strong>{" "}
            — université publique à vocation scientifique et technologique.
          </li>
          <li>
            <strong className="text-white">
              Dakar Institute of Technology (DIT)
            </strong>{" "}
            — cursus orientés data science et intelligence artificielle.
          </li>
        </ul>
        <p className="mb-4 text-sm text-slate-400">
          💡 Les intitulés et conditions d'admission d'un master en
          intelligence artificielle au Sénégal évoluent vite. Vérifie
          toujours l'offre en cours directement auprès de l'établissement
          avant de candidater.
        </p>
        <p className="mb-8 text-slate-300">
          <strong className="text-white">Pour qui ?</strong> Étudiants et
          jeunes diplômés visant un poste d'ingénieur IA, data scientist ou
          chercheur, avec un vrai bagage mathématique.
        </p>

        <h3 className="mb-3 text-xl font-semibold text-white">
          Écoles, bootcamps et formations accélérées
        </h3>
        <p className="mb-4 text-slate-300">
          Si tu veux des compétences opérationnelles plus vite qu'un cursus
          universitaire, les écoles et bootcamps sont faits pour toi :
        </p>
        <ul className="mb-4 flex flex-col gap-3 text-slate-300">
          <li>
            <strong className="text-white">Sonatel Academy</strong> (portée
            par Orange, en partenariat avec Simplon) — formations au code
            gratuites et sélectives, socle idéal avant de se spécialiser.
          </li>
          <li>
            <strong className="text-white">Simplon Sénégal</strong> —
            formations inclusives au numérique et à la data.
          </li>
          <li>
            <strong className="text-white">
              Bootcamps privés en data/IA
            </strong>{" "}
            qui ouvrent régulièrement à Dakar.
          </li>
        </ul>

        <div className="my-6 sm:max-w-md">
          <figure>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/guide-assets/se-former-ia-senegal-sonatel-academy.jpg"
              alt="Formation gratuite et certifiante en intelligence artificielle, École du Code Sonatel Academy (4 mois, présentielle)"
              className="w-full rounded-2xl border border-white/10"
            />
            <figcaption className="mt-2 text-center text-sm text-slate-400">
              Le programme « Intelligence Artificielle » de l'École du Code
              Sonatel Academy (ECSA) : formation gratuite, certifiante, en
              présentiel sur 4 mois.
            </figcaption>
          </figure>
        </div>

        <p className="mb-8 text-slate-300">
          <strong className="text-white">Pour qui ?</strong> Personnes en
          reconversion ou débutants motivés qui préfèrent la pratique
          intensive à la théorie longue.
        </p>

        <h3 className="mb-3 text-xl font-semibold text-white">
          Plateformes de formation en ligne
        </h3>
        <p className="mb-4 text-slate-300">
          L'option la plus flexible : apprendre à ton rythme, souvent en
          français, depuis chez toi.
        </p>
        <ul className="mb-4 flex flex-col gap-3 text-slate-300">
          <li>
            <strong className="text-white">OpenClassrooms</strong> —
            parcours diplômants en data et IA, populaires en Afrique
            francophone.
          </li>
          <li>
            <strong className="text-white">Coursera et edX</strong> — cours
            des meilleures universités (souvent gratuits à suivre, payants
            pour le certificat).
          </li>
          <li>
            <strong className="text-white">
              DataCamp et Kaggle Learn
            </strong>{" "}
            — pour coder en Python et pratiquer le machine learning.
          </li>
        </ul>
        <p className="mb-8 text-slate-300">
          <strong className="text-white">Pour qui ?</strong> Ceux qui
          travaillent déjà, ont un budget serré, ou veulent tester le
          domaine avant de s'engager.
        </p>

        <h3 className="mb-3 text-xl font-semibold text-white">
          Ressources gratuites pour débuter
        </h3>
        <p className="mb-4 text-slate-300">
          Zéro franc, aucune excuse. Ces ressources permettent de poser des
          bases solides :
        </p>
        <ul className="flex flex-col gap-3 text-slate-300">
          <li>
            <strong className="text-white">Elements of AI</strong> — cours
            d'introduction gratuit et disponible en français.
          </li>
          <li>
            <strong className="text-white">Google AI et Kaggle</strong> —
            tutoriels, jeux de données et compétitions gratuites.
          </li>
          <li>
            <strong className="text-white">YouTube</strong> — chaînes
            francophones d'IA et de data science.
          </li>
          <li>
            <strong className="text-white">
              Les outils IA eux-mêmes
            </strong>{" "}
            — la meilleure façon d'apprendre l'IA, c'est de l'utiliser tous
            les jours.
          </li>
        </ul>
        <p className="mt-2 text-sm text-slate-400">
          👉 Découvrez notre sélection{" "}
          <Link
            href="/guides/outils-ia-gratuits-francais-afrique"
            className="text-brand-300 hover:underline"
          >
            d'outils IA gratuits en français
          </Link>
          .
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">
          Comment choisir sa formation en IA
        </h2>
        <p className="mb-6 text-slate-300">
          Avant de payer quoi que ce soit, passe ta décision au filtre de ces
          cinq critères :
        </p>
        <ol className="list-decimal space-y-3 pl-5 text-slate-300">
          <li>
            <strong className="text-white">Ton objectif</strong> — ingénieur
            IA, data analyst, ou simplement utiliser l'IA dans ton métier
            actuel ? Le niveau d'exigence n'est pas le même.
          </li>
          <li>
            <strong className="text-white">Ton point de départ</strong> — à
            l'aise avec les maths et un peu de code ? Vise plus haut.
            Débutant total ? Commence par une initiation gratuite.
          </li>
          <li>
            <strong className="text-white">Ton temps</strong> — quelques
            heures par semaine (en ligne) ou immersion complète (bootcamp,
            master) ?
          </li>
          <li>
            <strong className="text-white">Ton budget</strong> — de 0 FCFA
            (ressources gratuites) à plusieurs millions de FCFA (master). Ne
            t'endette pas avant d'avoir validé ton intérêt avec du gratuit.
          </li>
          <li>
            <strong className="text-white">La reconnaissance</strong> — un
            diplôme rassure les employeurs classiques ; un portfolio de
            projets convainc les startups et les clients en freelance.
          </li>
        </ol>
        <p className="mt-6 text-slate-300">
          <strong className="text-white">Règle d'or :</strong> commence
          gratuit, prouve ton intérêt avec un ou deux projets concrets, puis
          investis dans une formation payante en connaissance de cause.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">
          Quels débouchés après une formation en IA ?
        </h2>
        <p className="mb-4 text-slate-300">
          Se former, oui, mais pour quels métiers ? Les entreprises
          d'intelligence artificielle au Sénégal et les grands groupes
          recrutent notamment sur ces postes :
        </p>
        <ul className="mb-6 flex flex-col gap-3 text-slate-300">
          <li>
            <strong className="text-white">
              Data analyst / data scientist
            </strong>{" "}
            — analyser les données pour décider mieux.
          </li>
          <li>
            <strong className="text-white">
              Ingénieur en machine learning
            </strong>{" "}
            — construire et déployer des modèles.
          </li>
          <li>
            <strong className="text-white">
              Développeur IA / prompt engineer
            </strong>{" "}
            — intégrer les IA génératives dans des produits.
          </li>
          <li>
            <strong className="text-white">Consultant IA</strong> —
            accompagner les entreprises dans leur transformation.
          </li>
          <li>
            <strong className="text-white">Freelance IA</strong> —
            automatisation, création de contenu, chatbots pour des clients
            locaux et internationaux.
          </li>
        </ul>
        <p className="text-slate-300">
          Les rémunérations varient fortement selon l'expérience et
          l'employeur, mais les profils data et IA figurent parmi les mieux
          payés du secteur tech sénégalais — et le freelance permet de
          facturer aussi des clients hors du pays, en devises.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">
          Se lancer dès aujourd'hui, même sans budget
        </h2>
        <p className="mb-6 text-slate-300">
          Voici un plan de démarrage en 4 étapes, réalisable gratuitement :
        </p>
        <ol className="list-decimal space-y-3 pl-5 text-slate-300">
          <li>
            <strong className="text-white">Semaine 1-2</strong> — suis une
            introduction gratuite (Elements of AI en français) pour
            comprendre les concepts.
          </li>
          <li>
            <strong className="text-white">Semaine 3-6</strong> — apprends
            les bases de Python et du machine learning (Kaggle Learn,
            OpenClassrooms).
          </li>
          <li>
            <strong className="text-white">En parallèle</strong> — utilise
            chaque jour des outils IA génératifs pour un usage réel
            (rédaction, image, code, productivité). C'est la pratique qui
            ancre les compétences.
          </li>
          <li>
            <strong className="text-white">Semaine 7+</strong> — réalise un
            petit projet (une analyse de données, un chatbot, une
            automatisation) et publie-le. Ce portfolio vaut plus qu'un
            certificat pour un premier contrat.
          </li>
        </ol>
        <p className="mt-6 text-slate-300">
          Pour l'étape 3, le plus simple est de partir{" "}
          <Link
            href="/guides/outils-ia-gratuits-francais-afrique"
            className="text-brand-300 hover:underline"
          >
            d'outils déjà prêts à l'emploi
          </Link>
          .
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">Conclusion</h2>
        <p className="text-slate-300">
          Se former à l'IA au Sénégal n'a jamais été aussi accessible : entre
          les masters d'AIMS ou de l'ESP, les bootcamps de Sonatel Academy,
          les plateformes en ligne et une montagne de ressources gratuites,
          chacun peut trouver une porte d'entrée adaptée à son niveau et à
          son budget. La vraie clé n'est pas le diplôme parfait, mais la
          régularité : apprends un peu chaque jour, pratique avec de vrais
          outils, et construis un portfolio. Le marché sénégalais manque de
          talents IA — à toi de saisir la place.
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
