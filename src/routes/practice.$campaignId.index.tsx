import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowLeft, ArrowRight, Headphones, Mic, Sparkles } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { InputContextBar } from "@/components/tm/InputContextBar";
import { detailingStructure, practiceContext } from "@/data/tm";
import { PageHeader, SectionCard } from "@/components/common/Layout";
import { StatusBadge } from "@/components/common/StatusBadge";
import { PracticeStepper } from "@/components/practice/PracticeStepper";
import { AIInsightCard, ChecklistItem } from "@/components/common/FeedbackCard";
import { Button } from "@/components/ui/button";
import { PageSkeleton } from "@/components/common/EmptyState";
import { campaignQuery, pitchQuery } from "@/services/queries";

export const Route = createFileRoute("/practice/$campaignId/")({
  head: () => ({
    meta: [
      { title: "Guided Practice — Q-Pilot" },
      {
        name: "description",
        content:
          "Practise each section of the approved detail — opening, core messages, input explanation and closing.",
      },
      { property: "og:title", content: "Guided Practice — Q-Pilot" },
      {
        property: "og:description",
        content: "Section-by-section guided detailing practice against the approved campaign pitch.",
      },
    ],
  }),
  loader: ({ context, params }) => {
    context.queryClient.ensureQueryData(campaignQuery(params.campaignId));
    context.queryClient.ensureQueryData(pitchQuery(params.campaignId));
  },
  pendingComponent: () => (
    <AppShell>
      <PageSkeleton />
    </AppShell>
  ),
  component: GuidedPracticePage,
});

function GuidedPracticePage() {
  const { campaignId } = Route.useParams();
  const { data: campaign } = useSuspenseQuery(campaignQuery(campaignId));
  const { data: pitch } = useSuspenseQuery(pitchQuery(campaignId));
  const [activeIndex, setActiveIndex] = useState(0);

  // Practice follows the same 5-step detailing structure used in the Learn module.
  const steps = detailingStructure.map((step, index) => {
    const source = pitch.sections[index] ?? pitch.sections[pitch.sections.length - 1]!;
    return {
      id: step.id,
      order: index + 1,
      title: step.title,
      script: step.script,
      durationLabel: source.durationLabel,
      bullets: source.bullets,
      reminders: source.reminders,
      aiFocus: source.aiFocus,
      aiCriteria: source.aiCriteria,
    };
  });

  const section = steps[activeIndex] ?? steps[0]!;
  const isLast = activeIndex === steps.length - 1;

  return (
    <AppShell>
      <div className="space-y-6">
        <InputContextBar
          inputName={practiceContext.inputTitle}
          month={practiceContext.month}
          visit={practiceContext.visit}
        />

        <PageHeader
          title="Guided Practice"
          subtitle="Practice each section of your detail to build confidence and improve results."
          eyebrow={
            <>
              <span className="text-sm font-bold text-navy">{campaign.productName}</span>
              <StatusBadge label="Due today" tone="warning" />
            </>
          }
          actions={
            <Button asChild variant="outline">
              <Link to="/campaigns/$campaignId/audio" params={{ campaignId }}>
                <ArrowLeft className="size-4" />
                Back to Audio
              </Link>
            </Button>
          }
        />

        <PracticeStepper
          steps={steps.map((item) => ({ id: item.id, title: item.title }))}
          activeIndex={activeIndex}
          onSelect={setActiveIndex}
        />

        <div className="grid gap-4 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            <SectionCard
              title={`${section.order}. ${section.title}`}
              subtitle={`Approved sample script · ${section.durationLabel}`}
              icon={<Mic className="size-4" />}
            >
              <blockquote className="rounded-2xl border border-primary/20 bg-mint/60 p-4 text-sm leading-relaxed text-navy">
                “{section.script}”
              </blockquote>

              {section.bullets.length > 0 && (
                <ul className="mt-4 space-y-2">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-2 text-sm text-navy">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}
            </SectionCard>

            <SectionCard title="Key Reminders" icon={<Sparkles className="size-4" />}>
              <ul className="space-y-2.5">
                {section.reminders.map((reminder) => (
                  <ChecklistItem key={reminder} text={reminder} />
                ))}
              </ul>
            </SectionCard>

            <div className="flex flex-wrap gap-2.5">
              <Button asChild>
                <Link to="/practice/$campaignId/record" params={{ campaignId }}>
                  <Mic className="size-4" />
                  Record This Section
                </Link>
              </Button>
              <Button
                variant="outline"
                onClick={() => setActiveIndex((index) => Math.min(steps.length - 1, index + 1))}
                disabled={isLast}
              >
                Next Section
                <ArrowRight className="size-4" />
              </Button>
              <Button asChild variant="ghost">
                <Link to="/campaigns/$campaignId/audio" params={{ campaignId }}>
                  <Headphones className="size-4" />
                  Back to Audio
                </Link>
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <SectionCard title="AI Focus for this section" icon={<Sparkles className="size-4" />}>
              <AIInsightCard title={section.title} detail={section.aiFocus} />
              <p className="mt-5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                AI will evaluate
              </p>
              <ul className="mt-2.5 space-y-2.5">
                {section.aiCriteria.map((criterion) => (
                  <ChecklistItem key={criterion} text={criterion} />
                ))}
              </ul>
              <p className="mt-5 rounded-xl bg-surface-2 p-3 text-xs text-muted-foreground">
                AI provides transcription, concept detection and evidence. Q-Pilot calculates the
                final accuracy, adherence and readiness scores.
              </p>
            </SectionCard>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
