import type {
  CampaignStatus,
  CoverageState,
  InputStatus,
  ReadinessStatus,
} from "@/types";

export const campaignStatusLabel: Record<CampaignStatus, string> = {
  on_track: "On Track",
  in_progress: "In Progress",
  not_started: "Not Started",
  completed: "Completed",
};

export const readinessLabel: Record<ReadinessStatus, string> = {
  ready: "Ready",
  on_track: "On Track",
  needs_focus: "Needs Focus",
  not_started: "Not Started",
};

export const inputStatusLabel: Record<InputStatus, string> = {
  completed: "Completed",
  pending: "Pending",
  not_started: "Not Started",
};

export const coverageLabel: Record<CoverageState, string> = {
  covered: "Covered",
  needs_review: "Needs Review",
  missing: "Missing",
};

export function formatDelta(value: number, suffix = "%") {
  const sign = value >= 0 ? "↑" : "↓";
  return `${sign} ${Math.abs(value)}${suffix} vs last quarter`;
}

export function formatClock(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}
