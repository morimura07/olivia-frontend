import type { ReactNode } from "react";
import { cn } from "@/lib/format";
import type { StockStatus } from "@/lib/types";

/** Small uppercase eyebrow pill, e.g. "TODAY ONLY — 45 MIN DELIVERY". */
export function Eyebrow({ children, tone = "light", className }: { children: ReactNode; tone?: "light" | "citrus" | "mint"; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex h-[26px] items-center rounded-full px-[14px] text-12 uppercase tracking-[0.04em]",
        tone === "light" && "bg-white/12 text-white",
        tone === "citrus" && "bg-citrus/20 text-citrus",
        tone === "mint" && "bg-mint text-forest",
        className,
      )}
    >
      {children}
    </span>
  );
}

const statusStyles: Record<StockStatus, { label: string; cls: string }> = {
  active: { label: "Active", cls: "bg-mint text-leaf" },
  low: { label: "Low stock", cls: "bg-blush text-tomato" },
  restock: { label: "Restock soon", cls: "bg-cream text-amber" },
};

export function StatusPill({ status }: { status: StockStatus }) {
  const s = statusStyles[status];
  return (
    <span className={cn("inline-flex h-[22px] items-center rounded-full px-[10px] text-12 font-medium whitespace-nowrap", s.cls)}>
      {s.label}
    </span>
  );
}
