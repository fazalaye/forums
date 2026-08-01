import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import CopyPromptButton from "@/components/CopyPromptButton";
import { faqSchema, breadcrumbSchema, SITE_URL } from "@/lib/seo";

export const metadata = {
  title: "Créer une affiche produit avec ChatGPT : étude de cas (2026)",
  description:
    "Comment j'ai transformé une photo produit fournisseur brute en affiche publicitaire professionnelle avec ChatGPT : la méthode, le prompt exact utilisé et le résultat avant/après.",
  alternates: {
    canonical: `${SITE_URL}/guides/affiche-produit-chatgpt-etude-de-cas`,
  },
};

const PROS = [
  {
    title: "Pas de studio photo ni de graphiste",
    text: "le rendu visuel est généré directement à partir des photos existantes.",
  },
  {
    title: "Localisation immédiate",
    text: "le contenu en anglais ou en chinois est traduit et reformulé en français, adapté à un public francophone.",
  },
  {
    title: "Itération rapide",
    text: "les ajustements (couleurs, taille du titre, mise en page) se font par retouches ciblées en quelques échanges, pas en jours d'allers-retours.",
  },
  {
    title: "Réutilisable pour tout produit physique",
    text: "la même méthode fonctionne pour n'importe quelle catégorie : cosmétique, gadget, accessoire, alimentaire, etc.",
  },
];

const STEPS = [
  "Rassemblez vos visuels de départ (packaging, fiche fournisseur, photos brutes).",
  "Envoyez ces photos à ChatGPT avec le prompt ci-dessus, en remplaçant « anti cafard » par votre produit.",
  "Vérifiez que les bénéfices affichés correspondent bien à la réalité du produit — ChatGPT reformule, mais c'est à vous de valider l'exactitude.",
  "Itérez avec des retouches ciblées (« agrandis le titre », « change la couleur en vert plus foncé », « remplace la photo par... ») plutôt que de tout redemander depuis zéro.",
  "Exportez en haute résolution et vérifiez la lisibilité sur mobile avant de publier.",
];

const FAQ = [
  {
    q: "Faut-il un abonnement payant à ChatGPT pour générer ce type d'image ?",
    a: "Oui, la génération d'images par ChatGPT nécessite un abonnement payant (Plus ou supérieur) avec la génération d'images activée.",
  },
  {
    q: "Peut-on utiliser ses propres photos produit comme base ?",
    a: "Oui, c'est même recommandé : partez de vos vraies photos fournisseur ou packaging pour que le résultat reste fidèle à votre produit réel.",
  },
  {
    q: "Cette méthode fonctionne-t-elle pour d'autres catégories de produits ?",
    a: "Oui, le même prompt s'adapte à n'importe quel produit physique — cosmétique, gadget, accessoire, alimentaire — il suffit de remplacer le nom du produit dans le prompt.",
  },
  {
    q: "Combien d'itérations faut-il en général ?",
    a: "Prévoyez plusieurs allers-retours avec des retouches ciblées plutôt qu'un seul prompt parfait du premier coup — c'est normal et ça fait partie du processus créatif.",
  },
];

const PROMPT_TEXT = `[Anti cafard]

Créez une image premium et une infographie publicitaire percutante pour un produit anti cafard dans un style e-commerce éditorial moderne. Mettez le produit en valeur, en l'occupant de 45 à 60 % de l'image. Présentez-le naturellement, en fonction de sa catégorie (tenu, porté, exposé, installé ou en utilisation), avec une perspective cinématographique et une faible profondeur de champ qui préserve la netteté du produit tout en floutant légèrement l'environnement. Intégrez un mannequin professionnel dont le style de vie correspond naturellement à la catégorie du produit, au public cible et à l'image de marque. Le mannequin doit interagir avec le produit de manière réaliste et dégager confiance, accessibilité et authenticité. Adaptez automatiquement l'âge, les vêtements, le style, l'expression et l'environnement du mannequin au produit. Générez un arrière-plan premium adapté à la catégorie du produit (studio, bureau, maison, salle de sport, intérieur de luxe, automobile, extérieur, café, console de jeux, etc.). Ajoutez des versions flottantes subtiles du même produit, un bokeh doux, des fuites de lumière, des reflets et une profondeur atmosphérique pour créer un rendu publicitaire soigné sans détourner l'attention du produit principal. Utilisez une mise en page éditoriale épurée avec une typographie surdimensionnée sur fond semi-transparent affichant la catégorie du produit. Placez anti cafard en évidence en haut avec un slogan court et percutant. Générez automatiquement 4 à 6 encadrés présentant les caractéristiques pertinentes, accompagnés d'icônes élégantes en fonction de la catégorie du produit. N'incluez que les spécifications utiles au produit ; n'affichez jamais de caractéristiques non pertinentes. Utilisez une palette de couleurs haut de gamme, inspirée du produit et de son identité visuelle, pour une harmonie visuelle parfaite. Conservez un espacement équilibré, une typographie raffinée et une esthétique luxueuse et épurée. Style photographique : Photographie de produit commerciale, objectif macro 85 mm, perspective légèrement en contre-plongée, éclairage studio doux à trois points, très faible profondeur de champ, reflets de qualité, matériaux hyperréalistes, détails nets, étalonnage des couleurs naturel. Style graphique : Qualité des keynotes d'Apple, esthétique des campagnes Nike, présentation de lancement Samsung, éditorial de luxe moderne, publicité e-commerce haut de gamme, minimaliste et percutant, composition digne d'un magazine. Qualité d'impression : Ultra-réaliste, photoréaliste, 8K, HDR, netteté impeccable, publicité professionnelle, graphisme épuré, visuel saisissant, visuel commercial haut de gamme. Format 4:5`;

