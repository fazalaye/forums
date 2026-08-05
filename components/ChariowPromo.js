import ChariowWidget from "@/components/ChariowWidget";

export default function ChariowPromo() {
  return (
    <div className="mx-auto max-w-3xl overflow-hidden px-6 pb-10">
      <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-amber-300">
        Notre sélection
      </p>
      <ChariowWidget
        productId="prd_66t2es"
        storeDomain="bundledeals.store"
        style="frame"
        borderStyle="rounded"
        ctaWidth="xs"
        ctaAnimation="shine"
        locale="fr"
        primaryColor="#FFCC00"
        backgroundColor="#ffffff"
        customCtaText="Acheter maintenant"
      />
    </div>
  );
}
