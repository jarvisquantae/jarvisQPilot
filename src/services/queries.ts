import { queryOptions } from "@tanstack/react-query";
import * as api from "@/services/qpilot";

export const qk = {
  user: ["user"] as const,
  campaigns: ["campaigns"] as const,
  campaign: (slug: string) => ["campaign", slug] as const,
  weeklyInputs: ["weekly-inputs"] as const,
  promotionalInput: (id: string) => ["promotional-input", id] as const,
  pitch: (id: string) => ["pitch", id] as const,
  rubric: (id: string) => ["rubric", id] as const,
  metrics: ["dashboard-metrics"] as const,
  suggestions: ["ai-suggestions"] as const,
  nextActions: ["next-actions"] as const,
  attempt: (id: string) => ["attempt", id] as const,
  transcript: (id: string) => ["transcript", id] as const,
  assessment: (id: string) => ["assessment", id] as const,
  progress: ["progress"] as const,
  notifications: ["notifications"] as const,
  coachingActions: ["coaching-actions"] as const,
};

export const userQuery = () => queryOptions({ queryKey: qk.user, queryFn: api.getCurrentUser });

export const campaignsQuery = () =>
  queryOptions({ queryKey: qk.campaigns, queryFn: api.getCampaigns });

export const campaignQuery = (slug: string) =>
  queryOptions({ queryKey: qk.campaign(slug), queryFn: () => api.getCampaign(slug) });

export const weeklyInputsQuery = () =>
  queryOptions({ queryKey: qk.weeklyInputs, queryFn: api.getWeeklyInputs });

export const promotionalInputQuery = (campaignId: string) =>
  queryOptions({
    queryKey: qk.promotionalInput(campaignId),
    queryFn: () => api.getPromotionalInput(campaignId),
  });

export const pitchQuery = (campaignId: string) =>
  queryOptions({ queryKey: qk.pitch(campaignId), queryFn: () => api.getPitch(campaignId) });

export const rubricQuery = (campaignId: string) =>
  queryOptions({ queryKey: qk.rubric(campaignId), queryFn: () => api.getRubric(campaignId) });

export const metricsQuery = () =>
  queryOptions({ queryKey: qk.metrics, queryFn: api.getDashboardMetrics });

export const suggestionsQuery = () =>
  queryOptions({ queryKey: qk.suggestions, queryFn: api.getAiSuggestions });

export const nextActionsQuery = () =>
  queryOptions({ queryKey: qk.nextActions, queryFn: api.getNextActions });

export const attemptQuery = (campaignId: string) =>
  queryOptions({
    queryKey: qk.attempt(campaignId),
    queryFn: () => api.getPracticeAttempt(campaignId),
  });

export const transcriptQuery = (campaignId: string) =>
  queryOptions({
    queryKey: qk.transcript(campaignId),
    queryFn: () => api.getTranscript(campaignId),
  });

export const assessmentQuery = (campaignId: string) =>
  queryOptions({
    queryKey: qk.assessment(campaignId),
    queryFn: () => api.getAssessmentResult(campaignId),
  });

export const progressQuery = () =>
  queryOptions({ queryKey: qk.progress, queryFn: api.getProgress });

export const notificationsQuery = () =>
  queryOptions({ queryKey: qk.notifications, queryFn: api.getNotifications });

export const coachingActionsQuery = () =>
  queryOptions({ queryKey: qk.coachingActions, queryFn: api.getCoachingActions });
