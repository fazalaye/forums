// The page itself is a client component and cannot export metadata, so the
// noindex lives here. A submission form has nothing to offer search results;
// the prompts it creates are indexed at /prompts/[slug].
export const metadata = {
  title: "Proposer un prompt",
  robots: { index: false, follow: true },
};

export default function NewPromptLayout({ children }) {
  return children;
}
