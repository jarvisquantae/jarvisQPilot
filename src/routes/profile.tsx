import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { BellRing, ChevronRight, Globe, LifeBuoy, UserRound } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader, SectionCard } from "@/components/common/Layout";
import { NotificationItem } from "@/components/common/NotificationItem";
import { ProgressBar } from "@/components/common/ProgressBar";
import { ReadinessBadge } from "@/components/common/StatusBadge";
import { PageSkeleton } from "@/components/common/EmptyState";
import { metricsQuery, notificationsQuery, userQuery } from "@/services/queries";
import { campaigns } from "@/data/mock";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile & Notifications — Q-Pilot" },
      {
        name: "description",
        content:
          "Your territory, reporting manager, current campaign, notification preferences and readiness snapshot.",
      },
      { property: "og:title", content: "Profile & Notifications — Q-Pilot" },
      {
        property: "og:description",
        content: "Territory Manager profile, settings and current readiness snapshot in Q-Pilot.",
      },
    ],
  }),
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(userQuery());
    context.queryClient.ensureQueryData(notificationsQuery());
  },
  pendingComponent: () => (
    <AppShell>
      <PageSkeleton />
    </AppShell>
  ),
  component: ProfilePage,
});

const settings = [
  { label: "Language", value: "English", icon: Globe },
  { label: "Notification Preferences", value: "All updates", icon: BellRing },
  { label: "Help & Support", value: "Contact Quantae AI", icon: LifeBuoy },
];

function ProfilePage() {
  const { data: user } = useSuspenseQuery(userQuery());
  const { data: notifications } = useSuspenseQuery(notificationsQuery());
  const { data: metrics } = useSuspenseQuery(metricsQuery());
  const currentCampaign = campaigns.find((campaign) => campaign.id === user.currentCampaignId);

  const profileRows = [
    { label: "Territory", value: user.territory },
    { label: "Reporting Manager", value: user.reportingManager },
    { label: "Current Campaign", value: currentCampaign?.productName ?? "—" },
  ];

  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader title="Notifications & Profile" subtitle="Your account, settings and readiness." />

        <div className="grid gap-4 lg:grid-cols-3">
          <div className="space-y-4">
            <SectionCard>
              <div className="flex items-center gap-4">
                <span className="grid size-14 place-items-center rounded-2xl bg-navy text-base font-extrabold text-navy-foreground">
                  {user.initials}
                </span>
                <div>
                  <p className="text-lg font-bold text-navy">{user.roleLabel}</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <dl className="mt-5 divide-y divide-border">
                {profileRows.map((row) => (
                  <div key={row.label} className="flex items-center justify-between gap-4 py-2.5">
                    <dt className="text-sm text-muted-foreground">{row.label}</dt>
                    <dd className="text-sm font-semibold text-navy">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </SectionCard>

            <SectionCard title="Settings" icon={<UserRound className="size-4" />}>
              <ul className="space-y-2.5">
                {settings.map((setting) => (
                  <li key={setting.label}>
                    <button
                      type="button"
                      className="flex w-full cursor-pointer items-center gap-3 rounded-2xl border border-border bg-surface-2 p-4 text-left transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <setting.icon className="size-4 shrink-0 text-primary" />
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-bold text-navy">{setting.label}</span>
                        <span className="block text-xs text-muted-foreground">{setting.value}</span>
                      </span>
                      <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
                    </button>
                  </li>
                ))}
              </ul>
            </SectionCard>
          </div>

          <SectionCard title="Notifications" icon={<BellRing className="size-4" />}>
            <ul className="space-y-3">
              {notifications.map((notification) => (
                <NotificationItem key={notification.id} notification={notification} />
              ))}
            </ul>
          </SectionCard>

          <SectionCard title="Current Readiness Snapshot">
            <div className="space-y-5">
              <ProgressBar label="Accuracy" value={metrics.accuracy} />
              <ProgressBar label="Adherence" value={metrics.adherence} tone="navy" />
              <ProgressBar
                label="Overall Rating"
                value={(metrics.rating / 5) * 100}
                tone="warning"
              />
              <div className="flex items-center justify-between rounded-2xl border border-success/20 bg-success-soft/70 p-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-success">Readiness</p>
                  <p className="mt-1 text-sm font-semibold text-navy">
                    {metrics.rating}/5 overall rating
                  </p>
                </div>
                <ReadinessBadge readiness={metrics.readiness} />
              </div>
            </div>
          </SectionCard>
        </div>
      </div>
    </AppShell>
  );
}
