import { SITE_URL } from "@/lib/seo";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact",
  description:
    "Contactez l'équipe PromptForums pour une question, une correction éditoriale, un partenariat ou une demande de publicité.",
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 text-4xl font-extrabold">Contact</h1>
      <div className="glass-card flex flex-col gap-4 p-8 text-slate-300">
        <p className="text-sm text-slate-400">
          Une réponse est généralement apportée sous quelques jours ouvrés.
        </p>
        <p>
          Une question, une correction à signaler, un partenariat, une demande
          de publicité ou une suggestion de site à ajouter à l'annuaire ?
          Écrivez-nous.
        </p>
        <ContactForm />
        <p>
          📧 Email :{" "}
          <a href="mailto:admin@promptforums.org" className="text-brand-300 underline">
            admin@promptforums.org
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
