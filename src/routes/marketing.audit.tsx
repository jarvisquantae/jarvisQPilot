import { createFileRoute } from "@tanstack/react-router";
import { Download, History } from "lucide-react";
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
import { MM_AUDIT_LOG, MM_FILTER_OPTIONS } from "@/data/marketing";

export const Route = createFileRoute("/marketing/audit")({
  head: () => ({
    meta: [
      { title: "Audit Trail — Q-Pilot Marketing" },
      {
        name: "description",
        content:
          "Track product, campaign, input, pitch, rubric, vocabulary, assignment and publication changes with user, timestamp and before/after values.",
      },
      { property: "og:title", content: "Audit Trail — Q-Pilot Marketing" },
      {
        property: "og:description",
        content: "Full change history with before/after values and reason for every Marketing module.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MarketingAudit,
});

const MODULES = [
  "All Modules",
  "Product",
  "Campaign",
  "Input",
  "Pitch",
  "Rubric",
  "Vocabulary",
  "Assignment",
  "Action",
  "Publication",
];

function MarketingAudit() {
  return (
    <MarketingShell searchPlaceholder="Search audit entries, users, entities...">
      <ConsolePageTitle
        title="Audit Trail"
        subtitle="Every configuration change is recorded with user, timestamp, before/after values and reason."
        actions={
          <Button variant="outline">
            <Download className="size-4" /> Export log
          </Button>
        }
      />

      <FilterBar>
        <FilterSelect label="Module" options={MODULES} />
        <FilterSelect label="Campaign" options={MM_FILTER_OPTIONS.campaign} />
        <FilterSelect label="User" options={["All Users", "Priya Nair", "Vikram Joshi", "Sneha Iyer", "Rahul Sharma", "System"]} />
        <FilterSelect label="Quarter" options={MM_FILTER_OPTIONS.quarter} />
      </FilterBar>

      <Panel
        title="Change history"
        actions={
          <Pill tone="navy">
            <History className="size-3" /> Last 30 days
          </Pill>
        }
        bodyClassName="px-0 pb-0"
        footer={<span>Showing 7 of 1,284 audit entries</span>}
      >
        <TableWrap>
          <THead
            columns={[
              "Timestamp",
              "User",
              "Module",
              "Entity",
              "Event",
              "Before",
              "After",
              "Reason",
            ]}
          />
          <tbody>
            {MM_AUDIT_LOG.map((row) => (
              <TR key={row.at + row.entity}>
                <TD strong className="whitespace-nowrap">
                  {row.at}
                </TD>
                <TD>{row.by}</TD>
                <TD>
                  <Pill tone="muted">{row.module}</Pill>
                </TD>
                <TD>{row.entity}</TD>
                <TD>{row.event}</TD>
                <TD>{row.before}</TD>
                <TD className="font-semibold text-navy">{row.after}</TD>
                <TD className="min-w-[12rem]">{row.reason}</TD>
              </TR>
            ))}
          </tbody>
        </TableWrap>
      </Panel>
    </MarketingShell>
  );
}
