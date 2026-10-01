/**
 * Data access layer for Q-Pilot.
 *
 * Interacts with Supabase when configured, with seamless fallback to realistic
 * mock data when credentials are not yet supplied or during offline development.
 */

import * as mock from "@/data/mock";
import { isMockFallbackEnabled, supabase } from "@/lib/supabase";
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
  if (isMockFallbackEnabled()) {
    await delay(120);
    return mock.currentUser;
  }

  try {
    const { data: authData, error: authError } = await supabase.auth.getUser();
    if (authError || !authData?.user) {
      return mock.currentUser;
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", authData.user.id)
      .maybeSingle();

    if (profileError || !profile) {
      return {
        ...mock.currentUser,
        id: authData.user.id,
        email: authData.user.email ?? mock.currentUser.email,
      };
    }

    return {
      id: profile.id,
      name: profile.name,
      role: profile.role,
      roleLabel: profile.role_label,
      email: profile.email,
      territory: profile.territory ?? "Unassigned",
      reportingManager: profile.reporting_manager ?? "N/A",
      currentCampaignId: profile.current_campaign_id ?? "cardiocare-a",
      initials: profile.initials ?? profile.name.slice(0, 2).toUpperCase(),
    };
  } catch (err) {
    console.warn("Failed to fetch user from Supabase, falling back to mock:", err);
    return mock.currentUser;
  }
}

export async function getCampaigns(): Promise<Campaign[]> {
  if (isMockFallbackEnabled()) {
    await delay();
    return mock.campaigns.filter((campaign) => campaign.assigned);
  }

  try {
    const { data, error } = await supabase
      .from("campaigns")
      .select("*")
      .eq("assigned", true);

    if (error || !data || data.length === 0) {
      return mock.campaigns.filter((campaign) => campaign.assigned);
    }

    return data.map((c: any) => ({
      id: c.id,
      slug: c.slug,
      code: c.code,
      title: c.title,
      productId: c.product_id,
      productName: c.product_name,
      quarter: c.quarter,
      objective: c.objective,
      dueDate: c.due_date,
      status: c.status,
      progress: c.progress,
      readiness: c.readiness,
      readinessScore: c.readiness_score,
      assigned: c.assigned,
    }));
  } catch (err) {
    console.warn("Supabase campaigns query failed, using mock data:", err);
    return mock.campaigns.filter((campaign) => campaign.assigned);
  }
}

export async function getCampaign(slug: string): Promise<Campaign> {
  if (isMockFallbackEnabled()) {
    await delay();
    const campaign = mock.campaigns.find((item) => item.slug === slug);
    if (!campaign) throw new Error(`Campaign not found: ${slug}`);
    return campaign;
  }

  try {
    const { data, error } = await supabase
      .from("campaigns")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();

    if (error || !data) {
      const fallback = mock.campaigns.find((item) => item.slug === slug);
      if (!fallback) throw new Error(`Campaign not found: ${slug}`);
      return fallback;
    }

    return {
      id: data.id,
      slug: data.slug,
      code: data.code,
      title: data.title,
      productId: data.product_id,
      productName: data.product_name,
      quarter: data.quarter,
      objective: data.objective,
      dueDate: data.due_date,
      status: data.status,
      progress: data.progress,
      readiness: data.readiness,
      readinessScore: data.readiness_score,
      assigned: data.assigned,
    };
  } catch (err) {
    console.warn(`Supabase getCampaign(${slug}) failed, using mock:`, err);
    const fallback = mock.campaigns.find((item) => item.slug === slug);
    if (!fallback) throw new Error(`Campaign not found: ${slug}`);
    return fallback;
  }
}

export async function getProduct(productId: string): Promise<Product | undefined> {
  if (isMockFallbackEnabled()) {
    await delay(100);
    return mock.products.find((item) => item.id === productId);
  }

  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", productId)
      .maybeSingle();

    if (error || !data) {
      return mock.products.find((item) => item.id === productId);
    }

    return {
      id: data.id,
      name: data.name,
      indication: data.indication,
      therapyArea: data.therapy_area,
    };
  } catch (err) {
    console.warn(`Supabase getProduct(${productId}) failed, using mock:`, err);
    return mock.products.find((item) => item.id === productId);
  }
}

export async function getWeeklyInputs(): Promise<PromotionalInput[]> {
  if (isMockFallbackEnabled()) {
    await delay();
    return mock.weeklyInputs;
  }

  try {
    const { data, error } = await supabase.from("promotional_inputs").select("*");

    if (error || !data || data.length === 0) {
      return mock.weeklyInputs;
    }

    return data.map((inp: any) => ({
      id: inp.id,
      campaignId: inp.campaign_id,
      day: inp.day,
      dayNumber: inp.day_number,
      specialty: inp.specialty,
      title: inp.title,
      status: inp.status,
      usage: inp.usage,
      format: inp.format,
      validity: inp.validity,
      approvedBy: inp.approved_by,
      lastUpdated: inp.last_updated,
      explanation: inp.explanation,
    }));
  } catch (err) {
    console.warn("Supabase weekly inputs query failed, using mock:", err);
    return mock.weeklyInputs;
  }
}

