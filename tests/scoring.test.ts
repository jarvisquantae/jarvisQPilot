import { test, describe } from "node:test";
import assert from "node:assert";
import { calculateApplicationScores, evaluateSpokenTranscriptLocal } from "../src/services/ai.ts";

describe("Scoring Engine Specification & Synthetic Scenarios", () => {
  test("Weight specification adds up to 1.00", () => {
    const weights = {
      mandatoryMessages: 0.35,
      scientificAccuracy: 0.25,
      pitchAdherence: 0.20,
      inputExplanation: 0.10,
      closingAction: 0.10,
    };
    const sum = Object.values(weights).reduce((a, b) => a + b, 0);
    assert.strictEqual(Number(sum.toFixed(2)), 1.0);
  });

  // Scenario 1: Strong, fully compliant performance (>=90%)
  test("Scenario 1: Strong, fully compliant performance achieves Strong status", () => {
    const result = calculateApplicationScores({
      concepts: [
        { id: "mandatory_messages", label: "Mandatory Messages", detected: true, score: 95 },
        { id: "scientific_accuracy", label: "Scientific Accuracy", detected: true, score: 95 },
        { id: "pitch_adherence", label: "Pitch Adherence", detected: true, score: 90 },
        { id: "input_explanation", label: "Input Explanation", detected: true, score: 90 },
        { id: "closing_ask", label: "Closing Ask", detected: true, score: 90 },
      ],
      confidenceScore: 92,
      prohibitedClaimsDetected: [],
    });

    assert.ok(result.weightedScore >= 90, `Expected score >= 90, got ${result.weightedScore}`);
    assert.strictEqual(result.readiness, "ready");
    assert.strictEqual(result.readinessLabel, "Strong");
    assert.strictEqual(result.requiresHumanReview, false);
  });

  // Scenario 2: Partially complete performance (<80%)
  test("Scenario 2: Partially complete performance (<80%) produces needs_focus status", () => {
    const result = calculateApplicationScores({
      concepts: [
        { id: "mandatory_messages", label: "Mandatory Messages", detected: true, score: 75 },
        { id: "scientific_accuracy", label: "Scientific Accuracy", detected: true, score: 75 },
        { id: "pitch_adherence", label: "Pitch Adherence", detected: true, score: 70 },
        { id: "input_explanation", label: "Input Explanation", detected: true, score: 70 },
        { id: "closing_ask", label: "Closing Ask", detected: true, score: 65 },
      ],
      confidenceScore: 88,
      prohibitedClaimsDetected: [],
    });

    assert.ok(result.weightedScore >= 70 && result.weightedScore < 80);
    assert.strictEqual(result.readiness, "needs_focus");
    assert.strictEqual(result.readinessLabel, "Needs Focus");
    assert.strictEqual(result.requiresHumanReview, false);
  });

  // Scenario 3: Weak performance
  test("Scenario 3: Weak performance triggers needs_focus and manager review", () => {
    const result = calculateApplicationScores({
      concepts: [
        { id: "mandatory_messages", label: "Mandatory Messages", detected: true, score: 40 },
        { id: "scientific_accuracy", label: "Scientific Accuracy", detected: true, score: 50 },
        { id: "pitch_adherence", label: "Pitch Adherence", detected: true, score: 50 },
        { id: "input_explanation", label: "Input Explanation", detected: true, score: 40 },
        { id: "closing_ask", label: "Closing Ask", detected: true, score: 30 },
      ],
      confidenceScore: 80,
      prohibitedClaimsDetected: [],
    });

    assert.ok(result.weightedScore < 60);
    assert.strictEqual(result.readiness, "needs_focus");
    assert.strictEqual(result.readinessLabel, "Needs Focus");
  });

  // Scenario 4: Missing mandatory message
  test("Scenario 4: Missing mandatory messages blocks Ready readiness regardless of other points", () => {
    const result = calculateApplicationScores({
      concepts: [
        { id: "mandatory_messages", label: "Mandatory Messages", detected: false, score: 30 },
        { id: "scientific_accuracy", label: "Scientific Accuracy", detected: true, score: 95 },
        { id: "pitch_adherence", label: "Pitch Adherence", detected: true, score: 95 },
        { id: "input_explanation", label: "Input Explanation", detected: true, score: 95 },
        { id: "closing_ask", label: "Closing Ask", detected: true, score: 95 },
      ],
      confidenceScore: 90,
      prohibitedClaimsDetected: [],
    });

    // Despite high other scores, accuracy is low and prevents readiness === 'ready'
    assert.notStrictEqual(result.readiness, "ready");
  });

  // Scenario 5: Prohibited claim detected
  test("Scenario 5: Prohibited claim penalizes score and forces mandatory human review", () => {
    const result = calculateApplicationScores({
      concepts: [
        { id: "mandatory_messages", label: "Mandatory Messages", detected: true, score: 90 },
        { id: "scientific_accuracy", label: "Scientific Accuracy", detected: true, score: 90 },
        { id: "pitch_adherence", label: "Pitch Adherence", detected: true, score: 90 },
        { id: "input_explanation", label: "Input Explanation", detected: true, score: 90 },
        { id: "closing_ask", label: "Closing Ask", detected: true, score: 90 },
      ],
      confidenceScore: 90,
      prohibitedClaimsDetected: ["100% cure rate"],
    });

    assert.strictEqual(result.requiresHumanReview, true);
    assert.strictEqual(result.readiness, "needs_focus");
    assert.ok(result.reviewRecommendation.includes("Critical Prohibited Claim"));
  });

  // Scenario 6: Correct paraphrase recognition
  test("Scenario 6: Paraphrased medical terminology matches clinical concepts", () => {
    const transcript = "Good morning Dr. Sharma. I am detailing CardioCare today for high blood pressure reduction. Once daily dosing provides 24 hour BP control with excellent tolerability. Here is the reminder card with clinical trial results. May we start two hypertensive patients this week?";
    const evalResult = evaluateSpokenTranscriptLocal({ spokenTranscript: transcript });

    assert.ok(evalResult.score >= 80, `Expected score >= 80, got ${evalResult.score}`);
    assert.strictEqual(evalResult.readiness, "on_track");
    assert.strictEqual(evalResult.readinessLabel, "Good");
    assert.strictEqual(evalResult.prohibitedClaimsDetected.length, 0);
  });

  // Scenario 7: Low transcription confidence (<70%) triggers manager review
  test("Scenario 7: Low transcription confidence (<70%) flags attempt for human review", () => {
    const result = calculateApplicationScores({
      concepts: [
        { id: "mandatory_messages", label: "Mandatory Messages", detected: true, score: 80 },
        { id: "scientific_accuracy", label: "Scientific Accuracy", detected: true, score: 80 },
        { id: "pitch_adherence", label: "Pitch Adherence", detected: true, score: 80 },
        { id: "input_explanation", label: "Input Explanation", detected: true, score: 80 },
        { id: "closing_ask", label: "Closing Ask", detected: true, score: 80 },
      ],
      confidenceScore: 65, // <70%
      prohibitedClaimsDetected: [],
    });

    assert.strictEqual(result.requiresHumanReview, true);
    assert.ok(result.reviewRecommendation.includes("Low AI Confidence"));
  });

  // Scenario 8: Empty or invalid transcript
  test("Scenario 8: Empty or negligible transcript produces failure and requires repeat practice", () => {
    const evalResult = evaluateSpokenTranscriptLocal({ spokenTranscript: "" });
    assert.strictEqual(evalResult.requiresHumanReview, true);
    assert.strictEqual(evalResult.readiness, "needs_focus");
    assert.ok(evalResult.verdict.includes("Insufficient speech"));
  });

  // Scenario 9: Missing rubric falls back to standard cardiovascular baseline
  test("Scenario 9: Missing rubric falls back gracefully to default mandatory messages", () => {
    const transcript = "Good morning doctor. Proven and consistent BP reduction is observed with once daily dosing and strong safety profile. Here is our LBL card. Let us initiate trial patients.";
    const evalResult = evaluateSpokenTranscriptLocal({
      spokenTranscript: transcript,
      rubric: undefined,
    });
    assert.ok(evalResult.score >= 80);
    assert.strictEqual(evalResult.readiness, "on_track");
  });

  // Scenario 10: Score exactly on readiness boundary (70, 80, 90)
  test("Scenario 10: Scores exactly on readiness boundaries map correctly", () => {
    // 70 boundary -> Needs Focus (<80)
    const res70 = calculateApplicationScores({
      concepts: [
        { id: "mandatory_messages", label: "Mandatory Messages", detected: true, score: 70 },
        { id: "scientific_accuracy", label: "Scientific Accuracy", detected: true, score: 70 },
        { id: "pitch_adherence", label: "Pitch Adherence", detected: true, score: 70 },
        { id: "input_explanation", label: "Input Explanation", detected: true, score: 70 },
        { id: "closing_ask", label: "Closing Ask", detected: true, score: 70 },
      ],
      confidenceScore: 85,
    });
    assert.strictEqual(res70.weightedScore, 70);
    assert.strictEqual(res70.readiness, "needs_focus");
    assert.strictEqual(res70.readinessLabel, "Needs Focus");

    // 80 boundary -> Good (on_track)
    const res80 = calculateApplicationScores({
      concepts: [
        { id: "mandatory_messages", label: "Mandatory Messages", detected: true, score: 80 },
        { id: "scientific_accuracy", label: "Scientific Accuracy", detected: true, score: 80 },
        { id: "pitch_adherence", label: "Pitch Adherence", detected: true, score: 80 },
        { id: "input_explanation", label: "Input Explanation", detected: true, score: 80 },
        { id: "closing_ask", label: "Closing Ask", detected: true, score: 80 },
      ],
      confidenceScore: 85,
    });
    assert.strictEqual(res80.weightedScore, 80);
    assert.strictEqual(res80.readiness, "on_track");
    assert.strictEqual(res80.readinessLabel, "Good");

    // 90 boundary -> Strong (ready)
    const res90 = calculateApplicationScores({
      concepts: [
        { id: "mandatory_messages", label: "Mandatory Messages", detected: true, score: 90 },
        { id: "scientific_accuracy", label: "Scientific Accuracy", detected: true, score: 90 },
        { id: "pitch_adherence", label: "Pitch Adherence", detected: true, score: 90 },
        { id: "input_explanation", label: "Input Explanation", detected: true, score: 90 },
        { id: "closing_ask", label: "Closing Ask", detected: true, score: 90 },
      ],
      confidenceScore: 85,
    });
    assert.strictEqual(res90.weightedScore, 90);
    assert.strictEqual(res90.readiness, "ready");
    assert.strictEqual(res90.readinessLabel, "Strong");
  });
});
