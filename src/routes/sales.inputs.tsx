import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Target } from "lucide-react";
import { SalesShell } from "@/components/layout/SalesShell";
import { PageHeader, SectionCard } from "@/components/common/Layout";
import { Button } from "@/components/ui/button";
import { FilterBar, SelectFilter } from "@/components/sales/primitives";
import { TMPerformanceTable } from "@/components/sales/TMPerformanceTable";
import { brands } from "@/data/sales";

export const Route = createFileRoute("/sales/inputs")({
  head: () => ({
    meta: [
      { title: "Brand Inputs — Q-Pilot Sales Manager" },
      {
        name: "description",
        content:
          "See how each territory manager performs on a selected brand input, by HQ, region and zone.",
      },
      { property: "og:title", content: "Brand Inputs — Q-Pilot Sales Manager" },
      {
        property: "og:description",
        content: "Brand-level input performance across your territory managers.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BrandInputs,
});

const BRAND_OPTIONS = brands.map((brand) => brand.name);
const INPUT_OPTIONS = [
  "Clinical Evidence Deck v3",
  "Dosing & Titration Guide",
  "Objection Handling Sheet",
];

function BrandInputs() {
  const [brand, setBrand] = useState(BRAND_OPTIONS[0]!);
  const [input, setInput] = useState(INPUT_OPTIONS[0]!);

  return (
    <SalesShell>
      <div className="space-y-6">
        <PageHeader
          title="Brand Input Performance"
          subtitle="Check how your team is delivering a specific brand input."
          actions={
            <Button variant="outline" asChild>
              <Link to="/sales/reports">Export</Link>
            </Button>
          }
        />

        <FilterBar>
          <SelectFilter label="Brand" options={BRAND_OPTIONS} value={brand} onChange={setBrand} />
          <SelectFilter label="Input" options={INPUT_OPTIONS} value={input} onChange={setInput} />
        </FilterBar>

        <SectionCard
          title="TMs Performance Board"
          subtitle={`${brand} — ${input}`}
          icon={<Target className="size-5" />}
        >
          <TMPerformanceTable />
        </SectionCard>
      </div>
    </SalesShell>
  );
}
