import type { Metadata } from "next";
import Link from "next/link";
import { ProductCard } from "@/components/shop/product-card";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { Eyebrow } from "@/components/ui/pill";
import { getProduct } from "@/lib/data/products";

export const metadata: Metadata = { title: "Design system" };

const swatches = [
  { name: "Forest", hex: "#12331B", role: "Nav, headings", cls: "bg-forest" },
  { name: "Leaf", hex: "#4C9A3E", role: "Secondary actions", cls: "bg-leaf" },
  { name: "Citrus", hex: "#F5A623", role: "Primary CTA", cls: "bg-citrus" },
  { name: "Tomato", hex: "#D9432E", role: "Sale tags", cls: "bg-tomato" },
  { name: "Paper", hex: "#F4F3EA", role: "Background", cls: "bg-paper border border-[#dddddd]" },
];

const goods = ["🍎", "🥦", "🍌", "🥖", "🥛", "🍅", "🧀", "🥕", "🧅", "🍗", "🥚", "🍊", "🍞", "🧄", "🫒"];

const surfaces = [
  { href: "/", label: "Customer Web" },
  { href: "/admin", label: "Admin Console" },
  { href: "/rider", label: "Delivery App" },
];

export default function DesignSystemPage() {
  const apples = getProduct("p-fuji-apples")!;

  return (
    <div className="min-h-dvh bg-paper">
      {/* Cover */}
      <section className="relative isolate overflow-hidden bg-forest">
        <div aria-hidden className="absolute -top-32 right-[-80px] -z-10 size-[420px] rounded-full bg-leaf/25 blur-[110px]" />
        <div className="mx-auto max-w-[1100px] px-4 pt-14 pb-11 sm:px-16">
          <Eyebrow>UI / UX web design specification</Eyebrow>
          <div className="mt-5">
            <Logo size={56} />
          </div>
          <p className="mt-4 max-w-[500px] text-16 leading-[24px] font-light text-mist">
            Online supermarket platform — customer web app, admin console and delivery-partner screens, rebranded around
            Olivia Super Market&apos;s fresh, leafy identity.
          </p>
          <nav aria-label="Surfaces" className="mt-[30px] flex flex-wrap gap-[13px]">
            {surfaces.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="inline-flex h-8 items-center rounded-full border border-moss px-4 text-13 text-white transition-colors hover:border-citrus hover:bg-white/5"
              >
                {s.label} <span aria-hidden className="ml-1.5 text-citrus">→</span>
              </Link>
            ))}
          </nav>
        </div>
      </section>

      {/* Design system */}
      <section className="mx-auto max-w-[1100px] px-4 pt-14 pb-16 sm:px-16">
        <h1 className="font-serif text-22 font-bold">Design system</h1>
        <p className="mt-3 max-w-[600px] text-16 leading-[19px] font-light text-muted">
          A leafy, farm-fresh palette drawn from the Olivia logo — deep forest green, a lively leaf green, citrus orange and
          tomato red — with goods shown as simple icons for fast scanning.
        </p>

        <div className="mt-[30px] grid gap-10 md:grid-cols-[204px_1fr_184px] md:gap-0">
          <div>
            <h2 className="font-serif text-14 font-bold">Colour</h2>
            <ul className="mt-[11px] space-y-[14px]">
              {swatches.map((s) => (
                <li key={s.name} className="flex items-start gap-[10px]">
                  <span className={`size-8 shrink-0 rounded-badge ${s.cls}`} />
                  <span>
                    <span className="block text-16 font-medium">
                      {s.name} — {s.hex}
                    </span>
                    <span className="block text-12 font-light text-muted">{s.role}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-14 font-bold">Buttons</h2>
            <div className="mt-[11px] flex max-w-[230px] flex-wrap gap-1">
              <Button variant="citrus">Add to cart</Button>
              <Button variant="forest">Checkout</Button>
              <Button variant="outline">Save item</Button>
            </div>
            <h2 className="mt-6 font-serif text-14 font-bold">Goods iconography</h2>
            <ul className="mt-[11px] grid w-max grid-cols-6 gap-x-[14px] gap-y-[5px] text-28 leading-[1.17]">
              {goods.map((g) => (
                <li key={g} className="cursor-default transition-transform duration-200 hover:-translate-y-1 hover:scale-125">
                  {g}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-14 font-bold">Product card</h2>
            <ProductCard product={apples} className="mt-[11px] w-[184px]" />
          </div>
        </div>
      </section>
    </div>
  );
}
