import { SITE_URL } from "@/lib/seo";

export const metadata = {
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité de PromptForums : données personnelles, cookies, publicité Google AdSense et droits RGPD.",
  alternates: { canonical: `${SITE_URL}/politique-de-confidentialite` },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-6 text-4xl font-extrabold">Politique de confidentialité</h1>
      <div className="glass-card flex flex-col gap-6 p-8 text-slate-300">
        <p className="text-sm text-slate-400">Dernière mise à jour : 26 septembre 2026</p>
        <section>
          <h2 className="mb-2 text-xl font-bold text-white">Responsable du traitement</h2>
          <p>
            PromptForums.org traite les données nécessaires au fonctionnement
            du site. Pour toute question ou demande relative à vos données,
            écrivez à{" "}
            <a href="mailto:admin@promptforums.org" className="text-brand-300 underline">
              admin@promptforums.org
            </a>.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-xl font-bold text-white">Données et finalités</h2>
          <p>
            Les données fournies directement peuvent inclure l’adresse e-mail
            utilisée pour un compte ou une newsletter, le nom affiché par le
            fournisseur d’authentification choisi, ainsi que les prompts,
            commentaires et informations de soumission publiés. Elles servent
            à fournir ces fonctions, afficher les contributions et répondre
            aux demandes. Les champs du formulaire de contact ne sont pas
            transmis par le site : ils ouvrent l’application de messagerie de
            l’utilisateur.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-xl font-bold text-white">Fondements du traitement</h2>
          <p>
            Selon la fonction utilisée, le traitement peut être nécessaire à
            la fourniture du service demandé, reposer sur votre consentement
            (par exemple pour une newsletter ou un traceur non essentiel), ou
            répondre à une obligation légale. Les intérêts légitimes liés à la
            sécurité, à la prévention des abus et à l’amélioration du service
            peuvent également être invoqués lorsqu’ils sont applicables et
            après mise en balance avec vos droits. Les choix de consentement
            peuvent être retirés pour les traitements qui reposent sur ce
            fondement.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-xl font-bold text-white">Cookies et choix</h2>
          <p>
            Les cookies strictement nécessaires peuvent être utilisés pour
            l’authentification et le fonctionnement du service. Les cookies
            non essentiels, notamment ceux de mesure d’audience ou de publicité,
            ne doivent être déposés ou lus que selon les règles applicables et
            après le choix requis. Lorsque ces technologies seront activées,
            les préférences devront pouvoir être consultées et modifiées depuis
            un mécanisme de gestion du consentement.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-xl font-bold text-white">Publicité Google AdSense</h2>
          <p>
            Les emplacements publicitaires visibles sur le site sont, à la date
            de cette mise à jour, des espaces réservés : Google AdSense n’est
            pas activé et aucun cookie publicitaire AdSense n’est déposé par
            PromptForums. Si AdSense est activé, Google et ses partenaires
            pourront traiter des informations telles que des identifiants en
            ligne, des données de navigateur ou l’adresse IP pour diffuser,
            mesurer et limiter les annonces, selon les paramètres et les règles
            applicables. Des cookies peuvent alors être utilisés pour la
            publicité personnalisée ou non personnalisée.
          </p>
          <p className="mt-3">
            Avant cette activation, PromptForums devra mettre en place une
            information et un mécanisme de choix conformes aux exigences
            applicables, y compris la gestion du consentement dans les régions
            où il est requis. Les préférences publicitaires Google peuvent
            également être consultées sur{" "}
            <a
              href="https://adssettings.google.com/"
              className="text-brand-300 underline"
              rel="noopener noreferrer"
              target="_blank"
            >
              les paramètres des annonces Google
            </a>.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-xl font-bold text-white">Mesure d’audience Google Analytics</h2>
          <p>
            Google Analytics n’est pas intégré à PromptForums à la date de
            mise à jour de cette politique. Si cet outil est ajouté, cette
            page devra préciser les données traitées, les finalités, la durée
            de conservation, les éventuels transferts et les choix proposés
            aux visiteurs. Les traceurs non essentiels ne seront activés que
            conformément aux règles applicables et au consentement requis.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-xl font-bold text-white">Prestataires et conservation</h2>
          <p>
            Les données nécessaires peuvent être traitées par les prestataires
            d’hébergement, d’authentification, de base de données et d’envoi
            d’e-mails utilisés par le site. Elles sont conservées pendant la
            durée utile à la finalité concernée, puis supprimées ou anonymisées,
            sous réserve des obligations légales.
          </p>
          <p className="mt-3">
            Les fournisseurs d’authentification, d’hébergement ou de services
            tiers peuvent traiter certaines données depuis des pays situés hors
            de votre pays de résidence. Le cas échéant, les transferts doivent
            être encadrés par les garanties prévues par la réglementation
            applicable et les informations propres au fournisseur concerné.
            Une demande adressée à l’éditeur permet d’obtenir des précisions
            sur un traitement particulier.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-xl font-bold text-white">Vos droits</h2>
          <p>
            Selon les conditions prévues par le RGPD, vous pouvez demander
            l’accès à vos données, leur rectification ou leur effacement, la
            limitation du traitement ou la portabilité des données concernées.
            Vous pouvez également vous opposer à certains traitements et retirer
            votre consentement à tout moment lorsque celui-ci constitue leur
            fondement, sans affecter la licéité du traitement antérieur. Vous
            pouvez introduire une réclamation auprès de l’autorité de contrôle
            compétente, notamment la CNIL si vous résidez en France. Pour
            exercer vos droits, contactez l’éditeur à{" "}
            <a href="mailto:admin@promptforums.org" className="text-brand-300 underline">
              admin@promptforums.org
            </a>{" "}
            ou consultez la page <a href="/contact" className="text-brand-300 underline">Contact</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
