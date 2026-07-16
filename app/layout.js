import "./globals.css";
import Providers from "@/components/Providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  metadataBase: new URL("https://promptforums.org"),
  title: {
    default: "PromptForums — L'annuaire des meilleurs sites et prompts IA",
    template: "%s | PromptForums",
  },
  description:
    "Découvrez, comparez et notez les meilleurs sites, outils et prompts d'intelligence artificielle. Annuaire francophone avec listings premium, prompts communautaires et bons plans IA.",
  keywords: [
    "prompts IA",
    "annuaire IA",
    "ChatGPT",
    "Midjourney",
    "prompt engineering",
    "outils intelligence artificielle",
  ],
  openGraph: {
    title: "PromptForums — L'annuaire des meilleurs sites et prompts IA",
    description:
      "Découvrez, comparez et notez les meilleurs sites, outils et prompts d'intelligence artificielle.",
    url: "https://promptforums.org",
    siteName: "PromptForums",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PromptForums — L'annuaire des meilleurs sites et prompts IA",
    description:
      "Découvrez, comparez et notez les meilleurs sites, outils et prompts d'intelligence artificielle.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <Providers>
          <Header />
          <main className="mx-auto min-h-[70vh] max-w-7xl px-6 py-10">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
