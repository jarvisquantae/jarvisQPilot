/**
 * Mock data layer.
 *
 * Every read the UI performs goes through this module. Each function is async
 * with a small simulated latency so loading states are real. When the backend
 * (Supabase) and the AI services are connected, only the bodies of these
 * functions change — component code and types stay identical.
 */

import * as mock from "@/data/mock";
import type {
  AiSuggestion,
  AppNotification,
  AssessmentResult,
  AssessmentRubric,
  Campaign,
  CoachingAction,
  DashboardMetrics,
  Pitch,
  PracticeAttempt,
  Product,
  Progress,
  PromotionalInput,
  Transcript,
  User,
} from "@/types";

const delay = (ms = 260) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getCurrentUser(): Promise<User> {
  await delay(120);
  return mock.currentUser;
}

export async function getCampaigns(): Promise<Campaign[]> {
  await delay();
  // TMs only ever see assigned, active campaigns.
  return mock.campaigns.filter((campaign) => campaign.assigned);
}

export async function getCampaign(slug: string): Promise<Campaign> {
  await delay();
  const campaign = mock.campaigns.find((item) => item.slug === slug);
  if (!campaign) throw new Error(`Campaign not found: ${slug}`);
  return campaign;
}

export async function getProduct(productId: string): Promise<Product | undefined> {
  await delay(100);
  return mock.products.find((item) => item.id === productId);
}

export async function getWeeklyInputs(): Promise<PromotionalInput[]> {
  await delay();
  return mock.weeklyInputs;
}

export async function getPromotionalInput(campaignId: string): Promise<PromotionalInput> {
  await delay();
  const input = mock.weeklyInputs.find((item) => item.campaignId === campaignId);
  if (!input) throw new Error(`No approved input for campaign: ${campaignId}`);
  return input;
}

export async function getPitch(campaignId: string): Promise<Pitch> {
  await delay();
  // Approved content is the source of truth; campaigns without an approved
  // pitch fall back to the reference cardiovascular pitch structure.
  return mock.pitches[campaignId] ?? mock.pitches["cardiocare-a"]!;
}

export async function getRubric(campaignId: string): Promise<AssessmentRubric> {
  await delay(140);
  return mock.rubrics[campaignId] ?? mock.rubrics["cardiocare-a"]!;
}

export async function getDashboardMetrics(): Promise<DashboardMetrics> {
  await delay();
  return mock.dashboardMetrics;
}

export async function getAiSuggestions(): Promise<AiSuggestion[]> {
  await delay();
  return mock.aiSuggestions;
}

export async function getNextActions(): Promise<string[]> {
  await delay(160);
  return mock.nextActions;
}

export async function getPracticeAttempt(campaignId: string): Promise<PracticeAttempt> {
  await delay();
  const attempt = mock.progress.history.find((item) => item.campaignId === campaignId);
  return attempt ?? mock.latestAttempt;
}

export async function getTranscript(campaignId: string): Promise<Transcript> {
  await delay(420);
  return mock.transcripts[campaignId] ?? mock.transcripts["cardiocare-a"]!;
}

export async function getAssessmentResult(campaignId: string): Promise<AssessmentResult> {
  await delay(420);
  return mock.assessmentResults[campaignId] ?? mock.assessmentResults["cardiocare-a"]!;
}

export async function getProgress(): Promise<Progress> {
  await delay();
  return mock.progress;
}

export async function getNotifications(): Promise<AppNotification[]> {
  await delay(200);
  return mock.notifications;
}

export async function getCoachingActions(): Promise<CoachingAction[]> {
  await delay();
  return mock.coachingActions;
}
