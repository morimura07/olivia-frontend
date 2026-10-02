"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/format";
import { useCart } from "@/lib/store/cart";
import { useWishlist } from "@/lib/store/wishlist";

import { container } from "@/lib/layout";

function SearchBox({ className }: { className?: string }) {
  const router = useRouter();
  const params = useSearchParams();
  const [q, setQ] = useState(params.get("q") ?? "");

  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        const term = q.trim();
        router.push(term ? `/search?q=${encodeURIComponent(term)}` : "/search");
      }}
      className={cn(
        "flex h-[39px] min-w-0 items-center gap-2 rounded-btn bg-white pl-[15px] pr-2 transition-shadow focus-within:shadow-[0_0_0_3px_rgb(245_166_35/0.45)]",
        className,
      )}
    >
      <span aria-hidden className="text-16 text-[#333]">🔍</span>
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search for milk, eggs, bananas…"
        aria-label="Search products"
        className="h-full min-w-0 flex-1 bg-transparent text-16 font-light text-forest outline-none placeholder:text-placeholder [&::-webkit-search-cancel-button]:hidden"
      />
    </form>
  );
}

function IconLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="relative grid size-[30px] place-items-center rounded-full text-18 text-white transition-colors hover:bg-white/10"
    >
      {children}
    </Link>
  );
}

export function Header({ showAddress = true }: { showAddress?: boolean }) {
  const lineCount = useCart((s) => s.lines.length);
  const saved = useWishlist((s) => s.ids.length);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 bg-forest transition-shadow duration-300",
        scrolled && "shadow-[0_8px_24px_-12px_rgb(0_0_0/0.45)]",
      )}
    >
      <div className={cn(container, "flex h-[64px] items-center gap-6 md:h-[75px]")}>
        <Link href="/" aria-label="Olivia home" className="shrink-0 transition-opacity hover:opacity-90">
          <Logo size={26} />
        </Link>

        <Suspense fallback={<div className="hidden h-[39px] flex-1 rounded-btn bg-white md:block" />}>
          <SearchBox className="hidden flex-1 md:flex" />
        </Suspense>

        {showAddress && (
          <button
            type="button"
            className="hidden shrink-0 items-center gap-1 rounded-btn px-2 py-1 text-13 text-white transition-colors hover:bg-white/10 xl:flex"
          >
            <span aria-hidden>📍</span> Deliver to — 221 Maple St, Austin
          </button>
        )}

        <nav aria-label="Account" className="ml-auto flex shrink-0 items-center md:ml-0">
          <IconLink href="/wishlist" label={`Saved items${saved ? ` (${saved})` : ""}`}>
            <span className="font-symbols text-[21px] leading-none">♡</span>
            {saved > 0 && <span className="absolute top-1 right-1 size-1.5 rounded-full bg-citrus" />}
          </IconLink>
          <IconLink href="/account" label="Account">👤</IconLink>
          <IconLink href="/cart" label={`Cart, ${lineCount} items`}>
            🛒
            {lineCount > 0 && (
              <span
                key={lineCount}
                className="absolute -top-1 -right-2 flex h-[15px] min-w-[18px] animate-bump items-center justify-center rounded-full bg-citrus px-1 text-11 font-medium text-ink"
              >
                {lineCount}
              </span>
            )}
          </IconLink>
        </nav>
      </div>

      <div className={cn(container, "pb-3 md:hidden")}>
        <Suspense fallback={<div className="h-[39px] rounded-btn bg-white" />}>
          <SearchBox />
        </Suspense>
      </div>
    </header>
  );
}
