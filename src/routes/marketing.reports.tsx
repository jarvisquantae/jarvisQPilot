import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BarChart3,
  CheckCircle2,
  ClipboardCheck,
  Download,
  FileSpreadsheet,
  FileText,
  Info,
  LineChart,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Target,
  TriangleAlert,
  Users,
  X,
} from "lucide-react";
import { MarketingShell } from "@/components/layout/MarketingShell";
import { ConsolePageTitle } from "@/components/layout/ConsoleShell";
import {
  Field,
  Panel,
  TD,
  THead,
  TR,
  TableWrap,
  inputClass,
} from "@/components/console/primitives";
import { Button } from "@/components/ui/button";
import { MM_AUDIT_TRAIL, MM_FILTER_OPTIONS, MM_NOTIFICATIONS, MM_REPORTS } from "@/data/marketing";
import { toast } from "sonner";

export const Route = createFileRoute("/marketing/reports")({
  head: () => ({
    meta: [
      { title: "Reports & Notifications — Q-Pilot Marketing" },
      {
        name: "description",
        content: "Export campaign, readiness and vocabulary reports, and follow the Q-Pilot marketing audit trail.",
      },
      { property: "og:title", content: "Reports & Notifications — Q-Pilot Marketing" },
      { property: "og:description", content: "Scheduled report exports, notifications and full audit trail." },
    ],
  }),
  component: MarketingReports,
});

const reportIcons = [
  BarChart3,
  Users,
  FileText,
  Target,
  FileSpreadsheet,
  ShieldCheck,
  LineChart,
  ClipboardCheck,
];

const notificationIcon = (tone: string) =>
  tone === "success"
    ? CheckCircle2
    : tone === "info"
      ? Info
      : tone === "warning"
        ? TriangleAlert
        : Sparkles;

const notificationColor = (tone: string) =>
  tone === "success"
    ? "text-success"
    : tone === "info"
      ? "text-info"
      : tone === "warning"
        ? "text-warning"
        : "text-ai";

