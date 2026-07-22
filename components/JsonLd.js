/**
 * Renders a JSON-LD structured-data block. Server component; the JSON is
 * injected as-is so crawlers and answer engines can read it.
 */
export default function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
