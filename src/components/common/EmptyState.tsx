import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { IconWell } from "@/components/common/Layout";

export function EmptyState({
  title,
  description,
  icon,
  action,
  className,
}: {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-surface-2 px-6 py-12 text-center",
        className,
      )}
    >
      {icon && <IconWell tone="teal">{icon}</IconWell>}
      <p className="mt-4 text-sm font-bold text-navy">{title}</p>
      {description && (
        <p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("card-surface animate-pulse p-5", className)}>
      <div className="h-3 w-24 rounded-full bg-muted" />
      <div className="mt-4 h-7 w-20 rounded-lg bg-muted" />
      <div className="mt-4 h-2 w-full rounded-full bg-muted" />
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="space-y-6">
      <div className="animate-pulse space-y-3">
        <div className="h-7 w-56 rounded-lg bg-muted" />
        <div className="h-4 w-80 rounded-lg bg-muted" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <CardSkeleton key={index} />
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="card-surface h-64 animate-pulse lg:col-span-2" />
        <div className="card-surface h-64 animate-pulse" />
      </div>
    </div>
  );
}
