import type {
  AssessmentResult,
  AssessmentRubric,
  Campaign,
  CoverageCheck,
  Feedback,
  Pitch,
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

export const getGeminiApiKey = (): string | undefined => {
  if (typeof window !== "undefined") {
    const localKey = localStorage.getItem("qp_gemini_api_key");
    if (localKey && localKey.trim().length > 10) return localKey.trim();
  }
  const envKey = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;
  if (envKey && envKey.trim().length > 10 && !envKey.includes("your-")) {
    return envKey.trim();
  }
  return undefined;
};

export const setGeminiApiKey = (key: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("qp_gemini_api_key", key.trim());
  }
};

export const isGeminiConfigured = (): boolean => {
  return Boolean(getGeminiApiKey());
};

/**
 * Evaluates live spoken transcript using clinical rubric rules directly
 * when Gemini API key is not present or offline.
 */
export function evaluateSpokenTranscriptLocal({
  spokenTranscript,
  campaign,
  pitch,
  rubric,
}: {
  spokenTranscript: string;
  campaign?: Campaign;
  pitch?: Pitch;
  rubric?: AssessmentRubric;
}): GeminiAssessmentResult {
  const cleanText = spokenTranscript.trim();
  const lower = cleanText.toLowerCase();

  // If rep spoke nothing or negligible audio
  if (!cleanText || cleanText.length < 5) {
    return {
      transcript: [
        {
          speaker: "tm",
          speakerLabel: "Territory Manager (You)",
          text:
            cleanText ||
            "[No clear speech detected in recording. Please check microphone permissions and speak clearly during your detailing pitch.]",
        },
      ],
      accuracy: 45,
      adherence: 40,
      rating: 2.5,
      readiness: "needs_focus",
      verdict: "Insufficient speech detected for complete assessment. Please repeat your detailing pitch.",
      positives: [
        {
          id: "pos-mic",
          title: "Microphone Active",
          detail: "Audio stream was captured successfully.",
          kind: "positive",
        },
      ],
      improvements: [
        {
          id: "imp-voice",
          title: "Speak Louder and Clearer",
          detail: "Ensure you clearly deliver the opening, clinical efficacy, and commitment ask.",
          kind: "improvement",
        },
      ],
      coverage: [
        { id: "cov-1", label: "Opening Greeting & Rapport", state: "missing" },
        { id: "cov-2", label: "Core Clinical Claims", state: "missing" },
        { id: "cov-3", label: "Specific Commitment Ask", state: "missing" },
      ],
      isAiGenerated: false,
    };
  }

  // Check mandatory messages
  const mandatory = rubric?.mandatoryMessages || [
    "Proven and consistent BP reduction",
    "Once daily dosing simplifies treatment",
    "Well tolerated with a strong safety profile",
  ];

  let mandatoryHits = 0;
  mandatory.forEach((msg) => {
    const keywords = msg.toLowerCase().split(" ").filter((w) => w.length > 3);
    const hit = keywords.some((kw) => lower.includes(kw));
    if (hit) mandatoryHits++;
  });

  // Check prohibited claims
  const prohibited = rubric?.prohibitedClaims || [
    "100% cure rate",
    "completely risk-free",
    "superior to all alternatives",
  ];
  let prohibitedHits = 0;
  prohibited.forEach((claim) => {
    if (lower.includes(claim.toLowerCase())) prohibitedHits++;
  });

  // Check opening and closing
  const hasOpening = /good morning|hello|hi doctor|dr\.|thanks for seeing|appreciate your time/i.test(cleanText);
  const hasClosing = /sample|prescri|start|consider|patient|trial|pack|next week|agree/i.test(cleanText);

  const accuracy = Math.round(
    Math.min(96, Math.max(50, 70 + (mandatoryHits / Math.max(1, mandatory.length)) * 25 - prohibitedHits * 30))
  );
  const adherence = Math.round(
    Math.min(95, Math.max(50, 60 + (hasOpening ? 15 : 0) + (hasClosing ? 15 : 0) + (mandatoryHits > 0 ? 10 : 0)))
  );
  const rating = Number(((accuracy * 0.5 + adherence * 0.5) / 20).toFixed(1));
  const readiness = rating >= 4.2 ? "ready" : rating >= 3.6 ? "on_track" : "needs_focus";

  const positives: Feedback[] = [];
  if (hasOpening) {
    positives.push({
      id: "pos-1",
      title: "Professional Greeting & Opening",
      detail: "Addressed the healthcare professional politely and established clear call focus.",
      kind: "positive",
    });
  }
  if (mandatoryHits > 0) {
    positives.push({
      id: "pos-2",
      title: "Delivered Key Clinical Messages",
      detail: `Accurately articulated ${mandatoryHits} core approved message(s) from campaign guidelines.`,
      kind: "positive",
    });
  }
  if (positives.length === 0) {
    positives.push({
      id: "pos-default",
      title: "Live Speech Recorded",
      detail: "Spoke clearly into microphone for detailing evaluation.",
      kind: "positive",
    });
  }

  const improvements: Feedback[] = [];
  if (!hasClosing) {
    improvements.push({
      id: "imp-closing",
      title: "Add a Specific Commitment Ask",
      detail: "Close your detailing by asking the doctor to initiate trial patients or evaluate sample starter packs.",
      kind: "improvement",
    });
  }
  if (mandatoryHits < mandatory.length) {
    improvements.push({
      id: "imp-mandatory",
      title: "Reinforce Remaining Core Messages",
      detail: "Ensure mentioning once-daily dosing convenience and tolerability data during the presentation.",
      kind: "improvement",
    });
  }
  if (prohibitedHits > 0) {
    improvements.push({
      id: "imp-prohibited",
      title: "Avoid Prohibited Absolute Claims",
      detail: "Ensure strict adherence to approved label statements without absolute promises.",
      kind: "improvement",
    });
  }

  const coverage: CoverageCheck[] = [
    {
      id: "cov-1",
      label: "Opening Greeting & Rapport",
      state: hasOpening ? "covered" : "partial",
    },
    {
      id: "cov-2",
      label: "Core Clinical Claims",
      state: mandatoryHits >= 2 ? "covered" : mandatoryHits >= 1 ? "partial" : "missing",
    },
    {
      id: "cov-3",
      label: "Specific Commitment Ask",
      state: hasClosing ? "covered" : "missing",
    },
  ];

  return {
    transcript: [
      {
        speaker: "tm",
        speakerLabel: "Territory Manager (You)",
        text: cleanText,
      },
    ],
    accuracy,
    adherence,
    rating,
    readiness,
    verdict:
      readiness === "ready"
        ? "Strong live detailing performance with solid clinical messaging."
        : readiness === "on_track"
        ? "Good detailing attempt — add a clearer commitment ask for higher impact."
        : "Needs focus on mandatory clinical claims and structured closing.",
    positives,
    improvements,
    coverage,
    isAiGenerated: false,
  };
}

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
 * Falls back seamlessly to local speech-recognition rubric assessment if API key
 * is missing or call fails.
 */
