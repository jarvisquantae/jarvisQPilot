import { createFileRoute } from "@tanstack/react-router";
import {
  Clock,
  Filter,
  Pencil,
  Plus,
  Search,
  SquareStack,
  Target,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { MarketingShell } from "@/components/layout/MarketingShell";
import { ConsolePageTitle } from "@/components/layout/ConsoleShell";
import {
  Field,
  Panel,
  Pagination,
  Pill,
  StatTile,
  TD,
  THead,
  TR,
  TableWrap,
  inputClass,
} from "@/components/console/primitives";
import { Button } from "@/components/ui/button";
import { MM_FILTER_OPTIONS, MM_VOCAB, MM_VOCAB_STATS } from "@/data/marketing";

export const Route = createFileRoute("/marketing/vocabulary")({
  head: () => ({
    meta: [
      { title: "Vocabulary Knowledge Bank — Q-Pilot Marketing" },
      {
        name: "description",
        content: "Curate approved terminology, abbreviations and lay terms Q-Pilot maps during transcript review.",
      },
      { property: "og:title", content: "Vocabulary Knowledge Bank — Q-Pilot Marketing" },
      { property: "og:description", content: "Approved terms, abbreviations and lay-term mapping per brand." },
    ],
  }),
  component: MarketingVocabulary,
});

const statIcons = [Target, SquareStack, Clock, Trash2];

const statusTone = (status: string) =>
  status === "Active" ? "success" : status === "Pending" ? "warning" : "danger";

function MarketingVocabulary() {
  return (
    <MarketingShell searchPlaceholder="Search vocabulary tags, terms, brands...">
      <ConsolePageTitle title="Vocabulary Knowledge Bank" />

      <div className="grid gap-5 xl:grid-cols-[1.6fr_1fr]">
        <div className="min-w-0">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {MM_VOCAB_STATS.map((stat, index) => {
              const Icon = statIcons[index] ?? Target;
              return (
                <StatTile
                  key={stat.label}
                  label={stat.label}
                  value={stat.value}
                  delta={stat.delta}
                  deltaLabel={stat.deltaLabel}
                  tone={stat.tone}
                  icon={<Icon className="size-5" />}
                />
              );
            })}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Button size="sm">
              <Plus className="size-4" /> Add Vocabulary Tag
            </Button>
            <Button variant="outline" size="sm">
              <Upload className="size-4" /> Import Excel
            </Button>
            <span className="relative ml-auto">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input className={`${inputClass} w-56 pl-9`} placeholder="Search table..." />
            </span>
            <Button variant="outline" size="sm">
              <Filter className="size-4" /> Filters
            </Button>
          </div>

          <Panel
            className="mt-4"
            bodyClassName=""
            footer={<Pagination showing="Showing 1 to 12 of 428" pages={[1, 2, 3]} />}
          >
            <TableWrap>
              <THead
                columns={[
                  "Vocabulary Tag",
                  "Standard Term",
                  "Brand",
                  "Product",
                  "Specialty",
                  "Term Type",
                  "Acceptable in Pitch",
                  "Status",
                  { label: "Actions", align: "right" },
                ]}
              />
              <tbody>
                {MM_VOCAB.map((row) => (
                  <TR key={row.tag}>
                    <TD className="font-semibold text-primary">{row.tag}</TD>
                    <TD>{row.term}</TD>
                    <TD>{row.brand}</TD>
                    <TD>{row.product}</TD>
                    <TD>{row.specialty}</TD>
                    <TD>{row.type}</TD>
                    <TD>{row.acceptable}</TD>
                    <TD>
                      <Pill tone={statusTone(row.status)}>{row.status}</Pill>
                    </TD>
                    <TD align="right">
                      <span className="inline-flex items-center gap-2 text-muted-foreground">
                        <Pencil className="size-4" />
                        <Trash2 className="size-4" />
                      </span>
                    </TD>
                  </TR>
                ))}
              </tbody>
            </TableWrap>
          </Panel>
        </div>

        <Panel
          title="Term Details"
          actions={<X className="size-4 text-muted-foreground" />}
        >
          <div className="grid gap-3.5">
            <Field label="Vocabulary Tag" required>
              <input className={inputClass} defaultValue="HTN" />
            </Field>
            <Field label="Standard Term" required>
              <input className={inputClass} defaultValue="Hypertension" />
            </Field>
            <Field label="Brand" required>
              <select className={inputClass} defaultValue="CARDIOCARE">
                <option>CARDIOCARE</option>
                <option>NEUROPLUS</option>
                <option>RESPIRA</option>
                <option>DIABETA</option>
              </select>
            </Field>
            <Field label="Product" required>
              <select className={inputClass}>
                <option>Cardiocare 10</option>
                <option>Cardiocare 20</option>
              </select>
            </Field>
            <Field label="Campaign">
              <select className={inputClass}>
                <option>CARDIOCARE Q2 Launch</option>
                {MM_FILTER_OPTIONS.campaign.slice(1).map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </Field>
            <Field label="Specialty" required>
              <select className={inputClass}>
                {MM_FILTER_OPTIONS.specialty.slice(1).map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </Field>
            <Field label="Language" required>
              <select className={inputClass}>
                <option>English</option>
                <option>Hindi</option>
              </select>
            </Field>
            <Field label="Term Type" required>
              <select className={inputClass}>
                <option>Abbreviation</option>
                <option>Lay Term</option>
                <option>Standard Term</option>
              </select>
            </Field>
            <fieldset>
              <legend className="mb-1.5 text-xs font-semibold text-navy">
                Acceptable in Pitch <span className="text-destructive">*</span>
              </legend>
              <div className="flex gap-5">
                {["Yes", "No"].map((option) => (
                  <label key={option} className="inline-flex items-center gap-2 text-sm text-navy">
                    <input type="radio" name="acceptable" defaultChecked={option === "Yes"} />
                    {option}
                  </label>
                ))}
              </div>
            </fieldset>
            <Field label="Prohibited Usage">
              <textarea
                rows={2}
                placeholder="e.g. Do not use in place of standard term"
                className="w-full rounded-xl border border-border bg-card p-3 text-sm text-navy placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Effective Date" required>
                <input className={inputClass} type="date" defaultValue="2025-04-01" />
              </Field>
              <Field label="Expiry Date">
                <input className={inputClass} type="date" />
              </Field>
            </div>
            <Field label="Status" required>
              <select className={inputClass}>
                <option>Active</option>
                <option>Pending</option>
                <option>Deprecated</option>
              </select>
            </Field>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <Button variant="outline">Cancel</Button>
            <Button>Save</Button>
          </div>
        </Panel>
      </div>
    </MarketingShell>
  );
}
