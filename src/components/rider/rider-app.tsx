"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn, money } from "@/lib/format";
import { useToasts } from "@/lib/store/toast";

interface Stop {
  order: string;
  customer: string;
  address: string;
  note: string;
  items: number;
  total: number;
  cash?: boolean;
}

const stops: Stop[] = [
  { order: "HV-10449", customer: "Ava P.", address: "18 Elm Ct, Austin", note: "Ring twice please", items: 6, total: 34.1 },
  { order: "HV-10452", customer: "Omar F.", address: "903 Cedar Ave, Austin", note: "Gate code 4410", items: 5, total: 28.94, cash: true },
  { order: "HV-10456", customer: "Michael O.", address: "221 Maple St, Apt 4B, Austin", note: "Leave at the door, thank you!", items: 4, total: 21.55 },
  { order: "HV-10454", customer: "Luis G.", address: "47 Birch Rd, Austin", note: "Call on arrival", items: 3, total: 14.37 },
  { order: "HV-10458", customer: "Sara K.", address: "1200 Oak Blvd #12, Austin", note: "Front desk is fine", items: 8, total: 41.02, cash: true },
  { order: "HV-10460", customer: "Tom B.", address: "5 Willow Way, Austin", note: "Dog is friendly 🐕", items: 2, total: 9.88 },
];

/** Stylised route map: mint tile, dashed route, bobbing pin. */
function RouteMap() {
  return (
    <div className="relative h-[120px] overflow-hidden rounded-tile bg-mint">
      <svg aria-hidden viewBox="0 0 194 120" preserveAspectRatio="none" className="absolute inset-0 size-full">
        <path d="M0 86 H70 V40 H194" stroke="white" strokeWidth="9" fill="none" opacity="0.8" />
        <path d="M118 0 V120" stroke="white" strokeWidth="7" fill="none" opacity="0.6" />
        <path d="M22 100 C 60 96, 70 70, 96 62" stroke="var(--color-leaf)" strokeWidth="2.5" strokeDasharray="5 5" strokeLinecap="round" fill="none" />
        <circle cx="22" cy="100" r="5" fill="var(--color-forest)" stroke="white" strokeWidth="2" />
      </svg>
      <span aria-hidden className="absolute top-[30px] left-1/2 -translate-x-1/2 animate-float leading-none [animation-duration:2.4s]" style={{ fontSize: 36 }}>
        📍
      </span>
      <span className="absolute right-2 bottom-2 rounded-full bg-white/90 px-2 py-0.5 text-11 font-medium text-forest shadow-card">6 min · 1.2 mi</span>
    </div>
  );
}

export function RiderApp({ className }: { className?: string }) {
  const [index, setIndex] = useState(2);
  const push = useToasts((s) => s.push);
  const done = index >= stops.length;
  const stop = stops[Math.min(index, stops.length - 1)];

  if (done) {
    return (
      <div className={cn("flex flex-col items-center justify-center gap-2 text-center", className)}>
        <span aria-hidden className="text-52">🎉</span>
        <p className="font-serif text-18 font-bold text-forest">Shift complete</p>
        <p className="text-12 font-light text-muted">All {stops.length} deliveries dropped off.</p>
        <Button variant="forest" className="mt-2 w-full" onClick={() => setIndex(0)}>
          Start new route
        </Button>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col", className)}>
      <div className="flex items-center justify-between">
        <span className="text-12 text-[#888]">
          Delivery {index + 1} of {stops.length}
        </span>
        <span className="inline-flex h-[19px] items-center rounded-full bg-cream px-[10px] text-13 text-amber">En route</span>
      </div>

      {/* Progress across the route */}
      <div className="mt-2 flex gap-1" aria-hidden>
        {stops.map((s, i) => (
          <span key={s.order} className={cn("h-1 flex-1 rounded-full transition-colors duration-500", i < index ? "bg-leaf" : i === index ? "bg-citrus" : "bg-sand")} />
        ))}
      </div>

      <div className="mt-2.5">
        <RouteMap />
      </div>

      <div key={stop.order} className="mt-2.5 animate-toast rounded-card bg-white p-4 shadow-card ring-1 ring-black/[0.03]">
        <p className="text-16 font-medium text-forest">{stop.customer}</p>
        <p className="mt-0.5 text-12 font-light text-muted">{stop.address}</p>
        <p className="mt-1.5 text-12 text-forest italic">“{stop.note}”</p>
      </div>

      <div className="mt-2.5 flex items-center gap-2 rounded-card bg-white p-4 shadow-card ring-1 ring-black/[0.03]">
        <p className="min-w-0 flex-1 text-16 leading-[1.2] text-forest">
          <span aria-hidden>🫒</span> Order #{stop.order} · {stop.items} items
        </p>
        <span className="text-right">
          <span className="block text-16 font-medium text-forest">{money(stop.total)}</span>
          <span className={cn("block text-11", stop.cash ? "text-amber" : "text-leaf")}>{stop.cash ? "Collect cash" : "Paid"}</span>
        </span>
      </div>

      <Button
        variant="citrus"
        className="mt-2.5 w-full"
        onClick={() => {
          push({ emoji: "✅", title: `Order #${stop.order} delivered`, detail: index + 1 < stops.length ? `Next: ${stops[index + 1].customer}` : "Route complete" });
          setIndex((i) => i + 1);
        }}
      >
        Mark as delivered
      </Button>
    </div>
  );
}
