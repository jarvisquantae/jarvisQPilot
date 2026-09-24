import { createFileRoute } from "@tanstack/react-router";
import { Bell, Lock, Mic, Save, Shield } from "lucide-react";
import { AdminShell } from "@/components/layout/AdminShell";
import { ConsolePageTitle } from "@/components/layout/ConsoleShell";
import { Button } from "@/components/ui/button";
import { Field, Panel, inputClass } from "@/components/console/primitives";
import { ADMIN_SYSTEM_SETTINGS } from "@/data/admin";

export const Route = createFileRoute("/admin/settings")({
  head: () => ({
    meta: [
      { title: "System Settings — Q-Pilot Admin" },
      { name: "description", content: "Configure global settings, thresholds, and feature flags for the Q-Pilot platform." },
      { property: "og:title", content: "System Settings — Q-Pilot Admin" },
      { property: "og:description", content: "Configure global settings, thresholds, and feature flags for the Q-Pilot platform." },
    ],
  }),
  component: AdminSettings,
});

function AdminSettings() {
  return (
    <AdminShell searchPlaceholder="Search settings...">
      <ConsolePageTitle
        title="System Settings"
        subtitle="Global configuration, thresholds, and feature flags"
        actions={
          <Button size="sm">
            <Save className="mr-1.5 size-4" />
            Save changes
          </Button>
        }
      />

      <div className="grid gap-5 lg:grid-cols-2">
        <Panel title="Practice & AI" info>
          <div className="space-y-4">
            <Field label="Minimum practice duration" hint="Seconds required before a practice can be submitted.">
              <input className={inputClass} defaultValue="30" />
            </Field>
            <Field label="AI review confidence threshold" hint="Minimum confidence score to auto-accept an assessment.">
              <input className={inputClass} defaultValue="75" />
            </Field>
          </div>
        </Panel>

        <Panel title="Data Retention" info>
          <div className="space-y-4">
            <Field label="Transcript retention period" hint="Days before transcripts are archived.">
              <input className={inputClass} defaultValue="90" />
            </Field>
            <Field label="Audio archive after" hint="Days before audio recordings are moved to cold storage.">
              <input className={inputClass} defaultValue="30" />
            </Field>
          </div>
        </Panel>

        <Panel title="Security" info>
          <div className="space-y-4">
            <Field label="Session timeout" hint="Hours of inactivity before forced logout.">
              <input className={inputClass} defaultValue="8" />
            </Field>
            <div className="flex items-center justify-between rounded-xl border border-border bg-card p-3">
              <div className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-lg bg-muted">
                  <Shield className="size-4 text-navy" />
                </span>
                <div>
                  <p className="text-sm font-bold text-navy">MFA required for admin roles</p>
                  <p className="text-xs text-muted-foreground">Require multi-factor authentication for all admin users.</p>
                </div>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input type="checkbox" defaultChecked className="peer sr-only" />
                <span className="peer h-6 w-11 rounded-full bg-muted after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:bg-primary peer-checked:after:translate-x-5" />
              </label>
            </div>
          </div>
        </Panel>

        <Panel title="Notifications" info>
          <div className="space-y-4">
            <Field label="Low score alert threshold" hint="Accuracy percentage that triggers a low score alert.">
              <input className={inputClass} defaultValue="60" />
            </Field>
            <Field label="Digest email frequency" hint="How often summary emails are sent to managers.">
              <select className={inputClass}>
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
              </select>
            </Field>
          </div>
        </Panel>
      </div>

      <Panel className="mt-5" title="Feature Flags" info>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ADMIN_SYSTEM_SETTINGS.map((setting) => (
            <div key={setting.id} className="rounded-xl border border-border bg-card p-4">
              <p className="text-sm font-bold text-navy">{setting.name}</p>
              <p className="text-xs text-muted-foreground">{setting.category}</p>
              <p className="mt-2 text-sm font-semibold text-primary">{setting.value}</p>
            </div>
          ))}
        </div>
      </Panel>
    </AdminShell>
  );
}
