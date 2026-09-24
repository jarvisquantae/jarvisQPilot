import type { ReactNode } from "react";
import { ArrowDownRight, ArrowUpRight, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export type ConsoleTone = "teal" | "success" | "info" | "ai" | "warning" | "danger" | "navy";

const iconTones: Record<ConsoleTone, string> = {
  teal: "bg-primary/12 text-primary",
  success: "bg-success/12 text-success",
  info: "bg-info/12 text-info",
  ai: "bg-ai/12 text-ai",
  warning: "bg-warning/15 text-warning",
  danger: "bg-destructive/12 text-destructive",
  navy: "bg-navy/10 text-navy",
};

const barTones: Record<ConsoleTone, string> = {
  teal: "bg-primary",
  success: "bg-success",
  info: "bg-info",
  ai: "bg-ai",
  warning: "bg-warning",
  danger: "bg-destructive",
  navy: "bg-navy",
};

export function StatTile({
  label,
  value,
  suffix,
  delta,
  deltaLabel,
  note,
  tone = "teal",
  icon,
}: {
  label: string;
  value: string | number;
  suffix?: string | undefined;
  delta?: string | undefined;
  deltaLabel?: string | undefined;
  note?: string | undefined;
  tone?: ConsoleTone | undefined;
  icon?: ReactNode | undefined;
}) {
  const negative = delta?.startsWith("-");
  return (
    <article className="card-surface p-4 sm:p-5">
      <div className="flex items-center gap-3">
        {icon && (
          <span className={cn("grid size-10 shrink-0 place-items-center rounded-xl", iconTones[tone])}>
            {icon}
          </span>
        )}
        <p className="text-sm font-semibold leading-snug text-muted-foreground">{label}</p>
      </div>
      <p className="mt-3 text-[2rem] font-extrabold leading-none tracking-tight text-navy">
        {value}
        {suffix && <span className="ml-0.5 text-base font-bold">{suffix}</span>}
      </p>
      {delta && (
        <p
          className={cn(
            "mt-2 inline-flex items-center gap-1 text-xs font-bold",
            negative ? "text-destructive" : "text-success",
          )}
        >
          {negative ? <ArrowDownRight className="size-3.5" /> : <ArrowUpRight className="size-3.5" />}
          {delta.replace("-", "")}
          {deltaLabel && <span className="font-medium text-muted-foreground">{deltaLabel}</span>}
        </p>
      )}
      {note && <p className="mt-2 text-xs font-medium text-muted-foreground">{note}</p>}
    </article>
  );
}

export function Panel({
  title,
  info,
  actions,
  footer,
  className,
  bodyClassName,
  children,
}: {
  title?: string | undefined;
  info?: boolean | undefined;
  actions?: ReactNode | undefined;
  footer?: ReactNode | undefined;
  className?: string | undefined;
  bodyClassName?: string | undefined;
  children: ReactNode;
}) {
  return (
    <section className={cn("card-surface flex flex-col overflow-hidden", className)}>
      {(title || actions) && (
        <header className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
          {title && (
            <h2 className="inline-flex items-center gap-1.5 text-base font-bold text-navy">
              {title}
              {info && <Info className="size-3.5 text-muted-foreground" />}
            </h2>
          )}
          {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
        </header>
      )}
      <div className={cn("min-w-0 flex-1", bodyClassName ?? "px-5 pb-5")}>{children}</div>
      {footer && (
        <footer className="flex flex-wrap items-center justify-between gap-2 border-t border-border px-5 py-3 text-xs font-medium text-muted-foreground">
          {footer}
        </footer>
      )}
    </section>
  );
}

export function FilterBar({ children }: { children: ReactNode }) {
  return (
    <div className="mb-5 flex flex-wrap items-end gap-3 rounded-2xl border border-border bg-card px-4 py-4">
      {children}
    </div>
  );
}

export function FilterSelect({
  label,
  options,
  value,
  onChange,
  className,
}: {
  label: string;
  options: readonly string[];
  value?: string | undefined;
  onChange?: ((value: string) => void) | undefined;
  className?: string | undefined;
}) {
  return (
    <label className={cn("flex min-w-[9.5rem] flex-1 flex-col gap-1.5", className)}>
      <span className="text-xs font-semibold text-muted-foreground">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="h-10 rounded-xl border border-border bg-card px-3 text-sm font-medium text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

export function Field({
  label,
  required,
  hint,
  className,
  children,
}: {
  label: string;
  required?: boolean | undefined;
  hint?: string | undefined;
  className?: string | undefined;
  children: ReactNode;
}) {
  return (
    <label className={cn("flex flex-col gap-1.5", className)}>
      <span className="text-xs font-semibold text-navy">
        {label}
        {required && <span className="ml-0.5 text-destructive">*</span>}
      </span>
      {children}
      {hint && <span className="text-[11px] text-muted-foreground">{hint}</span>}
    </label>
  );
}

export const inputClass =
  "h-10 w-full rounded-xl border border-border bg-card px-3 text-sm font-medium text-navy placeholder:font-normal placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export function Pill({
  children,
  tone = "teal",
}: {
  children: ReactNode;
  tone?: ConsoleTone | "muted" | undefined;
}) {
  const tones: Record<string, string> = {
    teal: "bg-primary/12 text-primary",
    success: "bg-success/14 text-success",
    info: "bg-info/12 text-info",
    ai: "bg-ai/12 text-ai",
    warning: "bg-warning/18 text-warning",
    danger: "bg-destructive/12 text-destructive",
    navy: "bg-navy/10 text-navy",
    muted: "bg-muted text-muted-foreground",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11px] font-bold whitespace-nowrap",
        tones[tone],
      )}
    >
      {children}
    </span>
  );
}

