import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Bell, Mail, Settings, ShieldCheck, User } from "lucide-react";
import { SalesShell } from "@/components/layout/SalesShell";
import { IconWell, PageHeader, SectionCard } from "@/components/common/Layout";
import { Button } from "@/components/ui/button";
import { Avatar, TextBadge } from "@/components/sales/primitives";
import { salesManager, salesNotifications } from "@/data/sales";

export const Route = createFileRoute("/sales/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications & Settings — Q-Pilot Sales Manager" },
      {
        name: "description",
        content:
          "Review team alerts on low performers, readiness gaps and coaching completions, and manage console preferences.",
      },
      { property: "og:title", content: "Notifications & Settings — Q-Pilot Sales Manager" },
      {
        property: "og:description",
        content: "Team alerts, alert preferences and Sales Manager profile settings.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: NotificationsAndSettings,
});

const prefs = [
  { id: "pref-1", label: "Low performer alerts", body: "Notify me when a TM drops below 60%." },
  { id: "pref-2", label: "Readiness alerts", body: "Notify me when brand readiness falls." },
  { id: "pref-3", label: "Coaching updates", body: "Notify me when a coaching plan is completed." },
  { id: "pref-4", label: "Weekly digest email", body: "Send a Monday summary of team performance." },
];

function NotificationsAndSettings() {
  const [enabled, setEnabled] = useState<Record<string, boolean>>({
    "pref-1": true,
    "pref-2": true,
    "pref-3": false,
    "pref-4": true,
  });

  return (
    <SalesShell>
      <div className="space-y-6">
        <PageHeader
          title="Notifications & Settings"
          subtitle="Stay ahead of team risks and control what the console alerts you about."
          actions={
            <Button variant="outline" asChild>
              <Link to="/sales/dashboard">Back to dashboard</Link>
            </Button>
          }
        />

        <div className="grid gap-4 lg:grid-cols-3">
          <SectionCard
            className="lg:col-span-2"
            title="Team Alerts"
            subtitle={`${salesNotifications.length} updates this week`}
            icon={<Bell className="size-5" />}
          >
            <ul className="space-y-3">
              {salesNotifications.map((item) => (
                <li
                  key={item.id}
                  className="flex items-start gap-4 rounded-2xl border border-border bg-surface-2 p-4"
                >
                  <IconWell tone={item.tone}>
                    <Bell className="size-5" />
                  </IconWell>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-bold text-navy">{item.title}</p>
                      <span className="text-xs font-medium text-muted-foreground">{item.time}</span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{item.body}</p>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/sales/low-performers">View</Link>
                  </Button>
                </li>
              ))}
            </ul>
          </SectionCard>

          <div className="space-y-4">
            <SectionCard title="Profile" icon={<User className="size-5" />}>
              <div className="flex items-center gap-3">
                <Avatar initials={salesManager.initials} className="size-12 text-sm" />
                <div>
                  <p className="text-sm font-bold text-navy">{salesManager.name}</p>
                  <p className="text-xs font-medium text-muted-foreground">{salesManager.empId}</p>
                </div>
              </div>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Region</dt>
                  <dd className="font-semibold text-navy">{salesManager.region}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Team size</dt>
                  <dd className="font-semibold text-navy">{salesManager.teamSize} TMs</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Reporting to</dt>
                  <dd className="font-semibold text-navy">{salesManager.reportingTo}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Access</dt>
                  <dd>
                    <TextBadge label="Sales Manager" tone="teal" />
                  </dd>
                </div>
              </dl>
            </SectionCard>

            <SectionCard title="Alert Preferences" icon={<Settings className="size-5" />}>
              <ul className="space-y-3">
                {prefs.map((pref) => (
                  <li key={pref.id} className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-navy">{pref.label}</p>
                      <p className="text-xs text-muted-foreground">{pref.body}</p>
                    </div>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={enabled[pref.id] ?? false}
                      aria-label={pref.label}
                      onClick={() =>
                        setEnabled((prev) => ({ ...prev, [pref.id]: !(prev[pref.id] ?? false) }))
                      }
                      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                        enabled[pref.id] ? "bg-primary" : "bg-muted"
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 size-5 rounded-full bg-card shadow-soft transition-all ${
                          enabled[pref.id] ? "left-[1.4rem]" : "left-0.5"
                        }`}
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </SectionCard>

            <SectionCard title="Delivery" icon={<Mail className="size-5" />}>
              <p className="text-sm text-muted-foreground">
                Alerts appear in this console. Email and push delivery will switch on when Cloud is
                connected.
              </p>
              <div className="mt-3 flex items-center gap-2">
                <ShieldCheck className="size-4 text-success" />
                <span className="text-xs font-semibold text-navy">
                  Prototype mode — no messages are sent
                </span>
              </div>
            </SectionCard>
          </div>
        </div>
      </div>
    </SalesShell>
  );
}
