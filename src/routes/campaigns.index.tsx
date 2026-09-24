import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { BrandFilter, MonthPills, VisitRow } from "@/components/tm/InputPlanParts";
import {
  monthPlans,
  nextMonthOf,
  type BrandFilterValue,
  type MonthValue,
} from "@/data/tm";

export const Route = createFileRoute("/campaigns/")({
  head: () => ({
    meta: [
      { title: "My Input Plan — Q-Pilot Field Intelligence" },
      {
        name: "description",
        content:
          "Your monthly visit-by-visit promotional input plan with approved inputs and guided detailing for each brand.",
      },
      { property: "og:title", content: "My Input Plan — Q-Pilot Field Intelligence" },
      {
        property: "og:description",
        content: "Monthly visit plan, approved inputs and guided detailing for your territory.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: InputPlanPage,
});

function InputPlanPage() {
  const [month, setMonth] = useState<MonthValue>("APRIL");
  const [brand, setBrand] = useState<BrandFilterValue>("All Brands");

  const plan = monthPlans[month];
  const visits =
    brand === "All Brands" ? plan.visits : plan.visits.filter((visit) => visit.brand === brand);

  const next = nextMonthOf[month];
  const nextPlan = next ? monthPlans[next] : null;

  return (
    <AppShell>
      <div className="space-y-7">
        <h1 className="text-3xl font-extrabold uppercase tracking-tight text-navy sm:text-4xl">
          My Input Plan
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <MonthPills value={month} onChange={setMonth} />
          <BrandFilter value={brand} onChange={setBrand} />
        </div>

        <div>
          <h2 className="text-2xl font-extrabold text-navy">{plan.label}</h2>
          <p className="mt-1 text-sm font-bold text-primary">
            {visits.length} {visits.length === 1 ? "Visit" : "Visits"} Planned
          </p>
        </div>

        <div className="space-y-4">
          {visits.map((visit) => (
            <VisitRow key={visit.id} visit={visit} />
          ))}
          {visits.length === 0 && (
            <p className="card-surface p-8 text-center text-sm text-muted-foreground">
              No visits planned for {brand} in {plan.label}.
            </p>
          )}
        </div>

        {nextPlan && next && (
          <section className="flex flex-wrap items-center gap-6 rounded-3xl border border-primary/20 bg-accent/60 p-6">
            <span className="grid size-16 shrink-0 place-items-center rounded-full bg-card text-primary shadow-soft">
              <CalendarDays className="size-7" />
            </span>
            <div className="border-border sm:border-r sm:pr-6">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Coming next month
              </p>
              <p className="mt-1 text-2xl font-extrabold text-primary">{next}</p>
            </div>
            <ul className="min-w-[16rem] flex-1 space-y-1.5">
              {nextPlan.visits.map((visit) => (
                <li key={visit.id} className="flex gap-6 text-sm">
                  <span className="w-16 shrink-0 font-bold text-primary">Visit {visit.visit}</span>
                  <span className="text-navy">{visit.title}</span>
                </li>
              ))}
            </ul>
            <Button
              variant="outline"
              className="rounded-xl border-primary/40 text-primary"
              onClick={() => setMonth(next)}
            >
              Preview {next.charAt(0) + next.slice(1).toLowerCase()}
            </Button>
          </section>
        )}
      </div>
    </AppShell>
  );
}
