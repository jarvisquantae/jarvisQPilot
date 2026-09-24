import type { ReactNode } from "react";
import { Check, CircleAlert, Sparkles } from "lucide-react";
import type { Feedback } from "@/types";
import { cn } from "@/lib/utils";
import { IconWell } from "@/components/common/Layout";

export function FeedbackCard({ feedback }: { feedback: Feedback }) {
  const positive = feedback.kind === "positive";
  return (
    <div className="flex gap-3 rounded-2xl border border-border bg-surface-2 p-4">
      <IconWell tone={positive ? "success" : "warning"} className="size-9 rounded-xl">
        {positive ? <Check className="size-4" /> : <CircleAlert className="size-4" />}
      </IconWell>
      <div>
        <p className="text-sm font-bold text-navy">{feedback.title}</p>
        <p className="mt-1 text-sm text-muted-foreground">{feedback.detail}</p>
      </div>
    </div>
  );
}

export function AIInsightCard({
  title,
  detail,
  children,
  className,
  icon,
}: {
  title: string;
  detail?: string;
  children?: ReactNode;
  className?: string;
  icon?: ReactNode;
}) {
  return (
    <div className={cn("rounded-2xl border border-ai/20 bg-ai-soft/60 p-4", className)}>
      <div className="flex items-start gap-3">
        <IconWell tone="ai" className="size-9 rounded-xl">
          {icon ?? <Sparkles className="size-4" />}
        </IconWell>
        <div className="min-w-0">
          <p className="text-sm font-bold text-navy">{title}</p>
          {detail && <p className="mt-1 text-sm text-muted-foreground">{detail}</p>}
          {children}
        </div>
      </div>
    </div>
  );
}

export function ChecklistItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-2.5 text-sm text-navy">
      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-success-soft text-success">
        <Check className="size-3" />
      </span>
      <span>{text}</span>
    </li>
  );
}
