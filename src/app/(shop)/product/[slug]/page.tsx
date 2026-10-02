import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddAllButton, ProductActions } from "@/components/shop/product-actions";
import { ProductCard } from "@/components/shop/product-card";
import { Eyebrow } from "@/components/ui/pill";
import { getCategory } from "@/lib/data/categories";
import { getProduct, getProductBySlug, getProductsByCategory, products } from "@/lib/data/products";
import { cn, discountPercent, money, tintBg } from "@/lib/format";
import { container } from "@/lib/layout";
import type { Product } from "@/lib/types";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/product/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProductBySlug(slug);
  return p ? { title: `${p.name} — ${p.size}`, description: p.description } : { title: "Product" };
}

function Stars({ rating }: { rating: number }) {
  const full = Math.round(rating);
  return (
    <span aria-hidden className="font-symbols text-16 tracking-[0.02em] text-citrus">
      {"★".repeat(full)}
      {"☆".repeat(5 - full)}
    </span>
  );
}

function MiniCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="group flex w-[98px] shrink-0 flex-col rounded-card bg-white p-4 shadow-card transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lift"
    >
      <span className={cn("grid h-[70px] place-items-center rounded-tile", tintBg[product.tint])}>
        <span aria-hidden className="text-30 transition-transform duration-300 group-hover:scale-110">
          {product.emoji}
        </span>
      </span>
      <span className="mt-2 truncate text-13 font-medium">{product.shortName ?? product.name}</span>
      <span className="mt-0.5 text-14 font-bold">{money(product.price)}</span>
    </Link>
  );
}

export default async function ProductPage({ params }: PageProps<"/product/[slug]">) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const category = getCategory(product.category)!;
  const sub = category.subcategories.find((s) => s.slug === product.subcategory);
  const tag = product.tag ?? [category.name, sub?.name].filter(Boolean).join(" · ");
  const pct = discountPercent(product);
  const pairs = (product.pairsWith ?? []).map((id) => getProduct(id)).filter((p): p is Product => !!p);
  const more = getProductsByCategory(product.category).filter((p) => p.id !== product.id).slice(0, 5);

  return (
    <div className={cn(container, "pt-5 pb-24 md:pt-8 md:pb-0")}>
      <nav aria-label="Breadcrumb" className="mb-4 text-13 font-light text-muted">
        <Link href="/" className="hover:text-forest">Home</Link>
        <span className="mx-1.5">/</span>
        <Link href={`/category/${category.slug}`} className="hover:text-forest">{category.name}</Link>
        <span className="mx-1.5">/</span>
        <span className="text-forest">{product.name}</span>
      </nav>

      <div className="grid gap-6 md:grid-cols-[340px_1fr] md:gap-10 lg:grid-cols-[minmax(340px,520px)_1fr] lg:gap-14">
        <div className="md:sticky md:top-[99px] md:self-start">
          <div
            className={cn(
              "group relative grid aspect-[340/280] place-items-center overflow-hidden rounded-card",
              tintBg[product.tint],
            )}
          >
            <div aria-hidden className="absolute inset-x-[18%] bottom-[16%] h-6 rounded-[50%] bg-forest/10 blur-md transition-transform duration-500 group-hover:scale-x-90" />
            <span aria-hidden className="relative text-110 transition-transform duration-500 ease-out group-hover:-translate-y-2 group-hover:scale-105 lg:text-[150px]">
              {product.emoji}
            </span>
          </div>
        </div>

        <div className="min-w-0">
          <Eyebrow tone="mint">{tag}</Eyebrow>
          <h1 className="mt-2.5 font-serif text-28 font-bold">
            {product.name} — {product.size}
          </h1>

          <div className="mt-2.5 flex items-center gap-1">
            <Stars rating={product.rating} />
            <span className="text-13 font-light text-muted">
              {product.rating.toFixed(1)} ({product.reviews} reviews)
            </span>
          </div>

          <div className="mt-3.5 flex flex-wrap items-center gap-1">
            <span className="text-24 font-bold">{money(product.price)}</span>
            {product.oldPrice && (
              <span className="text-16 font-light">
                <span className="sr-only">was</span> {money(product.oldPrice)}
              </span>
            )}
            {pct && (
              <span className="ml-0.5 inline-flex h-[31px] items-center rounded-full bg-tomato px-4 text-13 text-white">
                SAVE {pct}%
              </span>
            )}
          </div>

          <p className="mt-5 max-w-[340px] text-16 leading-[19px] font-light text-muted">{product.description}</p>

          {(product.organic || product.local) && (
            <div className="mt-3 flex gap-2 text-12">
              {product.organic && <span className="rounded-full bg-white px-2.5 py-1 shadow-card">🌱 Organic</span>}
              {product.local && <span className="rounded-full bg-white px-2.5 py-1 shadow-card">📍 Locally grown</span>}
            </div>
          )}

          <ProductActions product={product} />

          {pairs.length > 0 && (
            <section aria-labelledby="fbt" className="mt-7">
              <h2 id="fbt" className="font-serif text-16 font-bold">Frequently bought together</h2>
              <div className="mt-2.5 flex gap-5 overflow-x-auto pb-2 no-scrollbar">
                {pairs.map((p) => (
                  <MiniCard key={p.id} product={p} />
                ))}
              </div>
              <AddAllButton products={pairs} />
            </section>
          )}
        </div>
      </div>

      {more.length > 0 && (
        <section aria-labelledby="more" className="mt-14">
          <div className="mb-3 flex items-end justify-between">
            <h2 id="more" className="font-serif text-22 font-bold">More from {category.name}</h2>
            <Link href={`/category/${category.slug}`} className="text-14 font-medium text-leaf hover:text-forest">
              See all →
            </Link>
          </div>
          <div className="-mx-4 flex snap-x scroll-px-4 gap-4 overflow-x-auto px-4 pt-1 pb-3 no-scrollbar md:mx-0 md:grid md:grid-cols-[repeat(5,1fr)] md:overflow-visible md:px-0">
            {more.map((p) => (
              <ProductCard key={p.id} product={p} className="w-[160px] shrink-0 snap-start md:w-auto" />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
