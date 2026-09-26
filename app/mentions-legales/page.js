import { SITE_URL } from "@/lib/seo";

export const metadata = {
  title: "Mentions légales",
  description: "Mentions légales et informations éditoriales de PromptForums.org.",
  alternates: { canonical: `${SITE_URL}/mentions-legales` },
};

export default function LegalNoticePage() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-6 text-4xl font-extrabold">Mentions légales</h1>
      <div className="glass-card flex flex-col gap-6 p-8 text-slate-300">
        <section>
          <h2 className="mb-2 text-xl font-bold text-white">Éditeur du site</h2>
          <p>
            PromptForums.org publie un annuaire indépendant de sites et de
            prompts liés à l’intelligence artificielle. Pour joindre l’éditeur
            au sujet du site ou de son contenu, écrivez à{" "}
            <a href="mailto:admin@promptforums.org" className="text-brand-300 underline">
              admin@promptforums.org
            </a>.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-xl font-bold text-white">Hébergement</h2>
          <p>
            Le site est exploité à partir de son infrastructure de déploiement
                et de ses prestataires techniques. Pour les informations précises
            sur l’hébergeur légal (dénomination et adresse), contactez l’éditeur
            à l’adresse indiquée ci-dessus.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-xl font-bold text-white">Propriété intellectuelle</h2>
          <p>
            Les contenus éditoriaux et visuels publiés par PromptForums sont
            protégés par les règles applicables. Les prompts soumis restent la
            propriété de leurs auteurs ; leur publication autorise leur
            affichage dans le cadre du service.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-xl font-bold text-white">Liens externes</h2>
          <p>
            L’annuaire référence des services tiers. Certains liens peuvent
            être affiliés ou sponsorisés et sont signalés lorsqu’ils
            s’appliquent. Les services externes restent soumis à leurs propres
            conditions et politiques.
          </p>
        </section>
      </div>
    </div>
  );
}
