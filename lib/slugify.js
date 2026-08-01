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

/**
 * Caps a slug to a maximum length, cutting at the last dash boundary
 * so it never ends mid-word.
 */
export function truncateSlug(slug, maxLength = 60) {
  if (slug.length <= maxLength) return slug;
  const truncated = slug.slice(0, maxLength);
  const lastDash = truncated.lastIndexOf("-");
  return lastDash > 0 ? truncated.slice(0, lastDash) : truncated;
}
