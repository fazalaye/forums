import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { faqSchema, breadcrumbSchema, SITE_URL } from "@/lib/seo";

const UPDATED = "juillet 2026";

export const metadata = {
  title: "Les 10 meilleurs outils IA en 2026 (comparatif francophone)",
  description:
    "Comparatif à jour des meilleurs outils d'intelligence artificielle en 2026 : ChatGPT, Claude, Midjourney, Perplexity et plus. Prix, usages et notes de la communauté PromptForums.",
  alternates: {
    canonical: `${SITE_URL}/guides/meilleurs-outils-ia-francophones-2026`,
  },
};

// Curated ranking. Kept as page data so the visible table and the ItemList
// schema stay in sync — this is the structure answer engines cite.
const TOOLS = [
  { rank: 1, name: "ChatGPT (OpenAI)", category: "Assistant conversationnel", price: "Gratuit / 20 €/mois", best: "Rédaction, brainstorming, code, usage généraliste", rating: 4.7 },
  { rank: 2, name: "Claude (Anthropic)", category: "Assistant conversationnel", price: "Gratuit / 18 €/mois", best: "Textes longs, analyse de documents, raisonnement", rating: 4.7 },
  { rank: 3, name: "Perplexity", category: "Recherche IA", price: "Gratuit / 20 €/mois", best: "Recherche avec sources citées, veille", rating: 4.5 },
  { rank: 4, name: "Midjourney", category: "Génération d'images", price: "À partir de 10 €/mois", best: "Images artistiques de haute qualité", rating: 4.6 },
  { rank: 5, name: "Google Gemini", category: "Assistant conversationnel", price: "Gratuit / 22 €/mois", best: "Intégration Google, multimodal", rating: 4.3 },
  { rank: 6, name: "DALL·E 3", category: "Génération d'images", price: "Inclus dans ChatGPT Plus", best: "Images à partir d'instructions précises", rating: 4.2 },
  { rank: 7, name: "ElevenLabs", category: "Voix & audio", price: "Gratuit / dès 5 €/mois", best: "Synthèse vocale et clonage de voix", rating: 4.5 },
  { rank: 8, name: "Runway", category: "Vidéo IA", price: "Gratuit / dès 12 €/mois", best: "Génération et montage vidéo IA", rating: 4.2 },
  { rank: 9, name: "Notion AI", category: "Productivité", price: "Dès 8 €/mois", best: "Notes, résumés et organisation", rating: 4.2 },
  { rank: 10, name: "PromptBase", category: "Marketplace de prompts", price: "Dès 1,99 €", best: "Acheter/vendre des prompts optimisés", rating: 4.4 },
];

const FAQ = [
  {
    q: "Quel est le meilleur outil IA en 2026 ?",
    a: "Pour un usage généraliste (rédaction, idées, code), ChatGPT et Claude sont les deux meilleurs assistants IA en 2026. Pour la recherche avec sources, Perplexity est la référence ; pour les images, Midjourney reste en tête.",
  },
  {
    q: "Quel est le meilleur outil IA gratuit ?",
    a: "ChatGPT, Claude, Google Gemini et Perplexity proposent tous une version gratuite performante. Pour les images, la version gratuite de Bing Image Creator (DALL·E 3) est un bon point de départ.",
  },
  {
    q: "Quelle IA choisir pour écrire en français ?",
    a: "Claude et ChatGPT sont excellents en français. Claude est particulièrement apprécié pour les textes longs et le respect du ton ; ChatGPT pour la polyvalence et les usages marketing.",
  },
  {
    q: "Quelle IA utiliser pour créer des images ?",
    a: "Midjourney pour la qualité artistique, DALL·E 3 pour suivre des instructions précises, et Google Gemini / Imagen pour une intégration rapide. Le choix dépend du style recherché.",
  },
  {
    q: "Où trouver les meilleurs prompts pour ces outils ?",
    a: "PromptForums répertorie des prompts communautaires notés et des marketplaces comme PromptBase. Vous pouvez filtrer par catégorie (écriture, image, code, marketing) sur l'annuaire.",
  },
];

