import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo, useRef, type ChangeEvent } from "react";
import {
  AlertTriangle,
  BookOpen,
  Check,
  Clock,
  Download,
  Filter,
  Pencil,
  Plus,
  RefreshCw,
  Search,
  ShieldAlert,
  Sparkles,
  Tag,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { toast } from "sonner";
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
  type ConsoleTone,
} from "@/components/console/primitives";
import { Button } from "@/components/ui/button";
import type { VocabularyRiskTag, VocabularyTag } from "@/types";
import {
  VOCABULARY_TAGS_DATA,
  getTherapyAreaList,
  getRiskTagList,
} from "@/data/vocabulary-tags";

export const Route = createFileRoute("/marketing/vocabulary")({
  head: () => ({
    meta: [
      { title: "Vocabulary Knowledge Bank — Q-Pilot Marketing" },
      {
        name: "description",
        content:
          "500 clinical & medical vocabulary tags, standard terminology, speech-to-text spoken variants, and deterministic risk classifications.",
      },
      { property: "og:title", content: "Vocabulary Knowledge Bank — Q-Pilot Marketing" },
      {
        property: "og:description",
        content: "500 clinical terms, therapy area categorizations, and safety risk classifications.",
      },
    ],
  }),
  component: MarketingVocabulary,
});

const riskTone = (risk: VocabularyRiskTag | string): ConsoleTone => {
  switch (risk) {
    case "No-risk":
      return "teal";
    case "Caution":
      return "warning";
    case "AE flag":
      return "warning";
    case "High-risk":
    case "Block":
    case "Urgent PV flag":
    case "PV flag":
    case "PV/Quality flag":
      return "danger";
    default:
      return "info";
  }
};

const statusTone = (status: string): ConsoleTone => {
  if (status.toLowerCase().includes("approved")) return "success";
  if (status.toLowerCase().includes("pending")) return "warning";
  if (status.toLowerCase().includes("block") || status.toLowerCase().includes("deprecated"))
    return "danger";
  return "info";
};

const PAGE_SIZE = 15;

function parseCsv(text: string): VocabularyTag[] {
  const lines = text.split(/\r?\n/).filter((line) => line.trim().length > 0);
  let headerIndex = -1;
  for (let i = 0; i < Math.min(lines.length, 10); i++) {
    const lower = lines[i].toLowerCase();
    if (
      lower.includes("term entered by user") ||
      lower.includes("standard term") ||
      lower.includes("synonym group")
    ) {
      headerIndex = i;
      break;
    }
  }

  const startIndex = headerIndex >= 0 ? headerIndex + 1 : 0;
  const parsedRows: VocabularyTag[] = [];

  for (let i = startIndex; i < lines.length; i++) {
    const rawLine = lines[i].trim();
    if (!rawLine) continue;

    // Regex to parse comma-separated fields with optional quotes
    const cells: string[] = [];
    let cur = "";
    let insideQuotes = false;
    for (let j = 0; j < rawLine.length; j++) {
      const char = rawLine[j];
      if (char === '"') {
        if (insideQuotes && rawLine[j + 1] === '"') {
          cur += '"';
          j++;
        } else {
          insideQuotes = !insideQuotes;
        }
      } else if (char === "," && !insideQuotes) {
        cells.push(cur.trim());
        cur = "";
      } else {
        cur += char;
      }
    }
    cells.push(cur.trim());

    const noStr = cells[0] || "";
    const parsedNo = parseInt(noStr, 10);
    if (isNaN(parsedNo)) continue;

    const termEntered = cells[1] || "";
    const standardTerm = cells[2] || "";
    const therapyArea = cells[3] || "General";
    const category = cells[4] || "General";
    const intentTag = cells[5] || "General medical";
    const riskTag = (cells[6] as VocabularyRiskTag) || "No-risk";
    const synonymGroup = cells[7] || termEntered.toUpperCase().replace(/\s+/g, "_");
    const spokenVariantsRaw = cells[8] || "";
    const status = cells[9] || "Approved for Demo";
    const reviewer = cells[10] || "Medical Advisor/Manager";
    const sourceBasis = cells[11] || "Demo vocabulary";

    const variants = spokenVariantsRaw
      ? spokenVariantsRaw
          .split(/[,;\n]/)
          .map((v) => v.trim())
          .filter(Boolean)
      : [termEntered, standardTerm].filter(Boolean);

    parsedRows.push({
      id: `vocab-${parsedNo}`,
      no: parsedNo,
      termEnteredByUser: termEntered,
      standardTerm: standardTerm,
      therapyArea,
      category,
      intentTag,
      riskTag,
      synonymGroup,
      spokenVariants: Array.from(new Set(variants)),
      status,
      reviewer,
      sourceBasis,
    });
  }

  return parsedRows;
}

