import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { History, Sparkles, TrendingUp } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader, SectionCard } from "@/components/common/Layout";
import { ProgressBar } from "@/components/common/ProgressBar";
import { ReadinessBadge, StatusBadge } from "@/components/common/StatusBadge";
import { DataTable, type Column } from "@/components/common/DataTable";
import { AIInsightCard } from "@/components/common/FeedbackCard";
import { Button } from "@/components/ui/button";
import { PageSkeleton } from "@/components/common/EmptyState";
import { progressQuery } from "@/services/queries";
import type { PracticeAttempt } from "@/types";
import { campaigns } from "@/data/mock";

export const Route = createFileRoute("/results/progress")({
  head: () => ({
    meta: [
      { title: "My Progress — Q-Pilot Field Intelligence" },
      {
        name: "description",
        content:
          "Score improvement over time, readiness by campaign, practice history and coach highlights.",
      },
      { property: "og:title", content: "My Progress — Q-Pilot Field Intelligence" },
      {
        property: "og:description",
        content: "Track your detailing score improvement and readiness across assigned campaigns.",
      },
    ],
  }),
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(progressQuery());
  },
  pendingComponent: () => (
    <AppShell>
      <PageSkeleton />
    </AppShell>
  ),
  component: ProgressPage,
});

const tones = ["success", "teal", "warning", "warning"] as const;
const coachNoteTitles = ["Momentum", "Strength", "Focus area"] as const;

function ProgressPage() {
  const { data: progress } = useSuspenseQuery(progressQuery());

  const columns: Column<PracticeAttempt>[] = [
    { key: "date", header: "Date", render: (row) => <span className="font-semibold">{row.date}</span> },
    {
      key: "campaign",
      header: "Campaign",
      render: (row) =>
        campaigns.find((campaign) => campaign.id === row.campaignId)?.productName ?? row.campaignId,
    },
    {
      key: "score",
      header: "Score",
      align: "right",
      render: (row) => <span className="font-bold">{row.score}%</span>,
    },
    { key: "rating", header: "Rating", align: "right", render: (row) => `${row.rating}/5` },
    {
      key: "verdict",
      header: "Verdict",
      align: "right",
      render: (row) => (
        <StatusBadge
          label={row.verdict}
          tone={row.score >= 80 ? "success" : row.score >= 65 ? "teal" : "warning"}
        />
      ),
    },
  ];

  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          title="My Progress"
          subtitle="Your practice history, score trend and readiness across assigned campaigns."
          actions={
            <Button asChild variant="outline">
              <Link to="/results/$campaignId/latest" params={{ campaignId: "cardiocare-a" }}>
                Latest assessment
              </Link>
            </Button>
          }
        />

        <div className="grid gap-4 lg:grid-cols-3">
          <SectionCard
            title="Score Improvement"
            subtitle="Weighted practice score per attempt"
            icon={<TrendingUp className="size-4" />}
            className="lg:col-span-2"
          >
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={progress.scoreTrend} margin={{ top: 8, right: 8, bottom: 0, left: -20 }}>
                  <CartesianGrid strokeDasharray="4 4" stroke="var(--border)" vertical={false} />
                  <XAxis
                    dataKey="label"
                    tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                    stroke="var(--border)"
                  />
                  <YAxis
                    domain={[40, 100]}
                    tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                    stroke="var(--border)"
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 12,
                      border: "1px solid var(--border)",
                      background: "var(--card)",
                      fontSize: 12,
                    }}
                    formatter={(value) => [`${value}%`, "Score"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="var(--primary)"
                    strokeWidth={3}
                    dot={{ r: 4, fill: "var(--primary)" }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <StatusBadge
              label={`+${progress.improvementDelta}% improvement over your first attempt`}
              tone="success"
              className="mt-4"
            />
          </SectionCard>

          <SectionCard title="Current Readiness by Campaign">
            <ul className="space-y-4">
              {progress.readinessByCampaign.map((item, index) => (
                <li key={item.campaignId}>
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-bold text-navy">{item.name}</p>
                    <ReadinessBadge readiness={item.readiness} />
                  </div>
                  <ProgressBar
                    value={item.score}
                    tone={tones[index] ?? "teal"}
                    className="mt-2"
                    label="Readiness"
                  />
                </li>
              ))}
            </ul>
          </SectionCard>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <SectionCard title="Practice History" icon={<History className="size-4" />} className="lg:col-span-2">
            <DataTable columns={columns} rows={progress.history} caption="Practice history" />
          </SectionCard>

          <SectionCard
            title="Coach Notes / AI Highlights"
            icon={<Sparkles className="size-4" />}
            bodyClassName="space-y-3"
          >
            {progress.coachNotes.map((note, index) => (
              <AIInsightCard
                key={note}
                title={coachNoteTitles[index] ?? "Highlight"}
                detail={note}
              />
            ))}
          </SectionCard>
        </div>
      </div>
    </AppShell>
  );
}
