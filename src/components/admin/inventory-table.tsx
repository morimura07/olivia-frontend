"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { StatusPill } from "@/components/ui/pill";
import { categories, getCategoryName } from "@/lib/data/categories";
import { cn, money, stockStatus } from "@/lib/format";
import { useToasts } from "@/lib/store/toast";
import type { Product, StockStatus } from "@/lib/types";

const statusFilters: Array<{ key: StockStatus | "all"; label: string }> = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "low", label: "Low stock" },
  { key: "restock", label: "Restock soon" },
];

/** Spec table: 12px muted headers over a #e5e3d8 rule, 41px rows split by #eeece2. */
export function InventoryTable({ products }: { products: Product[] }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const [status, setStatus] = useState<StockStatus | "all">("all");
  const push = useToasts((s) => s.push);

  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return products.filter(
      (p) =>
        (!needle || p.name.toLowerCase().includes(needle)) &&
        (cat === "all" || p.category === cat) &&
        (status === "all" || stockStatus(p.stock) === status),
    );
  }, [products, q, cat, status]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: products.length };
    products.forEach((p) => {
      const s = stockStatus(p.stock);
      c[s] = (c[s] ?? 0) + 1;
    });
    return c;
  }, [products]);

  return (
    <>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <label className="flex h-9 min-w-[200px] flex-1 items-center gap-2 rounded-btn bg-white px-3 shadow-card focus-within:shadow-[0_0_0_3px_rgb(245_166_35/0.35)] sm:max-w-[280px]">
          <span aria-hidden className="text-14">🔍</span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search products"
            aria-label="Search products"
            className="min-w-0 flex-1 bg-transparent text-14 font-light outline-none placeholder:text-placeholder"
          />
        </label>
        <select
          value={cat}
          onChange={(e) => setCat(e.target.value)}
          aria-label="Category"
          className="h-9 rounded-btn bg-white px-2 text-14 shadow-card outline-none focus-visible:shadow-[0_0_0_3px_rgb(245_166_35/0.35)]"
        >
          <option value="all">All categories</option>
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>{c.name}</option>
          ))}
        </select>
        <Button
          variant="citrus"
          className="ml-auto h-9 px-4"
          onClick={() => push({ emoji: "🧺", title: "Product editor coming soon", detail: "Connect a backend to add products" })}
        >
          + Add product
        </Button>
      </div>

      <div className="mt-3 flex gap-1.5 overflow-x-auto no-scrollbar">
        {statusFilters.map((f) => (
          <button
            key={f.key}
            type="button"
            aria-pressed={status === f.key}
            onClick={() => setStatus(f.key)}
            className={cn(
              "h-7 shrink-0 rounded-full px-3 text-12 transition-colors",
              status === f.key ? "bg-forest text-white" : "bg-white/70 text-forest ring-1 ring-rule hover:bg-white",
            )}
          >
            {f.label} <span className="opacity-60">{counts[f.key] ?? 0}</span>
          </button>
        ))}
      </div>

      <div className="mt-3 overflow-x-auto">
        <table className="w-full min-w-[500px] text-14">
          <thead>
            <tr className="border-b border-rule text-left text-12 text-muted">
              <th className="px-2 py-[9px] font-normal">Product</th>
              <th className="px-2 py-[9px] font-normal">Category</th>
              <th className="px-2 py-[9px] font-normal">Price</th>
              <th className="px-2 py-[9px] font-normal">Stock</th>
              <th className="px-2 py-[9px] font-normal">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((p) => (
              <tr key={p.id} className="h-[41px] border-b border-rule-soft font-light transition-colors hover:bg-white/70">
                <td className="px-2 whitespace-nowrap">
                  <span aria-hidden>{p.rowEmoji ?? p.emoji}</span> {p.name} · {p.shortSize}
                </td>
                <td className="px-2 whitespace-nowrap">{getCategoryName(p.category)}</td>
                <td className="px-2 tabular-nums">{money(p.price)}</td>
                <td className="px-2 tabular-nums">{p.stock}</td>
                <td className="px-2">
                  <StatusPill status={stockStatus(p.stock)} />
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={5} className="py-10 text-center font-light text-muted">No products match.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