function MarketingReports() {
  const [reportTypeFilter, setReportTypeFilter] = useState("All");
  const [quarterFilter, setQuarterFilter] = useState(MM_FILTER_OPTIONS.quarter[0]);
  const [campaignFilter, setCampaignFilter] = useState("All");
  const [productFilter, setProductFilter] = useState("All");
  const [smFilter, setSmFilter] = useState("All");
  const [tmFilter, setTmFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const [viewReport, setViewReport] = useState<(typeof MM_REPORTS)[number] | null>(null);

  const handleClearFilters = () => {
    setReportTypeFilter("All");
    setQuarterFilter(MM_FILTER_OPTIONS.quarter[0]);
    setCampaignFilter("All");
    setProductFilter("All");
    setSmFilter("All");
    setTmFilter("All");
    setSearchQuery("");
    toast.info("All report filters reset");
  };

  const filteredReports = MM_REPORTS.filter((rep) => {
    if (reportTypeFilter !== "All") {
      if (reportTypeFilter === "Performance" && !rep.name.toLowerCase().includes("performance") && !rep.name.toLowerCase().includes("trend")) return false;
      if (reportTypeFilter === "Readiness" && !rep.name.toLowerCase().includes("readiness")) return false;
      if (reportTypeFilter === "Vocabulary" && !rep.name.toLowerCase().includes("vocabulary")) return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        rep.name.toLowerCase().includes(q) ||
        rep.scope.toLowerCase().includes(q) ||
        rep.format.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleExport = (report: (typeof MM_REPORTS)[number]) => {
    // Generate simple downloadable file
    const content = `Report Name: ${report.name}\nScope: ${report.scope}\nFormat: ${report.format}\nGenerated At: ${new Date().toLocaleString()}\nQuarter: ${quarterFilter}\nCampaign: ${campaignFilter}\nStatus: Verified\n`;
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${report.name.toLowerCase().replace(/\s+/g, "_")}.${report.format.toLowerCase() === "pdf" ? "pdf" : "csv"}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success(`Exported ${report.name} (${report.format})`);
  };

  return (
    <MarketingShell searchPlaceholder="Search reports...">
      <ConsolePageTitle title="Reports & Notifications" />

      <div className="grid gap-5 xl:grid-cols-[1.5fr_1fr]">
        <div className="space-y-5">
          <Panel
            title="Filters"
            actions={
              <button
                type="button"
                onClick={handleClearFilters}
                className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-bold text-primary hover:underline"
              >
                <RefreshCw className="size-3.5" /> Clear filters
              </button>
            }
          >
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Field label="Report Type">
                <select
                  value={reportTypeFilter}
                  onChange={(e) => setReportTypeFilter(e.target.value)}
                  className={inputClass}
                >
                  <option value="All">All Types</option>
                  <option value="Performance">Performance</option>
                  <option value="Readiness">Readiness</option>
                  <option value="Vocabulary">Vocabulary</option>
                </select>
              </Field>
              <Field label="Quarter">
                <select
                  value={quarterFilter}
                  onChange={(e) => setQuarterFilter(e.target.value)}
                  className={inputClass}
                >
                  {MM_FILTER_OPTIONS.quarter.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </Field>
              <Field label="Campaign">
                <select
                  value={campaignFilter}
                  onChange={(e) => setCampaignFilter(e.target.value)}
                  className={inputClass}
                >
                  <option value="All">All Campaigns</option>
                  {MM_FILTER_OPTIONS.campaign.slice(1).map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </Field>
              <Field label="Product">
                <select
                  value={productFilter}
                  onChange={(e) => setProductFilter(e.target.value)}
                  className={inputClass}
                >
                  <option value="All">All Products</option>
                  {MM_FILTER_OPTIONS.product.slice(1).map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </Field>
              <Field label="Sales Manager">
                <select
                  value={smFilter}
                  onChange={(e) => setSmFilter(e.target.value)}
                  className={inputClass}
                >
                  <option value="All">All Sales Managers</option>
                  {MM_FILTER_OPTIONS.salesManager.slice(1).map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </Field>
              <Field label="TM">
                <select
                  value={tmFilter}
                  onChange={(e) => setTmFilter(e.target.value)}
                  className={inputClass}
                >
                  <option value="All">All TMs</option>
                  {MM_FILTER_OPTIONS.tm.slice(1).map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </Field>
              <Field label="Search Reports" className="sm:col-span-2">
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={inputClass}
                  placeholder="Search report name or scope..."
                />
              </Field>
            </div>
          </Panel>

          <Panel
            title="Reports"
            bodyClassName=""
            footer={<span>Showing {filteredReports.length} of {MM_REPORTS.length} reports</span>}
          >
            <TableWrap>
              <THead
                columns={[
                  "Report Name",
                  "Scope",
                  "Last Updated",
                  "Format",
                  { label: "Actions", align: "right" },
                ]}
              />
              <tbody>
                {filteredReports.map((report, index) => {
                  const Icon = reportIcons[index % reportIcons.length] ?? FileText;
                  return (
                    <TR key={report.name}>
                      <TD strong>
                        <span className="inline-flex items-center gap-2">
                          <Icon className="size-4 text-primary" />
                          {report.name}
                        </span>
                      </TD>
                      <TD>{report.scope}</TD>
                      <TD>{report.updated}</TD>
                      <TD>
                        <span
                          className={
                            report.format === "PDF"
                              ? "font-semibold text-destructive"
                              : "font-semibold text-success"
                          }
                        >
                          {report.format}
                        </span>
                      </TD>
                      <TD align="right">
                        <span className="inline-flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setViewReport(report)}
                          >
                            View
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleExport(report)}
                          >
                            <Download className="size-3.5" /> Export
                          </Button>
                        </span>
                      </TD>
                    </TR>
                  );
                })}
                {filteredReports.length === 0 && (
                  <TR>
                    <TD colSpan={5} className="py-8 text-center text-muted-foreground">
                      No reports match the selected filters.
                    </TD>
                  </TR>
                )}
              </tbody>
            </TableWrap>
          </Panel>
        </div>

        <div className="space-y-5">
          <Panel
            title="Recent Notifications"
            actions={
              <Link
                to="/marketing/notifications"
                className="text-xs font-bold text-primary hover:underline"
              >
                View all
              </Link>
            }
            footer={
              <Link
                to="/marketing/notifications"
                className="font-bold text-primary hover:underline"
              >
                View all notifications →
              </Link>
            }
          >
            <ul className="space-y-3.5">
              {MM_NOTIFICATIONS.map((item) => {
                const Icon = notificationIcon(item.tone);
                return (
                  <li key={item.title} className="flex items-start gap-3">
                    <Icon className={`mt-0.5 size-4.5 shrink-0 ${notificationColor(item.tone)}`} />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-navy">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.detail}</p>
                    </div>
                    <span className="shrink-0 text-[11px] font-medium text-muted-foreground">
                      {item.time}
                    </span>
                  </li>
                );
              })}
            </ul>
          </Panel>

          <Panel
            title="Audit Trail"
            bodyClassName=""
            actions={
              <Link
                to="/marketing/audit"
                className="text-xs font-bold text-primary hover:underline"
              >
                View all
              </Link>
            }
            footer={
              <Link
                to="/marketing/audit"
                className="font-bold text-primary hover:underline"
              >
                View full audit trail →
              </Link>
            }
          >
            <TableWrap>
              <THead columns={["Changed By", "Module", "Event Type", "Timestamp"]} />
              <tbody>
                {MM_AUDIT_TRAIL.map((entry) => (
                  <TR key={`${entry.by}-${entry.at}`}>
                    <TD strong>{entry.by}</TD>
                    <TD>{entry.module}</TD>
                    <TD>{entry.event}</TD>
                    <TD>{entry.at}</TD>
                  </TR>
                ))}
              </tbody>
            </TableWrap>
          </Panel>
        </div>
      </div>

      {/* View Report Modal */}
      {viewReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-xl">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
                  <FileText className="size-6" />
                </span>
                <div>
                  <h3 className="text-xl font-bold text-navy">{viewReport.name}</h3>
                  <p className="text-xs text-muted-foreground">{viewReport.scope}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setViewReport(null)}
                className="grid size-8 place-items-center rounded-lg text-muted-foreground hover:bg-muted"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="mt-5 space-y-3 rounded-xl border border-border bg-muted/25 p-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Coverage Scope:</span>
                <span className="font-semibold text-navy">{viewReport.scope}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Quarter:</span>
                <span className="font-semibold text-navy">{quarterFilter}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Generated Date:</span>
                <span className="font-semibold text-navy">{viewReport.updated}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery Format:</span>
                <span className="font-semibold text-navy">{viewReport.format}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Data Integrity Status:</span>
                <span className="inline-flex items-center gap-1 font-semibold text-success">
                  <CheckCircle2 className="size-3.5" /> Synchronized
                </span>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => setViewReport(null)}>
                Close
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  handleExport(viewReport);
                  setViewReport(null);
                }}
              >
                <Download className="size-3.5" /> Download {viewReport.format}
              </Button>
            </div>
          </div>
        </div>
      )}
    </MarketingShell>
  );
}

