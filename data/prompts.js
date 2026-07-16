// Seed / demo data for the community prompts section, shown when no
// database is configured or while it is empty.
export const SEED_PROMPTS = [
  {
    _id: "seed-1",
    title: "Assistant de révision de code impitoyable",
    content:
      "Tu es un·e senior engineer qui relit ce code avec exigence. Liste uniquement les problèmes réels (bugs, failles de sécurité, edge cases manqués), classés par gravité. Ne complimente pas le code, ne reformule pas ce qu'il fait déjà bien. Voici le code :\n\n[COLLE TON CODE ICI]",
    category: "code",
    tags: ["review", "qualité"],
    author: "Yasmine K.",
    upvotes: 128,
    comments: [
      { author: "Marc D.", body: "Utilisé sur mon PR de la semaine dernière, ça a trouvé 3 bugs que j'avais loupés.", createdAt: "2026-06-02T10:00:00.000Z" },
    ],
    createdAt: "2026-05-20T09:00:00.000Z",
  },
  {
    _id: "seed-2",
    title: "Brief créatif Midjourney en 6 paramètres",
    content:
      "Génère un prompt Midjourney détaillé pour l'idée suivante : [SUJET]. Structure obligatoire : sujet principal, style artistique, éclairage, palette de couleurs, composition, paramètres techniques (--ar, --v, --style). Propose 3 variantes.",
    category: "image",
    tags: ["midjourney", "créatif"],
    author: "Thomas R.",
    upvotes: 94,
    comments: [],
    createdAt: "2026-05-22T14:30:00.000Z",
  },
  {
    _id: "seed-3",
    title: "Plan de contenu SEO en 30 jours",
    content:
      "Agis comme un·e stratège SEO. À partir du mot-clé principal [MOT-CLE] et de la cible [PERSONA], génère un calendrier éditorial de 30 jours avec pour chaque article : titre, intention de recherche, mots-clés secondaires, angle unique.",
    category: "marketing",
    tags: ["seo", "contenu"],
    author: "Sophie L.",
    upvotes: 76,
    comments: [],
    createdAt: "2026-05-25T08:15:00.000Z",
  },
  {
    _id: "seed-4",
    title: "Décomposeur de tâches pour chef de projet",
    content:
      "Voici un objectif de projet : [OBJECTIF]. Décompose-le en jalons, puis en tâches actionnables de moins de 4h chacune. Pour chaque tâche, indique une estimation de temps et les dépendances éventuelles.",
    category: "productivite",
    tags: ["gestion de projet"],
    author: "Karim B.",
    upvotes: 61,
    comments: [],
    createdAt: "2026-06-01T11:00:00.000Z",
  },
];
