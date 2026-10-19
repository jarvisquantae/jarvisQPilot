// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
if (!process.env['NITRO_PRESET']) {
  process.env['NITRO_PRESET'] = "netlify";
}

import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import type { Plugin } from "vite";
import { executeGeminiEvaluation } from "./src/server/gemini-proxy";

function geminiDevProxyPlugin(): Plugin {
  return {
    name: "gemini-dev-proxy",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.method === "POST" && req.url === "/api/gemini/evaluate") {
          let body = "";
          req.on("data", (chunk) => {
            body += chunk;
          });
          req.on("end", async () => {
            try {
              const payload = JSON.parse(body);
              const outcome = await executeGeminiEvaluation(payload);
              res.statusCode = outcome.status;
              res.setHeader("Content-Type", "application/json");
              res.end(
                JSON.stringify(
                  outcome.data || { error: outcome.error, diagnostics: outcome.diagnostics }
                )
              );
            } catch (err: any) {
              res.statusCode = 500;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ error: err?.message || "Server proxy error" }));
            }
          });
        } else {
          next();
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [geminiDevProxyPlugin()],
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});
