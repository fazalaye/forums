export const metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site PromptForums.org.",
};

export default function LegalPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-6 text-4xl font-extrabold">Mentions légales</h1>
      <div className="glass-card flex flex-col gap-6 p-8 text-slate-300">
        <section>
          <h2 className="mb-2 text-xl font-bold text-white">Éditeur du site</h2>
          <p>
            PromptForums.org est un annuaire indépendant de sites et de prompts
            liés à l'intelligence artificielle. Pour toute question relative à
            l'édition du site, contactez-nous via la page{" "}
            <a href="/contact" className="text-brand-300 underline">Contact</a>.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-xl font-bold text-white">Hébergement</h2>
          <p>
            Ce site peut être hébergé par un fournisseur tiers (ex : Vercel
            Inc.). Les informations d'hébergement précises seront complétées
            lors de la mise en production.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-xl font-bold text-white">Propriété intellectuelle</h2>
          <p>
            L'ensemble des contenus (textes, visuels, marque) présents sur
            PromptForums.org sont protégés. Les prompts soumis par les
            utilisateurs restent la propriété de leurs auteurs respectifs, qui
            en concèdent une licence d'affichage au site.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-xl font-bold text-white">Liens externes</h2>
          <p>
            PromptForums.org référence des sites tiers, y compris via des
            liens d'affiliation ou sponsorisés clairement identifiés. Nous ne
            sommes pas responsables du contenu ou des pratiques de ces sites
            externes.
          </p>
        </section>
      </div>
    </div>
  );
}
