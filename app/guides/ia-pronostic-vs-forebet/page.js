import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import CopyPromptButton from "@/components/CopyPromptButton";
import {
  faqSchema,
  breadcrumbSchema,
  articleSchema,
  SITE_URL,
  socialMetadata,
} from "@/lib/seo";

const TITLE =
  "IA pronostic foot vs Forebet : quelle méthode choisir en 2026-2027 ?";
const DESCRIPTION =
  "IA de pronostic ou algorithme traditionnel comme Forebet : comparez leurs données, leurs limites et leur utilité avec un prompt d’analyse football à copier.";
const URL = `${SITE_URL}/guides/ia-pronostic-vs-forebet`;

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "ia pronostic foot",
    "Forebet algorithme",
    "pronostic football IA gratuit",
    "prédiction match IA",
  ],
  authors: [{ name: "PromptForums" }],
  alternates: { canonical: URL },
  ...socialMetadata({ title: TITLE, description: DESCRIPTION, url: URL, type: "article" }),
};

const PROMPT_ANALYSE =
  "Analyse le match [ÉQUIPE A] contre [ÉQUIPE B], prévu le [DATE] dans [COMPÉTITION]. Utilise uniquement les informations vérifiables ci-dessous et indique leur date et leur source. Forme récente : [RÉSULTATS DES DEUX ÉQUIPES]. Absents confirmés : [BLESSURES ET SUSPENSIONS]. Probabilités publiées par un modèle statistique : [1 / N / 2]. Conditions prévues : [MÉTÉO, SI VÉRIFIÉE]. Compare les scénarios sans présenter un score comme certain. Distingue les faits, les hypothèses et les informations manquantes. Si tu ne peux pas vérifier une donnée, dis-le explicitement. Cette analyse est pédagogique, pas un conseil de pari.";

const FAQ = [
  {
    q: "Forebet utilise-t-il toujours la loi de Poisson ?",
    a: "Forebet présente des prédictions issues de modèles statistiques et décrit des éléments de sa méthodologie. Une formule publiée ne suffit toutefois pas à expliquer chaque prédiction ni à garantir sa précision. Consultez la documentation actuelle du service avant d'attribuer un résultat à une méthode précise.",
  },
  {
    q: "Une IA peut-elle vérifier les blessures et la météo en direct ?",
    a: "Seulement si l'outil dispose d'un accès au web ou à des données à jour, et si ces sources sont effectivement consultées. Un modèle de langage seul peut répondre à partir d'informations anciennes ou inventer des détails : demandez des sources datées et vérifiez-les.",
  },
  {
    q: "Quelle méthode est la plus fiable pour un pronostic football ?",
    a: "Aucune méthode ne garantit le résultat d'un match. Pour comparer des modèles, il faut définir un marché et une période, conserver leurs prévisions avant les matchs, puis évaluer un échantillon assez large avec des métriques adaptées. Quelques bons résultats ne démontrent pas une fiabilité durable.",
  },
  {
    q: "Peut-on trouver un pronostic football IA gratuit ?",
    a: "Certains outils proposent des fonctions gratuites, avec des limites variables. Vérifiez ce qui est inclus, la date des données, les sources et la méthode annoncée. Gratuit ne signifie ni vérifié ni fiable.",
  },
];

