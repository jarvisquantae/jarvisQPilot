import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  MoreVertical,
  UserPlus,
  X,
  CheckCircle2,
} from "lucide-react";
import { MarketingShell } from "@/components/layout/MarketingShell";
import { ConsolePageTitle } from "@/components/layout/ConsoleShell";
import {
  Dot,
  Field,
  FilterBar,
  FilterSelect,
  Panel,
  Pagination,
  Pill,
  TD,
  THead,
  TR,
  TableWrap,
  inputClass,
} from "@/components/console/primitives";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MM_CALENDAR_ACTIVITIES, MM_FILTER_OPTIONS, MM_TM_ASSIGNMENTS } from "@/data/marketing";
import { toast } from "sonner";

export const Route = createFileRoute("/marketing/calendar")({
  head: () => ({
    meta: [
      { title: "Distribution Calendar — Q-Pilot Marketing" },
      {
        name: "description",
        content: "Schedule detailing, e-detailing and sampling activity, then assign territory managers per campaign.",
      },
      { property: "og:title", content: "Distribution Calendar — Q-Pilot Marketing" },
      { property: "og:description", content: "Monthly activity schedule and territory manager assignment." },
    ],
  }),
  component: MarketingCalendar,
});

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["April 2025", "May 2025", "June 2025"];
// May 2025 starts on a Thursday.
const LEADING = [27, 28, 29, 30];
const DAYS = Array.from({ length: 31 }, (_, index) => index + 1);

const statusTone = (status: string) =>
  status === "Assigned" ? "teal" : status === "In Progress" ? "warning" : "muted";

