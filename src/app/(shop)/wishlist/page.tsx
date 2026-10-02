"use client";

import { ProductCard } from "@/components/shop/product-card";
import { ButtonLink } from "@/components/ui/button";
import { getProduct } from "@/lib/data/products";
import { cn } from "@/lib/format";
import { container } from "@/lib/layout";
import { useWishlist } from "@/lib/store/wishlist";
import type { Product } from "@/lib/types";

export default function WishlistPage() {
  const ids = useWishlist((s) => s.ids);
  const saved = ids.map(getProduct).filter((p): p is Product => !!p);

  return (
    <div className={cn(container, "pt-6 md:pt-8")}>
      <h1 className="mb-3 font-serif text-22 font-bold">Saved items · {saved.length}</h1>
      {saved.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-[repeat(4,1fr)] lg:grid-cols-[repeat(5,1fr)]">
          {saved.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="grid place-items-center rounded-card bg-white px-6 py-16 text-center shadow-card">
          <span aria-hidden className="font-symbols text-52 text-tomato">♡</span>
          <p className="mt-3 font-serif text-18 font-bold">Nothing saved yet</p>
          <p className="mt-1 text-14 font-light text-muted">Tap the heart on any product to keep it here.</p>
          <ButtonLink href="/" className="mt-5">Browse deals</ButtonLink>
        </div>
      )}
    </div>
  );
}
