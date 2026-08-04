import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import { faqSchema, breadcrumbSchema, articleSchema, SITE_URL } from "@/lib/seo";

export const metadata = {
  title: "Qu'est-ce que l'intelligence artificielle ? Définition simple",
  description:
    "Définition claire de l'intelligence artificielle, avec les définitions officielles (OCDE, UE), des exemples concrets au quotidien, et les avantages et inconvénients.",
  alternates: {
    canonical: `${SITE_URL}/guides/definition-intelligence-artificielle`,
  },
};

const FAQ = [
  {
    q: "Qu'est-ce que l'intelligence artificielle en une phrase simple ?",
    a: "C'est la capacité d'un système informatique à réaliser des tâches qui demandent normalement une intelligence humaine — comprendre, décider, créer — en déduisant une réponse à partir des données qu'il reçoit, plutôt qu'en suivant uniquement des règles fixées à l'avance.",
  },
  {
    q: "Quelle est la définition officielle de l'intelligence artificielle ?",
    a: "La définition de référence internationale est celle de l'OCDE (mise à jour en 2024) : un système basé sur une machine qui, pour des objectifs explicites ou implicites, déduit à partir des données qu'il reçoit comment générer des prédictions, du contenu, des recommandations ou des décisions. Le Règlement européen sur l'IA reprend une définition très proche.",
  },
  {
    q: "Quels sont des exemples d'intelligence artificielle dans la vie quotidienne ?",
    a: "Les recommandations Netflix ou TikTok, le correcteur automatique du téléphone, les assistants vocaux, la reconnaissance faciale, et les chatbots comme ChatGPT ou Claude sont des exemples d'IA que la plupart des gens utilisent déjà sans y penser.",
  },
  {
    q: "Quelle est la différence entre l'intelligence artificielle et l'IA générative ?",
    a: "L'intelligence artificielle est la catégorie générale (classer, prédire, décider). L'IA générative est un sous-type plus récent qui crée du contenu nouveau — texte, image, vidéo, code — à partir d'une simple instruction en langage naturel. ChatGPT et Midjourney sont des IA génératives.",
  },
  {
    q: "Quels sont les principaux avantages et inconvénients de l'IA ?",
    a: "Avantages : gain de temps, disponibilité continue, analyse de gros volumes de données, accessibilité d'outils autrefois réservés aux grandes entreprises. Inconvénients : erreurs (« hallucinations »), biais hérités des données d'entraînement, risque de dépendance, et impact sur certains emplois automatisables.",
  },
];

const BREADCRUMB_ITEMS = [
  { name: "Accueil", url: SITE_URL },
  { name: "Guides", url: `${SITE_URL}/guides` },
  {
    name: "Qu'est-ce que l'intelligence artificielle ?",
    url: `${SITE_URL}/guides/definition-intelligence-artificielle`,
  },
];

