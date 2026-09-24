import { createFileRoute } from "@tanstack/react-router";
import { BookmarkPlus, Send, Sparkles, TriangleAlert, User } from "lucide-react";
import { MarketingShell } from "@/components/layout/MarketingShell";
import { ConsolePageTitle } from "@/components/layout/ConsoleShell";
import {
  BarList,
  FilterBar,
  FilterSelect,
  Panel,
  Pill,
  inputClass,
} from "@/components/console/primitives";
import { Button } from "@/components/ui/button";
import {
  MM_COPILOT_SUGGESTED_PROMPTS,
  MM_COPILOT_THREAD,
  MM_FILTER_OPTIONS,
  MM_MISSED_CONCEPTS,
  MM_SAVED_VIEWS,
} from "@/data/marketing";

export const Route = createFileRoute("/marketing/copilot")({
  head: () => ({
    meta: [
      { title: "Marketing Copilot — Q-Pilot AI Insights" },
      {
        name: "description",
        content:
          "Explain filtered performance data, summarise missed concepts and surface possible support actions from approved content.",
      },
      { property: "og:title", content: "Marketing Copilot — Q-Pilot AI Insights" },
      {
        property: "og:description",
        content: "AI insights over calculated performance data — no automatic action assignment.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MarketingCopilot,
});

function MarketingCopilot() {
  return (
    <MarketingShell searchPlaceholder="Search insights...">
      <ConsolePageTitle
        title="AI Insights / Marketing Copilot"
        subtitle="Answers are grounded in system-calculated metrics and approved content. Copilot never assigns actions on its own."
        actions={
          <Button variant="outline">
            <BookmarkPlus className="size-4" /> Save view
          </Button>
        }
      />

      <FilterBar>
        <FilterSelect label="Quarter" options={MM_FILTER_OPTIONS.quarter} />
        <FilterSelect label="Campaign" options={MM_FILTER_OPTIONS.campaign} />
        <FilterSelect label="Product / Brand" options={MM_FILTER_OPTIONS.product} />
        <FilterSelect label="Specialty" options={MM_FILTER_OPTIONS.specialty} />
        <FilterSelect label="Sales Manager" options={MM_FILTER_OPTIONS.salesManager} />
      </FilterBar>

      <div className="mb-5 flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold text-muted-foreground">Saved views</span>
        {MM_SAVED_VIEWS.map((view, index) => (
          <button key={view.name} type="button" title={view.detail}>
            <Pill tone={index === 0 ? "teal" : "muted"}>{view.name}</Pill>
          </button>
        ))}
        <button type="button" className="text-xs font-bold text-primary">
          Reset filters
        </button>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.5fr_1fr]">
        <Panel
          title="Copilot"
          actions={<Pill tone="ai">
            <Sparkles className="size-3" /> Grounded in current filters
          </Pill>}
        >
          <div className="space-y-4">
            {MM_COPILOT_THREAD.map((message) =>
              message.role === "user" ? (
                <div key={message.body} className="flex items-start justify-end gap-3">
                  <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-navy px-4 py-3 text-sm font-medium text-navy-foreground">
                    {message.body}
                  </div>
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-muted text-navy">
                    <User className="size-4" />
                  </span>
                </div>
              ) : (
                <div key={message.body} className="flex items-start gap-3">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-ai/12 text-ai">
                    <Sparkles className="size-4" />
                  </span>
                  <div className="min-w-0 flex-1 rounded-2xl rounded-tl-sm border border-border bg-muted/40 px-4 py-3">
                    <p className="text-sm text-navy">{message.body}</p>
                    {"evidence" in message && message.evidence && (
                      <div className="mt-3">
                        <p className="text-xs font-bold text-muted-foreground">Evidence</p>
                        <ul className="mt-1.5 space-y-1.5">
                          {message.evidence.map((item) => (
                            <li key={item} className="text-xs text-muted-foreground">
                              • {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {"actions" in message && message.actions && (
                      <div className="mt-3 rounded-xl border border-border bg-card p-3">
                        <p className="text-xs font-bold text-navy">Possible support actions</p>
                        <ul className="mt-1.5 space-y-1.5">
                          {message.actions.map((item) => (
                            <li key={item} className="text-xs text-muted-foreground">
                              • {item}
                            </li>
                          ))}
                        </ul>
                        <p className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-semibold text-warning">
                          <TriangleAlert className="size-3" /> Suggestions only — assign manually in
                          Performance Actions.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ),
            )}
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {MM_COPILOT_SUGGESTED_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                type="button"
                className="rounded-xl border border-border bg-card px-3 py-2 text-xs font-semibold text-navy hover:bg-muted"
              >
                {prompt}
              </button>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-2">
            <input
              className={inputClass}
              placeholder="Ask about the filtered performance data..."
              aria-label="Ask Copilot"
            />
            <Button aria-label="Send">
              <Send className="size-4" />
            </Button>
          </div>
        </Panel>

        <div className="space-y-5">
          <Panel title="Most commonly missed concepts">
            <BarList
              items={MM_MISSED_CONCEPTS.map((row) => ({ ...row, tone: "warning" as const }))}
              suffix="% of attempts"
            />
          </Panel>

          <Panel title="How Copilot works">
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>Reads only system-calculated metrics for the current filter set.</li>
              <li>Quotes approved pitch, rubric and vocabulary content as evidence.</li>
              <li>Suggests support actions but never assigns them automatically.</li>
              <li>Every answer can be saved with the view that produced it.</li>
            </ul>
          </Panel>
        </div>
      </div>
    </MarketingShell>
  );
}
