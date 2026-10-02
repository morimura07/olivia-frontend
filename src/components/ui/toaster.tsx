"use client";

import { useToasts } from "@/lib/store/toast";

export function Toaster() {
  const toasts = useToasts((s) => s.toasts);
  const dismiss = useToasts((s) => s.dismiss);

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex flex-col items-center gap-2 px-4 sm:bottom-6 sm:items-end sm:px-6"
    >
      {toasts.map((t) => (
        <button
          key={t.id}
          type="button"
          onClick={() => dismiss(t.id)}
          className="pointer-events-auto flex w-full max-w-[340px] animate-toast items-center gap-3 rounded-card bg-forest px-4 py-3 text-left text-white shadow-lift"
        >
          {t.emoji && (
            <span className="grid size-9 shrink-0 place-items-center rounded-tile bg-white/10 text-20">
              {t.emoji}
            </span>
          )}
          <span className="min-w-0">
            <span className="block truncate text-14 font-medium">{t.title}</span>
            {t.detail && <span className="block truncate text-12 font-light text-mist">{t.detail}</span>}
          </span>
        </button>
      ))}
    </div>
  );
}
