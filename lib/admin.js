import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

/**
 * Admin emails come from the ADMIN_EMAILS env var (comma-separated).
 * If it is unset, nobody is admin — a safe default so the admin routes are
 * never open to every logged-in user.
 */
function adminEmails() {
  return (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminEmail(email) {
  if (!email) return false;
  return adminEmails().includes(email.toLowerCase());
}

/**
 * Returns the session if the current user is an admin, otherwise null.
 * Route handlers use this to gate every admin action server-side.
 */
export async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session || !isAdminEmail(session.user?.email)) return null;
  return session;
}
