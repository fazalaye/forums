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

## Serveur MCP — recherche de mots-clés (`keyword-research-mcp/`)

Le dossier [`keyword-research-mcp/`](./keyword-research-mcp/) contient un serveur
**MCP** (Model Context Protocol) de recherche de mots-clés SEO **100 % gratuit**,
réglé par défaut sur le **francophone ouest-africain** (fr / Sénégal, avec des
modificateurs géo : `fcfa`, `wave`, `orange money`…). Il branche Claude sur des
sources réelles et gratuites, sans remplacer Semrush/Ahrefs par un abonnement.

Il est **isolé de l'app Next.js** : ses propres dépendances (`package.json`
`type: module`) n'affectent pas celles du site. Voir son
[README dédié](./keyword-research-mcp/README.md) pour l'installation complète.

Enregistrement dans Claude Code (depuis la racine du repo) :

```bash
cd keyword-research-mcp && npm install && cd ..
claude mcp add --transport stdio keyword-research -- node $(pwd)/keyword-research-mcp/index.js
```

### Sources de données

| Source | Clé requise | Ce qu'elle apporte |
| --- | --- | --- |
| Google Autocomplete | aucune | Vocabulaire réel des internautes, expansion longue traîne |
| Google Trends | aucune | Évolution, régions, requêtes associées / émergentes |
| Bing Webmaster Tools | `BING_WEBMASTER_API_KEY` | **Volumes mensuels chiffrés** (seule source gratuite) |
| Google Search Console | `GSC_CREDENTIALS_PATH` | Tes **vraies requêtes** Google + gains rapides (position 4–20) |

Sans clé, l'expansion (Autocomplete), les tendances (Trends), le scoring et les
clusters fonctionnent déjà ; les clés ajoutent les volumes chiffrés et tes
données réelles. 14 outils au total, dont un pipeline `full_research` tolérant
aux pannes.

> ⚠️ Le score d'opportunité est une **heuristique explicable** (longue traîne,
> intention, ancrage géo, volume, tendance), **pas** un KD Ahrefs. Il indique
> *pourquoi* il priorise ainsi.
