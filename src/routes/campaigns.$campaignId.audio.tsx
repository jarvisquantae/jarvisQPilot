import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowRight, BadgeCheck, Headphones, ListChecks } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader, SectionCard, StepChip } from "@/components/common/Layout";
import { StatusBadge } from "@/components/common/StatusBadge";
import { AudioPlayer } from "@/components/audio/AudioPlayer";
import { ChecklistItem } from "@/components/common/FeedbackCard";
import { Button } from "@/components/ui/button";
import { PageSkeleton } from "@/components/common/EmptyState";
import { campaignQuery, pitchQuery } from "@/services/queries";
import { products } from "@/data/mock";

export const Route = createFileRoute("/campaigns/$campaignId/audio")({
  head: () => ({
    meta: [
      { title: "Listen to Detailing — Q-Pilot" },
      {
        name: "description",
        content:
          "Listen to the approved detailing audio section by section and internalize the approved pitch flow.",
      },
      { property: "og:title", content: "Listen to Detailing — Q-Pilot" },
      {
        property: "og:description",
        content: "Approved detailing audio with section timings and listening focus guidance.",
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
  component: AudioPage,
});

function AudioPage() {
  const { campaignId } = Route.useParams();
  const { data: campaign } = useSuspenseQuery(campaignQuery(campaignId));
  const { data: pitch } = useSuspenseQuery(pitchQuery(campaignId));
  const product = products.find((item) => item.id === campaign.productId);

  const [minutes = "0", seconds = "0"] = pitch.totalDuration.split(":");
  const durationSeconds = Number(minutes) * 60 + Number(seconds);

  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          title="Listen to Detailing"
          subtitle="Listen to the approved detailing audio and internalize the flow."
          eyebrow={
            <>
              <span className="text-sm font-bold text-navy">{campaign.productName}</span>
              <StatusBadge label="Approved" tone="success" icon={<BadgeCheck className="size-3.5" />} />
            </>
          }
          actions={
            <Button asChild>
              <Link to="/practice/$campaignId" params={{ campaignId }}>
                Proceed to Practice
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          }
        />

        <div className="grid gap-4 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            <div className="card-surface grid gap-4 p-5 sm:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Campaign
                </p>
                <p className="mt-1 text-sm font-bold text-navy">{campaign.quarter}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Indication
                </p>
                <p className="mt-1 text-sm font-bold text-navy">{product?.indication}</p>
              </div>
            </div>

            <AudioPlayer
              durationSeconds={durationSeconds}
              title={`${campaign.productName} — Approved detailing audio`}
            />

            <SectionCard
              title="What to focus on while listening"
              icon={<ListChecks className="size-4" />}
            >
              <ul className="space-y-2.5">
                {pitch.listeningFocus.map((item) => (
                  <ChecklistItem key={item} text={item} />
                ))}
              </ul>
            </SectionCard>
          </div>

          <div className="space-y-4">
            <SectionCard title="Pitch Sections" icon={<Headphones className="size-4" />}>
              <ul className="space-y-2.5">
                {pitch.sections.map((section) => (
                  <li
                    key={section.id}
                    className="flex items-center gap-3 rounded-2xl border border-border bg-surface-2 p-3.5"
                  >
                    <StepChip step={section.order} />
                    <p className="text-sm font-semibold text-navy">{section.title}</p>
                    <span className="ml-auto text-sm font-bold text-primary">
                      {section.durationLabel}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex items-center justify-between rounded-2xl bg-navy px-4 py-3">
                <p className="text-sm font-semibold text-navy-foreground">Total Duration</p>
                <p className="text-sm font-extrabold text-navy-foreground">{pitch.totalDuration}</p>
              </div>
            </SectionCard>

            <SectionCard title="Ready to practise?" icon={<ArrowRight className="size-4" />}>
              <p className="text-sm text-muted-foreground">
                Practice is always assessed against the approved pitch for this campaign.
              </p>
              <Button asChild className="mt-4 w-full">
                <Link to="/practice/$campaignId" params={{ campaignId }}>
                  Proceed to Practice
                </Link>
              </Button>
            </SectionCard>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
