import { cn } from "@/lib/utils";

export function QPilotLogo({
  className,
  compact = false,
  variant = "default",
}: {
  className?: string;
  compact?: boolean;
  variant?: "default" | "onDark";
}) {
  const onDark = variant === "onDark";
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <QMark className="size-10 shrink-0" variant={variant} />
      {!compact && (
        <div className="leading-none">
          <p
            className={cn(
              "text-[10px] font-bold uppercase tracking-[0.18em]",
              onDark ? "text-navy-foreground/70" : "text-primary",
            )}
          >
            Field Intelligence
          </p>
          <p
            className={cn(
              "mt-1 text-lg font-extrabold tracking-tight",
              onDark ? "text-navy-foreground" : "text-navy",
            )}
          >
            JARVIS Q-PILOT
          </p>
          <p
            className={cn(
              "mt-0.5 text-[10px] font-medium",
              onDark ? "text-navy-foreground/55" : "text-muted-foreground",
            )}
          >
            By Quantae AI
          </p>
        </div>
      )}
    </div>
  );
}

export function QMark({
  className,
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "onDark";
}) {
  return (
    <svg viewBox="0 0 48 48" className={className} role="img" aria-label="Q-Pilot">
      <circle
        cx="21"
        cy="21"
        r="14"
        fill="none"
        stroke="currentColor"
        strokeWidth="6.5"
        className={variant === "onDark" ? "text-primary" : "text-navy"}
      />
      <path
        d="M27 27 L40 27 L33.5 38 Z"
        fill="currentColor"
        className={variant === "onDark" ? "text-navy-foreground" : "text-primary"}
      />
    </svg>
  );
}

