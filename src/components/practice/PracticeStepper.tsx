import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface StepperStep {
  id: string;
  title: string;
}

export function PracticeStepper({
  steps,
  activeIndex,
  onSelect,
  className,
}: {
  steps: StepperStep[];
  activeIndex: number;
  onSelect?: (index: number) => void;
  className?: string;
}) {
  return (
    <ol className={cn("flex flex-wrap items-center gap-2 sm:gap-3", className)}>
      {steps.map((step, index) => {
        const isActive = index === activeIndex;
        const isDone = index < activeIndex;
        return (
          <li key={step.id} className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => onSelect?.(index)}
              aria-current={isActive ? "step" : undefined}
              className={cn(
                "flex items-center gap-2.5 rounded-xl border px-3 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                isActive
                  ? "border-primary bg-mint text-primary"
                  : isDone
                    ? "border-success/30 bg-success-soft text-success"
                    : "border-border bg-card text-muted-foreground hover:bg-surface-2",
              )}
            >
              <span
                className={cn(
                  "grid size-6 shrink-0 place-items-center rounded-md text-xs font-bold",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : isDone
                      ? "bg-success text-success-foreground"
                      : "bg-muted text-muted-foreground",
                )}
              >
                {isDone ? <Check className="size-3" /> : index + 1}
              </span>
              {step.title}
            </button>
            {index < steps.length - 1 && (
              <span className="hidden h-px w-6 bg-border sm:block" aria-hidden="true" />
            )}
          </li>
        );
      })}
    </ol>
  );
}
