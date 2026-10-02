import Link from "next/link";
import { Greeting } from "@/components/admin/greeting";
import { StatCard } from "@/components/admin/stat-card";
import { orders, orderStatusStyle, stats } from "@/lib/data/admin";
import { products } from "@/lib/data/products";
import { cn, money, stockStatus } from "@/lib/format";

export default function DashboardPage() {
  const lowStock = products
    .filter((p) => stockStatus(p.stock) !== "active")
    .sort((a, b) => a.stock - b.stock);

  return (
    <>
      <Greeting name="Michael" />

      <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-[repeat(4,1fr)]">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      <h2 className="mt-6 font-serif text-15 font-bold">Low stock alerts</h2>
      <div className="mt-3 grid gap-3 sm:grid-cols-3 sm:gap-5">
        {lowStock.map((p) => (
          <Link
            key={p.id}
            href="/admin/products"
            className="group rounded-card bg-white p-4 text-16 shadow-card transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-lift"
          >
            <p>
              <span aria-hidden>{p.emoji}</span> <span className="font-medium">{p.name}</span>
              <span className="font-light"> — {p.stock} units left</span>
            </p>
            <div className="mt-3 h-1 overflow-hidden rounded-full bg-blush">
              <div
                className={cn("h-full rounded-full", p.stock <= 12 ? "bg-tomato" : "bg-citrus")}
                style={{ width: `${Math.max(6, (p.stock / 40) * 100)}%` }}
              />
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 flex items-end justify-between">
        <h2 className="font-serif text-15 font-bold">Recent orders</h2>
        <Link href="/admin/orders" className="text-13 font-medium text-leaf hover:text-forest">View all →</Link>
      </div>
      <div className="mt-3 overflow-x-auto rounded-card bg-white shadow-card">
        <table className="w-full min-w-[520px] text-14">
          <thead>
            <tr className="border-b border-rule text-left text-12 text-muted">
              <th className="px-4 py-2.5 font-normal">Order</th>
              <th className="px-4 py-2.5 font-normal">Customer</th>
              <th className="px-4 py-2.5 font-normal">Placed</th>
              <th className="px-4 py-2.5 text-right font-normal">Total</th>
              <th className="px-4 py-2.5 font-normal">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.slice(0, 5).map((o) => (
              <tr key={o.id} className="border-b border-rule-soft transition-colors last:border-0 hover:bg-paper/60">
                <td className="px-4 py-2.5 font-medium">#{o.id}</td>
                <td className="px-4 py-2.5 font-light">{o.customer}</td>
                <td className="px-4 py-2.5 font-light text-muted">{o.placed}</td>
                <td className="px-4 py-2.5 text-right tabular-nums">{money(o.total)}</td>
                <td className="px-4 py-2.5">
                  <span className={cn("inline-flex h-[22px] items-center rounded-full px-[10px] text-12 font-medium", orderStatusStyle[o.status])}>
                    {o.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
