import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CalendarDays,
  Download,
  Eye,
  FileText,
  Folder,
  Megaphone,
  Plus,
  Search,
  CheckCircle2,
  X,
} from "lucide-react";
import { MarketingShell } from "@/components/layout/MarketingShell";
import { ConsolePageTitle } from "@/components/layout/ConsoleShell";
import { Button } from "@/components/ui/button";
import { Pill, TD, THead, TR, TableWrap } from "@/components/console/primitives";
import { MM_BRAND_CAMPAIGNS, MM_CAMPAIGN_INPUT_PLAN, MM_INPUTS } from "@/data/marketing";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const Route = createFileRoute("/marketing/campaigns")({
  head: () => ({
    meta: [
      { title: "Campaigns — JARVIS Q-PILOT" },
      { name: "description", content: "Manage pharmaceutical brands, campaign inputs and execution plans." },
      { property: "og:title", content: "Campaigns — JARVIS Q-PILOT" },
      { property: "og:description", content: "Manage pharmaceutical brands, campaign inputs and execution plans." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MarketingCampaigns,
});

const toneClasses = {
  teal: "bg-mint text-primary",
  info: "bg-info-soft text-info",
  success: "bg-success-soft text-success",
  ai: "bg-ai-soft text-ai",
};

const brandResources = [
  { name: "Visual Aid Detailing Deck (Q2 Master)", type: "PDF Slide Deck", size: "14.2 MB", updated: "Jun 14, 2025" },
  { name: "AHA Clinical Evidence Reprint & Summary", type: "Clinical Reprint", size: "3.8 MB", updated: "Jun 10, 2025" },
  { name: "Patient Profile & Objection Handling Card", type: "Leave Behind", size: "1.5 MB", updated: "Jun 08, 2025" },
  { name: "Safety & Tolerability Prescribing Leaflet", type: "Prescribing Info", size: "850 KB", updated: "May 29, 2025" },
];

function MarketingCampaigns() {
  const [selectedBrandName, setSelectedBrandName] = useState("CARDIOCARE");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"Campaign Plan" | "Inputs" | "Execution Calendar" | "Resources">("Campaign Plan");
  const [previewInput, setPreviewInput] = useState<(typeof MM_CAMPAIGN_INPUT_PLAN)[number] | null>(null);

  const selectedBrand =
    MM_BRAND_CAMPAIGNS.find(
      (b) => b.name.toLowerCase() === selectedBrandName.toLowerCase() || b.name.includes(selectedBrandName)
    ) ?? MM_BRAND_CAMPAIGNS[0]!;

  const filteredPlan = MM_CAMPAIGN_INPUT_PLAN.filter((item) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.name.toLowerCase().includes(q) ||
      item.month.toLowerCase().includes(q) ||
      item.type.toLowerCase().includes(q) ||
      item.focus.toLowerCase().includes(q) ||
      item.status.toLowerCase().includes(q)
    );
  });

  return (
    <MarketingShell searchPlaceholder="Search campaigns...">
      <ConsolePageTitle title="Campaigns" subtitle="View and manage your marketing campaigns, inputs and execution plan." />

      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-semibold text-muted-foreground">
          Showing brand portfolio for <span className="font-bold text-navy">{selectedBrand.name}</span>
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <label className="relative min-w-56 flex-1 sm:flex-none">
            <span className="sr-only">Search brand or campaign</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 w-full rounded-xl border border-border bg-card pl-9 pr-3 text-sm text-navy placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:w-64"
              placeholder="Search plan or input..."
            />
          </label>
          <select
            aria-label="Filter by brand"
            value={selectedBrandName}
            onChange={(e) => {
              if (e.target.value === "All Brands") {
                setSelectedBrandName("CARDIOCARE");
              } else {
                setSelectedBrandName(e.target.value);
              }
            }}
            className="h-10 cursor-pointer rounded-xl border border-border bg-card px-3 text-sm font-semibold text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="All Brands">All Brands (4)</option>
            {MM_BRAND_CAMPAIGNS.map((b) => (
              <option key={b.name} value={b.name}>
                {b.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {MM_BRAND_CAMPAIGNS.map((brand) => {
          const isSelected =
            brand.name.toLowerCase() === selectedBrandName.toLowerCase() ||
            selectedBrand.name === brand.name;
          return (
            <button
              key={brand.name}
              type="button"
              onClick={() => {
                setSelectedBrandName(brand.name);
                toast.info(`Switched view to ${brand.name}`);
              }}
              className={cn(
                "card-surface group p-4 text-left transition-all hover:-translate-y-0.5 hover:shadow-card-hover",
                isSelected ? "border-primary ring-2 ring-primary/20" : "hover:border-primary/40"
              )}
            >
              <div className="flex items-start gap-3">
                <span className={cn("grid size-11 shrink-0 place-items-center rounded-full", toneClasses[brand.tone])}>
                  <Megaphone className="size-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <h2 className="font-extrabold text-navy">{brand.name}</h2>
                  <p className="mt-0.5 text-xs leading-snug text-muted-foreground">{brand.tagline}</p>
                </div>
                <ArrowRight
                  className={cn(
                    "size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5",
                    isSelected && "text-primary"
                  )}
                />
              </div>
              <div className="mt-5 flex items-end justify-between gap-3">
                <div className="flex-1">
                  <p className="text-xs font-semibold text-muted-foreground">{brand.campaigns} Campaigns</p>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${brand.progress}%` }} />
                  </div>
                </div>
                <span className="text-xs font-bold text-primary">{brand.progress}%</span>
              </div>
            </button>
          );
        })}
      </div>

      <section className="card-surface mt-5 overflow-hidden">
        <header className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
          <div>
            <h2 className="text-xl font-extrabold text-navy">{selectedBrand.name}</h2>
            <p className="text-sm text-muted-foreground">{selectedBrand.tagline}</p>
          </div>
          <Button size="sm" asChild>
            <Link to="/marketing/inputs">
              <Plus className="size-4" /> Create New Input
            </Link>
          </Button>
        </header>

        <nav className="flex overflow-x-auto border-y border-border px-4" aria-label="Campaign sections">
          {[
            { label: "Campaign Plan" as const, icon: CalendarDays },
            { label: "Inputs" as const, icon: FileText },
            { label: "Execution Calendar" as const, icon: CalendarDays },
            { label: "Resources" as const, icon: Folder },
          ].map((tab) => {
            const isActive = activeTab === tab.label;
            return (
              <button
                key={tab.label}
                type="button"
                onClick={() => setActiveTab(tab.label)}
                className={cn(
                  "inline-flex h-12 shrink-0 cursor-pointer items-center gap-2 border-b-2 px-4 text-xs font-bold transition-colors",
                  isActive
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-navy"
                )}
              >
                <tab.icon className="size-4" /> {tab.label}
              </button>
            );
          })}
        </nav>

        {activeTab === "Campaign Plan" && (
          <div>
            <div className="flex flex-wrap items-end justify-between gap-3 px-5 py-4">
              <div>
                <h3 className="font-bold text-navy">Q2 2025 Campaign Plan</h3>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Track campaign inputs and ensure every visit is ready for the field.
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setActiveTab("Execution Calendar");
                  toast.info("Switched to calendar view");
                }}
              >
                <CalendarDays className="size-4" /> View as Calendar
              </Button>
            </div>

            <TableWrap>
              <THead
                columns={[
                  "Month",
                  "Visit",
                  "Input Name",
                  "Input Type",
                  "Key Focus",
                  "Status",
                  { label: "Actions", align: "right" },
                ]}
              />
              <tbody>
                {filteredPlan.map((input) => (
                  <TR key={input.name}>
                    <TD>{input.month}</TD>
                    <TD>{input.visit}</TD>
                    <TD strong>{input.name}</TD>
                    <TD>
                      <span className="inline-flex items-center gap-2">
                        <FileText className="size-4 text-primary" />
                        {input.type}
                      </span>
                    </TD>
                    <TD>{input.focus}</TD>
                    <TD>
                      <Pill
                        tone={
                          input.status === "Published"
                            ? "success"
                            : input.status === "In Progress"
                              ? "warning"
                              : "muted"
                        }
                      >
                        {input.status}
                      </Pill>
                    </TD>
                    <TD align="right">
                      <div className="inline-flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setPreviewInput(input)}
                        >
                          <Eye className="size-3.5" /> Preview
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <Link to="/marketing/inputs">
                            {input.status === "Published"
                              ? "View"
                              : input.status === "In Progress"
                                ? "Edit"
                                : "Create"}
                          </Link>
                        </Button>
                      </div>
                    </TD>
                  </TR>
                ))}
                {filteredPlan.length === 0 && (
                  <TR>
                    <TD colSpan={7} className="py-8 text-center text-muted-foreground">
                      No campaign plan inputs match your search query "{searchQuery}".
                    </TD>
                  </TR>
                )}
              </tbody>
            </TableWrap>
          </div>
        )}

        {activeTab === "Inputs" && (
          <div className="p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-navy">Approved & Pending Brand Inputs</h3>
                <p className="text-xs text-muted-foreground">
                  Promotional collateral ready for field deployment.
                </p>
              </div>
              <Button size="sm" asChild>
                <Link to="/marketing/inputs">
                  <Plus className="size-4" /> Add Input
                </Link>
              </Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {MM_INPUTS.map((doc) => (
                <div key={doc.name} className="flex flex-col justify-between rounded-xl border border-border bg-card p-4 shadow-sm">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <span className="grid size-9 place-items-center rounded-lg bg-mint text-primary">
                        <FileText className="size-5" />
                      </span>
                      <Pill
                        tone={
                          doc.status === "Processed"
                            ? "success"
                            : doc.status === "Processing"
                              ? "info"
                              : "warning"
                        }
                      >
                        {doc.status}
                      </Pill>
                    </div>
                    <h4 className="mt-3 font-bold text-navy">{doc.name}</h4>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {doc.type} · {doc.size}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      By {doc.uploadedBy} on {doc.date}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                    <span className="text-xs font-semibold text-primary">{doc.product}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toast.success(`Downloaded ${doc.name}`)}
                    >
                      <Download className="size-3.5" /> Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "Execution Calendar" && (
          <div className="p-5">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="font-bold text-navy">{selectedBrand.name} — Q2 Detailing Calendar</h3>
                <p className="text-xs text-muted-foreground">
                  Scheduled detailing, digital aids, and sampling touchpoints.
                </p>
              </div>
              <Button size="sm" asChild>
                <Link to="/marketing/calendar">Open Full Distribution Calendar</Link>
              </Button>
            </div>
            <div className="rounded-2xl border border-border bg-muted/20 p-4">
              <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-muted-foreground mb-2">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                  <div key={d} className="py-1">
                    {d}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 28 }, (_, i) => {
                  const day = i + 1;
                  const hasActivity = [3, 7, 12, 16, 21, 25].includes(day);
                  return (
                    <div
                      key={day}
                      className={cn(
                        "flex min-h-16 flex-col justify-between rounded-xl border p-2 text-xs transition-colors",
                        hasActivity
                          ? "border-primary/40 bg-card shadow-sm"
                          : "border-border/60 bg-card/60 text-muted-foreground"
                      )}
                    >
                      <span className="font-bold text-navy">{day}</span>
                      {hasActivity && (
                        <span className="mt-1 block truncate rounded bg-mint px-1 py-0.5 text-[10px] font-bold text-primary">
                          Detailing
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === "Resources" && (
          <div className="p-5">
            <div className="mb-4">
              <h3 className="font-bold text-navy">{selectedBrand.name} Brand Assets & Scientific Collateral</h3>
              <p className="text-xs text-muted-foreground">
                Download approved resources for field and marketing campaigns.
              </p>
            </div>
            <div className="divide-y divide-border rounded-xl border border-border bg-card">
              {brandResources.map((res) => (
                <div key={res.name} className="flex flex-wrap items-center justify-between gap-3 p-4">
                  <div className="flex items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
                      <FileText className="size-5" />
                    </span>
                    <div>
                      <p className="text-sm font-bold text-navy">{res.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {res.type} · {res.size} · Updated {res.updated}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      toast.success(`Started download for ${res.name}`);
                    }}
                  >
                    <Download className="size-3.5" /> Download
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Input Preview Modal */}
      {previewInput && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-xl">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  {previewInput.month} · {previewInput.visit}
                </span>
                <h3 className="mt-1 text-xl font-bold text-navy">{previewInput.name}</h3>
              </div>
              <button
                type="button"
                onClick={() => setPreviewInput(null)}
                className="grid size-8 place-items-center rounded-lg text-muted-foreground hover:bg-muted"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="mt-4 space-y-3 rounded-xl border border-border bg-muted/30 p-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Type:</span>
                <span className="font-semibold text-navy">{previewInput.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Core Focus:</span>
                <span className="font-semibold text-navy text-right">{previewInput.focus}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <Pill tone={previewInput.status === "Published" ? "success" : "warning"}>
                  {previewInput.status}
                </Pill>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Field Compliance:</span>
                <span className="inline-flex items-center gap-1 font-semibold text-success">
                  <CheckCircle2 className="size-3.5" /> Verified
                </span>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => setPreviewInput(null)}>
                Close
              </Button>
              <Button size="sm" asChild onClick={() => setPreviewInput(null)}>
                <Link to="/marketing/inputs">Edit in Creator</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </MarketingShell>
  );
}