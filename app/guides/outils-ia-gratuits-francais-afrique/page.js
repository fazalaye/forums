import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import { faqSchema, breadcrumbSchema, articleSchema, SITE_URL } from "@/lib/seo";

export const metadata = {
  title: "Outils IA gratuits en français pour l'Afrique (2026)",
  description:
    "Les meilleurs outils IA gratuits, sans carte bancaire et en français, pour entrepreneurs d'Afrique de l'Ouest. Testés, classés par usage. Mobile-first.",
  alternates: {
    canonical: `${SITE_URL}/guides/outils-ia-gratuits-francais-afrique`,
  },
};

const CRITERIA = [
  {
    title: "Vraiment gratuit, sans carte.",
    text: "Méfiez-vous des « faux gratuits » : carte bancaire demandée dès l'inscription, essai de 7 jours qui se transforme en abonnement, ou filigrane sur les images. Le réflexe : cherchez « no credit card required » sur la page de tarifs. Un vrai plan gratuit s'utilise indéfiniment, sans expiration.",
  },
  {
    title: "Utilisable sur mobile.",
    text: "Votre audience — et souvent vous-même — travaille sur téléphone. Un outil qui rame sur navigateur mobile ne sert à rien.",
  },
  {
    title: "Bon en français.",
    text: "Tous les outils ne se valent pas sur notre langue. Certains produisent un français impeccable, d'autres un français « traduit » qu'il faut retoucher.",
  },
  {
    title: "Léger en données.",
    text: "Les outils de texte consomment très peu de données. L'image et surtout la vidéo en consomment beaucoup — à réserver au wifi.",
  },
];

const PROFILES = [
  {
    title: "Vous vendez en ligne (e-commerce, WhatsApp Business)",
    text: "Claude ou Mistral pour vos fiches produit et réponses clients → Canva + Ideogram pour vos visuels de promo → CapCut pour vos vidéos TikTok/Reels. Coût : 0 F CFA.",
  },
  {
    title: "Vous créez du contenu (community manager, influenceur)",
    text: "ChatGPT ou Mistral pour les idées et scripts → CapCut pour le montage → Suno pour un jingle → Ideogram pour les miniatures avec texte.",
  },
  {
    title: "Vous êtes étudiant ou freelance",
    text: "NotebookLM pour vos cours et dossiers → Perplexity pour la recherche sourcée → Claude pour rédiger CV, e-mails et propositions → Gemini intégré à vos outils Google.",
  },
  {
    title: "Vous dirigez une PME ou un service",
    text: "Mistral (souverain, RGPD) pour le quotidien → Gamma pour vos présentations → Make pour automatiser l'administratif → un assistant IA branché sur WhatsApp pour le service client.",
  },
];

const FAQ = [
  {
    q: "Quel est le meilleur outil IA gratuit en français ?",
    a: "Pour un usage 100 % francophone, Le Chat de Mistral (Vibe) est le meilleur point de départ : gratuit, sans carte, souverain, et utilisable même sans compte. Pour la rédaction longue, Claude est imbattable.",
  },
  {
    q: "Peut-on vraiment utiliser l'IA sans carte bancaire ?",
    a: "Oui. ChatGPT, Claude, Mistral, Gemini, Canva et bien d'autres ont un plan gratuit permanent accessible sans carte. Attention aux essais de 7 jours qui exigent une carte : ce n'est pas du vrai gratuit.",
  },
  {
    q: "Quel outil IA pour un e-commerçant ou un vendeur WhatsApp ?",
    a: "Le combo gagnant à 0 franc : un assistant (Claude/Mistral) pour les fiches produit et réponses clients, Canva + Ideogram pour les visuels, et CapCut pour les vidéos.",
  },
  {
    q: "Ces outils fonctionnent-ils bien sur téléphone ?",
    a: "Oui, la plupart sont utilisables depuis un navigateur mobile ou une appli. CapCut et Canva sont même pensés mobile d'abord.",
  },
  {
    q: "Mes données sont-elles protégées ?",
    a: "Les outils français et européens (Mistral) sont soumis au RGPD. Sur ChatGPT et Claude, vous pouvez désactiver l'utilisation de vos conversations pour l'entraînement dans les paramètres.",
  },
];

const BREADCRUMB_ITEMS = [
  { name: "Accueil", url: SITE_URL },
  { name: "Guides", url: `${SITE_URL}/guides` },
  {
    name: "Outils IA gratuits en français pour l'Afrique (2026)",
    url: `${SITE_URL}/guides/outils-ia-gratuits-francais-afrique`,
  },
];

