import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PageHeader({
  title,
  subtitle,
  eyebrow,
  actions,
  className,
}: {
  title: string;
  subtitle?: string;
  eyebrow?: ReactNode;
  actions?: ReactNode;
  className?: string;
}) {
  return (
    <header className={cn("flex flex-wrap items-end justify-between gap-4", className)}>
      <div>
        {eyebrow && <div className="mb-2 flex items-center gap-2">{eyebrow}</div>}
        <h1 className="text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">{title}</h1>
        {subtitle && <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </header>
  );
}

export function SectionCard({
  title,
  subtitle,
  icon,
  action,
  children,
  className,
  bodyClassName,
}: {
  title?: string;
  subtitle?: string;
  icon?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <section className={cn("card-surface p-5 sm:p-6", className)}>
      {(title || action) && (
        <div className="mb-5 flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            {icon && (
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-mint text-primary">
                {icon}
              </span>
            )}
            <div>
              {title && <h2 className="text-base font-bold text-navy sm:text-lg">{title}</h2>}
              {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
            </div>
          </div>
          {action}
        </div>
      )}
      <div className={bodyClassName}>{children}</div>
    </section>
  );
}

export function StepChip({ step, className }: { step: number | string; className?: string }) {
  return (
    <span
      className={cn(
        "grid size-8 shrink-0 place-items-center rounded-lg bg-navy text-sm font-bold text-navy-foreground",
        className,
      )}
    >
      {step}
    </span>
  );
}

export function IconWell({
  children,
  tone = "teal",
  className,
}: {
  children: ReactNode;
  tone?: "teal" | "success" | "warning" | "ai" | "navy" | "info";
  className?: string;
}) {
  const tones = {
    teal: "bg-mint text-primary",
    success: "bg-success-soft text-success",
    warning: "bg-warning-soft text-warning",
    ai: "bg-ai-soft text-ai",
    navy: "bg-navy-soft text-navy",
    info: "bg-info-soft text-info",
  } as const;
  return (
    <span
      className={cn("grid size-11 shrink-0 place-items-center rounded-2xl", tones[tone], className)}
    >
      {children}
    </span>
  );
}
