import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import { faqSchema, breadcrumbSchema, articleSchema, SITE_URL } from "@/lib/seo";

const TITLE = "Créer et vendre un ebook avec l'IA (guide 2026)";
const DESCRIPTION =
  "Comment créer un ebook avec ChatGPT/Claude et Canva, où le vendre (Chariow, Système.io, Amazon KDP), paiement mobile money inclus. Fiscalité à vérifier.";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: `${SITE_URL}/guides/creer-vendre-ebook-ia`,
  },
};

const FAQ = [
  {
    q: "Peut-on créer un ebook entièrement avec l'IA ?",
    a: "Oui pour la structure et un premier jet de rédaction, mais un ebook vendu doit être relu et retravaillé — une IA générative peut inventer des détails avec assurance, un risque particulièrement problématique si tu vends du contenu factuel ou pratique.",
  },
  {
    q: "Quelle est la meilleure plateforme pour vendre un ebook en Afrique ?",
    a: "Chariow est pensée pour ce contexte : intégration native du mobile money (Orange Money, Wave, MTN, Moov), en plus des cartes bancaires, avec une commission de 15% (10% à volume). Les plateformes comme Système.io, qui reposent sur Stripe/PayPal, ne couvrent pas nativement ce mode de paiement.",
  },
  {
    q: "Quelle est la meilleure plateforme pour vendre un ebook ?",
    a: "Ça dépend de ta clientèle : Chariow pour un public qui paie en mobile money, Système.io (plan gratuit permanent, tunnels de vente) pour un tunnel de vente directe par carte/PayPal, Amazon KDP (gratuit, royalties 35-70% selon le prix) pour la marketplace Amazon.",
  },
  {
    q: "Faut-il un statut d'auto-entrepreneur pour vendre un ebook ?",
    a: "En France, généralement oui pour une activité régulière. La classification exacte (BIC ou BNC) dépend de la nature de ton activité — à vérifier avec l'URSSAF ou un expert-comptable avant de commencer à vendre.",
  },
  {
    q: "Combien peut-on gagner en vendant un ebook sur Amazon KDP ?",
    a: "Amazon KDP verse 70% du prix de vente pour les ebooks tarifés entre 2,99 $ et 9,99 $, et 35% en dehors de cette fourchette — le prix fixé a donc un impact direct sur les revenus réels.",
  },
];

const BREADCRUMB_ITEMS = [
  { name: "Accueil", url: SITE_URL },
  { name: "Guides", url: `${SITE_URL}/guides` },
  {
    name: "Créer et vendre un ebook avec l'IA",
    url: `${SITE_URL}/guides/creer-vendre-ebook-ia`,
  },
];

