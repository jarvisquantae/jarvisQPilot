import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  CalendarDays,
  Handshake,
  Hand,
  Info,
  MessageCircle,
  Mic,
  Pill,
  Play,
  Target,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { detailingStructure, learningContext } from "@/data/tm";

export const Route = createFileRoute("/campaigns/$campaignId/learning")({
  head: () => ({
    meta: [
      { title: "Learn Detailing — Q-Pilot" },
      {
        name: "description",
        content:
          "Review the approved detailing structure, listen to the reference detailing audio and start practising — all on one page.",
      },
      { property: "og:title", content: "Learn Detailing — Q-Pilot" },
      {
        property: "og:description",
        content: "Approved detailing structure, reference audio and practice for this month's input.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LearningPage,
});

const stepIcons = {
  greeting: Hand,
  opening: MessageCircle,
  core: Target,
  prescription: Pill,
  closing: Handshake,
} as const;

function LearningPage() {
  const { campaignId } = Route.useParams();

  return (
    <AppShell
      headerLeft={
        <Link
          to="/dashboard"
          className="inline-flex min-w-0 items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-primary"
        >
          <ArrowLeft className="size-4 shrink-0" />
          <span className="truncate">Back to My Journey</span>
        </Link>
      }
    >
      <div className="space-y-6">
        {/* Input summary */}
        <section className="card-surface flex flex-col gap-6 p-5 sm:flex-row sm:items-center sm:gap-8 sm:p-7">
          <div className="relative flex h-[205px] w-[170px] shrink-0 flex-col overflow-hidden rounded-xl border border-border bg-card p-4 pb-0 shadow-soft">
            <p className="text-[11px] font-extrabold text-navy">
              CardioVia<span className="text-brand-red">♥</span>
            </p>
            <p className="mt-6 text-[13px] font-extrabold uppercase leading-tight text-navy">
              {learningContext.coverKicker}
            </p>
            <p className="mt-0.5 text-[9px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
              {learningContext.coverSeries}
            </p>
            <svg viewBox="0 0 100 24" className="mt-7 h-7 w-full text-brand-red" aria-hidden="true">
              <polyline
                points="0,18 18,18 24,6 30,22 38,18 60,18 66,8 72,20 80,18 100,18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
            <span className="-mx-4 mt-auto block h-9 bg-navy" />
          </div>

          <div className="min-w-0">
            <span className="inline-flex rounded-full bg-mint px-3 py-1 text-xs font-bold text-primary">
              CardioVia
            </span>
            <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">
              {learningContext.inputTitle}
            </h1>
            <p className="mt-1.5 text-sm text-muted-foreground">
              {learningContext.coverSubtitle}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm font-semibold text-navy">
              <span className="inline-flex items-center gap-2">
                <CalendarDays className="size-4 text-muted-foreground" />
                April
              </span>
              <span className="text-muted-foreground">•</span>
              <span>Visit {learningContext.visit}</span>
              <span className="rounded-full bg-success-soft px-3 py-1 text-xs font-bold text-success">
                Approved
              </span>
            </div>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-12">
          {/* A. Detailing structure */}
          <section className="card-surface p-5 sm:p-6 lg:col-span-7">
            <h2 className="text-base font-extrabold text-primary sm:text-lg">
              A. Detailing Structure
            </h2>
            <ol className="mt-5">
              {detailingStructure.map((step, index) => {
                const Icon = stepIcons[step.icon];
                const last = index === detailingStructure.length - 1;
                return (
                  <li key={step.id} className="flex gap-4">
                    <div className="flex shrink-0 flex-col items-center">
                      <span className="grid size-12 place-items-center rounded-full bg-mint text-primary">
                        <Icon className="size-5" />
                      </span>
                      {!last && <span className="w-px flex-1 bg-border" />}
                    </div>
                    <div
                      className={`min-w-0 flex-1 pt-1.5 ${last ? "pb-2" : "mb-6 border-b border-border pb-6"}`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex min-w-0 items-center gap-3">
                          <span className="grid size-6 shrink-0 place-items-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">
                            {index + 1}
                          </span>
                          <h3 className="truncate text-base font-bold text-navy">{step.title}</h3>
                        </div>
                        <button
                          type="button"
                          aria-label={`Bookmark ${step.title}`}
                          className="shrink-0 text-muted-foreground transition-colors hover:text-primary"
                        >
                          <Bookmark className="size-4" />
                        </button>
                      </div>
                      <p className="mt-2 pl-9 text-sm leading-relaxed text-muted-foreground">
                        {step.script}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </section>

          <div className="space-y-6 lg:col-span-5">
            {/* B. Listen detailing */}
            <section className="card-surface p-5 sm:p-6">
              <h2 className="text-base font-extrabold text-primary sm:text-lg">
                B. Listen Detailing
              </h2>
              <div className="mt-4 flex items-center gap-4 rounded-2xl bg-mint px-4 py-4">
                <button
                  type="button"
                  aria-label={`Play ${learningContext.inputTitle}`}
                  className="grid size-12 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground shadow-soft transition-transform hover:scale-105"
                >
                  <Play className="size-5 fill-current" />
                </button>
                <span className="text-sm font-semibold text-navy">00:00</span>
                <div className="relative h-1.5 flex-1 rounded-full bg-border">
                  <span className="absolute left-0 top-1/2 size-3 -translate-y-1/2 rounded-full bg-primary" />
                </div>
                <span className="text-sm font-semibold text-navy">02:12</span>
              </div>
            </section>

            {/* C. Practise */}
            <section className="card-surface p-5 text-center sm:p-6">
              <h2 className="text-left text-base font-extrabold text-primary sm:text-lg">
                C. Practise
              </h2>
              <span className="mx-auto mt-5 grid size-20 place-items-center rounded-full bg-mint text-primary">
                <Mic className="size-8" />
              </span>
              <p className="mt-4 text-lg font-bold text-navy">Practise your detailing</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Record and get AI feedback to improve your delivery.
              </p>
              <Button asChild size="lg" className="mt-5 w-full rounded-xl">
                <Link to="/practice/$campaignId" params={{ campaignId }}>
                  Start Practise
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </section>
          </div>
        </div>

        <p className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Info className="size-4" />
          Follow this structure to deliver a consistent and impactful discussion.
        </p>
      </div>
    </AppShell>
  );
}
