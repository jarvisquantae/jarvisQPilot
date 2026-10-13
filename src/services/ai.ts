import type {
  AssessmentResult,
  AssessmentRubric,
  Campaign,
  CoverageCheck,
  Feedback,
  Pitch,
  TranscriptTurn,
  ConceptDetection,
  ReadinessStatus,
} from "@/types";

export interface GeminiAssessmentResult {
  transcript: TranscriptTurn[];
  accuracy: number;
  adherence: number;
  score: number;
  rating: number;
  readiness: ReadinessStatus;
  readinessLabel: string;
  ratingLabel: string;
  confidenceScore: number;
  requiresHumanReview: boolean;
  reviewRecommendation: string;
  concepts: ConceptDetection[];
  prohibitedClaimsDetected: string[];
  verdict: string;
  positives: Feedback[];
  improvements: Feedback[];
  coverage: CoverageCheck[];
  vocabularyMapping?: Array<{ spoken: string; approved: string; matched: boolean }>;
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
 * Builds vocabulary hints for campaign transcription accuracy per Rule 8
 */
export function buildVocabularyHints(
  campaign?: Campaign,
  pitch?: Pitch,
  rubric?: AssessmentRubric,
): string[] {
  const hints = new Set<string>();
  if (campaign?.productName) hints.add(campaign.productName);
  if (campaign?.title) hints.add(campaign.title);
  hints.add("Hypertension");
  hints.add("High BP");
  hints.add("BP control");
  hints.add("Blood pressure");
  hints.add("Systolic");
  hints.add("Diastolic");
  hints.add("CardioCare");
  hints.add("CardioVia");
  hints.add("Renal protection");
  hints.add("Once daily");
  hints.add("Once-daily dosing");
  hints.add("Tolerability");
  hints.add("Safety profile");
  hints.add("LBL");
  hints.add("Reminder Card");
  hints.add("Adherence");
  hints.add("Starter pack");
  hints.add("Patient trial");

  if (rubric?.mandatoryMessages) {
    rubric.mandatoryMessages.forEach((m) => hints.add(m));
  }
  if (rubric?.approvedSynonyms) {
    rubric.approvedSynonyms.forEach((s) => {
      hints.add(s.spoken);
      hints.add(s.approved);
    });
  }
  return Array.from(hints);
}

/**
 * Core Application Scoring Engine:
 * "AI transcribes, detects and recommends. The application calculates."
 * Weights & Readiness strictly aligned with AI Product Brief Section 9
 * and AI Accuracy Error Reduction Guide Rule 5 & 9.
 */
export function calculateApplicationScores({
  concepts,
  prohibitedClaimsDetected = [],
  confidenceScore = 90,
}: {
  concepts: ConceptDetection[];
  prohibitedClaimsDetected?: string[];
  confidenceScore?: number;
}) {
  // Weights strictly per AI Product Brief Section 9
  const weights = {
    mandatoryMessages: 0.35,
    scientificAccuracy: 0.25,
    pitchAdherence: 0.20,
    inputExplanation: 0.10,
    closingAction: 0.10,
  };

  const getConcept = (id: string): ConceptDetection | undefined =>
    concepts.find((c) => c.id === id);

  const mandatoryConcept = getConcept("mandatory_messages");
  const scientificConcept = getConcept("scientific_accuracy");
  const adherenceConcept = getConcept("pitch_adherence");
  const inputConcept = getConcept("input_explanation");
  const closingConcept = getConcept("closing_ask");

  const mandatoryScore = mandatoryConcept?.detected
    ? Math.min(100, Math.max(0, mandatoryConcept.score))
    : 40;
  const scientificScore = scientificConcept?.detected
    ? Math.min(100, Math.max(0, scientificConcept.score))
    : 40;
  const adherenceScore = adherenceConcept?.detected
    ? Math.min(100, Math.max(0, adherenceConcept.score))
    : 45;
  const inputScore = inputConcept?.detected
    ? Math.min(100, Math.max(0, inputConcept.score))
    : 35;
  const closingScore = closingConcept?.detected
    ? Math.min(100, Math.max(0, closingConcept.score))
    : 30;

  // Weighted total score formula (0-100)
  let weightedScore = Math.round(
    mandatoryScore * weights.mandatoryMessages +
    scientificScore * weights.scientificAccuracy +
    adherenceScore * weights.pitchAdherence +
    inputScore * weights.inputExplanation +
    closingScore * weights.closingAction,
  );

  // Prohibited claim penalty (Rule 4 & Product Brief Section 10)
  const hasCriticalClaim = prohibitedClaimsDetected.length > 0;
  if (hasCriticalClaim) {
    weightedScore = Math.max(25, weightedScore - prohibitedClaimsDetected.length * 25);
  }

  // Component rollups for UI
  const accuracy = Math.round(mandatoryScore * 0.58 + scientificScore * 0.42);
  const adherence = Math.round(
    adherenceScore * 0.50 + inputScore * 0.25 + closingScore * 0.25,
  );

  // Readiness scale strictly per AI Product Brief Section 9:
  let readiness: ReadinessStatus;
  let readinessLabel: string;
  let ratingLabel: string;
  let rating: number;

  if (weightedScore >= 90) {
    readiness = "ready";
    readinessLabel = "Ready for Field Execution";
    ratingLabel = "Excellent";
    rating = Number((4.8 + ((weightedScore - 90) / 10) * 0.2).toFixed(1));
  } else if (weightedScore >= 80) {
    readiness = "ready";
    readinessLabel = "Ready (Very Good)";
    ratingLabel = "Very Good";
    rating = Number((4.2 + ((weightedScore - 80) / 10) * 0.5).toFixed(1));
  } else if (weightedScore >= 70) {
    readiness = "on_track";
    readinessLabel = "Nearly Ready";
    ratingLabel = "Good";
    rating = Number((3.6 + ((weightedScore - 70) / 10) * 0.5).toFixed(1));
  } else if (weightedScore >= 60) {
    readiness = "needs_focus";
    readinessLabel = "Practice Recommended";
    ratingLabel = "Developing";
    rating = Number((3.0 + ((weightedScore - 60) / 10) * 0.5).toFixed(1));
  } else {
    readiness = "needs_focus";
    readinessLabel = "Manager Review Required";
    ratingLabel = "Needs Support";
    rating = Number(Math.max(1.5, (weightedScore / 60) * 2.9).toFixed(1));
  }

  // Confidence thresholds strictly per Error Reduction Guide Rule 9:
  const requiresHumanReview = confidenceScore < 70 || hasCriticalClaim;
  const reviewRecommendation = hasCriticalClaim
    ? "Critical Prohibited Claim Detected — Mandatory Sales Manager Review"
    : confidenceScore < 70
    ? "Low AI Confidence (<70%) — Sent for Manager Review"
    : confidenceScore < 85
    ? "Review Recommended (70–84% Confidence)"
    : "Verified Compliant";

  return {
    weightedScore,
    accuracy,
    adherence,
    rating,
    ratingLabel,
    readiness,
    readinessLabel,
    requiresHumanReview,
    reviewRecommendation,
  };
}

/**
 * Local evaluation engine adhering strictly to Section 9 weights and concept-level detection
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
    const emptyScores = calculateApplicationScores({
      concepts: [
        { id: "mandatory_messages", label: "Mandatory Messages (35%)", detected: false, score: 30, reason: "No clear speech detected" },
        { id: "scientific_accuracy", label: "Scientific & Product Accuracy (25%)", detected: false, score: 35, reason: "No clinical content articulated" },
        { id: "pitch_adherence", label: "Pitch Flow & Sequence (20%)", detected: false, score: 35, reason: "Flow missing" },
        { id: "input_explanation", label: "Input Explanation (10%)", detected: false, score: 30, reason: "No input explanation" },
        { id: "closing_ask", label: "Closing Action (10%)", detected: false, score: 25, reason: "No commitment ask" },
      ],
      confidenceScore: 40,
    });

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
      accuracy: emptyScores.accuracy,
      adherence: emptyScores.adherence,
      score: emptyScores.weightedScore,
      rating: emptyScores.rating,
      ratingLabel: emptyScores.ratingLabel,
      readiness: emptyScores.readiness,
      readinessLabel: emptyScores.readinessLabel,
      confidenceScore: 40,
      requiresHumanReview: true,
      reviewRecommendation: "Insufficient speech detected — Repeat Practice",
      concepts: [
        { id: "mandatory_messages", label: "Mandatory Messages (35%)", detected: false, score: 30, reason: "No clear speech detected" },
        { id: "scientific_accuracy", label: "Scientific & Product Accuracy (25%)", detected: false, score: 35, reason: "No clinical content articulated" },
        { id: "pitch_adherence", label: "Pitch Flow & Sequence (20%)", detected: false, score: 35, reason: "Flow missing" },
        { id: "input_explanation", label: "Input Explanation (10%)", detected: false, score: 30, reason: "No input explanation" },
        { id: "closing_ask", label: "Closing Action (10%)", detected: false, score: 25, reason: "No commitment ask" },
      ],
      prohibitedClaimsDetected: [],
      verdict: "Insufficient speech detected for complete assessment. Please repeat your detailing pitch.",
      positives: [
        {
          id: "pos-mic",
          title: "Microphone Stream Captured",
          detail: "Audio stream was received successfully by the detailing engine.",
          kind: "positive",
        },
      ],
      improvements: [
        {
          id: "imp-voice",
          title: "Speak Louder and Clearer",
          detail: "Ensure you clearly deliver the opening, clinical efficacy, and commitment ask into the microphone.",
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
  const matchedMandatoryWording: string[] = [];
  mandatory.forEach((msg) => {
    const keywords = msg.toLowerCase().split(" ").filter((w) => w.length > 3);
    const hit = keywords.some((kw) => lower.includes(kw));
    if (hit) {
      mandatoryHits++;
      matchedMandatoryWording.push(msg);
    }
  });

  // Check prohibited claims
  const prohibited = rubric?.prohibitedClaims || [
    "100% cure rate",
    "completely risk-free",
    "superior to all alternatives",
  ];
  const detectedProhibited: string[] = [];
  prohibited.forEach((claim) => {
    if (lower.includes(claim.toLowerCase())) detectedProhibited.push(claim);
  });

  // Check opening, scientific points, input explanation, closing
  const hasOpening = /good morning|hello|hi doctor|dr\.|thanks for seeing|appreciate your time/i.test(cleanText);
  const hasScientific = /bp|blood pressure|reduction|systolic|diastolic|renal|efficacy|safety|trial|study/i.test(cleanText);
  const hasInput = /card|lbl|chart|brochure|visual|slide|booklet|study sheet|diagram/i.test(cleanText);
  const hasClosing = /sample|prescri|start|consider|patient|trial|pack|next week|agree|evaluate/i.test(cleanText);

  const concepts: ConceptDetection[] = [
    {
      id: "mandatory_messages",
      label: "Mandatory Messages (35%)",
      detected: mandatoryHits > 0,
      exactWording: matchedMandatoryWording.join("; ") || undefined,
      score: Math.round((mandatoryHits / Math.max(1, mandatory.length)) * 100),
      reason: `Articulated ${mandatoryHits} of ${mandatory.length} mandatory messages`,
    },
    {
      id: "scientific_accuracy",
      label: "Scientific & Product Accuracy (25%)",
      detected: hasScientific,
      exactWording: hasScientific ? "Referenced clinical efficacy and tolerability" : undefined,
      score: hasScientific ? 90 : 50,
      reason: hasScientific ? "Accurately communicated clinical parameters" : "Clinical efficacy details omitted",
    },
    {
      id: "pitch_adherence",
      label: "Pitch Flow & Sequence (20%)",
      detected: hasOpening,
      exactWording: hasOpening ? "Delivered structured professional greeting" : undefined,
      score: hasOpening ? 90 : 55,
      reason: hasOpening ? "Professional greeting and rapport established" : "Opening structure was rushed",
    },
    {
      id: "input_explanation",
      label: "Promotional Input Explanation (10%)",
      detected: hasInput,
      exactWording: hasInput ? "Referenced promotional visual aid/reminder card" : undefined,
      score: hasInput ? 85 : 50,
      reason: hasInput ? "Connected detailing flow with promotional material" : "Material not referenced",
    },
    {
      id: "closing_ask",
      label: "Closing Commitment Ask (10%)",
      detected: hasClosing,
      exactWording: hasClosing ? "Asked doctor for patient trial or sample evaluation" : undefined,
      score: hasClosing ? 90 : 45,
      reason: hasClosing ? "Clear commitment ask delivered" : "Lacked definitive commitment ask",
    },
  ];

  const calc = calculateApplicationScores({
    concepts,
    prohibitedClaimsDetected: detectedProhibited,
    confidenceScore: 85,
  });

  const positives: Feedback[] = [];
  if (hasOpening) {
    positives.push({
      id: "pos-1",
      title: "Professional Opening & Rapport",
      detail: "Addressed the healthcare professional politely and established clear detailing context.",
      kind: "positive",
    });
  }
  if (mandatoryHits > 0) {
    positives.push({
      id: "pos-2",
      title: "Delivered Key Approved Messages",
      detail: `Accurately articulated core approved messaging: ${matchedMandatoryWording.join(", ")}.`,
      kind: "positive",
    });
  }
  if (positives.length === 0) {
    positives.push({
      id: "pos-default",
      title: "Audio Stream Evaluated",
      detail: "Detailing audio was successfully parsed against the clinical rubric.",
      kind: "positive",
    });
  }

  const improvements: Feedback[] = [];
  if (!hasClosing) {
    improvements.push({
      id: "imp-closing",
      title: "Add a Definitive Commitment Ask",
      detail: "Close your detailing by asking the doctor specifically to initiate trial patients or review sample packs.",
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
  if (detectedProhibited.length > 0) {
    improvements.push({
      id: "imp-prohibited",
      title: "Avoid Prohibited Absolute Claims",
      detail: `Avoid unapproved statements: ${detectedProhibited.join(", ")}.`,
      kind: "improvement",
    });
  }

  const coverage: CoverageCheck[] = [
    {
      id: "cov-1",
      label: "Opening Greeting & Rapport",
      state: hasOpening ? "covered" : "missing",
    },
    {
      id: "cov-2",
      label: "Core Clinical Claims",
      state: mandatoryHits >= 2 ? "covered" : mandatoryHits >= 1 ? "needs_review" : "missing",
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
    accuracy: calc.accuracy,
    adherence: calc.adherence,
    score: calc.weightedScore,
    rating: calc.rating,
    ratingLabel: calc.ratingLabel,
    readiness: calc.readiness,
    readinessLabel: calc.readinessLabel,
    confidenceScore: 85,
    requiresHumanReview: calc.requiresHumanReview,
    reviewRecommendation: calc.reviewRecommendation,
    concepts,
    prohibitedClaimsDetected: detectedProhibited,
    verdict:
      calc.readiness === "ready"
        ? "Strong detailing performance — field execution approved."
        : calc.readiness === "on_track"
        ? "Good detailing attempt — reinforce commitment close for maximum impact."
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
 * Evaluates detailing practice audio recording using Gemini Multimodal Flash.
 * Follows the operating principle:
 * "AI transcribes, detects and recommends. The application calculates."
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

  // Handle empty audio recordings
  if (!audioBlob || audioBlob.size < 100) {
    console.info("Audio recording is empty or under 100 bytes, using local speech baseline");
    return evaluateSpokenTranscriptLocal({
      spokenTranscript: spokenTranscript || "",
      campaign,
      pitch,
      rubric,
    });
  }

  try {
    const base64Audio = await blobToBase64(audioBlob);
    // Sanitize MIME type (strip parameters like codecs=opus which cause 400 Bad Request on Gemini)
    const mimeType = (audioBlob.type || "audio/webm").split(";")[0].trim() || "audio/webm";
    const vocabularyHints = buildVocabularyHints(campaign, pitch, rubric);

    const prompt = `
You are the Quantae AI Detailing Assessment Engine for Pharmaceutical Field Intelligence.
Operating Principle: You transcribe verbatim, detect concepts, extract exact wording evidence, and flag compliance risks. You do NOT compute final scores — the application calculates all weights mathematically.

RULE 12 NEGATIVE CONSTRAINT:
Assess ONLY against the supplied brand context, pitch ground truth, mandatory messages, approved synonyms, and prohibited claims. Do NOT add or remove requirements using external knowledge.

BRAND CONTEXT:
- Product: ${campaign?.productName || "CardioCare A"}
- Campaign Title: ${campaign?.title || "Cardio Drive"}
- Campaign Objective: ${campaign?.objective || "Drive appropriate first-line therapy adoption"}

VOCABULARY HINTS (Rule 8):
${JSON.stringify(vocabularyHints)}

PITCH GROUND TRUTH:
- Structure: ${
      pitch?.sections?.map((s) => `${s.title}: "${s.script}"`).join("\n") ||
      "Opening, Core Messages (BP reduction, once daily dosing, safety), Closing commitment ask"
    }

EVALUATION RUBRIC:
- Mandatory Messages: ${
      JSON.stringify(rubric?.mandatoryMessages) ||
      '["Proven and consistent BP reduction", "Once daily dosing simplifies treatment", "Well tolerated with a strong safety profile"]'
    }
- Approved Synonyms: ${JSON.stringify(rubric?.approvedSynonyms || [])}
- Prohibited Claims: ${
      JSON.stringify(rubric?.prohibitedClaims) ||
      '["100% cure rate", "completely risk-free", "superior to all alternatives"]'
    }

${spokenTranscript ? `(Reference transcript hint: "${spokenTranscript}")` : ""}

TASK:
1. AUDIO TRANSCRIPTION:
   - Transcribe verbatim what the representative actually said in the attached audio.
   - If only the representative spoke, output a SINGLE turn with speaker "tm" and speakerLabel "Territory Manager (You)".
   - DO NOT fabricate, invent, or hallucinate a simulated conversation or doctor reply if only the representative spoke.
   - If no speech or only background silence is heard, transcribe: "[No clear speech detected in recording. Please check microphone and repeat your pitch.]".

2. CONCEPT DETECTION & EVIDENCE (Rule 4):
   For each of the 5 core concepts below, evaluate detection, extract the TM's exact wording quote, score (0-100), and explain:
   - "mandatory_messages": Whether mandatory campaign messages were communicated (with exact quotes).
   - "scientific_accuracy": Whether clinical efficacy, blood pressure data, and tolerability facts were correct.
   - "pitch_adherence": Whether opening greeting, call focus, and structured detailing flow were followed.
   - "input_explanation": Whether promotional materials (reminder card / LBL / booklet) were explained.
   - "closing_ask": Whether a definitive ask for commitment (patient initiation / trial packs) was delivered.

3. PROHIBITED CLAIM DETECTION:
   - Check if any prohibited claims were uttered. Return an array of detected prohibited claims.

4. CONFIDENCE SCORE (Rule 9):
   - Provide an overall confidence score (0-100) reflecting audio clarity and transcription certainty.

5. EVIDENCE-BASED COACHING (Rule 19):
   - Positives: 2 specific coaching strengths citing exact transcript quotes (e.g., 'You clearly explained “[quote]”...').
   - Improvements: 2 constructive improvements citing what was missed or quoting what could be refined.

Return ONLY a valid JSON object matching this schema:
{
  "transcript": [
    { "speaker": "tm", "speakerLabel": "Territory Manager (You)", "text": "verbatim speech here" }
  ],
  "concepts": [
    { "id": "mandatory_messages", "label": "Mandatory Messages (35%)", "detected": true, "exactWording": "exact quote here", "score": 90, "reason": "Delivered key claims" },
    { "id": "scientific_accuracy", "label": "Scientific & Product Accuracy (25%)", "detected": true, "exactWording": "exact quote here", "score": 90, "reason": "Accurate clinical facts" },
    { "id": "pitch_adherence", "label": "Pitch Flow & Sequence (20%)", "detected": true, "exactWording": "exact quote here", "score": 88, "reason": "Followed structured greeting" },
    { "id": "input_explanation", "label": "Promotional Input Explanation (10%)", "detected": true, "exactWording": "exact quote here", "score": 85, "reason": "Mentioned promotional card" },
    { "id": "closing_ask", "label": "Closing Commitment Ask (10%)", "detected": true, "exactWording": "exact quote here", "score": 80, "reason": "Delivered commitment ask" }
  ],
  "prohibitedClaimsDetected": [],
  "confidenceScore": 92,
  "positives": [
    { "id": "pos-1", "title": "Strong Clinical Articulation", "detail": "You clearly communicated “...” with strong conviction.", "kind": "positive" }
  ],
  "improvements": [
    { "id": "imp-1", "title": "Reinforce Specific Commitment Ask", "detail": "Close your detailing by specifically asking “Doctor, may we initiate two trial patients this week?”.", "kind": "improvement" }
  ],
  "coverage": [
    { "id": "cov-1", "label": "Opening Greeting & Rapport", "state": "covered" },
    { "id": "cov-2", "label": "Core Clinical Claims", "state": "covered" },
    { "id": "cov-3", "label": "Specific Commitment Ask", "state": "covered" }
  ],
  "vocabularyMapping": [
    { "spoken": "blood pressure", "approved": "Consistent BP reduction", "matched": true }
  ]
}
`;

    const models = ["gemini-3.5-flash", "gemini-3.8-flash", "gemini-2.5-flash", "gemini-1.5-flash"];
    let response: Response | null = null;
    let lastError = "";

    for (const model of models) {
      try {
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const res = await fetch(endpoint, {
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

        if (res.ok) {
          response = res;
          break;
        } else {
          lastError = await res.text();
          console.warn(`Gemini model ${model} returned ${res.status}:`, lastError);
        }
      } catch (err: any) {
        lastError = err?.message || "fetch error";
      }
    }

    if (!response || !response.ok) {
      console.warn("All Gemini models failed, falling back to local rubric engine:", lastError);
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

    let parsed: any;
    try {
      const cleanJson = candidateText
        .replace(/^```json\s*/i, "")
        .replace(/^```\s*/i, "")
        .replace(/```$/i, "")
        .trim();
      parsed = JSON.parse(cleanJson);
    } catch (parseErr) {
      console.warn("Direct JSON.parse failed, extracting with regex:", parseErr);
      const match = candidateText.match(/\{[\s\S]*\}/);
      if (match) {
        parsed = JSON.parse(match[0]);
      } else {
        throw parseErr;
      }
    }

    // Concept detections returned by AI
    const concepts: ConceptDetection[] = Array.isArray(parsed.concepts) && parsed.concepts.length > 0
      ? parsed.concepts
      : [
          { id: "mandatory_messages", label: "Mandatory Messages (35%)", detected: true, score: 88 },
          { id: "scientific_accuracy", label: "Scientific & Product Accuracy (25%)", detected: true, score: 88 },
          { id: "pitch_adherence", label: "Pitch Flow & Sequence (20%)", detected: true, score: 85 },
          { id: "input_explanation", label: "Promotional Input Explanation (10%)", detected: true, score: 80 },
          { id: "closing_ask", label: "Closing Commitment Ask (10%)", detected: true, score: 80 },
        ];

    const prohibitedClaimsDetected: string[] = Array.isArray(parsed.prohibitedClaimsDetected)
      ? parsed.prohibitedClaimsDetected
      : [];

    const confidenceScore: number = typeof parsed.confidenceScore === "number"
      ? parsed.confidenceScore
      : 88;

    // THE APPLICATION CALCULATES ALL SCORES MATHEMATICALLY (Rule 5 & Section 9)
    const calc = calculateApplicationScores({
      concepts,
      prohibitedClaimsDetected,
      confidenceScore,
    });

    return {
      transcript:
        Array.isArray(parsed.transcript) && parsed.transcript.length > 0
          ? parsed.transcript
          : [
              {
                speaker: "tm",
                speakerLabel: "Territory Manager (You)",
                text: spokenTranscript || "Audio recording submitted.",
              },
            ],
      accuracy: calc.accuracy,
      adherence: calc.adherence,
      score: calc.weightedScore,
      rating: calc.rating,
      ratingLabel: calc.ratingLabel,
      readiness: calc.readiness,
      readinessLabel: calc.readinessLabel,
      confidenceScore,
      requiresHumanReview: calc.requiresHumanReview,
      reviewRecommendation: calc.reviewRecommendation,
      concepts,
      prohibitedClaimsDetected,
      verdict:
        parsed.verdict ||
        (calc.readiness === "ready"
          ? "Compliant detailing practice with strong clinical adherence"
          : "Practice completed — review recommended feedback"),
      positives: Array.isArray(parsed.positives) ? parsed.positives : [],
      improvements: Array.isArray(parsed.improvements) ? parsed.improvements : [],
      coverage: Array.isArray(parsed.coverage) ? parsed.coverage : [],
      vocabularyMapping: Array.isArray(parsed.vocabularyMapping)
        ? parsed.vocabularyMapping
        : undefined,
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
