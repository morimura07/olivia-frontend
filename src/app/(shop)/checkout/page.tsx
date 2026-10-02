"use client";

import Link from "next/link";
import { useState } from "react";
import { OrderSummary } from "@/components/shop/order-summary";
import { Button, ButtonLink } from "@/components/ui/button";
import { getProduct } from "@/lib/data/products";
import { cn, money } from "@/lib/format";
import { container } from "@/lib/layout";
import { computeTotals } from "@/lib/pricing";
import { cartSubtotal, useCart } from "@/lib/store/cart";

const slots = [
  { id: "asap", title: "ASAP", detail: "In about 45 min" },
  { id: "6pm", title: "6:00 – 7:00 pm", detail: "Today" },
  { id: "7pm", title: "7:00 – 8:00 pm", detail: "Today" },
  { id: "tmr", title: "9:00 – 10:00 am", detail: "Tomorrow" },
];

const payments = [
  { id: "card", title: "Card", detail: "Visa ending 4242", emoji: "💳" },
  { id: "cash", title: "Cash on delivery", detail: "Pay the rider", emoji: "💵" },
];

let orderSeq = 10457;
function nextOrderId() {
  return `HV-${orderSeq++}`;
}

const field =
  "h-[42px] w-full rounded-btn border border-rule bg-white px-3 text-16 font-light text-forest outline-none transition-shadow placeholder:text-placeholder focus:border-citrus focus:shadow-[0_0_0_3px_rgb(245_166_35/0.25)]";

