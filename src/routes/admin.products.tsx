import { createFileRoute } from "@tanstack/react-router";
import { Pill as PillIcon } from "lucide-react";
import { AdminShell } from "@/components/layout/AdminShell";
import { ConsolePageTitle } from "@/components/layout/ConsoleShell";
import { Button } from "@/components/ui/button";
import { FilterBar, FilterSelect, Panel, Pill, TD, THead, TR, TableWrap } from "@/components/console/primitives";
import { ADMIN_FILTER_OPTIONS, ADMIN_PRODUCTS } from "@/data/admin";

export const Route = createFileRoute("/admin/products")({
  head: () => ({
    meta: [
      { title: "Product Catalog — Q-Pilot Admin" },
      { name: "description", content: "Manage the master product catalog and therapeutic indications for Q-Pilot." },
      { property: "og:title", content: "Product Catalog — Q-Pilot Admin" },
      { property: "og:description", content: "Manage the master product catalog and therapeutic indications for Q-Pilot." },
    ],
  }),
  component: AdminProducts,
});

function AdminProducts() {
  return (
    <AdminShell searchPlaceholder="Search products...">
      <ConsolePageTitle
        title="Product Catalog"
        subtitle="Master product list and therapeutic indications"
        actions={
          <Button size="sm">
            Add product
          </Button>
        }
      />

      <FilterBar>
        <FilterSelect label="Specialty" options={["All Specialties", "Cardiology", "Neurology", "Pulmonology", "Endocrinology", "Oncology"]} />
        <FilterSelect label="Status" options={ADMIN_FILTER_OPTIONS.status} />
        <button type="button" className="h-10 px-1 text-sm font-bold text-primary">
          Reset
        </button>
      </FilterBar>

      <Panel title="Products" info>
        <TableWrap>
          <THead
            columns={[
              "Product",
              "Molecule",
              "Indication",
              "Specialty",
              { label: "Tenants", align: "right" },
              { label: "Pitches", align: "right" },
              "Status",
            ]}
          />
          <tbody>
            {ADMIN_PRODUCTS.map((product) => (
              <TR key={product.id}>
                <TD strong>
                  <div className="flex items-center gap-2.5">
                    <span className="grid size-8 place-items-center rounded-lg bg-muted text-navy">
                      <PillIcon className="size-4" />
                    </span>
                    {product.name}
                  </div>
                </TD>
                <TD>{product.molecule}</TD>
                <TD>{product.indication}</TD>
                <TD>{product.specialty}</TD>
                <TD align="right">{product.tenants}</TD>
                <TD align="right">{product.pitches}</TD>
                <TD>
                  <Pill tone={product.status === "Active" ? "success" : "info"}>{product.status}</Pill>
                </TD>
              </TR>
            ))}
          </tbody>
        </TableWrap>
      </Panel>
    </AdminShell>
  );
}

