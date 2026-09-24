import { createFileRoute, Link } from "@tanstack/react-router";
import { CircleCheckBig, Clock, ShieldCheck, TriangleAlert } from "lucide-react";
import { SalesShell } from "@/components/layout/SalesShell";
import { IconWell, PageHeader, SectionCard } from "@/components/common/Layout";
import { MetricCard } from "@/components/common/MetricCard";
import { Button } from "@/components/ui/button";
import {
  Legend,
  PersonCell,
  ScoreValue,
  StackedShareBar,
  Table,
  Td,
  Th,
  TextBadge,
  Tr,
} from "@/components/sales/primitives";
import {
  brandById,
  immediateAttention,
  memberById,
  readinessByBrand,
  readinessHeadline,
  recommendedActions,
} from "@/data/sales";

export const Route = createFileRoute("/sales/readiness")({
  head: () => ({
    meta: [
      { title: "Brand Readiness — Q-Pilot Sales Manager" },
      {
        name: "description",
        content:
          "Monitor how many territory managers are ready, nearly ready or need review on each brand before field visits.",
      },
      { property: "og:title", content: "Brand Readiness — Q-Pilot Sales Manager" },
      {
        property: "og:description",
        content: "Readiness split by brand plus the TMs needing immediate attention.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Readiness,
});

function Readiness() {
  return (
    <SalesShell>
      <div className="space-y-6">
        <PageHeader
          title="Brand Readiness"
          subtitle="Confirm your team is field-ready on every brand before the next detailing cycle."
          actions={
            <Button asChild>
              <Link to="/sales/coaching">Create action plan</Link>
            </Button>
          }
        />

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            label="Overall Readiness"
            value={`${readinessHeadline.overall}%`}
            delta={readinessHeadline.overallDelta}
            deltaSuffix="%"
            deltaLabel="vs last quarter"
            tone="teal"
            progress={readinessHeadline.overall}
            icon={<ShieldCheck className="size-5" />}
          />
          <MetricCard
            label="Ready"
            value={`${readinessHeadline.ready.share}%`}
            delta={readinessHeadline.ready.delta}
            deltaSuffix="%"
            deltaLabel="vs last quarter"
            note={`${readinessHeadline.ready.count} TMs`}
            tone="success"
            icon={<CircleCheckBig className="size-5" />}
          />
          <MetricCard
            label="Nearly Ready"
            value={`${readinessHeadline.nearlyReady.share}%`}
            delta={readinessHeadline.nearlyReady.delta}
            deltaSuffix="%"
            deltaLabel="vs last quarter"
            note={`${readinessHeadline.nearlyReady.count} TMs`}
            tone="info"
            icon={<Clock className="size-5" />}
          />
          <MetricCard
            label="Review Required"
            value={`${readinessHeadline.reviewRequired.share}%`}
            delta={readinessHeadline.reviewRequired.delta}
            deltaSuffix="%"
            deltaLabel="vs last quarter"
            note={`${readinessHeadline.reviewRequired.count} TMs`}
            tone="warning"
            icon={<TriangleAlert className="size-5" />}
          />
        </div>

        <SectionCard
          title="Readiness by Brand"
          subtitle="Distribution of ready, nearly ready and not ready TMs"
          icon={<ShieldCheck className="size-5" />}
        >
          <div className="space-y-5">
            {readinessByBrand.map((row) => (
              <div key={row.brandId}>
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-bold text-navy">{brandById(row.brandId).name}</p>
                  <p className="text-xs font-semibold text-muted-foreground">
                    {row.ready} ready · {row.nearly} nearly · {row.notReady} not ready ·{" "}
                    {row.total} TMs
                  </p>
                </div>
                <StackedShareBar
                  segments={[
                    { label: "Ready", share: row.readyShare, tone: "success" },
                    { label: "Nearly Ready", share: row.nearlyShare, tone: "teal" },
                    { label: "Not Ready", share: row.notReadyShare, tone: "warning" },
                  ]}
                />
              </div>
            ))}
          </div>
          <div className="mt-5">
            <Legend
              items={[
                { label: "Ready", tone: "success" },
                { label: "Nearly Ready", tone: "teal" },
                { label: "Not Ready", tone: "warning" },
              ]}
            />
          </div>
        </SectionCard>

        <div className="grid gap-4 lg:grid-cols-3">
          {recommendedActions.map((action) => (
            <article key={action.id} className="card-surface flex flex-col gap-3 p-5">
              <IconWell tone={action.tone}>
                <ShieldCheck className="size-5" />
              </IconWell>
              <div>
                <h2 className="text-base font-bold text-navy">{action.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{action.body}</p>
              </div>
              <Button variant="soft" size="sm" className="mt-auto w-fit" asChild>
                <Link to="/sales/coaching">Take action</Link>
              </Button>
            </article>
          ))}
        </div>

        <SectionCard
          title="TMs Needing Immediate Attention"
          subtitle="Lowest readiness scores across brands"
          icon={<TriangleAlert className="size-5" />}
        >
          <Table minWidth={760}>
            <thead>
              <tr>
                <Th>TM Name</Th>
                <Th>Brand</Th>
                <Th align="center">Readiness</Th>
                <Th align="center">Status</Th>
                <Th align="right">Recommended Action</Th>
              </tr>
            </thead>
            <tbody>
              {immediateAttention.map((row) => {
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
                    <Td align="center">
                      <ScoreValue value={row.score} />
                    </Td>
                    <Td align="center">
                      <TextBadge
                        label={row.status}
                        tone={row.status === "Not Ready" ? "warning" : "ai"}
                      />
                    </Td>
                    <Td align="right">
                      <Button variant="outline" size="sm" asChild>
                        <Link to="/sales/coaching">{row.action}</Link>
                      </Button>
                    </Td>
                  </Tr>
                );
              })}
            </tbody>
          </Table>
        </SectionCard>
      </div>
    </SalesShell>
  );
}