function MarketingVocabulary() {
  const [tags, setTags] = useState<VocabularyTag[]>(VOCABULARY_TAGS_DATA);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTherapy, setSelectedTherapy] = useState("All");
  const [selectedRisk, setSelectedRisk] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Selected tag for the detail / edit panel
  const [selectedTagId, setSelectedTagId] = useState<string>(
    VOCABULARY_TAGS_DATA[0]?.id ?? "vocab-1"
  );
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  // Form state for Term Details panel
  const activeTag = useMemo(() => {
    return tags.find((t) => t.id === selectedTagId) || tags[0];
  }, [tags, selectedTagId]);

  const [formState, setFormState] = useState<Partial<VocabularyTag>>(() => activeTag || {});

  // Sync formState when activeTag changes (unless user is in creating new mode)
  const handleSelectTag = (tag: VocabularyTag) => {
    setIsCreatingNew(false);
    setSelectedTagId(tag.id);
    setFormState({ ...tag });
  };

  const therapyAreaOptions = useMemo(() => ["All", ...getTherapyAreaList()], []);
  const riskTagOptions = useMemo(() => ["All", ...getRiskTagList()], []);

  // Compute stat metrics dynamically from current dataset
  const stats = useMemo(() => {
    const total = tags.length;
    const areas = new Set(
      tags.flatMap((t) => t.therapyArea.split("/").map((a) => a.trim()))
    ).size;
    const pvAndAe = tags.filter((t) =>
      ["Urgent PV flag", "PV flag", "PV/Quality flag", "AE flag"].includes(t.riskTag)
    ).length;
    const highRisk = tags.filter((t) =>
      ["High-risk", "Block"].includes(t.riskTag)
    ).length;

    return [
      {
        label: "Clinical Terms",
        value: total,
        delta: `+${total}`,
        deltaLabel: " 500 WhatsApp tags",
        tone: "teal" as const,
        icon: BookOpen,
      },
      {
        label: "Therapy Areas",
        value: areas,
        delta: "54 Specialties",
        deltaLabel: " Cardio, Neuro, Onco...",
        tone: "info" as const,
        icon: Tag,
      },
      {
        label: "PV & Safety Flags",
        value: pvAndAe,
        delta: `${Math.round((pvAndAe / (total || 1)) * 100)}%`,
        deltaLabel: " of lexicon",
        tone: "warning" as const,
        icon: AlertTriangle,
      },
      {
        label: "High-Risk / Blocked",
        value: highRisk,
        delta: "Strict Guardrail",
        deltaLabel: " Human review trigger",
        tone: "danger" as const,
        icon: ShieldAlert,
      },
    ];
  }, [tags]);

  // Filtered dataset
  const filteredTags = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return tags.filter((tag) => {
      if (selectedTherapy !== "All") {
        if (tag.therapyArea !== "All" && !tag.therapyArea.includes(selectedTherapy)) {
          return false;
        }
      }
      if (selectedRisk !== "All" && tag.riskTag !== selectedRisk) {
        return false;
      }
      if (!q) return true;
      return (
        (tag.termEnteredByUser && tag.termEnteredByUser.toLowerCase().includes(q)) ||
        (tag.standardTerm && tag.standardTerm.toLowerCase().includes(q)) ||
        tag.therapyArea.toLowerCase().includes(q) ||
        tag.category.toLowerCase().includes(q) ||
        tag.synonymGroup.toLowerCase().includes(q) ||
        tag.intentTag.toLowerCase().includes(q) ||
        tag.riskTag.toLowerCase().includes(q) ||
        tag.spokenVariants.some((v) => v.toLowerCase().includes(q))
      );
    });
  }, [tags, searchQuery, selectedTherapy, selectedRisk]);

  // Reset pagination when filter or search changes
  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  const handleTherapyChange = (val: string) => {
    setSelectedTherapy(val);
    setCurrentPage(1);
  };

  const handleRiskChange = (val: string) => {
    setSelectedRisk(val);
    setCurrentPage(1);
  };

  const totalPages = Math.max(1, Math.ceil(filteredTags.length / PAGE_SIZE));
  const paginatedTags = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredTags.slice(start, start + PAGE_SIZE);
  }, [filteredTags, currentPage]);

  const pageNumbers = useMemo(() => {
    const pages: number[] = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + maxVisible - 1);
    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }, [currentPage, totalPages]);

  // File Upload reference
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const parsed = parseCsv(text);
        if (parsed.length === 0) {
          toast.error("No valid vocabulary rows found in CSV. Please verify column headers.");
          return;
        }
        setTags(parsed);
        setSelectedTagId(parsed[0].id);
        setFormState(parsed[0]);
        setCurrentPage(1);
        toast.success(`Successfully ingested ${parsed.length} vocabulary tags from CSV!`);
      } catch (err) {
        console.error("Failed to parse CSV", err);
        toast.error("Failed to parse CSV file. Please check file format.");
      }
    };
    reader.readAsText(file);
    // Reset input so same file can be selected again
    e.target.value = "";
  };

  // Export current filtered list as CSV
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
      "Reviewer",
      "Source Basis",
    ];

    const rows = filteredTags.map((t) => [
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
      `"${(t.reviewer || "").replace(/"/g, '""')}"`,
      `"${(t.sourceBasis || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `qpilot_vocabulary_export_${filteredTags.length}_terms.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`Exported ${filteredTags.length} terms to CSV.`);
  };

  // Save changes to the selected tag
  const handleSaveTag = () => {
    if (!formState.termEnteredByUser || !formState.standardTerm) {
      toast.error("Term Entered and Standard Term are required.");
      return;
    }

    if (isCreatingNew) {
      const nextNo = tags.length > 0 ? Math.max(...tags.map((t) => t.no ?? 0)) + 1 : 1;
      const newTag: VocabularyTag = {
        id: `vocab-${nextNo}`,
        no: nextNo,
        termEnteredByUser: formState.termEnteredByUser,
        standardTerm: formState.standardTerm,
        therapyArea: formState.therapyArea || "General",
        category: formState.category || "General",
        intentTag: formState.intentTag || "General medical",
        riskTag: (formState.riskTag as VocabularyRiskTag) || "No-risk",
        synonymGroup:
          formState.synonymGroup ||
          formState.termEnteredByUser.toUpperCase().replace(/\s+/g, "_"),
        spokenVariants: formState.spokenVariants || [
          formState.termEnteredByUser,
          formState.standardTerm,
        ],
        status: formState.status || "Approved for Demo",
        reviewer: formState.reviewer || "Medical Advisor/Manager",
        sourceBasis: formState.sourceBasis || "Clinical review",
      };
      setTags([newTag, ...tags]);
      setSelectedTagId(newTag.id);
      setIsCreatingNew(false);
      toast.success(`Created vocabulary tag #${nextNo}: "${newTag.termEnteredByUser}"`);
    } else {
      setTags((prev) =>
        prev.map((t) => (t.id === selectedTagId ? ({ ...t, ...formState } as VocabularyTag) : t))
      );
      toast.success(`Saved updates for tag: "${formState.termEnteredByUser}"`);
    }
  };

  const handleStartAddNew = () => {
    setIsCreatingNew(true);
    setFormState({
      no: tags.length + 1,
      termEnteredByUser: "",
      standardTerm: "",
      therapyArea: "Cardiology",
      category: "Disease",
      intentTag: "General medical",
      riskTag: "No-risk",
      synonymGroup: "",
      spokenVariants: [],
      status: "Approved for Demo",
      reviewer: "Medical Advisor/Manager",
      sourceBasis: "Manual entry; clinical review required",
    });
  };

  const handleDeleteTag = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const tagToDelete = tags.find((t) => t.id === id);
    if (!tagToDelete) return;
    if (confirm(`Are you sure you want to delete "${tagToDelete.termEnteredByUser}"?`)) {
      setTags((prev) => prev.filter((t) => t.id !== id));
      toast.success(`Removed tag: ${tagToDelete.termEnteredByUser}`);
      if (selectedTagId === id && tags.length > 1) {
        const remaining = tags.filter((t) => t.id !== id);
        setSelectedTagId(remaining[0].id);
        setFormState(remaining[0]);
      }
    }
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedTherapy("All");
    setSelectedRisk("All");
    setCurrentPage(1);
  };

  return (
    <MarketingShell searchPlaceholder="Search 500 clinical vocabulary tags, terms, therapy areas...">
      <ConsolePageTitle
        title="Vocabulary Knowledge Bank"
        subtitle="500 ingested clinical & medical vocabulary tags powering RAG query classification, phonetic transcription hints, and deterministic safety guardrails."
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportCsv}
              title="Export current table to CSV"
            >
              <Download className="size-4" /> Export CSV
            </Button>
            <Button
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              title="Import WhatsApp Vocabulary Tags CSV"
            >
              <Upload className="size-4" /> Import CSV
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept=".csv"
              className="hidden"
            />
          </div>
        }
      />

      <div className="grid gap-5 xl:grid-cols-[1.65fr_1fr]">
        <div className="min-w-0">
          {/* Stat Tiles */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
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

          {/* Action Bar */}
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Button size="sm" onClick={handleStartAddNew}>
              <Plus className="size-4" /> Add Vocabulary Tag
            </Button>

            <span className="relative flex-1 min-w-[200px]">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                className={`${inputClass} w-full pl-9`}
                placeholder="Search user term, standard term, synonym..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => handleSearchChange("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-navy"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </span>

            <Button
              variant={showFilters ? "default" : "outline"}
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="size-4" /> Filters
              {(selectedTherapy !== "All" || selectedRisk !== "All") && (
                <span className="ml-1 size-2 rounded-full bg-accent" />
              )}
            </Button>

            {(selectedTherapy !== "All" || selectedRisk !== "All" || searchQuery) && (
              <Button variant="ghost" size="sm" onClick={handleResetFilters} title="Reset all filters">
                <RefreshCw className="size-3.5" /> Reset
              </Button>
            )}
          </div>

          {/* Collapsible Filter Bar */}
          {showFilters && (
            <div className="mt-3 flex flex-wrap items-center gap-4 rounded-xl border border-border bg-card p-3 shadow-xs">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-muted-foreground">Therapy Area:</span>
                <select
                  className={`${inputClass} h-8 py-0 text-xs w-48`}
                  value={selectedTherapy}
                  onChange={(e) => handleTherapyChange(e.target.value)}
                >
                  {therapyAreaOptions.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-muted-foreground">Risk Classification:</span>
                <select
                  className={`${inputClass} h-8 py-0 text-xs w-44`}
                  value={selectedRisk}
                  onChange={(e) => handleRiskChange(e.target.value)}
                >
                  {riskTagOptions.map((risk) => (
                    <option key={risk} value={risk}>
                      {risk}
                    </option>
                  ))}
                </select>
              </div>

              <span className="ml-auto text-xs text-muted-foreground">
                Showing {filteredTags.length} of {tags.length} terms
              </span>
            </div>
          )}

          {/* Table Panel */}
          <Panel
            className="mt-4"
            bodyClassName=""
            footer={
              <Pagination
                showing={`Showing ${Math.min(
                  (currentPage - 1) * PAGE_SIZE + 1,
                  filteredTags.length
                )} to ${Math.min(currentPage * PAGE_SIZE, filteredTags.length)} of ${
                  filteredTags.length
                } tags`}
                pages={pageNumbers}
                activePage={currentPage}
                onPageChange={setCurrentPage}
              />
            }
          >
            <TableWrap>
              <THead
                columns={[
                  { label: "No.", align: "center" },
                  "Term Entered",
                  "Standard Medical Term",
                  "Therapy Area",
                  "Category",
                  "Risk Tag",
                  "Status",
                  { label: "Action", align: "right" },
                ]}
              />
              <tbody>
                {paginatedTags.length === 0 ? (
                  <TR>
                    <TD colSpan={8} className="py-8 text-center text-muted-foreground">
                      No vocabulary tags found matching your filter criteria.
                    </TD>
                  </TR>
                ) : (
                  paginatedTags.map((row) => {
                    const isSelected = row.id === selectedTagId && !isCreatingNew;
                    return (
                      <TR
                        key={row.id}
                        onClick={() => handleSelectTag(row)}
                        className={`cursor-pointer transition-colors ${
                          isSelected ? "bg-accent/15 hover:bg-accent/20" : ""
                        }`}
                      >
                        <TD align="center" className="text-xs font-mono text-muted-foreground">
                          {row.no ?? "-"}
                        </TD>
                        <TD className="font-semibold text-primary">
                          {row.termEnteredByUser}
                        </TD>
                        <TD className="text-navy">{row.standardTerm}</TD>
                        <TD className="max-w-[130px] truncate" title={row.therapyArea}>
                          {row.therapyArea}
                        </TD>
                        <TD className="text-xs">{row.category}</TD>
                        <TD>
                          <Pill tone={riskTone(row.riskTag)}>{row.riskTag}</Pill>
                        </TD>
                        <TD>
                          <Pill tone={statusTone(row.status)}>{row.status}</Pill>
                        </TD>
                        <TD align="right">
                          <div className="inline-flex items-center gap-1.5 text-muted-foreground">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSelectTag(row);
                              }}
                              className="rounded p-1 hover:bg-muted hover:text-navy"
                              title="Edit term"
                            >
                              <Pencil className="size-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={(e) => handleDeleteTag(row.id, e)}
                              className="rounded p-1 hover:bg-destructive/10 hover:text-destructive"
                              title="Delete tag"
                            >
                              <Trash2 className="size-3.5" />
                            </button>
                          </div>
                        </TD>
                      </TR>
                    );
                  })
                )}
              </tbody>
            </TableWrap>
          </Panel>
        </div>

        {/* Term Details Panel */}
        <Panel
          title={
            isCreatingNew
              ? "New Vocabulary Tag"
              : `Term Details #${formState.no ?? activeTag?.no ?? ""}`
          }
          actions={
            <div className="flex items-center gap-2">
              {isCreatingNew ? (
                <Pill tone="info">Creating New</Pill>
              ) : (
                <Pill tone={riskTone(formState.riskTag || "No-risk")}>
                  {formState.riskTag || "No-risk"}
                </Pill>
              )}
            </div>
          }
        >
          <div className="grid gap-3.5">
            <Field label="Term Entered by User" required>
              <input
                className={inputClass}
                placeholder="e.g. HTN, High BP, Lung Attack"
                value={formState.termEnteredByUser || ""}
                onChange={(e) =>
                  setFormState((prev) => ({ ...prev, termEnteredByUser: e.target.value }))
                }
              />
            </Field>

            <Field label="Standard Medical Term" required>
              <input
                className={inputClass}
                placeholder="e.g. Hypertension, COPD Exacerbation"
                value={formState.standardTerm || ""}
                onChange={(e) =>
                  setFormState((prev) => ({ ...prev, standardTerm: e.target.value }))
                }
              />
            </Field>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Therapy Area" required>
                <input
                  className={inputClass}
                  placeholder="e.g. Cardiology, Neurology"
                  value={formState.therapyArea || ""}
                  onChange={(e) =>
                    setFormState((prev) => ({ ...prev, therapyArea: e.target.value }))
                  }
                />
              </Field>

              <Field label="Category" required>
                <input
                  className={inputClass}
                  placeholder="e.g. Disease, Drug, Symptom"
                  value={formState.category || ""}
                  onChange={(e) =>
                    setFormState((prev) => ({ ...prev, category: e.target.value }))
                  }
                />
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Intent Tag" required>
                <input
                  className={inputClass}
                  placeholder="e.g. General medical, Safety"
                  value={formState.intentTag || ""}
                  onChange={(e) =>
                    setFormState((prev) => ({ ...prev, intentTag: e.target.value }))
                  }
                />
              </Field>

              <Field label="Risk Classification" required>
                <select
                  className={inputClass}
                  value={formState.riskTag || "No-risk"}
                  onChange={(e) =>
                    setFormState((prev) => ({
                      ...prev,
                      riskTag: e.target.value as VocabularyRiskTag,
                    }))
                  }
                >
                  {getRiskTagList().map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <Field label="Synonym Group" required>
              <input
                className={inputClass}
                placeholder="e.g. HYPERTENSION"
                value={formState.synonymGroup || ""}
                onChange={(e) =>
                  setFormState((prev) => ({
                    ...prev,
                    synonymGroup: e.target.value.toUpperCase(),
                  }))
                }
              />
            </Field>

            <Field label="Spoken Variants (Comma separated)">
              <textarea
                rows={2}
                placeholder="HTN, Hypertension, High BP, Raised BP"
                value={(formState.spokenVariants || []).join(", ")}
                onChange={(e) =>
                  setFormState((prev) => ({
                    ...prev,
                    spokenVariants: e.target.value
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean),
                  }))
                }
                className="w-full rounded-xl border border-border bg-card p-2.5 text-xs text-navy placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </Field>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Status" required>
                <select
                  className={inputClass}
                  value={formState.status || "Approved for Demo"}
                  onChange={(e) =>
                    setFormState((prev) => ({ ...prev, status: e.target.value }))
                  }
                >
                  <option value="Approved for Demo">Approved for Demo</option>
                  <option value="Active">Active</option>
                  <option value="Pending Review">Pending Review</option>
                  <option value="Deprecated">Deprecated</option>
                </select>
              </Field>

              <Field label="Reviewer">
                <input
                  className={inputClass}
                  placeholder="Medical Advisor/Manager"
                  value={formState.reviewer || ""}
                  onChange={(e) =>
                    setFormState((prev) => ({ ...prev, reviewer: e.target.value }))
                  }
                />
              </Field>
            </div>

            <Field label="Source Basis / Regulatory Context">
              <textarea
                rows={2}
                placeholder="Clinical basis or rationale"
                value={formState.sourceBasis || ""}
                onChange={(e) =>
                  setFormState((prev) => ({ ...prev, sourceBasis: e.target.value }))
                }
                className="w-full rounded-xl border border-border bg-card p-2.5 text-xs text-navy placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </Field>

            {/* AI Assistant Context Note */}
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-3 text-xs text-muted-foreground">
              <div className="mb-1 flex items-center gap-1.5 font-semibold text-primary">
                <Sparkles className="size-3.5" />
                <span>Deterministic Guardrail Linkage</span>
              </div>
              Terms tagged as{" "}
              <strong className="text-navy">{formState.riskTag || "No-risk"}</strong>{" "}
              trigger automatic guardrail evaluations during simulated HCP detailing and flag
              transcripts for supervisor review when compliance penalties are met.
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={() => {
                if (isCreatingNew) {
                  setIsCreatingNew(false);
                  if (activeTag) setFormState({ ...activeTag });
                } else if (activeTag) {
                  setFormState({ ...activeTag });
                }
              }}
            >
              Reset
            </Button>
            <Button onClick={handleSaveTag}>
              <Check className="size-4" /> Save Tag
            </Button>
          </div>
        </Panel>
      </div>
    </MarketingShell>
  );
}