export default function GuidePage() {
  return (
    <article className="mx-auto max-w-3xl">
      <JsonLd data={faqSchema(FAQ)} />
      <JsonLd data={breadcrumbSchema(BREADCRUMB_ITEMS)} />
      <JsonLd
        data={articleSchema({
          title:
            "Les meilleurs outils IA gratuits en français pour les entrepreneurs d'Afrique de l'Ouest (2026)",
          description:
            "Les meilleurs outils IA gratuits, sans carte bancaire et en français, pour entrepreneurs d'Afrique de l'Ouest. Testés, classés par usage. Mobile-first.",
          url: `${SITE_URL}/guides/outils-ia-gratuits-francais-afrique`,
          datePublished: "2026-07-30",
        })}
      />

      <Breadcrumbs items={BREADCRUMB_ITEMS} />
      <p className="mb-3 text-sm text-slate-400">Guide · Afrique de l'Ouest</p>
      <h1 className="mb-4 text-4xl font-extrabold leading-tight">
        Les meilleurs outils IA gratuits en français pour les entrepreneurs
        d'Afrique de l'Ouest
      </h1>
      <p className="mb-6 text-lg text-slate-300">
        Il existe plus de 15 000 outils d'intelligence artificielle
        aujourd'hui. Le problème n'est plus d'en trouver un : c'est de
        choisir le bon <strong className="text-white">sans payer 20 $ par mois</strong> et{" "}
        <strong className="text-white">sans carte bancaire internationale</strong> — deux
        obstacles bien réels quand on entreprend depuis Dakar, Abidjan,
        Cotonou ou Bamako.
      </p>
      <p className="mb-6 text-slate-300">
        Bonne nouvelle : la plupart des meilleurs outils IA du marché ont une{" "}
        <strong className="text-white">
          offre gratuite permanente, accessible sans carte, directement
          depuis votre téléphone
        </strong>
        . Ce guide passe en revue ceux qui fonctionnent vraiment pour un
        entrepreneur francophone d'Afrique de l'Ouest — testés, classés par
        usage, avec leurs limites honnêtes.
      </p>
      <p className="mb-6 text-slate-300">
        Pas de liste sponsorisée. Juste ce qui marche ici, dans notre
        contexte : mobile d'abord, français, et sans dépenser un franc CFA.
      </p>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">
          Ce qu'il faut vérifier avant de choisir un outil IA (ici, ça compte
          double)
        </h2>
        <p className="mb-6 text-slate-300">
          Quatre critères à garder en tête, spécifiques à notre réalité :
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {CRITERIA.map((item) => (
            <div key={item.title} className="glass rounded-xl p-4">
              <h3 className="mb-1 font-semibold text-slate-100">
                {item.title}
              </h3>
              <p className="text-sm text-slate-300">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">
          Les assistants IA généralistes (à adopter en premier)
        </h2>
        <p className="mb-6 text-slate-300">
          C'est votre outil de fond : rédaction, e-mails, idées, analyse,
          traduction. Si vous ne deviez en maîtriser qu'un ou deux, c'est
          ceux-là.
        </p>
        <div className="flex flex-col gap-6">
          <div className="glass-card p-6">
            <h3 className="mb-2 font-semibold text-slate-100">
              <Link
                href="/out/le-chat-mistral"
                className="text-brand-300 hover:underline"
              >
                Le Chat de Mistral
              </Link>{" "}
              (rebaptisé Vibe)
            </h3>
            <p className="text-sm text-slate-300">
              <strong className="text-white">
                L'option francophone et souveraine.
              </strong>{" "}
              C'est l'assistant de la start-up française Mistral. Il
              s'utilise même{" "}
              <strong className="text-white">sans créer de compte</strong>,
              directement dans le navigateur : vous arrivez, vous écrivez, la
              réponse tombe. L'offre gratuite donne accès sans carte à la
              conversation, la recherche web, la génération d'images et
              l'analyse de documents. Réponses très rapides. Seul compromis
              sans compte : les conversations ne sont pas mémorisées.{" "}
              <strong className="text-white">
                Le meilleur point de départ pour un usage 100 % français.
              </strong>
            </p>
          </div>

          <div className="glass-card p-6">
            <h3 className="mb-2 font-semibold text-slate-100">
              <Link href="/out/claude" className="text-brand-300 hover:underline">
                Claude
              </Link>{" "}
              (Anthropic)
            </h3>
            <p className="text-sm text-slate-300">
              <strong className="text-white">
                Le champion de la rédaction longue en français.
              </strong>{" "}
              L'offre gratuite (environ 30 messages par jour) suffit pour
              rédiger 2 à 3 articles complets par jour. Qualité de français
              au niveau d'un rédacteur pro, cohérence sur de longs textes,
              très peu d'erreurs factuelles. Idéal pour les fiches produit,
              les articles, l'analyse de documents. Pas de génération
              d'images. Complément parfait de Mistral.
            </p>
          </div>

          <div className="glass-card p-6">
            <h3 className="mb-2 font-semibold text-slate-100">
              <Link href="/out/chatgpt" className="text-brand-300 hover:underline">
                ChatGPT
              </Link>{" "}
              (OpenAI)
            </h3>
            <p className="text-sm text-slate-300">
              <strong className="text-white">Le couteau suisse.</strong> Plan
              gratuit permanent sans carte. Le plus polyvalent et le plus
              connu : rédaction, idées, code, résumés, et génération
              d'images incluse même en gratuit (avec des limites
              journalières). Écosystème le plus large. Le premier réflexe
              pour la plupart des débutants.
            </p>
          </div>

          <div className="glass-card p-6">
            <h3 className="mb-2 font-semibold text-slate-100">
              <Link href="/out/gemini" className="text-brand-300 hover:underline">
                Gemini
              </Link>{" "}
              (Google)
            </h3>
            <p className="text-sm text-slate-300">
              <strong className="text-white">
                Le plus accessible si vous vivez dans Gmail.
              </strong>{" "}
              Gratuit avec un simple compte Google — que presque tout le
              monde a déjà. Grande fenêtre de contexte pour analyser de
              longs documents, et une{" "}
              <strong className="text-white">
                enveloppe généreuse de génération d'images
              </strong>{" "}
              (son modèle image gère très bien le texte lisible dans
              plusieurs langues, utile pour des visuels avec des mots en
              français ou en langue locale).
            </p>
          </div>

          <div className="glass-card p-6">
            <h3 className="mb-2 font-semibold text-slate-100">
              <Link
                href="/out/perplexity"
                className="text-brand-300 hover:underline"
              >
                Perplexity
              </Link>{" "}
              &amp; DeepSeek
            </h3>
            <p className="text-sm text-slate-300">
              <strong className="text-white">Perplexity</strong> : le
              meilleur pour la recherche, il cite toujours ses sources —
              parfait pour vérifier une info avant de la publier.{" "}
              <strong className="text-white">
                <Link href="/out/deepseek" className="text-brand-300 hover:underline">
                  DeepSeek
                </Link>
              </strong>{" "}
              : un modèle
              très performant et gratuit, excellent rapport qualité/prix
              pour le raisonnement et le code.
            </p>
          </div>
        </div>
        <p className="mt-2 text-sm text-slate-400">
          👉 Retrouvez tous les assistants IA comparés et notés sur{" "}
          <Link
            href="/?category=chatbots#annuaire"
            className="text-brand-300 hover:underline"
          >
            l'annuaire PromptForums
          </Link>
          .
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">
          La génération d'images (pour vos visuels e-commerce et réseaux
          sociaux)
        </h2>
        <ul className="flex flex-col gap-3 text-slate-300">
          <li>
            <strong className="text-white">Gemini / Nano Banana</strong> —
            Génération d'images intégrée à la conversation, généreuse en
            gratuit, et forte pour intégrer du texte lisible dans l'image.
          </li>
          <li>
            <strong className="text-white">
              <Link
                href="/out/ideogram"
                className="text-brand-300 hover:underline"
              >
                Ideogram
              </Link>
            </strong>{" "}
            — Le champion du{" "}
            <strong className="text-white">
              texte propre dans les visuels
            </strong>{" "}
            (parfait pour une promo « -30 % » ou une accroche en français
            directement sur l'image). Offre gratuite.
          </li>
          <li>
            <strong className="text-white">
              <Link
                href="/out/leonardo-ai"
                className="text-brand-300 hover:underline"
              >
                Leonardo.ai
              </Link>
            </strong>{" "}
            — Crédits
            gratuits chaque jour, sans carte, pour des images stylisées de
            qualité.
          </li>
          <li>
            <strong className="text-white">
              <Link
                href="/out/bing-image-creator"
                className="text-brand-300 hover:underline"
              >
                Bing Image Creator
              </Link>
            </strong>{" "}
            — Accès gratuit au modèle DALL·E via Microsoft, sans carte.
          </li>
          <li>
            <strong className="text-white">
              <Link href="/out/canva" className="text-brand-300 hover:underline">
                Canva
              </Link>
            </strong>{" "}
            — Plus qu'un
            générateur : l'outil tout-en-un du visuel. Plan gratuit sans
            carte, ultra-populaire ici, avec des fonctions IA (fond
            détouré, génération d'images, redimensionnement) intégrées à un
            éditeur simple.{" "}
            <strong className="text-white">
              Incontournable pour un e-commerçant ou un créateur de contenu.
            </strong>
          </li>
        </ul>
        <p className="mt-2 text-sm text-slate-400">
          👉 Voir la catégorie{" "}
          <Link
            href="/?category=image#annuaire"
            className="text-brand-300 hover:underline"
          >
            Génération d'images
          </Link>{" "}
          sur PromptForums.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">
          La vidéo et l'audio (pour TikTok, Reels et WhatsApp Status)
        </h2>
        <ul className="flex flex-col gap-3 text-slate-300">
          <li>
            <strong className="text-white">
              <Link href="/out/capcut" className="text-brand-300 hover:underline">
                CapCut
              </Link>
            </strong>{" "}
            — Le montage
            vidéo de référence sur mobile, gratuit, avec sous-titres
            automatiques, effets et outils IA. Pensé pour le format
            vertical des réseaux sociaux.
          </li>
          <li>
            <strong className="text-white">
              <Link
                href="/out/elevenlabs"
                className="text-brand-300 hover:underline"
              >
                ElevenLabs
              </Link>
            </strong>{" "}
            — Voix de synthèse parmi les plus réalistes, offre gratuite
            limitée. Pour des voix off de pub ou de tuto.
          </li>
          <li>
            <strong className="text-white">
              <Link href="/out/suno" className="text-brand-300 hover:underline">
                Suno
              </Link>
            </strong>{" "}
            — Génère de la
            musique et des jingles à partir d'une simple description. Idéal
            pour une identité sonore de marque.
          </li>
          <li>
            <strong className="text-white">
              <Link href="/out/kling-ai" className="text-brand-300 hover:underline">
                Kling AI
              </Link>
            </strong>{" "}
            — Génération de
            vidéo par IA, avec une offre gratuite pour tester.
          </li>
        </ul>
        <p className="mt-2 text-sm text-slate-400">
          👉 Voir la catégorie{" "}
          <Link
            href="/?category=video#annuaire"
            className="text-brand-300 hover:underline"
          >
            Vidéo &amp; Audio
          </Link>{" "}
          sur PromptForums.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">
          Présentations, documents et automatisation
        </h2>
        <ul className="flex flex-col gap-3 text-slate-300">
          <li>
            <strong className="text-white">
              <Link href="/out/gamma" className="text-brand-300 hover:underline">
                Gamma
              </Link>
            </strong>{" "}
            — Génère des présentations et documents soignés à partir d'un
            simple texte. Offre gratuite. Parfait pour un pitch investisseur
            ou une offre commerciale.
          </li>
          <li>
            <strong className="text-white">
              <Link
                href="/out/notebooklm"
                className="text-brand-300 hover:underline"
              >
                NotebookLM
              </Link>
            </strong>{" "}
            (Google) —
            Gratuit et sans carte : chargez vos documents, il les résume et
            répond à vos questions dessus. Excellent pour les étudiants et
            pour digérer des dossiers.
          </li>
          <li>
            <strong className="text-white">
              <Link href="/out/make" className="text-brand-300 hover:underline">
                Make
              </Link>
            </strong>{" "}
            — Automatisez des
            tâches entre vos applications (1 000 opérations/mois gratuites)
            : notifications, mises à jour de tableurs, transferts. Pour
            gagner du temps sur le répétitif.
          </li>
          <li>
            <strong className="text-white">
              <Link
                href="/out/google-ai-studio"
                className="text-brand-300 hover:underline"
              >
                Google AI Studio
              </Link>
            </strong>{" "}
            — Pour
            les développeurs : accès{" "}
            <strong className="text-white">
              gratuit à l'API de Gemini, sans carte
            </strong>
            . De quoi construire ses propres outils IA sans budget.
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">
          Quels outils selon votre profil ?
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {PROFILES.map((item) => (
            <div key={item.title} className="glass rounded-xl p-4">
              <h3 className="mb-1 font-semibold text-slate-100">
                {item.title}
              </h3>
              <p className="text-sm text-slate-300">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">
          Le vrai obstacle : la carte bancaire (et comment le contourner)
        </h2>
        <p className="mb-6 text-slate-300">
          Le blocage n°1 pour un entrepreneur d'Afrique de l'Ouest, ce n'est
          pas le prix — c'est que{" "}
          <strong className="text-white">
            payer un abonnement en dollars demande une carte
            Visa/Mastercard internationale
          </strong>
          , que beaucoup n'ont pas ou ne peuvent pas utiliser pour des
          paiements récurrents à l'étranger.
        </p>
        <p className="mb-6 text-slate-300">Deux réponses honnêtes :</p>
        <ol className="list-decimal space-y-3 pl-5 text-slate-300">
          <li>
            <strong className="text-white">
              Dans 90 % des cas, vous n'en avez pas besoin.
            </strong>{" "}
            Les offres gratuites listées ici suffisent largement pour faire
            tourner une activité. La clé : choisir 2 ou 3 outils adaptés à
            votre usage plutôt que de tout vouloir avec un seul. Deux
            outils bien maîtrisés valent mieux que cinq survolés.
          </li>
          <li>
            <strong className="text-white">Si vous dépassez le gratuit</strong>,
            la route habituelle est une{" "}
            <strong className="text-white">
              carte virtuelle en dollars
            </strong>{" "}
            proposée par certaines fintechs de la région. Vérifiez toujours
            les frais, les plafonds et que le service est bien disponible
            dans votre pays avant de vous abonner — et ne vous abonnez
            qu'après avoir confirmé que l'outil vous fait vraiment gagner de
            l'argent.
          </li>
        </ol>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-white">
          4 astuces pour tirer le maximum de l'IA dans notre contexte
        </h2>
        <ul className="flex flex-col gap-3 text-slate-300">
          <li>
            <strong className="text-white">
              Travaillez en français, pas en anglais traduit.
            </strong>{" "}
            Précisez « réponds en français, ton naturel, pour un public
            d'Afrique de l'Ouest » dans vos instructions. La différence de
            qualité est nette.
          </li>
          <li>
            <strong className="text-white">
              Réservez l'image et la vidéo au wifi.
            </strong>{" "}
            Le texte consomme très peu de données ; générer des visuels ou
            des vidéos peut vite entamer votre forfait.
          </li>
          <li>
            <strong className="text-white">
              Personnalisez toujours les prompts.
            </strong>{" "}
            Copiez un bon prompt, puis remplacez les crochets par votre
            contexte (produit, cible, prix en FCFA, ton). Un prompt vague
            donne une réponse vague.
          </li>
          <li>
            <strong className="text-white">
              Mémorisez vos meilleurs prompts.
            </strong>{" "}
            Gardez un fichier de vos instructions qui marchent : c'est votre
            capital le plus précieux avec l'IA.
          </li>
        </ul>
        <p className="mt-2 text-sm text-slate-400">
          👉 Piochez dans la{" "}
          <Link href="/prompts" className="text-brand-300 hover:underline">
            bibliothèque de prompts prêts à l'emploi
          </Link>{" "}
          de PromptForums.
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

      <div className="glass-card mb-10 rounded-2xl border border-white/10 p-6">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
          Publicité — Partenaire
        </p>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="mx-auto w-full max-w-[200px] shrink-0 sm:mx-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/guide-assets/zeyow-carte-virtuelle.jpg"
              alt="Zeyow — carte bancaire virtuelle Visa pour payer en ligne"
              className="w-full rounded-2xl border border-white/10"
            />
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-bold text-white">
              Payer les outils IA sans carte bancaire internationale
            </h3>
            <p className="text-sm text-slate-300">
              Zeyow propose des cartes virtuelles rechargeables par Mobile
              Money. Voici ce que le service annonce :
            </p>
            <ul className="flex flex-col gap-1 text-sm text-slate-300">
              <li>💳 Des cartes virtuelles instantanées en 5 minutes.</li>
              <li>📱 Rechargement facile via Mobile Money.</li>
              <li>💲 Une tarification transparente accessible à tous.</li>
              <li>💬 Support client 24h/24 et 7j/7.</li>
            </ul>
            <a
              href="https://partners.ly/rl_biph2vkg"
              target="_blank"
              rel="noopener nofollow sponsored"
              className="btn-primary mt-2 w-fit"
            >
              Obtenir ma carte Zeyow →
            </a>
          </div>
        </div>
      </div>

      <div className="glass-card flex flex-col items-start gap-4 p-6">
        <p className="text-slate-200">
          Ce guide est un point de départ. Sur{" "}
          <strong className="text-white">PromptForums</strong>, retrouvez
          chaque outil testé, noté et comparé — mis à jour chaque semaine —
          et une bibliothèque de prompts prêts à copier.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/" className="btn-primary">
            Explorer l'annuaire
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
