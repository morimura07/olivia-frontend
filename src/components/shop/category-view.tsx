"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/shop/product-card";
import { cn, discountPercent } from "@/lib/format";
import type { Category, Product } from "@/lib/types";

type FilterKey = "organic" | "local" | "sale";
type SortKey = "featured" | "price-asc" | "price-desc" | "discount";

const filterLabels: Record<FilterKey, string> = {
  organic: "Organic",
  local: "Locally grown",
  sale: "On sale",
};

const filterFns: Record<FilterKey, (p: Product) => boolean> = {
  organic: (p) => !!p.organic,
  local: (p) => !!p.local,
  sale: (p) => discountPercent(p) !== null,
};

function sortProducts(list: Product[], sort: SortKey): Product[] {
  const copy = [...list];
  switch (sort) {
    case "price-asc":
      return copy.sort((a, b) => a.price - b.price);
    case "price-desc":
      return copy.sort((a, b) => b.price - a.price);
    case "discount":
      return copy.sort((a, b) => (discountPercent(b) ?? 0) - (discountPercent(a) ?? 0));
    default:
      return copy;
  }
}

function Checkbox({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <label className="group flex h-[43px] cursor-pointer items-center gap-2 rounded-btn px-3 text-14 text-white/90 transition-colors hover:bg-white/8">
      <input type="checkbox" checked={checked} onChange={onChange} className="peer sr-only" />
      <span
        aria-hidden
        className={cn(
          "grid size-[13px] place-items-center rounded-[3px] border text-[10px] leading-none transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-citrus",
          checked ? "border-citrus bg-citrus text-ink" : "border-white/80",
        )}
      >
        {checked && <span className="font-symbols">✓</span>}
      </span>
      {label}
    </label>
  );
}

export function CategoryView({ category, products }: { category: Category; products: Product[] }) {
  const [sub, setSub] = useState<string | null>(null);
  const [filters, setFilters] = useState<Record<FilterKey, boolean>>({ organic: false, local: false, sale: false });
  const [sort, setSort] = useState<SortKey>("featured");

  const visible = useMemo(() => {
    const active = (Object.keys(filters) as FilterKey[]).filter((k) => filters[k]);
    const list = products.filter(
      (p) => (!sub || p.subcategory === sub) && active.every((k) => filterFns[k](p)),
    );
    return sortProducts(list, sort);
  }, [products, sub, filters, sort]);

  const toggle = (k: FilterKey) => setFilters((f) => ({ ...f, [k]: !f[k] }));
  const subName = category.subcategories.find((s) => s.slug === sub)?.name;
  const allLabel = `All ${category.name.toLowerCase()}`;

  return (
    <div className="md:grid md:grid-cols-[171px_1fr] xl:grid-cols-[220px_1fr]">
      {/* ── Sidebar (md+) ── */}
      <aside className="hidden bg-forest md:block">
        <div className="sticky top-[75px] max-h-[calc(100dvh-75px)] overflow-y-auto px-[18px] pt-[25px] pb-8 no-scrollbar">
          <p className="px-0 text-11 tracking-[0.04em] text-white/55 uppercase">{category.name}</p>
          <ul className="mt-[13px] flex flex-col gap-px">
            {[{ slug: null as string | null, name: allLabel }, ...category.subcategories].map((s) => {
              const active = sub === s.slug;
              return (
                <li key={s.slug ?? "all"}>
                  <button
                    type="button"
                    onClick={() => setSub(s.slug)}
                    aria-current={active ? "true" : undefined}
                    className={cn(
                      "flex h-[39px] w-full items-center gap-1 rounded-btn px-3 text-left text-14 text-white transition-colors",
                      active ? "bg-white/15 font-medium" : "text-white/90 hover:bg-white/8",
                    )}
                  >
                    {s.slug === null && <span aria-hidden className="font-symbols">☰</span>}
                    {s.name}
                  </button>
                </li>
              );
            })}
          </ul>

          <p className="mt-[22px] text-11 tracking-[0.04em] text-white/55 uppercase">Filter by</p>
          <div className="mt-1.5 -ml-3 flex flex-col">
            {(Object.keys(filterLabels) as FilterKey[]).map((k) => (
              <Checkbox key={k} checked={filters[k]} onChange={() => toggle(k)} label={filterLabels[k]} />
            ))}
          </div>
        </div>
      </aside>

      {/* ── Results ── */}
      <section className="min-w-0 px-4 pt-5 pb-4 md:px-10 md:pt-7">
        {/* Mobile subcategory + filter chips */}
        <div className="-mx-4 mb-4 flex gap-2 overflow-x-auto px-4 no-scrollbar md:hidden">
          {[{ slug: null as string | null, name: "All" }, ...category.subcategories].map((s) => (
            <button
              key={s.slug ?? "all"}
              type="button"
              onClick={() => setSub(s.slug)}
              className={cn(
                "h-8 shrink-0 rounded-full px-3.5 text-13 transition-colors",
                sub === s.slug ? "bg-forest text-white" : "bg-white text-forest shadow-card",
              )}
            >
              {s.name}
            </button>
          ))}
          <span className="mx-1 w-px shrink-0 bg-forest/15" />
          {(Object.keys(filterLabels) as FilterKey[]).map((k) => (
            <button
              key={k}
              type="button"
              aria-pressed={filters[k]}
              onClick={() => toggle(k)}
              className={cn(
                "h-8 shrink-0 rounded-full px-3.5 text-13 transition-colors",
                filters[k] ? "bg-citrus text-ink" : "bg-white text-forest shadow-card",
              )}
            >
              {filterLabels[k]}
            </button>
          ))}
        </div>

        <div className="mb-3 flex flex-wrap items-end justify-between gap-x-4 gap-y-2">
          <h1 className="font-serif text-22 font-bold">
            <span aria-hidden className="font-sans">{category.emoji}</span> {subName ?? category.name} · {visible.length}{" "}
            {visible.length === 1 ? "item" : "items"}
          </h1>
          <label className="flex items-center gap-2 text-13 font-light text-muted">
            Sort
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="h-8 rounded-btn border border-rule bg-white px-2 text-13 font-normal text-forest outline-none focus-visible:border-citrus"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
              <option value="discount">Biggest saving</option>
            </select>
          </label>
        </div>

        {visible.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-[repeat(4,1fr)] xl:grid-cols-[repeat(5,1fr)]">
            {visible.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="grid place-items-center rounded-card bg-white px-6 py-16 text-center shadow-card">
            <span aria-hidden className="text-52">🧺</span>
            <p className="mt-3 font-serif text-18 font-bold">Nothing matches those filters</p>
            <p className="mt-1 text-14 font-light text-muted">Try clearing a filter or picking another aisle.</p>
            <button
              type="button"
              onClick={() => {
                setSub(null);
                setFilters({ organic: false, local: false, sale: false });
              }}
              className="mt-4 text-14 font-medium text-leaf underline-offset-4 hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
