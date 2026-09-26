import AdBanner from "@/components/AdBanner";

export default function GuidesLayout({ children }) {
  return (
    <div className="flex flex-col gap-10">
      {children}
      <AdBanner slotId="guide-content-bottom" />
    </div>
  );
}