export function Dot({ tone = "success" }: { tone?: ConsoleTone }) {
  return <span className={cn("inline-block size-2 shrink-0 rounded-full", barTones[tone])} />;
}

export function DotLabel({ tone, children }: { tone: ConsoleTone; children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy">
      <Dot tone={tone} />
      {children}
    </span>
  );
}

/* ---------------- table primitives ---------------- */

export function TableWrap({ children }: { children: ReactNode }) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse text-sm">{children}</table>
    </div>
  );
}

export function THead({ columns }: { columns: readonly (string | { label: string; align?: "right" | "center" })[] }) {
  return (
    <thead>
      <tr className="border-y border-border bg-muted/50">
        {columns.map((column, index) => {
          const label = typeof column === "string" ? column : column.label;
          const align = typeof column === "string" ? undefined : column.align;
          return (
            <th
              key={`${label}-${index}`}
              scope="col"
              className={cn(
                "px-4 py-3 text-left text-xs font-bold text-muted-foreground whitespace-nowrap",
                align === "right" && "text-right",
                align === "center" && "text-center",
              )}
            >
              {label}
            </th>
          );
        })}
      </tr>
    </thead>
  );
}

export function TR({
  children,
  className,
  onClick,
}: {
  children: ReactNode;
  className?: string | undefined;
  onClick?: (() => void) | undefined;
}) {
  return (
    <tr
      onClick={onClick}
      className={cn("border-b border-border last:border-0 hover:bg-muted/40", className)}
    >
      {children}
    </tr>
  );
}

export function TD({
  children,
  align,
  strong,
  className,
  colSpan,
}: {
  children: ReactNode;
  align?: "right" | "center" | undefined;
  strong?: boolean | undefined;
  className?: string | undefined;
  colSpan?: number | undefined;
}) {
  return (
    <td
      colSpan={colSpan}
      className={cn(
        "px-4 py-3 align-middle text-sm text-muted-foreground",
        strong && "font-semibold text-navy",
        align === "right" && "text-right",
        align === "center" && "text-center",
        className,
      )}
    >
      {children}
    </td>
  );
}

export function Pagination({
  showing,
  pages = [1, 2, 3],
  activePage = 1,
  onPageChange,
}: {
  showing: string;
  pages?: readonly number[];
  activePage?: number;
  onPageChange?: ((page: number) => void) | undefined;
}) {
  const handlePrev = () => {
    if (activePage > 1 && onPageChange) {
      onPageChange(activePage - 1);
    }
  };
  const handleNext = () => {
    if (activePage < Math.max(...pages) && onPageChange) {
      onPageChange(activePage + 1);
    }
  };

  return (
    <div className="flex w-full flex-wrap items-center justify-between gap-3">
      <span>{showing}</span>
      <nav className="flex items-center gap-1" aria-label="Pagination">
        <button
          type="button"
          onClick={handlePrev}
          disabled={activePage <= 1}
          className="grid size-7 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-40"
          aria-label="Previous page"
        >
          ‹
        </button>
        {pages.map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange?.(page)}
            className={cn(
              "grid size-7 place-items-center rounded-lg border text-xs font-bold transition-colors",
              page === activePage
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border text-navy hover:bg-muted",
            )}
            aria-current={page === activePage ? "page" : undefined}
          >
            {page}
          </button>
        ))}
        <button
          type="button"
          onClick={handleNext}
          disabled={activePage >= Math.max(...pages)}
          className="grid size-7 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-40"
          aria-label="Next page"
        >
          ›
        </button>
      </nav>
    </div>
  );
}

/* ---------------- lightweight charts ---------------- */

export function StackedBarChart({
  segments,
  caption,
  max,
}: {
  segments: readonly { label: string; value: number; tone: ConsoleTone }[];
  caption: string;
  max: number;
}) {
  const total = segments.reduce((sum, segment) => sum + segment.value, 0);
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex h-56 w-24 flex-col justify-end overflow-hidden rounded-xl">
        {segments.map((segment) => (
          <div
            key={segment.label}
            className={cn("grid place-items-center text-xs font-bold text-white", barTones[segment.tone])}
            style={{ height: `${(segment.value / max) * 100}%` }}
          >
            {segment.value}
          </div>
        ))}
      </div>
      <p className="text-xs font-semibold text-muted-foreground">{caption}</p>
      <ul className="flex flex-wrap justify-center gap-x-4 gap-y-1">
        {segments.map((segment) => (
          <li key={segment.label} className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-navy">
            <Dot tone={segment.tone} />
            {segment.label} ({Math.round((segment.value / total) * 100)}%)
          </li>
        ))}
      </ul>
    </div>
  );
}