export async function getPromotionalInput(campaignId: string): Promise<PromotionalInput> {
  if (isMockFallbackEnabled()) {
    await delay();
    const input = mock.weeklyInputs.find((item) => item.campaignId === campaignId);
    if (!input) throw new Error(`No approved input for campaign: ${campaignId}`);
    return input;
  }

  try {
    const { data, error } = await supabase
      .from("promotional_inputs")
      .select("*")
      .eq("campaign_id", campaignId)
      .maybeSingle();

    if (error || !data) {
      const fallback = mock.weeklyInputs.find((item) => item.campaignId === campaignId);
      if (!fallback) throw new Error(`No approved input for campaign: ${campaignId}`);
      return fallback;
    }

    return {
      id: data.id,
      campaignId: data.campaign_id,
      day: data.day,
      dayNumber: data.day_number,
      specialty: data.specialty,
      title: data.title,
      status: data.status,
      usage: data.usage,
      format: data.format,
      validity: data.validity,
      approvedBy: data.approved_by,
      lastUpdated: data.last_updated,
      explanation: data.explanation,
    };
  } catch (err) {
    console.warn(`Supabase getPromotionalInput(${campaignId}) failed, using mock:`, err);
    const fallback = mock.weeklyInputs.find((item) => item.campaignId === campaignId);
    if (!fallback) throw new Error(`No approved input for campaign: ${campaignId}`);
    return fallback;
  }
}

export async function getPitch(campaignId: string): Promise<Pitch> {
  if (isMockFallbackEnabled()) {
    await delay();
    return mock.pitches[campaignId] ?? mock.pitches["cardiocare-a"]!;
  }

  try {
    const { data, error } = await supabase
      .from("pitches")
      .select("*")
      .eq("campaign_id", campaignId)
      .maybeSingle();

    if (error || !data) {
      return mock.pitches[campaignId] ?? mock.pitches["cardiocare-a"]!;
    }

    return {
      id: data.id,
      campaignId: data.campaign_id,
      status: data.status,
      totalDuration: data.total_duration,
      listeningFocus: data.listening_focus ?? [],
      sections: data.sections ?? [],
      objections: data.objections ?? [],
    };
  } catch (err) {
    console.warn(`Supabase getPitch(${campaignId}) failed, using mock:`, err);
    return mock.pitches[campaignId] ?? mock.pitches["cardiocare-a"]!;
  }
}

export async function getRubric(campaignId: string): Promise<AssessmentRubric> {
  if (isMockFallbackEnabled()) {
    await delay(140);
    return mock.rubrics[campaignId] ?? mock.rubrics["cardiocare-a"]!;
  }

  try {
    const { data, error } = await supabase
      .from("assessment_rubrics")
      .select("*")
      .eq("campaign_id", campaignId)
      .maybeSingle();

    if (error || !data) {
      return mock.rubrics[campaignId] ?? mock.rubrics["cardiocare-a"]!;
    }

    return {
      id: data.id,
      campaignId: data.campaign_id,
      weights: data.weights,
      mandatoryMessages: data.mandatory_messages ?? [],
      approvedSynonyms: data.approved_synonyms ?? [],
      prohibitedClaims: data.prohibited_claims ?? [],
      readinessThreshold: data.readiness_threshold ?? 80,
    };
  } catch (err) {
    console.warn(`Supabase getRubric(${campaignId}) failed, using mock:`, err);
    return mock.rubrics[campaignId] ?? mock.rubrics["cardiocare-a"]!;
  }
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

const activeTranscripts: Record<string, Transcript> = {};
const activeAssessments: Record<string, AssessmentResult> = {};

export function updateActiveEvaluation(
  campaignId: string,
  transcript: Transcript,
  assessment: AssessmentResult,
) {
  activeTranscripts[campaignId] = transcript;
  activeAssessments[campaignId] = assessment;
}

export async function getTranscript(campaignId: string): Promise<Transcript> {
  if (activeTranscripts[campaignId]) {
    return activeTranscripts[campaignId];
  }
  await delay(420);
  return mock.transcripts[campaignId] ?? mock.transcripts["cardiocare-a"]!;
}

export async function getAssessmentResult(campaignId: string): Promise<AssessmentResult> {
  if (activeAssessments[campaignId]) {
    return activeAssessments[campaignId];
  }
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
  if (isMockFallbackEnabled()) {
    await delay();
    return mock.coachingActions;
  }

  try {
    const { data, error } = await supabase.from("coaching_actions").select("*");

    if (error || !data || data.length === 0) {
      return mock.coachingActions;
    }

    return data.map((act: any) => ({
      id: act.id,
      tmName: act.tm_name,
      campaignName: act.campaign_name,
      action: act.action,
      dueDate: act.due_date,
      status: act.status,
    }));
  } catch (err) {
    console.warn("Supabase coaching actions query failed, using mock:", err);
    return mock.coachingActions;
  }
}
