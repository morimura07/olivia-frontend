"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/shop/product-card";
import { cn, discountPercent } from "@/lib/format";
import { container } from "@/lib/layout";
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

/*
 * Sidebar geometry — one system for every row:
 *   · 40px rows (36px pill + 4px gap), 8px pill radius
 *   · 12px inner inset, then a 16px icon column, then an 8px gap to the label
 *   · section labels sit on the same 12px inset, in a 32px row that mirrors
 *     the results' title row, so the first nav pill and the first card row
 *     start on the same line.
 */
const row = "flex h-9 w-full items-center gap-2 rounded-btn px-3 text-left text-14 transition-colors";
const iconSlot = "grid w-4 shrink-0 place-items-center";
const sectionLabel = "flex h-8 items-center px-3 text-11 font-medium tracking-[0.08em] text-white/50 uppercase";

function FilterRow({ checked, onChange, label, count }: { checked: boolean; onChange: () => void; label: string; count: number }) {
  return (
    <label className={cn(row, "cursor-pointer text-white/85 hover:bg-white/8 hover:text-white", checked && "text-white")}>
      <input type="checkbox" checked={checked} onChange={onChange} className="peer sr-only" />
      <span className={iconSlot}>
        <span
          aria-hidden
          className={cn(
            "grid size-[14px] place-items-center rounded-[4px] border text-[10px] leading-none transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-citrus",
            checked ? "border-citrus bg-citrus text-ink" : "border-white/60",
          )}
        >
          {checked && <span className="font-symbols">✓</span>}
        </span>
      </span>
      <span className="flex-1 truncate">{label}</span>
      <span className="text-12 text-white/45 tabular-nums">{count}</span>
    </label>
  );
}

export function CategoryView({ category, products }: { category: Category; products: Product[] }) {
  const [sub, setSub] = useState<string | null>(null);
  const [filters, setFilters] = useState<Record<FilterKey, boolean>>({ organic: false, local: false, sale: false });
  const [sort, setSort] = useState<SortKey>("featured");

  const visible = useMemo(() => {
    const active = (Object.keys(filters) as FilterKey[]).filter((k) => filters[k]);
    const list = products.filter((p) => (!sub || p.subcategory === sub) && active.every((k) => filterFns[k](p)));
    return sortProducts(list, sort);
  }, [products, sub, filters, sort]);

  const subCount = (slug: string | null) => products.filter((p) => !slug || p.subcategory === slug).length;
  const filterCount = (k: FilterKey) => products.filter(filterFns[k]).length;
  const toggle = (k: FilterKey) => setFilters((f) => ({ ...f, [k]: !f[k] }));
  const clearAll = () => {
    setSub(null);
    setFilters({ organic: false, local: false, sale: false });
  };
  const anyFilter = sub !== null || Object.values(filters).some(Boolean);
  const subName = category.subcategories.find((s) => s.slug === sub)?.name;
  const navItems = [{ slug: null as string | null, name: `All ${category.name.toLowerCase()}` }, ...category.subcategories];

  return (
    // Sits flush against the footer so the forest panel runs the full height.
    <div className="-mb-16 overflow-x-clip">
      <div
        className={cn(
          container,
          "md:grid md:min-h-[calc(100dvh-75px)] md:grid-cols-[200px_minmax(0,1fr)] md:gap-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-10",
        )}
      >
        {/* ── Sidebar (md+): starts on the header's content edge, its panel bleeds to the viewport edge ── */}
        <aside
          aria-label={`${category.name} aisles and filters`}
          className="relative hidden bg-forest md:block before:absolute before:inset-y-0 before:right-full before:w-screen before:bg-forest"
        >
          <div className="sticky top-[75px] max-h-[calc(100dvh-75px)] overflow-y-auto pt-7 pr-4 pb-10 no-scrollbar">
            <p className={cn(sectionLabel, "mb-3")}>{category.name}</p>
            <ul className="flex flex-col gap-1">
              {navItems.map((s) => {
                const active = sub === s.slug;
                return (
                  <li key={s.slug ?? "all"}>
                    <button
                      type="button"
                      onClick={() => setSub(s.slug)}
                      aria-current={active ? "true" : undefined}
                      className={cn(row, active ? "bg-white/15 font-medium text-white" : "text-white/85 hover:bg-white/8 hover:text-white")}
                    >
                      <span aria-hidden className={iconSlot}>
                        {s.slug === null ? (
                          <span className="font-symbols text-14 leading-none">☰</span>
                        ) : (
                          <span className={cn("size-1.5 rounded-full transition-colors", active ? "bg-citrus" : "bg-white/35")} />
                        )}
                      </span>
                      <span className="flex-1 truncate">{s.name}</span>
                      <span className={cn("text-12 tabular-nums", active ? "text-white/70" : "text-white/45")}>{subCount(s.slug)}</span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="mx-3 my-5 h-px bg-white/10" />

            <div className="mb-1 flex items-center justify-between">
              <p className={sectionLabel}>Filter by</p>
              {anyFilter && (
                <button type="button" onClick={clearAll} className="h-8 px-3 text-12 text-citrus hover:underline">
                  Clear
                </button>
              )}
            </div>
            <div className="flex flex-col gap-1">
              {(Object.keys(filterLabels) as FilterKey[]).map((k) => (
                <FilterRow key={k} checked={filters[k]} onChange={() => toggle(k)} label={filterLabels[k]} count={filterCount(k)} />
              ))}
            </div>
          </div>
        </aside>

        {/* ── Results ── */}
        <section className="min-w-0 pt-5 pb-16 md:pt-7">
          {/* Mobile aisle + filter chips */}
          <div className="-mx-4 mb-4 flex gap-2 overflow-x-auto px-4 no-scrollbar md:hidden">
            {navItems.map((s) => (
              <button
                key={s.slug ?? "all"}
                type="button"
                onClick={() => setSub(s.slug)}
                className={cn(
                  "h-8 shrink-0 rounded-full px-3.5 text-13 transition-colors",
                  sub === s.slug ? "bg-forest text-white" : "bg-white text-forest shadow-card",
                )}
              >
                {s.slug === null ? "All" : s.name}
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

          {/* Title row: 32px tall, the same height as the sidebar's section label */}
          <div className="mb-3 flex min-h-8 flex-wrap items-center justify-between gap-x-4 gap-y-2 md:h-8 md:flex-nowrap">
            <h1 className="min-w-0 truncate font-serif text-22 leading-8 font-bold">
              <span aria-hidden className="font-sans leading-none">{category.emoji}</span> {subName ?? category.name} · {visible.length}{" "}
              {visible.length === 1 ? "item" : "items"}
            </h1>
            <label className="flex shrink-0 items-center gap-2 text-13 font-light text-muted">
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
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {visible.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="grid place-items-center rounded-card bg-white px-6 py-16 text-center shadow-card">
              <span aria-hidden className="text-52">🧺</span>
              <p className="mt-3 font-serif text-18 font-bold">Nothing matches those filters</p>
              <p className="mt-1 text-14 font-light text-muted">Try clearing a filter or picking another aisle.</p>
              <button type="button" onClick={clearAll} className="mt-4 text-14 font-medium text-leaf underline-offset-4 hover:underline">
                Clear all filters
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
