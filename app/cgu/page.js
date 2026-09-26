import { SITE_URL } from "@/lib/seo";

export const metadata = {
  title: "Conditions générales d’utilisation",
  description:
    "Conditions d’accès et d’utilisation de PromptForums, de l’annuaire et des contributions communautaires.",
  alternates: {
    canonical: `${SITE_URL}/cgu`,
  },
};

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-3xl">
      <h1 className="mb-6 text-4xl font-extrabold">
        Conditions générales d’utilisation
      </h1>
      <div className="glass-card flex flex-col gap-6 p-8 text-slate-300">
        <p className="text-sm text-slate-400">
          Version publiée le 26 septembre 2026
        </p>
        <section>
          <h2 className="mb-2 text-xl font-bold text-white">Objet du service</h2>
          <p>
            PromptForums propose un annuaire de sites et d’outils liés à
            l’intelligence artificielle, des prompts et des guides. Les
            informations sur les services tiers sont fournies à titre
            informatif et peuvent changer ; vérifiez les conditions et tarifs
            directement auprès de leurs éditeurs.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-xl font-bold text-white">
            Comptes et contributions
          </h2>
          <p>
            Vous êtes responsable des informations et contenus que vous
            soumettez, ainsi que de l’usage de votre compte. Ne publiez pas de
            contenu illicite, trompeur, portant atteinte aux droits d’autrui ou
            contenant des données personnelles sans autorisation. Vous devez
            disposer des droits nécessaires sur les contenus transmis.
          </p>
          <p className="mt-3">
            En soumettant un contenu, vous autorisez PromptForums à l’héberger,
            l’afficher et le mettre en forme pour le fonctionnement du service.
            Cette autorisation n’emporte pas transfert de propriété. Vous
            pouvez demander le retrait d’une contribution via la page Contact.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-xl font-bold text-white">
            Modération et disponibilité
          </h2>
          <p>
            Les soumissions et commentaires peuvent être vérifiés, modérés,
            refusés ou retirés lorsqu’ils ne respectent pas ces conditions ou
            les règles applicables. Le service est fourni en l’état ; des
            interruptions, modifications ou erreurs peuvent survenir.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-xl font-bold text-white">
            Services tiers et liens commerciaux
          </h2>
          <p>
            Les liens vers des services externes conduisent vers des sites
            indépendants soumis à leurs propres conditions. Certains liens ou
            mises en avant peuvent être commerciaux ou affiliés et sont
            identifiés lorsqu’ils s’appliquent. PromptForums ne garantit pas
            les services, tarifs ou résultats des sites référencés.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-xl font-bold text-white">Contact</h2>
          <p>
            Pour une question concernant ces conditions ou une contribution,
            consultez la page{" "}
            <a href="/contact" className="text-brand-300 underline">
              Contact
            </a>
            .
          </p>
        </section>
      </div>
    </article>
  );
}
