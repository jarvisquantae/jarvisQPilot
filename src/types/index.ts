/**
 * Domain types for Q-Pilot.
 * These describe the future backend contract (Supabase/Postgres + AI services).
 * The mock service layer in src/services returns these exact shapes so that
 * components never need to change when real data is wired in.
 */

export type UserRole = "TM" | "SM" | "MM" | "ADMIN";

export interface User {
  id: string;
  name: string;
  role: UserRole;
  roleLabel: string;
  email: string;
  territory: string;
  reportingManager: string;
  currentCampaignId: string;
  initials: string;
}

export type CampaignStatus = "on_track" | "in_progress" | "not_started" | "completed";

export type ReadinessStatus = "ready" | "on_track" | "needs_focus" | "not_started";

export interface Product {
  id: string;
  name: string;
  indication: string;
  therapyArea: string;
}

export interface Campaign {
  id: string;
  slug: string;
  code: string;
  title: string;
  productId: string;
  productName: string;
  quarter: string;
  objective: string;
  dueDate: string;
  status: CampaignStatus;
  progress: number;
  readiness: ReadinessStatus;
  readinessScore: number;
  assigned: boolean;
}

export type InputStatus = "completed" | "pending" | "not_started";

export interface PromotionalInput {
  id: string;
  campaignId: string;
  day: string;
  dayNumber: string;
  specialty: string;
  title: string;
  status: InputStatus;
  usage: string;
  format: string;
  validity: string;
  approvedBy: string;
  lastUpdated: string;
  explanation: string;
}

export type PitchSectionKind = "opening" | "core_messages" | "input_explanation" | "closing";

export interface PitchSection {
  id: string;
  kind: PitchSectionKind;
  order: number;
  title: string;
  durationLabel: string;
  script: string;
  bullets: string[];
  reminders: string[];
  aiFocus: string;
  aiCriteria: string[];
  mandatory?: boolean;
}

export interface ObjectionResponse {
  id: string;
  objection: string;
  response: string;
}

export interface Pitch {
  id: string;
  campaignId: string;
  status: "approved" | "draft";
  totalDuration: string;
  sections: PitchSection[];
  objections: ObjectionResponse[];
  listeningFocus: string[];
}

export interface AssessmentRubric {
  id: string;
  campaignId: string;
  weights: { accuracy: number; adherence: number; mandatoryMessages: number };
  mandatoryMessages: string[];
  approvedSynonyms: Array<{ spoken: string; approved: string }>;
  prohibitedClaims: string[];
  readinessThreshold: number;
}

export type PracticeMode = "guided" | "full";

export type RecordingState = "idle" | "recording" | "paused" | "stopped";

export interface PracticeAttempt {
  id: string;
  campaignId: string;
  userId: string;
  mode: PracticeMode;
  date: string;
  score: number;
  rating: number;
  verdict: string;
  durationSeconds: number;
}

export type TranscriptSpeaker = "tm" | "hcp";

export interface TranscriptTurn {
  id: string;
  speaker: TranscriptSpeaker;
  speakerLabel: string;
  text: string;
}

export interface TranscriptCorrection {
  id: string;
  spoken: string;
  mappedTo: string;
  confirmed: boolean;
}

export interface Transcript {
  id: string;
  attemptId: string;
  campaignId: string;
  submittedAt: string;
  status: "transcribing" | "complete" | "confirmed";
  turns: TranscriptTurn[];
  vocabularyMapping: Array<{ spoken: string; approved: string; matched: boolean }>;
  corrections: TranscriptCorrection[];
}

export interface Feedback {
  id: string;
  title: string;
  detail: string;
  kind: "positive" | "improvement";
}

export type CoverageState = "covered" | "needs_review" | "missing";

export interface CoverageCheck {
  id: string;
  label: string;
  state: CoverageState;
}

export interface AssessmentResult {
  id: string;
  attemptId: string;
  campaignId: string;
  accuracy: number;
  adherence: number;
  rating: number;
  readiness: ReadinessStatus;
  /** Application-calculated, not AI-authoritative. */
  calculatedBy: "application";
  positives: Feedback[];
  improvements: Feedback[];
  coverage: CoverageCheck[];
  requiresHumanReview: boolean;
}

export interface ScorePoint {
  label: string;
  score: number;
}

export interface ReadinessByCampaign {
  campaignId: string;
  name: string;
  score: number;
  readiness: ReadinessStatus;
}

export interface Progress {
  scoreTrend: ScorePoint[];
  improvementDelta: number;
  readinessByCampaign: ReadinessByCampaign[];
  history: PracticeAttempt[];
  coachNotes: string[];
}

export type NotificationKind = "campaign" | "feedback" | "practice" | "audio";

export interface AppNotification {
  id: string;
  kind: NotificationKind;
  title: string;
  message: string;
  time: string;
  unread: boolean;
}

export interface CoachingAction {
  id: string;
  tmName: string;
  campaignName: string;
  action: string;
  dueDate: string;
  status: "open" | "in_progress" | "done";
}

export interface DashboardMetrics {
  accuracy: number;
  accuracyDelta: number;
  adherence: number;
  adherenceDelta: number;
  rating: number;
  ratingDelta: number;
  readiness: ReadinessStatus;
  readinessNote: string;
}

export interface AiSuggestion {
  id: string;
  title: string;
  detail: string;
}
