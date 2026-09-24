import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowRight, BadgeCheck, Check, FileText } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader, SectionCard } from "@/components/common/Layout";
import { StatusBadge } from "@/components/common/StatusBadge";
import { InputContextBar } from "@/components/tm/InputContextBar";
import { TranscriptPanel } from "@/components/practice/TranscriptPanel";
import { Button } from "@/components/ui/button";
import { PageSkeleton } from "@/components/common/EmptyState";
import { practiceContext } from "@/data/tm";
import { campaignQuery, transcriptQuery } from "@/services/queries";

export const Route = createFileRoute("/practice/$campaignId/transcript")({
  head: () => ({
    meta: [
      { title: "Transcript Review — Q-Pilot" },
      {
        name: "description",
        content:
          "Review the AI transcript of your detailing practice and confirm it before the assessment is calculated.",
      },
      { property: "og:title", content: "Transcript Review — Q-Pilot" },
      {
        property: "og:description",
        content: "Read your practice transcript and confirm it before assessment.",
      },
    ],
  }),
  loader: ({ context, params }) => {
    context.queryClient.ensureQueryData(campaignQuery(params.campaignId));
    context.queryClient.ensureQueryData(transcriptQuery(params.campaignId));
  },
  pendingComponent: () => (
    <AppShell>
      <PageSkeleton />
    </AppShell>
  ),
  component: TranscriptPage,
});

function TranscriptPage() {
  const { campaignId } = Route.useParams();
  const navigate = useNavigate();
  const { data: campaign } = useSuspenseQuery(campaignQuery(campaignId));
  const { data: transcript } = useSuspenseQuery(transcriptQuery(campaignId));
  const [confirmed, setConfirmed] = useState(false);

  return (
    <AppShell>
      <div className="space-y-6">
        <InputContextBar
          inputName={practiceContext.inputTitle}
          month={practiceContext.month}
          visit={practiceContext.visit}
        />

        <PageHeader
          title="Transcript Review"
          subtitle="AI transcribed your detailing conversation."
          eyebrow={
            <>
              <span className="text-sm font-bold text-navy">{campaign.productName}</span>
              <StatusBadge
                label={confirmed ? "Transcript Confirmed" : "AI Transcription Complete"}
                tone={confirmed ? "success" : "ai"}
                icon={<BadgeCheck className="size-3.5" />}
              />
            </>
          }
          actions={
            <span className="text-xs font-semibold text-muted-foreground">
              Submitted {transcript.submittedAt}
            </span>
          }
        />

        <div className="mx-auto w-full max-w-3xl space-y-4">
          <SectionCard
            title="AI Transcript"
            subtitle="Read-only record of your submitted detailing."
            icon={<FileText className="size-4" />}
          >
            <TranscriptPanel transcript={transcript} />
          </SectionCard>

          <div className="flex flex-wrap gap-2.5">
            <Button variant={confirmed ? "outline" : "default"} onClick={() => setConfirmed(true)}>
              <Check className="size-4" />
              {confirmed ? "Transcript confirmed" : "Confirm Transcript"}
            </Button>
            <Button
              variant="navy"
              onClick={() => navigate({ to: "/results/$campaignId/latest", params: { campaignId } })}
              disabled={!confirmed}
            >
              Continue to Assessment
              <ArrowRight className="size-4" />
            </Button>
            <Button asChild variant="ghost">
              <Link to="/practice/$campaignId/record" params={{ campaignId }}>
                Re-record
              </Link>
            </Button>
          </div>
          {!confirmed && (
            <p className="text-xs text-muted-foreground">
              Transcript confirmation is required before an assessment is calculated.
            </p>
          )}
        </div>
      </div>
    </AppShell>
  );
}
