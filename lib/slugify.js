/**
 * Turns an arbitrary string into a URL-safe slug (lowercase, accents stripped,
 * non-alphanumerics collapsed to single dashes).
 */
export function slugify(str) {
  return String(str || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
