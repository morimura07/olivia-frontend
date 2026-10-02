"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { QtyStepper } from "@/components/ui/qty-stepper";
import { cn, money } from "@/lib/format";
import { useCart } from "@/lib/store/cart";
import { useToasts } from "@/lib/store/toast";
import { useWishlist } from "@/lib/store/wishlist";
import type { Product } from "@/lib/types";

export function WishButton({ product, className }: { product: Product; className?: string }) {
  const saved = useWishlist((s) => s.ids.includes(product.id));
  const toggle = useWishlist((s) => s.toggle);
  const push = useToasts((s) => s.push);
  return (
    <button
      type="button"
      aria-pressed={saved}
      aria-label={saved ? "Remove from saved items" : "Save item"}
      onClick={() => {
        const now = toggle(product.id);
        push({ emoji: now ? "💚" : product.emoji, title: now ? "Saved for later" : "Removed from saved", detail: product.name });
      }}
      className={cn(
        "grid size-10 place-items-center rounded-full text-20 transition-[background-color,transform] hover:bg-forest/8 active:scale-90",
        className,
      )}
    >
      <span className={cn("font-symbols transition-colors", saved ? "text-tomato" : "text-forest")}>{saved ? "♥" : "♡"}</span>
    </button>
  );
}

export function ProductActions({ product }: { product: Product }) {
  const [qty, setQty] = useState(2);
  const add = useCart((s) => s.add);
  const push = useToasts((s) => s.push);

  const addToCart = () => {
    add(product.id, qty);
    push({ emoji: product.emoji, title: `${qty} × ${product.name} added`, detail: `${money(product.price * qty)} · View your cart` });
  };
  const label = `Add to cart — ${money(product.price * qty)}`;

  return (
    <>
      <div className="mt-4 flex items-center gap-[14px]">
        <QtyStepper boxed value={qty} onChange={setQty} />
        <Button variant="citrus" className="min-w-[188px] px-4" onClick={addToCart}>
          <span aria-hidden>🛒</span> {label}
        </Button>
        <WishButton product={product} className="-ml-[3px]" />
      </div>

      {/* Mobile: keep the CTA in reach while scrolling */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-rule bg-paper/90 px-4 py-3 backdrop-blur-md md:hidden">
        <div className="flex items-center gap-3">
          <QtyStepper boxed value={qty} onChange={setQty} />
          <Button variant="citrus" className="flex-1 px-3" onClick={addToCart}>
            <span aria-hidden>🛒</span> {label}
          </Button>
        </div>
      </div>
    </>
  );
}

export function AddAllButton({ products }: { products: Product[] }) {
  const add = useCart((s) => s.add);
  const push = useToasts((s) => s.push);
  const total = products.reduce((s, p) => s + p.price, 0);
  return (
    <button
      type="button"
      onClick={() => {
        products.forEach((p) => add(p.id));
        push({ emoji: "🧺", title: `${products.length} items added`, detail: `${money(total)} · Frequently bought together` });
      }}
      className="mt-3 text-13 font-medium text-leaf underline-offset-4 transition-colors hover:text-forest hover:underline"
    >
      + Add all {products.length} for {money(total)}
    </button>
  );
}
