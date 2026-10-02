import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/format";

type Variant = "citrus" | "forest" | "outline" | "ghost-dark";

// Spec: 40px tall, 22px side padding, 8px radius, Roboto Medium 14px.
const base =
  "inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-btn px-[22px] text-14 font-medium transition-[background-color,box-shadow,transform,border-color] duration-200 active:translate-y-px disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  citrus: "bg-citrus text-ink hover:bg-[#f0991a] hover:shadow-[0_6px_16px_-6px_rgb(245_166_35/0.7)]",
  forest: "bg-forest text-white hover:bg-[#1c4a29] hover:shadow-[0_6px_16px_-6px_rgb(18_51_27/0.6)]",
  outline: "h-[41px] border border-forest bg-white text-forest hover:bg-paper",
  "ghost-dark": "h-[41px] border border-moss text-white hover:border-white/60 hover:bg-white/5",
};

export function buttonClass(variant: Variant = "citrus", className?: string) {
  return cn(base, variants[variant], className);
}

export function Button({
  variant = "citrus",
  className,
  ...props
}: ComponentProps<"button"> & { variant?: Variant }) {
  return <button type="button" className={buttonClass(variant, className)} {...props} />;
}

export function ButtonLink({
  variant = "citrus",
  className,
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant }) {
  return <Link className={buttonClass(variant, className)} {...props} />;
}
