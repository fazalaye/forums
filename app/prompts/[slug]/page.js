import Link from "next/link";
import { redirect, notFound } from "next/navigation";
import mongoose from "mongoose";
import { dbConnect } from "@/lib/mongodb";
import Prompt from "@/models/Prompt";
import { SEED_PROMPTS } from "@/data/prompts";
import { CATEGORIES } from "@/data/categories";
import CommentForm from "@/components/CommentForm";
import VoteButton from "@/components/VoteButton";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import CopyPromptButton from "@/components/CopyPromptButton";
import AdBanner from "@/components/AdBanner";
import { breadcrumbSchema, SITE_URL } from "@/lib/seo";

export const dynamic = "force-dynamic";

const MODEL_NAMES = [
  "ChatGPT",
  "Claude",
  "Midjourney",
  "DALL·E",
  "Gemini",
  "Stable Diffusion",
  "DeepSeek",
  "Copilot",
];

const CATEGORY_GUIDANCE = {
  chatbots: {
    purpose:
      "Pour un assistant conversationnel, précisez le rôle attendu, le contexte à connaître et le type de réponse qui vous sera le plus utile. Si la demande porte sur un sujet factuel ou sensible, demandez explicitement à l’outil de signaler ses incertitudes et les informations qu’il ne peut pas vérifier.",
    review:
      "Relisez la réponse en vérifiant qu’elle répond à la question posée, qu’elle distingue les faits des hypothèses et qu’elle ne présente pas une supposition comme une certitude. Pour une tâche longue, demandez d’abord une structure puis faites réviser chaque partie avec vos propres critères.",
  },
  ecriture: {
    purpose:
      "Pour un texte, ajoutez le public visé, le canal de publication, l’objectif et le ton souhaité. Les mots « professionnel » ou « engageant » restent vagues sans exemple : indiquez plutôt la longueur, le niveau de langue, les formulations à éviter et les éléments indispensables.",
    review:
      "Vérifiez les informations, les noms propres et les affirmations avant publication. Relisez aussi le texte à voix haute : corrigez les passages qui ne correspondent pas à votre voix, les répétitions et les formulations trop générales, puis ajoutez votre expérience ou vos sources.",
  },
  image: {
    purpose:
      "Pour une image, décrivez le sujet principal, son environnement, le cadrage, l’éclairage, le style et les éléments à exclure. Le résultat dépend de l’outil et de sa version ; une consigne textuelle ne garantit ni une composition précise ni la reproduction exacte d’un texte dans l’image.",
    review:
      "Examinez le visuel à taille réelle et contrôlez les détails importants : mains, textes, logos, proportions, couleurs et fidélité au produit. Ne publiez pas une caractéristique visuelle inventée comme une propriété réelle d’un produit ; comparez le rendu à une source fiable.",
  },
  code: {
    purpose:
      "Pour une tâche de développement, donnez le langage, le framework, la version si elle importe, le comportement attendu et un extrait minimal du problème. Retirez les mots de passe, jetons, données client et autres secrets avant de copier du code dans un service externe.",
    review:
      "Ne considérez pas une réponse comme vérifiée parce qu’elle semble plausible. Examinez les changements, exécutez les tests adaptés dans un environnement sûr et contrôlez les cas limites, dépendances et implications de sécurité avant d’intégrer le code.",
  },
  marketing: {
    purpose:
      "Pour le marketing ou le SEO, renseignez l’offre, le marché, le public, le canal et l’action souhaitée. Donnez les contraintes de marque et les preuves disponibles ; sans données de recherche ou de campagne, l’outil ne peut pas confirmer qu’un mot-clé, un chiffre ou une promesse convertira.",
    review:
      "Vérifiez chaque statistique et chaque promesse auprès de vos données ou d’une source originale. Contrôlez que le texte respecte votre marque, les règles de la plateforme et les obligations applicables, notamment pour les témoignages, les allégations commerciales et les contenus sponsorisés.",
  },
  productivite: {
    purpose:
      "Pour organiser une tâche, indiquez le résultat final, l’échéance, les ressources disponibles et les contraintes réelles. Distinguez ce qui est obligatoire de ce qui est souhaitable ; si une durée ou une priorité n’est qu’une estimation, demandez à l’outil de le signaler.",
    review:
      "Comparez le plan proposé à votre calendrier et à vos moyens. Corrigez les dépendances oubliées, découpez toute étape trop large et gardez une marge pour les imprévus ; une liste produite par un assistant ne connaît pas automatiquement votre disponibilité réelle.",
  },
  video: {
    purpose:
      "Pour la vidéo ou l’audio, précisez le format, la durée, le public, la plateforme, le matériel et le résultat attendu. Séparez les éléments de script, de voix et de montage afin de pouvoir vérifier ce que l’outil peut réellement produire.",
    review:
      "Écoutez ou visionnez le résultat complet avant de le partager. Contrôlez la synchronisation, les sous-titres, la prononciation des noms, les droits sur les voix et les médias utilisés, ainsi que les éventuels artefacts qui n’apparaissent pas dans un aperçu.",
  },
  business: {
    purpose:
      "Pour une décision d’entreprise, décrivez le secteur, la zone géographique, le client visé, les ressources et les hypothèses déjà vérifiées. Indiquez la devise et la période des estimations ; l’outil ne remplace ni une étude de terrain ni un conseil financier ou juridique.",
    review:
      "Traitez les projections comme des hypothèses à tester, pas comme des résultats garantis. Validez les coûts, prix, obligations locales et besoins des clients avec des sources ou des personnes concernées avant d’engager de l’argent ou de publier une prévision.",
  },
  emploi: {
    purpose:
      "Pour une candidature, donnez le poste, le secteur, l’offre et les éléments exacts de votre parcours que vous souhaitez valoriser. N’inventez ni diplôme, ni compétence, ni résultat chiffré ; anonymisez les coordonnées et les informations personnelles avant d’utiliser un service externe.",
    review:
      "Vérifiez que chaque affirmation correspond à votre expérience et que les mots-clés de l’offre sont utilisés honnêtement. Adaptez le document à l’employeur, relisez les dates et coordonnées, puis remplacez les formulations qui ne sonnent pas comme vous.",
  },
};

