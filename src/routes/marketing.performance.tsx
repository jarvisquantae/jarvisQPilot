import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, ClipboardCheck, Star, Target, UserCheck } from "lucide-react";
import { MarketingShell } from "@/components/layout/MarketingShell";
import { ConsolePageTitle } from "@/components/layout/ConsoleShell";
import {
  Dot,
  FilterBar,
  FilterSelect,
  Panel,
  StackedBarChart,
  StatTile,
  TD,
  THead,
  TR,
  TableWrap,
  type ConsoleTone,
} from "@/components/console/primitives";
import { cn } from "@/lib/utils";
import {
  MM_ACTION_GUIDE,
  MM_FILTER_OPTIONS,
  MM_PERFORMANCE_STATS,
  MM_READINESS_SPLIT,
  MM_TM_PERFORMANCE,
} from "@/data/marketing";

export const Route = createFileRoute("/marketing/performance")({
  head: () => ({
    meta: [
      { title: "Performance & Actions — Q-Pilot Marketing" },
      {
        name: "description",
        content: "Monitor TM accuracy, adherence and readiness, then assign guided practice or coaching actions.",
      },
      { property: "og:title", content: "Performance & Actions — Q-Pilot Marketing" },
      { property: "og:description", content: "TM readiness scoring with recommended coaching actions." },
    ],
  }),
  component: MarketingPerformance,
});

const statIcons = [Target, ClipboardCheck, UserCheck, AlertTriangle];

const readinessTone = (readiness: string): ConsoleTone =>
  readiness === "Ready" ? "success" : readiness === "In Progress" ? "warning" : "danger";

const scoreTone = (score: number) =>
  score >= 75 ? "text-success" : score >= 60 ? "text-warning" : "text-destructive";

function MarketingPerformance() {
  return (
    <MarketingShell searchPlaceholder="Search TMs...">
      <ConsolePageTitle title="Performance & Action Management" />

      <FilterBar>
        <FilterSelect label="Quarter" options={MM_FILTER_OPTIONS.quarter} />
        <FilterSelect label="Campaign" options={MM_FILTER_OPTIONS.campaign} />
        <FilterSelect label="Product" options={MM_FILTER_OPTIONS.product} />
        <FilterSelect label="Specialty" options={MM_FILTER_OPTIONS.specialty} />
        <FilterSelect label="Sales Manager" options={MM_FILTER_OPTIONS.salesManager} />
        <FilterSelect label="TM" options={MM_FILTER_OPTIONS.tm} />
      </FilterBar>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {MM_PERFORMANCE_STATS.map((stat, index) => {
          const Icon = statIcons[index] ?? Target;
          return (
            <StatTile
              key={stat.label}
              label={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              delta={stat.delta}
              deltaLabel={stat.deltaLabel}
              note={stat.note}
              tone={stat.tone}
              icon={<Icon className="size-5" />}
            />
          );
        })}
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.7fr_1fr]">
        <Panel
          title="TM Performance Overview"
          info
          bodyClassName=""
          footer={
            <>
              <span>Showing 1 to 8 of 45</span>
              <button type="button" className="font-bold text-primary">
                View all
              </button>
            </>
          }
        >
          <TableWrap>
            <THead
              columns={[
                "TM Name",
                "Campaign",
                { label: "Accuracy", align: "right" },
                { label: "Adherence", align: "right" },
                "Rating",
                "Readiness",
                "Last Attempt",
                { label: "Action", align: "right" },
              ]}
            />
            <tbody>
              {MM_TM_PERFORMANCE.map((row) => (
                <TR key={row.tm}>
                  <TD strong>{row.tm}</TD>
                  <TD>{row.campaign}</TD>
                  <TD align="right" className={cn("font-bold", scoreTone(row.accuracy))}>
                    {row.accuracy}%
                  </TD>
                  <TD align="right" className={cn("font-bold", scoreTone(row.adherence))}>
                    {row.adherence}%
                  </TD>
                  <TD>
                    <span className="inline-flex" aria-label={`${row.rating} of 5`}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={cn(
                            "size-3.5",
                            star <= row.rating
                              ? "fill-warning text-warning"
                              : "fill-muted text-muted",
                          )}
                        />
                      ))}
                    </span>
                  </TD>
                  <TD>
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-navy">
                      <Dot tone={readinessTone(row.readiness)} />
                      {row.readiness}
                    </span>
                  </TD>
                  <TD>{row.last}</TD>
                  <TD align="right">
                    <select className="h-8 rounded-lg border border-border bg-card px-2 text-xs font-semibold text-primary">
                      <option>{row.action}</option>
                      <option>Review</option>
                      <option>Coach</option>
                      <option>Repeat Practice</option>
                    </select>
                  </TD>
                </TR>
              ))}
            </tbody>
          </TableWrap>
        </Panel>

        <Panel title="TMs by Readiness Status" info>
          <StackedBarChart segments={MM_READINESS_SPLIT} caption="Q2 2025" max={220} />
        </Panel>
      </div>

      <Panel className="mt-5" title="Action Guide" info>
        <div className="grid gap-4 sm:grid-cols-3">
          {MM_ACTION_GUIDE.map((guide) => (
            <div key={guide.label} className="rounded-2xl border border-border p-4">
              <p className="inline-flex items-center gap-1.5 text-sm font-bold text-navy">
                <Dot tone={guide.tone} />
                {guide.label}
              </p>
              <p className="mt-2 text-xs text-muted-foreground">{guide.rule}</p>
              <p className="mt-2 text-xs font-bold text-navy">
                Recommended Action:{" "}
                <span className="font-semibold text-muted-foreground">{guide.action}</span>
              </p>
            </div>
          ))}
        </div>
      </Panel>
    </MarketingShell>
  );
}
