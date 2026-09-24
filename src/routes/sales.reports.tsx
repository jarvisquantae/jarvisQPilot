import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Download, FileBarChart, FileText, History } from "lucide-react";
import { SalesShell } from "@/components/layout/SalesShell";
import { IconWell, PageHeader, SectionCard } from "@/components/common/Layout";
import { Button } from "@/components/ui/button";
import {
  FilterBar,
  SelectFilter,
  Table,
  Td,
  Th,
  TextBadge,
  Tr,
} from "@/components/sales/primitives";
import { QUARTERS, QUARTER_LABEL } from "@/data/mock";
import {
  brands,
  exportFormats,
  generatedReports,
  HQS,
  REGIONS,
  reportTypes,
} from "@/data/sales";

export const Route = createFileRoute("/sales/reports")({
  head: () => ({
    meta: [
      { title: "Reports & Exports — Q-Pilot Sales Manager" },
      {
        name: "description",
        content:
          "Generate team performance, brand, readiness and coaching reports and export them as PDF, Excel or CSV.",
      },
      { property: "og:title", content: "Reports & Exports — Q-Pilot Sales Manager" },
      {
        property: "og:description",
        content: "Build filtered reports for your team and download them in one click.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Reports,
});

const BRAND_FILTERS = ["All Brands", ...brands.map((brand) => brand.name)];

function Reports() {
  const [quarter, setQuarter] = useState(QUARTER_LABEL);
  const [region, setRegion] = useState(REGIONS[0]!);
  const [hq, setHq] = useState(HQS[0]!);
  const [brand, setBrand] = useState(BRAND_FILTERS[0]!);
  const [selected, setSelected] = useState(reportTypes[0]!.id);

  return (
    <SalesShell>
      <div className="space-y-6">
        <PageHeader
          title="Reports & Exports"
          subtitle="Package team intelligence for reviews, cycle meetings and leadership updates."
        />

        <FilterBar>
          <SelectFilter label="Quarter" options={QUARTERS} value={quarter} onChange={setQuarter} />
          <SelectFilter label="Region" options={REGIONS} value={region} onChange={setRegion} />
          <SelectFilter label="HQ" options={HQS} value={hq} onChange={setHq} />
          <SelectFilter label="Brand" options={BRAND_FILTERS} value={brand} onChange={setBrand} />
        </FilterBar>

        <SectionCard
          title="Select Report Type"
          subtitle="Pick what you want to generate for the selected filters"
          icon={<FileBarChart className="size-5" />}
        >
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {reportTypes.map((report) => {
              const active = report.id === selected;
              return (
                <button
                  key={report.id}
                  type="button"
                  onClick={() => setSelected(report.id)}
                  className={`rounded-2xl border p-4 text-left transition-colors ${
                    active
                      ? "border-primary bg-mint/60 shadow-soft"
                      : "border-border bg-surface-2 hover:bg-muted"
                  }`}
                >
                  <IconWell tone={report.tone}>
                    <FileText className="size-5" />
                  </IconWell>
                  <h3 className="mt-3 text-sm font-bold text-navy">{report.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{report.body}</p>
                </button>
              );
            })}
          </div>
        </SectionCard>

        <SectionCard
          title="Export Format"
          subtitle={`${reportTypes.find((item) => item.id === selected)?.title} · ${quarter}`}
          icon={<Download className="size-5" />}
        >
          <div className="grid gap-4 md:grid-cols-3">
            {exportFormats.map((format) => (
              <article
                key={format.id}
                className="flex items-center gap-3 rounded-2xl border border-border bg-surface-2 p-4"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-navy text-[11px] font-bold text-navy-foreground">
                  {format.badge}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-navy">{format.label}</p>
                  <p className="text-xs text-muted-foreground">{format.body}</p>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="size-4" />
                </Button>
              </article>
            ))}
          </div>
          <p className="mt-4 text-xs font-medium text-muted-foreground">
            Filters applied: {quarter} · {region} · {hq} · {brand}
          </p>
        </SectionCard>

        <SectionCard title="Previously Generated" icon={<History className="size-5" />}>
          <Table minWidth={720}>
            <thead>
              <tr>
                <Th>Report Name</Th>
                <Th>Created On</Th>
                <Th>Filters Applied</Th>
                <Th align="right">Download</Th>
              </tr>
            </thead>
            <tbody>
              {generatedReports.map((report) => (
                <Tr key={report.id}>
                  <Td>
                    <span className="font-bold text-navy">{report.name}</span>
                  </Td>
                  <Td>
                    <span className="text-xs font-semibold text-muted-foreground">
                      {report.createdOn}
                    </span>
                  </Td>
                  <Td>
                    <span className="text-xs font-medium text-muted-foreground">
                      {report.filters}
                    </span>
                  </Td>
                  <Td align="right">
                    <div className="flex justify-end gap-2">
                      <TextBadge label="Ready" tone="success" />
                      <Button variant="outline" size="sm">
                        <Download className="size-4" /> PDF
                      </Button>
                    </div>
                  </Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        </SectionCard>
      </div>
    </SalesShell>
  );
}
