import type { Metadata } from "next";
import { CategoryTiles } from "@/components/shop/category-tiles";
import { ProductCard } from "@/components/shop/product-card";
import { getCategoryName } from "@/lib/data/categories";
import { products } from "@/lib/data/products";
import { cn } from "@/lib/format";
import { container } from "@/lib/layout";

export const metadata: Metadata = { title: "Search" };

export default async function SearchPage({ searchParams }: PageProps<"/search">) {
  const raw = (await searchParams).q;
  const q = (Array.isArray(raw) ? raw[0] : raw ?? "").trim();
  const needle = q.toLowerCase();
  const results = needle
    ? products.filter((p) =>
        [p.name, p.size, getCategoryName(p.category), p.description].some((s) => s.toLowerCase().includes(needle)),
      )
    : [];

  return (
    <div className={cn(container, "pt-6 md:pt-8")}>
      <h1 className="mb-3 font-serif text-22 font-bold">
        {q ? (
          <>
            Results for “{q}” · {results.length} {results.length === 1 ? "item" : "items"}
          </>
        ) : (
          "Search the aisles"
        )}
      </h1>

      {results.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-[repeat(4,1fr)] lg:grid-cols-[repeat(5,1fr)]">
          {results.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <>
          {q && <p className="mb-6 text-16 font-light text-muted">No matches yet — try “milk”, “eggs” or “bananas”, or browse an aisle:</p>}
          <CategoryTiles />
        </>
      )}
    </div>
  );
}