const BREADCRUMB_ITEMS = [
  { name: "Accueil", url: SITE_URL },
  { name: "Guides", url: `${SITE_URL}/guides` },
  { name: "IA pronostic foot vs Forebet", url: URL },
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
          datePublished: "2026-11-22",
          dateModified: "2026-11-22",
        })}
      />

      <Breadcrumbs items={BREADCRUMB_ITEMS} />
      <p className="mb-3 text-sm text-slate-400">
        Guide · Analyse sportive · Saison 2026-2027
      </p>
      <h1 className="mb-4 text-4xl font-extrabold leading-tight">
        IA de pronostic foot ou Forebet : quelle méthode choisir ?
      </h1>
      <p className="mb-6 text-lg text-slate-300">
        Un algorithme statistique et une IA conversationnelle ne répondent pas
        exactement à la même question. Le premier transforme des données en
        probabilités; la seconde peut aider à examiner le contexte, à condition
        de lui fournir des informations fiables. Voici comment comparer leurs
        usages sans confondre une analyse argumentée avec une prédiction sûre.
      </p>
      <aside className="mb-10 rounded-xl border border-amber-300/30 bg-amber-400/10 p-5 text-sm text-amber-100">
        <strong className="text-amber-50">À garder en tête :</strong> ce guide
        est informatif et ne constitue pas un conseil de pari ni une promesse de
        gain. Le football reste incertain et aucun outil ne garantit un résultat.
        Ne misez jamais une somme nécessaire à vos dépenses.
      </aside>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">
          1. Ce que montrent les algorithmes traditionnels
        </h2>
        <p className="mb-4 text-slate-300">
          Des services comme Forebet affichent des probabilités pour différents
          résultats, parfois accompagnées d'un score estimé ou d'autres
          indicateurs. Ces sorties s'appuient sur des données de match et des
          modèles statistiques. Elles sont utiles pour obtenir rapidement un
          point de comparaison, mais elles ne racontent pas à elles seules
          pourquoi un match pourrait se dérouler d'une certaine façon.
        </p>
        <p className="mb-4 text-slate-300">
          Il faut éviter de leur attribuer une formule précise ou une liste
          exacte de facteurs sans consulter leur documentation à jour. Une
          capture d'écran montre l'interface et les chiffres présentés à un
          instant donné; elle ne permet pas de vérifier les données d'entrée,
          les paramètres du modèle ou ses performances sur la durée.
        </p>
        <figure className="mb-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/guide-assets/ia-pronostics-foot-forebet.jpg"
            width={800}
            height={1124}
            alt="Interface Forebet présentant des probabilités 1X2 et des scores estimés pour des matchs de football"
            className="mx-auto max-h-[720px] w-auto max-w-full rounded-xl border border-white/10"
            loading="lazy"
            decoding="async"
          />
          <figcaption className="mt-2 text-center text-sm text-slate-400">
            Exemple d'affichage de probabilités et de scores estimés. Ces
            valeurs ne sont ni des certitudes ni une mesure indépendante de
            précision.
          </figcaption>
        </figure>
        <p className="text-slate-300">
          Pour consulter l'outil, rendez-vous sur le site officiel de{" "}
          <Link
            href="https://www.forebet.com/fr/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-300 hover:underline"
          >
            Forebet
          </Link>
          . Les informations et fonctionnalités peuvent évoluer.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">
          2. Ce qu'une IA conversationnelle peut apporter
        </h2>
        <p className="mb-4 text-slate-300">
          Un modèle comme ChatGPT ou Claude peut organiser une comparaison,
          résumer les informations qu'on lui fournit et signaler des scénarios
          possibles. Il peut aussi aider à formuler les questions à poser sur la
          forme, les absences ou le calendrier. Cette capacité à expliquer ne
          prouve pas que ses faits sont exacts ni que son analyse prédit mieux
          le résultat.
        </p>
        <p className="mb-4 text-slate-300">
          Surtout, un assistant n'a pas nécessairement accès aux actualités ou
          aux statistiques en direct. Sans navigation web ou source de données
          connectée, il peut s'appuyer sur des informations dépassées ou
          inventer des blessures, des compositions et des conditions météo.
          Vérifiez chaque élément important auprès de sources datées; demandez
          au modèle de distinguer les faits des hypothèses et de reconnaître ce
          qu'il ne sait pas.
        </p>
        <figure className="mb-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/guide-assets/ia-pronostics-foot-futpre.jpg"
            width={800}
            height={1567}
            alt="Application de pronostics football présentant une fonction Analyse IA parmi ses prédictions"
            className="mx-auto max-h-[720px] w-auto max-w-full rounded-xl border border-white/10"
            loading="lazy"
            decoding="async"
          />
          <figcaption className="mt-2 text-center text-sm text-slate-400">
            Exemple d'interface d'un outil tiers qui propose une fonction
            « Analyse IA »; la capture illustre une fonctionnalité, pas sa
            précision ni une réponse de ChatGPT ou Claude.
          </figcaption>
        </figure>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">
          3. Comparatif : algorithme statistique ou IA ?
        </h2>
        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full min-w-[620px] border-collapse text-left text-sm">
            <thead className="bg-white/5 text-white">
              <tr>
                <th scope="col" className="p-3">Critère</th>
                <th scope="col" className="p-3">Algorithme statistique</th>
                <th scope="col" className="p-3">IA conversationnelle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-slate-300">
              <tr>
                <th scope="row" className="p-3 font-semibold text-slate-100">Entrées</th>
                <td className="p-3">Données structurées et paramètres du modèle</td>
                <td className="p-3">Consignes, données fournies et éventuellement recherche connectée</td>
              </tr>
              <tr>
                <th scope="row" className="p-3 font-semibold text-slate-100">Sortie</th>
                <td className="p-3">Probabilités, tendances ou scores estimés</td>
                <td className="p-3">Synthèse en langage naturel, explications et hypothèses</td>
              </tr>
              <tr>
                <th scope="row" className="p-3 font-semibold text-slate-100">Point fort</th>
                <td className="p-3">Résultats rapides et comparables si le modèle est documenté</td>
                <td className="p-3">Aide à structurer et questionner les informations</td>
              </tr>
              <tr>
                <th scope="row" className="p-3 font-semibold text-slate-100">Limite majeure</th>
                <td className="p-3">Dépend des données, hypothèses et de la méthode retenue</td>
                <td className="p-3">Peut présenter une erreur ou une donnée inventée avec assurance</td>
              </tr>
              <tr>
                <th scope="row" className="p-3 font-semibold text-slate-100">À vérifier</th>
                <td className="p-3">Méthode publiée, date des données et résultats mesurés</td>
                <td className="p-3">Sources citées, actualité et exactitude de chaque fait</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">
          4. Un prompt pour comparer les informations
        </h2>
        <p className="mb-4 text-slate-300">
          Ce prompt sert à structurer une analyse à partir de données que vous
          pouvez vérifier. Remplacez les champs entre crochets et n'ajoutez pas
          de détails non confirmés.
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
          Une réponse bien structurée reste une analyse à contrôler. Elle ne
          transforme pas des informations incertaines en faits et ne permet pas
          de connaître l'issue d'un match.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">
          5. Comment évaluer une prédiction ?
        </h2>
        <p className="mb-4 text-slate-300">
          Ne jugez pas un outil sur une capture ou quelques matchs. Pour une
          comparaison sérieuse, conservez les prévisions avant le coup d'envoi,
          notez la date et les sources, définissez à l'avance ce que signifie
          une réussite et étudiez un échantillon suffisamment large. Les
          probabilités doivent aussi être évaluées comme des probabilités, pas
          seulement comparées au score final.
        </p>
        <p className="text-slate-300">
          Vous pouvez utiliser un modèle statistique comme point de repère puis
          demander à une IA de vérifier les facteurs de contexte, à condition
          que ces informations soient sourcées. Cette combinaison améliore la
          qualité de l'examen, mais ne garantit ni un pronostic juste ni un
          avantage financier.
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

      <section className="mb-10 border-t border-white/10 pt-6">
        <h2 className="mb-3 text-xl font-bold text-white">
          Pour approfondir les pronostics foot avec l'IA
        </h2>
        <p className="text-slate-300">
          Notre guide complémentaire explique les données et les limites des
          modèles de pronostic football, avec d'autres exemples et un prompt à
          copier :{" "}
          <Link
            href="/guides/ia-pronostics-foot-gratuit"
            className="text-brand-300 hover:underline"
          >
            pronostics foot IA gratuits : méthodes, données et limites
          </Link>
          .
        </p>
      </section>
    </article>
  );
}
