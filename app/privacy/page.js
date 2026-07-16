export const metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité et gestion des données personnelles de PromptForums.org.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-6 text-4xl font-extrabold">Politique de confidentialité</h1>
      <div className="glass-card flex flex-col gap-6 p-8 text-slate-300">
        <section>
          <h2 className="mb-2 text-xl font-bold text-white">Données collectées</h2>
          <p>
            Nous collectons les données que vous nous fournissez directement :
            adresse e-mail (connexion, newsletter, soumission de site), nom
            affiché via votre fournisseur d'authentification (Google, GitHub),
            et le contenu que vous publiez (prompts, commentaires).
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-xl font-bold text-white">Utilisation des données</h2>
          <p>
            Vos données sont utilisées pour faire fonctionner le compte
            utilisateur, afficher vos contributions, gérer les abonnements à
            la newsletter Premium et améliorer le service. Nous ne vendons
            jamais vos données personnelles.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-xl font-bold text-white">Cookies</h2>
          <p>
            PromptForums.org utilise des cookies techniques nécessaires à
            l'authentification, ainsi que des cookies de mesure d'audience et,
            le cas échéant, publicitaires. Vous pouvez gérer vos préférences
            via les paramètres de votre navigateur.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-xl font-bold text-white">Vos droits</h2>
          <p>
            Conformément au RGPD, vous disposez d'un droit d'accès, de
            rectification et de suppression de vos données. Pour exercer ces
            droits, contactez-nous via la page{" "}
            <a href="/contact" className="text-brand-300 underline">Contact</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
