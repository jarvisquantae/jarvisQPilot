import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef, type ChangeEvent } from "react";
import { Check, Download, GitBranch, Sparkles, Upload, X } from "lucide-react";
import { toast } from "sonner";
import { MarketingShell } from "@/components/layout/MarketingShell";
import { ConsolePageTitle } from "@/components/layout/ConsoleShell";
import {
  Field,
  Panel,
  Pill,
  TD,
  THead,
  TR,
  TableWrap,
  inputClass,
  type ConsoleTone,
} from "@/components/console/primitives";
import { Button } from "@/components/ui/button";
import { MM_VOCAB_REVIEW_QUEUE, MM_VOCAB_VERSIONS } from "@/data/marketing";
import { VOCABULARY_TAGS_DATA } from "@/data/vocabulary-tags";

export const Route = createFileRoute("/marketing/vocabulary-review")({
  head: () => ({
    meta: [
      { title: "Vocabulary Import & Review — Q-Pilot Marketing" },
      {
        name: "description",
        content:
          "Import terminology by CSV, clear the unmatched-term review queue and manage vocabulary versions from draft to published.",
      },
      { property: "og:title", content: "Vocabulary Import & Review — Q-Pilot Marketing" },
      {
        property: "og:description",
        content: "Unmatched-term review queue and vocabulary version control for Marketing approval.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: VocabularyReview,
});

const versionTone: Record<string, ConsoleTone | "muted"> = {
  Published: "success",
  Review: "warning",
  Draft: "info",
  Deprecated: "muted",
};

export function VocabularyReview() {
  const [reviewQueue, setReviewQueue] = useState(MM_VOCAB_REVIEW_QUEUE);
  const [termTag, setTermTag] = useState("");
  const [standardTerm, setStandardTerm] = useState("");
  const [termType, setTermType] = useState("Abbreviation");
  const [language, setLanguage] = useState("English");
  const [usage, setUsage] = useState("Acceptable");
  const [context, setContext] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleApprove = (heard: string, suggestion: string) => {
    setReviewQueue((prev) => prev.filter((item) => item.heard !== heard));
    toast.success(`Approved “${heard}” → mapped to “${suggestion}”. Added to next version release.`);
  };

  const handleReject = (heard: string) => {
    setReviewQueue((prev) => prev.filter((item) => item.heard !== heard));
    toast.info(`Rejected “${heard}”. Term removed from review queue.`);
  };

  const handleCsvUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0);
        toast.success(`Successfully uploaded ${lines.length} lines from ${file.name}. Validating records...`);
      } catch (err) {
        toast.error("Failed to parse CSV file.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const handleExportCsv = () => {
    const headers = [
      "No.",
      "Term Entered By User",
      "Standard Term",
      "Therapy Area",
      "Category",
      "Intent Tag",
      "Risk Tag",
      "Synonym Group",
      "Spoken Variants",
      "Status",
    ];

    const rows = VOCABULARY_TAGS_DATA.map((t) => [
      t.no ?? "",
      `"${(t.termEnteredByUser || "").replace(/"/g, '""')}"`,
      `"${(t.standardTerm || "").replace(/"/g, '""')}"`,
      `"${(t.therapyArea || "").replace(/"/g, '""')}"`,
      `"${(t.category || "").replace(/"/g, '""')}"`,
      `"${(t.intentTag || "").replace(/"/g, '""')}"`,
      `"${(t.riskTag || "").replace(/"/g, '""')}"`,
      `"${(t.synonymGroup || "").replace(/"/g, '""')}"`,
      `"${(t.spokenVariants || []).join("; ").replace(/"/g, '""')}"`,
      `"${(t.status || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `qpilot_vocabulary_full_bank_500.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Exported 500 clinical vocabulary tags to CSV.");
  };

  const handleDownloadTemplate = () => {
    const headers =
      "No.,Term Entered By User,Standard Term,Therapy Area,Category,Intent Tag,Risk Tag,Synonym Group,Spoken Variants,Status,Reviewer,Source Basis\n";
    const sample =
      '1,HTN,Hypertension,Cardiology,Disease,General medical,No-risk,HYPERTENSION,"HTN, Hypertension, High BP",Approved for Demo,Medical Advisor/Manager,Demo vocabulary\n' +
      '2,High BP,Hypertension,Cardiology,Disease,General medical,No-risk,HYPERTENSION,"HTN, Hypertension, High BP",Approved for Demo,Medical Advisor/Manager,Demo vocabulary\n';

    const csvContent = "data:text/csv;charset=utf-8," + encodeURIComponent(headers + sample);
    const link = document.createElement("a");
    link.setAttribute("href", csvContent);
    link.setAttribute("download", "qpilot_vocabulary_import_template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Downloaded vocabulary import CSV template.");
  };

  const handleSaveDraft = () => {
    if (!termTag || !standardTerm) {
      toast.error("Please enter both the term/tag and standard terminology.");
      return;
    }
    toast.success(`Saved “${termTag}” as draft in the review queue.`);
    setTermTag("");
    setStandardTerm("");
    setContext("");
  };

  const handleSendForReview = () => {
    if (!termTag || !standardTerm) {
      toast.error("Please enter both the term/tag and standard terminology.");
      return;
    }
    toast.success(`Submitted “${termTag}” for Medical Advisor review.`);
    setTermTag("");
    setStandardTerm("");
    setContext("");
  };

  return (
    <MarketingShell searchPlaceholder="Search unmatched terms, versions...">
      <ConsolePageTitle
        title="Vocabulary Import, Review & Versioning"
        subtitle="Q-Pilot may suggest mappings, but Marketing approves every term before it becomes part of a published version."
        actions={
          <>
            <Button variant="outline" asChild>
              <Link to="/marketing/vocabulary">Vocabulary bank (500)</Link>
            </Button>
            <Button onClick={() => fileInputRef.current?.click()}>
              <Upload className="size-4" /> Import CSV
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleCsvUpload}
              accept=".csv"
              className="hidden"
            />
          </>
        }
      />

      <div className="grid gap-5 xl:grid-cols-[1.5fr_1fr]">
        <div className="space-y-5">
          <Panel
            title="Unmatched-term review queue"
            actions={
              <Pill tone="ai">
                <Sparkles className="size-3" /> AI suggested, Marketing approves
              </Pill>
            }
            bodyClassName="px-0 pb-0"
            footer={
              <span>
                {reviewQueue.length} terms awaiting review · oldest 4 days
              </span>
            }
          >
            <TableWrap>
              <THead
                columns={[
                  "Heard in practice",
                  "Suggested standard term",
                  "Brand",
                  { label: "Occurrences", align: "center" },
                  { label: "Confidence", align: "center" },
                  { label: "Decision", align: "right" },
                ]}
              />
              <tbody>
                {reviewQueue.length === 0 ? (
                  <TR>
                    <TD colSpan={6} className="py-6 text-center text-muted-foreground">
                      Review queue clear. All unmatched practice terms have been processed!
                    </TD>
                  </TR>
                ) : (
                  reviewQueue.map((row) => (
                    <TR key={row.heard}>
                      <TD strong>“{row.heard}”</TD>
                      <TD>{row.suggestion}</TD>
                      <TD>{row.brand}</TD>
                      <TD align="center">{row.occurrences}</TD>
                      <TD align="center">
                        <Pill tone={row.confidence >= 85 ? "success" : "warning"}>
                          {row.confidence}%
                        </Pill>
                      </TD>
                      <TD align="right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleApprove(row.heard, row.suggestion)}
                            aria-label={`Approve ${row.heard}`}
                            className="grid size-7 place-items-center rounded-lg border border-border text-success hover:bg-muted"
                            title="Approve mapping"
                          >
                            <Check className="size-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleReject(row.heard)}
                            aria-label={`Reject ${row.heard}`}
                            className="grid size-7 place-items-center rounded-lg border border-border text-destructive hover:bg-muted"
                            title="Reject term"
                          >
                            <X className="size-3.5" />
                          </button>
                        </div>
                      </TD>
                    </TR>
                  ))
                )}
              </tbody>
            </TableWrap>
          </Panel>

          <Panel
            title="Vocabulary versions"
            actions={
              <Button size="sm" variant="outline" onClick={handleExportCsv}>
                <Download className="size-4" /> Export CSV
              </Button>
            }
            bodyClassName="px-0 pb-0"
          >
            <TableWrap>
              <THead
                columns={[
                  "Version",
                  "Specialty",
                  { label: "Terms", align: "center" },
                  "Effective from",
                  "Updated by",
                  { label: "Status", align: "right" },
                ]}
              />
              <tbody>
                {MM_VOCAB_VERSIONS.map((row) => (
                  <TR key={`${row.version}-${row.specialty}`}>
                    <TD strong>
                      <span className="inline-flex items-center gap-1.5">
                        <GitBranch className="size-3.5 text-primary" />
                        {row.version}
                      </span>
                    </TD>
                    <TD>{row.specialty}</TD>
                    <TD align="center">{row.terms}</TD>
                    <TD>{row.effective}</TD>
                    <TD>{row.by}</TD>
                    <TD align="right">
                      <Pill tone={versionTone[row.status] ?? "muted"}>{row.status}</Pill>
                    </TD>
                  </TR>
                ))}
              </tbody>
            </TableWrap>
          </Panel>
        </div>

        <div className="space-y-5">
          <Panel title="Add term manually">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Term / tag" required>
                <input
                  className={inputClass}
                  placeholder="e.g. HTN"
                  value={termTag}
                  onChange={(e) => setTermTag(e.target.value)}
                />
              </Field>
              <Field label="Standard terminology" required>
                <input
                  className={inputClass}
                  placeholder="e.g. Hypertension"
                  value={standardTerm}
                  onChange={(e) => setStandardTerm(e.target.value)}
                />
              </Field>
              <Field label="Term type" required>
                <select
                  className={inputClass}
                  value={termType}
                  onChange={(e) => setTermType(e.target.value)}
                >
                  <option>Abbreviation</option>
                  <option>Synonym</option>
                  <option>Colloquial / lay term</option>
                  <option>Pronunciation variation</option>
                  <option>Standard term</option>
                </select>
              </Field>
              <Field label="Language">
                <select
                  className={inputClass}
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <option>English</option>
                  <option>Hindi</option>
                  <option>Hinglish</option>
                </select>
              </Field>
              <Field label="Usage">
                <select
                  className={inputClass}
                  value={usage}
                  onChange={(e) => setUsage(e.target.value)}
                >
                  <option>Acceptable</option>
                  <option>Prohibited</option>
                </select>
              </Field>
              <Field label="Effective from">
                <input className={inputClass} type="date" defaultValue="2026-10-19" />
              </Field>
              <Field
                label="Context"
                className="sm:col-span-2"
                hint="Where this term is acceptable during detailing."
              >
                <textarea
                  rows={3}
                  className={`${inputClass} h-auto py-2`}
                  placeholder="Acceptable when the doctor uses the lay term first."
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                />
              </Field>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button onClick={handleSaveDraft}>Save as draft</Button>
              <Button variant="outline" onClick={handleSendForReview}>
                Send for review
              </Button>
            </div>
          </Panel>

          <Panel title="CSV import guidance">
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>
                <strong className="text-navy">Supported Format:</strong> WhatsApp Vocabulary Tags
                CSV with 12 canonical fields.
              </li>
              <li>
                <strong className="text-navy">Key Columns:</strong> Term Entered By User, Standard
                Term, Therapy Area, Category, Intent Tag, Risk Tag, Synonym Group, Spoken Variants.
              </li>
              <li>
                <strong className="text-navy">Risk Classifications:</strong> No-risk, Caution,
                High-risk, Block, AE flag, PV flag, Urgent PV flag, PV/Quality flag.
              </li>
              <li>
                <strong className="text-navy">Automated Guardrails:</strong> High-risk and PV flags
                trigger deterministic review alerts during AI pitch detailing.
              </li>
            </ul>
            <Button
              variant="soft"
              size="sm"
              className="mt-4"
              onClick={handleDownloadTemplate}
            >
              <Download className="size-4" /> Download template
            </Button>
          </Panel>
        </div>
      </div>
    </MarketingShell>
  );
}
export default VocabularyReview;
