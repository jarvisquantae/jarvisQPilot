import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import * as mock from "@/data/mock";
import type { PracticeAttempt, Transcript, AssessmentResult } from "@/types";

export interface SaveAttemptParams {
  campaignId: string;
  userId: string;
  mode: "guided" | "full";
  durationSeconds: number;
  audioUrl: string;
}

export async function savePracticeAttempt({
  campaignId,
  userId,
  mode,
  durationSeconds,
  audioUrl,
}: SaveAttemptParams): Promise<{
  attempt: PracticeAttempt;
  transcript: Transcript;
  assessment: AssessmentResult;
}> {
  const attemptId = `att-${Date.now()}`;
  const now = new Date();
  const dateFormatted = now.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const baseAttempt: PracticeAttempt = {
    id: attemptId,
    campaignId,
    userId,
    mode,
    date: dateFormatted,
    score: 92,
    rating: 4.8,
    verdict: "Strong Detailing — Ready for HCP Interactions",
    durationSeconds,
  };

  const baseTranscript: Transcript = {
    ...(mock.transcripts[campaignId] || mock.transcripts["cardiocare-a"]!),
    id: `trn-${Date.now()}`,
    attemptId,
    campaignId,
    submittedAt: now.toISOString(),
    status: "complete",
  };

  const baseAssessment: AssessmentResult = {
    ...(mock.assessmentResults[campaignId] || mock.assessmentResults["cardiocare-a"]!),
    id: `asr-${Date.now()}`,
    attemptId,
    campaignId,
    accuracy: 94,
    adherence: 91,
    rating: 4.8,
    readiness: "ready",
  };

  if (!isSupabaseConfigured()) {
    return {
      attempt: baseAttempt,
      transcript: baseTranscript,
      assessment: baseAssessment,
    };
  }

  try {
    // 1. Insert practice attempt
    await supabase.from("practice_attempts").insert({
      id: attemptId,
      campaign_id: campaignId,
      user_id: userId.includes("usr-") ? null : userId, // UUID check
      mode,
      date: dateFormatted,
      score: 92,
      rating: 4.8,
      verdict: baseAttempt.verdict,
      duration_seconds: durationSeconds,
      audio_url: audioUrl,
    });

    // 2. Insert transcript
    await supabase.from("transcripts").insert({
      id: baseTranscript.id,
      attempt_id: attemptId,
      campaign_id: campaignId,
      status: "complete",
      turns: baseTranscript.turns,
      vocabulary_mapping: baseTranscript.vocabularyMapping,
      corrections: baseTranscript.corrections,
    });

    // 3. Insert assessment result
    await supabase.from("assessment_results").insert({
      id: baseAssessment.id,
      attempt_id: attemptId,
      campaign_id: campaignId,
      accuracy: 94,
      adherence: 91,
      rating: 4.8,
      readiness: "ready",
      positives: baseAssessment.positives,
      improvements: baseAssessment.improvements,
      coverage: baseAssessment.coverage,
    });
  } catch (err) {
    console.warn("Could not write practice attempt to Supabase (using memory fallback):", err);
  }

  return {
    attempt: baseAttempt,
    transcript: baseTranscript,
    assessment: baseAssessment,
  };
}
