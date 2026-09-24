import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity,
  AlertTriangle,
  Building2,
  FileText,
  Globe,
  Megaphone,
  Shield,
  Users,
} from "lucide-react";
import { AdminShell } from "@/components/layout/AdminShell";
import { ConsolePageTitle } from "@/components/layout/ConsoleShell";
import {
  BarList,
  FilterBar,
  FilterSelect,
  LineChart,
  Panel,
  Pill,
  StatTile,
  TD,
  THead,
  TR,
  TableWrap,
} from "@/components/console/primitives";
import { Button } from "@/components/ui/button";
import {
  ADMIN_ALERTS,
  ADMIN_DASHBOARD_STATS,
  ADMIN_FILTER_OPTIONS,
  ADMIN_TENANT_SUMMARY,
  ADMIN_USAGE_TREND,
} from "@/data/admin";

const statIcons = [Users, Building2, Megaphone, Activity];

export const Route = createFileRoute("/admin/dashboard")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — Q-Pilot" },
      {
        name: "description",
        content: "Q-Pilot Super-Admin console: system health, tenant usage, and platform-wide alerts.",
      },
      { property: "og:title", content: "Admin Dashboard — Q-Pilot" },
      {
        property: "og:description",
        content: "System health, tenant usage, and platform-wide alerts for Q-Pilot administrators.",
      },
    ],
  }),
  component: AdminDashboard,
});

function AdminDashboard() {
  return (
    <AdminShell>
      <ConsolePageTitle
        title="Admin Dashboard"
        subtitle="System health, tenant usage, and platform-wide alerts"
        actions={
          <Button variant="outline" size="sm">
            Export system report
          </Button>
        }
      />

      <FilterBar>
        <FilterSelect label="Tenant" options={ADMIN_FILTER_OPTIONS.tenant} />
        <FilterSelect label="Region" options={ADMIN_FILTER_OPTIONS.region} />
        <FilterSelect label="Quarter" options={ADMIN_FILTER_OPTIONS.quarter} />
        <button type="button" className="h-10 px-1 text-sm font-bold text-primary">
          Reset
        </button>
      </FilterBar>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {ADMIN_DASHBOARD_STATS.map((stat, index) => {
          const Icon = statIcons[index] ?? Shield;
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

      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <Panel className="lg:col-span-2" title="Usage Trend" info>
          <LineChart series={ADMIN_USAGE_TREND.series} labels={ADMIN_USAGE_TREND.labels} suffix="" />
        </Panel>

        <Panel title="Platform Alerts" info>
          <ul className="space-y-3">
            {ADMIN_ALERTS.map((alert) => (
              <li key={alert.title} className="flex items-start gap-3 rounded-xl bg-muted/50 p-3">
                <span className="mt-0.5">
                  {alert.tone === "danger" ? (
                    <AlertTriangle className="size-4 text-destructive" />
                  ) : (
                    <Shield className="size-4 text-info" />
                  )}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-navy">{alert.title}</p>
                  <p className="text-xs text-muted-foreground">{alert.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <Panel
          title="Tenant Summary"
          info
          actions={
            <Button variant="ghost" size="sm" asChild>
              <Link to="/admin/tenants">View all</Link>
            </Button>
          }
        >
          <TableWrap>
            <THead columns={["Tenant", "Region", { label: "Users", align: "right" }, { label: "Campaigns", align: "right" }, "Readiness", "Status"]} />
            <tbody>
              {ADMIN_TENANT_SUMMARY.map((row) => (
                <TR key={row.tenant}>
                  <TD strong>{row.tenant}</TD>
                  <TD>{row.region}</TD>
                  <TD align="right">{row.users}</TD>
                  <TD align="right">{row.campaigns}</TD>
                  <TD>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-20 overflow-hidden rounded-full bg-muted">
                        <div className="h-full rounded-full bg-primary" style={{ width: `${row.readiness}%` }} />
                      </div>
                      <span className="text-xs font-bold text-navy">{row.readiness}%</span>
                    </div>
                  </TD>
                  <TD>
                    <Pill tone={row.status === "Active" ? "success" : "muted"}>{row.status}</Pill>
                  </TD>
                </TR>
              ))}
            </tbody>
          </TableWrap>
        </Panel>

        <Panel title="Readiness by Tenant" info>
          <BarList
            items={ADMIN_TENANT_SUMMARY.map((row) => ({
              label: row.tenant,
              value: row.readiness,
              tone: row.readiness >= 70 ? "success" : row.readiness >= 50 ? "warning" : "danger",
            }))}
          />
        </Panel>
      </div>
    </AdminShell>
  );
}
