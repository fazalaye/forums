export const metadata = {
  title: "Contact",
  description:
    "Contactez l'équipe PromptForums pour toute question, partenariat ou demande de publicité.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 text-4xl font-extrabold">Contact</h1>
      <div className="glass-card flex flex-col gap-4 p-8 text-slate-300">
        <p>
          Une question, un partenariat, une demande de publicité ou une
          suggestion de site à ajouter à l'annuaire ? Écrivez-nous.
        </p>
        <p>
          📧 Email :{" "}
          <a href="mailto:contact@promptforums.org" className="text-brand-300 underline">
            contact@promptforums.org
          </a>
        </p>
        <p>
          📢 Pour les demandes de publicité ou de listing Featured, rendez-vous
          sur la page{" "}
          <a href="/submit" className="text-brand-300 underline">
            Soumettre un site
          </a>
          .
        </p>
      </div>
    </div>
  );
}
