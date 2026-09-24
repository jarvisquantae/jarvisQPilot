import { createFileRoute } from "@tanstack/react-router";
import { Check, Key, Lock, Shield, TriangleAlert } from "lucide-react";
import { AdminShell } from "@/components/layout/AdminShell";
import { ConsolePageTitle } from "@/components/layout/ConsoleShell";
import { Button } from "@/components/ui/button";
import { Panel, Pill, StatTile } from "@/components/console/primitives";
import { ADMIN_SECURITY_STATUS } from "@/data/admin";

export const Route = createFileRoute("/admin/security")({
  head: () => ({
    meta: [
      { title: "Security & Compliance — Q-Pilot Admin" },
      { name: "description", content: "Security posture, compliance controls, and access reviews for the Q-Pilot platform." },
      { property: "og:title", content: "Security & Compliance — Q-Pilot Admin" },
      { property: "og:description", content: "Security posture, compliance controls, and access reviews for the Q-Pilot platform." },
    ],
  }),
  component: AdminSecurity,
});

function AdminSecurity() {
  return (
    <AdminShell searchPlaceholder="Search security settings...">
      <ConsolePageTitle
        title="Security & Compliance"
        subtitle="Posture, controls, and access reviews"
        actions={
          <Button size="sm">
            <Key className="mr-1.5 size-4" />
            Run access review
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile label="MFA Coverage" value="72" suffix="%" note="of admin users enrolled" tone="warning" icon={<Shield className="size-5" />} />
        <StatTile label="Failed Logins (24h)" value="14" note="3 IPs flagged" tone="danger" icon={<TriangleAlert className="size-5" />} />
        <StatTile label="Password Policy" value="Strong" note="min 12 chars, complexity on" tone="success" icon={<Lock className="size-5" />} />
        <StatTile label="Access Reviews" value="3" note="pending approvals" tone="info" icon={<Check className="size-5" />} />
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <Panel title="Security Status" info>
          <div className="space-y-3">
            {ADMIN_SECURITY_STATUS.map((item) => (
              <div key={item.label} className="flex items-center justify-between rounded-xl border border-border bg-card p-3">
                <span className="text-sm font-semibold text-navy">{item.label}</span>
                <Pill tone={item.tone}>{item.state}</Pill>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Compliance Controls" info>
          <div className="space-y-3">
            {[
              { label: "GDPR data processing agreement", status: "Signed", tone: "success" as const },
              { label: "SOC 2 Type II audit", status: "In progress", tone: "warning" as const },
              { label: "HIPAA Business Associate Agreement", status: "Not applicable", tone: "muted" as const },
              { label: "Annual penetration test", status: "Completed May 2025", tone: "success" as const },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between rounded-xl border border-border bg-card p-3">
                <span className="text-sm font-semibold text-navy">{item.label}</span>
                <Pill tone={item.tone}>{item.status}</Pill>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </AdminShell>
  );
}
