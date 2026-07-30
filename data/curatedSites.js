// 30 curated, real, well-known AI tools to insert into the Site collection.
// status: "approved", staffPick: true for all of them.
// Categories match data/categories.js slugs exactly:
// chatbots, ecriture, image, code, marketing, productivite, video, business

export const CURATED_SITES = [
  // --- chatbots ---
  {
    slug: "chatgpt",
    name: "ChatGPT",
    url: "https://chatgpt.com",
    description:
      "L'assistant conversationnel le plus utilisé au monde, développé par OpenAI : rédaction, code, analyse, recherche et génération d'images en une seule interface.",
    category: "chatbots",
    pricing: "freemium",
    priceLabel: "Gratuit, Plus dès 20 $/mois",
    logo: "💬",
    tags: ["OpenAI", "Assistant IA"],
  },
  {
    slug: "claude",
    name: "Claude",
    url: "https://claude.ai",
    description:
      "L'assistant IA d'Anthropic, réputé pour ses réponses nuancées et sa fiabilité sur les tâches longues : rédaction, analyse de documents et codage.",
    category: "chatbots",
    pricing: "freemium",
    priceLabel: "Gratuit, Pro dès 20 $/mois",
    logo: "🧠",
    tags: ["Anthropic", "Assistant IA"],
  },
  {
    slug: "gemini",
    name: "Gemini",
    url: "https://gemini.google.com",
    description:
      "L'assistant IA de Google, intégré à Search, Gmail et Workspace, avec une grande fenêtre de contexte pour analyser de longs documents.",
    category: "chatbots",
    pricing: "freemium",
    priceLabel: "Gratuit, Google AI Pro dès 21,99 €/mois",
    logo: "✨",
    tags: ["Google", "Assistant IA"],
  },
  {
    slug: "le-chat-mistral",
    name: "Le Chat (Mistral)",
    url: "https://chat.mistral.ai",
    description:
      "L'assistant conversationnel de la start-up française Mistral AI, rapide et disponible en plusieurs langues, avec un vrai souci de la confidentialité.",
    category: "chatbots",
    pricing: "freemium",
    priceLabel: "Gratuit, Pro dès 14,99 €/mois",
    logo: "🐱",
    tags: ["Mistral AI", "France"],
  },

  // --- ecriture ---
  {
    slug: "jasper",
    name: "Jasper",
    url: "https://www.jasper.ai",
    description:
      "Plateforme de rédaction IA pensée pour les équipes marketing : articles, publicités et contenus de marque cohérents à grande échelle.",
    category: "ecriture",
    pricing: "payant",
    priceLabel: "À partir de 39 $/mois",
    logo: "📝",
    tags: ["Marketing", "Rédaction"],
  },
  {
    slug: "copy-ai",
    name: "Copy.ai",
    url: "https://www.copy.ai",
    description:
      "Générateur de textes marketing et commerciaux (annonces, e-mails, posts) avec des workflows prêts à l'emploi pour les équipes go-to-market.",
    category: "ecriture",
    pricing: "freemium",
    priceLabel: "Gratuit, payant dès 36 $/mois",
    logo: "🤖",
    tags: ["Marketing", "Workflows"],
  },
  {
    slug: "grammarly",
    name: "Grammarly",
    url: "https://www.grammarly.com",
    description:
      "Correcteur et assistant de rédaction IA qui corrige l'orthographe, la grammaire et le ton en temps réel, dans le navigateur et les apps bureautiques.",
    category: "ecriture",
    pricing: "freemium",
    priceLabel: "Gratuit, Premium dès 12 $/mois",
    logo: "✅",
    tags: ["Correction", "Rédaction"],
  },
  {
    slug: "sudowrite",
    name: "Sudowrite",
    url: "https://www.sudowrite.com",
    description:
      "Assistant d'écriture pensé pour les auteurs de fiction : développement de personnages, réécriture de scènes et lutte contre la page blanche.",
    category: "ecriture",
    pricing: "payant",
    priceLabel: "À partir de 19 $/mois",
    logo: "🖋️",
    tags: ["Fiction", "Écriture créative"],
  },

  // --- image ---
  {
    slug: "midjourney",
    name: "Midjourney",
    url: "https://www.midjourney.com",
    description:
      "Référence de la génération d'images IA, reconnue pour son rendu artistique et photoréaliste, utilisable via Discord ou son interface web.",
    category: "image",
    pricing: "payant",
    priceLabel: "À partir de 10 $/mois",
    logo: "🎨",
    tags: ["Discord", "Art IA"],
  },
  {
    slug: "dall-e-3",
    name: "DALL·E 3",
    url: "https://openai.com/dall-e-3",
    description:
      "Le générateur d'images d'OpenAI, intégré directement à ChatGPT pour créer des visuels à partir d'une simple description texte.",
    category: "image",
    pricing: "freemium",
    priceLabel: "Inclus dans ChatGPT Plus (20 $/mois)",
    logo: "🖼️",
    tags: ["OpenAI", "Génération d'images"],
  },
  {
    slug: "ideogram",
    name: "Ideogram",
    url: "https://ideogram.ai",
    description:
      "Générateur d'images IA particulièrement doué pour intégrer du texte lisible et des typographies propres dans les visuels générés.",
    category: "image",
    pricing: "freemium",
    priceLabel: "Gratuit, payant dès 8 $/mois",
    logo: "🔤",
    tags: ["Typographie", "Génération d'images"],
  },
  {
    slug: "adobe-firefly",
    name: "Adobe Firefly",
    url: "https://firefly.adobe.com",
    description:
      "Le générateur d'images et d'effets d'Adobe, entraîné sur des contenus sous licence et intégré à Photoshop et Illustrator.",
    category: "image",
    pricing: "freemium",
    priceLabel: "Gratuit avec crédits, payant dès 4,99 $/mois",
    logo: "🔥",
    tags: ["Photoshop", "Adobe"],
  },

  // --- code ---
  {
    slug: "github-copilot",
    name: "GitHub Copilot",
    url: "https://github.com/features/copilot",
    description:
      "L'assistant de code IA le plus répandu, intégré à VS Code et aux principaux IDE, pour l'autocomplétion et la génération de fonctions.",
    category: "code",
    pricing: "freemium",
    priceLabel: "Gratuit limité, Pro dès 10 $/mois",
    logo: "🧑‍💻",
    tags: ["VS Code", "Autocomplétion"],
  },
  {
    slug: "cursor",
    name: "Cursor",
    url: "https://www.cursor.com",
    description:
      "Éditeur de code pensé autour de l'IA dès sa conception, avec édition multi-fichiers et agents capables de réaliser des tâches complexes.",
    category: "code",
    pricing: "freemium",
    priceLabel: "Gratuit, Pro dès 20 $/mois",
    logo: "⌨️",
    tags: ["IDE", "Agents"],
  },
  {
    slug: "replit-ai",
    name: "Replit AI",
    url: "https://replit.com/ai",
    description:
      "Environnement de développement en ligne avec un agent IA capable de créer et déployer une application complète à partir d'une simple description.",
    category: "code",
    pricing: "payant",
    priceLabel: "À partir de 25 $/mois",
    logo: "🧪",
    tags: ["Déploiement", "Agents"],
  },
  {
    slug: "v0-vercel",
    name: "v0 by Vercel",
    url: "https://v0.dev",
    description:
      "Génère des interfaces React/Next.js prêtes à l'emploi à partir d'une description ou d'une image, avec du code exportable directement.",
    category: "code",
    pricing: "freemium",
    priceLabel: "Gratuit, Premium dès 20 $/mois",
    logo: "▲",
    tags: ["React", "Next.js"],
  },

  // --- marketing ---
  {
    slug: "surfer-seo",
    name: "Surfer SEO",
    url: "https://surferseo.com",
    description:
      "Outil d'optimisation de contenu qui analyse les pages les mieux classées pour guider la rédaction SEO, avec un éditeur assisté par IA.",
    category: "marketing",
    pricing: "payant",
    priceLabel: "À partir de 89 $/mois",
    logo: "🏄",
    tags: ["SEO", "Contenu"],
  },
  {
    slug: "semrush",
    name: "Semrush",
    url: "https://www.semrush.com",
    description:
      "Suite marketing tout-en-un (SEO, contenu, publicité) qui intègre désormais des fonctionnalités IA pour la recherche de mots-clés et le brief éditorial.",
    category: "marketing",
    pricing: "payant",
    priceLabel: "À partir de 139,95 $/mois",
    logo: "📊",
    tags: ["SEO", "Suite marketing"],
  },
  {
    slug: "ocoya",
    name: "Ocoya",
    url: "https://www.ocoya.com",
    description:
      "Outil de gestion des réseaux sociaux qui génère légendes, visuels et calendriers de publication avec l'IA, pour les équipes marketing réduites.",
    category: "marketing",
    pricing: "freemium",
    priceLabel: "Gratuit limité, payant dès 15 $/mois",
    logo: "📅",
    tags: ["Réseaux sociaux", "Planification"],
  },
  {
    slug: "hubspot-ai",
    name: "HubSpot (IA marketing)",
    url: "https://www.hubspot.com/artificial-intelligence",
    description:
      "Fonctionnalités IA intégrées au CRM HubSpot pour générer du contenu marketing, résumer les échanges clients et automatiser des tâches commerciales.",
    category: "marketing",
    pricing: "freemium",
    priceLabel: "Gratuit, fonctions avancées incluses dans les forfaits payants",
    logo: "🎯",
    tags: ["CRM", "Marketing"],
  },

  // --- productivite ---
  {
    slug: "notion-ai",
    name: "Notion AI",
    url: "https://www.notion.so/product/ai",
    description:
      "Assistant IA intégré à Notion pour résumer des notes, rédiger des comptes rendus et interroger l'ensemble de son espace de travail.",
    category: "productivite",
    pricing: "payant",
    priceLabel: "À partir de 10 $/utilisateur/mois",
    logo: "🗒️",
    tags: ["Notion", "Notes"],
  },
  {
    slug: "zapier-ai",
    name: "Zapier (IA/Agents)",
    url: "https://zapier.com/ai",
    description:
      "Automatise des tâches entre des centaines d'applications, avec des agents IA capables de déclencher des workflows à partir d'instructions en langage naturel.",
    category: "productivite",
    pricing: "freemium",
    priceLabel: "Gratuit limité, payant dès 19,99 $/mois",
    logo: "⚡",
    tags: ["Automatisation", "Agents"],
  },
  {
    slug: "otter-ai",
    name: "Otter.ai",
    url: "https://otter.ai",
    description:
      "Transcrit et résume automatiquement réunions et appels, avec identification des intervenants et extraction des actions à suivre.",
    category: "productivite",
    pricing: "freemium",
    priceLabel: "Gratuit, Pro dès 16,99 $/mois",
    logo: "🦦",
    tags: ["Transcription", "Réunions"],
  },

  // --- video ---
  {
    slug: "runway",
    name: "Runway",
    url: "https://runwayml.com",
    description:
      "Suite de génération et d'édition vidéo par IA (texte-vers-vidéo, effets, montage), utilisée aussi bien par des créateurs indépendants que des studios.",
    category: "video",
    pricing: "freemium",
    priceLabel: "Gratuit limité, payant dès 12 $/mois",
    logo: "🎬",
    tags: ["Vidéo", "Texte-vers-vidéo"],
  },
  {
    slug: "elevenlabs",
    name: "ElevenLabs",
    url: "https://elevenlabs.io",
    description:
      "Synthèse vocale et clonage de voix parmi les plus réalistes du marché, utilisés pour le doublage, les podcasts et les voix off.",
    category: "video",
    pricing: "freemium",
    priceLabel: "Gratuit limité, payant dès 5 $/mois",
    logo: "🔊",
    tags: ["Voix", "TTS"],
  },
  {
    slug: "heygen",
    name: "HeyGen",
    url: "https://www.heygen.com",
    description:
      "Génère des vidéos avec avatars IA parlants à partir d'un simple script texte, dans de nombreuses langues, pour la formation et le marketing.",
    category: "video",
    pricing: "payant",
    priceLabel: "À partir de 29 $/mois",
    logo: "🎭",
    tags: ["Avatars", "Formation"],
  },
  {
    slug: "synthesia",
    name: "Synthesia",
    url: "https://www.synthesia.io",
    description:
      "Plateforme de vidéos avec avatars IA orientée entreprise, très utilisée pour la formation interne et les vidéos produit multilingues.",
    category: "video",
    pricing: "payant",
    priceLabel: "À partir de 29 $/mois",
    logo: "🎥",
    tags: ["Avatars", "Entreprise"],
  },

  // --- business ---
  {
    slug: "perplexity",
    name: "Perplexity",
    url: "https://www.perplexity.ai",
    description:
      "Moteur de recherche conversationnel qui répond aux questions avec des sources citées en temps réel, pensé comme alternative à la recherche classique.",
    category: "business",
    pricing: "freemium",
    priceLabel: "Gratuit, Pro dès 20 $/mois",
    logo: "🔎",
    tags: ["Recherche", "Sources citées"],
  },
  {
    slug: "gamma",
    name: "Gamma",
    url: "https://gamma.app",
    description:
      "Génère des présentations, documents et pages web soignés à partir d'un simple texte ou plan, sans mise en page manuelle.",
    category: "business",
    pricing: "freemium",
    priceLabel: "Gratuit limité, payant dès 10 $/mois",
    logo: "📽️",
    tags: ["Présentations", "Pitch decks"],
  },
  {
    slug: "clay",
    name: "Clay",
    url: "https://www.clay.com",
    description:
      "Plateforme de prospection commerciale qui enrichit des listes de contacts et personnalise l'approche commerciale à grande échelle grâce à l'IA.",
    category: "business",
    pricing: "payant",
    priceLabel: "À partir de 149 $/mois",
    logo: "🧱",
    tags: ["Prospection", "Sales"],
  },

  // --- 10 outils supplémentaires (guide Afrique de l'Ouest) ---
  {
    slug: "deepseek",
    name: "DeepSeek",
    url: "https://www.deepseek.com",
    description:
      "Modèle IA chinois open-weight très performant en raisonnement et en code, avec une interface de chat gratuite et une API à très bas coût.",
    category: "chatbots",
    pricing: "freemium",
    priceLabel: "Gratuit, API à très bas coût",
    logo: "🐋",
    tags: ["Open source", "Raisonnement"],
  },
  {
    slug: "leonardo-ai",
    name: "Leonardo.ai",
    url: "https://leonardo.ai",
    description:
      "Générateur d'images IA avec des crédits gratuits quotidiens, réputé pour ses styles artistiques et ses modèles affinés par la communauté.",
    category: "image",
    pricing: "freemium",
    priceLabel: "Gratuit (crédits quotidiens), payant dès 10 $/mois",
    logo: "🦁",
    tags: ["Art IA", "Styles"],
  },
  {
    slug: "bing-image-creator",
    name: "Bing Image Creator",
    url: "https://www.bing.com/images/create",
    description:
      "Génère des images gratuitement via le modèle DALL·E d'OpenAI, intégré à Bing et accessible avec un simple compte Microsoft.",
    category: "image",
    pricing: "gratuit",
    priceLabel: "Gratuit",
    logo: "🅱️",
    tags: ["Microsoft", "DALL·E"],
  },
  {
    slug: "canva",
    name: "Canva",
    url: "https://www.canva.com",
    description:
      "Éditeur graphique tout-en-un avec des fonctions IA intégrées (détourage, génération d'images, redimensionnement automatique), très populaire pour les visuels de réseaux sociaux et e-commerce.",
    category: "image",
    pricing: "freemium",
    priceLabel: "Gratuit, Pro dès 12,99 $/mois",
    logo: "🎨",
    tags: ["Design", "Réseaux sociaux"],
  },
  {
    slug: "capcut",
    name: "CapCut",
    url: "https://www.capcut.com",
    description:
      "Application de montage vidéo mobile-first, gratuite, avec sous-titres automatiques et effets IA — la référence pour les vidéos verticales TikTok et Reels.",
    category: "video",
    pricing: "freemium",
    priceLabel: "Gratuit, Pro dès 7,99 $/mois",
    logo: "✂️",
    tags: ["Montage vidéo", "Mobile"],
  },
  {
    slug: "suno",
    name: "Suno",
    url: "https://suno.com",
    description:
      "Génère des chansons et jingles complets, avec paroles et musique, à partir d'une simple description texte.",
    category: "video",
    pricing: "freemium",
    priceLabel: "Gratuit limité, Pro dès 10 $/mois",
    logo: "🎵",
    tags: ["Musique", "Génération audio"],
  },
  {
    slug: "kling-ai",
    name: "Kling AI",
    url: "https://klingai.com",
    description:
      "Génération de vidéo par IA à partir de texte ou d'image, avec un rendu réaliste, développé par Kuaishou.",
    category: "video",
    pricing: "freemium",
    priceLabel: "Gratuit limité, payant dès 10 $/mois",
    logo: "🌀",
    tags: ["Texte-vers-vidéo", "Génération vidéo"],
  },
  {
    slug: "notebooklm",
    name: "NotebookLM",
    url: "https://notebooklm.google.com",
    description:
      "Outil de recherche de Google qui résume vos documents et répond à vos questions en se basant uniquement sur les sources que vous lui fournissez.",
    category: "productivite",
    pricing: "gratuit",
    priceLabel: "Gratuit",
    logo: "📔",
    tags: ["Google", "Recherche documentaire"],
  },
  {
    slug: "make",
    name: "Make",
    url: "https://www.make.com",
    description:
      "Plateforme d'automatisation visuelle qui connecte vos applications et déclenche des actions sans code, avec un généreux quota gratuit.",
    category: "productivite",
    pricing: "freemium",
    priceLabel: "Gratuit (1 000 opérations/mois), payant dès 9 $/mois",
    logo: "🔗",
    tags: ["Automatisation", "No-code"],
  },
  {
    slug: "google-ai-studio",
    name: "Google AI Studio",
    url: "https://aistudio.google.com",
    description:
      "Interface gratuite de Google pour tester et développer avec l'API Gemini, sans carte bancaire, avec un quota gratuit généreux.",
    category: "code",
    pricing: "gratuit",
    priceLabel: "Gratuit",
    logo: "🧪",
    tags: ["API", "Gemini"],
  },
];
