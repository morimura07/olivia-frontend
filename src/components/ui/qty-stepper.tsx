"use client";

import { cn } from "@/lib/format";

/**
 * "− 2 +" stepper. `boxed` is the white pill on the product page; the plain
 * variant is the inline control in cart rows.
 */
export function QtyStepper({
  value,
  onChange,
  min = 1,
  boxed = false,
  label = "Quantity",
  className,
}: {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  boxed?: boolean;
  label?: string;
  className?: string;
}) {
  const btn =
    "grid size-6 place-items-center rounded-full text-16 font-light text-forest transition-colors hover:bg-forest/8 active:bg-forest/15 disabled:opacity-30";
  return (
    <div
      role="group"
      aria-label={label}
      className={cn(
        "inline-flex items-center",
        boxed && "h-[35px] rounded-card bg-white px-2 shadow-card",
        className,
      )}
    >
      <button type="button" className={btn} aria-label="Decrease" disabled={value <= min} onClick={() => onChange(value - 1)}>
        −
      </button>
      <span className="min-w-[1.25ch] text-center text-16 font-light tabular-nums" aria-live="polite">
        {value}
      </span>
      <button type="button" className={btn} aria-label="Increase" onClick={() => onChange(value + 1)}>
        +
      </button>
    </div>
  );
}