function Choice({
  name,
  checked,
  onChange,
  children,
}: {
  name: string;
  checked: boolean;
  onChange: () => void;
  children: React.ReactNode;
}) {
  return (
    <label
      className={cn(
        "relative flex cursor-pointer items-center gap-3 rounded-card border bg-white p-3.5 transition-[border-color,box-shadow]",
        checked ? "border-forest shadow-[0_0_0_1px_var(--color-forest)]" : "border-rule hover:border-moss/50",
      )}
    >
      <input type="radio" name={name} checked={checked} onChange={onChange} className="peer sr-only" />
      <span
        aria-hidden
        className={cn(
          "grid size-[18px] shrink-0 place-items-center rounded-full border-2 transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-citrus",
          checked ? "border-forest" : "border-rule",
        )}
      >
        {checked && <span className="size-2 rounded-full bg-forest" />}
      </span>
      {children}
    </label>
  );
}

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-card bg-white/60 p-4 ring-1 ring-rule md:p-5">
      <h2 className="flex items-center gap-2.5 font-serif text-18 font-bold">
        <span className="grid size-6 place-items-center rounded-full bg-forest font-sans text-12 font-medium text-white">{n}</span>
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export default function CheckoutPage() {
  const lines = useCart((s) => s.lines);
  const clear = useCart((s) => s.clear);
  const [slot, setSlot] = useState("asap");
  const [payment, setPayment] = useState("card");
  const [placed, setPlaced] = useState<{ id: string; total: number; count: number } | null>(null);
  const totals = computeTotals(cartSubtotal(lines));

  if (placed) {
    return (
      <div className={cn(container, "pt-8")}>
        <div className="relative mx-auto max-w-[520px] overflow-hidden rounded-hero bg-forest px-6 py-12 text-center text-white">
          <div aria-hidden className="absolute -top-20 left-1/2 size-[260px] -translate-x-1/2 rounded-full bg-leaf/35 blur-[80px]" />
          <span aria-hidden className="relative inline-block animate-float text-[72px]">🧺</span>
          <h1 className="relative mt-4 font-serif text-28 font-bold">Order placed!</h1>
          <p className="relative mt-2 text-16 font-light text-mist">
            Order <span className="font-medium text-white">#{placed.id}</span> · {placed.count} items · {money(placed.total)}
          </p>
          <p className="relative mt-1 text-16 font-light text-mist">A rider will be at your door in about 45 minutes.</p>
          <div className="relative mt-6 flex justify-center gap-[5px]">
            <ButtonLink href="/rider">Track delivery</ButtonLink>
            <ButtonLink href="/" variant="ghost-dark">Keep shopping</ButtonLink>
          </div>
        </div>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className={cn(container, "pt-8 text-center")}>
        <p className="text-16 font-light text-muted">Your cart is empty.</p>
        <ButtonLink href="/" className="mt-4">Back to the shop</ButtonLink>
      </div>
    );
  }

  return (
    <div className={cn(container, "pt-6 md:pt-8")}>
      <Link href="/cart" className="text-13 font-light text-muted hover:text-forest">← Back to cart</Link>
      <h1 className="mt-2 font-serif text-22 font-bold">Checkout</h1>

      <form
        className="mt-3 grid items-start gap-8 md:grid-cols-[minmax(0,1fr)_320px] lg:grid-cols-[minmax(0,1fr)_360px]"
        onSubmit={(e) => {
          e.preventDefault();
          setPlaced({ id: nextOrderId(), total: totals.total, count: lines.length });
          clear();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        <div className="space-y-4">
          <Step n={1} title="Delivery address">
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="sm:col-span-2">
                <span className="mb-1 block text-12 text-muted">Full name</span>
                <input required className={field} defaultValue="Michael O." autoComplete="name" />
              </label>
              <label className="sm:col-span-2">
                <span className="mb-1 block text-12 text-muted">Street address</span>
                <input required className={field} defaultValue="221 Maple St, Apt 4B" autoComplete="street-address" />
              </label>
              <label>
                <span className="mb-1 block text-12 text-muted">City</span>
                <input required className={field} defaultValue="Austin, TX" autoComplete="address-level2" />
              </label>
              <label>
                <span className="mb-1 block text-12 text-muted">Phone</span>
                <input required className={field} defaultValue="(512) 555-0142" autoComplete="tel" inputMode="tel" />
              </label>
              <label className="sm:col-span-2">
                <span className="mb-1 block text-12 text-muted">Note for the rider</span>
                <input className={field} defaultValue="Leave at the door, thank you!" />
              </label>
            </div>
          </Step>

          <Step n={2} title="Delivery time">
            <div className="grid gap-2.5 sm:grid-cols-2">
              {slots.map((s) => (
                <Choice key={s.id} name="slot" checked={slot === s.id} onChange={() => setSlot(s.id)}>
                  <span>
                    <span className="block text-15 font-medium">{s.title}</span>
                    <span className="block text-12 font-light text-muted">{s.detail}</span>
                  </span>
                  {s.id === "asap" && (
                    <span className="ml-auto rounded-full bg-citrus/20 px-2 py-0.5 text-11 font-medium text-amber">FASTEST</span>
                  )}
                </Choice>
              ))}
            </div>
          </Step>

          <Step n={3} title="Payment">
            <div className="grid gap-2.5 sm:grid-cols-2">
              {payments.map((p) => (
                <Choice key={p.id} name="payment" checked={payment === p.id} onChange={() => setPayment(p.id)}>
                  <span aria-hidden className="text-22">{p.emoji}</span>
                  <span>
                    <span className="block text-15 font-medium">{p.title}</span>
                    <span className="block text-12 font-light text-muted">{p.detail}</span>
                  </span>
                </Choice>
              ))}
            </div>
          </Step>
        </div>

        <div className="space-y-3 md:sticky md:top-[99px]">
          <div className="rounded-card bg-white p-4 shadow-card">
            <ul className="space-y-2">
              {lines.map((l) => {
                const p = getProduct(l.id);
                if (!p) return null;
                return (
                  <li key={l.id} className="flex items-center gap-3 text-14">
                    <span aria-hidden className="text-22">{p.emoji}</span>
                    <span className="flex-1 truncate">
                      {p.name} <span className="font-light text-muted">× {l.qty}</span>
                    </span>
                    <span className="tabular-nums">{money(p.price * l.qty)}</span>
                  </li>
                );
              })}
            </ul>
          </div>
          <OrderSummary totals={totals}>
            <Button type="submit" variant="citrus" className="w-full">
              Place order — {money(totals.total)}
            </Button>
          </OrderSummary>
        </div>
      </form>
    </div>
  );
}
