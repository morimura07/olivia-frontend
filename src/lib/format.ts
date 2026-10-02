import type { Product, StockStatus, Tint } from "@/lib/types";

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

export function money(value: number): string {
  return usd.format(value);
}

export function discountPercent(p: Pick<Product, "price" | "oldPrice" | "savePct">): number | null {
  if (!p.oldPrice || p.oldPrice <= p.price) return null;
  return p.savePct ?? Math.round((1 - p.price / p.oldPrice) * 100);
}

/** Tile backgrounds as Tailwind classes, so they survive class scanning. */
export const tintBg: Record<Tint, string> = {
  peach: "bg-peach",
  mint: "bg-mint",
  sky: "bg-sky",
  aqua: "bg-aqua",
  apricot: "bg-apricot",
  blush: "bg-blush",
  wheat: "bg-wheat",
  cream: "bg-cream",
};

export function stockStatus(stock: number): StockStatus {
  if (stock <= 12) return "low";
  if (stock <= 20) return "restock";
  return "active";
}

export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
