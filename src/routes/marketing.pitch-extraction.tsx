import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, FileUp, Pencil, RefreshCw, Sparkles, Upload, X } from "lucide-react";
import { MarketingShell } from "@/components/layout/MarketingShell";
import { ConsolePageTitle } from "@/components/layout/ConsoleShell";
import {
  Panel,
  Pill,
  TD,
  THead,
  TR,
  TableWrap,
  type ConsoleTone,
} from "@/components/console/primitives";
import { Button } from "@/components/ui/button";
import { MM_EXTRACTED_SECTIONS, MM_PITCH_UPLOADS } from "@/data/marketing";

export const Route = createFileRoute("/marketing/pitch-extraction")({
  head: () => ({
    meta: [
      { title: "Pitch Upload & AI Extraction — Q-Pilot Marketing" },
      {
        name: "description",
        content:
          "Upload approved pitch files and review the AI-structured sections, source references and confidence before approval.",
      },
      { property: "og:title", content: "Pitch Upload & AI Extraction — Q-Pilot Marketing" },
      {
        property: "og:description",
        content: "Structured pitch sections with source references and confidence scores.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PitchExtraction,
});

const stateTone: Record<string, ConsoleTone | "muted"> = {
  Extracted: "success",
  Processing: "warning",
  Failed: "danger",
  Accepted: "success",
  Pending: "warning",
  Edited: "info",
};

function PitchExtraction() {
  return (
    <MarketingShell searchPlaceholder="Search uploaded pitch files...">
      <ConsolePageTitle
        title="Pitch Upload & AI Extraction"
        subtitle="Upload the approved pitch in PDF, DOCX, PPTX or TXT. Q-Pilot structures it into sections you accept, edit or reject."
        actions={
          <>
            <Button variant="outline" asChild>
              <Link to="/marketing/pitches">Pitch library</Link>
            </Button>
            <Button>
              <Upload className="size-4" /> Upload pitch
            </Button>
          </>
        }
      />

      <div className="grid gap-5 xl:grid-cols-[1fr_1.5fr]">
        <div className="space-y-5">
          <Panel title="Upload approved pitch">
            <div className="rounded-2xl border-2 border-dashed border-border bg-muted/40 px-5 py-10 text-center">
              <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-primary/12 text-primary">
                <FileUp className="size-6" />
              </span>
              <p className="mt-3 text-sm font-bold text-navy">Drag & drop the approved pitch file</p>
              <p className="mt-1 text-xs text-muted-foreground">
                PDF, DOCX, PPTX or TXT · up to 25 MB · stored in private file storage
              </p>
              <Button variant="soft" size="sm" className="mt-4">
                Browse files
              </Button>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Only medically approved files should be uploaded. The approval reference is captured
              during pitch review.
            </p>
          </Panel>

          <Panel title="Upload queue" bodyClassName="pb-2">
            <ul className="divide-y divide-border">
              {MM_PITCH_UPLOADS.map((upload) => (
                <li key={upload.file} className="flex items-start gap-3 py-3">
                  <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-xl bg-navy/10 text-navy">
                    <FileUp className="size-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-navy">{upload.file}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {upload.campaign} · {upload.size} · {upload.by}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{upload.uploaded}</p>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1.5">
                    <Pill tone={stateTone[upload.state] ?? "muted"}>{upload.state}</Pill>
                    {upload.confidence > 0 && (
                      <span className="text-[11px] font-bold text-muted-foreground">
                        {upload.confidence}% confidence
                      </span>
                    )}
                    {upload.state === "Failed" && (
                      <button
                        type="button"
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-primary"
                      >
                        <RefreshCw className="size-3" /> Retry
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </Panel>
        </div>

        <Panel
          title="AI-extracted sections — CARDIOCARE Q2 Pitch"
          actions={
            <>
              <Pill tone="ai">
                <Sparkles className="size-3" /> 94% overall confidence
              </Pill>
              <Button size="sm" variant="outline">
                Accept all
              </Button>
              <Button size="sm" asChild>
                <Link to="/marketing/pitches">Send to review</Link>
              </Button>
            </>
          }
          bodyClassName="px-0 pb-0"
        >
          <TableWrap>
            <THead
              columns={[
                "Section",
                "Extracted content",
                "Source reference",
                { label: "Confidence", align: "center" },
                { label: "Decision", align: "right" },
              ]}
            />
            <tbody>
              {MM_EXTRACTED_SECTIONS.map((section) => (
                <TR key={section.section}>
                  <TD strong className="whitespace-nowrap align-top">
                    {section.section}
                  </TD>
                  <TD className="min-w-[18rem] align-top">{section.body}</TD>
                  <TD className="align-top text-xs">{section.source}</TD>
                  <TD align="center" className="align-top">
                    <Pill
                      tone={
                        section.confidence >= 90
                          ? "success"
                          : section.confidence >= 80
                            ? "warning"
                            : "danger"
                      }
                    >
                      {section.confidence}%
                    </Pill>
                  </TD>
                  <TD align="right" className="align-top">
                    <div className="flex items-center justify-end gap-1.5">
                      <Pill tone={stateTone[section.state] ?? "muted"}>{section.state}</Pill>
                      <button
                        type="button"
                        aria-label={`Accept ${section.section}`}
                        className="grid size-7 place-items-center rounded-lg border border-border text-success hover:bg-muted"
                      >
                        <Check className="size-3.5" />
                      </button>
                      <button
                        type="button"
                        aria-label={`Edit ${section.section}`}
                        className="grid size-7 place-items-center rounded-lg border border-border text-navy hover:bg-muted"
                      >
                        <Pencil className="size-3.5" />
                      </button>
                      <button
                        type="button"
                        aria-label={`Reject ${section.section}`}
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
      </div>
    </MarketingShell>
  );
}
