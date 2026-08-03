# PromptForums

Annuaire francophone des meilleurs sites, outils et prompts d'intelligence
artificielle, avec une section communautaire pour publier et commenter des
prompts. Construit avec Next.js 14 (App Router) et Tailwind CSS.

## Fonctionnalités

- **Annuaire de sites IA** — recherche en temps réel, filtres par catégorie,
  notation par étoiles, badges "Featured" pour les listings premium.
- **Monétisation intégrée** — bannière publicitaire, plans de listing
  gratuit/Featured, newsletter Premium (19€/mois), redirection `/out/[slug]`
  pour tracker les clics sortants (liens d'affiliation).
- **Prompts communautaires** — publication, recherche, commentaires ; auth
  requise pour contribuer.
- **Authentification** via NextAuth.js (Google, GitHub).
- **Persistance MongoDB/Mongoose**, avec repli automatique sur des données de
  démonstration si `MONGODB_URI` n'est pas configuré — le site reste
  utilisable sans base de données.
- Pages : Accueil, Prompts, Soumettre un site, Profil, Connexion, Contact,
  Mentions légales, Politique de confidentialité.
- UI glassmorphism responsive, SEO (métadonnées par page, Open Graph).

## Démarrage

```bash
npm install
cp .env.example .env.local   # configurez MONGODB_URI et les identifiants OAuth
npm run dev
```

Accédez à [http://localhost:3000](http://localhost:3000).

Sans configuration (`.env.local` absent), le site fonctionne en **mode
démo** : l'annuaire et les prompts affichent des données de démonstration, la
connexion et la persistance des soumissions/commentaires sont désactivées
jusqu'à ce que `MONGODB_URI` / les identifiants OAuth soient renseignés.

## Variables d'environnement

Voir `.env.example` : `MONGODB_URI`, `NEXTAUTH_URL`, `NEXTAUTH_SECRET`,
`GOOGLE_CLIENT_ID`/`GOOGLE_CLIENT_SECRET`, `GITHUB_CLIENT_ID`/`GITHUB_CLIENT_SECRET`.

## Serveur MCP — recherche de mots-clés (`index.js`)

`index.js` est un serveur **MCP** (Model Context Protocol) autonome, sans
dépendance, dédié à la recherche de mots-clés SEO en français (orientée outils
et prompts IA). Il aide à trouver des angles de contenu pour l'annuaire.

Enregistrement dans Claude Code :

```bash
claude mcp add --transport stdio keyword-research -- node $(pwd)/index.js
```

Test rapide, sans client MCP :

```bash
node index.js --selftest
```

### Outils exposés

| Outil | Description |
| --- | --- |
| `generate_keyword_ideas` | Étend un mot-clé racine en variations SEO françaises (questions, intention commerciale/transactionnelle, long-tail, vocabulaire IA). |
| `analyze_keyword` | Analyse d'un mot-clé : intention, type de contenu recommandé, fonctionnalités SERP probables. |
| `cluster_keywords` | Regroupe une liste de mots-clés en clusters thématiques avec mot-clé pilier. |
| `keyword_gap` | Mots-clés d'opportunité alignés sur les 9 catégories du site, avec la couverture actuelle de l'annuaire (lue depuis `data/`). |

> ⚠️ Les volumes, difficultés et CPC sont des **estimations heuristiques
> déterministes** (modèle interne stable pour un mot-clé donné), **pas** des
> données live d'un fournisseur SEO. Branchez une vraie API en remplaçant les
> fonctions de la section `METRICS` d'`index.js`.
