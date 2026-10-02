import type { Metadata } from "next";
import Link from "next/link";
import { RiderApp } from "@/components/rider/rider-app";
import { Logo } from "@/components/ui/logo";
import { Eyebrow } from "@/components/ui/pill";

export const metadata: Metadata = { title: "Delivery partner" };

export default function RiderPage() {
  return (
    <>
      {/* Phone: the rider app itself, full screen */}
      <div className="min-h-dvh bg-paper md:hidden">
        <div className="flex h-14 items-center justify-between bg-forest px-4">
          <Logo size={20} tag="RIDER" />
          <Link href="/" className="text-13 text-white/70">Exit</Link>
        </div>
        <RiderApp className="p-4" />
      </div>

      {/* Tablet & desktop: the spec's showcase with a live phone */}
      <section className="relative isolate hidden min-h-dvh items-center overflow-hidden bg-forest md:flex">
        <div aria-hidden className="absolute top-1/4 right-[8%] -z-10 size-[420px] rounded-full bg-leaf/25 blur-[110px]" />
        <div aria-hidden className="absolute -bottom-40 left-[10%] -z-10 size-[360px] rounded-full bg-citrus/10 blur-[110px]" />

        <div className="mx-auto grid w-full max-w-[1100px] grid-cols-[1fr_auto] items-center gap-10 px-16 py-16">
          <div>
            <Link href="/" className="mb-10 inline-block opacity-90 transition-opacity hover:opacity-100">
              <Logo size={26} />
            </Link>
            <div>
              <Eyebrow>Delivery partner app · Mobile</Eyebrow>
            </div>
            <h1 className="mt-3 font-serif text-30 font-bold text-white lg:text-[40px] lg:leading-[1.15]">
              One tap from pickup to <br />
              porch.
            </h1>
            <p className="mt-3 max-w-[330px] text-16 leading-[19px] font-light text-mist lg:max-w-[400px]">
              Riders see the pickup bay, optimized route and customer instructions in a single screen.
            </p>
            <ul className="mt-3 space-y-[3px] text-16 text-citrus">
              <li><span aria-hidden className="font-symbols">✓</span> Turn-by-turn navigation</li>
              <li><span aria-hidden className="font-symbols">✓</span> Cash &amp; digital reconciliation</li>
            </ul>
          </div>

          <div className="relative">
            <div aria-hidden className="absolute inset-x-6 -bottom-6 h-10 rounded-[50%] bg-black/40 blur-2xl" />
            <div className="relative w-[246px] rounded-[30px] border-[10px] border-black bg-white p-4 shadow-[0_30px_60px_-20px_rgb(0_0_0/0.6)] lg:w-[300px]">
              <RiderApp />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
