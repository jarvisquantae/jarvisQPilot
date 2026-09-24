import type { ReactNode } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProgressBar } from "@/components/common/ProgressBar";

type Tone = "teal" | "success" | "warning" | "ai" | "navy" | "info";

const wellTones: Record<Tone, string> = {
  teal: "bg-mint text-primary",
  success: "bg-success-soft text-success",
  warning: "bg-warning-soft text-warning",
  ai: "bg-ai-soft text-ai",
  navy: "bg-navy-soft text-navy",
  info: "bg-info-soft text-info",
};

const valueTones: Record<Tone, string> = {
  teal: "text-primary",
  success: "text-success",
  warning: "text-warning",
  ai: "text-ai",
  navy: "text-navy",
  info: "text-info",
};

/** Splits "92%" into ["92", "%"] and "4.6/5" into ["4.6", "/5"]. */
function splitValue(value: string): [string, string | null] {
  const match = /^([\d.,]+)(.*)$/.exec(value.trim());
  if (!match) return [value, null];
  return [match[1] ?? value, match[2] ? match[2] : null];
}

export function MetricCard({
  label,
  value,
  suffix,
  delta,
  deltaSuffix = "%",
  deltaLabel = "vs last quarter",
  note,
  progress,
  tone = "teal",
  icon,
  className,
}: {
  label: string;
  value: string;
  suffix?: string;
  delta?: number;
  deltaSuffix?: string;
  deltaLabel?: string;
  note?: string;
  progress?: number;
  tone?: Tone;
  icon?: ReactNode;
  className?: string;
}) {
  const positive = (delta ?? 0) >= 0;
  const [head, autoSuffix] = splitValue(value);
  const tail = suffix ?? autoSuffix;

  return (
    <article
      className={cn(
        "card-surface flex flex-col p-5 transition-shadow hover:shadow-card-hover",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        {icon && (
          <span
            className={cn(
              "grid size-11 shrink-0 place-items-center rounded-full",
              wellTones[tone],
            )}
          >
            {icon}
          </span>
        )}
        <p className="text-sm font-semibold leading-snug text-muted-foreground">{label}</p>
      </div>

      <p className={cn("mt-2.5 font-extrabold tracking-tight", valueTones[tone])}>
        <span className="text-[2rem] leading-none">{head}</span>
        {tail && <span className="ml-0.5 text-base font-bold">{tail}</span>}
      </p>

      {typeof delta === "number" && (
        <p
          className={cn(
            "mt-2 inline-flex items-center gap-1 text-xs font-semibold",
            positive ? "text-success" : "text-warning",
          )}
        >
          {positive ? (
            <ArrowUpRight className="size-3.5" />
          ) : (
            <ArrowDownRight className="size-3.5" />
          )}
          {Math.abs(delta)}
          {deltaSuffix}{" "}
          <span className="font-medium text-muted-foreground">{deltaLabel}</span>
        </p>
      )}

      {note && <p className="mt-2 text-xs font-medium text-muted-foreground">{note}</p>}

      {typeof progress === "number" && (
        <ProgressBar value={progress} tone={tone} size="sm" className="mt-auto pt-4" />
      )}
    </article>
  );
}
