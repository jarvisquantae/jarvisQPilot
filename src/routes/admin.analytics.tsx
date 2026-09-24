import { createFileRoute } from "@tanstack/react-router";
import { BarChart3, Mic, Sparkles, TrendingUp } from "lucide-react";
import { AdminShell } from "@/components/layout/AdminShell";
import { ConsolePageTitle } from "@/components/layout/ConsoleShell";
import { Button } from "@/components/ui/button";
import { BarList, DonutChart, FilterBar, FilterSelect, LineChart, Panel, Pill, StatTile } from "@/components/console/primitives";
import { ADMIN_ADOPTION_BY_ROLE, ADMIN_ANALYTICS_STATS, ADMIN_FEATURE_FLAGS, ADMIN_USAGE_TREND } from "@/data/admin";

export const Route = createFileRoute("/admin/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics & Usage — Q-Pilot Admin" },
      { name: "description", content: "Platform analytics, adoption trends, and usage metrics for Q-Pilot administrators." },
      { property: "og:title", content: "Analytics & Usage — Q-Pilot Admin" },
      { property: "og:description", content: "Platform analytics, adoption trends, and usage metrics for Q-Pilot administrators." },
    ],
  }),
  component: AdminAnalytics,
});

function AdminAnalytics() {
  const icons = [Mic, BarChart3, TrendingUp, Sparkles];

  return (
    <AdminShell searchPlaceholder="Search metrics...">
      <ConsolePageTitle
        title="Analytics & Usage"
        subtitle="Platform adoption, usage, and feature rollout metrics"
        actions={
          <Button variant="outline" size="sm">
            Export analytics
          </Button>
        }
      />

      <FilterBar>
        <FilterSelect label="Tenant" options={["All Tenants", "Quantae India", "Quantae SEA", "Quantae LATAM", "Demo Tenant"]} />
        <FilterSelect label="Quarter" options={["Q2 2025 (Apr – Jun)", "Q1 2025 (Jan – Mar)", "Q3 2025 (Jul – Sep)"]} />
        <button type="button" className="h-10 px-1 text-sm font-bold text-primary">
          Reset
        </button>
      </FilterBar>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {ADMIN_ANALYTICS_STATS.map((stat, index) => {
          const Icon = icons[index]!;
          return (
            <StatTile
              key={stat.label}
              label={stat.label}
              value={stat.value}
              delta={stat.delta}
              deltaLabel={stat.deltaLabel}
              tone={stat.tone}
              icon={<Icon className="size-5" />}
            />
          );
        })}
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <Panel className="lg:col-span-2" title="Usage Trend" info>
          <LineChart series={ADMIN_USAGE_TREND.series} labels={ADMIN_USAGE_TREND.labels} suffix="" />
        </Panel>

        <Panel title="Adoption by Role" info>
          <BarList items={ADMIN_ADOPTION_BY_ROLE} />
        </Panel>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <Panel title="Practice Distribution" info>
          <DonutChart
            slices={[
              { label: "Guided", value: 62, tone: "teal" },
              { label: "Full Pitch", value: 28, tone: "info" },
              { label: "Review Only", value: 10, tone: "navy" },
            ]}
            centerValue="8,642"
            centerLabel="sessions"
          />
        </Panel>

        <Panel title="Feature Flags" info>
          <div className="space-y-3">
            {ADMIN_FEATURE_FLAGS.map((feature) => (
              <div key={feature.feature} className="flex items-center justify-between rounded-xl border border-border bg-card p-3">
                <div>
                  <p className="text-sm font-semibold text-navy">{feature.feature}</p>
                  <p className="text-xs text-muted-foreground">Rollout: {feature.rollout}</p>
                </div>
                <Pill tone={feature.status === "Enabled" ? "success" : feature.status === "Beta" ? "warning" : "muted"}>
                  {feature.status}
                </Pill>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </AdminShell>
  );
}

