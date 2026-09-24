import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Shield, User } from "lucide-react";
import { AdminShell } from "@/components/layout/AdminShell";
import { ConsolePageTitle } from "@/components/layout/ConsoleShell";
import { Button } from "@/components/ui/button";
import { FilterBar, FilterSelect, Panel, Pill, TD, THead, TR, TableWrap } from "@/components/console/primitives";
import { ADMIN_FILTER_OPTIONS, ADMIN_USERS } from "@/data/admin";

export const Route = createFileRoute("/admin/users")({
  head: () => ({
    meta: [
      { title: "User Management — Q-Pilot Admin" },
      { name: "description", content: "Manage users, roles, and tenant assignments across the Q-Pilot platform." },
      { property: "og:title", content: "User Management — Q-Pilot Admin" },
      { property: "og:description", content: "Manage users, roles, and tenant assignments across the Q-Pilot platform." },
    ],
  }),
  component: AdminUsers,
});

function AdminUsers() {
  return (
    <AdminShell searchPlaceholder="Search users...">
      <ConsolePageTitle
        title="User Management"
        subtitle="All users across tenants and roles"
        actions={
          <Button size="sm">
            Invite user
          </Button>
        }
      />


      <FilterBar>
        <FilterSelect label="Tenant" options={ADMIN_FILTER_OPTIONS.tenant} />
        <FilterSelect label="Role" options={ADMIN_FILTER_OPTIONS.role} />
        <FilterSelect label="Region" options={ADMIN_FILTER_OPTIONS.region} />
        <FilterSelect label="Status" options={ADMIN_FILTER_OPTIONS.status} />
        <button type="button" className="h-10 px-1 text-sm font-bold text-primary">
          Reset
        </button>
      </FilterBar>

      <Panel title="Users" info>
        <TableWrap>
          <THead columns={["Name", "Email", "Role", "Tenant", "Region", "Status", "Last Active"]} />
          <tbody>
            {ADMIN_USERS.map((user) => (
              <TR key={user.id}>
                <TD strong>
                  <div className="flex items-center gap-2.5">
                    <span className="grid size-8 place-items-center rounded-full bg-muted text-xs font-bold text-navy">
                      <User className="size-4" />
                    </span>
                    {user.name}
                  </div>
                </TD>
                <TD>
                  <span className="inline-flex items-center gap-1.5">
                    <Mail className="size-3.5 text-muted-foreground" />
                    {user.email}
                  </span>
                </TD>
                <TD>{user.role}</TD>
                <TD>{user.tenant}</TD>
                <TD>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="size-3.5 text-muted-foreground" />
                    {user.region}
                  </span>
                </TD>
                <TD>
                  <Pill
                    tone={
                      user.status === "Active" ? "success" : user.status === "Pending" ? "warning" : "danger"
                    }
                  >
                    {user.status}
                  </Pill>
                </TD>
                <TD>{user.lastActive}</TD>
              </TR>
            ))}
          </tbody>
        </TableWrap>
      </Panel>
    </AdminShell>
  );
}
