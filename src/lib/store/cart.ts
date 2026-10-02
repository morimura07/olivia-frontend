"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getProduct } from "@/lib/data/products";

export interface CartLine {
  id: string;
  qty: number;
}

interface CartState {
  lines: CartLine[];
  add: (id: string, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
}

/** The basket shown in the spec's cart screen, used as the demo starting state. */
const seed: CartLine[] = [
  { id: "p-fuji-apples", qty: 2 },
  { id: "p-roma-tomatoes", qty: 1 },
  { id: "p-whole-milk", qty: 1 },
  { id: "p-sourdough-loaf", qty: 1 },
];

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      lines: seed,
      add: (id, qty = 1) =>
        set((s) => {
          const existing = s.lines.find((l) => l.id === id);
          if (existing) {
            return { lines: s.lines.map((l) => (l.id === id ? { ...l, qty: l.qty + qty } : l)) };
          }
          return { lines: [...s.lines, { id, qty }] };
        }),
      setQty: (id, qty) =>
        set((s) => ({
          lines:
            qty <= 0
              ? s.lines.filter((l) => l.id !== id)
              : s.lines.map((l) => (l.id === id ? { ...l, qty } : l)),
        })),
      remove: (id) => set((s) => ({ lines: s.lines.filter((l) => l.id !== id) })),
      clear: () => set({ lines: [] }),
    }),
    { name: "olivia-cart", version: 1, skipHydration: true },
  ),
);

export function cartSubtotal(lines: CartLine[]): number {
  return lines.reduce((sum, l) => sum + (getProduct(l.id)?.price ?? 0) * l.qty, 0);
}

export function useCartQty(id: string): number {
  return useCart((s) => s.lines.find((l) => l.id === id)?.qty ?? 0);
}
