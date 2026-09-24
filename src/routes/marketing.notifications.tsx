import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Bell, CheckCheck } from "lucide-react";
import { MarketingShell } from "@/components/layout/MarketingShell";
import { ConsolePageTitle } from "@/components/layout/ConsoleShell";
import { Panel, Pill, Dot, TD, THead, TR, TableWrap } from "@/components/console/primitives";
import { Button } from "@/components/ui/button";
import { MM_NOTIFICATION_FEED, MM_NOTIFICATION_PREFS } from "@/data/marketing";
import { toast } from "sonner";

export const Route = createFileRoute("/marketing/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications — Q-Pilot Marketing" },
      {
        name: "description",
        content:
          "Pitch processing, vocabulary review, campaign publication, assignment deadlines, low-score and critical-claim alerts in one feed.",
      },
      { property: "og:title", content: "Notifications — Q-Pilot Marketing" },
      {
        property: "og:description",
        content: "Marketing alert feed with per-event notification preferences.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MarketingNotifications,
});

function MarketingNotifications() {
  const [feed, setFeed] = useState(MM_NOTIFICATION_FEED);
  const [prefs, setPrefs] = useState(MM_NOTIFICATION_PREFS);

  const unreadCount = feed.filter((item) => item.unread).length;

  const handleMarkAllRead = () => {
    setFeed((prev) => prev.map((item) => ({ ...item, unread: false })));
    toast.success("All notifications marked as read");
  };

  const handleTogglePref = (label: string) => {
    setPrefs((prev) =>
      prev.map((p) => {
        if (p.label === label) {
          const nextState = !p.on;
          toast.info(`${p.label} alerts ${nextState ? "enabled" : "disabled"}`);
          return { ...p, on: nextState };
        }
        return p;
      })
    );
  };

  return (
    <MarketingShell searchPlaceholder="Search notifications...">
      <ConsolePageTitle
        title="Notifications"
        subtitle={`${unreadCount} unread alerts across pitches, vocabulary, campaigns and performance`}
        actions={
          <Button variant="outline" onClick={handleMarkAllRead} disabled={unreadCount === 0}>
            <CheckCheck className="size-4" /> Mark all as read
          </Button>
        }
      />

      <div className="grid gap-5 xl:grid-cols-[1.5fr_1fr]">
        <Panel
          title="Alert feed"
          actions={
            <Pill tone={unreadCount > 0 ? "warning" : "muted"}>
              {unreadCount} unread
            </Pill>
          }
          bodyClassName="px-5 pb-5"
        >
          <ul className="divide-y divide-border">
            {feed.map((item) => (
              <li
                key={item.title + item.time}
                className="flex items-start gap-3 py-3.5 cursor-pointer hover:bg-muted/20 px-2 rounded-xl transition-colors"
                onClick={() => {
                  if (item.unread) {
                    setFeed((prev) =>
                      prev.map((f) =>
                        f.title === item.title ? { ...f, unread: false } : f
                      )
                    );
                  }
                }}
              >
                <span
                  className={`mt-0.5 grid size-9 shrink-0 place-items-center rounded-xl ${
                    item.tone === "danger"
                      ? "bg-destructive/12 text-destructive"
                      : item.tone === "warning"
                        ? "bg-warning/15 text-warning"
                        : item.tone === "success"
                          ? "bg-success/12 text-success"
                          : "bg-info/12 text-info"
                  }`}
                >
                  <Bell className="size-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-bold text-navy">{item.title}</p>
                    <Pill tone="muted">{item.type}</Pill>
                    {item.unread && <Dot tone="teal" />}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{item.detail}</p>
                </div>
                <span className="shrink-0 text-xs font-semibold text-muted-foreground">
                  {item.time}
                </span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Notification preferences" bodyClassName="px-0 pb-0">
          <TableWrap>
            <THead columns={["Event", "Delivery", { label: "Enabled", align: "right" }]} />
            <tbody>
              {prefs.map((pref) => (
                <TR key={pref.label}>
                  <TD strong>{pref.label}</TD>
                  <TD>{pref.detail}</TD>
                  <TD align="right">
                    <button
                      type="button"
                      onClick={() => handleTogglePref(pref.label)}
                      className="cursor-pointer"
                    >
                      <Pill tone={pref.on ? "success" : "muted"}>
                        {pref.on ? "On" : "Off"}
                      </Pill>
                    </button>
                  </TD>
                </TR>
              ))}
            </tbody>
          </TableWrap>
        </Panel>
      </div>
    </MarketingShell>
  );
}
