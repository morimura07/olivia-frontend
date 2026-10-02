import type { Metadata } from "next";
import Link from "next/link";
import { cn, money } from "@/lib/format";
import { container } from "@/lib/layout";

export const metadata: Metadata = { title: "Your account" };

const orders = [
  { id: "HV-10456", date: "Today, 5:12 pm", items: 4, total: 21.55, emoji: "🍎🍅🥛🥖", state: "En route" },
  { id: "HV-10311", date: "Sep 27", items: 7, total: 38.2, emoji: "🥦🥕🍗🍚", state: "Delivered" },
  { id: "HV-10187", date: "Sep 20", items: 3, total: 12.79, emoji: "🍌🥚🍞", state: "Delivered" },
];

export default function AccountPage() {
  return (
    <div className={cn(container, "pt-6 md:pt-8")}>
      <div className="flex items-center gap-4">
        <span className="grid size-14 place-items-center rounded-full bg-forest text-24 text-white">👤</span>
        <div>
          <h1 className="font-serif text-22 font-bold">Michael O.</h1>
          <p className="text-14 font-light text-muted">📍 221 Maple St, Apt 4B, Austin</p>
        </div>
      </div>

      <h2 className="mt-8 mb-3 font-serif text-18 font-bold">Recent orders</h2>
      <ul className="divide-y divide-line rounded-card bg-white px-4 shadow-card">
        {orders.map((o) => (
          <li key={o.id} className="flex flex-wrap items-center gap-x-4 gap-y-1 py-4">
            <span aria-hidden className="text-22 tracking-[-0.1em]">{o.emoji}</span>
            <div className="min-w-[140px] flex-1">
              <p className="text-16 font-medium">#{o.id}</p>
              <p className="text-12 font-light text-muted">
                {o.date} · {o.items} items
              </p>
            </div>
            {o.state === "En route" ? (
              <Link href="/rider" className="rounded-full bg-cream px-[10px] py-[3px] text-12 font-medium text-amber hover:brightness-95">
                En route · Track
              </Link>
            ) : (
              <span className="rounded-full bg-mint px-[10px] py-[3px] text-12 font-medium text-leaf">Delivered</span>
            )}
            <span className="w-[64px] text-right text-16 font-medium tabular-nums">{money(o.total)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
