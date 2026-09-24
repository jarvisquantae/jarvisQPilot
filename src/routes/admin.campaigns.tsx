import { createFileRoute } from "@tanstack/react-router";
import { Megaphone } from "lucide-react";
import { AdminShell } from "@/components/layout/AdminShell";
import { ConsolePageTitle } from "@/components/layout/ConsoleShell";
import { Button } from "@/components/ui/button";
import { FilterBar, FilterSelect, Panel, Pill, TD, THead, TR, TableWrap } from "@/components/console/primitives";
import { ADMIN_CAMPAIGNS, ADMIN_FILTER_OPTIONS } from "@/data/admin";

export const Route = createFileRoute("/admin/campaigns")({
  head: () => ({
    meta: [
      { title: "Campaign Administration — Q-Pilot Admin" },
      { name: "description", content: "Administer campaigns across all Q-Pilot tenants and track platform-wide readiness." },
      { property: "og:title", content: "Campaign Administration — Q-Pilot Admin" },
      { property: "og:description", content: "Administer campaigns across all Q-Pilot tenants and track platform-wide readiness." },
    ],
  }),
  component: AdminCampaigns,
});

function AdminCampaigns() {
  return (
    <AdminShell searchPlaceholder="Search campaigns...">
      <ConsolePageTitle
        title="Campaign Administration"
        subtitle="All campaigns across tenants"
        actions={
          <Button size="sm">
            New campaign
          </Button>
        }
      />


      <FilterBar>
        <FilterSelect label="Tenant" options={ADMIN_FILTER_OPTIONS.tenant} />
        <FilterSelect label="Status" options={ADMIN_FILTER_OPTIONS.status} />
        <FilterSelect label="Quarter" options={ADMIN_FILTER_OPTIONS.quarter} />
        <button type="button" className="h-10 px-1 text-sm font-bold text-primary">
          Reset
        </button>
      </FilterBar>

      <Panel title="Campaigns" info>
        <TableWrap>
          <THead
            columns={[
              "Campaign",
              "Product",
              "Tenant",
              { label: "TMs", align: "right" },
              { label: "Practices", align: "right" },
              { label: "Accuracy", align: "right" },
              "Status",
            ]}
          />
          <tbody>
            {ADMIN_CAMPAIGNS.map((campaign) => (
              <TR key={campaign.id}>
                <TD strong>
                  <div className="flex items-center gap-2.5">
                    <span className="grid size-8 place-items-center rounded-lg bg-muted text-navy">
                      <Megaphone className="size-4" />
                    </span>
                    {campaign.name}
                  </div>
                </TD>
                <TD>{campaign.product}</TD>
                <TD>{campaign.tenant}</TD>
                <TD align="right">{campaign.tms}</TD>
                <TD align="right">{campaign.practices}</TD>
                <TD align="right" strong>
                  {campaign.accuracy}%
                </TD>
                <TD>
                  <Pill tone={campaign.status === "Published" ? "success" : "warning"}>{campaign.status}</Pill>
                </TD>
              </TR>
            ))}
          </tbody>
        </TableWrap>
      </Panel>
    </AdminShell>
  );
}
