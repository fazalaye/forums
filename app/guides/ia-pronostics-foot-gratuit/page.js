import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import CopyPromptButton from "@/components/CopyPromptButton";
import { faqSchema, breadcrumbSchema, articleSchema, SITE_URL } from "@/lib/seo";

const TITLE =
  "Analyser un match de foot avec l'IA : méthodes, données et limites";
const DESCRIPTION =
  "Comment les modèles statistiques et le machine learning analysent un match de football : quelles données ils utilisent, la loi de Poisson et les xG expliqués simplement, et pourquoi l'analyse ne devient jamais une prédiction fiable.";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: `${SITE_URL}/guides/ia-pronostics-foot-gratuit`,
  },
};

const PROMPT_ANALYSE =
  "Tu es analyste de données sportives. Voici un match à venir : [ÉQUIPE A] contre [ÉQUIPE B], en [COMPÉTITION], le [DATE]. Forme récente de [ÉQUIPE A] : [5 DERNIERS RÉSULTATS]. Forme récente de [ÉQUIPE B] : [5 DERNIERS RÉSULTATS]. Confrontations directes récentes : [RÉSULTATS]. Absences connues : [BLESSÉS ET SUSPENDUS]. Analyse ce match en expliquant ton raisonnement étape par étape : quelles données pèsent le plus dans ce cas précis et pourquoi, quels scénarios sont les plus cohérents avec ces données, et surtout quelles informations te manquent pour que ton analyse soit solide. Ne me donne pas un score final présenté comme une certitude — explique les facteurs, leur poids relatif, et le niveau d'incertitude de chaque conclusion.";

const FAQ = [
  {
    q: "Comment une IA analyse-t-elle un match de football ?",
    a: "En croisant des données historiques — résultats passés, forme des équipes, confrontations directes, buts attendus (xG) — avec des modèles statistiques ou de machine learning. Le résultat est une distribution de probabilités entre plusieurs scénarios, pas une prédiction unique.",
  },
  {
    q: "Que signifient les xG (buts attendus) ?",
    a: "Les xG mesurent la qualité des occasions créées plutôt que les buts réellement marqués. Une équipe qui perd 0-1 en ayant produit 2,5 xG contre 0,4 a largement dominé le jeu : sur la durée, ses résultats ont statistiquement tendance à s'améliorer. C'est un indicateur plus stable que le score brut.",
  },
  {
    q: "Peut-on utiliser ChatGPT ou Claude pour analyser un match ?",
    a: "Oui, à condition de lui fournir vous-même les données (forme, confrontations, absences) : ces modèles n'ont pas d'accès direct aux statistiques sportives à jour. Ils sont utiles pour structurer un raisonnement et pondérer des facteurs, pas pour aller chercher les chiffres.",
  },
  {
    q: "Ces modèles d'analyse sont-ils fiables ?",
    a: "Ils décrivent bien ce qui s'est passé et identifient des tendances réelles. Mais les taux de précision annoncés par les applications (souvent 70-80 %) viennent des éditeurs eux-mêmes et ne sont pas vérifiés indépendamment. Un modèle honnête produit des probabilités assorties d'une marge d'incertitude, jamais des certitudes.",
  },
];

