import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Shield, User, UserPlus } from "lucide-react";
import { AdminShell } from "@/components/layout/AdminShell";
import { ConsolePageTitle } from "@/components/layout/ConsoleShell";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FilterBar, FilterSelect, Panel, Pill, TD, THead, TR, TableWrap } from "@/components/console/primitives";
import { ADMIN_FILTER_OPTIONS, ADMIN_USERS } from "@/data/admin";
import { toast } from "sonner";

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
  const [users, setUsers] = useState(ADMIN_USERS);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Territory Manager");

  const handleSendInvite = () => {
    if (!name.trim() || !email.trim()) {
      toast.error("Please provide both name and email.");
      return;
    }
    const newUser = {
      id: `usr-${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      role,
      tenant: "Apex Pharma Global",
      region: "North Zone",
      status: "Pending",
      lastActive: "Invited just now",
    };
    setUsers((prev) => [newUser, ...prev]);
    setName("");
    setEmail("");
    setInviteOpen(false);
    toast.success(`Invitation sent to ${email} for role ${role}!`);
  };

  return (
    <AdminShell searchPlaceholder="Search users...">
      <ConsolePageTitle
        title="User Management"
        subtitle="All users across tenants and roles"
        actions={
          <Button size="sm" onClick={() => setInviteOpen(true)} className="cursor-pointer">
            <UserPlus className="size-4" /> Invite user
          </Button>
        }
      />

      <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Invite Platform User</DialogTitle>
            <DialogDescription>
              Send an onboarding invitation with role-based workspace permissions.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <label className="block space-y-1.5">
              <span className="text-xs font-bold text-navy">Full Name</span>
              <input
                type="text"
                placeholder="e.g. Dr. Ramesh Gupta"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-10 w-full rounded-xl border border-border bg-card px-3 text-sm text-navy placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </label>
            <label className="block space-y-1.5">
              <span className="text-xs font-bold text-navy">Email Address</span>
              <input
                type="email"
                placeholder="rep.name@pharma.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-10 w-full rounded-xl border border-border bg-card px-3 text-sm text-navy placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </label>
            <label className="block space-y-1.5">
              <span className="text-xs font-bold text-navy">Role Assignment</span>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="h-10 w-full rounded-xl border border-border bg-card px-3 text-sm text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="Territory Manager">Territory Manager (TM)</option>
                <option value="Marketing Manager">Marketing Manager (MM)</option>
                <option value="Sales Manager">Sales Manager (SM)</option>
                <option value="Super Admin">Super Admin (ADMIN)</option>
              </select>
            </label>
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setInviteOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSendInvite}>Send Invitation</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>


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
            {users.map((user) => (
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
