/**
 * Crawlers, SEO tools and monitors that hit outbound links.
 *
 * The outbound redirector counted every request, including these, which made
 * the click totals useless: bots crawl every link on the site systematically,
 * so they flatten the distribution and drown out the handful of real visits
 * that actually tell us which tools people care about.
 *
 * Deliberately broad. A missed human click costs nothing here — the counter is
 * a relative ranking, not an audience metric — while a counted bot corrupts it.
 */
const BOT_PATTERN =
  /bot|crawl|spider|slurp|scrape|curl|wget|python-requests|http-client|headless|phantom|lighthouse|monitor|uptime|preview|fetcher|archiver|feed|validator|semrush|ahrefs|majestic|moz|dataprovider|screaming|serpstat|petal|bytespider|gptbot|claudebot|perplexity|ccbot|facebookexternalhit|whatsapp|telegram|discord|slack|vercel/i;

export function isBot(userAgent) {
  if (!userAgent) return true; // no UA at all is never a real browser
  return BOT_PATTERN.test(userAgent);
}