async function getPrompt(slugOrId) {
  const conn = await dbConnect();
  if (!conn) {
    const bySlug = SEED_PROMPTS.find((p) => p.slug === slugOrId);
    if (bySlug) return { doc: bySlug, redirectTo: null };
    const byId = SEED_PROMPTS.find((p) => p._id === slugOrId);
    if (byId) return { doc: byId, redirectTo: null };
    return null;
  }

  const bySlug = await Prompt.findOne({ slug: slugOrId }).lean();
  if (bySlug) return { doc: JSON.parse(JSON.stringify(bySlug)), redirectTo: null };

  if (mongoose.isValidObjectId(slugOrId)) {
    const byId = await Prompt.findById(slugOrId).lean();
    if (byId) {
      return {
        doc: JSON.parse(JSON.stringify(byId)),
        redirectTo: byId.slug || null,
      };
    }
  }

  return null;
}

function getContent(prompt) {
  return typeof prompt.content === "string" ? prompt.content.trim() : "";
}

function getVariables(content) {
  return [...new Set(content.match(/\[[^\]]+\]|\{[^}]+\}/g) || [])];
}

function getModelMentions(prompt, content) {
  const text = `${prompt.title || ""} ${content}`;
  return MODEL_NAMES.filter((name) =>
    new RegExp(name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i").test(text)
  );
}

async function getRelatedPrompts(prompt) {
  let databasePrompts = [];
  const conn = await dbConnect();
  if (conn) {
    databasePrompts = await Prompt.find({
      _id: { $ne: prompt._id },
    })
      .select("title slug category tags upvotes")
      .sort({ upvotes: -1, createdAt: -1 })
      .limit(60)
      .lean();
  }

  const candidates = [...databasePrompts, ...SEED_PROMPTS].filter(
    (candidate) =>
      candidate.title &&
      candidate.slug &&
      String(candidate._id) !== String(prompt._id) &&
      candidate.slug !== prompt.slug
  );
  const uniqueCandidates = [
    ...new Map(
      candidates.map((candidate) => [
        candidate.slug,
        { ...candidate, _id: String(candidate._id) },
      ])
    ).values(),
  ];
  const promptTags = new Set(
    (Array.isArray(prompt.tags) ? prompt.tags : []).map((tag) =>
      String(tag).toLowerCase()
    )
  );

  return uniqueCandidates
    .map((candidate) => {
      const sharedTags = (Array.isArray(candidate.tags) ? candidate.tags : [])
        .filter((tag) => promptTags.has(String(tag).toLowerCase()))
        .length;
      return {
        ...candidate,
        relevance:
          (candidate.category === prompt.category ? 10 : 0) + sharedTags * 3,
      };
    })
    .sort(
      (a, b) =>
        b.relevance - a.relevance ||
        (b.upvotes || 0) - (a.upvotes || 0) ||
        a.title.localeCompare(b.title, "fr")
    )
    .slice(0, 3);
}

export async function generateMetadata({ params }) {
  const result = await getPrompt(params.slug);
  if (!result || !result.doc) return { title: "Prompt introuvable" };
  const { doc } = result;
  const title = doc.title || "Prompt sans titre";
  const description =
    getContent(doc).slice(0, 150) ||
    `Consultez le prompt « ${title} » dans la bibliothèque PromptForums.`;
  const url = `${SITE_URL}/prompts/${doc.slug || doc._id}`;

  return {
    title,
    description,
    ...(getContent(doc)
      ? {}
      : {
          robots: {
            index: false,
            follow: true,
          },
        }),
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "PromptForums",
      locale: "fr_FR",
      type: "article",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function PromptDetailPage({ params }) {
  const result = await getPrompt(params.slug);
  if (!result || !result.doc) notFound();
  if (result.redirectTo) redirect(`/prompts/${result.redirectTo}`);
  const prompt = result.doc;
  const content = getContent(prompt);
  const variables = getVariables(content);
  const modelMentions = getModelMentions(prompt, content);
  const category = CATEGORIES.find((c) => c.slug === prompt.category);
  const categoryGuidance = CATEGORY_GUIDANCE[prompt.category] || {
    purpose:
      "Commencez par préciser l’objectif de cette demande, les informations de contexte utiles et les contraintes à respecter. Si la fiche ne nomme pas de modèle, le choix de l’outil reste à faire selon votre tâche, vos préférences de confidentialité et les fonctions disponibles.",
    review:
      "Comparez la réponse à votre demande initiale et vérifiez les faits, chiffres, noms et recommandations importants. Corrigez les éléments qui ne correspondent pas à votre situation et ne partagez pas de données confidentielles ou personnelles inutiles.",
  };
  const tags = Array.isArray(prompt.tags) ? prompt.tags : [];
  const comments = Array.isArray(prompt.comments) ? prompt.comments : [];
  const relatedPrompts = await getRelatedPrompts(prompt);
  const title = prompt.title || "Prompt sans titre";
  const author =
    typeof prompt.author === "string" && prompt.author.trim()
      ? prompt.author
      : "Auteur non renseigné";
  const promptUrl = `${SITE_URL}/prompts/${prompt.slug || prompt._id}`;

  const breadcrumbItems = [
    { name: "Accueil", url: SITE_URL },
    { name: "Prompts", url: `${SITE_URL}/prompts` },
    { name: title, url: promptUrl },
  ];

  return (
    <div className="mx-auto max-w-3xl">
      <JsonLd data={breadcrumbSchema(breadcrumbItems)} />
      <Breadcrumbs items={breadcrumbItems} />

      <article className="glass-card p-6 sm:p-8">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          {category ? (
            <span className="chip !cursor-default">
              {category.emoji} {category.label}
            </span>
          ) : (
            <span className="chip !cursor-default">Catégorie non précisée</span>
          )}
          <VoteButton promptId={prompt._id} initialUpvotes={prompt.upvotes || 0} />
        </div>

        <h1 className="mb-5 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
          {title}
        </h1>
        <div className="mb-6">
          <AdBanner slotId="prompt-detail-content" />
        </div>

        <dl className="mb-6 grid gap-3 rounded-xl border border-white/10 bg-black/20 p-4 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-slate-400">Auteur</dt>
            <dd className="mt-1 font-medium text-slate-200">{author}</dd>
          </div>
          <div>
            <dt className="text-slate-400">Modèle recommandé ou mentionné</dt>
            <dd className="mt-1 font-medium text-slate-200">
              {prompt.model || prompt.aiModel || "Non renseigné"}
              {!prompt.model &&
                !prompt.aiModel &&
                modelMentions.length > 0 && (
                  <span className="block text-xs font-normal text-slate-400">
                    Mention explicite dans le texte : {modelMentions.join(", ")}{" "}
                    (compatibilité non vérifiée)
                  </span>
                )}
            </dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-slate-400">Source</dt>
            <dd className="mt-1 font-medium text-slate-200">
              {prompt.source || prompt.sourceUrl
                ? prompt.source || prompt.sourceUrl
                : "Aucune source externe renseignée"}
            </dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="sr-only">Copier le prompt</dt>
            <dd className="mt-1">
                <CopyPromptButton text={content} />
            </dd>
          </div>
        </dl>

        <section className="mb-8">
          <h2 className="mb-3 text-xl font-bold text-white">
            Description &amp; contexte
          </h2>
          <p className="mb-3 text-slate-300">
            {category
              ? `Cette fiche appartient à la catégorie « ${category.label} » et présente une consigne à adapter avant utilisation.`
              : "Cette fiche ne comporte pas de catégorie reconnue ; l’objectif doit être déterminé à partir de son titre et de son texte."}{" "}
            Cette lecture éditoriale décrit le contenu enregistré. Elle ne
            rapporte pas un essai réalisé par PromptForums, ne garantit pas
            l’exactitude d’une réponse et ne remplace pas la vérification des
            informations produites.
          </p>
          <p className="mb-3 text-slate-300">{categoryGuidance.purpose}</p>
          <p className="mb-3 text-slate-300">
            Avant de copier la consigne, identifiez les éléments qui dépendent
            de votre situation : objectif, public, période, format ou limites.
            Les détails déjà présents dans le texte peuvent être conservés ;
            les exemples entre crochets ou accolades doivent être remplacés par
            des données exactes. Si la fiche ne fournit pas assez de contexte,
            complétez-la plutôt que de laisser l’assistant deviner.
          </p>
          {content ? (
            <blockquote className="border-l-2 border-brand-400 pl-4 text-sm leading-relaxed text-slate-300">
              {content.length > 320 ? `${content.slice(0, 320).trim()}…` : content}
            </blockquote>
          ) : (
            <p className="text-sm text-slate-400">
              Le texte du prompt n’est pas disponible dans les données de cette
              fiche.
            </p>
          )}
        </section>

        <section className="mb-8">
          <h2 className="mb-3 text-xl font-bold text-white">
            Structure du prompt &amp; variables
          </h2>
          <p className="mb-3 text-slate-300">
            Le bloc ci-dessous reproduit le contenu enregistré, sans lui
            attribuer de résultat attendu qui ne figure pas dans la fiche.
            Les champs repérés automatiquement sont indiqués plus haut ; cette
            détection est fondée sur leur forme entre crochets ou accolades et
            ne permet pas de savoir si chaque champ est obligatoire.
          </p>
          {variables.length > 0 ? (
            <>
              <p className="mb-2 text-sm font-semibold text-slate-200">
                Champs variables repérés dans le texte :
              </p>
              <ul className="mb-5 flex flex-wrap gap-2">
                {variables.map((variable) => (
                  <li
                    key={variable}
                    className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300"
                  >
                    {variable}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="mb-5 text-sm text-slate-400">
              Aucun champ variable entre crochets ou accolades n’a été repéré.
              Relisez le texte avant de l’utiliser pour vérifier s’il demande
              des informations à ajouter.
            </p>
          )}
          <div className="rounded-xl bg-black/30 p-4 sm:p-5">
            <pre className="whitespace-pre-wrap break-words font-sans text-sm leading-relaxed text-slate-200">
              {content || "Texte du prompt indisponible."}
            </pre>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 text-xl font-bold text-white">
            Exemples de résultats &amp; bonnes pratiques
          </h2>
          <p className="mb-4 text-sm text-slate-400">
            Aucun résultat de test n’est fourni avec cette fiche. La réponse
            dépendra du modèle, du contexte et des informations que vous
            ajouterez ; les conseils ci-dessous sont des repères de préparation
            et de vérification, pas des résultats observés.
          </p>
          {variables.length > 0 && (
            <div className="mb-4 rounded-xl border border-white/10 bg-black/20 p-4">
              <p className="mb-2 text-sm font-semibold text-slate-200">
                Exemple de préparation
              </p>
              <p className="text-sm text-slate-300">
                Avant l’envoi, remplacez {variables[0]} par l’information réelle
                dont vous disposez. Si cette donnée manque, indiquez-le plutôt
                que de demander au modèle de la deviner.
              </p>
              <p className="mt-3 text-sm text-slate-300">
                Pour chaque champ, préparez une réponse assez précise pour
                réduire les ambiguïtés : un rôle ou un intitulé exact, une
                période, une audience identifiable ou un extrait pertinent.
                N’ajoutez pas d’informations sensibles simplement pour rendre
                la demande plus détaillée. Lorsque vous ne connaissez pas une
                valeur, indiquez explicitement qu’elle est inconnue et demandez
                une réponse conditionnelle.
              </p>
            </div>
          )}
          <ul className="list-disc space-y-2 pl-5 text-sm text-slate-300">
            <li>
              Fournissez des informations utiles au besoin formulé et retirez
              toute donnée confidentielle ou personnelle inutile.
            </li>
            <li>
              Vérifiez les faits, chiffres et recommandations produits par
              l’outil avant de les réutiliser.
            </li>
            <li>
              Si le format de réponse n’est pas précisé dans le prompt,
              ajoutez-le selon votre usage (par exemple une liste ou des étapes).
            </li>
          </ul>
          <h3 className="mb-2 mt-6 text-lg font-semibold text-white">
            Examiner et améliorer la réponse
          </h3>
          <p className="mb-3 text-slate-300">{categoryGuidance.review}</p>
          <p className="text-slate-300">
            Pour une première réponse trop générale, ne relancez pas
            nécessairement la même demande à l’identique. Précisez l’élément
            manquant, demandez un format plus exploitable et faites corriger
            une partie à la fois. Conservez les éléments que vous avez
            vérifiés et écartez ceux qui ne répondent pas à votre objectif.
            Cette méthode d’itération est un conseil général ; la fiche ne
            contient pas de comparaison de versions ni de mesure de performance.
          </p>
        </section>

        {tags.length > 0 && (
          <ul aria-label="Étiquettes" className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-slate-300"
              >
                #{tag}
              </li>
            ))}
          </ul>
        )}
      </article>

      <section className="mt-10" aria-labelledby="related-prompts-title">
        <h2
          id="related-prompts-title"
          className="mb-4 text-xl font-bold text-white"
        >
          Ressources similaires
        </h2>
        {relatedPrompts.length > 0 ? (
          <ul className="grid gap-4 sm:grid-cols-3">
            {relatedPrompts.map((related) => {
              const relatedCategory = CATEGORIES.find(
                (item) => item.slug === related.category
              );
              return (
                <li key={related.slug} className="glass-card p-4">
                  {relatedCategory && (
                    <p className="mb-2 text-xs text-slate-400">
                      {relatedCategory.emoji} {relatedCategory.label}
                    </p>
                  )}
                  <Link
                    href={`/prompts/${encodeURIComponent(
                      related.slug || related._id
                    )}`}
                    className="font-semibold text-slate-100 hover:text-brand-200"
                  >
                    {related.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-sm text-slate-400">
            Aucune autre ressource similaire n’est disponible pour le moment.
          </p>
        )}
      </section>

      <section className="mt-10">
        <h2 className="mb-4 text-xl font-bold text-white">
          Commentaires ({comments.length})
        </h2>
        <div className="mb-6 flex flex-col gap-4">
          {comments.map((comment, index) => (
            <div
              key={comment._id || `${comment.author}-${index}`}
              className="glass rounded-xl p-4"
            >
              <p className="mb-1 text-sm font-semibold text-slate-200">
                {comment.author || "Auteur non renseigné"}
              </p>
              <p className="text-sm text-slate-300">{comment.body}</p>
            </div>
          ))}
          {comments.length === 0 && (
            <p className="text-sm text-slate-400">
              Aucun commentaire pour le moment. Soyez le premier à réagir !
            </p>
          )}
        </div>
        <CommentForm promptId={prompt._id} />
      </section>
    </div>
  );
}
