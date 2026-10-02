"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/logo";
import { adminNav } from "@/lib/data/admin";
import { cn } from "@/lib/format";

/** Forest sidebar: 220px, logo + ADMIN tag, 36px nav rows on a 40px rhythm. */
export function AdminSidebar() {
  const pathname = usePathname();
  const isActive = (href: string) => (href === "/admin" ? pathname === href : pathname.startsWith(href));

  return (
    <>
      {/* Desktop */}
      <aside className="sticky top-0 hidden h-dvh w-[220px] shrink-0 flex-col bg-forest px-[18px] pt-[23px] pb-5 md:flex">
        <Link href="/admin" aria-label="Olivia admin home">
          <Logo size={20} tag="ADMIN" />
        </Link>
        <nav aria-label="Admin" className="mt-[26px] flex flex-col gap-1">
          {adminNav.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "group flex h-9 items-center gap-1 rounded-btn px-3 text-14 text-white transition-colors",
                  active ? "bg-white/15 font-medium" : "hover:bg-white/8",
                )}
              >
                <span aria-hidden className="transition-transform group-hover:scale-110">{item.emoji}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto space-y-3">
          <Link href="/" className="flex items-center gap-1 rounded-btn px-3 py-2 text-13 text-white/70 transition-colors hover:bg-white/8 hover:text-white">
            ← Back to store
          </Link>
          <div className="flex items-center gap-2.5 rounded-card bg-white/8 p-2.5">
            <span className="grid size-8 place-items-center rounded-full bg-citrus text-13 font-medium text-ink">MO</span>
            <span className="min-w-0">
              <span className="block truncate text-13 font-medium text-white">Michael Olsen</span>
              <span className="block truncate text-11 font-light text-mist">Store manager</span>
            </span>
          </div>
        </div>
      </aside>

      {/* Mobile */}
      <div className="sticky top-0 z-30 bg-forest md:hidden">
        <div className="flex h-14 items-center justify-between px-4">
          <Link href="/admin"><Logo size={20} tag="ADMIN" /></Link>
          <Link href="/" className="text-13 text-white/70">Store →</Link>
        </div>
        <nav aria-label="Admin" className="flex gap-1 overflow-x-auto px-3 pb-3 no-scrollbar">
          {adminNav.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex h-9 shrink-0 items-center gap-1 rounded-btn px-3 text-14 text-white",
                  active ? "bg-white/15 font-medium" : "text-white/85",
                )}
              >
                <span aria-hidden>{item.emoji}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
