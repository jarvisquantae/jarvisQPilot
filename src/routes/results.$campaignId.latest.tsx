import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  AlertTriangle,
  ArrowRight,
  Check,
  CheckCircle2,
  FileText,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  X,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { InputContextBar } from "@/components/tm/InputContextBar";
import { Button } from "@/components/ui/button";
import { PageSkeleton } from "@/components/common/EmptyState";
import { practiceContext } from "@/data/tm";
import { cn } from "@/lib/utils";
import { assessmentQuery, attemptQuery, campaignQuery } from "@/services/queries";

export const Route = createFileRoute("/results/$campaignId/latest")({
  head: () => ({
    meta: [
      { title: "Your Practice Result — Q-Pilot" },
      {
        name: "description",
        content:
          "Accuracy, adherence and overall score for your latest detailing practice, with what you did well and what to improve next.",
      },
      { property: "og:title", content: "Your Practice Result — Q-Pilot" },
      {
        property: "og:description",
        content: "Practice scores, readiness status and coaching feedback from Q-Pilot.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: ({ context, params }) => {
    context.queryClient.ensureQueryData(campaignQuery(params.campaignId));
    context.queryClient.ensureQueryData(assessmentQuery(params.campaignId));
    context.queryClient.ensureQueryData(attemptQuery(params.campaignId));
  },
  pendingComponent: () => (
    <AppShell>
      <PageSkeleton />
    </AppShell>
  ),
  component: AssessmentPage,
});

function ScoreRow({
  icon,
  label,
  value,
  sublabel,
  highlight = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  sublabel?: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 rounded-2xl px-4 py-3.5",
        highlight ? "bg-accent border border-primary/20" : "bg-surface-2",
      )}
    >
      <span className="grid size-11 shrink-0 place-items-center rounded-full bg-accent text-primary">
        {icon}
      </span>
      <div className="flex-1">
        <p className={cn("text-base font-bold text-navy", highlight && "text-lg")}>{label}</p>
        {sublabel && <p className="text-xs text-muted-foreground">{sublabel}</p>}
      </div>
      <p className="text-3xl font-extrabold text-navy">
        {value}
        <span className="text-xl">%</span>
      </p>
    </div>
  );
}

function AssessmentPage() {
  const { campaignId } = Route.useParams();
  const { data: campaign } = useSuspenseQuery(campaignQuery(campaignId));
  const { data: assessment } = useSuspenseQuery(assessmentQuery(campaignId));
  const { data: attempt } = useSuspenseQuery(attemptQuery(campaignId));

  const accuracy = assessment?.accuracy ?? 85;
  const adherence = assessment?.adherence ?? 85;
  const overall = attempt?.score ?? Math.round(accuracy * 0.5 + adherence * 0.5);

  const readinessLabel =
    assessment?.readinessLabel ||
    (assessment?.readiness === "ready"
      ? "Ready for Field Execution"
      : assessment?.readiness === "on_track"
      ? "Nearly Ready"
      : "Practice Recommended");

  const didWellText =
    assessment?.positives && assessment.positives.length > 0
      ? assessment.positives.map((p) => p.detail).join(" ")
      : "You clearly articulated key messaging and engaged with professional call structure.";

  const improveNextText =
    assessment?.improvements && assessment.improvements.length > 0
      ? assessment.improvements.map((i) => i.detail).join(" ")
      : "Reinforce specific dosage convenience and close with a definitive commitment ask.";

  const encouragementText =
    attempt?.verdict ||
    (overall >= 80
      ? "Outstanding detailing performance — approved for HCP discussions!"
      : "Good progress — one more practice will reinforce clinical fluency.");

  const concepts = assessment?.concepts || [
    { id: "mandatory_messages", label: "Mandatory Messages (35%)", detected: true, score: 90, reason: "Core clinical claims communicated" },
    { id: "scientific_accuracy", label: "Scientific & Product Accuracy (25%)", detected: true, score: 90, reason: "Accurate clinical parameters" },
    { id: "pitch_adherence", label: "Pitch Flow & Sequence (20%)", detected: true, score: 85, reason: "Professional opening and flow" },
    { id: "input_explanation", label: "Promotional Input Explanation (10%)", detected: true, score: 80, reason: "Promotional card referenced" },
    { id: "closing_ask", label: "Closing Commitment Ask (10%)", detected: true, score: 80, reason: "Commitment ask delivered" },
  ];

  return (
    <AppShell>
      <div className="space-y-6">
        <InputContextBar
          inputName={campaign?.title || practiceContext.inputTitle}
          month={practiceContext.month}
          visit={practiceContext.visit}
        />
        <header className="flex flex-wrap items-start justify-between gap-6">
          <div className="flex items-start gap-5">
            <span className="grid size-16 shrink-0 place-items-center rounded-2xl bg-accent text-primary">
              <FileText className="size-8" />
            </span>
            <div>
              <p className="text-lg font-extrabold uppercase tracking-wide text-primary">
                {campaign?.productName || practiceContext.brand}
              </p>
              <h1 className="mt-1 text-3xl font-extrabold text-navy">
                {campaign?.title || practiceContext.inputTitle}
              </h1>
              <p className="mt-1 text-base text-muted-foreground">Detailing AI Assessment Result</p>
            </div>
          </div>

          <div className="card-surface w-64 p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Input
            </p>
            <div className="mt-2 rounded-xl bg-accent/70 p-4">
              <p className="text-xs font-extrabold uppercase leading-tight text-primary">
                Consistent
                <br />
                BP Control
              </p>
              <p className="mt-1 text-[9px] font-bold uppercase tracking-wider text-brand-red">
                For a healthier tomorrow
              </p>
            </div>
          </div>
        </header>

        {/* Human Review / Confidence Alert (Rule 9) */}
        {assessment?.requiresHumanReview && (
          <div className="flex items-center gap-3 rounded-2xl border border-warning/30 bg-warning-soft/70 px-5 py-4">
            <AlertTriangle className="size-5 shrink-0 text-warning" />
            <div className="text-sm">
              <span className="font-bold text-navy">Manager Review Trigger: </span>
              <span className="text-muted-foreground">
                {assessment.reviewRecommendation || "Sent for Sales Manager Review due to compliance criteria."}
              </span>
            </div>
          </div>
        )}

        {/* Scorecard Grid */}
        <div className="grid gap-5 lg:grid-cols-2">
          <section className="card-surface p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-extrabold uppercase tracking-wide text-primary">
                Your AI Assessment
              </h2>
              <span className="text-xs font-semibold text-muted-foreground">
                Application-Calculated
              </span>
            </div>

            <div className="mt-5 space-y-3">
              <ScoreRow
                icon={<Target className="size-5" />}
                label="Accuracy"
                sublabel="Mandatory messages (35%) & scientific claims (25%)"
                value={accuracy}
              />
              <ScoreRow
                icon={<ShieldCheck className="size-5" />}
                label="Adherence"
                sublabel="Detailing flow (20%), input explanation (10%) & closing (10%)"
                value={adherence}
              />
              <ScoreRow
                icon={<Star className="size-5" />}
                label="Overall Weighted Score"
                sublabel="Calculated per clinical rubric weights"
                value={overall}
                highlight
              />
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-border pt-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Readiness Status
                </p>
                <p className="mt-0.5 text-base font-extrabold text-navy">{readinessLabel}</p>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-bold text-primary">
                <span className="size-2 rounded-full bg-primary" />
                {assessment?.rating ? `${assessment.rating} / 5.0 Rating` : "Evaluated"}
              </span>
            </div>
          </section>

          <div className="space-y-5">
            <section className="rounded-3xl border border-success/25 bg-success-soft/60 p-6">
              <p className="flex items-center gap-2 text-base font-extrabold text-success">
                <Sparkles className="size-5" />
                What You Did Well
              </p>
              <p className="mt-3 text-base italic leading-relaxed text-navy">
                “{didWellText}”
              </p>
            </section>

            <section className="rounded-3xl border border-warning/25 bg-warning-soft/60 p-6">
              <p className="flex items-center gap-2 text-base font-extrabold text-warning">
                <Sparkles className="size-5" />
                Improve Next
              </p>
              <p className="mt-3 text-base italic leading-relaxed text-navy">
                “{improveNextText}”
              </p>
            </section>
          </div>
        </div>

        {/* Concept-Level Evidence Breakdown (Rule 4 & Product Brief Section 9) */}
        <section className="card-surface p-6">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <div>
              <h3 className="text-base font-extrabold uppercase tracking-wide text-navy">
                Structured Concept Evidence Breakdown
              </h3>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Traceable evidence extracted from your recording and calculated by software rules.
              </p>
            </div>
            <span className="rounded-full bg-surface-2 px-3 py-1 text-xs font-bold text-primary">
              5 Rubric Concepts
            </span>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {concepts.map((concept) => (
              <div
                key={concept.id}
                className="flex flex-col justify-between rounded-2xl border border-border bg-surface-2/60 p-4"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      {concept.label}
                    </p>
                    {concept.detected ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-success">
                        <Check className="size-3.5" /> Covered
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-warning">
                        <X className="size-3.5" /> Missed
                      </span>
                    )}
                  </div>
                  {concept.exactWording && (
                    <p className="mt-2 text-xs italic text-navy/90 line-clamp-3">
                      “{concept.exactWording}”
                    </p>
                  )}
                  {concept.reason && (
                    <p className="mt-1 text-[11px] text-muted-foreground">
                      {concept.reason}
                    </p>
                  )}
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-border/50 pt-2 text-xs">
                  <span className="text-muted-foreground">Score</span>
                  <span className="font-extrabold text-navy">{concept.score}%</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="flex items-center gap-3 text-sm italic text-navy">
            <CheckCircle2 className="size-6 text-primary" />
            {encouragementText}
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="outline" className="rounded-xl border-primary/40 text-primary">
              <Link to="/practice/$campaignId" params={{ campaignId }}>
                Practice Again
              </Link>
            </Button>
            <Button asChild className="rounded-xl">
              <Link to="/campaigns">
                Next Input
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