export function BarList({
  items,
  suffix = "%",
}: {
  items: readonly { label: string; value: number; tone?: ConsoleTone }[];
  suffix?: string | undefined;
}) {
  const max = Math.max(...items.map((item) => item.value), 100);
  return (
    <ul className="space-y-3.5">
      {items.map((item) => (
        <li key={item.label}>
          <div className="mb-1.5 flex items-center justify-between gap-3 text-xs">
            <span className="font-semibold text-navy">{item.label}</span>
            <span className="font-bold text-muted-foreground">
              {item.value}
              {suffix}
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className={cn("h-full rounded-full", barTones[item.tone ?? "teal"])}
              style={{ width: `${(item.value / max) * 100}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

export function DonutChart({
  slices,
  centerLabel,
  centerValue,
}: {
  slices: readonly { label: string; value: number; tone: ConsoleTone }[];
  centerLabel?: string | undefined;
  centerValue?: string | undefined;
}) {
  const total = slices.reduce((sum, slice) => sum + slice.value, 0);
  const strokeTones: Record<ConsoleTone, string> = {
    teal: "stroke-primary",
    success: "stroke-success",
    info: "stroke-info",
    ai: "stroke-ai",
    warning: "stroke-warning",
    danger: "stroke-destructive",
    navy: "stroke-navy",
  };
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div className="flex flex-wrap items-center justify-center gap-6">
      <div className="relative size-40">
        <svg viewBox="0 0 100 100" className="size-full -rotate-90">
          {slices.map((slice) => {
            const length = (slice.value / total) * circumference;
            const dash = `${length} ${circumference - length}`;
            const element = (
              <circle
                key={slice.label}
                cx="50"
                cy="50"
                r={radius}
                fill="none"
                strokeWidth="14"
                strokeDasharray={dash}
                strokeDashoffset={-offset}
                className={strokeTones[slice.tone]}
              />
            );
            offset += length;
            return element;
          })}
        </svg>
        <div className="absolute inset-0 grid place-content-center text-center">
          <p className="text-xl font-extrabold text-navy">{centerValue}</p>
          <p className="text-[11px] font-semibold text-muted-foreground">{centerLabel}</p>
        </div>
      </div>
      <ul className="space-y-2">
        {slices.map((slice) => (
          <li key={slice.label} className="flex items-center gap-2 text-xs font-semibold text-navy">
            <Dot tone={slice.tone} />
            <span className="min-w-24">{slice.label}</span>
            <span className="text-muted-foreground">{slice.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function LineChart({
  series,
  labels,
  suffix = "%",
}: {
  series: readonly { name: string; points: readonly number[]; tone: ConsoleTone }[];
  labels: readonly string[];
  suffix?: string | undefined;
}) {
  const strokeTones: Record<ConsoleTone, string> = {
    teal: "stroke-primary",
    success: "stroke-success",
    info: "stroke-info",
    ai: "stroke-ai",
    warning: "stroke-warning",
    danger: "stroke-destructive",
    navy: "stroke-navy",
  };
  const width = 100;
  const height = 42;
  const all = series.flatMap((item) => item.points);
  const min = Math.min(...all) - 6;
  const max = Math.max(...all) + 4;

  const toPath = (points: readonly number[]) =>
    points
      .map((point, index) => {
        const x = (index / (points.length - 1)) * width;
        const y = height - ((point - min) / (max - min)) * height;
        return `${index === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
      })
      .join(" ");

  return (
    <div>
      <svg viewBox={`0 0 ${width} ${height}`} className="h-44 w-full" preserveAspectRatio="none">
        {[0.25, 0.5, 0.75].map((line) => (
          <line
            key={line}
            x1="0"
            x2={width}
            y1={height * line}
            y2={height * line}
            className="stroke-border"
            strokeWidth="0.3"
          />
        ))}
        {series.map((item) => (
          <path
            key={item.name}
            d={toPath(item.points)}
            fill="none"
            strokeWidth="1.2"
            strokeLinecap="round"
            className={strokeTones[item.tone]}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
      <div className="mt-2 flex justify-between text-[11px] font-medium text-muted-foreground">
        {labels.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
      <ul className="mt-3 flex flex-wrap gap-4">
        {series.map((item) => (
          <li key={item.name} className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy">
            <Dot tone={item.tone} />
            {item.name}
            <span className="text-muted-foreground">
              {item.points[item.points.length - 1]}
              {suffix}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
