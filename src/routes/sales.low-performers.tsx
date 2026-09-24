import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, TrendingDown, TriangleAlert } from "lucide-react";
import { SalesShell } from "@/components/layout/SalesShell";
import { IconWell, PageHeader, SectionCard } from "@/components/common/Layout";
import { MetricCard } from "@/components/common/MetricCard";
import { Button } from "@/components/ui/button";
import {
  HBarRow,
  PersonCell,
  ScoreValue,
  SeverityBadge,
  Table,
  Td,
  Th,
  Tr,
} from "@/components/sales/primitives";
import {
  brandById,
  lowPerformanceByBrand,
  lowPerformers,
  memberById,
  rootCauses,
} from "@/data/sales";

export const Route = createFileRoute("/sales/low-performers")({
  head: () => ({
    meta: [
      { title: "Low Performers — Q-Pilot Sales Manager" },
      {
        name: "description",
        content:
          "Identify underperforming territory managers, the root cause of each gap and the fastest corrective action.",
      },
      { property: "og:title", content: "Low Performers — Q-Pilot Sales Manager" },
      {
        property: "og:description",
        content: "Root-cause analysis of low-scoring attempts with recommended coaching actions.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LowPerformers,
});

function LowPerformers() {
  const critical = lowPerformers.filter((row) => row.severity === "Critical").length;
  const high = lowPerformers.filter((row) => row.severity === "High").length;

  return (
    <SalesShell>
      <div className="space-y-6">
        <PageHeader
          title="Low Performer Analysis"
          subtitle="Understand why scores are low and act before the next detailing cycle."
          actions={
            <Button asChild>
              <Link to="/sales/coaching">Assign coaching</Link>
            </Button>
          }
        />

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            label="TMs Flagged"
            value={`${lowPerformers.length}`}
            suffix=""
            tone="warning"
            icon={<TrendingDown className="size-5" />}
          />
          <MetricCard label="Critical Cases" value={`${critical}`} suffix="" tone="warning" />
          <MetricCard label="High Priority" value={`${high}`} suffix="" tone="ai" />
          <MetricCard
            label="Avg Score In Group"
            value="60%"
            tone="info"
            progress={60}
            note="Team average is 82%"
          />
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {rootCauses.map((cause) => (
            <article key={cause.id} className="card-surface flex gap-4 p-5">
              <IconWell tone={cause.tone}>
                <Sparkles className="size-5" />
              </IconWell>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-base font-bold text-navy">{cause.title}</h2>
                  <span className="text-sm font-extrabold text-navy">{cause.share}%</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{cause.body}</p>
                <div className="mt-3">
                  <HBarRow
                    label="Share of flagged attempts"
                    value={cause.share}
                    tone={cause.tone === "success" ? "success" : cause.tone}
                  />
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <SectionCard
            className="lg:col-span-2"
            title="Flagged Territory Managers"
            subtitle="Sorted by overall score, lowest first"
            icon={<TriangleAlert className="size-5" />}
          >
            <Table minWidth={820}>
              <thead>
                <tr>
                  <Th>TM Name</Th>
                  <Th>Brand</Th>
                  <Th>Main Issue</Th>
                  <Th align="center">Accuracy</Th>
                  <Th align="center">Adherence</Th>
                  <Th align="center">Overall</Th>
                  <Th align="right">Severity</Th>
                </tr>
              </thead>
              <tbody>
                {lowPerformers.map((row) => {
                  const member = memberById(row.memberId);
                  return (
                    <Tr key={row.id}>
                      <Td>
                        <Link to="/sales/tm/$tmId" params={{ tmId: member.id }}>
                          <PersonCell
                            initials={member.initials}
                            name={member.name}
                            meta={member.hq}
                          />
                        </Link>
                      </Td>
                      <Td>{brandById(row.brandId).name}</Td>
                      <Td>
                        <span className="text-xs font-semibold text-muted-foreground">
                          {row.issue}
                        </span>
                      </Td>
                      <Td align="center">
                        <ScoreValue value={row.accuracy} />
                      </Td>
                      <Td align="center">
                        <ScoreValue value={row.adherence} />
                      </Td>
                      <Td align="center">
                        <ScoreValue value={row.overall} />
                      </Td>
                      <Td align="right">
                        <SeverityBadge severity={row.severity} />
                      </Td>
                    </Tr>
                  );
                })}
              </tbody>
            </Table>
          </SectionCard>

          <div className="space-y-4">
            <SectionCard title="Low Performance by Brand" icon={<TrendingDown className="size-5" />}>
              <div className="space-y-4">
                {lowPerformanceByBrand.map((row) => (
                  <HBarRow
                    key={row.brandId}
                    label={brandById(row.brandId).name}
                    value={row.score}
                    tone="warning"
                  />
                ))}
              </div>
            </SectionCard>

            <SectionCard title="Suggested Next Steps">
              <ul className="space-y-3 text-sm text-navy">
                <li className="rounded-2xl border border-border bg-surface-2 p-4">
                  Run a 30-minute mandatory-message clinic for the 4 critical and high cases.
                </li>
                <li className="rounded-2xl border border-border bg-surface-2 p-4">
                  Re-share the approved detailing audio for RespiraWell D before the next cycle.
                </li>
                <li className="rounded-2xl border border-border bg-surface-2 p-4">
                  Re-assess flagged TMs in 10 days and compare against this baseline.
                </li>
              </ul>
              <Button variant="soft" className="mt-4 w-full" asChild>
                <Link to="/sales/coaching">Create coaching plans</Link>
              </Button>
            </SectionCard>
          </div>
        </div>
      </div>
    </SalesShell>
  );
}
