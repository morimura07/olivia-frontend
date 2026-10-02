import { cn } from "@/lib/format";

/** De-emphasised 2px trend line; only the current day is drawn in the accent. */
function Sparkline({ points, label }: { points: number[]; label: string }) {
  const w = 64;
  const h = 24;
  const pad = 4;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const x = (i: number) => pad + (i * (w - pad * 2)) / (points.length - 1);
  const y = (v: number) => h - pad - ((v - min) / (max - min || 1)) * (h - pad * 2);
  const d = points.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
  const last = points.length - 1;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} role="img" aria-label={`${label}, last 7 days`} className="overflow-visible">
      <title>{`${label} · last 7 days: ${points.join(", ")}`}</title>
      <path d={d} fill="none" stroke="#c5d0c3" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={x(last)} cy={y(points[last])} r={4} fill="var(--color-leaf)" stroke="white" strokeWidth={2} />
    </svg>
  );
}

/** Spec tile: 14px radius, 18px padding, Light 12px label, Bold 26px value, ▲/▼ delta. */
export function StatCard({
  label,
  value,
  delta,
  note,
  trend,
}: {
  label: string;
  value: string;
  delta: number;
  note?: string;
  trend?: number[];
}) {
  const up = delta >= 0;
  return (
    <div className="flex min-h-[133px] flex-col rounded-card bg-white p-[18px] shadow-card transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-lift">
      <p className="text-12 font-light text-muted">{label}</p>
      <div className="mt-2 flex items-end justify-between gap-2">
        <p className="text-26 font-bold">{value}</p>
        {trend && (
          <span className="mb-1 hidden xl:block">
            <Sparkline points={trend} label={label} />
          </span>
        )}
      </div>
      <p className={cn("mt-1 text-12", up ? "text-leaf" : "text-tomato")}>
        <span aria-hidden className="font-symbols">{up ? "▲" : "▼"}</span>
        <span className="sr-only">{up ? "Up" : "Down"}</span> {Math.abs(delta).toFixed(1)}%{note && ` ${note}`}
      </p>
    </div>
  );
}
