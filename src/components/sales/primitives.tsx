import type { ReactNode } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { StatusBadge } from "@/components/common/StatusBadge";
import type { RatingLabel, Severity, TMStatus } from "@/data/sales";
import { statusLabel } from "@/data/sales";

/* ---------- filters ---------- */

export function FilterBar({ children }: { children: ReactNode }) {
  return (
    <div className="card-surface flex flex-wrap items-end gap-3 p-4">{children}</div>
  );
}

export function SelectFilter({
  label,
  options,
  value,
  onChange,
  className,
}: {
  label: string;
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) {
  return (
    <label className={cn("flex min-w-[9.5rem] flex-1 flex-col gap-1.5", className)}>
      <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-10 w-full cursor-pointer rounded-xl border border-border bg-card px-3 text-sm font-semibold text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

/* ---------- table ---------- */

export function Table({ children, minWidth = 720 }: { children: ReactNode; minWidth?: number }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm" style={{ minWidth }}>
        {children}
      </table>
    </div>
  );
}

export function Th({
  children,
  align = "left",
  className,
}: {
  children?: ReactNode;
  align?: "left" | "right" | "center";
  className?: string;
}) {
  return (
    <th
      scope="col"
      className={cn(
        "border-b border-border pb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground",
        align === "right" && "text-right",
        align === "center" && "text-center",
        align === "left" && "text-left",
        className,
      )}
    >
      {children}
    </th>
  );
}

export function Td({
  children,
  align = "left",
  className,
}: {
  children?: ReactNode;
  align?: "left" | "right" | "center";
  className?: string;
}) {
  return (
    <td
      className={cn(
        "py-3.5 pr-4 align-middle text-sm font-medium text-navy last:pr-0",
        align === "right" && "text-right",
        align === "center" && "text-center",
        className,
      )}
    >
      {children}
    </td>
  );
}

export function Tr({ children, className }: { children: ReactNode; className?: string | undefined }) {
  return (
    <tr className={cn("border-b border-border/70 last:border-0 hover:bg-surface-2", className)}>
      {children}
    </tr>
  );
}

/* ---------- people ---------- */

export function Avatar({
  initials,
  className,
}: {
  initials: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "grid size-9 shrink-0 place-items-center rounded-full bg-mint text-xs font-bold text-primary",
        className,
      )}
    >
      {initials}
    </span>
  );
}

export function PersonCell({
  initials,
  name,
  meta,
}: {
  initials: string;
  name: string;
  meta?: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <Avatar initials={initials} />
      <div className="min-w-0">
        <p className="truncate font-bold text-navy">{name}</p>
        {meta && <p className="truncate text-xs font-medium text-muted-foreground">{meta}</p>}
      </div>
    </div>
  );
}

/* ---------- scores & badges ---------- */

export function scoreTone(score: number) {
  if (score >= 80) return "success" as const;
  if (score >= 65) return "teal" as const;
  return "warning" as const;
}

const scoreText = {
  success: "text-success",
  teal: "text-primary",
  warning: "text-warning",
} as const;

export function ScoreValue({ value, suffix = "%" }: { value: number; suffix?: string }) {
  return (
    <span className={cn("font-extrabold", scoreText[scoreTone(value)])}>
      {value}
      {suffix}
    </span>
  );
}

export function StarRating({ value, max = 5 }: { value: number; max?: number }) {
  return (
    <span className="inline-flex items-center gap-1" aria-label={`${value} out of ${max}`}>
      <span className="inline-flex">
        {Array.from({ length: max }).map((_, index) => (
          <Star
            key={index}
            className={cn(
              "size-3.5",
              index < Math.round(value) ? "fill-warning text-warning" : "text-border",
            )}
          />
        ))}
      </span>
      <span className="text-xs font-bold text-navy">{value.toFixed(1)}</span>
    </span>
  );
}

const tmStatusTone: Record<TMStatus, "success" | "teal" | "warning"> = {
  high_performer: "success",
  on_track: "teal",
  needs_improvement: "warning",
};

export function TMStatusBadge({ status }: { status: TMStatus }) {
  return <StatusBadge label={statusLabel[status]} tone={tmStatusTone[status]} />;
}

const ratingTone: Record<RatingLabel, "success" | "teal" | "navy" | "warning"> = {
  Excellent: "success",
  Good: "teal",
  Average: "navy",
  "Needs Improvement": "warning",
};

