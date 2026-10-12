import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
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
  highlight = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  highlight?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 rounded-2xl px-4 py-3",
        highlight && "bg-accent",
      )}
    >
      <span className="grid size-11 shrink-0 place-items-center rounded-full bg-accent text-primary">
        {icon}
      </span>
      <p className={cn("flex-1 text-base font-bold text-navy", highlight && "text-lg")}>{label}</p>
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

  const accuracy = assessment?.accuracy ?? 80;
  const adherence = assessment?.adherence ?? 80;
  const overall = attempt?.score ?? Math.round(accuracy * 0.5 + adherence * 0.5);

  const readinessLabel =
    assessment?.readiness === "ready"
      ? "Ready for HCPs"
      : assessment?.readiness === "on_track"
      ? "Nearly Ready"
      : "Needs Practice";

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
    (overall >= 85
      ? "Outstanding detailing performance — approved for HCP discussions!"
      : "Good progress — one more practice can make you ready.");

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

        <div className="grid gap-5 lg:grid-cols-2">
          <section className="card-surface p-6">
            <h2 className="text-lg font-extrabold uppercase tracking-wide text-primary">
              Your AI Assessment
            </h2>
            <div className="mt-5 space-y-2">
              <ScoreRow icon={<Target className="size-5" />} label="Accuracy" value={accuracy} />
              <ScoreRow
                icon={<ShieldCheck className="size-5" />}
                label="Adherence"
                value={adherence}
              />
              <ScoreRow
                icon={<Star className="size-5" />}
                label="Overall"
                value={overall}
                highlight
              />
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-border pt-5">
              <p className="text-base font-extrabold uppercase tracking-wide text-primary">
                Readiness
              </p>
              <span className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-bold text-primary">
                <span className="size-2 rounded-full bg-primary" />
                {readinessLabel}
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
