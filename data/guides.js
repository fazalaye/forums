// Single source of truth for the guides library.
//
// The sitemap used to keep its own hand-written copy of this list, so every new
// guide silently shipped without a sitemap entry — three were missing when this
// was first noticed, and two more within a day. Both the /guides index and the
// sitemap now read from here, so adding a guide to this array is enough.
//
// Bump lastModified when you meaningfully edit a guide.
export const GUIDES = [
  {
    href: "/guides/definition-intelligence-artificielle",
    lastModified: "2026-08-10",
    title: "Qu'est-ce que l'intelligence artificielle ? Définition simple",
    description:
      "Définition claire de l'intelligence artificielle, avec les définitions officielles (OCDE, UE), des exemples concrets au quotidien, et les avantages et inconvénients.",
  },
  {
    href: "/guides/meilleurs-outils-ia-francophones-2026",
    lastModified: "2026-08-10",
    title: "Les 10 meilleurs outils IA en 2026 (comparatif francophone)",
    description:
      "Comparatif à jour des meilleurs outils d'intelligence artificielle en 2026 : ChatGPT, Claude, Midjourney, Perplexity et plus. Prix, usages et notes de la communauté PromptForums.",
  },
  {
    href: "/guides/meilleurs-prompts-chatgpt-2026",
    lastModified: "2026-08-10",
    title: "Les meilleurs prompts ChatGPT en 2026 (par catégorie)",
    description:
      "Les meilleurs prompts ChatGPT en français en 2026 : rédaction, marketing, code, productivité, apprentissage et images. Prêts à copier, mis à jour et testés par la communauté.",
  },
  {
    href: "/guides/meilleurs-prompts-claude",
    lastModified: "2026-09-26",
    title: "Les meilleurs prompts Claude en français (2026)",
    description:
      "Prompts Claude prêts à copier : CV, création de site web, PowerPoint, apprentissage d'une langue, étude de marché. Plus la technique des balises XML.",
    featuredCategory: "Prompts & outils",
    featuredExcerpt:
      "Retrouvez des prompts Claude en français pour le CV, les présentations, les sites web et l’apprentissage. Le guide explique aussi comment structurer une demande complexe avec des balises XML.",
    readingMinutes: 8,
    featuredImage: "/guide-assets/meilleurs-prompts-claude-card.svg",
    featuredImageAlt: "Illustration éditoriale des prompts Claude",
  },
  {
    href: "/guides/affiche-produit-chatgpt-etude-de-cas",
    lastModified: "2026-09-26",
    title: "Créer une affiche produit avec ChatGPT : étude de cas (2026)",
    description:
      "Comment j'ai transformé une photo produit fournisseur brute en affiche publicitaire professionnelle avec ChatGPT : la méthode, le prompt exact utilisé et le résultat avant/après.",
    featuredCategory: "Étude de cas",
    featuredExcerpt:
      "Découvrez le prompt et les étapes décrites pour transformer des visuels fournisseur en affiche produit. L’exemple porte sur un produit anti-cafards et rappelle de vérifier chaque caractéristique avant publication.",
    readingMinutes: 6,
    featuredImage: "/case-studies/anti-cafard-apres-affiche.png",
    featuredImageAlt: "Affiche produit créée dans l’étude de cas",
  },
  {
    href: "/guides/outils-ia-gratuits-francais-afrique",
    lastModified: "2026-08-10",
    title: "Outils IA gratuits en français pour l'Afrique (2026)",
    description:
      "Les meilleurs outils IA gratuits, sans carte bancaire et en français, pour entrepreneurs d'Afrique de l'Ouest. Testés, classés par usage. Mobile-first.",
  },
  {
    href: "/guides/nano-banana-prompts",
    lastModified: "2026-08-10",
    title: "Nano Banana : les meilleurs prompts en français (2026)",
    description:
      "Prompts Nano Banana prêts à copier : photo LinkedIn pro, photo CV, logo, retouche d'image. Comment accéder gratuitement à l'outil de Google.",
  },
  {
    href: "/guides/creer-business-plan-etude-marche-ia-afrique",
    lastModified: "2026-08-10",
    title: "Créer un business plan avec l'IA en Afrique (guide + prompts gratuits)",
    description:
      "Comment utiliser ChatGPT et l'IA gratuite pour créer un business plan, une étude de marché locale et une stratégie commerciale en Afrique. Prompts prêts à copier.",
  },
  {
    href: "/guides/cv-lettre-motivation-entretien-ia-afrique",
    lastModified: "2026-08-10",
    title: "CV, lettre de motivation, entretien : décroche un emploi avec l'IA",
    description:
      "Utilise ChatGPT gratuitement pour rédiger un CV percutant, une lettre de motivation convaincante et te préparer à l'entretien. Prompts prêts à copier pour le marché de l'emploi en Afrique.",
  },
  {
    href: "/guides/deepseek-avis-performances-limites-2026",
    lastModified: "2026-08-10",
    title: "DeepSeek : la vérité sur les performances du modèle chinois gratuit (2026)",
    description:
      "DeepSeek est-il vraiment gratuit ? Performances réelles face à ChatGPT, limites du quota gratuit et ce qui consomme le plus de ressources. Analyse honnête, sans chiffres inventés.",
  },
  {
    href: "/guides/ia-pronostics-foot-gratuit",
    lastModified: "2026-09-26",
    title: "Analyser un match de foot avec l'IA : méthodes, données et limites",
    description:
      "Quelles données ces modèles consomment, la loi de Poisson et les xG expliqués simplement, et un prompt pour mener l'analyse toi-même.",
    featuredCategory: "Analyse sportive",
    featuredExcerpt:
      "Comprenez les données et méthodes statistiques utilisées pour analyser un match, dont les xG et la loi de Poisson. Un prompt permet de structurer une analyse tout en gardant visibles ses limites et son incertitude.",
    readingMinutes: 10,
    featuredImage: "/guide-assets/ia-pronostics-foot-forebet.jpg",
    featuredImageAlt: "Exemple d’interface de statistiques football présentée dans le guide",
  },
  {
    href: "/guides/se-former-ia-senegal",
    lastModified: "2026-09-26",
    title: "Se former à l'IA au Sénégal : le guide complet 2026",
    description:
      "Formations, écoles, masters et ressources gratuites pour se former à l'intelligence artificielle au Sénégal. Débouchés, salaires et comment débuter sans budget.",
    featuredCategory: "Formation & carrière",
    featuredExcerpt:
      "Faites le point sur les parcours de formation en intelligence artificielle accessibles au Sénégal, des cursus aux ressources en ligne. Le guide présente aussi des pistes pour débuter et des débouchés à vérifier selon son profil.",
    readingMinutes: 12,
    featuredImage: "/guide-assets/se-former-ia-senegal-sonatel-academy.jpg",
    featuredImageAlt: "Ressource de formation IA au Sénégal présentée dans le guide",
  },
  {
    href: "/guides/strategies-nationales-ia-afrique-ouest",
    lastModified: "2026-08-10",
    title: "IA en Afrique de l'Ouest : les stratégies nationales en 2026",
    description:
      "Sénégal, Bénin, Mali, Côte d'Ivoire : où en sont les stratégies nationales d'intelligence artificielle en Afrique de l'Ouest francophone. Faits et chiffres vérifiés, sources officielles.",
  },
  {
    href: "/guides/creer-vendre-ebook-ia",
    lastModified: "2026-08-07",
    title: "Créer et vendre un ebook avec l'IA (guide 2026)",
    description:
      "Comment créer un ebook avec ChatGPT/Claude et Canva, où le vendre (Chariow, Système.io, Amazon KDP), paiement mobile money inclus. Fiscalité à vérifier.",
  },
];
