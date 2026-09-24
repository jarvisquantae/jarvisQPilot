import { createFileRoute } from "@tanstack/react-router";
import { Building2, Calendar, Globe, Users } from "lucide-react";
import { AdminShell } from "@/components/layout/AdminShell";
import { ConsolePageTitle } from "@/components/layout/ConsoleShell";
import { Button } from "@/components/ui/button";
import { FilterBar, FilterSelect, Panel, Pill, TD, THead, TR, TableWrap } from "@/components/console/primitives";
import { ADMIN_FILTER_OPTIONS, ADMIN_TENANTS } from "@/data/admin";

export const Route = createFileRoute("/admin/tenants")({
  head: () => ({
    meta: [
      { title: "Tenants & Regions — Q-Pilot Admin" },
      { name: "description", content: "Manage tenants, regions, and subscription plans across the Q-Pilot platform." },
      { property: "og:title", content: "Tenants & Regions — Q-Pilot Admin" },
      { property: "og:description", content: "Manage tenants, regions, and subscription plans across the Q-Pilot platform." },
    ],
  }),
  component: AdminTenants,
});

function AdminTenants() {
  return (
    <AdminShell searchPlaceholder="Search tenants...">
      <ConsolePageTitle
        title="Tenants & Regions"
        subtitle="Organizations, regions, and subscription plans"
        actions={
          <Button size="sm">
            Add tenant
          </Button>
        }
      />


      <FilterBar>
        <FilterSelect label="Region" options={ADMIN_FILTER_OPTIONS.region} />
        <FilterSelect label="Status" options={ADMIN_FILTER_OPTIONS.status} />
        <button type="button" className="h-10 px-1 text-sm font-bold text-primary">
          Reset
        </button>
      </FilterBar>

      <Panel title="Tenants" info>
        <TableWrap>
          <THead
            columns={[
              "Tenant",
              "Slug",
              "Region",
              "Plan",
              { label: "Users", align: "right" },
              { label: "Admins", align: "right" },
              "Status",
              "Created",
            ]}
          />
          <tbody>
            {ADMIN_TENANTS.map((tenant) => (
              <TR key={tenant.id}>
                <TD strong>
                  <div className="flex items-center gap-2.5">
                    <span className="grid size-8 place-items-center rounded-lg bg-muted text-navy">
                      <Building2 className="size-4" />
                    </span>
                    {tenant.name}
                  </div>
                </TD>
                <TD>{tenant.slug}</TD>
                <TD>
                  <span className="inline-flex items-center gap-1.5">
                    <Globe className="size-3.5 text-muted-foreground" />
                    {tenant.region}
                  </span>
                </TD>
                <TD>{tenant.plan}</TD>
                <TD align="right">{tenant.users}</TD>
                <TD align="right">{tenant.admins}</TD>
                <TD>
                  <Pill
                    tone={
                      tenant.status === "Active" ? "success" : tenant.status === "Pilot" ? "info" : "warning"
                    }
                  >
                    {tenant.status}
                  </Pill>
                </TD>
                <TD>{tenant.created}</TD>
              </TR>
            ))}
          </tbody>
        </TableWrap>
      </Panel>
    </AdminShell>
  );
}
