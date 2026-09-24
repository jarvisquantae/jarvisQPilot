import { cn } from "@/lib/utils";

type Tone = "teal" | "success" | "warning" | "navy" | "ai" | "info";

const fillStyles: Record<Tone, string> = {
  teal: "bg-primary",
  success: "bg-success",
  warning: "bg-warning",
  navy: "bg-navy",
  ai: "bg-ai",
  info: "bg-info",
};

export function ProgressBar({
  value,
  tone = "teal",
  className,
  size = "md",
  label,
}: {
  value: number;
  tone?: Tone;
  className?: string;
  size?: "sm" | "md";
  label?: string;
}) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div className={cn("w-full", className)}>
      {label && (
        <div className="mb-1.5 flex items-center justify-between text-xs font-medium text-muted-foreground">
          <span>{label}</span>
          <span className="text-navy">{clamped}%</span>
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? "Progress"}
        className={cn(
          "w-full overflow-hidden rounded-full bg-muted",
          size === "sm" ? "h-1.5" : "h-2",
        )}
      >
        <div
          className={cn("h-full rounded-full transition-[width] duration-700", fillStyles[tone])}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
