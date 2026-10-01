import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import * as mock from "@/data/mock";
import { evaluateWithGemini } from "@/services/ai";
import {
  getCampaign,
  getPitch,
  getRubric,
  updateActiveEvaluation,
} from "@/services/qpilot";
import type { PracticeAttempt, Transcript, AssessmentResult } from "@/types";

export interface SaveAttemptParams {
  campaignId: string;
  userId: string;
  mode: "guided" | "full";
  durationSeconds: number;
  audioUrl: string;
  audioBlob?: Blob;
}

export async function savePracticeAttempt({
  campaignId,
  userId,
  mode,
  durationSeconds,
  audioUrl,
  audioBlob,
}: SaveAttemptParams): Promise<{
  attempt: PracticeAttempt;
  transcript: Transcript;
  assessment: AssessmentResult;
  isAiEvaluated: boolean;
}> {
  const attemptId = `att-${Date.now()}`;
  const now = new Date();
  const dateFormatted = now.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  let score = 92;
  let rating = 4.8;
  let verdict = "Strong Detailing — Ready for HCP Interactions";
  let isAiEvaluated = false;

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

  // If audioBlob is supplied, attempt live Gemini 2.0 Flash evaluation
  if (audioBlob) {
    try {
      const [campaign, pitch, rubric] = await Promise.all([
        getCampaign(campaignId).catch(() => undefined),
        getPitch(campaignId).catch(() => undefined),
        getRubric(campaignId).catch(() => undefined),
      ]);

      const aiResult = await evaluateWithGemini({
        audioBlob,
        campaign,
        pitch,
        rubric,
      });

      if (aiResult) {
        isAiEvaluated = true;
        score = Math.round(aiResult.accuracy * 0.4 + aiResult.adherence * 0.35 + 24);
        rating = aiResult.rating;
        verdict = aiResult.verdict;

        if (aiResult.transcript && aiResult.transcript.length > 0) {
          baseTranscript.turns = aiResult.transcript.map((t, idx) => ({
            id: `turn-${idx + 1}`,
            speaker: t.speaker,
            speakerLabel: t.speakerLabel,
            text: t.text,
          }));
        }

        baseAssessment.accuracy = aiResult.accuracy;
        baseAssessment.adherence = aiResult.adherence;
        baseAssessment.rating = aiResult.rating;
        baseAssessment.readiness = aiResult.readiness;
        if (aiResult.positives && aiResult.positives.length > 0) {
          baseAssessment.positives = aiResult.positives;
        }
        if (aiResult.improvements && aiResult.improvements.length > 0) {
          baseAssessment.improvements = aiResult.improvements;
        }
        if (aiResult.coverage && aiResult.coverage.length > 0) {
          baseAssessment.coverage = aiResult.coverage;
        }
      }
    } catch (aiErr) {
      console.warn("AI evaluation error, fell back to baseline scoring:", aiErr);
    }
  }

  const baseAttempt: PracticeAttempt = {
    id: attemptId,
    campaignId,
    userId,
    mode,
    date: dateFormatted,
    score,
    rating,
    verdict,
    durationSeconds,
  };

  // Update in-memory active cache so next screens display the fresh AI evaluation immediately
  updateActiveEvaluation(campaignId, baseTranscript, baseAssessment);

  if (!isSupabaseConfigured()) {
    return {
      attempt: baseAttempt,
      transcript: baseTranscript,
      assessment: baseAssessment,
      isAiEvaluated,
    };
  }

  try {
    // 1. Insert practice attempt
    await supabase.from("practice_attempts").insert({
      id: attemptId,
      campaign_id: campaignId,
      user_id: userId.includes("usr-") ? null : userId,
      mode,
      date: dateFormatted,
      score,
      rating,
      verdict,
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
      accuracy: baseAssessment.accuracy,
      adherence: baseAssessment.adherence,
      rating: baseAssessment.rating,
      readiness: baseAssessment.readiness,
      positives: baseAssessment.positives,
      improvements: baseAssessment.improvements,
      coverage: baseAssessment.coverage,
    });
  } catch (err) {
    console.warn("Could not write practice attempt to Supabase (using active memory state):", err);
  }

  return {
    attempt: baseAttempt,
    transcript: baseTranscript,
    assessment: baseAssessment,
    isAiEvaluated,
  };
}
