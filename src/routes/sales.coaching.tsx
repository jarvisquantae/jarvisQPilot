import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CircleCheckBig, GraduationCap, RefreshCcw, Sparkles } from "lucide-react";
import { SalesShell } from "@/components/layout/SalesShell";
import { IconWell, PageHeader, SectionCard } from "@/components/common/Layout";
import { MetricCard } from "@/components/common/MetricCard";
import { Button } from "@/components/ui/button";
import {
  HBarRow,
  PersonCell,
  SelectFilter,
  Table,
  Td,
  Th,
  TextBadge,
  Tr,
} from "@/components/sales/primitives";
import {
  brandById,
  brands,
  coachingAreas,
  coachingHeadline,
  coachingIssues,
  coachingPlans,
  memberById,
  recentCompletions,
  teamMembers,
} from "@/data/sales";

export const Route = createFileRoute("/sales/coaching")({
  head: () => ({
    meta: [
      { title: "Coaching Plans — Q-Pilot Sales Manager" },
      {
        name: "description",
        content:
          "Assign, track and close coaching plans for territory managers based on AI-detected messaging gaps.",
      },
      { property: "og:title", content: "Coaching Plans — Q-Pilot Sales Manager" },
      {
        property: "og:description",
        content: "Coaching assignment board with focus areas ranked by AI-detected gaps.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Coaching,
});

const planTone = (status: string) =>
  status === "Completed" ? "success" : status === "In Progress" ? "teal" : "warning";

function Coaching() {
  const [member, setMember] = useState(teamMembers[0]!.name);
  const [brand, setBrand] = useState(brands[0]!.name);
  const [issue, setIssue] = useState(coachingIssues[0]!);
  const [due, setDue] = useState("2025-06-15");

  return (
    <SalesShell>
      <div className="space-y-6">
        <PageHeader
          title="Coaching & Follow-up"
          subtitle="Turn AI findings into concrete coaching plans and track them to completion."
        />

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            label="Coaching Assigned"
            value={`${coachingHeadline.assigned.value}`}
            suffix=""
            delta={coachingHeadline.assigned.delta}
            deltaLabel="vs last quarter"
            tone="teal"
            icon={<GraduationCap className="size-5" />}
          />
          <MetricCard
            label="Pending"
            value={`${coachingHeadline.pending.value}`}
            suffix=""
            delta={coachingHeadline.pending.delta}
            deltaLabel="vs last quarter"
            tone="warning"
          />
          <MetricCard
            label="Completed"
            value={`${coachingHeadline.completed.value}`}
            suffix=""
            delta={coachingHeadline.completed.delta}
            deltaLabel="vs last quarter"
            tone="success"
            icon={<CircleCheckBig className="size-5" />}
          />
          <MetricCard
            label="Repeat Coaching Needed"
            value={`${coachingHeadline.repeatNeeded.value}`}
            suffix=""
            delta={-coachingHeadline.repeatNeeded.delta}
            deltaLabel="vs last quarter"
            tone="ai"
            icon={<RefreshCcw className="size-5" />}
          />
        </div>

        <SectionCard
          title="Top Coaching Areas"
          subtitle="Ranked by how often the AI flags the gap across your team"
          icon={<Sparkles className="size-5" />}
        >
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {coachingAreas.map((area) => (
              <article key={area.id} className="rounded-2xl border border-border bg-surface-2 p-4">
                <IconWell tone={area.tone}>
                  <GraduationCap className="size-5" />
                </IconWell>
                <h3 className="mt-3 text-sm font-bold text-navy">{area.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{area.body}</p>
                <div className="mt-3">
                  <HBarRow
                    label={`${area.count} TMs`}
                    value={area.share}
                    tone={area.tone === "warning" ? "warning" : "teal"}
                  />
                </div>
              </article>
            ))}
          </div>
        </SectionCard>

        <div className="grid gap-4 lg:grid-cols-3">
          <SectionCard
            title="Assign Coaching"
            subtitle="Mock assignment — nothing is sent yet"
            icon={<GraduationCap className="size-5" />}
          >
            <div className="space-y-4">
              <SelectFilter
                label="Territory manager"
                options={teamMembers.map((item) => item.name)}
                value={member}
                onChange={setMember}
              />
              <SelectFilter
                label="Brand"
                options={brands.map((item) => item.name)}
                value={brand}
                onChange={setBrand}
              />
              <SelectFilter
                label="Focus area"
                options={coachingIssues}
                value={issue}
                onChange={setIssue}
              />
              <label className="flex flex-col gap-1.5">
                <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                  Due date
                </span>
                <input
                  type="date"
                  value={due}
                  onChange={(event) => setDue(event.target.value)}
                  className="h-10 rounded-xl border border-border bg-card px-3 text-sm font-semibold text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                  Note to TM
                </span>
                <textarea
                  rows={3}
                  placeholder="What should they practise before the next visit?"
                  className="rounded-2xl border border-border bg-card p-3 text-sm text-navy placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </label>
              <Button className="w-full">Assign coaching plan</Button>
            </div>
          </SectionCard>

          <SectionCard
            className="lg:col-span-2"
            title="Active Coaching Plans"
            icon={<GraduationCap className="size-5" />}
          >
            <Table minWidth={720}>
              <thead>
                <tr>
                  <Th>TM Name</Th>
                  <Th>Brand</Th>
                  <Th>Focus Area</Th>
                  <Th>Due Date</Th>
                  <Th align="right">Status</Th>
                </tr>
              </thead>
              <tbody>
                {coachingPlans.map((plan) => {
                  const tm = memberById(plan.memberId);
                  return (
                    <Tr key={plan.id}>
                      <Td>
                        <Link to="/sales/tm/$tmId" params={{ tmId: tm.id }}>
                          <PersonCell initials={tm.initials} name={tm.name} meta={tm.region} />
                        </Link>
                      </Td>
                      <Td>{brandById(plan.brandId).name}</Td>
                      <Td>{plan.area}</Td>
                      <Td>
                        <span className="text-xs font-semibold text-muted-foreground">
                          {plan.dueDate}
                        </span>
                      </Td>
                      <Td align="right">
                        <TextBadge label={plan.status} tone={planTone(plan.status)} />
                      </Td>
                    </Tr>
                  );
                })}
              </tbody>
            </Table>

            <h3 className="mt-6 text-sm font-bold text-navy">Recently completed</h3>
            <ul className="mt-3 space-y-2">
              {recentCompletions.map((item) => {
                const tm = memberById(item.memberId);
                return (
                  <li
                    key={item.id}
                    className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-border bg-surface-2 px-4 py-3 text-sm"
                  >
                    <span className="font-semibold text-navy">
                      {tm.name} · {brandById(item.brandId).name}
                    </span>
                    <span className="text-xs font-medium text-muted-foreground">
                      {item.area} · completed {item.date}
                    </span>
                  </li>
                );
              })}
            </ul>
          </SectionCard>
        </div>
      </div>
    </SalesShell>
  );
}
