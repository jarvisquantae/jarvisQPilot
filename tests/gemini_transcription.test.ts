import { test, describe } from "node:test";
import assert from "node:assert";
import { executeGeminiEvaluation } from "../src/server/gemini-proxy.ts";
import { evaluateSpokenTranscriptLocal } from "../src/services/ai.ts";

describe("Gemini Transcription & Error Handling Tests", () => {
  // 1. Successful transcript test
  test("Successful transcript: extracts verbatim text and computes application scores", () => {
    const spokenText =
      "Good morning Doctor, I am here to discuss CardioCare A. It delivers proven 24-hour ambulatory blood pressure reduction with once daily dosing and excellent tolerability.";

    const result = evaluateSpokenTranscriptLocal({
      spokenTranscript: spokenText,
      campaign: {
        id: "c1",
        title: "Cardio Drive",
        productName: "CardioCare A",
        slug: "cardiocare-a",
        code: "CC-A",
        quarter: "Q2",
        status: "in_progress",
        progress: 60,
        readiness: "ready",
        readinessScore: 85,
        assigned: true,
      },
      isAiGenerated: true,
    });

    assert.strictEqual(result.isAiGenerated, true);
    assert.ok(result.transcript.length > 0, "Transcript should contain at least 1 turn");
    assert.strictEqual(result.transcript[0].speaker, "tm");
    assert.strictEqual(result.transcript[0].speakerLabel, "Territory Manager (You)");
    assert.ok(result.transcript[0].text.includes("CardioCare A"));
    assert.ok(result.score > 70, "Score should reflect compliant message delivery");
    assert.strictEqual(result.requiresHumanReview, false, "Compliant pitch should not require human review");
  });

  // 2. Model 404 handling test
  test("Model 404 handling: records HTTP 404 in attempt history and falls back cleanly without hiding errors", async () => {
    // Intercept global fetch for this unit test to simulate a 404 on the first model and success on fallback
    const originalFetch = globalThis.fetch;
    const modelAttempts: Array<{ url: string; model: string }> = [];

    globalThis.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
      const urlStr = String(input);
      if (urlStr.includes("gemini-3.5-transcribe")) {
        modelAttempts.push({ url: urlStr, model: "gemini-3.5-transcribe" });
        return new Response(
          JSON.stringify({
            error: {
              code: 404,
              message: "models/gemini-3.5-transcribe is not found for API version v1beta",
              status: "NOT_FOUND",
            },
          }),
          { status: 404, headers: { "Content-Type": "application/json" } }
        );
      }

      if (urlStr.includes("gemini-3.8-flash")) {
        modelAttempts.push({ url: urlStr, model: "gemini-3.8-flash" });
        return new Response(
          JSON.stringify({
            candidates: [
              {
                content: {
                  parts: [{ text: "Good morning Doctor, presenting CardioCare A." }],
                },
                finishReason: "STOP",
              },
            ],
          }),
          { status: 200, headers: { "Content-Type": "application/json" } }
        );
      }

      return new Response("Not Found", { status: 404 });
    };

    try {
      const outcome = await executeGeminiEvaluation(
        {
          task: "transcribe",
          base64Audio: "UklGRi4AAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=",
          prompt: "Transcribe audio",
        },
        "test-server-key-12345678901234567890"
      );

      assert.strictEqual(outcome.status, 200);
      assert.strictEqual(outcome.diagnostics.modelUsed, "gemini-3.8-flash");
      assert.strictEqual(outcome.diagnostics.attempts.length, 2);

      // Verify model 404 attempt was logged and NOT hidden
      const firstAttempt = outcome.diagnostics.attempts[0];
      assert.strictEqual(firstAttempt.model, "gemini-3.5-transcribe");
      assert.strictEqual(firstAttempt.status, 404);
      assert.ok(firstAttempt.error?.includes("NOT_FOUND"));

      // Verify second attempt succeeded
      const secondAttempt = outcome.diagnostics.attempts[1];
      assert.strictEqual(secondAttempt.model, "gemini-3.8-flash");
      assert.strictEqual(secondAttempt.status, 200);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  // 3. Authentication error test
  test("Authentication error: reports HTTP 400/403 with actionable details and does not fake a transcript", async () => {
    const originalFetch = globalThis.fetch;

    globalThis.fetch = async (): Promise<Response> => {
      return new Response(
        JSON.stringify({
          error: {
            code: 400,
            message: "API key not valid. Please pass a valid API key.",
            status: "INVALID_ARGUMENT",
          },
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    };

    try {
      const outcome = await executeGeminiEvaluation(
        {
          task: "evaluate",
          base64Audio: "UklGRi4AAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=",
        },
        "invalid-key-12345678901234567890"
      );

      assert.strictEqual(outcome.status, 400);
      assert.ok(outcome.error?.includes("API key not valid") || outcome.error?.includes("INVALID_ARGUMENT"));
      assert.strictEqual(outcome.data, undefined, "No data should be generated on authentication failure");

      // Verify UI evaluator displays actionable error without inventing a fake transcript
      const uiResult = evaluateSpokenTranscriptLocal({
        spokenTranscript: "",
        errorMessage: outcome.error,
        isAiGenerated: false,
      });

      assert.strictEqual(uiResult.isAiGenerated, false);
      assert.ok(uiResult.transcript[0].text.startsWith("[Evaluation Error:"));
      assert.ok(uiResult.transcript[0].text.includes("API key not valid"));
      assert.strictEqual(uiResult.requiresHumanReview, true);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  // 4. Response with no usable transcript test
  test("No usable transcript: flags insufficient speech and keeps assessment disabled", async () => {
    const originalFetch = globalThis.fetch;

    globalThis.fetch = async (): Promise<Response> => {
      return new Response(
        JSON.stringify({
          candidates: [
            {
              finishReason: "STOP",
              // Content with empty parts
              content: { parts: [{ text: "" }] },
            },
          ],
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    };

    try {
      const outcome = await executeGeminiEvaluation(
        {
          task: "evaluate",
          base64Audio: "UklGRi4AAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=",
        },
        "test-server-key-12345678901234567890"
      );

      // When candidates have no text across all models, proxy exhausts models and reports no text
      assert.ok(outcome.status >= 400);
      assert.ok(outcome.error?.includes("no transcript text") || outcome.error?.includes("failed"));

      // Verify fallback clearly indicates insufficient speech
      const localResult = evaluateSpokenTranscriptLocal({
        spokenTranscript: "",
      });

      assert.strictEqual(localResult.isAiGenerated, false);
      assert.ok(localResult.transcript[0].text.includes("No clear speech detected"));
      assert.strictEqual(localResult.requiresHumanReview, true);
      assert.strictEqual(localResult.reviewRecommendation, "Insufficient speech detected — Repeat Practice");
    } finally {
      globalThis.fetch = originalFetch;
    }
  });
});
