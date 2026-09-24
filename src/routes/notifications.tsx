import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { BellRing } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader, SectionCard } from "@/components/common/Layout";
import { NotificationItem } from "@/components/common/NotificationItem";
import { EmptyState, PageSkeleton } from "@/components/common/EmptyState";
import { Button } from "@/components/ui/button";
import { notificationsQuery } from "@/services/queries";

export const Route = createFileRoute("/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications — Q-Pilot Field Intelligence" },
      {
        name: "description",
        content:
          "Campaign assignments, practice reminders, updated approved audio and new feedback alerts.",
      },
      { property: "og:title", content: "Notifications — Q-Pilot Field Intelligence" },
      {
        property: "og:description",
        content: "Stay on top of campaign assignments, practice due dates and new feedback.",
      },
    ],
  }),
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(notificationsQuery());
  },
  pendingComponent: () => (
    <AppShell>
      <PageSkeleton />
    </AppShell>
  ),
  component: NotificationsPage,
});

function NotificationsPage() {
  const { data: notifications } = useSuspenseQuery(notificationsQuery());

  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          title="Notifications"
          subtitle="Everything that needs your attention this quarter."
          actions={
            <Button asChild variant="outline">
              <Link to="/profile">Notification preferences</Link>
            </Button>
          }
        />

        <SectionCard icon={<BellRing className="size-4" />} title="Recent">
          {notifications.length === 0 ? (
            <EmptyState
              title="You're all caught up"
              description="New campaign assignments and feedback will appear here."
              icon={<BellRing className="size-5" />}
            />
          ) : (
            <ul className="space-y-3">
              {notifications.map((notification) => (
                <NotificationItem key={notification.id} notification={notification} />
              ))}
            </ul>
          )}
        </SectionCard>
      </div>
    </AppShell>
  );
}