export default function GuidePage() {
  return (
    <article className="mx-auto max-w-3xl">
      <JsonLd data={faqSchema(FAQ)} />
      <JsonLd data={breadcrumbSchema(BREADCRUMB_ITEMS)} />
      <JsonLd
        data={articleSchema({
          title: "Qu'est-ce que l'intelligence artificielle ? Définition simple",
          description:
            "Définition claire de l'intelligence artificielle, avec les définitions officielles (OCDE, UE), des exemples concrets au quotidien, et les avantages et inconvénients.",
          url: `${SITE_URL}/guides/definition-intelligence-artificielle`,
          datePublished: "2026-08-03",
        })}
      />

      <Breadcrumbs items={BREADCRUMB_ITEMS} />
      <p className="mb-3 text-sm text-slate-400">Guide · Glossaire</p>
      <h1 className="mb-4 text-4xl font-extrabold leading-tight">
        Qu'est-ce que l'intelligence artificielle ? Définition simple et
        exemples
      </h1>
      <p className="mb-6 text-lg text-slate-300">
        Tu as sûrement déjà lu ce mot dix fois aujourd'hui : intelligence
        artificielle. Mais si on te demandait de la définir en une phrase,
        là, maintenant — tu dirais quoi ?
      </p>
      <p className="mb-6 text-slate-300">
        Ce n'est pas une honte de sécher. Le terme est utilisé à toutes les
        sauces, parfois pour désigner un vrai système d'apprentissage
        automatique, parfois pour vendre un simple algorithme de
        recommandation. Ce guide te donne une définition claire et simple,
        puis les définitions officielles utilisées par les institutions
        (OCDE, Union européenne), des exemples concrets que tu croises déjà,
        et un aperçu honnête des avantages et des limites.
      </p>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">
          Définition simple de l'intelligence artificielle
        </h2>
        <p className="mb-6 text-slate-300">
          <strong className="text-white">
            L'intelligence artificielle (IA) est la capacité d'un système
            informatique à réaliser des tâches qui demandent normalement une
            intelligence humaine
          </strong>{" "}
          : comprendre un texte, reconnaître une image, prendre une décision,
          générer du contenu, ou encore apprendre à partir de données plutôt
          que suivre des règles écrites à l'avance par un humain.
        </p>
        <p className="mb-6 text-slate-300">
          La nuance qui change tout : un programme classique{" "}
          <strong className="text-white">exécute</strong> des instructions
          fixes. Un système d'IA, lui,{" "}
          <strong className="text-white">infère</strong> — il déduit une
          réponse à partir de ce qu'il a reçu en entrée, même dans des
          situations qu'il n'a jamais vues exactement de la même façon.
        </p>

        <div className="glass-card my-6 p-6">
          <p className="mb-2 font-semibold text-slate-100">
            🧪 Test en direct : on a posé la question à un chatbot
          </p>
          <p className="mb-3 text-sm text-slate-300">
            Pour voir si un chatbot grand public s'en sort aussi bien qu'un
            texte réglementaire, on a demandé à{" "}
            <strong className="text-white">Claude</strong> (Anthropic), sans
            préparation, « Qu'est-ce que l'intelligence artificielle ? ».
            Voici sa réponse spontanée, mot pour mot :
          </p>
          <p className="mb-3 border-l-2 border-brand-400 pl-4 text-sm italic text-slate-300">
            « L'intelligence artificielle est une technologie qui permet à un
            ordinateur d'apprendre, de raisonner et de résoudre des problèmes
            d'une manière qui imite l'intelligence humaine, en s'appuyant sur
            des données et des algorithmes plutôt que sur des instructions
            figées. »
          </p>
          <p className="text-sm text-slate-300">
            En comparaison avec la définition officielle de l'OCDE citée plus
            bas — même idée de fond (déduire un résultat à partir de données,
            plutôt que suivre des règles figées), formulée en langage courant
            plutôt que juridique. Rassurant : le concept de base tient la
            route même sans jargon.
          </p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">
          Les définitions officielles (par les institutions)
        </h2>
        <p className="mb-6 text-slate-300">
          Pour les recherches académiques ou professionnelles, voici les
          définitions qui font référence à l'échelle internationale.
        </p>

        <h3 className="mb-3 text-xl font-semibold text-white">
          La définition de l'OCDE (2024)
        </h3>
        <p className="mb-4 text-slate-300">
          L'Organisation de coopération et de développement économiques
          (OCDE) a mis à jour sa définition de référence en mai 2024. Elle
          est aujourd'hui reprise par l'Union européenne, les États-Unis et
          les Nations unies dans leurs textes réglementaires :
        </p>
        <p className="mb-2 border-l-2 border-brand-400 pl-4 text-slate-300">
          « Un système d'IA est un système basé sur une machine qui, pour des
          objectifs explicites ou implicites, déduit, à partir des données
          qu'il reçoit, comment générer des résultats tels que des
          prédictions, du contenu, des recommandations ou des décisions
          pouvant influencer des environnements physiques ou virtuels. »
        </p>
        <p className="mb-6 text-sm text-slate-400">
          (Traduction de la définition officielle en anglais,{" "}
          <Link
            href="https://oecd.ai/en/ai-principles"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-300 hover:underline"
          >
            oecd.ai
          </Link>
          )
        </p>

        <h3 className="mb-3 text-xl font-semibold text-white">
          La définition du Règlement européen sur l'IA (AI Act)
        </h3>
        <p className="mb-4 text-slate-300">
          L'article 3 du règlement européen sur l'intelligence artificielle
          (AI Act), le texte qui encadre légalement l'IA dans l'Union
          européenne, reprend une définition très proche :
        </p>
        <p className="mb-2 border-l-2 border-brand-400 pl-4 text-slate-300">
          « Un système basé sur une machine, conçu pour fonctionner avec
          différents niveaux d'autonomie, pouvant faire preuve d'adaptabilité
          après son déploiement, et qui, pour des objectifs explicites ou
          implicites, déduit à partir des données qu'il reçoit comment
          générer des résultats tels que des prédictions, du contenu, des
          recommandations ou des décisions pouvant influencer des
          environnements physiques ou virtuels. »
        </p>
        <p className="mb-6 text-sm text-slate-400">
          (Traduction de l'article 3(1),{" "}
          <Link
            href="https://artificialintelligenceact.eu/article/3/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-300 hover:underline"
          >
            artificialintelligenceact.eu
          </Link>
          )
        </p>
        <p className="mb-6 text-slate-300">
          Ce qui compte, derrière le jargon juridique : un système d'IA agit
          avec une forme d'<strong className="text-white">autonomie</strong>,
          peut <strong className="text-white">s'adapter</strong> après sa
          mise en service, et{" "}
          <strong className="text-white">produit un résultat</strong> (une
          prédiction, un texte, une recommandation, une décision) à partir de
          ce qu'on lui donne.
        </p>

        <h3 className="mb-3 text-xl font-semibold text-white">
          D'où vient le terme « intelligence artificielle » ?
        </h3>
        <p className="mb-6 text-slate-300">
          L'expression a été inventée en 1956 par le mathématicien et
          informaticien <strong className="text-white">John McCarthy</strong>
          , lors d'une conférence fondatrice à Dartmouth qui a lancé l'IA
          comme domaine de recherche à part entière.
        </p>

        <div className="glass-card my-6 p-6">
          <p className="mb-2 font-semibold text-slate-100">
            🔍 Comment on a évité une fausse citation (et pourquoi ça compte)
          </p>
          <p className="mb-3 text-sm text-slate-300">
            En préparant cet article, on a voulu citer la définition exacte
            de McCarthy et celle de l'UNESCO — deux sources qui reviennent
            souvent dans les recherches sur ce sujet. En vérifiant les
            sources primaires plutôt que de faire confiance à la mémoire d'un
            assistant IA, deux surprises :
          </p>
          <ul className="mb-3 flex flex-col gap-2 text-sm text-slate-300">
            <li>
              Impossible de confirmer mot pour mot la citation de McCarthy
              qui circule largement en ligne.
            </li>
            <li>
              L'UNESCO n'a en réalité{" "}
              <strong className="text-white">
                pas de définition formelle de l'IA
              </strong>{" "}
              dans son texte de référence — sa Recommandation de 2021 porte
              sur l'éthique, pas sur une définition technique.
            </li>
          </ul>
          <p className="text-sm text-slate-300">
            Un article rédigé sans vérification aurait pu citer ces deux
            sources avec assurance, en inventant une phrase plausible. C'est
            exactement le risque d'« hallucination » décrit plus bas dans les
            inconvénients de l'IA — et la raison pour laquelle ce guide ne
            mentionne que ce qui a pu être confirmé à la source.
          </p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">
          Des exemples concrets d'intelligence artificielle
        </h2>
        <p className="mb-6 text-slate-300">
          La théorie, c'est bien — mais tu utilises probablement déjà l'IA
          plusieurs fois par jour, sans forcément y penser.
        </p>

        <h3 className="mb-3 text-xl font-semibold text-white">
          Dans ton quotidien
        </h3>
        <ul className="mb-6 flex flex-col gap-3 text-slate-300">
          <li>
            Le correcteur orthographique et les suggestions de texte sur ton
            téléphone
          </li>
          <li>
            Les recommandations Netflix, Spotify ou TikTok (« parce que tu as
            regardé/écouté... »)
          </li>
          <li>Les assistants vocaux (Siri, Google Assistant)</li>
          <li>La reconnaissance faciale pour déverrouiller ton téléphone</li>
          <li>
            Un chatbot comme ChatGPT ou Claude qui répond à tes questions
          </li>
        </ul>

        <h3 className="mb-3 text-xl font-semibold text-white">
          En entreprise
        </h3>
        <ul className="flex flex-col gap-3 text-slate-300">
          <li>La détection de fraude bancaire en temps réel</li>
          <li>Les chatbots de service client</li>
          <li>La prévision de la demande dans la logistique</li>
          <li>Le tri automatique de CV en recrutement</li>
          <li>La génération de fiches produit ou de visuels publicitaires</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">
          L'intelligence artificielle générative : une définition à part
        </h2>
        <p className="mb-6 text-slate-300">
          Depuis 2022-2023, un type précis d'IA a pris le devant de la
          scène : <strong className="text-white">l'IA générative</strong>.
          Contrairement à une IA qui se contente de classer ou de prédire («
          ce client va-t-il rembourser son crédit ? »), une IA générative{" "}
          <strong className="text-white">crée du contenu nouveau</strong> :
          du texte, une image, une vidéo, du code ou de la musique, à partir
          d'une simple instruction en langage naturel (un « prompt »).
        </p>
        <p className="text-slate-300">
          ChatGPT, Claude, Midjourney ou Suno sont des IA génératives. C'est
          cette catégorie qui a rendu l'intelligence artificielle grand
          public : plus besoin d'être développeur pour l'utiliser, un simple
          message suffit.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">
          Avantages et inconvénients de l'intelligence artificielle
        </h2>
        <p className="mb-6 text-slate-300">
          Une définition honnête inclut aussi les limites. Voici un état des
          lieux équilibré.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="glass rounded-xl p-4">
            <h3 className="mb-2 font-semibold text-slate-100">Avantages</h3>
            <ul className="flex flex-col gap-2 text-sm text-slate-300">
              <li>
                <strong className="text-white">Gain de temps</strong> —
                automatiser des tâches répétitives (tri, rédaction de premier
                jet, réponses standards)
              </li>
              <li>
                <strong className="text-white">Disponibilité</strong> — un
                assistant IA répond à toute heure, sans jour de repos
              </li>
              <li>
                <strong className="text-white">
                  Analyse à grande échelle
                </strong>{" "}
                — traiter des volumes de données impossibles à parcourir
                manuellement
              </li>
              <li>
                <strong className="text-white">Accessibilité</strong> — des
                outils autrefois réservés aux grandes entreprises
                (traduction, création visuelle, analyse) sont aujourd'hui
                gratuits ou presque
              </li>
            </ul>
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="mb-2 font-semibold text-slate-100">
              Inconvénients
            </h3>
            <ul className="flex flex-col gap-2 text-sm text-slate-300">
              <li>
                <strong className="text-white">
                  Erreurs et approximations
                </strong>{" "}
                — une IA générative peut produire une réponse fausse avec
                assurance (on parle d'« hallucination »)
              </li>
              <li>
                <strong className="text-white">Biais</strong> — un système
                entraîné sur des données biaisées reproduit ces biais dans
                ses résultats
              </li>
              <li>
                <strong className="text-white">Dépendance</strong> — perdre
                le réflexe de vérifier ou de réfléchir soi-même
              </li>
              <li>
                <strong className="text-white">Impact sur l'emploi</strong> —
                certaines tâches répétitives sont amenées à être
                automatisées, ce qui demande d'adapter ses compétences
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">
          Pour aller plus loin
        </h2>
        <p className="mb-4 text-slate-300">
          Maintenant que la définition est claire, deux pistes concrètes :
        </p>
        <ul className="flex flex-col gap-3 text-slate-300">
          <li>
            <strong className="text-white">
              Tu veux essayer l'IA sans rien payer ?
            </strong>{" "}
            Consulte notre sélection{" "}
            <Link
              href="/guides/outils-ia-gratuits-francais-afrique"
              className="text-brand-300 hover:underline"
            >
              d'outils IA gratuits en français
            </Link>
            , classés par usage.
          </li>
          <li>
            <strong className="text-white">
              Tu veux développer une vraie compétence en IA ?
            </strong>{" "}
            Notre guide{" "}
            <Link
              href="/guides/se-former-ia-senegal"
              className="text-brand-300 hover:underline"
            >
              se former à l'IA au Sénégal
            </Link>{" "}
            recense les écoles, formations gratuites et débouchés.
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">Conclusion</h2>
        <p className="text-slate-300">
          L'intelligence artificielle, dans sa définition la plus simple,
          c'est un système informatique capable de déduire une réponse à
          partir de ce qu'on lui donne, plutôt que de suivre uniquement des
          règles fixes. Les institutions comme l'OCDE ou l'Union européenne
          encadrent cette définition avec plus de précision — autonomie,
          adaptabilité, capacité à produire un résultat — mais l'essentiel
          reste le même : ce n'est ni de la magie, ni une simple règle
          « si-alors ». C'est un outil, avec de vrais avantages et de vraies
          limites, qu'il vaut mieux comprendre avant de l'utiliser.
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
