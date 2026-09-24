import { createFileRoute, Link } from "@tanstack/react-router";
import { CircleCheck, Rocket, TriangleAlert, Undo2 } from "lucide-react";
import { MarketingShell } from "@/components/layout/MarketingShell";
import { ConsolePageTitle } from "@/components/layout/ConsoleShell";
import {
  Panel,
  Pill,
  StatTile,
  TD,
  THead,
  TR,
  TableWrap,
} from "@/components/console/primitives";
import { Button } from "@/components/ui/button";
import { MM_PUBLISH_CHECKLIST, MM_PUBLISH_HISTORY } from "@/data/marketing";

export const Route = createFileRoute("/marketing/publish")({
  head: () => ({
    meta: [
      { title: "Campaign Publication — Q-Pilot Marketing" },
      {
        name: "description",
        content:
          "Publish the approved campaign with its pitch, audio, rubric, vocabulary version, calendar and assignments, or withdraw and revise.",
      },
      { property: "og:title", content: "Campaign Publication — Q-Pilot Marketing" },
      {
        property: "og:description",
        content: "Pre-publish readiness checklist and publication history for quarterly campaigns.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CampaignPublication,
});

function CampaignPublication() {
  const ready = MM_PUBLISH_CHECKLIST.filter((row) => row.state === "Ready").length;

  return (
    <MarketingShell searchPlaceholder="Search campaigns to publish...">
      <ConsolePageTitle
        title="Campaign Publication"
        subtitle="CARDIOCARE Q2 · Apr 01 – Jun 30, 2025 · 67 TMs in scope"
        actions={
          <>
            <Button variant="outline">
              <Undo2 className="size-4" /> Withdraw campaign
            </Button>
            <Button>
              <Rocket className="size-4" /> Publish campaign
            </Button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatTile
          label="Checklist Ready"
          value={`${ready}/${MM_PUBLISH_CHECKLIST.length}`}
          tone="success"
          icon={<CircleCheck className="size-5" />}
        />
        <StatTile label="Blocking Issues" value={1} tone="danger" note="East HQ pitch version missing" icon={<TriangleAlert className="size-5" />} />
        <StatTile label="TMs In Scope" value={67} tone="info" note="7 HQs · 2 SM teams" />
        <StatTile label="Readiness Deadline" value="Jun 28" tone="warning" note="12 days remaining" />
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.4fr_1fr]">
        <Panel
          title="Pre-publish checklist"
          actions={<Pill tone="warning">1 item needs attention</Pill>}
          bodyClassName="px-0 pb-0"
        >
          <TableWrap>
            <THead columns={["Component", "Detail", { label: "State", align: "right" }]} />
            <tbody>
              {MM_PUBLISH_CHECKLIST.map((row) => (
                <TR key={row.item}>
                  <TD strong>{row.item}</TD>
                  <TD>{row.detail}</TD>
                  <TD align="right">
                    <Pill tone={row.state === "Ready" ? "success" : "warning"}>{row.state}</Pill>
                  </TD>
                </TR>
              ))}
            </tbody>
          </TableWrap>
        </Panel>

        <div className="space-y-5">
          <Panel title="What gets published">
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>Active pitch version and generated detailing audio</li>
              <li>Assessment rubric with weights, critical errors and readiness rules</li>
              <li>Published vocabulary version per specialty</li>
              <li>Distribution calendar and TM / team assignments</li>
            </ul>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button variant="soft" size="sm" asChild>
                <Link to="/marketing/assignment">Review assignment</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/marketing/audio">Review rubric</Link>
              </Button>
            </div>
          </Panel>

          <Panel title="Publication history" bodyClassName="px-0 pb-0">
            <TableWrap>
              <THead columns={["Campaign", "Version", "Action", "By", { label: "When", align: "right" }]} />
              <tbody>
                {MM_PUBLISH_HISTORY.map((row) => (
                  <TR key={`${row.campaign}-${row.at}`}>
                    <TD strong>{row.campaign}</TD>
                    <TD>{row.version}</TD>
                    <TD>
                      <Pill
                        tone={
                          row.action === "Published"
                            ? "success"
                            : row.action === "Withdrawn"
                              ? "danger"
                              : row.action === "Revised"
                                ? "warning"
                                : "muted"
                        }
                      >
                        {row.action}
                      </Pill>
                    </TD>
                    <TD>{row.by}</TD>
                    <TD align="right">{row.at}</TD>
                  </TR>
                ))}
              </tbody>
            </TableWrap>
          </Panel>
        </div>
      </div>
    </MarketingShell>
  );
}