function MarketingCalendar() {
  const [monthIndex, setMonthIndex] = useState(1); // May 2025
  const [calendarView, setCalendarView] = useState<"Month" | "Week">("Month");
  const [assignments, setAssignments] = useState(MM_TM_ASSIGNMENTS);

  // Filters
  const [quarterFilter, setQuarterFilter] = useState("Q2 2025");
  const [campaignFilter, setCampaignFilter] = useState("All Campaigns");
  const [selectedDay, setSelectedDay] = useState(21);

  // Modals
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [viewAssignment, setViewAssignment] = useState<(typeof MM_TM_ASSIGNMENTS)[number] | null>(null);

  // Form fields
  const [newTM, setNewTM] = useState(MM_FILTER_OPTIONS.tm[1] ?? "Arjun Mehta");
  const [newSM, setNewSM] = useState(MM_FILTER_OPTIONS.salesManager[1] ?? "Vikram Joshi");
  const [newCamp, setNewCamp] = useState("CARDIOCARE Q2");
  const [newDue, setNewDue] = useState("May 28, 2025");
  const [newPractice, setNewPractice] = useState("Cardiology Clinics");

  const handleResetFilters = () => {
    setQuarterFilter("Q2 2025");
    setCampaignFilter("All Campaigns");
    setMonthIndex(1);
    toast.info("Calendar filters reset");
  };

  const handleExport = () => {
    const csvContent =
      "TM Name,Sales Manager,Campaign,Product,Due Date,Practice Required,Status\n" +
      assignments
        .map((a) => `"${a.tm}","${a.sm}","${a.campaign}","${a.product}","${a.due}","${a.practice}","${a.status}"`)
        .join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `tm_assignments_${(MONTHS[monthIndex] ?? "may_2025").toLowerCase().replace(" ", "_")}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success("Exported TM assignments CSV");
  };

  const handleAssignSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const created = {
      tm: newTM,
      sm: newSM,
      campaign: newCamp,
      product: newCamp.split(" ")[0] ?? "CARDIOCARE",
      due: newDue,
      practice: newPractice,
      status: "Assigned",
    };
    setAssignments([created, ...assignments]);
    setAssignModalOpen(false);
    toast.success(`Assigned ${newTM} to ${newCamp}`);
  };

  return (
    <MarketingShell searchPlaceholder="Search assignments...">
      <ConsolePageTitle title="Distribution Calendar & Assignment" />

      <FilterBar>
        <FilterSelect
          label="Quarter"
          options={MM_FILTER_OPTIONS.quarter}
          value={quarterFilter}
          onChange={setQuarterFilter}
        />
        <FilterSelect
          label="Campaign"
          options={MM_FILTER_OPTIONS.campaign}
          value={campaignFilter}
          onChange={setCampaignFilter}
        />
        <FilterSelect label="Specialty" options={MM_FILTER_OPTIONS.specialty} />
        <FilterSelect label="Sales Manager" options={MM_FILTER_OPTIONS.salesManager} />
        <button
          type="button"
          onClick={handleResetFilters}
          className="h-10 cursor-pointer px-2 text-sm font-bold text-primary hover:underline"
        >
          Reset
        </button>
      </FilterBar>

      <Panel
        title="Distribution Calendar"
        info
        actions={
          <>
            <div className="flex rounded-xl border border-border p-0.5 bg-muted/40">
              <button
                type="button"
                onClick={() => setCalendarView("Month")}
                className={cn(
                  "cursor-pointer rounded-lg px-3 py-1.5 text-xs font-bold transition-colors",
                  calendarView === "Month"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-navy"
                )}
              >
                Month
              </button>
              <button
                type="button"
                onClick={() => setCalendarView("Week")}
                className={cn(
                  "cursor-pointer rounded-lg px-3 py-1.5 text-xs font-bold transition-colors",
                  calendarView === "Week"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-navy"
                )}
              >
                Week
              </button>
            </div>
            <Button size="sm" onClick={() => toast.success("Distribution calendar schedule saved")}>
              Update Calendar
            </Button>
          </>
        }
      >
        <div className="mb-3 flex items-center gap-3">
          <button
            type="button"
            aria-label="Previous month"
            onClick={() => {
              if (monthIndex > 0) setMonthIndex((i) => i - 1);
            }}
            disabled={monthIndex === 0}
            className="grid size-8 cursor-pointer place-items-center rounded-lg border border-border text-muted-foreground hover:bg-muted disabled:opacity-40"
          >
            <ChevronLeft className="size-4" />
          </button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setMonthIndex(1); // May
              setSelectedDay(21);
              toast.info("Navigated to today");
            }}
          >
            Today
          </Button>
          <p className="flex-1 text-center text-sm font-bold text-navy">{MONTHS[monthIndex]}</p>
          <button
            type="button"
            aria-label="Next month"
            onClick={() => {
              if (monthIndex < MONTHS.length - 1) setMonthIndex((i) => i + 1);
            }}
            disabled={monthIndex === MONTHS.length - 1}
            className="grid size-8 cursor-pointer place-items-center rounded-lg border border-border text-muted-foreground hover:bg-muted disabled:opacity-40"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[52rem]">
            <div className="grid grid-cols-7 border border-border bg-muted/50">
              {WEEKDAYS.map((day) => (
                <div key={day} className="px-3 py-2 text-xs font-bold text-muted-foreground">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 border-x border-b border-border">
              {calendarView === "Month" &&
                LEADING.map((day) => (
                  <div
                    key={`lead-${day}`}
                    className="min-h-20 border-b border-r border-border bg-muted/30 p-2 text-xs text-muted-foreground/60"
                  >
                    {day}
                  </div>
                ))}
              {(calendarView === "Month" ? DAYS : DAYS.slice(14, 21)).map((day) => {
                const entry = MM_CALENDAR_ACTIVITIES[day];
                const highlighted = day === selectedDay;
                return (
                  <div
                    key={day}
                    onClick={() => {
                      setSelectedDay(day);
                      if (entry) {
                        toast.info(`Day ${day}: ${entry.campaign} - ${entry.activity}`);
                      }
                    }}
                    className={cn(
                      "min-h-20 cursor-pointer border-b border-r border-border p-2 transition-colors",
                      highlighted ? "bg-primary/10 ring-1 ring-primary/40" : "hover:bg-muted/30"
                    )}
                  >
                    <p className="text-xs font-bold text-navy">{day}</p>
                    {entry && (
                      <div className="mt-1 flex gap-1.5 text-[11px] leading-snug text-muted-foreground">
                        <span className="mt-1">
                          <Dot tone="teal" />
                        </span>
                        <span>
                          <span className="block font-semibold text-navy">{entry.campaign}</span>
                          {entry.activity}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
              {calendarView === "Month" &&
                [1, 2, 3].map((day) => (
                  <div
                    key={`trail-${day}`}
                    className="min-h-20 border-b border-r border-border bg-muted/30 p-2 text-xs text-muted-foreground/60"
                  >
                    {day}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </Panel>

      <Panel
        className="mt-5"
        title="TM Assignment"
        info
        bodyClassName=""
        actions={
          <>
            <Button size="sm" onClick={() => setAssignModalOpen(true)}>
              <UserPlus className="size-4" /> Assign TMs
            </Button>
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="size-4" /> Export
            </Button>
          </>
        }
        footer={<Pagination showing={`Showing 1 to ${assignments.length} of ${assignments.length}`} />}
      >
        <TableWrap>
          <THead
            columns={[
              "TM Name",
              "Sales Manager",
              "Campaign",
              "Product",
              "Due Date",
              "Practice Required",
              "Status",
              { label: "Action", align: "right" },
            ]}
          />
          <tbody>
            {assignments.map((row) => (
              <TR key={row.tm}>
                <TD strong>{row.tm}</TD>
                <TD>{row.sm}</TD>
                <TD>{row.campaign}</TD>
                <TD>{row.product}</TD>
                <TD>{row.due}</TD>
                <TD>{row.practice}</TD>
                <TD>
                  <Pill tone={statusTone(row.status)}>{row.status}</Pill>
                </TD>
                <TD align="right">
                  <span className="inline-flex items-center gap-1.5">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setViewAssignment(row)}
                    >
                      View
                    </Button>
                    <button
                      type="button"
                      onClick={() => toast.info(`Options for ${row.tm}`)}
                      className="cursor-pointer p-1 text-muted-foreground hover:text-navy"
                    >
                      <MoreVertical className="size-4" />
                    </button>
                  </span>
                </TD>
              </TR>
            ))}
          </tbody>
        </TableWrap>
      </Panel>

      {/* Assign TMs Modal */}
      {assignModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-navy">Assign Territory Manager</h3>
              <button
                type="button"
                onClick={() => setAssignModalOpen(false)}
                className="grid size-8 place-items-center rounded-lg text-muted-foreground hover:bg-muted"
              >
                <X className="size-4" />
              </button>
            </div>
            <form onSubmit={handleAssignSubmit} className="mt-4 space-y-4">
              <Field label="Territory Manager" required>
                <select
                  value={newTM}
                  onChange={(e) => setNewTM(e.target.value)}
                  className={inputClass}
                >
                  {MM_FILTER_OPTIONS.tm.slice(1).map((tm) => (
                    <option key={tm} value={tm}>{tm}</option>
                  ))}
                </select>
              </Field>
              <Field label="Sales Manager" required>
                <select
                  value={newSM}
                  onChange={(e) => setNewSM(e.target.value)}
                  className={inputClass}
                >
                  {MM_FILTER_OPTIONS.salesManager.slice(1).map((sm) => (
                    <option key={sm} value={sm}>{sm}</option>
                  ))}
                </select>
              </Field>
              <Field label="Target Campaign" required>
                <select
                  value={newCamp}
                  onChange={(e) => setNewCamp(e.target.value)}
                  className={inputClass}
                >
                  <option value="CARDIOCARE Q2">CARDIOCARE Q2</option>
                  <option value="NEUROPLUS Launch">NEUROPLUS Launch</option>
                  <option value="RESPIRA Max">RESPIRA Max</option>
                  <option value="DIABETA Care">DIABETA Care</option>
                </select>
              </Field>
              <Field label="Practice Focus" required>
                <input
                  value={newPractice}
                  onChange={(e) => setNewPractice(e.target.value)}
                  placeholder="e.g. Hypertension OPDs"
                  className={inputClass}
                  required
                />
              </Field>
              <Field label="Completion Due Date" required>
                <input
                  value={newDue}
                  onChange={(e) => setNewDue(e.target.value)}
                  className={inputClass}
                  required
                />
              </Field>
              <div className="mt-6 flex justify-end gap-2">
                <Button variant="outline" type="button" onClick={() => setAssignModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Confirm Assignment</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Assignment Modal */}
      {viewAssignment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-xl">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold text-navy">{viewAssignment.tm}</h3>
                <p className="text-xs text-muted-foreground">Reporting to {viewAssignment.sm}</p>
              </div>
              <button
                type="button"
                onClick={() => setViewAssignment(null)}
                className="grid size-8 place-items-center rounded-lg text-muted-foreground hover:bg-muted"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="mt-5 space-y-3 rounded-xl border border-border bg-muted/20 p-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Campaign:</span>
                <span className="font-semibold text-navy">{viewAssignment.campaign}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Product:</span>
                <span className="font-semibold text-navy">{viewAssignment.product}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Target Practice Scope:</span>
                <span className="font-semibold text-navy">{viewAssignment.practice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Due Date:</span>
                <span className="font-semibold text-navy">{viewAssignment.due}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Assignment Status:</span>
                <Pill tone={statusTone(viewAssignment.status)}>{viewAssignment.status}</Pill>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => setViewAssignment(null)}>
                Close
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  toast.success(`Sent reminder notification to ${viewAssignment.tm}`);
                  setViewAssignment(null);
                }}
              >
                Send Reminder
              </Button>
            </div>
          </div>
        </div>
      )}
    </MarketingShell>
  );
}

