import type {
  AssessmentResult,
  AssessmentRubric,
  Campaign,
  CoverageCheck,
  Feedback,
  Pitch,
  Transcript,
  TranscriptTurn,
} from "@/types";

export interface GeminiAssessmentResult {
  transcript: TranscriptTurn[];
  accuracy: number;
  adherence: number;
  rating: number;
  readiness: "ready" | "on_track" | "needs_focus";
  verdict: string;
  positives: Feedback[];
  improvements: Feedback[];
  coverage: CoverageCheck[];
  isAiGenerated: boolean;
}

const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;

export const isGeminiConfigured = (): boolean => {
  return Boolean(geminiApiKey && geminiApiKey.trim().length > 10 && !geminiApiKey.includes("your-"));
};

/**
 * Converts a browser Blob to a raw base64 string
 */
async function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result as string;
      const base64 = dataUrl.split(",")[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

/**
 * Evaluates a detailing practice audio recording using Google Gemini 2.0 Flash.
 *
 * Gemini 2.0 Flash is natively multimodal: it transcribes the audio, validates
 * spoken statements against mandatory pharma claims and prohibited words,
 * and outputs a rubric-graded scorecard in a single API call.
 */
export async function evaluateWithGemini({
  audioBlob,
  campaign,
  pitch,
  rubric,
}: {
  audioBlob: Blob;
  campaign?: Campaign;
  pitch?: Pitch;
  rubric?: AssessmentRubric;
}): Promise<GeminiAssessmentResult | null> {
  if (!isGeminiConfigured()) {
    console.info("Gemini API key not configured, using baseline rubric evaluation");
    return null;
  }

  try {
    const base64Audio = await blobToBase64(audioBlob);
    const mimeType = audioBlob.type || "audio/webm";

    const prompt = `
You are the Quantae AI Detailing Assessment Engine for Pharmaceutical Field Intelligence.
Evaluate this audio recording of a medical representative (Territory Manager) detailing a doctor.

BRAND CONTEXT:
- Product: ${campaign?.productName || "CardioCare A"}
- Campaign Title: ${campaign?.title || "Cardio Drive"}
- Campaign Objective: ${campaign?.objective || "Drive appropriate first-line therapy adoption"}

PITCH GROUND TRUTH:
- Structure: ${
      pitch?.sections?.map((s) => `${s.title}: "${s.script}"`).join("\n") ||
      "Opening, Core Messages (BP reduction, once daily dosing, safety), Closing commitment ask"
    }

EVALUATION RUBRIC & RULES:
- Mandatory Messages: ${
      JSON.stringify(rubric?.mandatoryMessages) ||
      '["Proven and consistent BP reduction", "Once daily dosing simplifies treatment", "Well tolerated with a strong safety profile"]'
    }
- Approved Synonyms: ${JSON.stringify(rubric?.approvedSynonyms || [])}
- Prohibited Claims: ${
      JSON.stringify(rubric?.prohibitedClaims) ||
      '["100% cure rate", "completely risk-free", "superior to all alternatives"]'
    }
- Scoring Weights: Accuracy (40%), Adherence to Structure (35%), Mandatory Messages (25%).

TASK:
1. Listen carefully to the representative's speech.
2. Produce an accurate transcript split by speaker turns (rep is "tm", if any doctor reply use "hcp").
3. Score Accuracy (0-100) based on correct medical facts without prohibited claims.
4. Score Adherence (0-100) based on following opening, core messages, and asking for commitment.
5. Overall rating (1.0 to 5.0 scale).
6. Set readiness to "ready" (if average >= 85), "on_track" (70-84), or "needs_focus" (<70).
7. Generate 2-3 specific positives and 2-3 specific constructive improvement areas.
8. Check coverage of key sections.

Return ONLY a valid JSON object matching this schema:
{
  "transcript": [
    { "speaker": "tm", "speakerLabel": "Territory Manager", "text": "spoken words here" }
  ],
  "accuracy": 92,
  "adherence": 89,
  "rating": 4.7,
  "readiness": "ready",
  "verdict": "Clear, compliant detailing with strong guideline focus",
  "positives": [
    { "id": "pos-1", "title": "Strong Opening Hook", "detail": "Addressed Dr. warmly and linked to AHA guideline update", "kind": "positive" }
  ],
  "improvements": [
    { "id": "imp-1", "title": "Pause for HCP Agreement", "detail": "Pause after mentioning once-daily dosing to confirm tolerance", "kind": "improvement" }
  ],
  "coverage": [
    { "id": "cov-1", "label": "Opening Greeting & Rapport", "state": "covered" },
    { "id": "cov-2", "label": "Core Clinical Claims", "state": "covered" },
    { "id": "cov-3", "label": "Specific Commitment Ask", "state": "covered" }
  ]
}
`;

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiApiKey}`;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                inlineData: {
                  mimeType,
                  data: base64Audio,
                },
              },
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.2,
        },
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.warn("Gemini API call returned non-200:", response.status, errText);
      return null;
    }

    const data = await response.json();
    const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!candidateText) {
      console.warn("No text in Gemini candidate response:", data);
      return null;
    }

    const parsed = JSON.parse(candidateText);

    return {
      transcript: Array.isArray(parsed.transcript) ? parsed.transcript : [],
      accuracy: typeof parsed.accuracy === "number" ? parsed.accuracy : 90,
      adherence: typeof parsed.adherence === "number" ? parsed.adherence : 88,
      rating: typeof parsed.rating === "number" ? parsed.rating : 4.5,
      readiness: parsed.readiness || "ready",
      verdict: parsed.verdict || "Compliant detailing practice with good flow",
      positives: Array.isArray(parsed.positives) ? parsed.positives : [],
      improvements: Array.isArray(parsed.improvements) ? parsed.improvements : [],
      coverage: Array.isArray(parsed.coverage) ? parsed.coverage : [],
      isAiGenerated: true,
    };
  } catch (error) {
    console.warn("Gemini evaluation encountered an exception, using fallback:", error);
    return null;
  }
}