export function RatingBadge({ label }: { label: RatingLabel }) {
  return <StatusBadge label={label} tone={ratingTone[label]} />;
}

const severityTone: Record<Severity, "warning" | "ai" | "navy"> = {
  Critical: "warning",
  High: "ai",
  Medium: "navy",
};

export function SeverityBadge({ severity }: { severity: Severity }) {
  return <StatusBadge label={severity} tone={severityTone[severity]} />;
}

export function TextBadge({
  label,
  tone = "neutral",
}: {
  label: string;
  tone?: "success" | "teal" | "warning" | "neutral" | "ai" | "navy";
}) {
  return <StatusBadge label={label} tone={tone} />;
}

/* ---------- charts ---------- */

export function HBarRow({
  label,
  value,
  suffix = "%",
  tone,
  meta,
}: {
  label: string;
  value: number;
  suffix?: string;
  tone?: "teal" | "success" | "warning" | "ai" | "info";
  meta?: string;
}) {
  const resolved = tone ?? scoreTone(value);
  const fill = {
    teal: "bg-primary",
    success: "bg-success",
    warning: "bg-warning",
    ai: "bg-ai",
    info: "bg-info",
  }[resolved];

  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between gap-3 text-sm">
        <span className="font-semibold text-navy">{label}</span>
        <span className="text-xs font-bold text-muted-foreground">
          {meta ? `${meta} · ` : ""}
          {value}
          {suffix}
        </span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={cn("h-full rounded-full transition-[width] duration-700", fill)}
          style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
        />
      </div>
    </div>
  );
}

export function StackedShareBar({
  segments,
}: {
  segments: { label: string; share: number; tone: "success" | "teal" | "warning" | "ai" }[];
}) {
  const fill = {
    success: "bg-success",
    teal: "bg-primary",
    warning: "bg-warning",
    ai: "bg-ai",
  };
  return (
    <div className="flex h-3 w-full overflow-hidden rounded-full bg-muted">
      {segments.map((segment) => (
        <div
          key={segment.label}
          className={fill[segment.tone]}
          style={{ width: `${segment.share}%` }}
          title={`${segment.label}: ${segment.share}%`}
        />
      ))}
    </div>
  );
}

export function Legend({
  items,
}: {
  items: { label: string; tone: "success" | "teal" | "warning" | "ai" | "info" }[];
}) {
  const dot = {
    success: "bg-success",
    teal: "bg-primary",
    warning: "bg-warning",
    ai: "bg-ai",
    info: "bg-info",
  };
  return (
    <ul className="flex flex-wrap items-center gap-x-4 gap-y-2">
      {items.map((item) => (
        <li key={item.label} className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
          <span className={cn("size-2.5 rounded-full", dot[item.tone])} />
          {item.label}
        </li>
      ))}
    </ul>
  );
}

export function TrendLine({
  points,
  labels,
}: {
  points: number[];
  labels: string[];
}) {
  const width = 560;
  const height = 180;
  const pad = 10;
  const max = 100;
  const step = points.length > 1 ? (width - pad * 2) / (points.length - 1) : 0;
  const coords = points.map((point, index) => ({
    x: pad + index * step,
    y: height - pad - (point / max) * (height - pad * 2),
  }));
  const path = coords.map((c, i) => `${i === 0 ? "M" : "L"}${c.x},${c.y}`).join(" ");
  const area = `${path} L${coords[coords.length - 1]?.x ?? pad},${height - pad} L${pad},${height - pad} Z`;

  return (
    <div>
      <svg viewBox={`0 0 ${width} ${height}`} className="h-44 w-full" role="img" aria-label="Score trend">
        {[25, 50, 75].map((line) => (
          <line
            key={line}
            x1={pad}
            x2={width - pad}
            y1={height - pad - (line / max) * (height - pad * 2)}
            y2={height - pad - (line / max) * (height - pad * 2)}
            className="stroke-border"
            strokeDasharray="4 6"
          />
        ))}
        <path d={area} className="fill-primary/10" />
        <path d={path} className="fill-none stroke-primary" strokeWidth={2.5} strokeLinecap="round" />
        {coords.map((c, index) => (
          <circle key={index} cx={c.x} cy={c.y} r={4} className="fill-card stroke-primary" strokeWidth={2.5} />
        ))}
      </svg>
      <div className="mt-2 flex justify-between text-[11px] font-semibold text-muted-foreground">
        {labels.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </div>
  );
}
