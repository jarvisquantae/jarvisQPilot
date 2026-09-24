import { cn } from "@/lib/utils";
import type {
  CampaignStatus,
  CoverageState,
  InputStatus,
  ReadinessStatus,
} from "@/types";
import {
  campaignStatusLabel,
  coverageLabel,
  inputStatusLabel,
  readinessLabel,
} from "@/utils/format";

type Tone = "success" | "teal" | "warning" | "neutral" | "ai" | "navy";

const toneStyles: Record<Tone, string> = {
  success: "bg-success-soft text-success",
  teal: "bg-mint text-primary",
  warning: "bg-warning-soft text-warning",
  neutral: "bg-muted text-muted-foreground",
  ai: "bg-ai-soft text-ai",
  navy: "bg-navy-soft text-navy",
};

export function StatusBadge({
  label,
  tone = "neutral",
  className,
  icon,
}: {
  label: string;
  tone?: Tone;
  className?: string;
  icon?: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold",
        toneStyles[tone],
        className,
      )}
    >
      {icon}
      {label}
    </span>
  );
}

const campaignTone: Record<CampaignStatus, Tone> = {
  on_track: "success",
  in_progress: "teal",
  not_started: "neutral",
  completed: "navy",
};

export function CampaignStatusBadge({ status }: { status: CampaignStatus }) {
  return <StatusBadge label={campaignStatusLabel[status]} tone={campaignTone[status]} />;
}

const readinessTone: Record<ReadinessStatus, Tone> = {
  ready: "success",
  on_track: "teal",
  needs_focus: "warning",
  not_started: "neutral",
};

export function ReadinessBadge({ readiness }: { readiness: ReadinessStatus }) {
  return <StatusBadge label={readinessLabel[readiness]} tone={readinessTone[readiness]} />;
}

const inputTone: Record<InputStatus, Tone> = {
  completed: "success",
  pending: "warning",
  not_started: "neutral",
};

export function InputStatusBadge({ status }: { status: InputStatus }) {
  return <StatusBadge label={inputStatusLabel[status]} tone={inputTone[status]} />;
}

const coverageTone: Record<CoverageState, Tone> = {
  covered: "success",
  needs_review: "warning",
  missing: "neutral",
};

export function CoverageBadge({ state }: { state: CoverageState }) {
  return <StatusBadge label={coverageLabel[state]} tone={coverageTone[state]} />;
}

export { readinessTone };
