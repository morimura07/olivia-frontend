import Link from "next/link";
import { AddButton } from "@/components/shop/add-button";
import { Price, SaleBadge } from "@/components/ui/price";
import { cn, tintBg } from "@/lib/format";
import type { Product } from "@/lib/types";

/**
 * Spec card: 14px radius, 16px padding, 110px pastel icon tile (10px radius)
 * holding a 52px emoji, Medium 15px name, Light 12px size, then price + "+".
 */
export function ProductCard({ product, className }: { product: Product; className?: string }) {
  const href = `/product/${product.slug}`;
  return (
    <article
      className={cn(
        "group relative flex min-w-0 flex-col rounded-card bg-white p-4 shadow-card transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lift",
        className,
      )}
    >
      <SaleBadge product={product} className="absolute top-2 left-2 z-10" />
      <Link
        href={href}
        tabIndex={-1}
        aria-hidden
        className={cn("grid h-[110px] place-items-center overflow-hidden rounded-tile", tintBg[product.tint])}
      >
        <span className="text-52 transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-rotate-6">
          {product.emoji}
        </span>
      </Link>
      <h3 className="mt-2.5 text-15 font-medium text-forest">
        <Link href={href} className="after:absolute after:inset-0 after:rounded-card focus-visible:outline-none">
          {product.name}
        </Link>
      </h3>
      <p className="mt-px text-12 font-light text-muted">{product.size}</p>
      <div className="mt-1.5 flex items-center">
        <Price product={product} />
        {/* Sits above the full-card link so it stays clickable */}
        <AddButton product={product} className="z-10 ml-auto" />
      </div>
    </article>
  );
}
