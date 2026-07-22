import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { faqSchema, breadcrumbSchema, SITE_URL } from "@/lib/seo";

export const metadata = {
  title: "À propos — L'annuaire francophone des prompts et outils IA",
  description:
    "PromptForums est l'annuaire francophone indépendant des meilleurs sites, outils et prompts d'intelligence artificielle : ChatGPT, Midjourney, Claude et plus, testés et notés par la communauté.",
  alternates: { canonical: `${SITE_URL}/a-propos` },
};

const FAQ = [
  {
    q: "Qu'est-ce que PromptForums ?",
    a: "PromptForums est l'annuaire francophone indépendant des meilleurs sites, outils et prompts d'intelligence artificielle. La communauté y découvre, compare, note et met à jour chaque semaine les outils IA comme ChatGPT, Midjourney et Claude.",
  },
  {
    q: "À qui s'adresse PromptForums ?",
    a: "Aux créateurs de contenu, marketeurs, freelances, développeurs et étudiants francophones qui utilisent l'IA et cherchent les meilleurs outils et prompts, en français.",
  },
  {
    q: "Est-ce gratuit ?",
    a: "Oui, consulter l'annuaire et les prompts communautaires est entièrement gratuit. Une newsletter Premium et des mises en avant payantes pour les éditeurs d'outils sont proposées en option.",
  },
  {
    q: "Comment référencer mon outil ou site IA ?",
    a: "Il suffit de le soumettre depuis la page « Soumettre un site ». Chaque soumission est examinée avant publication. Des mises en avant « Featured » sont disponibles pour gagner en visibilité.",
  },
  {
    q: "En quoi PromptForums est-il utile à l'ère de l'IA générative ?",
    a: "Là où une IA répond à ce que vous lui demandez, PromptForums vous fait découvrir des outils que vous ne connaissiez pas, avec des notes réelles de la communauté et une veille à jour d'un secteur qui évolue chaque semaine.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <JsonLd data={faqSchema(FAQ)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Accueil", url: SITE_URL },
          { name: "À propos", url: `${SITE_URL}/a-propos` },
        ])}
      />

      <h1 className="mb-6 text-4xl font-extrabold">À propos de PromptForums</h1>

      <div className="glass-card flex flex-col gap-6 p-8 text-slate-300">
        <p className="text-lg text-slate-200">
          <strong className="text-white">PromptForums</strong> est l'annuaire
          francophone indépendant des meilleurs sites, outils et prompts
          d'intelligence artificielle. Nous aidons la communauté francophone à
          découvrir, comparer et noter les outils IA — ChatGPT, Midjourney,
          Claude et bien d'autres — et nous mettons ce classement à jour chaque
          semaine.
        </p>

        <section>
          <h2 className="mb-2 text-xl font-bold text-white">Notre mission</h2>
          <p>
            Le paysage de l'IA change chaque semaine. Notre mission est simple :
            vous faire gagner du temps en réunissant au même endroit les
            meilleurs outils et les prompts les plus efficaces, testés et notés
            par de vrais utilisateurs, en français.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-bold text-white">
            Pourquoi un annuaire à l'ère de l'IA ?
          </h2>
          <p>
            Une IA répond à ce que vous lui demandez ; elle ne vous dit pas quel
            outil choisir ni ce qui vient de sortir. PromptForums apporte ce que
            l'IA ne fait pas : de la curation humaine, des notes communautaires
            et une veille à jour d'un secteur en mouvement permanent.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-bold text-white">
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

        <div className="flex flex-wrap gap-3 border-t border-white/10 pt-6">
          <Link href="/" className="btn-primary">
            Explorer l'annuaire
          </Link>
          <Link href="/submit" className="btn-secondary">
            Soumettre un site
          </Link>
        </div>
      </div>
    </div>
  );
}
