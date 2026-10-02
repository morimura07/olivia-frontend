import type { ReactNode } from "react";
import { money } from "@/lib/format";
import type { Totals } from "@/lib/pricing";

/** White summary card: Serif title, Light 16px muted rows, Bold 17px total, full-width CTA. */
export function OrderSummary({ totals, children }: { totals: Totals; children?: ReactNode }) {
  return (
    <section aria-labelledby="summary-title" className="rounded-card bg-white p-4 shadow-card">
      <h2 id="summary-title" className="font-serif text-16 font-bold">Order summary</h2>
      <dl className="mt-2.5 space-y-[10px] text-16 font-light text-muted">
        <div className="flex justify-between">
          <dt>Subtotal</dt>
          <dd className="tabular-nums">{money(totals.subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt>Delivery fee</dt>
          <dd className="tabular-nums">{totals.delivery === 0 && totals.subtotal > 0 ? <span className="font-medium text-leaf">Free</span> : money(totals.delivery)}</dd>
        </div>
        <div className="flex justify-between">
          <dt>Estimated tax</dt>
          <dd className="tabular-nums">{money(totals.tax)}</dd>
        </div>
      </dl>
      <div className="mt-3 flex justify-between border-t border-line pt-3 text-17 font-bold">
        <span>Total</span>
        <span className="tabular-nums">{money(totals.total)}</span>
      </div>
      {children && <div className="mt-[22px]">{children}</div>}
    </section>
  );
}
