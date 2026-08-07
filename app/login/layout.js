// The page itself is a client component and cannot export metadata, so the
// noindex lives here. A sign-in form has nothing to offer search results.
export const metadata = {
  title: "Connexion",
  robots: { index: false, follow: true },
};

export default function LoginLayout({ children }) {
  return children;
}
