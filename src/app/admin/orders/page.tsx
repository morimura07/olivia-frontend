import type { Metadata } from "next";
import { orders, orderStatusStyle } from "@/lib/data/admin";
import { cn, money } from "@/lib/format";

export const metadata: Metadata = { title: "Orders" };

export default function OrdersPage() {
  return (
    <>
      <h1 className="font-serif text-22 font-bold">Orders</h1>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[620px] text-14">
          <thead>
            <tr className="border-b border-rule text-left text-12 text-muted">
              <th className="px-2 py-[9px] font-normal">Order</th>
              <th className="px-2 py-[9px] font-normal">Customer</th>
              <th className="px-2 py-[9px] font-normal">Items</th>
              <th className="px-2 py-[9px] font-normal">Placed</th>
              <th className="px-2 py-[9px] font-normal">Rider</th>
              <th className="px-2 py-[9px] font-normal">Total</th>
              <th className="px-2 py-[9px] font-normal">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="h-[41px] border-b border-rule-soft font-light transition-colors hover:bg-white/70">
                <td className="px-2 font-medium">#{o.id}</td>
                <td className="px-2">{o.customer}</td>
                <td className="px-2 tabular-nums">{o.items}</td>
                <td className="px-2 text-muted">{o.placed}</td>
                <td className="px-2">{o.rider ?? <span className="text-muted">—</span>}</td>
                <td className="px-2 tabular-nums">{money(o.total)}</td>
                <td className="px-2">
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