export async function evaluateWithGemini({
  audioBlob,
  spokenTranscript,
  campaign,
  pitch,
  rubric,
}: {
  audioBlob: Blob;
  spokenTranscript?: string;
  campaign?: Campaign;
  pitch?: Pitch;
  rubric?: AssessmentRubric;
}): Promise<GeminiAssessmentResult> {
  const apiKey = getGeminiApiKey();

  // If Gemini key is not present, evaluate the user's real spoken words locally
  if (!apiKey) {
    console.info("Gemini API key not configured, evaluating user's real spoken audio with local rubric engine");
    return evaluateSpokenTranscriptLocal({
      spokenTranscript: spokenTranscript || "",
      campaign,
      pitch,
      rubric,
    });
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

${spokenTranscript ? `(Browser speech context hint: "${spokenTranscript}")` : ""}

TASK:
1. Listen carefully to the representative's speech in the attached audio.
2. Transcribe verbatim what the representative said. Split by speaker turns (rep is "tm", if any doctor reply use "hcp").
3. Score Accuracy (0-100) based on correct medical facts without prohibited claims.
4. Score Adherence (0-100) based on following opening, core messages, and asking for commitment.
5. Overall rating (1.0 to 5.0 scale).
6. Set readiness to "ready" (if average >= 85), "on_track" (70-84), or "needs_focus" (<70).
7. Generate 2-3 specific positives and 2-3 specific constructive improvement areas based on what they actually said.
8. Check coverage of key sections.

Return ONLY a valid JSON object matching this schema:
{
  "transcript": [
    { "speaker": "tm", "speakerLabel": "Territory Manager (You)", "text": "verbatim speech here" }
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

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

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
      return evaluateSpokenTranscriptLocal({
        spokenTranscript: spokenTranscript || "",
        campaign,
        pitch,
        rubric,
      });
    }

    const data = await response.json();
    const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!candidateText) {
      console.warn("No text in Gemini candidate response:", data);
      return evaluateSpokenTranscriptLocal({
        spokenTranscript: spokenTranscript || "",
        campaign,
        pitch,
        rubric,
      });
    }

    const parsed = JSON.parse(candidateText);

    return {
      transcript: Array.isArray(parsed.transcript) && parsed.transcript.length > 0
        ? parsed.transcript
        : [
            {
              speaker: "tm",
              speakerLabel: "Territory Manager (You)",
              text: spokenTranscript || "Audio recording submitted.",
            },
          ],
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
    console.warn("Gemini evaluation encountered an exception, using local speech evaluation:", error);
    return evaluateSpokenTranscriptLocal({
      spokenTranscript: spokenTranscript || "",
      campaign,
      pitch,
      rubric,
    });
  }
}
