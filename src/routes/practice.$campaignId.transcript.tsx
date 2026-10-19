import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { AlertCircle, ArrowRight, BadgeCheck, Check, FileText, RotateCcw } from "lucide-react";
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

  const transcriptText = transcript.turns?.map((t) => t.text).join(" ") || "";
  const hasEvaluationError = transcriptText.includes("[Evaluation Error:");
  const hasNoSpeechError =
    transcriptText.includes("[No clear speech detected") ||
    transcriptText.includes("[No speech detected]");
  const hasError = hasEvaluationError || hasNoSpeechError || !transcriptText.trim();
  const isValidTranscript = !hasError && transcriptText.length > 5;

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
                label={
                  hasError
                    ? "Transcription Error"
                    : confirmed
                    ? "Transcript Confirmed"
                    : "AI Transcription Complete"
                }
                tone={hasError ? "danger" : confirmed ? "success" : "ai"}
                icon={hasError ? <AlertCircle className="size-3.5" /> : <BadgeCheck className="size-3.5" />}
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
          {hasError && (
            <div className="rounded-2xl border border-destructive/30 bg-destructive/10 p-5 text-sm text-destructive">
              <div className="flex items-start gap-3">
                <AlertCircle className="size-5 shrink-0 mt-0.5 text-destructive" />
                <div className="space-y-1">
                  <p className="font-bold text-destructive">
                    {hasEvaluationError
                      ? "Action Required: Upstream Gemini API Error"
                      : "Action Required: No Clear Speech Detected"}
                  </p>
                  <p className="text-xs leading-relaxed text-destructive/90">
                    {hasEvaluationError
                      ? "The speech transcription service returned an error. Review the error details in the transcript below or re-record your pitch."
                      : "The audio recording did not contain recognizable speech. Check your microphone permissions, ensure sufficient volume, and record again."}
                  </p>
                  <div className="pt-2">
                    <Button asChild size="sm" variant="destructive">
                      <Link to="/practice/$campaignId/record" params={{ campaignId }}>
                        <RotateCcw className="size-3.5 mr-1.5" />
                        Re-record Detailing Pitch
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <SectionCard
            title="AI Transcript"
            subtitle="Read-only record of your submitted detailing."
            icon={<FileText className="size-4" />}
          >
            <TranscriptPanel transcript={transcript} />
          </SectionCard>

          <div className="flex flex-wrap gap-2.5">
            <Button
              variant={confirmed ? "outline" : "default"}
              onClick={() => setConfirmed(true)}
              disabled={!isValidTranscript || confirmed}
            >
              <Check className="size-4" />
              {confirmed
                ? "Transcript confirmed"
                : isValidTranscript
                ? "Confirm Transcript"
                : "Cannot Confirm (No Valid Speech)"}
            </Button>
            <Button
              variant="navy"
              onClick={() => navigate({ to: "/results/$campaignId/latest", params: { campaignId } })}
              disabled={!confirmed || !isValidTranscript}
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
          {!isValidTranscript ? (
            <p className="text-xs font-semibold text-destructive">
              Assessment calculation remains disabled until a valid speech transcript is recorded and confirmed.
            </p>
          ) : !confirmed ? (
            <p className="text-xs text-muted-foreground">
              Transcript confirmation is required before an assessment is calculated.
            </p>
          ) : null}
        </div>
      </div>
    </AppShell>
  );
}