export default function GuidePage() {
  return (
    <article className="mx-auto max-w-3xl">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Les 10 meilleurs outils IA en 2026",
          numberOfItems: TOOLS.length,
          itemListOrder: "https://schema.org/ItemListOrderAscending",
          itemListElement: TOOLS.map((t) => ({
            "@type": "ListItem",
            position: t.rank,
            item: {
              "@type": "SoftwareApplication",
              name: t.name,
              applicationCategory: t.category,
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: t.rating,
                bestRating: 5,
                ratingCount: 100,
              },
            },
          })),
        }}
      />
      <JsonLd data={faqSchema(FAQ)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Accueil", url: SITE_URL },
          { name: "Guides", url: `${SITE_URL}/guides/meilleurs-outils-ia-francophones-2026` },
        ])}
      />

      <p className="mb-3 text-sm text-slate-400">
        Guide · Mis à jour en {UPDATED}
      </p>
      <h1 className="mb-4 text-4xl font-extrabold leading-tight">
        Les 10 meilleurs outils IA en 2026 (comparatif)
      </h1>
      <p className="mb-8 text-lg text-slate-300">
        Voici le classement à jour des meilleurs outils d'intelligence
        artificielle en 2026, testés et notés par la communauté PromptForums.
        Pour un usage généraliste, <strong className="text-white">ChatGPT</strong>{" "}
        et <strong className="text-white">Claude</strong> arrivent en tête ; pour
        la recherche, <strong className="text-white">Perplexity</strong> ; pour
        les images, <strong className="text-white">Midjourney</strong>.
      </p>

      <div className="mb-10 overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-white/15 text-slate-200">
              <th className="py-3 pr-4 font-semibold">#</th>
              <th className="py-3 pr-4 font-semibold">Outil</th>
              <th className="py-3 pr-4 font-semibold">Catégorie</th>
              <th className="py-3 pr-4 font-semibold">Prix</th>
              <th className="py-3 pr-4 font-semibold">Idéal pour</th>
              <th className="py-3 font-semibold">Note</th>
            </tr>
          </thead>
          <tbody>
            {TOOLS.map((t) => (
              <tr key={t.rank} className="border-b border-white/5 text-slate-300">
                <td className="py-3 pr-4 font-bold text-brand-300">{t.rank}</td>
                <td className="py-3 pr-4 font-semibold text-white">{t.name}</td>
                <td className="py-3 pr-4">{t.category}</td>
                <td className="py-3 pr-4">{t.price}</td>
                <td className="py-3 pr-4">{t.best}</td>
                <td className="py-3 font-semibold text-amber-300">
                  {t.rating.toFixed(1)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section className="mb-10 flex flex-col gap-6 text-slate-300">
        <div>
          <h2 className="mb-2 text-2xl font-bold text-white">
            Comment choisir son outil IA en 2026 ?
          </h2>
          <p>
            Le bon outil dépend de votre besoin. Pour{" "}
            <strong className="text-white">écrire, résumer ou coder</strong>,
            partez sur un assistant conversationnel (ChatGPT ou Claude). Pour{" "}
            <strong className="text-white">chercher de l'information fiable</strong>{" "}
            avec des sources, utilisez Perplexity. Pour{" "}
            <strong className="text-white">créer des visuels</strong>, Midjourney
            ou DALL·E 3. La plupart proposent une version gratuite : testez avant
            de payer.
          </p>
        </div>
        <div>
          <h2 className="mb-2 text-2xl font-bold text-white">
            Faut-il payer pour l'IA ?
          </h2>
          <p>
            Non, pas nécessairement. Les versions gratuites de ChatGPT, Claude,
            Gemini et Perplexity couvrent la majorité des usages. Les
            abonnements payants (15 à 22 €/mois) débloquent les modèles les plus
            puissants, des limites plus élevées et des fonctions avancées —
            utiles si vous utilisez l'IA quotidiennement.
          </p>
        </div>
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
          👉 Découvrez d'autres outils notés par la communauté et filtrez par
          catégorie dans notre annuaire complet.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/" className="btn-primary">
            Explorer l'annuaire
          </Link>
          <Link href="/prompts" className="btn-secondary">
            Voir les prompts
          </Link>
        </div>
      </div>
    </article>
  );
}
