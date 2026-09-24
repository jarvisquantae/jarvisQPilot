import { AlertCircle, Check, CircleCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { detailingFlowNodes, emphasisLabel, type Emphasis } from "@/data/tm";

export function EmphasisChip({ kind, muted = false }: { kind: Emphasis; muted?: boolean }) {
  const danger = kind === "do_not_miss";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-extrabold tracking-wide",
        danger ? "bg-brand-red-soft text-brand-red" : "bg-success-soft text-success",
        muted && "opacity-70",
      )}
    >
      {danger ? <AlertCircle className="size-4" /> : <CircleCheck className="size-4" />}
      {emphasisLabel[kind]}
    </span>
  );
}

export function DetailingFlowStepper({ activeNode }: { activeNode: number }) {
  return (
    <ol className="flex items-start gap-1 overflow-x-auto pb-1">
      {detailingFlowNodes.map((label, index) => {
        const node = index + 1;
        const done = node < activeNode;
        const active = node === activeNode;
        return (
          <li key={label} className="flex min-w-[5.5rem] flex-1 flex-col items-center">
            <div className="flex w-full items-center">
              <span
                className={cn(
                  "h-0.5 flex-1",
                  index === 0 ? "opacity-0" : done || active ? "bg-success" : "bg-border",
                )}
              />
              <span
                className={cn(
                  "grid size-10 shrink-0 place-items-center rounded-full text-sm font-extrabold transition-colors",
                  done
                    ? "bg-success text-success-foreground"
                    : active
                      ? "bg-primary text-primary-foreground ring-4 ring-primary/25"
                      : "bg-muted text-muted-foreground",
                )}
              >
                {done ? <Check className="size-5" /> : node}
              </span>
              <span
                className={cn(
                  "h-0.5 flex-1",
                  index === detailingFlowNodes.length - 1 ? "opacity-0" : done ? "bg-success" : "bg-border",
                )}
              />
            </div>
            <p
              className={cn(
                "mt-2 text-center text-xs font-bold leading-tight",
                active ? "text-primary" : "text-muted-foreground",
              )}
            >
              {label}
            </p>
          </li>
        );
      })}
    </ol>
  );
}
