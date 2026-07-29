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
  {
    _id: "seed-5",
    title: "Trouve ta niche en marketing d'affiliation (90 questions guidées)",
    content: `Tu es un mentor expert en marketing d'affiliation. Pose-moi ces questions par groupes de 5 maximum, attends ma réponse avant de continuer, puis à la fin propose-moi 3 niches d'affiliation concrètes basées sur mes réponses, avec pour chacune : le type d'audience, des exemples de programmes d'affiliation adaptés et le potentiel de revenu.

Questions :
1. De quels sujets peux-tu parler pendant des heures ?
2. Pour quelles compétences les gens te demandent-ils souvent de l'aide ?
3. Quels problèmes as-tu personnellement résolus ?
4. Quelles sont tes 5 principales forces ?
5. Sur quels sujets aimes-tu apprendre ?
6. Quel type de travail t'enthousiasme le plus ?
7. Qu'est-ce qui te frustre dans ton secteur ?
8. Avec quel type d'audience aimes-tu échanger ?
9. Qu'est-ce qui te vient naturellement ?
10. Que ferais-tu même sans être payé ?
11. Lesquelles de tes compétences peuvent être monétisées rapidement ?
12. Quelles compétences sont les plus demandées en ce moment ?
13. Peux-tu te spécialiser dans un domaine précis ?
14. Quel est ton style ou ta signature la plus forte ?
15. Peux-tu combiner 2 compétences pour créer une niche unique ?
16. Quelle compétence veux-tu maîtriser en profondeur ?
17. Quelle compétence a le moins de concurrence ?
18. Quelle compétence a le plus de valeur ?
19. Quelle compétence peux-tu enseigner aux autres ?
20. Quelle compétence résout un vrai problème business ?
21. Pour quels produits ou services les gens paient-ils activement ?
22. Quels secteurs connaissent une croissance rapide ?
23. Quels problèmes rencontrent les jeunes entreprises et créateurs ?
24. Quelles niches sont tendance en ce moment ?
25. De quoi les internautes se plaignent-ils souvent ?
26. Quelles niches sont saturées ?
27. Où se trouve un vide sur le marché ?
28. Quels secteurs ont besoin de meilleures recommandations produits ?
29. Quels types d'audiences manquent de bon contenu ?
30. Quels problèmes ne sont pas encore bien résolus ?
31. Qui veux-tu servir ?
32. Quelle tranche d'âge correspond à ton audience idéale ?
33. À quels secteurs appartient-elle ?
34. Quelles sont ses plus grandes difficultés ?
35. Qu'est-ce qu'elle valorise le plus ?
36. Quelles marques admire-t-elle ?
37. Où passe-t-elle son temps en ligne ?
38. À quel langage/style s'identifie-t-elle ?
39. Quelles émotions guident ses décisions d'achat ?
40. Quel budget a-t-elle ?
41. Cette niche est-elle prête à payer ?
42. Combien peux-tu gagner en commissions dans cette niche ?
43. Existe-t-il des produits à commission élevée (high-ticket) ?
44. Cette niche est-elle scalable ?
45. Peux-tu générer un revenu récurrent (abonnements, SaaS) ?
46. Y a-t-il une demande à long terme ?
47. Peux-tu recommander des offres complémentaires ?
48. Quelle est la valeur moyenne par vente ?
49. Le marché est-il très concurrentiel ?
50. Peux-tu évoluer dans cette niche ?
51. Comment te démarquer dans ta niche ?
52. Qu'est-ce qui rend ton approche différente ?
53. Peux-tu te spécialiser encore plus ?
54. Peux-tu cibler un problème précis ?
55. Quelle valeur unique peux-tu apporter ?
56. Quel style peut devenir ta signature ?
57. Peux-tu créer une nouvelle catégorie de contenu ?
58. Comment simplifier ton positionnement ?
59. Qu'est-ce qui pousse ton audience à te faire confiance ?
60. Quel est ton « avantage injuste » ?
61. Peux-tu obtenir ta première vente en 7 jours ?
62. Peux-tu tester cette niche avec 3 contenus ?
63. Quels retours reçois-tu ?
64. Les gens interagissent-ils avec ton contenu ?
65. Peux-tu construire un portfolio de contenu rapidement ?
66. Ton audience répond-elle à tes recommandations ?
67. Quels résultats peux-tu montrer ?
68. Résous-tu un vrai problème ?
69. Quelle preuve sociale peux-tu créer ?
70. Peux-tu t'améliorer grâce aux retours ?
71. Peux-tu créer du contenu sur cette niche quotidiennement ?
72. Sur quels sujets peux-tu publier ?
73. Peux-tu éduquer ton audience ?
74. Peux-tu montrer des études de cas ou des comparatifs ?
75. Peux-tu devenir une référence dans cette niche ?
76. Quelles plateformes conviennent le mieux à cette niche ?
77. Peux-tu générer des ventes grâce au contenu ?
78. Quel type de contenu fonctionne le mieux ?
79. Peux-tu instaurer la confiance rapidement ?
80. Peux-tu rester constant ?
81. Cette niche va-t-elle croître dans 5 ans ?
82. Peux-tu élargir tes recommandations plus tard ?
83. Peux-tu construire une équipe autour de ça ?
84. Peux-tu créer tes propres produits numériques ?
85. Peux-tu devenir expert dans ce domaine ?
86. Est-ce que tu aimeras toujours ça à long terme ?
87. Peux-tu construire une marque personnelle autour de ça ?
88. Peux-tu dominer une petite niche d'abord ?
89. Peux-tu passer à l'échelle mondiale ?
90. Cette niche correspond-elle à ta vision à long terme ?`,
    category: "marketing",
    tags: ["affiliation", "niche"],
    author: "Équipe PromptForums",
    upvotes: 0,
    comments: [],
    createdAt: "2026-07-29T09:00:00.000Z",
  },
  {
    _id: "seed-6",
    title: "Analyse un produit avant de le promouvoir en affiliation (100 questions)",
    content: `Tu es un analyste en marketing d'affiliation rigoureux. Voici un produit ou un programme d'affiliation que j'envisage de promouvoir : [NOM DU PRODUIT / LIEN]. Pose-moi ces questions par groupes de 5 maximum pour m'aider à l'évaluer, puis donne-moi un verdict final : vaut-il la peine d'être promu, et avec quel angle de contenu ?

Questions :
1. De quels problèmes les gens se plaignent-ils au quotidien dans ce domaine ?
2. Qu'est-ce qui frustre les utilisateurs dans les produits existants ?
3. Quelles tâches prennent trop de temps à mon audience ?
4. Qu'est-ce que les gens aimeraient voir simplifié ?
5. Quels produits ont une mauvaise expérience utilisateur ?
6. Avec quoi les débutants ont-ils du mal ?
7. Avec quoi les professionnels ont-ils du mal ?
8. Quels sont les points de friction courants dans ma niche ?
9. Pour quoi les gens cherchent-ils des solutions en ligne ?
10. Quels problèmes sont ignorés par les grandes marques ?
11. Ce produit résout-il un problème simple et réel ?
12. Existe-t-il un produit concurrent que je pourrais recommander à la place ?
13. Puis-je combiner deux offres complémentaires dans ma recommandation ?
14. Ce produit fait-il gagner du temps ?
15. Ce produit fait-il économiser de l'argent ?
16. Ce produit augmente-t-il la productivité ?
17. Ce produit simplifie-t-il le quotidien ?
18. Ce produit automatise-t-il des tâches ?
19. Ce produit améliore-t-il le confort ?
20. Ce produit stimule-t-il la créativité ?
21. Ce produit est-il tendance en ce moment ?
22. Se vend-il bien sur les plateformes e-commerce ?
23. Devient-il viral sur les réseaux sociaux ?
24. Cette niche se développe-t-elle rapidement ?
25. Les gens l'achètent-ils régulièrement ?
26. A-t-il d'excellents avis clients ?
27. A-t-il une forte demande mais peu d'offre ?
28. Ce secteur est-il en expansion ?
29. Résout-il un problème urgent ?
30. Est-il saisonnier ou intemporel ?
31. Qui va l'acheter ?
32. Quelle est sa tranche d'âge ?
33. Quels problèmes rencontre-t-il ?
34. Qu'est-ce qui le motive à acheter ?
35. Quel est son budget ?
36. Où fait-il ses achats ?
37. En quelles marques a-t-il confiance ?
38. Qu'est-ce qui influence ses décisions ?
39. Quelles émotions déclenchent l'achat ?
40. Quel style de vie a-t-il ?
41. Quel est le taux de commission proposé ?
42. Quel est le prix de vente du produit ?
43. Le programme d'affiliation est-il rentable pour un débutant ?
44. Puis-je promouvoir ce produit à grande échelle ?
45. Est-ce une offre haut de gamme ou d'entrée de gamme ?
46. Y a-t-il des achats répétés ou un abonnement récurrent ?
47. Puis-je recommander des produits complémentaires (bundle) ?
48. Quelle est la durée du cookie d'affiliation ?
49. Y a-t-il des frais ou conditions cachées dans le programme ?
50. Ce programme d'affiliation est-il viable à long terme ?
51. Qui sont les autres affiliés ou concurrents sur ce produit ?
52. Que font-ils bien dans leur promotion ?
53. Que font-ils mal ?
54. Quels sont leurs tarifs et offres promotionnelles ?
55. Quel est l'argument de vente unique du produit ?
56. Comment font-ils la promotion du produit ?
57. Quels avis les clients laissent-ils sur ce produit ?
58. De quoi les clients se plaignent-ils ?
59. Quels vides puis-je combler par rapport aux autres affiliés ?
60. Comment puis-je me différencier dans ma façon de le promouvoir ?
61. Comment la marque du produit peut-elle rassurer mes lecteurs ?
62. Quelle présentation (visuels, packshots) donnerait envie d'acheter ?
63. Quelles couleurs/visuels représentent le mieux ce produit ?
64. Quelles émotions la marque doit-elle évoquer dans mon contenu ?
65. Puis-je créer une impression de qualité premium autour du produit ?
66. Quelle identité visuelle utiliserai-je pour en parler ?
67. Comment une bonne expérience utilisateur du produit peut-elle rassurer l'acheteur ?
68. Qu'est-ce qui rend ce produit visuellement unique ?
69. Le storytelling peut-il renforcer ma recommandation ?
70. Comment ma présentation peut-elle augmenter la valeur perçue du produit ?
71. Puis-je tester la demande avant de créer du contenu dédié ?
72. Puis-je créer un contenu test simple (avis rapide) ?
73. Puis-je tester auprès d'une petite partie de mon audience ?
74. Quels retours est-ce que j'obtiens sur mes premières recommandations ?
75. Mon audience est-elle prête à acheter via mes liens ?
76. Puis-je proposer une offre spéciale ou un code promo à mon audience ?
77. Puis-je lancer des publicités pour tester l'intérêt ?
78. Puis-je créer une landing page ou une page ressources dédiée ?
79. Quelles métriques (clics, conversions) comptent le plus ?
80. Puis-je améliorer ma promotion grâce aux retours et aux statistiques ?
81. Est-ce un produit physique (gadget, accessoire) ?
82. Est-ce un produit numérique (ebook, formation, template) ?
83. Est-ce un outil SaaS ?
84. Est-ce une application mobile ?
85. Est-ce un service par abonnement ?
86. Est-ce une formation en ligne ?
87. Est-ce une ressource créative (template, kit graphique) ?
88. Est-ce un produit print-on-demand ?
89. Est-ce un article fait main ou sur mesure ?
90. Est-ce un outil propulsé par l'IA ?
91. Ce produit peut-il devenir viral ?
92. Des influenceurs peuvent-ils aussi le promouvoir ?
93. Puis-je construire une marque personnelle autour de cette recommandation ?
94. Puis-je élargir ma sélection de produits dans cette catégorie ?
95. Puis-je promouvoir ce produit à l'international ?
96. Puis-je automatiser le suivi de mes liens et commissions ?
97. Puis-je créer une communauté autour de mes recommandations ?
98. Puis-je générer des revenus récurrents avec ce programme ?
99. Existe-t-il un programme d'affiliation à plusieurs niveaux (parrainage) ?
100. Puis-je transformer cette activité en business durable ?`,
    category: "marketing",
    tags: ["affiliation", "produits"],
    author: "Équipe PromptForums",
    upvotes: 0,
    comments: [],
    createdAt: "2026-07-29T09:05:00.000Z",
  },
  {
    _id: "seed-7",
    title: "Choisis ta plateforme et ta stratégie d'affiliation (100 questions)",
    content: `Tu es un stratège en marketing d'affiliation spécialisé dans le choix de plateformes. Pose-moi ces questions par groupes de 5 maximum, puis recommande-moi la ou les plateformes les plus adaptées à mon profil, avec un plan d'action sur 30 jours pour démarrer.

Questions :
1. Quelle plateforme correspond le mieux à mes compétences ?
2. Où mon audience cible est-elle la plus active ?
3. Quelle plateforme correspond à mon style de contenu ?
4. Est-ce que je préfère la vidéo, le texte ou le visuel ?
5. Quelle plateforme est la plus simple pour démarrer ?
6. Où mes concurrents affiliés sont-ils actifs ?
7. Quelle plateforme a le moins de concurrence ?
8. Quelle plateforme offre une meilleure portée organique ?
9. Où puis-je grandir le plus vite ?
10. Quelle plateforme correspond à ma personnalité ?
11. Qui est mon audience cible ?
12. Où passe-t-elle le plus de temps en ligne ?
13. Quel type de contenu consomme-t-elle ?
14. Quels problèmes essaie-t-elle de résoudre ?
15. Quel langage/ton préfère-t-elle ?
16. À quelle heure est-elle la plus active ?
17. Quelles tendances suit-elle ?
18. Quel contenu capte son attention ?
19. Qu'est-ce qui la pousse à interagir ?
20. Qu'est-ce qui instaure la confiance avec elle ?
21. Instagram ou TikTok : lequel me convient le mieux ?
22. LinkedIn ou X (Twitter) pour ma marque personnelle ?
23. YouTube ou les plateformes de contenu court ?
24. Marketplace d'affiliation ou marque personnelle ?
25. Croissance organique ou publicité payante ?
26. Quelle plateforme convertit le mieux en ventes affiliées ?
27. Quelle plateforme construit l'autorité le plus vite ?
28. Quelle plateforme est la meilleure pour ma niche ?
29. Quelle plateforme convient le mieux au B2B ou au B2C ?
30. Quelle plateforme est pérenne selon moi ?
31. Quel type de contenu vais-je créer ?
32. Puis-je publier quotidiennement sur cette plateforme ?
33. Quel format fonctionne le mieux (reels, posts, threads) ?
34. Puis-je éduquer, divertir ou inspirer ?
35. Quel est le thème central de mon contenu ?
36. Puis-je recycler mon contenu sur d'autres formats ?
37. Quel angle narratif vais-je utiliser ?
38. Puis-je montrer les coulisses de mes tests produits ?
39. Qu'est-ce qui rend mon contenu unique ?
40. Puis-je créer un style reconnaissable ?
41. Comment passer de 0 à 1000 abonnés ?
42. Quelles stratégies aident à devenir viral ?
43. Comment collaborer avec d'autres créateurs ou marques ?
44. Puis-je exploiter les tendances du moment ?
45. Comment améliorer ma régularité de publication ?
46. Quels hashtags/mots-clés utiliser ?
47. Comment améliorer mon taux d'engagement ?
48. Quelles accroches captent l'attention ?
49. Comment retenir mon audience jusqu'au lien d'affiliation ?
50. Comment créer une dynamique de croissance ?
51. Comment vais-je monétiser cette plateforme ?
52. Puis-je attirer des clients directement vers mes liens ?
53. Puis-je vendre aussi mes propres produits numériques ?
54. Puis-je créer un tunnel de conversion pour mes recommandations ?
55. Comment utiliser le marketing d'affiliation efficacement sur cette plateforme ?
56. Puis-je créer du contenu premium pour les acheteurs les plus engagés ?
57. Puis-je créer une newsletter ou un abonnement autour de mes recommandations ?
58. Quelle est ma stratégie de divulgation des liens affiliés ?
59. Comment vais-je convertir mes abonnés en acheteurs ?
60. Puis-je proposer des offres complémentaires ?
61. Puis-je recycler mon contenu sur plusieurs plateformes ?
62. Comment faire de la promotion croisée entre mes canaux ?
63. Une plateforme peut-elle alimenter une autre (ex : YouTube vers blog) ?
64. Quelle est ma plateforme principale et laquelle est secondaire ?
65. Comment automatiser la publication de mon contenu ?
66. Puis-je créer du contenu en lots (batch) ?
67. Comment gagner du temps dans ma production de contenu ?
68. Quels outils puis-je utiliser pour gérer mes liens d'affiliation ?
69. Comment maintenir la régularité sur le long terme ?
70. Comment augmenter la production de contenu sans perdre en qualité ?
71. Quel contenu génère le plus de clics affiliés ?
72. Quelles métriques (CTR, conversions, EPC) comptent le plus ?
73. Comment tester de nouvelles idées de contenu ?
74. Quels retours est-ce que j'obtiens de mon audience ?
75. Qu'est-ce que je devrais arrêter de faire ?
76. Sur quoi devrais-je insister davantage ?
77. Comment améliorer ma portée organique ?
78. Comment améliorer mon taux de conversion affilié ?
79. Quelles expérimentations puis-je mener (A/B test de liens, CTA) ?
80. À quelle fréquence dois-je analyser mes résultats et commissions ?
81. Comment devenir un expert reconnu dans ma niche d'affiliation ?
82. Puis-je spécialiser davantage mon contenu ?
83. Quelle valeur est-ce que j'apporte au-delà du simple lien d'achat ?
84. Puis-je partager des comparatifs ou tests honnêtes ?
85. Puis-je enseigner à mon audience comment choisir un produit ?
86. Puis-je instaurer la confiance durablement grâce à la transparence ?
87. Qu'est-ce qui me différencie des autres affiliés de la même niche ?
88. Puis-je créer un style de contenu signature ?
89. Comment construire ma crédibilité auprès de mon audience ?
90. Puis-je devenir la référence incontournable de ma niche ?
91. Puis-je tenir sur cette plateforme pendant des années ?
92. Puis-je construire une marque personnelle autour de mes recommandations ?
93. Puis-je m'étendre à d'autres plateformes plus tard ?
94. Puis-je créer une communauté autour de mon contenu ?
95. Puis-je créer une vraie marque personnelle, pas juste un compte ?
96. Puis-je augmenter mes revenus d'affiliation grâce à ça ?
97. Puis-je m'adapter aux changements d'algorithme ?
98. Puis-je diversifier mes sources de trafic ?
99. Puis-je construire une liste email en parallèle de mes réseaux ?
100. Cette plateforme correspond-elle à ma vision à long terme ?`,
    category: "marketing",
    tags: ["affiliation", "réseaux sociaux"],
    author: "Équipe PromptForums",
    upvotes: 0,
    comments: [],
    createdAt: "2026-07-29T09:10:00.000Z",
  },
  {
    _id: "seed-8",
    title: "90 idées de contenu pour affiliés (avis, comparatifs, réseaux sociaux)",
    content: `Tu es un créateur de contenu spécialisé en marketing d'affiliation, plein d'idées. Voici ma niche : [MA NICHE]. Parcours cette liste d'angles de contenu et sélectionne les 10 plus pertinents pour moi, puis rédige un titre accrocheur en français pour chacun.

Idées de contenu :
1. Quel problème peux-tu résoudre aujourd'hui pour ton audience ?
2. Qu'as-tu appris récemment que tu pourrais partager ?
3. Quelle erreur as-tu commise dans tes débuts en affiliation ?
4. Quelle prise de conscience a changé ta façon de choisir tes produits ?
5. Qu'est-ce qui est tendance dans ta niche en ce moment ?
6. Quelle question te pose-t-on souvent sur tes recommandations ?
7. Quelle est une idée reçue courante sur ce produit/cette niche ?
8. Qu'est-ce que les débutants ignorent souvent ?
9. Quelle est ton opinion unique sur un produit populaire ?
10. Qu'est-ce que tu peux simplifier pour ton audience ?
11. Ton parcours en marketing d'affiliation.
12. Ta première vente affiliée.
13. Ton plus grand échec et la leçon apprise.
14. Comment tu as amélioré tes recommandations avec le temps.
15. Une histoire de produit qui t'a déçu.
16. Un moment déclic dans ta stratégie de contenu.
17. Ta routine quotidienne de création de contenu.
18. Une recommandation dont tu es fier/fière.
19. Un défi que tu as surmonté (trafic, conversions...).
20. Les coulisses de la création d'un article comparatif.
21. Enseigne un principe clé du marketing d'affiliation.
22. Explique les bases de la divulgation des liens affiliés.
23. Partage des conseils pour débutants en affiliation.
24. Décompose un concept complexe (SEO, tunnels de vente...) simplement.
25. Partage les outils que tu utilises pour suivre tes commissions.
26. Explique les erreurs courantes des affiliés débutants.
27. Montre un tutoriel étape par étape pour choisir un bon produit à promouvoir.
28. Partage des enseignements sur ta niche.
29. Explique les tendances actuelles du marketing d'affiliation.
30. Explique comment construire une audience qui achète via tes liens.
31. Partage 3 astuces rapides pour augmenter tes conversions.
32. Partage 5 erreurs à éviter en marketing d'affiliation.
33. Partage une checklist avant de recommander un produit.
34. Partage une méthode pour choisir tes produits d'affiliation.
35. Partage ton processus de rédaction d'un avis produit.
36. Partage une stratégie de contenu sur 30 jours.
37. Partage les choses à faire et à ne pas faire en affiliation.
38. Partage des astuces pour augmenter ton taux de clic.
39. Partage des ressources utiles pour les affiliés.
40. Partage une liste d'outils indispensables.
41. Partage ton avis tranché sur une tendance du secteur.
42. Sois d'accord ou pas avec une pratique courante du marketing d'affiliation.
43. Dénonce de mauvaises pratiques (spam de liens, faux avis).
44. Partage des vérités sur le métier d'affilié.
45. Prédis les tendances futures du marketing d'affiliation.
46. Partage ta philosophie sur les recommandations honnêtes.
47. Compare deux approches de promotion (organique vs payant).
48. Partage une opinion impopulaire sur un produit très recommandé.
49. Explique pourquoi un produit populaire est surestimé.
50. Explique ce qui fonctionne vraiment pour convertir en affiliation.
51. Crée des accroches virales pour tes recommandations.
52. Partage des questions engageantes pour ton audience.
53. Crée des posts auxquels ton audience peut s'identifier.
54. Utilise des légendes en storytelling pour présenter un produit.
55. Partage des idées de carrousels comparatifs.
56. Crée des idées de vidéos courtes « avis express ».
57. Recycle d'anciens contenus sur de nouveaux produits similaires.
58. Surfe sur les tendances pour présenter tes recommandations.
59. Utilise des memes liés à ta niche.
60. Partage des victoires rapides (première commission, etc.).
61. Montre les résultats obtenus grâce à un produit recommandé.
62. Partage des témoignages de ton audience.
63. Explique ta sélection de produits.
64. Montre ton processus de test et de sélection.
65. Partage des informations sur les commissions et remises.
66. Explique comment ton audience peut utiliser tes liens.
67. Montre des résultats de transformation grâce au produit.
68. Partage des success stories de personnes ayant suivi tes conseils.
69. Réponds aux questions fréquentes de ton audience.
70. Montre ton expertise sur ta niche.
71. Transforme un post en vidéo.
72. Transforme une vidéo en carrousel.
73. Transforme un thread en article de blog comparatif.
74. Transforme un article de blog en posts courts.
75. Découpe un guide long en plusieurs parties.
76. Mets à jour un ancien article de recommandation.
77. Repartage tes posts les plus performants.
78. Combine plusieurs avis produits en un comparatif complet.
79. Adapte un contenu dans un autre format.
80. Crée du contenu en série (ex : « Test de produit de la semaine »).
81. Planifie un calendrier de contenu sur 7 jours.
82. Planifie un défi de 30 jours autour d'une niche.
83. Crée du contenu en lots (batch).
84. Définis un calendrier de publication régulier.
85. Suis les performances de ton contenu et de tes liens.
86. Identifie le contenu qui génère le plus de conversions.
87. Mise davantage sur ce qui fonctionne.
88. Améliore le contenu qui convertit moins bien.
89. Expérimente de nouveaux formats de recommandation.
90. Reste constant, quoi qu'il arrive.`,
    category: "marketing",
    tags: ["affiliation", "contenu"],
    author: "Équipe PromptForums",
    upvotes: 0,
    comments: [],
    createdAt: "2026-07-29T09:15:00.000Z",
  },
  {
    _id: "seed-9",
    title: "Rédige une recommandation produit qui convertit (copywriting d'affiliation)",
    content: `Tu es un copywriter expert en marketing d'affiliation. Voici le produit que je veux recommander : [PRODUIT] et mon audience : [DESCRIPTION DE L'AUDIENCE]. Utilise les questions ci-dessous pour construire, étape par étape, un texte de recommandation (article, post ou email) qui convertit sans être insistant. Pose-moi d'abord les questions par groupes de 5, puis rédige le texte final.

Questions :
1. Qui est mon client idéal pour ce produit ?
2. Quel problème rencontre-t-il ?
3. Qu'est-ce qui l'empêche de dormir la nuit ?
4. Que veut-il vraiment obtenir ?
5. Quelles sont ses peurs avant d'acheter ?
6. Quelles objections a-t-il envers ce produit ?
7. Qu'est-ce qui le motive à acheter maintenant ?
8. Quel langage utilise-t-il pour décrire son problème ?
9. Qu'est-ce qu'il valorise le plus (prix, qualité, rapidité) ?
10. Quel résultat recherche-t-il vraiment ?
11. Quel problème ma recommandation résout-elle ?
12. Comment rendre ma recommandation plus claire ?
13. Qu'est-ce qui rend ce produit unique par rapport aux alternatives ?
14. Puis-je simplifier mon message de vente ?
15. Quels résultats concrets puis-je promettre (honnêtement) ?
16. Comment augmenter la valeur perçue du produit ?
17. Quels bonus ou contenus additionnels puis-je ajouter à ma recommandation ?
18. Puis-je créer une urgence légitime (offre limitée, stock) ?
19. Quelle garantie le vendeur offre-t-il ?
20. Pourquoi mon audience devrait-elle acheter via MON lien ?
21. Quel titre capte l'attention instantanément ?
22. Puis-je commencer par une affirmation forte ?
23. Puis-je poser une question percutante ?
24. Puis-je remettre en question une croyance sur ce produit ?
25. Puis-je jouer sur la curiosité ?
26. Puis-je utiliser des chiffres/données pour appuyer mon propos ?
27. Puis-je créer un contraste avant/après ?
28. Puis-je m'adresser directement à une audience précise ?
29. Puis-je mettre en avant un point de douleur ?
30. Puis-je promettre un bénéfice clair et honnête ?
31. Puis-je raconter une histoire à laquelle on s'identifie ?
32. Puis-je partager ma propre expérience avec le produit ?
33. Puis-je montrer une transformation concrète ?
34. Puis-je utiliser un contraste avant/après ?
35. Puis-je créer une connexion émotionnelle avec mon audience ?
36. Puis-je créer de la tension avant de révéler la solution ?
37. Puis-je résoudre clairement le problème posé ?
38. Puis-je montrer une preuve (capture, résultat, avis) ?
39. Puis-je rendre ma recommandation mémorable ?
40. Puis-je simplifier mon message pour qu'il soit compris en 3 secondes ?
41. Quel est mon appel à l'action ?
42. Mon lien d'affiliation est-il clairement mis en avant ?
43. Puis-je réduire les frictions avant le clic ?
44. Puis-je lever les objections dans mon contenu ?
45. Puis-je ajouter une preuve sociale (avis, nombre d'utilisateurs) ?
46. Puis-je montrer des résultats ou témoignages concrets ?
47. Puis-je créer une urgence honnête (offre limitée) ?
48. Puis-je mettre en avant la valeur plutôt que le prix ?
49. Puis-je simplifier le parcours d'achat pour mon audience ?
50. Puis-je relancer efficacement les indécis ?
51. Puis-je éduquer mon audience avant de recommander le produit ?
52. Puis-je donner de la valeur gratuite avant de vendre ?
53. Puis-je me positionner comme un expert de confiance dans ma niche ?
54. Puis-je partager des enseignements régulièrement, pas seulement des liens ?
55. Puis-je instaurer la confiance dans la durée avec mon audience ?
56. Puis-je créer du contenu qui attire naturellement des acheteurs ?
57. Puis-je vendre en douceur plutôt qu'avec insistance ?
58. Puis-je utiliser le storytelling pour présenter le produit ?
59. Puis-je transformer mon contenu en liste email/prospects ?
60. Puis-je rester constant dans ma stratégie de vente à long terme ?

Rappel important : indique toujours clairement à ton audience que le lien est un lien d'affiliation (mention obligatoire en France : "lien affilié" ou équivalent), et ne recommande que des produits que tu utiliserais ou testerais réellement.`,
    category: "marketing",
    tags: ["affiliation", "copywriting"],
    author: "Équipe PromptForums",
    upvotes: 0,
    comments: [],
    createdAt: "2026-07-29T09:20:00.000Z",
  },
];
