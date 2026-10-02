import { ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/pill";

/** Forest hero: 282px tall, 16px radius, 36px side padding, content centred vertically. */
export function Hero() {
  return (
    <section className="relative isolate flex min-h-[282px] items-center overflow-hidden rounded-hero bg-forest px-6 py-10 sm:px-9 sm:py-0">
      {/* Soft light behind the produce — the modern layer on top of the flat spec */}
      <div aria-hidden className="pointer-events-none absolute -top-24 right-[-60px] -z-10 size-[340px] rounded-full bg-leaf/30 blur-[90px]" />
      <div aria-hidden className="pointer-events-none absolute -bottom-32 right-[180px] -z-10 size-[240px] rounded-full bg-citrus/15 blur-[90px]" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07] [background-image:radial-gradient(white_1px,transparent_1px)] [background-size:18px_18px] [mask-image:linear-gradient(to_left,black,transparent_60%)]"
      />

      <div className="relative max-w-[460px]">
        <Eyebrow tone="citrus">Today only — 45 min delivery</Eyebrow>
        <h1 className="mt-3 font-serif text-28 font-bold text-white sm:text-32">
          Fresh produce, delivered <br className="hidden sm:inline" />
          before dinner.
        </h1>
        <div className="mt-4 flex flex-wrap gap-[5px]">
          <ButtonLink href="/category/fruits" variant="citrus">
            Shop fresh deals
          </ButtonLink>
          <ButtonLink href="#categories" variant="ghost-dark">
            Browse categories
          </ButtonLink>
        </div>
      </div>

      <div aria-hidden className="absolute top-1/2 right-4 flex -translate-y-1/2 flex-col items-center gap-[15px] opacity-30 sm:right-[88px] sm:opacity-100">
        <span className="animate-float text-90 drop-shadow-[0_12px_18px_rgb(0_0_0/0.25)]">🥬</span>
        <span className="animate-float text-90 drop-shadow-[0_12px_18px_rgb(0_0_0/0.25)] [animation-delay:-3s]">🍇</span>
      </div>
    </section>
  );
}
