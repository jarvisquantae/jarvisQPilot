import { createFileRoute } from "@tanstack/react-router";
import { Check, Lock, X } from "lucide-react";
import { AdminShell } from "@/components/layout/AdminShell";
import { ConsolePageTitle } from "@/components/layout/ConsoleShell";
import { Button } from "@/components/ui/button";
import { Panel, Pill } from "@/components/console/primitives";
import { ADMIN_ROLES } from "@/data/admin";

export const Route = createFileRoute("/admin/roles")({
  head: () => ({
    meta: [
      { title: "Roles & Permissions — Q-Pilot Admin" },
      { name: "description", content: "Define roles and permission scopes for Q-Pilot platform users." },
      { property: "og:title", content: "Roles & Permissions — Q-Pilot Admin" },
      { property: "og:description", content: "Define roles and permission scopes for Q-Pilot platform users." },
    ],
  }),
  component: AdminRoles,
});

function AdminRoles() {
  return (
    <AdminShell searchPlaceholder="Search roles...">
      <ConsolePageTitle
        title="Roles & Permissions"
        subtitle="Platform roles and their access scopes"
        actions={
          <Button size="sm">
            Create role
          </Button>
        }
      />


      <div className="grid gap-5 lg:grid-cols-2">
        {ADMIN_ROLES.map((role) => (
          <Panel key={role.id} title={role.name} info actions={<Pill tone="info">{role.users} users</Pill>}>
            <p className="text-sm text-muted-foreground">{role.description}</p>
            <div className="mt-4 overflow-hidden rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="px-4 py-2.5 text-left text-xs font-bold text-muted-foreground">Module</th>
                    <th className="px-4 py-2.5 text-left text-xs font-bold text-muted-foreground">Access</th>
                  </tr>
                </thead>
                <tbody>
                  {role.permissions.map((permission) => (
                    <tr key={permission.module} className="border-b border-border last:border-0">
                      <td className="px-4 py-2.5 font-semibold text-navy">{permission.module}</td>
                      <td className="px-4 py-2.5 text-muted-foreground">{permission.access}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>
        ))}
      </div>
    </AdminShell>
  );
}
