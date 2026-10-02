import Link from "next/link";
import { categories } from "@/lib/data/categories";

/**
 * Seven white tiles, 110px tall, 14px radius. On the spec's 794px canvas
 * they share the row like `1fr` grid tracks that never shrink below their
 * longest word ("Vegetables", "Beverages"), so the same rule is used here.
 */
export function CategoryTiles() {
  return (
    <div className="-mx-4 flex snap-x scroll-px-4 gap-3 overflow-x-auto px-4 pb-2 no-scrollbar md:mx-0 md:grid md:grid-cols-[repeat(7,1fr)] md:overflow-visible md:px-0 md:pb-0">
      {categories.map((c) => (
        <Link
          key={c.slug}
          href={`/category/${c.slug}`}
          className="group flex h-[110px] w-[100px] shrink-0 snap-start flex-col items-center rounded-card bg-white px-4 pt-[15px] text-center shadow-card transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lift md:w-auto"
        >
          <span aria-hidden className="text-34 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-115">
            {c.emoji}
          </span>
          <span className="mt-[3px] text-16 font-light text-forest">{c.name}</span>
        </Link>
      ))}
    </div>
  );
}
