import { createFileRoute } from "@tanstack/react-router";
import { Clock, FileText, User } from "lucide-react";
import { AdminShell } from "@/components/layout/AdminShell";
import { ConsolePageTitle } from "@/components/layout/ConsoleShell";
import { FilterBar, FilterSelect, Panel, TD, THead, TR, TableWrap } from "@/components/console/primitives";
import { ADMIN_AUDIT_TRAIL, ADMIN_FILTER_OPTIONS } from "@/data/admin";

export const Route = createFileRoute("/admin/audit")({
  head: () => ({
    meta: [
      { title: "Audit Trail — Q-Pilot Admin" },
      { name: "description", content: "Platform-wide audit trail for user actions, system events, and data changes." },
      { property: "og:title", content: "Audit Trail — Q-Pilot Admin" },
      { property: "og:description", content: "Platform-wide audit trail for user actions, system events, and data changes." },
    ],
  }),
  component: AdminAudit,
});

function AdminAudit() {
  return (
    <AdminShell searchPlaceholder="Search audit events...">
      <ConsolePageTitle
        title="Audit Trail"
        subtitle="Platform-wide activity and change history"
      />

      <FilterBar>
        <FilterSelect label="Tenant" options={ADMIN_FILTER_OPTIONS.tenant} />
        <FilterSelect label="Module" options={["All Modules", "Campaigns", "Inputs", "Pitch Library", "Practice", "Performance", "Security", "Vocabulary Bank"]} />
        <FilterSelect label="Date range" options={["Last 7 days", "Last 30 days", "Last 90 days", "Custom"]} />
        <button type="button" className="h-10 px-1 text-sm font-bold text-primary">
          Reset
        </button>
      </FilterBar>

      <Panel title="Audit Events" info>
        <TableWrap>
          <THead columns={["Timestamp", "User", "Tenant", "Module", "Action", "Detail"]} />
          <tbody>
            {ADMIN_AUDIT_TRAIL.map((event) => (
              <TR key={event.id}>
                <TD>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="size-3.5 text-muted-foreground" />
                    {event.at}
                  </span>
                </TD>
                <TD strong>
                  <span className="inline-flex items-center gap-1.5">
                    <User className="size-3.5 text-muted-foreground" />
                    {event.user}
                  </span>
                </TD>
                <TD>{event.tenant}</TD>
                <TD>
                  <span className="inline-flex items-center gap-1.5">
                    <FileText className="size-3.5 text-muted-foreground" />
                    {event.module}
                  </span>
                </TD>
                <TD strong>{event.action}</TD>
                <TD>{event.detail}</TD>
              </TR>
            ))}
          </tbody>
        </TableWrap>
      </Panel>
    </AdminShell>
  );
}
