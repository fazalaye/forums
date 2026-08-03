# keyword-research-mcp

Agent de recherche de mots-clés **100 % gratuit**, en remplacement de Semrush/Ahrefs.
Serveur MCP : tu le branches sur Claude Desktop ou Claude Code, et Claude devient l'agent qui orchestre les outils.

Réglé par défaut sur **français / Sénégal**, avec des modificateurs géo (`fcfa`, `wave`, `orange money`, `sans carte bancaire`…) intégrés à l'expansion.

---

## Les 14 outils

**Google Autocomplete** — gratuit, aucune clé, aucun quota
| Outil | Ce qu'il fait |
|---|---|
| `keyword_suggest` | Suggestions brutes pour une requête |
| `keyword_expand` | Alphabet soup a–z + questions FR + modificateurs commerciaux + modificateurs géo. ~70 requêtes → plusieurs centaines de mots-clés longue traîne |
| `keyword_questions` | Uniquement les questions (plan d'article, FAQ) |

**Google Trends** — gratuit, aucune clé
| Outil | Ce qu'il fait |
|---|---|
| `trends_over_time` | Évolution 12 mois, détection hausse / baisse / émergent |
| `trends_by_region` | Où le terme est le plus cherché |
| `trends_related` | Requêtes associées + en forte hausse |

**Bing Webmaster Tools** — gratuit, clé API illimitée
| Outil | Ce qu'il fait |
|---|---|
| `bing_volume` | **Volumes mensuels chiffrés** — la seule source gratuite qui donne de vrais nombres |
| `bing_related` | Mots-clés associés avec impressions |

**Google Search Console** — gratuit, API officielle
| Outil | Ce qu'il fait |
|---|---|
| `gsc_sites` | Liste les sites accessibles |
| `gsc_queries` | Tes vraies requêtes Google : clics, impressions, CTR, position |
| `gsc_striking_distance` | Le filon : requêtes en position 4–20 triées par clics gagnables |

**Analyse locale** — aucun appel réseau
| Outil | Ce qu'il fait |
|---|---|
| `score_opportunities` | Score explicable : longue traîne + intention + ancrage géo + volume + tendance |
| `cluster_keywords` | Regroupement lexical par terme pivot |
| `full_research` | **Pipeline complet** : expansion → tendances → volumes → croisement GSC → scoring → clusters |

---

## Installation

```bash
cd keyword-research-mcp
npm install
```

Node 18+ requis (`fetch` natif).

### Claude Code

```bash
claude mcp add --transport stdio keyword-research \
  --env BING_WEBMASTER_API_KEY=ta_cle \
  --env GSC_CREDENTIALS_PATH=/chemin/vers/service-account.json \
  --env GSC_DEFAULT_SITE=sc-domain:promptforums.org \
  -- node /chemin/absolu/vers/keyword-research-mcp/index.js
```

Vérifie avec `claude mcp list`, puis `/mcp` dans une session.

> Si tu utilises nvm, mets le chemin absolu du binaire node (`which node`) : Claude Code lance les sous-processus dans un shell différent.

### Claude Desktop

Dans `claude_desktop_config.json` :

```json
{
  "mcpServers": {
    "keyword-research": {
      "command": "node",
      "args": ["/chemin/absolu/vers/keyword-research-mcp/index.js"],
      "env": {
        "BING_WEBMASTER_API_KEY": "ta_cle",
        "GSC_CREDENTIALS_PATH": "/chemin/vers/service-account.json",
        "GSC_DEFAULT_SITE": "sc-domain:promptforums.org"
      }
    }
  }
}
```

---

## Configuration des clés (les deux sont optionnelles)

Sans aucune clé, Autocomplete + Trends + scoring + clusters fonctionnent déjà. Les clés ajoutent les volumes chiffrés et tes données réelles.

### Bing Webmaster Tools → volumes chiffrés
1. bing.com/webmasters → ajoute et vérifie ton site
2. Paramètres → **Accès API** → générer une clé
3. `BING_WEBMASTER_API_KEY=...`

### Google Search Console → tes vraies requêtes
1. console.cloud.google.com → nouveau projet → activer **Search Console API**
2. Créer un **compte de service** → télécharger la clé JSON
3. Search Console → Paramètres → Utilisateurs → ajouter l'email du compte de service en **lecture seule**
4. `GSC_CREDENTIALS_PATH=/chemin/vers/cle.json`

Format du `siteUrl` : `sc-domain:promptforums.org` (propriété domaine) ou `https://promptforums.org/` (propriété préfixe).

---

## Utilisation

Tu parles simplement à Claude :

> « Fais une recherche de mots-clés complète sur "outils IA gratuits" pour promptforums.org »

Claude appelle `full_research`, puis croise avec `gsc_striking_distance` pour te sortir les gains rapides.

> « Quelles questions les gens se posent sur la facturation électronique au Sénégal ? »

`keyword_questions` → plan d'article prêt.

> « Compare "IA" et "intelligence artificielle" au Sénégal et en Côte d'Ivoire »

`trends_over_time` sur les deux geo.

---

## Ce que l'outil ne fait pas

- **Pas de difficulté de mot-clé réelle.** Le KD d'Ahrefs vient d'une base de backlinks à plusieurs millions de dollars. Le `score` ici est une heuristique explicable (longue traîne, intention, ancrage géo, volume, tendance) — il te dit *pourquoi* il classe comme ça. Pour un site jeune sur une niche peu concurrentielle, c'est suffisant pour prioriser.
- **Pas d'analyse de backlinks.** Utilise Ahrefs Webmaster Tools (gratuit sur ton propre site).
- **Pas de scraping du SERP Google.** Volontaire : c'est fragile et ça se fait bloquer. Les préfixes de questions dans `keyword_expand` approximent bien le bloc « Autres questions posées ».

## Notes techniques

- `google-trends-api` est un paquet non officiel. Si Google change son endpoint, les outils `trends_*` échouent proprement sans bloquer le reste du pipeline.
- L'expansion Autocomplete envoie ~70 requêtes par seed, par lots de 4 avec 120 ms de pause. Reste raisonnable pour éviter tout throttling.
- `full_research` est tolérant aux pannes : chaque source indisponible est signalée dans `notes` et le pipeline continue.
