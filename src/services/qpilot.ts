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
  if (isMockFallbackEnabled()) {
    await delay();
    return mock.dashboardMetrics;
  }

  try {
    const [campaignsRes, attemptsRes, inputsRes] = await Promise.all([
      supabase.from("campaigns").select("readiness_score"),
      supabase.from("practice_attempts").select("id", { count: "exact" }),
      supabase.from("promotional_inputs").select("status"),
    ]);

    const campaigns = campaignsRes.data || [];
    const inputs = inputsRes.data || [];
    const completedAttemptsCount = attemptsRes.count ?? 0;

    if (campaigns.length === 0) {
      return mock.dashboardMetrics;
    }

    const avgReadiness = Math.round(
      campaigns.reduce((acc, c: any) => acc + (c.readiness_score || 0), 0) / campaigns.length,
    );
    const completedInputs = inputs.filter((inp: any) => inp.status === "completed").length;

    return {
      readinessScore: avgReadiness || mock.dashboardMetrics.readinessScore,
      deltaPercent: 6,
      completedInputs: completedInputs || mock.dashboardMetrics.completedInputs,
      totalInputs: inputs.length || mock.dashboardMetrics.totalInputs,
      activePractices: Math.max(1, completedAttemptsCount),
      scheduledPractices: 3,
    };
  } catch (err) {
    console.warn("Supabase getDashboardMetrics failed, using mock:", err);
    return mock.dashboardMetrics;
  }
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
  if (isMockFallbackEnabled()) {
    await delay();
    const attempt = mock.progress.history.find((item) => item.campaignId === campaignId);
    return attempt ?? mock.latestAttempt;
  }

  try {
    const { data, error } = await supabase
      .from("practice_attempts")
      .select("*")
      .eq("campaign_id", campaignId)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error || !data) {
      const fallback = mock.progress.history.find((item) => item.campaignId === campaignId);
      return fallback ?? mock.latestAttempt;
    }

    return {
      id: data.id,
      campaignId: data.campaign_id,
      userId: data.user_id ?? "tm-user",
      mode: data.mode as "guided" | "full",
      date: data.date,
      score: data.score,
      rating: Number(data.rating),
      verdict: data.verdict ?? "Practice detailing attempt",
      durationSeconds: data.duration_seconds,
      audioUrl: data.audio_url,
    };
  } catch (err) {
    console.warn(`Supabase getPracticeAttempt(${campaignId}) failed, using fallback:`, err);
    const fallback = mock.progress.history.find((item) => item.campaignId === campaignId);
    return fallback ?? mock.latestAttempt;
  }
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

  if (isMockFallbackEnabled()) {
    await delay(200);
    return mock.transcripts[campaignId] ?? mock.transcripts["cardiocare-a"]!;
  }

  try {
    const { data, error } = await supabase
      .from("transcripts")
      .select("*")
      .eq("campaign_id", campaignId)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error || !data) {
      return mock.transcripts[campaignId] ?? mock.transcripts["cardiocare-a"]!;
    }

    return {
      id: data.id,
      attemptId: data.attempt_id,
      campaignId: data.campaign_id,
      submittedAt: data.submitted_at || new Date(data.created_at).toISOString(),
      status: data.status,
      turns: data.turns ?? [],
      vocabularyMapping: data.vocabulary_mapping ?? [],
      corrections: data.corrections ?? [],
    };
  } catch (err) {
    console.warn(`Supabase getTranscript(${campaignId}) failed, using fallback:`, err);
    return mock.transcripts[campaignId] ?? mock.transcripts["cardiocare-a"]!;
  }
}

export async function getAssessmentResult(campaignId: string): Promise<AssessmentResult> {
  if (activeAssessments[campaignId]) {
    return activeAssessments[campaignId];
  }

  if (isMockFallbackEnabled()) {
    await delay(200);
    return mock.assessmentResults[campaignId] ?? mock.assessmentResults["cardiocare-a"]!;
  }

  try {
    const { data, error } = await supabase
      .from("assessment_results")
      .select("*")
      .eq("campaign_id", campaignId)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error || !data) {
      return mock.assessmentResults[campaignId] ?? mock.assessmentResults["cardiocare-a"]!;
    }

    return {
      id: data.id,
      attemptId: data.attempt_id,
      campaignId: data.campaign_id,
      accuracy: data.accuracy,
      adherence: data.adherence,
      rating: Number(data.rating),
      readiness: data.readiness,
      calculatedBy: data.calculated_by || "application",
      positives: data.positives ?? [],
      improvements: data.improvements ?? [],
      coverage: data.coverage ?? [],
      requiresHumanReview: Boolean(data.requires_human_review),
    };
  } catch (err) {
    console.warn(`Supabase getAssessmentResult(${campaignId}) failed, using fallback:`, err);
    return mock.assessmentResults[campaignId] ?? mock.assessmentResults["cardiocare-a"]!;
  }
}

export async function getProgress(): Promise<Progress> {
  if (isMockFallbackEnabled()) {
    await delay();
    return mock.progress;
  }

  try {
    const [attemptsRes, campaignsRes] = await Promise.all([
      supabase
        .from("practice_attempts")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(20),
      supabase
        .from("campaigns")
        .select("id, product_name, readiness_score, readiness"),
    ]);

    const attemptsData = attemptsRes.data || [];
    const campaignsData = campaignsRes.data || [];

    if (attemptsData.length === 0) {
      return mock.progress;
    }

    const history: PracticeAttempt[] = attemptsData.map((att: any) => ({
      id: att.id,
      campaignId: att.campaign_id,
      userId: att.user_id ?? "tm-user",
      mode: att.mode as "guided" | "full",
      date: att.date,
      score: att.score,
      rating: Number(att.rating),
      verdict: att.verdict ?? "Practice attempt",
      durationSeconds: att.duration_seconds,
      audioUrl: att.audio_url,
    }));

    // Build chronological score trend for chart (oldest to newest)
    const chronological = [...history].reverse();
    const scoreTrend = chronological.map((att, idx) => ({
      label: att.date ? att.date.split(" ").slice(0, 2).join(" ") : `Attempt ${idx + 1}`,
      score: att.score,
    }));

    // Calculate improvement delta
    const firstScore = chronological[0]?.score ?? 80;
    const latestScore = chronological[chronological.length - 1]?.score ?? firstScore;
    const improvementDelta = latestScore - firstScore;

    // Map readiness by campaign from real campaign table
    const readinessByCampaign = campaignsData.map((c: any) => ({
      campaignId: c.id,
      name: c.product_name,
      score: c.readiness_score,
      readiness: c.readiness,
    }));

    return {
      scoreTrend: scoreTrend.length > 0 ? scoreTrend : mock.progress.scoreTrend,
      improvementDelta: scoreTrend.length > 1 ? improvementDelta : mock.progress.improvementDelta,
      readinessByCampaign: readinessByCampaign.length > 0 ? readinessByCampaign : mock.progress.readinessByCampaign,
      history,
      coachNotes: mock.progress.coachNotes,
    };
  } catch (err) {
    console.warn("Supabase getProgress failed, using fallback:", err);
    return mock.progress;
  }
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
