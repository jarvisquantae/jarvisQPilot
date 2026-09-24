import { useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { CheckCircle2, Clock, Mic, Play, RotateCcw, Sparkles, Square } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { InputContextBar } from "@/components/tm/InputContextBar";
import { Button } from "@/components/ui/button";
import { practiceContext } from "@/data/tm";
import { formatClock } from "@/utils/format";
import { cn } from "@/lib/utils";
import type { RecordingState } from "@/types";

export const Route = createFileRoute("/practice/$campaignId/record")({
  head: () => ({
    meta: [
      { title: "Practice Your Detailing — Q-Pilot" },
      {
        name: "description",
        content:
          "Record your detailing for the approved input, cover the key points and submit it for AI assessment.",
      },
      { property: "og:title", content: "Practice Your Detailing — Q-Pilot" },
      {
        property: "og:description",
        content: "Record, review and submit your detailing practice attempt in Q-Pilot.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RecordPracticePage,
});

function RecordPracticePage() {
  const { campaignId } = Route.useParams();
  const navigate = useNavigate();

  const [state, setState] = useState<RecordingState>("idle");
  const [seconds, setSeconds] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (state !== "recording") return;
    timer.current = setInterval(() => setSeconds((value) => value + 1), 1000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [state]);

  const bars = useMemo(
    () => Array.from({ length: 64 }, (_, index) => 12 + ((index * 37) % 70)),
    [],
  );

  const hasTake = state === "stopped";

  const submit = () => {
    setSubmitting(true);
    setTimeout(() => {
      navigate({ to: "/practice/$campaignId/transcript", params: { campaignId } });
    }, 900);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <InputContextBar
          inputName={practiceContext.inputTitle}
          month={practiceContext.month}
          visit={practiceContext.visit}
        />
        <header>
          <p className="text-lg font-extrabold uppercase tracking-wide text-brand-red">
            {practiceContext.brand}
          </p>
          <h1 className="mt-1 text-3xl font-extrabold text-navy sm:text-4xl">
            {practiceContext.inputTitle}
          </h1>
          <p className="mt-1 text-base font-bold text-primary">Practice Your Detailing</p>
        </header>

        <div className="grid gap-5 lg:grid-cols-12">
          <section className="card-surface p-5 lg:col-span-5">
            <div className="overflow-hidden rounded-2xl border-2 border-brand-red/40">
              <div className="bg-card p-5 text-center">
                <p className="text-lg font-extrabold uppercase tracking-wide text-brand-red">
                  {practiceContext.brand}
                </p>
                <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  Consistent BP Control
                </p>
                <p className="mt-4 text-xl font-extrabold text-navy">
                  {practiceContext.cardTitleLine1}
                </p>
                <p className="text-xl font-extrabold text-brand-red">
                  {practiceContext.cardTitleLine2}
                </p>
              </div>
              <p className="bg-navy px-4 py-3 text-center text-sm font-bold text-navy-foreground">
                {practiceContext.cardFooter}
              </p>
            </div>
          </section>

          <section className="card-surface p-6 lg:col-span-7">
            <h2 className="text-lg font-extrabold text-navy">Your Key Points</h2>
            <ul className="mt-4 space-y-3">
              {practiceContext.keyPoints.map((point) => (
                <li key={point} className="flex items-center gap-3 text-sm font-semibold text-navy">
                  <CheckCircle2 className="size-5 shrink-0 text-primary" />
                  {point}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="card-surface p-6 sm:p-8">
          <div className="grid items-center gap-6 md:grid-cols-[1fr_auto_1fr]">
            <div className="flex items-center gap-3 md:justify-end">
              <Clock className="size-6 text-primary" />
              <p className="font-mono text-3xl font-extrabold tracking-tight text-navy">
                {formatClock(seconds)}
              </p>
            </div>

            <div className="relative mx-auto grid size-44 place-items-center">
              <span className="absolute inset-0 rounded-full bg-accent" />
              <span
                className={cn(
                  "absolute inset-3 rounded-full border-2 border-dashed border-primary/30",
                  state === "recording" && "animate-pulse-ring",
                )}
              />
              <button
                type="button"
                aria-label={state === "recording" ? "Stop practice" : "Start practice"}
                onClick={() => setState(state === "recording" ? "stopped" : "recording")}
                className="relative grid size-24 cursor-pointer place-items-center rounded-full bg-primary text-primary-foreground shadow-card transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/40"
              >
                {state === "recording" ? <Square className="size-8" /> : <Mic className="size-9" />}
              </button>
            </div>

            <div className="flex h-16 items-center gap-[2px] overflow-hidden" aria-hidden="true">
              {bars.map((height, index) => (
                <span
                  key={index}
                  className={cn(
                    "w-full rounded-full transition-all duration-300",
                    state === "recording" ? "bg-primary" : "bg-primary/30",
                  )}
                  style={{
                    height:
                      state === "recording"
                        ? `${Math.min(95, height + ((seconds * 11 + index * 7) % 35))}%`
                        : `${Math.max(8, Math.min(45, height / 2))}%`,
                  }}
                />
              ))}
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <Button
              size="lg"
              className="rounded-xl px-10 text-sm font-extrabold uppercase tracking-wide"
              onClick={() => setState(state === "recording" ? "stopped" : "recording")}
            >
              {state === "recording" ? "Stop Practice" : hasTake ? "Practice Again" : "Start Practice"}
            </Button>
          </div>

          <div className="mt-6 border-t border-border pt-5">
            <p className="flex items-center justify-center gap-2 text-sm font-semibold text-primary">
              <Sparkles className="size-4" />
              {practiceContext.hint}
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <Button variant="outline" className="rounded-xl" disabled={!hasTake}>
                <Play className="size-4" />
                Listen
              </Button>
              <Button
                variant="outline"
                className="rounded-xl"
                disabled={!hasTake}
                onClick={() => {
                  setState("idle");
                  setSeconds(0);
                }}
              >
                <RotateCcw className="size-4" />
                Record Again
              </Button>
              <Button className="rounded-xl" disabled={!hasTake || submitting} onClick={submit}>
                <Sparkles className="size-4" />
                {submitting ? "Submitting…" : "Submit for AI Assessment"}
              </Button>
            </div>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Prototype mode — audio is simulated. Speech-to-text will be connected later.
            </p>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