const BREADCRUMB_ITEMS = [
  { name: "Accueil", url: SITE_URL },
  { name: "Guides", url: `${SITE_URL}/guides` },
  {
    name: "Analyser un match de foot avec l'IA",
    url: `${SITE_URL}/guides/ia-pronostics-foot-gratuit`,
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
          url: `${SITE_URL}/guides/ia-pronostics-foot-gratuit`,
          datePublished: "2026-08-05",
        })}
      />

      <Breadcrumbs items={BREADCRUMB_ITEMS} />
      <p className="mb-3 text-sm text-slate-400">Guide · Analyse de données</p>
      <h1 className="mb-4 text-4xl font-extrabold leading-tight">
        Analyser un match de foot avec l'IA : méthodes, données et limites
      </h1>
      <p className="mb-6 text-lg text-slate-300">
        Le football est l'un des terrains les plus intéressants pour comprendre
        ce que l'IA sait faire — et ce qu'elle ne sait pas faire. Beaucoup de
        données publiques, un résultat mesurable, et une part d'aléatoire
        irréductible.
      </p>
      <p className="mb-6 text-slate-300">
        Ce guide explique concrètement{" "}
        <strong className="text-white">
          comment un modèle analyse un match
        </strong>{" "}
        : quelles données il consomme, quelles méthodes statistiques il
        applique, ce que révèlent les outils existants de leur propre
        méthodologie, et comment mener cette analyse toi-même avec un assistant
        IA généraliste. C'est un cas d'école utile bien au-delà du sport.
      </p>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">
          1. Les données que ces modèles consomment
        </h2>
        <p className="mb-4 text-slate-300">
          Un modèle ne « regarde » pas un match. Il travaille exclusivement sur
          des variables chiffrées, et sa qualité dépend d'abord de celles qu'on
          lui donne :
        </p>
        <ul className="flex flex-col gap-3 text-slate-300">
          <li>
            <strong className="text-white">Les résultats historiques.</strong>{" "}
            La base de tout, mais aussi la plus trompeuse : un score reflète
            autant la chance que la performance.
          </li>
          <li>
            <strong className="text-white">
              Les buts attendus (xG, expected goals).
            </strong>{" "}
            La donnée la plus intéressante du lot. Elle mesure la{" "}
            <em>qualité des occasions créées</em> plutôt que les buts marqués.
            Une équipe battue 0-1 avec 2,5 xG contre 0,4 a dominé le jeu — et
            statistiquement, ses résultats ont tendance à se redresser.
          </li>
          <li>
            <strong className="text-white">La forme récente.</strong>{" "}
            Généralement pondérée : les matchs récents pèsent plus lourd que
            ceux d'il y a six mois.
          </li>
          <li>
            <strong className="text-white">Le contexte.</strong> Domicile ou
            extérieur, absences, jours de repos entre deux matchs, enjeu de la
            rencontre.
          </li>
        </ul>
        <p className="mt-4 text-slate-300">
          Ce qui n'entre presque jamais dans le modèle : l'état psychologique
          d'un vestiaire, un conflit interne, la météo du jour, l'arbitre
          désigné. C'est là que se loge une grande partie de l'imprévu.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">
          2. Les méthodes, expliquées simplement
        </h2>
        <p className="mb-4 text-slate-300">
          Deux grandes familles d'approches coexistent, et elles ne se valent
          pas en matière de transparence.
        </p>
        <h3 className="mb-2 text-xl font-semibold text-white">
          La loi de Poisson
        </h3>
        <p className="mb-4 text-slate-300">
          C'est le modèle historique, et il reste largement utilisé. L'idée :
          les buts sont des événements rares et relativement indépendants, ce
          qui permet de les modéliser mathématiquement. À partir de la force
          offensive d'une équipe et de la faiblesse défensive de l'autre, on
          calcule la probabilité de chaque score possible. Son intérêt : il est{" "}
          <strong className="text-white">entièrement vérifiable</strong> —
          n'importe qui peut refaire le calcul.
        </p>
        <h3 className="mb-2 text-xl font-semibold text-white">
          Le machine learning
        </h3>
        <p className="text-slate-300">
          Un modèle entraîné sur des milliers de matchs pour repérer des
          régularités qu'aucune formule ne capture. Plus puissant sur le
          papier, mais avec deux faiblesses : il exige énormément de données
          propres, et il fonctionne souvent en « boîte noire » — il donne un
          résultat sans que l'on puisse examiner le raisonnement. Quand un
          outil ne documente pas sa méthode, c'est presque toujours de ça qu'il
          s'agit.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">
          3. Trois outils et ce qu'ils révèlent de leur méthode
        </h2>
        <p className="mb-6 text-slate-300">
          Le meilleur critère pour juger un outil d'analyse n'est pas le taux
          de réussite qu'il affiche — c'est ce qu'il accepte de montrer de son
          fonctionnement.
        </p>

        <h3 className="mb-3 text-xl font-semibold text-white">Forebet</h3>
        <p className="mb-4 text-slate-300">
          <strong className="text-white">
            Le plus transparent des trois.
          </strong>{" "}
          En ligne depuis 2009, Forebet documente publiquement sa méthodologie :
          des modèles mathématiques, dont une loi de Poisson pour estimer le
          nombre de buts probables, appliqués à une base de plus de 700
          championnats sur 15 ans. C'est l'un des rares outils du secteur à
          expliquer <em>comment</em> il calcule plutôt qu'à annoncer un taux de
          réussite. Du point de vue de l'analyse de données, c'est le seul des
          trois dont on peut réellement discuter la méthode.
        </p>
        <figure className="mb-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/guide-assets/ia-pronostics-foot-forebet.jpg"
            width={800}
            height={1124}
            alt="Interface Forebet montrant les probabilités 1X2, le coefficient et le score prédit pour des matchs de l'UEFA Europa League"
            className="w-full rounded-2xl border border-white/10"
          />
          <figcaption className="mt-2 text-center text-sm text-slate-400">
            Forebet affiche une distribution de probabilités (1X2) plutôt qu'une
            réponse unique — la bonne façon de présenter une sortie de modèle.
          </figcaption>
        </figure>
        <p className="mb-6 text-slate-300">
          <strong className="text-white">Site officiel :</strong>{" "}
          <Link
            href="https://www.forebet.com/fr/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-300 hover:underline"
          >
            forebet.com
          </Link>{" "}
          — accessible depuis un navigateur, sans installation.
        </p>

        <h3 className="mb-3 text-xl font-semibold text-white">FutPre</h3>
        <p className="mb-4 text-slate-300">
          <strong className="text-white">
            L'approche par simulation.
          </strong>{" "}
          Application mobile qui combine forme des équipes, blessures et
          confrontations directes, avec un mode « simulation » qui rejoue
          jusqu'à 100 fois le même match. C'est une méthode statistique
          classique (proche d'une simulation de Monte-Carlo) et pédagogiquement
          intéressante : elle rend visible le fait qu'un même match peut
          produire des issues très différentes. La méthodologie sous-jacente
          n'est en revanche pas documentée publiquement.
        </p>
        <figure className="mb-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/guide-assets/ia-pronostics-foot-futpre.jpg"
            width={800}
            height={1567}
            alt="Interface FutPre avec le bouton Analyse IA et les onglets Prédictions, Simulations, BetWizard"
            className="w-full rounded-2xl border border-white/10"
          />
          <figcaption className="mt-2 text-center text-sm text-slate-400">
            FutPre : le mode « Simulations » rejoue le match de nombreuses fois
            pour montrer la dispersion des résultats possibles.
          </figcaption>
        </figure>
        <p className="mb-6 text-slate-300">
          <strong className="text-white">Téléchargement :</strong>{" "}
          <Link
            href="https://apps.apple.com/ci/app/futpre-pronostics-ia/id6657955105"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-300 hover:underline"
          >
            App Store
          </Link>{" "}
          ·{" "}
          <Link
            href="https://play.google.com/store/apps/details?id=com.futpre"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-300 hover:underline"
          >
            Google Play
          </Link>
        </p>

        <h3 className="mb-3 text-xl font-semibold text-white">BetMines</h3>
        <p className="mb-4 text-slate-300">
          <strong className="text-white">
            Le plus opaque sur sa méthode.
          </strong>{" "}
          L'application fournit des statistiques d'équipes détaillées, utiles
          en tant que source de données brutes, mais ne documente pas comment
          son algorithme parvient à ses conclusions. Son mode « paris virtuels »
          a en revanche une vraie valeur analytique : il permet de tester une
          hypothèse sur plusieurs dizaines de matchs sans argent réel, ce qui
          est exactement la bonne façon d'évaluer un modèle — sur un
          échantillon, pas sur trois résultats.
        </p>
        <figure className="mb-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/guide-assets/ia-pronostics-foot-betmines.jpg"
            width={800}
            height={1464}
            alt="Interface BetMines listant des analyses de matchs football avec pourcentages de probabilité"
            className="w-full rounded-2xl border border-white/10"
          />
          <figcaption className="mt-2 text-center text-sm text-slate-400">
            BetMines affiche un pourcentage de probabilité par match, sans
            expliquer comment il est obtenu.
          </figcaption>
        </figure>
        <p className="text-slate-300">
          <strong className="text-white">Site officiel :</strong>{" "}
          <Link
            href="https://betmines.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-300 hover:underline"
          >
            betmines.com
          </Link>
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">
          4. Mener l'analyse toi-même avec ChatGPT ou Claude
        </h2>
        <p className="mb-4 text-slate-300">
          Un assistant IA généraliste n'a pas accès aux statistiques sportives à
          jour — c'est sa limite principale, et il faut donc lui fournir les
          données. En revanche, il est excellent pour{" "}
          <strong className="text-white">structurer un raisonnement</strong>,
          pondérer des facteurs et, surtout, nommer ce qui lui manque. Ce prompt
          est écrit pour l'obliger à expliquer sa démarche plutôt qu'à cracher
          un score :
        </p>
        <div className="glass-card p-6">
          <div className="mb-3 flex justify-end">
            <CopyPromptButton text={PROMPT_ANALYSE} />
          </div>
          <pre className="whitespace-pre-wrap rounded-xl bg-black/30 p-5 font-sans text-slate-200">
            {PROMPT_ANALYSE}
          </pre>
        </div>
        <p className="mt-4 text-sm text-slate-400">
          L'intérêt de ce prompt n'est pas la conclusion : c'est le
          raisonnement. Un modèle qui explique pourquoi il hésite t'apprend
          davantage qu'un chiffre affirmé sans justification.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">
          5. Là où l'analyse s'arrête
        </h2>
        <div className="glass-card p-6">
          <p className="mb-3 font-semibold text-slate-100">
            Analyser n'est pas prédire
          </p>
          <p className="mb-3 text-sm text-slate-300">
            Un modèle bien construit décrit correctement ce qui s'est passé et
            identifie des tendances réelles. Il ne supprime pas pour autant la
            part d'aléatoire du football — un poteau, une erreur d'arbitrage ou
            une blessure à la 10ᵉ minute font basculer un match sans qu'aucune
            donnée ne l'ait annoncé.
          </p>
          <p className="mb-3 text-sm text-slate-300">
            C'est aussi pourquoi les taux de précision affichés par les
            applications (« 80 % de réussite ») doivent être lus avec méfiance :
            ils viennent presque toujours de l'éditeur, sans vérification
            indépendante, et sans préciser sur quel échantillon ni sur quel
            type de pari ils sont calculés.
          </p>
          <p className="text-sm text-slate-300">
            <strong className="text-white">
              Et si tu envisages de parier :
            </strong>{" "}
            les cotes des bookmakers intègrent une marge structurelle. Aucun
            outil grand public, gratuit ou payant, ne l'annule de façon fiable.
            Ces modèles servent à comprendre un match — pas à générer un
            revenu. Ne joue jamais un argent dont tu as besoin.
          </p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">
          Ce qu'il faut retenir
        </h2>
        <p className="text-slate-300">
          Le football est un bon révélateur du fonctionnement réel de l'IA : des
          données de qualité inégale, des méthodes qui vont de la formule
          vérifiable à la boîte noire, et un résultat qui reste probabiliste.
          Le réflexe utile, ici comme ailleurs, est simple : préférer un outil
          qui explique sa méthode à un outil qui annonce un score de réussite.
          Pour aller plus loin sur le fonctionnement de ces systèmes, notre
          guide{" "}
          <Link
            href="/guides/definition-intelligence-artificielle"
            className="text-brand-300 hover:underline"
          >
            Qu'est-ce que l'intelligence artificielle ?
          </Link>{" "}
          reprend les bases avec des exemples concrets.
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