const BREADCRUMB_ITEMS = [
  { name: "Accueil", url: SITE_URL },
  { name: "Guides", url: `${SITE_URL}/guides` },
  {
    name: "Créer une affiche produit avec ChatGPT : étude de cas (2026)",
    url: `${SITE_URL}/guides/affiche-produit-chatgpt-etude-de-cas`,
  },
];

export default function CaseStudyPage() {
  return (
    <article className="mx-auto max-w-3xl">
      <JsonLd data={faqSchema(FAQ)} />
      <JsonLd data={breadcrumbSchema(BREADCRUMB_ITEMS)} />

      <Breadcrumbs items={BREADCRUMB_ITEMS} />
      <p className="mb-3 text-sm text-slate-400">
        Étude de cas · Prompt image
      </p>
      <h1 className="mb-4 text-4xl font-extrabold leading-tight">
        J'ai transformé une photo produit brute en affiche publicitaire pro
        avec ChatGPT
      </h1>
      <p className="mb-10 text-lg text-slate-300">
        Je vends parfois des produits en petite quantité en indépendant, et
        comme beaucoup, je pars souvent d'une photo fournisseur toute simple
        — le genre de visuel qu'on trouve chez un fabricant ou sur une
        marketplace B2B, avec un texte en anglais ou en chinois, aucune mise
        en page, et zéro storytelling. Plutôt que de payer un studio photo ou
        un·e graphiste, j'ai testé ChatGPT pour transformer une de ces photos
        brutes en véritable affiche publicitaire, prête à être utilisée.
        Voici le résultat, la méthode, et le prompt exact que j'ai utilisé —
        à adapter à votre propre produit.
      </p>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">
          Le point de départ : deux visuels fournisseur basiques
        </h2>
        <p className="mb-6 text-slate-300">
          Je suis parti de deux images fournies par le fabricant : une photo
          du packaging (texte en chinois, rendu plat) et une infographie
          générique en anglais présentant les caractéristiques du produit.
          Rien de vendeur, rien d'adapté au marché francophone.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <figure>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/case-studies/anti-cafard-avant-packaging.png"
              alt="Avant — photo packaging fournisseur (texte en chinois)"
              className="w-full rounded-2xl border border-white/10"
            />
            <figcaption className="mt-2 text-center text-sm text-slate-400">
              Avant — photo packaging fournisseur (texte en chinois)
            </figcaption>
          </figure>
          <figure>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/case-studies/anti-cafard-avant-infographie.png"
              alt="Avant — infographie fournisseur générique (en anglais)"
              className="w-full rounded-2xl border border-white/10"
            />
            <figcaption className="mt-2 text-center text-sm text-slate-400">
              Avant — infographie fournisseur générique (en anglais)
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">
          Le résultat obtenu avec ChatGPT
        </h2>
        <p className="mb-6 text-slate-300">
          En quelques échanges avec ChatGPT, à partir de ces deux images,
          j'ai obtenu une affiche publicitaire complète, en français, avec un
          titre accrocheur, six bénéfices clés reformulés et illustrés par
          des icônes, une mise en scène du produit dans un contexte réel
          (une personne qui l'utilise dans une cuisine), un badge de
          confiance et un rappel du contenu du pack. Le tout dans un style
          premium cohérent, prêt pour une fiche produit e-commerce ou une
          publicité réseaux sociaux.
        </p>
        <figure>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/case-studies/anti-cafard-apres-affiche.png"
            alt="Après — affiche générée avec ChatGPT à partir des deux visuels fournisseur"
            className="w-full rounded-2xl border border-white/10"
          />
          <figcaption className="mt-2 text-center text-sm text-slate-400">
            Après — affiche générée avec ChatGPT à partir des deux visuels
            fournisseur
          </figcaption>
        </figure>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">
          Pourquoi ça change la donne
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {PROS.map((item) => (
            <div key={item.title} className="glass rounded-xl p-4">
              <h3 className="mb-1 font-semibold text-slate-100">
                {item.title}
              </h3>
              <p className="text-sm text-slate-300">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">
          Le prompt exact que j'ai utilisé
        </h2>
        <p className="mb-6 text-slate-300">
          Voici le prompt tel quel, envoyé à ChatGPT avec les deux photos
          fournisseur en pièce jointe. Pour l'adapter à votre propre produit,
          remplacez « anti cafard » par le nom ou la catégorie de votre
          produit à chaque occurrence.
        </p>
        <div className="glass-card p-6">
          <div className="mb-3 flex justify-end">
            <CopyPromptButton text={PROMPT_TEXT} />
          </div>
          <pre className="whitespace-pre-wrap rounded-xl bg-black/30 p-5 font-sans text-slate-200">
            {PROMPT_TEXT}
          </pre>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">
          Les étapes pour reproduire ce résultat
        </h2>
        <ol className="list-decimal space-y-3 pl-5 text-slate-300">
          {STEPS.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
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
          👉 Envie de tester d'autres prompts image, ou de découvrir les
          meilleurs outils IA pour la génération visuelle ?
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
