import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CircleAlert,
  FileChartColumnIncreasing,
  Image,
  Megaphone,
  Plus,
  UsersRound,
} from "lucide-react";
import { MarketingShell } from "@/components/layout/MarketingShell";
import { ConsolePageTitle } from "@/components/layout/ConsoleShell";
import { Button } from "@/components/ui/button";
import { Panel, StatTile } from "@/components/console/primitives";

export const Route = createFileRoute("/marketing/dashboard")({
  head: () => ({
    meta: [
      { title: "Marketing Dashboard — JARVIS Q-PILOT" },
      { name: "description", content: "Marketing campaign overview and quick actions in JARVIS Q-PILOT." },
      { property: "og:title", content: "Marketing Dashboard — JARVIS Q-PILOT" },
      { property: "og:description", content: "Marketing campaign overview and quick actions in JARVIS Q-PILOT." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MarketingDashboard,
});

const dashboardStats = [
  { label: "Active Campaigns", value: 4, note: "2 more than last quarter", tone: "info" as const, icon: Megaphone },
  { label: "TMs Assigned", value: 56, note: "12 more than last quarter", tone: "success" as const, icon: UsersRound },
  { label: "Inputs Published", value: 34, note: "6 added this quarter", tone: "ai" as const, icon: FileChartColumnIncreasing },
  { label: "Creatives Ready", value: 28, note: "5 awaiting review", tone: "teal" as const, icon: Image },
];

const quickActions = [
  { title: "Create Input", detail: "Add a new campaign input", icon: Plus, to: "/marketing/inputs" as const, tone: "bg-info-soft text-info" },
  { title: "Manage Campaigns", detail: "Review plans and inputs", icon: Megaphone, to: "/marketing/campaigns" as const, tone: "bg-success-soft text-success" },
  { title: "Manage Templates", detail: "Review approved templates", icon: Image, to: "/marketing/products" as const, tone: "bg-ai-soft text-ai" },
  { title: "View Reports", detail: "Review field performance", icon: FileChartColumnIncreasing, to: "/marketing/reports" as const, tone: "bg-navy-soft text-navy" },
];

function MarketingDashboard() {
  return (
    <MarketingShell>
      <ConsolePageTitle
        title="Good morning, Marketing Manager!"
        subtitle="Here’s how your campaigns are performing."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((stat) => (
          <StatTile key={stat.label} {...stat} icon={<stat.icon className="size-5" />} />
        ))}
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.6fr_0.8fr]">
        <Panel title="Quick Actions">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {quickActions.map((action) => (
              <Link
                key={action.title}
                to={action.to}
                className="group flex min-h-52 flex-col rounded-xl border border-border bg-muted/35 p-4 transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span className={`grid size-12 place-items-center rounded-full ${action.tone}`}>
                  <action.icon className="size-6" />
                </span>
                <h2 className="mt-8 text-base font-bold text-navy">{action.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{action.detail}</p>
                <span className="mt-auto grid size-9 place-items-center self-end rounded-full border border-border bg-card text-primary transition-transform group-hover:translate-x-0.5">
                  <ArrowRight className="size-4" />
                </span>
              </Link>
            ))}
          </div>
        </Panel>

        <div className="space-y-5">
          <Panel
            title="Needs Attention"
            actions={<Button variant="ghost" size="sm" asChild><Link to="/marketing/actions">View all</Link></Button>}
          >
            <ul className="space-y-2">
              {[
                { label: "2 inputs awaiting approval", to: "/marketing/inputs" },
                { label: "5 TMs not yet assigned", to: "/marketing/campaigns" },
                { label: "1 campaign nearing end date", to: "/marketing/campaigns" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="group flex items-center gap-3 rounded-xl bg-muted/50 p-3 text-sm font-semibold text-navy transition-colors hover:bg-muted"
                  >
                    <CircleAlert className="size-4 shrink-0 text-warning" />
                    <span className="flex-1 group-hover:text-primary">{item.label}</span>
                    <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                  </Link>
                </li>
              ))}
            </ul>
          </Panel>

          <div className="rounded-xl border border-primary/20 bg-mint p-6">
            <p className="text-xl font-bold leading-relaxed text-primary">Better inputs create stronger field conversations.</p>
            <div className="mt-5 h-1 w-10 rounded-full bg-primary" />
          </div>
        </div>
      </div>
    </MarketingShell>
  );
}