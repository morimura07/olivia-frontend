import { CategoryTiles } from "@/components/shop/category-tiles";
import { Hero } from "@/components/shop/hero";
import { ProductCard } from "@/components/shop/product-card";
import { getDeals } from "@/lib/data/products";
import { cn } from "@/lib/format";
import { container } from "@/lib/layout";

export default function HomePage() {
  const deals = getDeals();

  return (
    <div className={cn(container, "pt-6 md:pt-8")}>
      <Hero />

      <section id="categories" aria-labelledby="cat-title" className="scroll-mt-28">
        <h2 id="cat-title" className="mt-7 mb-3 font-serif text-22 font-bold">
          Shop by category
        </h2>
        <CategoryTiles />
      </section>

      <section aria-labelledby="deals-title">
        <h2 id="deals-title" className="mt-7 mb-3 font-serif text-22 font-bold">
          This week&apos;s deals
        </h2>
        <div className="-mx-4 flex snap-x scroll-px-4 gap-4 overflow-x-auto px-4 pt-1 pb-3 no-scrollbar md:mx-0 md:grid md:grid-cols-[repeat(5,1fr)] md:overflow-visible md:px-0 md:pt-0">
          {deals.map((p) => (
            <ProductCard key={p.id} product={p} className="w-[160px] shrink-0 snap-start md:w-auto md:min-w-auto" />
          ))}
        </div>
      </section>
    </div>
  );
}
