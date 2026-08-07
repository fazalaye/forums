/** @type {import('next').NextConfig} */

// Applied to every response. No Content-Security-Policy here on purpose: the
// Chariow checkout widget injects its own script, stylesheet and iframe from
// js.chariowcdn.com and bundledeals.store, so a CSP has to be built and tested
// against those origins rather than switched on blind.
//
// Strict-Transport-Security deliberately omits `preload`: submitting to the
// browser preload list is effectively irreversible and should be a conscious
// decision once every subdomain is confirmed HTTPS-only.
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains",
  },
];

// No `images` block: next/image is not used anywhere in this codebase, and the
// previous `remotePatterns: [{ hostname: "**" }]` turned /_next/image into an
// open image proxy — any third party could have it fetch and re-serve arbitrary
// images from our domain, on our metered optimisation quota. With no remote
// patterns configured, /_next/image rejects external URLs outright.
const nextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return [
      {
        source: "/index.html",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
