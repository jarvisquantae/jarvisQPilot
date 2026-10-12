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
  spokenTranscript?: string;
}

export async function savePracticeAttempt({
  campaignId,
  userId,
  mode,
  durationSeconds,
  audioUrl,
  audioBlob,
  spokenTranscript,
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

  let score = 80;
  let rating = 4.0;
  let verdict = "Detailing Practice Completed";
  let isAiEvaluated = false;

  const baseTranscript: Transcript = {
    id: `trn-${Date.now()}`,
    attemptId,
    campaignId,
    submittedAt: now.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
    status: "complete",
    turns: [
      {
        id: "turn-1",
        speaker: "tm",
        speakerLabel: "Territory Manager (You)",
        text: "Detailing audio recording submitted for assessment.",
      },
    ],
    vocabularyMapping: [],
    corrections: [],
  };

  const baseAssessment: AssessmentResult = {
    id: `asr-${Date.now()}`,
    attemptId,
    campaignId,
    accuracy: 80,
    adherence: 80,
    rating: 4.0,
    readiness: "on_track",
    calculatedBy: "application",
    positives: [],
    improvements: [],
    coverage: [],
  };

  // Evaluate detailing audio using Gemini 2.0 Flash or local spoken speech engine
  if (audioBlob || spokenTranscript) {
    try {
      const [campaign, pitch, rubric] = await Promise.all([
        getCampaign(campaignId).catch(() => undefined),
        getPitch(campaignId).catch(() => undefined),
        getRubric(campaignId).catch(() => undefined),
      ]);

      const aiResult = await evaluateWithGemini({
        audioBlob: audioBlob || new Blob([], { type: "audio/webm" }),
        spokenTranscript,
        campaign,
        pitch,
        rubric,
      });

      if (aiResult) {
        isAiEvaluated = aiResult.isAiGenerated;
        score = Math.round(aiResult.accuracy * 0.5 + aiResult.adherence * 0.5);
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

        if (aiResult.vocabularyMapping && aiResult.vocabularyMapping.length > 0) {
          baseTranscript.vocabularyMapping = aiResult.vocabularyMapping;
        }

        baseAssessment.accuracy = aiResult.accuracy;
        baseAssessment.adherence = aiResult.adherence;
        baseAssessment.rating = aiResult.rating;
        baseAssessment.readiness = aiResult.readiness;
        baseAssessment.positives = aiResult.positives || [];
        baseAssessment.improvements = aiResult.improvements || [];
        baseAssessment.coverage = aiResult.coverage || [];
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