export default function GuidePage() {
  return (
    <article className="mx-auto max-w-3xl">
      <JsonLd data={faqSchema(FAQ)} />
      <JsonLd data={breadcrumbSchema(BREADCRUMB_ITEMS)} />
      <JsonLd
        data={articleSchema({
          title: TITLE,
          description: DESCRIPTION,
          url: `${SITE_URL}/guides/creer-vendre-ebook-ia`,
          datePublished: "2026-08-07",
        })}
      />

      <Breadcrumbs items={BREADCRUMB_ITEMS} />
      <p className="mb-3 text-sm text-slate-400">
        Guide · Écriture & Copywriting
      </p>
      <h1 className="mb-4 text-4xl font-extrabold leading-tight">
        Créer et vendre un ebook avec l'IA
      </h1>
      <p className="mb-6 text-lg text-slate-300">
        Écrire un livre prenait autrefois des mois. Aujourd'hui, avec les bons
        outils IA, tu peux structurer et rédiger un ebook complet en quelques
        jours — reste ensuite à le vendre. Ce guide couvre les deux étapes :
        la création avec l'IA, et les plateformes réelles pour le mettre en
        vente.
      </p>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">
          Créer le contenu de ton ebook avec l'IA
        </h2>

        <h3 className="mb-3 text-xl font-semibold text-white">
          Structurer et rédiger avec ChatGPT ou Claude
        </h3>
        <p className="mb-6 text-slate-300">
          Un assistant IA comme ChatGPT ou{" "}
          <Link href="/out/claude" className="text-brand-300 hover:underline">
            Claude
          </Link>{" "}
          est utile à deux moments : pour structurer ton plan (chapitres,
          sous-parties, angle) et pour t'aider à rédiger un premier jet de
          chaque section, que tu retravailles ensuite avec ta propre voix.
          Retrouve nos{" "}
          <Link
            href="/guides/meilleurs-prompts-claude"
            className="text-brand-300 hover:underline"
          >
            prompts prêts à copier pour Claude
          </Link>
          , notamment pour la création de contenu.
        </p>

        <div className="glass-card mb-6 p-6">
          <p className="mb-2 font-semibold text-slate-100">
            ⚠️ Un point important, dans la logique de ce guide
          </p>
          <p className="text-sm text-slate-300">
            Une IA générative peut se tromper ou inventer des détails avec
            assurance. Si ton ebook contient des faits, chiffres ou conseils
            pratiques, vérifie-les toi-même avant publication — surtout si tu
            vends ce contenu.
          </p>
        </div>

        <h3 className="mb-3 text-xl font-semibold text-white">
          Mettre en page avec Canva
        </h3>
        <p className="text-slate-300">
          Une fois le texte prêt, Canva permet de mettre en page ton ebook
          (couverture, mise en forme, export PDF) sans compétence en design —
          plusieurs recherches confirment que c'est déjà l'usage courant («
          comment créer un ebook sur Canva et le vendre »).
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">
          Où vendre ton ebook
        </h2>

        <h3 className="mb-3 text-xl font-semibold text-white">
          Chariow — pensée pour un public africain
        </h3>
        <p className="mb-4 text-slate-300">
          Si tes clients sont en Afrique de l'Ouest ou centrale, c'est le
          point à connaître avant tout le reste :{" "}
          <strong className="text-white">
            Système.io et la plupart des plateformes internationales
            fonctionnent via Stripe ou PayPal
          </strong>
          , deux solutions qui ne couvrent pas nativement le paiement mobile
          money — le mode de paiement dominant dans la région.
        </p>
        <p className="mb-6 text-slate-300">
          <Link
            href="https://chariow.com/fr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-300 hover:underline"
          >
            Chariow
          </Link>{" "}
          est une plateforme pensée pour ce contexte : vente d'ebooks, PDF et
          formations, avec une intégration{" "}
          <strong className="text-white">native</strong> de Orange Money,
          Wave, MTN Mobile Money et Moov Money (en plus des cartes bancaires
          classiques), en plusieurs devises (FCFA, EUR, USD). La commission
          est de <strong className="text-white">15% par vente</strong>,
          réduite à <strong className="text-white">10%</strong> à partir
          d'un certain volume de ventes.
        </p>

        <h3 className="mb-3 text-xl font-semibold text-white">
          Système.io
        </h3>
        <p className="mb-6 text-slate-300">
          Plateforme française tout-en-un (
          <Link
            href="https://systeme.io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-300 hover:underline"
          >
            Système.io
          </Link>
          ) (tunnels de vente, paiement Stripe/PayPal, emails automatisés).
          Point notable : Système.io propose un{" "}
          <strong className="text-white">plan gratuit permanent</strong> —
          pas un simple essai — incluant jusqu'à 2 000 contacts et des
          tunnels de vente illimités, suffisant pour lancer la vente d'un
          premier ebook sans investissement de départ. Utile si ta clientèle
          paie principalement par carte ou PayPal.
        </p>

        <h3 className="mb-3 text-xl font-semibold text-white">
          Amazon Kindle Direct Publishing (KDP)
        </h3>
        <p className="text-slate-300">
          Publication gratuite (
          <Link
            href="https://kdp.amazon.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-300 hover:underline"
          >
            KDP
          </Link>
          ), avec un mécanisme de royalties à deux paliers :{" "}
          <strong className="text-white">70%</strong> si ton ebook est vendu
          entre 2,99 $ et 9,99 $ (sur les principaux territoires),{" "}
          <strong className="text-white">35%</strong> en dehors de cette
          fourchette de prix. Autrement dit, le prix que tu fixes a un impact
          direct sur ce que tu touches réellement — un point à vérifier
          avant de fixer ton tarif.
        </p>
      </section>

      <section className="mb-10">
        <div className="glass-card p-6">
          <h2 className="mb-4 text-2xl font-bold text-white">
            ⚠️ Ce qu'il faut vérifier avant de te lancer (fiscalité)
          </h2>
          <p className="mb-4 text-slate-300">
            Si tu vends en auto-entrepreneur en France, une question revient
            souvent : ta vente d'ebook relève-t-elle du régime{" "}
            <strong className="text-white">BIC</strong> (vente d'un bien) ou{" "}
            <strong className="text-white">BNC</strong> (prestation
            intellectuelle, droits d'auteur) ?
          </p>
          <p className="mb-4 text-slate-300">
            La réponse honnête :{" "}
            <strong className="text-white">
              ça dépend de la nature réelle de ton activité
            </strong>
            , pas d'une règle unique pour tous les ebooks. Certaines sources
            classent la vente de produits numériques comme un bien (BIC),
            d'autres la rattachent aux droits d'auteur (BNC) selon le cas.
            Cette zone grise n'est pas quelque chose que ce guide peut
            trancher à ta place.
          </p>
          <p className="text-slate-300">
            <strong className="text-white">
              Avant de commencer à vendre
            </strong>
            , vérifie ta situation directement auprès de l'URSSAF ou d'un
            expert-comptable — une consultation courte peut t'éviter une
            erreur de déclaration coûteuse à corriger plus tard.
          </p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">
          Pour aller plus loin
        </h2>
        <p className="text-slate-300">
          Retrouve d'autres outils d'écriture et de création de contenu IA
          dans la{" "}
          <Link
            href="/?category=ecriture#annuaire"
            className="text-brand-300 hover:underline"
          >
            catégorie Écriture & Copywriting
          </Link>{" "}
          de PromptForums, ou pioche dans notre{" "}
          <Link href="/prompts" className="text-brand-300 hover:underline">
            bibliothèque de prompts
          </Link>
          .
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">Conclusion</h2>
        <p className="text-slate-300">
          Créer un ebook avec l'IA (ChatGPT/Claude pour le texte, Canva pour
          la mise en page) est aujourd'hui accessible sans compétence
          technique particulière. Côté vente, le bon choix de plateforme
          dépend surtout de qui te paie : Chariow si ta clientèle utilise le
          mobile money, Système.io pour un tunnel de vente à l'international
          via carte/PayPal, Amazon KDP pour toucher la marketplace Amazon. Le
          seul point qui mérite une vraie vérification avant de te lancer, ce
          n'est pas l'outil — c'est ta situation fiscale si tu vends en
          auto-entrepreneur : un rendez-vous avec un expert-comptable vaut
          mieux qu'une réponse générique trouvée en ligne.
        </p>
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
          Ce guide est un point de départ. Sur{" "}
          <strong className="text-white">PromptForums</strong>, retrouvez
          chaque outil testé, noté et comparé — mis à jour chaque semaine —
          et une bibliothèque de prompts prêts à copier.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/?category=ecriture#annuaire" className="btn-primary">
            Explorer les outils d'écriture
          </Link>
          <Link href="/prompts" className="btn-secondary">
            Voir les prompts
          </Link>
        </div>
        <p className="mt-2 text-sm text-slate-400">
          📩 Recevez chaque semaine les meilleurs outils et prompts IA, en
          français.{" "}
          <Link href="/#newsletter" className="text-brand-300 hover:underline">
            Rejoignez la newsletter gratuite.
          </Link>
        </p>
      </div>
    </article>
  );
}
