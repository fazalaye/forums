import Link from "next/link";
import { SITE_URL } from "@/lib/seo";

export default function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Fil d'Ariane" className="mb-4 flex flex-wrap items-center gap-1.5 text-sm text-slate-400">
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={item.url} className="flex items-center gap-1.5">
            {i > 0 && <span aria-hidden="true">/</span>}
            {isLast ? (
              <span className="text-slate-300">{item.name}</span>
            ) : (
              <Link
                href={item.url.replace(SITE_URL, "") || "/"}
                className="hover:text-white"
              >
                {item.name}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
