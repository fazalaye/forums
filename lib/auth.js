import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

const providers = [];

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  );
}

if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
  providers.push(
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    })
  );
}

// Dev-only mock login so the auth-gated flows (publish a prompt, comment,
// profile) can be tested locally without registering real Google/GitHub
// OAuth apps. Never enabled in production, regardless of env vars set.
if (process.env.NODE_ENV !== "production") {
  providers.push(
    CredentialsProvider({
      id: "dev-test-login",
      name: "Connexion de test (dev uniquement)",
      credentials: {
        name: { label: "Nom", type: "text", placeholder: "Testeur" },
        email: { label: "Email", type: "email", placeholder: "test@example.com" },
      },
      async authorize(credentials) {
        if (!credentials?.email) return null;
        return {
          id: `dev-${credentials.email}`,
          name: credentials.name || credentials.email.split("@")[0],
          email: credentials.email,
        };
      },
    })
  );
}

export const authOptions = {
  providers,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session }) {
      return session;
    },
  },
};
