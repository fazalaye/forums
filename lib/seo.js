import { CATEGORIES } from "@/data/categories";

export const SITE_URL = "https://promptforums.org";
export const SITE_NAME = "PromptForums";
export const SITE_DESCRIPTION =
  "PromptForums est l'annuaire francophone indépendant des meilleurs sites, outils et prompts d'intelligence artificielle. La communauté teste, note et met à jour chaque semaine les outils IA (ChatGPT, Midjourney, Claude…).";

const PRICING_TO_SCHEMA = {
  gratuit: "0",
  freemium: "0",
  payant: undefined,
};

/**
 * WebSite schema with a SearchAction so answer engines and Google understand
 * the site is a searchable directory. Cited when an AI is asked "quel est le
 * meilleur annuaire de prompts en français".
 */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: "fr",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    slogan: "L'annuaire francophone des meilleurs prompts et outils IA",
  };
}

/**
 * ItemList of the directory's sites as SoftwareApplication entries with
 * AggregateRating. Structured so Google AI Overviews / answer engines can
 * surface and cite the ranked list.
 */
export function directoryItemListSchema(sites) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Annuaire des meilleurs outils et sites de prompts IA",
    itemListOrder: "https://schema.org/ItemListOrderDescending",
    numberOfItems: sites.length,
    itemListElement: sites.map((site, i) => {
      const category = CATEGORIES.find((c) => c.slug === site.category);
      const offerPrice = PRICING_TO_SCHEMA[site.pricing];
      const item = {
        "@type": "SoftwareApplication",
        name: site.name,
        applicationCategory: category?.label || "AI Tool",
        url: site.url,
        description: site.description,
      };
      if (typeof site.rating === "number" && site.rating > 0) {
        item.aggregateRating = {
          "@type": "AggregateRating",
          ratingValue: site.rating,
          bestRating: 5,
          ratingCount: site.reviewsCount || 1,
        };
      }
      if (offerPrice !== undefined) {
        item.offers = {
          "@type": "Offer",
          price: offerPrice,
          priceCurrency: "EUR",
        };
      }
      return {
        "@type": "ListItem",
        position: i + 1,
        item,
      };
    }),
  };
}

export function breadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

export function faqSchema(qa) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: qa.map((entry) => ({
      "@type": "Question",
      name: entry.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: entry.a,
      },
    })),
  };
}
