"use client";

import { useEffect, useState } from "react";
import { cn, money } from "@/lib/format";
import { useCart } from "@/lib/store/cart";
import { useToasts } from "@/lib/store/toast";
import type { Product } from "@/lib/types";

/** The round forest "+" on product cards. */
export function AddButton({ product, className }: { product: Product; className?: string }) {
  const add = useCart((s) => s.add);
  const push = useToasts((s) => s.push);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return;
    const t = setTimeout(() => setAdded(false), 1200);
    return () => clearTimeout(t);
  }, [added]);

  return (
    <button
      type="button"
      aria-label={`Add ${product.name} to cart`}
      onClick={() => {
        add(product.id);
        setAdded(true);
        push({ emoji: product.emoji, title: `${product.name} added`, detail: `${product.size} · ${money(product.price)}` });
      }}
      className={cn(
        "relative grid size-[30px] shrink-0 place-items-center rounded-full text-18 leading-none text-white transition-[background-color,transform] duration-200 hover:scale-110 active:scale-95",
        added ? "bg-leaf" : "bg-forest hover:bg-[#1c4a29]",
        className,
      )}
    >
      <span aria-hidden className={cn("transition-transform duration-200", added && "scale-0")}>+</span>
      <span aria-hidden className={cn("absolute font-symbols text-14 transition-transform duration-200", added ? "scale-100" : "scale-0")}>
        ✓
      </span>
    </button>
  );
}
