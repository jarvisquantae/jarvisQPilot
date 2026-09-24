import { createFileRoute, Link } from "@tanstack/react-router";
import { CircleAlert, Layers, TriangleAlert, Users } from "lucide-react";
import { MarketingShell } from "@/components/layout/MarketingShell";
import { ConsolePageTitle } from "@/components/layout/ConsoleShell";
import {
  FilterBar,
  FilterSelect,
  Panel,
  Pill,
  TD,
  THead,
  TR,
  TableWrap,
} from "@/components/console/primitives";
import { Button } from "@/components/ui/button";
import {
  MM_ASSIGNMENT_BUNDLE,
  MM_ASSIGNMENT_ISSUES,
  MM_ASSIGNMENT_SCOPE,
  MM_FILTER_OPTIONS,
  MM_TM_ASSIGNMENTS,
} from "@/data/marketing";

export const Route = createFileRoute("/marketing/assignment")({
  head: () => ({
    meta: [
      { title: "TM & Team Assignment — Q-Pilot Marketing" },
      {
        name: "description",
        content:
          "Assign campaign, pitch version, inputs, audio, rubric and vocabulary to regions, HQs, SM teams or individual territory managers.",
      },
      { property: "og:title", content: "TM & Team Assignment — Q-Pilot Marketing" },
      {
        property: "og:description",
        content: "Bundle assignment with pre-publish issue preview across regions, HQs and teams.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MarketingAssignment,
});

function MarketingAssignment() {
  return (
    <MarketingShell searchPlaceholder="Search TMs, HQs, SM teams...">
      <ConsolePageTitle
        title="TM & Team Assignment"
        subtitle="Assign the full campaign bundle by region, HQ, Sales Manager team or individual TM, then preview issues before publishing."
        actions={
          <>
            <Button variant="outline">Preview issues</Button>
            <Button asChild>
              <Link to="/marketing/publish">Publish assignment</Link>
            </Button>
          </>
        }
      />

      <FilterBar>
        <FilterSelect label="Campaign" options={MM_FILTER_OPTIONS.campaign} />
        <FilterSelect label="Product / Brand" options={MM_FILTER_OPTIONS.product} />
        <FilterSelect label="Specialty" options={MM_FILTER_OPTIONS.specialty} />
        <FilterSelect label="Sales Manager" options={MM_FILTER_OPTIONS.salesManager} />
        <FilterSelect label="Status" options={MM_FILTER_OPTIONS.status} />
      </FilterBar>

      <div className="grid gap-5 xl:grid-cols-[1fr_1.4fr]">
        <div className="space-y-5">
          <Panel title="Assignment bundle" bodyClassName="px-5 pb-5">
            <dl className="divide-y divide-border">
              {MM_ASSIGNMENT_BUNDLE.map((row) => (
                <div key={row.label} className="flex items-start justify-between gap-4 py-2.5">
                  <dt className="text-xs font-bold text-muted-foreground">{row.label}</dt>
                  <dd className="text-right text-sm font-semibold text-navy">{row.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-4 flex items-center gap-2 rounded-xl bg-muted/60 px-3 py-2.5">
              <Layers className="size-4 shrink-0 text-primary" />
              <p className="text-xs font-medium text-muted-foreground">
                Only published pitch, audio, rubric and vocabulary versions can be assigned.
              </p>
            </div>
          </Panel>

          <Panel title="Assignment scope" bodyClassName="px-0 pb-0">
            <TableWrap>
              <THead
                columns={["Scope", "Target", { label: "State", align: "right" }]}
              />
              <tbody>
                {MM_ASSIGNMENT_SCOPE.map((row) => (
                  <TR key={row.scope}>
                    <TD strong>{row.scope}</TD>
                    <TD>{row.target}</TD>
                    <TD align="right">
                      <Pill tone={row.state === "Included" ? "success" : "muted"}>{row.state}</Pill>
                    </TD>
                  </TR>
                ))}
              </tbody>
            </TableWrap>
          </Panel>

          <Panel title="Pre-publish issues">
            <ul className="space-y-3">
              {MM_ASSIGNMENT_ISSUES.map((issue) => (
                <li
                  key={issue.detail}
                  className="rounded-2xl border border-border bg-muted/40 p-4"
                >
                  <div className="flex items-center gap-2">
                    {issue.severity === "Blocking" ? (
                      <CircleAlert className="size-4 text-destructive" />
                    ) : (
                      <TriangleAlert className="size-4 text-warning" />
                    )}
                    <Pill tone={issue.severity === "Blocking" ? "danger" : "warning"}>
                      {issue.severity}
                    </Pill>
                  </div>
                  <p className="mt-2 text-sm font-semibold text-navy">{issue.detail}</p>
                  <p className="mt-1 text-xs text-muted-foreground">Suggested fix: {issue.fix}</p>
                </li>
              ))}
            </ul>
          </Panel>
        </div>

        <Panel
          title="Assigned territory managers"
          actions={
            <>
              <Pill tone="info">
                <Users className="size-3" /> 67 TMs in scope
              </Pill>
              <Button size="sm" variant="outline">
                Bulk edit deadlines
              </Button>
            </>
          }
          bodyClassName="px-0 pb-0"
          footer={<span>Showing 5 of 67 assigned territory managers</span>}
        >
          <TableWrap>
            <THead
              columns={[
                "TM",
                "Sales Manager",
                "Campaign",
                "Pitch version",
                "Practice requirement",
                "Deadline",
                { label: "Status", align: "right" },
              ]}
            />
            <tbody>
              {MM_TM_ASSIGNMENTS.map((row) => (
                <TR key={row.tm}>
                  <TD strong>{row.tm}</TD>
                  <TD>{row.sm}</TD>
                  <TD>{row.campaign}</TD>
                  <TD>v3</TD>
                  <TD>{row.practice}</TD>
                  <TD>{row.due}</TD>
                  <TD align="right">
                    <Pill
                      tone={
                        row.status === "Assigned"
                          ? "success"
                          : row.status === "In Progress"
                            ? "info"
                            : "muted"
                      }
                    >
                      {row.status}
                    </Pill>
                  </TD>
                </TR>
              ))}
            </tbody>
          </TableWrap>
        </Panel>
      </div>
    </MarketingShell>
  );
}
