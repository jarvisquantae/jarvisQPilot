import { useState, useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ClipboardList, Plus, TriangleAlert } from "lucide-react";
import { MarketingShell } from "@/components/layout/MarketingShell";
import { ConsolePageTitle } from "@/components/layout/ConsoleShell";
import {
  Field,
  FilterBar,
  FilterSelect,
  Panel,
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
import {
  MM_ACTIONS,
  MM_ACTION_GUIDE,
  MM_ACTION_STATS,
  MM_ACTION_TYPES,
  MM_FILTER_OPTIONS,
} from "@/data/marketing";
import { toast } from "sonner";

export const Route = createFileRoute("/marketing/actions")({
  head: () => ({
    meta: [
      { title: "Performance Action Management — Q-Pilot Marketing" },
      {
        name: "description",
        content:
          "Assign reminders, guided or concept-specific practice, coaching and manager reviews, then track status, due dates and outcomes.",
      },
      { property: "og:title", content: "Performance Action Management — Q-Pilot Marketing" },
      {
        property: "og:description",
        content: "Track assignee, brand, reason, due date, status and outcome for every action.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MarketingActions,
});

const statusTone: Record<string, ConsoleTone | "muted"> = {
  Open: "warning",
  "In Progress": "info",
  Completed: "success",
  Overdue: "danger",
};

function MarketingActions() {
  const formRef = useRef<HTMLDivElement>(null);

  const [actions, setActions] = useState(MM_ACTIONS);
  const [campaignFilter, setCampaignFilter] = useState("All Campaigns");
  const [brandFilter, setBrandFilter] = useState("All Products");
  const [statusFilter, setStatusFilter] = useState("All Statuses");

  // Form fields
  const [assignee, setAssignee] = useState(MM_FILTER_OPTIONS.tm[1] ?? "Arjun Mehta");
  const [actionType, setActionType] = useState(MM_ACTION_TYPES[0] ?? "Guided Practice");
  const [brandCampaign, setBrandCampaign] = useState(MM_FILTER_OPTIONS.campaign[1] ?? "CARDIOCARE Q2");
  const [dueDate, setDueDate] = useState("2025-06-25");
  const [reason, setReason] = useState("");

  const handleScrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    toast.info("Complete the form below to assign an action");
  };

  const handleAssignAction = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `ACT-${actions.length + 101}`;
    const newAction = {
      id: newId,
      assignee,
      type: actionType,
      brand: brandCampaign.split(" ")[0] ?? "CARDIOCARE",
      reason: reason || "Performance threshold review and guided detailing practice.",
      due: dueDate || "Jun 28, 2025",
      outcome: "Pending Rep Submission",
      status: "Open",
    };
    setActions([newAction, ...actions]);
    setReason("");
    toast.success(`Action ${newId} assigned to ${assignee}`);
  };

  const handleSaveDraft = () => {
    toast.info("Action saved as draft");
  };

  const filteredActions = actions.filter((row) => {
    const campWord = campaignFilter.split(" ")[0] ?? "";
    const brandWord = brandFilter.split(" ")[0] ?? "";
    if (campaignFilter !== "All Campaigns" && !row.brand.includes(campWord)) {
      return false;
    }
    if (brandFilter !== "All Products" && !row.brand.includes(brandWord)) {
      return false;
    }
    if (statusFilter !== "All Statuses" && row.status !== statusFilter) {
      return false;
    }
    return true;
  });

  return (
    <MarketingShell searchPlaceholder="Search actions, TMs, brands...">
      <ConsolePageTitle
        title="Performance Action Management"
        subtitle="Every action is assigned by Marketing — Copilot only suggests."
        actions={
          <>
            <Button variant="outline" asChild>
              <Link to="/marketing/performance">Performance dashboard</Link>
            </Button>
            <Button onClick={handleScrollToForm}>
              <Plus className="size-4" /> New action
            </Button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {MM_ACTION_STATS.map((stat) => (
          <StatTile
            key={stat.label}
            label={stat.label}
            value={stat.value}
            delta={"delta" in stat ? stat.delta : undefined}
            deltaLabel={"deltaLabel" in stat ? stat.deltaLabel : undefined}
            note={"note" in stat ? stat.note : undefined}
            tone={stat.tone}
            icon={<ClipboardList className="size-5" />}
          />
        ))}
      </div>

      <div className="mt-5">
        <FilterBar>
          <FilterSelect
            label="Campaign"
            options={MM_FILTER_OPTIONS.campaign}
            value={campaignFilter}
            onChange={setCampaignFilter}
          />
          <FilterSelect
            label="Brand"
            options={MM_FILTER_OPTIONS.product}
            value={brandFilter}
            onChange={setBrandFilter}
          />
          <FilterSelect
            label="Action status"
            options={["All Statuses", "Open", "In Progress", "Completed", "Overdue"]}
            value={statusFilter}
            onChange={setStatusFilter}
          />
          {(campaignFilter !== "All Campaigns" || brandFilter !== "All Products" || statusFilter !== "All Statuses") && (
            <button
              type="button"
              onClick={() => {
                setCampaignFilter("All Campaigns");
                setBrandFilter("All Products");
                setStatusFilter("All Statuses");
                toast.info("Filters cleared");
              }}
              className="h-10 px-2 text-xs font-bold text-primary hover:underline"
            >
              Clear filters
            </button>
          )}
        </FilterBar>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.6fr_1fr]">
        <Panel
          title="Action tracker"
          bodyClassName="px-0 pb-0"
          footer={<span>Showing {filteredActions.length} of {actions.length} open and recent actions</span>}
        >
          <TableWrap>
            <THead
              columns={[
                "Action",
                "Assignee",
                "Type",
                "Brand",
                "Reason",
                "Due",
                "Outcome",
                { label: "Status", align: "right" },
              ]}
            />
            <tbody>
              {filteredActions.map((row) => (
                <TR key={row.id}>
                  <TD strong>{row.id}</TD>
                  <TD>{row.assignee}</TD>
                  <TD>{row.type}</TD>
                  <TD>{row.brand}</TD>
                  <TD className="min-w-[12rem]">{row.reason}</TD>
                  <TD>{row.due}</TD>
                  <TD>{row.outcome}</TD>
                  <TD align="right">
                    <Pill tone={statusTone[row.status] ?? "muted"}>{row.status}</Pill>
                  </TD>
                </TR>
              ))}
              {filteredActions.length === 0 && (
                <TR>
                  <TD colSpan={8} className="py-8 text-center text-muted-foreground">
                    No actions match the selected filters.
                  </TD>
                </TR>
              )}
            </tbody>
          </TableWrap>
        </Panel>

        <div className="space-y-5" ref={formRef}>
          <Panel title="Assign an action">
            <form onSubmit={handleAssignAction}>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Assignee" required>
                  <select
                    value={assignee}
                    onChange={(e) => setAssignee(e.target.value)}
                    className={inputClass}
                  >
                    {MM_FILTER_OPTIONS.tm.slice(1).map((tm) => (
                      <option key={tm} value={tm}>{tm}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Action type" required>
                  <select
                    value={actionType}
                    onChange={(e) => setActionType(e.target.value)}
                    className={inputClass}
                  >
                    {MM_ACTION_TYPES.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Brand / campaign" required>
                  <select
                    value={brandCampaign}
                    onChange={(e) => setBrandCampaign(e.target.value)}
                    className={inputClass}
                  >
                    {MM_FILTER_OPTIONS.campaign.slice(1).map((campaign) => (
                      <option key={campaign} value={campaign}>{campaign}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Due date" required>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className={inputClass}
                    required
                  />
                </Field>
                <Field label="Reason" className="sm:col-span-2">
                  <textarea
                    rows={3}
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className={`${inputClass} h-auto py-2`}
                    placeholder="Missed mandatory concept 'once-daily dosing' in 4 of 5 attempts."
                  />
                </Field>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button type="submit">Assign action</Button>
                <Button type="button" variant="outline" onClick={handleSaveDraft}>
                  Save draft
                </Button>
              </div>
            </form>
          </Panel>

          <Panel title="Assignment guidance">
            <ul className="space-y-3">
              {MM_ACTION_GUIDE.map((row) => (
                <li key={row.label} className="rounded-2xl border border-border bg-muted/40 p-4">
                  <Pill tone={row.tone}>{row.label}</Pill>
                  <p className="mt-2 text-xs font-semibold text-navy">{row.rule}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{row.action}</p>
                </li>
              ))}
            </ul>
            <p className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-semibold text-warning">
              <TriangleAlert className="size-3" /> Overdue actions are escalated to the Sales Manager.
            </p>
          </Panel>
        </div>
      </div>
    </MarketingShell>
  );
}
