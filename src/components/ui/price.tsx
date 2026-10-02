import { cn, discountPercent, money } from "@/lib/format";
import type { Product } from "@/lib/types";

/** Bold current price with the struck-through previous price, as on product cards. */
export function Price({
  product,
  className,
  size = "card",
}: {
  product: Pick<Product, "price" | "oldPrice">;
  className?: string;
  size?: "card" | "mini";
}) {
  return (
    <span className={cn("inline-flex items-baseline gap-1.5 whitespace-nowrap", className)}>
      <span className={cn("font-bold text-forest", size === "card" ? "text-16" : "text-14")}>
        {money(product.price)}
      </span>
      {product.oldPrice && (
        <s className="text-13 font-normal text-strike">
          <span className="sr-only">was </span>
          {money(product.oldPrice)}
        </s>
      )}
    </span>
  );
}

/** Tomato "-20%" corner badge. */
export function SaleBadge({ product, className }: { product: Pick<Product, "price" | "oldPrice" | "savePct">; className?: string }) {
  const pct = discountPercent(product);
  if (!pct) return null;
  return (
    <span
      className={cn(
        "inline-flex h-[17px] items-center rounded-badge bg-tomato px-2 text-11 font-medium text-white",
        className,
      )}
    >
      -{pct}%
    </span>
  );
}
