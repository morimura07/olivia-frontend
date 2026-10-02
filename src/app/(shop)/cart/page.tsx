"use client";

import Link from "next/link";
import { OrderSummary } from "@/components/shop/order-summary";
import { ButtonLink } from "@/components/ui/button";
import { QtyStepper } from "@/components/ui/qty-stepper";
import { getProduct } from "@/lib/data/products";
import { cn, money } from "@/lib/format";
import { container } from "@/lib/layout";
import { computeTotals, FREE_DELIVERY_THRESHOLD } from "@/lib/pricing";
import { cartSubtotal, useCart } from "@/lib/store/cart";

export default function CartPage() {
  const lines = useCart((s) => s.lines);
  const setQty = useCart((s) => s.setQty);
  const totals = computeTotals(cartSubtotal(lines));
  const progress = Math.min(100, (totals.subtotal / FREE_DELIVERY_THRESHOLD) * 100);

  if (lines.length === 0) {
    return (
      <div className={cn(container, "pt-8")}>
        <div className="mx-auto grid max-w-[480px] place-items-center rounded-card bg-white px-6 py-16 text-center shadow-card">
          <span aria-hidden className="text-52">🛒</span>
          <h1 className="mt-3 font-serif text-22 font-bold">Your cart is empty</h1>
          <p className="mt-1 text-16 font-light text-muted">Fresh deals are waiting — fill it up before dinner.</p>
          <ButtonLink href="/" className="mt-5">Start shopping</ButtonLink>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(container, "pt-6 md:pt-8")}>
      <div className="grid items-start gap-8 md:grid-cols-[minmax(0,1fr)_320px] lg:grid-cols-[minmax(0,1fr)_360px]">
        <div>
          <h1 className="font-serif text-22 font-bold">
            Your cart · {lines.length} {lines.length === 1 ? "item" : "items"}
          </h1>

          <ul className="mt-3 rounded-card bg-white px-4 py-3 shadow-card">
            {lines.map((line) => {
              const p = getProduct(line.id);
              if (!p) return null;
              return (
                <li key={line.id} className="group flex items-center border-b border-line py-4 last:border-0">
                  <Link href={`/product/${p.slug}`} className="flex min-w-0 flex-1 items-center gap-[22px]">
                    <span aria-hidden className="w-[34px] shrink-0 text-34 transition-transform duration-300 group-hover:scale-110">
                      {p.emoji}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-16 font-medium">{p.name}</span>
                      <span className="block text-12 font-light text-muted">{p.size}</span>
                    </span>
                  </Link>
                  <QtyStepper
                    value={line.qty}
                    min={0}
                    label={`${p.name} quantity`}
                    onChange={(q) => setQty(line.id, q)}
                    className="ml-3"
                  />
                  <span className="w-[64px] text-right text-16 font-medium tabular-nums">{money(p.price * line.qty)}</span>
                </li>
              );
            })}
          </ul>

          <div className="mt-4 rounded-card bg-white px-4 py-3 shadow-card">
            <p className="text-14 font-light text-muted">
              {totals.toFreeDelivery > 0 ? (
                <>
                  Add <span className="font-medium text-forest">{money(totals.toFreeDelivery)}</span> more for{" "}
                  <span className="font-medium text-leaf">free delivery</span> 🚚
                </>
              ) : (
                <span className="font-medium text-leaf">🎉 You&apos;ve unlocked free delivery</span>
              )}
            </p>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-mint">
              <div className="h-full rounded-full bg-leaf transition-[width] duration-500" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>

        <div className="md:sticky md:top-[99px]">
          <OrderSummary totals={totals}>
            <ButtonLink href="/checkout" variant="forest" className="w-full">
              Proceed to checkout
            </ButtonLink>
          </OrderSummary>
          <p className="mt-3 text-center text-12 font-light text-muted">🔒 Secure checkout · Delivered in 45 minutes</p>
        </div>
      </div>
    </div>
  );
}
