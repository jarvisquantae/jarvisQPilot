/**
 * Server-side Gemini API proxy handler.
 * Runs in Node.js (Vite dev server middleware & Nitro production entry).
 * Provides server-to-server calls to Google AI Studio with x-goog-api-key,
 * full diagnostic telemetry, model fallbacks (gemini-3.8-flash, gemini-3.5-transcribe),
 * and CORS prevention.
 */

export interface GeminiProxyPayload {
  mimeType?: string;
  base64Audio?: string;
  prompt?: string;
  task?: "transcribe" | "evaluate";
}

export interface ModelAttemptRecord {
  model: string;
  status: number;
  error?: string;
  finishReason?: string;
}

export async function executeGeminiEvaluation(
  payload: GeminiProxyPayload,
  serverEnvKey?: string
): Promise<{
  status: number;
  data?: any;
  error?: string;
  diagnostics: {
    audioSizeBytes: number;
    mimeType: string;
    modelUsed?: string;
    attempts: ModelAttemptRecord[];
    httpStatus?: number;
    candidateCount?: number;
    finishReason?: string;
  };
}> {
  const audioSizeBytes = payload.base64Audio ? Math.round(payload.base64Audio.length * 0.75) : 0;
  const mimeType = payload.mimeType || "audio/webm";

  // Read strictly from server environment. Do NOT read from client payload.
  let apiKey =
    serverEnvKey ||
    process.env['GEMINI_API_KEY'] ||
    process.env['VITE_GEMINI_API_KEY'];

  // If running in Node environment where .env was not preloaded, read from .env directly
  if (!apiKey && typeof process !== "undefined" && typeof process.cwd === "function") {
    try {
      const fs = await import("node:fs");
      const path = await import("node:path");
      const envPath = path.resolve(process.cwd(), ".env");
      if (fs.existsSync(envPath)) {
        const content = fs.readFileSync(envPath, "utf-8");
        const match = content.match(/^(?:VITE_)?GEMINI_API_KEY\s*=\s*(.+)$/m);
        if (match) {
          apiKey = match[1].trim().replace(/^["']|["']$/g, "");
        }
      }
    } catch {}
  }

  console.log("\n================ [Q-Pilot Gemini Backend Pipeline] ================");
  console.log(`[Pipeline Stage 2] Payload received: ${audioSizeBytes} bytes (${mimeType}), Task: ${payload.task || "evaluate"}`);
  console.log(`[Pipeline Stage 3] Server Gemini Key configured: ${Boolean(apiKey)} (Length: ${apiKey?.length || 0})`);

  if (!apiKey) {
    const errMsg = "GEMINI_API_KEY not configured in server environment.";
    console.error(`[Pipeline Stage 3] Error: ${errMsg}`);
    return {
      status: 400,
      error: errMsg,
      diagnostics: {
        audioSizeBytes,
        mimeType,
        attempts: [],
        httpStatus: 400,
      },
    };
  }

  // Model selection per Google AI Studio current availability:
  // gemini-3.8-flash is the active multimodal model with audio understanding
  const models =
    payload.task === "transcribe"
      ? ["gemini-3.5-transcribe", "gemini-3.8-flash", "gemini-flash-latest"]
      : ["gemini-3.8-flash", "gemini-flash-latest"];

  const attempts: ModelAttemptRecord[] = [];
  let lastHttpStatus = 500;

  for (const model of models) {
    try {
      console.log(`[Pipeline Stage 3] Dispatching to Google endpoint for model: ${model}`);
      // Send key strictly via x-goog-api-key header; do not expose in URL
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

      const requestBody: any = {
        contents: [
          {
            parts: [
              ...(payload.base64Audio
                ? [
                    {
                      inlineData: {
                        mimeType,
                        data: payload.base64Audio,
                      },
                    },
                  ]
                : []),
              {
                text:
                  payload.prompt ||
                  (payload.task === "transcribe"
                    ? "Transcribe verbatim what the territory manager says in this detailing audio. Do not summarize or omit clinical terms."
                    : "Transcribe verbatim and evaluate detailing performance."),
              },
            ],
          },
        ],
        generationConfig:
          payload.task === "transcribe"
            ? {
                temperature: 0.1,
                thinkingConfig: { thinkingBudget: 0 },
              }
            : {
                responseMimeType: "application/json",
                temperature: 0.2,
                thinkingConfig: { thinkingBudget: 0 },
              },
      };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify(requestBody),
      });

      lastHttpStatus = response.status;
      console.log(`[Pipeline Stage 4] Gemini HTTP status for ${model}: ${response.status}`);

      if (response.ok) {
        const result = await response.json();
        const candidateCount = result.candidates?.length ?? 0;
        const finishReason = result.candidates?.[0]?.finishReason;
        const candidateParts = result.candidates?.[0]?.content?.parts || [];
        const hasText = candidateParts.some((p: any) => Boolean(p.text && p.text.trim().length > 0));

        console.log(`[Pipeline Stage 4] Model ${model}: candidateCount=${candidateCount}, finishReason=${finishReason}, hasText=${hasText}`);
        attempts.push({ model, status: response.status, finishReason });

        if (candidateCount > 0 && hasText) {
          console.log(`[Pipeline Stage 4] Model ${model} succeeded with generated text.`);
          console.log("==================================================================\n");

          return {
            status: 200,
            data: result,
            diagnostics: {
              audioSizeBytes,
              mimeType,
              modelUsed: model,
              attempts,
              httpStatus: response.status,
              candidateCount,
              finishReason,
            },
          };
        } else {
          const emptyMsg = `Model ${model} returned finishReason "${finishReason || "UNKNOWN"}" with no transcript text`;
          console.warn(`[Pipeline Stage 4] ${emptyMsg}`);
          attempts[attempts.length - 1].error = emptyMsg;
        }
      } else {
        const errorText = await response.text();
        console.error(`[Pipeline Stage 4] Google API rejected model ${model} (HTTP ${response.status}): ${errorText}`);
        attempts.push({ model, status: response.status, error: errorText });
      }
    } catch (fetchErr: any) {
      const fetchErrMsg = fetchErr?.message || "Network request failed";
      console.error(`[Pipeline Stage 3] Fetch exception for model ${model}:`, fetchErrMsg);
      attempts.push({ model, status: 500, error: fetchErrMsg });
    }
  }

  const failureSummary = attempts
    .map((a) => `[${a.model}: HTTP ${a.status}${a.error ? ` - ${a.error}` : ""}]`)
    .join(" | ");

  console.error(`[Pipeline Stage 4] All Gemini models exhausted. Attempt history:\n${failureSummary}`);
  console.log("==================================================================\n");

  return {
    status: lastHttpStatus >= 400 ? lastHttpStatus : 502,
    error: `All candidate models failed: ${failureSummary}`,
    diagnostics: {
      audioSizeBytes,
      mimeType,
      attempts,
      httpStatus: lastHttpStatus,
    },
  };
}
