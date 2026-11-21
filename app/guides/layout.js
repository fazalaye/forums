export default function GuidesLayout({ children }) {
  return (
    <div className="flex flex-col gap-10">
      {children}
      <a
        href="https://auctionr.org/4/7c87f53bf73d47f443bd605960ac7007"
        target="_blank"
        rel="noopener nofollow sponsored"
        className="btn-primary mx-auto inline-flex w-fit"
      >
        Découvrir cette offre spéciale
      </a>
    </div>
  );
}
