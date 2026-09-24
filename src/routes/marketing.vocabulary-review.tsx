import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Download, GitBranch, Sparkles, Upload, X } from "lucide-react";
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

function VocabularyReview() {
  return (
    <MarketingShell searchPlaceholder="Search unmatched terms, versions...">
      <ConsolePageTitle
        title="Vocabulary Import, Review & Versioning"
        subtitle="Q-Pilot may suggest mappings, but Marketing approves every term before it becomes part of a published version."
        actions={
          <>
            <Button variant="outline" asChild>
              <Link to="/marketing/vocabulary">Vocabulary bank</Link>
            </Button>
            <Button>
              <Upload className="size-4" /> Import CSV
            </Button>
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
            footer={<span>5 terms awaiting review · oldest 4 days</span>}
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
                {MM_VOCAB_REVIEW_QUEUE.map((row) => (
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
                          aria-label={`Approve ${row.heard}`}
                          className="grid size-7 place-items-center rounded-lg border border-border text-success hover:bg-muted"
                        >
                          <Check className="size-3.5" />
                        </button>
                        <button
                          type="button"
                          aria-label={`Reject ${row.heard}`}
                          className="grid size-7 place-items-center rounded-lg border border-border text-destructive hover:bg-muted"
                        >
                          <X className="size-3.5" />
                        </button>
                      </div>
                    </TD>
                  </TR>
                ))}
              </tbody>
            </TableWrap>
          </Panel>

          <Panel
            title="Vocabulary versions"
            actions={
              <Button size="sm" variant="outline">
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
                <input className={inputClass} placeholder="e.g. HTN" />
              </Field>
              <Field label="Standard terminology" required>
                <input className={inputClass} placeholder="e.g. Hypertension" />
              </Field>
              <Field label="Term type" required>
                <select className={inputClass}>
                  <option>Abbreviation</option>
                  <option>Synonym</option>
                  <option>Colloquial / lay term</option>
                  <option>Pronunciation variation</option>
                  <option>Standard term</option>
                </select>
              </Field>
              <Field label="Language">
                <select className={inputClass}>
                  <option>English</option>
                  <option>Hindi</option>
                  <option>Hinglish</option>
                </select>
              </Field>
              <Field label="Usage">
                <select className={inputClass}>
                  <option>Acceptable</option>
                  <option>Prohibited</option>
                </select>
              </Field>
              <Field label="Effective from">
                <input className={inputClass} type="date" />
              </Field>
              <Field label="Context" className="sm:col-span-2" hint="Where this term is acceptable during detailing.">
                <textarea
                  rows={3}
                  className={`${inputClass} h-auto py-2`}
                  placeholder="Acceptable when the doctor uses the lay term first."
                />
              </Field>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button>Save as draft</Button>
              <Button variant="outline">Send for review</Button>
            </div>
          </Panel>

          <Panel title="CSV import guidance">
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>Required columns: term, standard_term, type, brand, specialty, usage.</li>
              <li>Optional columns: language, context, effective_from, expiry.</li>
              <li>Rows with unknown brands are held in the review queue.</li>
              <li>Imports always land as Draft and need Marketing approval to publish.</li>
            </ul>
            <Button variant="soft" size="sm" className="mt-4">
              <Download className="size-4" /> Download template
            </Button>
          </Panel>
        </div>
      </div>
    </MarketingShell>
  );
}
