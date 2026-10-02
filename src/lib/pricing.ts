/** Flat delivery fee from the spec's order summary. */
export const DELIVERY_FEE = 2.99;
/** Orders at or above this subtotal ship free. */
export const FREE_DELIVERY_THRESHOLD = 35;
/** Austin grocery tax estimate; $17.46 → $1.10 as in the spec. */
export const TAX_RATE = 0.063;

const round2 = (n: number) => Math.round(n * 100) / 100;

export interface Totals {
  subtotal: number;
  delivery: number;
  tax: number;
  total: number;
  /** How much more to spend for free delivery (0 once unlocked). */
  toFreeDelivery: number;
}

export function computeTotals(subtotal: number): Totals {
  const sub = round2(subtotal);
  const delivery = sub === 0 || sub >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const tax = round2(sub * TAX_RATE);
  return {
    subtotal: sub,
    delivery,
    tax,
    total: round2(sub + delivery + tax),
    toFreeDelivery: Math.max(0, round2(FREE_DELIVERY_THRESHOLD - sub)),
  };
}
