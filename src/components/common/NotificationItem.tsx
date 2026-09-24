import { ArrowRight, Bell, CheckCircle2, Megaphone, Mic, Volume2 } from "lucide-react";
import type { AppNotification, NotificationKind } from "@/types";
import { IconWell } from "@/components/common/Layout";
import { cn } from "@/lib/utils";

const iconFor: Record<NotificationKind, typeof Bell> = {
  campaign: Megaphone,
  feedback: CheckCircle2,
  practice: Mic,
  audio: Volume2,
};

const toneFor: Record<NotificationKind, "teal" | "success" | "warning" | "ai"> = {
  campaign: "teal",
  feedback: "success",
  practice: "warning",
  audio: "ai",
};

export function NotificationItem({ notification }: { notification: AppNotification }) {
  const Icon = iconFor[notification.kind];
  return (
    <li
      className={cn(
        "flex items-start gap-3 rounded-2xl border border-border p-4",
        notification.unread ? "bg-mint/50" : "bg-surface-2",
      )}
    >
      <IconWell tone={toneFor[notification.kind]} className="size-9 rounded-xl">
        <Icon className="size-4" />
      </IconWell>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="text-sm font-bold text-navy">{notification.title}</p>
          {notification.unread && <span className="size-2 rounded-full bg-primary" aria-label="Unread" />}
        </div>
        <p className="mt-1 text-sm text-muted-foreground">{notification.message}</p>
        <p className="mt-1.5 text-xs font-medium text-muted-foreground">{notification.time}</p>
      </div>
    </li>
  );
}

export function ActionItem({ text, index }: { text: string; index: number }) {
  return (
    <li className="flex items-start gap-3 rounded-2xl border border-border bg-surface-2 p-4">
      <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-navy text-xs font-bold text-navy-foreground">
        {index}
      </span>
      <p className="text-sm font-medium text-navy">{text}</p>
      <ArrowRight className="ml-auto size-4 shrink-0 text-muted-foreground" />
    </li>
  );
}
