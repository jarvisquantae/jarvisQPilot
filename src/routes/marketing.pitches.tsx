import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Plus, Sparkles, X } from "lucide-react";
import { MarketingShell } from "@/components/layout/MarketingShell";
import { ConsolePageTitle } from "@/components/layout/ConsoleShell";
import {
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
import { MM_FILTER_OPTIONS, MM_PITCHES, MM_PITCH_SECTIONS } from "@/data/marketing";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const Route = createFileRoute("/marketing/pitches")({
  head: () => ({
    meta: [
      { title: "Pitch Library — Q-Pilot Marketing" },
      {
        name: "description",
        content: "Review, version and publish the approved detailing pitches Q-Pilot rolls out to territory managers.",
      },
      { property: "og:title", content: "Pitch Library — Q-Pilot Marketing" },
      { property: "og:description", content: "Approved detailing pitch versions, review status and publishing." },
    ],
  }),
  component: MarketingPitches,
});

const statusTone = (status: string) =>
  status === "Published" ? "success" : status === "Pending Approval" ? "warning" : "muted";

function MarketingPitches() {
  const [pitches, setPitches] = useState(MM_PITCHES);
  const [selectedPitchName, setSelectedPitchName] = useState(MM_PITCHES[0]!.name);
  const [campaignFilter, setCampaignFilter] = useState("All Campaigns");
  const [productFilter, setProductFilter] = useState("All Products");
  const [statusFilter, setStatusFilter] = useState("All Statuses");

  // New Pitch modal state
  const [newPitchOpen, setNewPitchOpen] = useState(false);
  const [newPitchName, setNewPitchName] = useState("");
  const [newCampaign, setNewCampaign] = useState("CARDIOCARE Q2");
  const [newProduct, setNewProduct] = useState("CARDIOCARE");
  const [newOpening, setNewOpening] = useState("");
  const [newCore, setNewCore] = useState("");
  const [newClosing, setNewClosing] = useState("");

  const selectedPitch =
    pitches.find((p) => p.name === selectedPitchName) ?? pitches[0]!;

  const filteredPitches = pitches.filter((pitch) => {
    if (campaignFilter !== "All Campaigns" && pitch.campaign !== campaignFilter) {
      return false;
    }
    if (productFilter !== "All Products" && pitch.product !== productFilter) {
      return false;
    }
    if (statusFilter !== "All Statuses" && pitch.status !== statusFilter) {
      return false;
    }
    return true;
  });

  const handleCreatePitch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPitchName.trim()) {
      toast.error("Please enter a pitch name");
      return;
    }
    const created = {
      name: newPitchName.trim(),
      campaign: newCampaign,
      product: newProduct,
      version: "v1",
      updatedBy: "You (Marketing Manager)",
      updated: "Just now",
      status: "Draft",
    };
    setPitches([created, ...pitches]);
    setSelectedPitchName(created.name);
    setNewPitchOpen(false);
    setNewPitchName("");
    setNewOpening("");
    setNewCore("");
    setNewClosing("");
    toast.success(`Created draft pitch: ${created.name}`);
  };

  const handleSaveDraft = () => {
    toast.success(`Draft saved for ${selectedPitch.name}`);
  };

  const handleSendApproval = () => {
    setPitches((prev) =>
      prev.map((p) =>
        p.name === selectedPitch.name ? { ...p, status: "Pending Approval" } : p
      )
    );
    toast.success(`Submitted ${selectedPitch.name} for Medical Affairs approval`);
  };

  return (
    <MarketingShell searchPlaceholder="Search pitches...">
      <ConsolePageTitle
        title="Pitch Library & Approval"
        subtitle="Draft, review and publish the approved detailing script"
        actions={
          <Button size="sm" onClick={() => setNewPitchOpen(true)}>
            <Plus className="size-4" /> New Pitch
          </Button>
        }
      />

      <FilterBar>
        <FilterSelect
          label="Campaign"
          options={MM_FILTER_OPTIONS.campaign}
          value={campaignFilter}
          onChange={setCampaignFilter}
        />
        <FilterSelect
          label="Product"
          options={MM_FILTER_OPTIONS.product}
          value={productFilter}
          onChange={setProductFilter}
        />
        <FilterSelect
          label="Status"
          options={["All Statuses", "Published", "Pending Approval", "Draft"]}
          value={statusFilter}
          onChange={setStatusFilter}
        />
        {(campaignFilter !== "All Campaigns" || productFilter !== "All Products" || statusFilter !== "All Statuses") && (
          <button
            type="button"
            onClick={() => {
              setCampaignFilter("All Campaigns");
              setProductFilter("All Products");
              setStatusFilter("All Statuses");
              toast.info("Filters cleared");
            }}
            className="h-10 px-2 text-xs font-bold text-primary hover:underline"
          >
            Clear filters
          </button>
        )}
      </FilterBar>

      <div className="grid gap-5 xl:grid-cols-[1.15fr_1fr]">
        <Panel
          title="Pitches"
          info
          bodyClassName=""
          footer={<Pagination showing={`Showing 1 to ${filteredPitches.length} of ${pitches.length} pitches`} />}
        >
          <TableWrap>
            <THead
              columns={[
                "Pitch Name",
                "Campaign",
                "Version",
                "Updated By",
                "Status",
                { label: "Actions", align: "right" },
              ]}
            />
            <tbody>
              {filteredPitches.map((pitch) => {
                const isSelected = pitch.name === selectedPitch.name;
                return (
                  <TR
                    key={pitch.name}
                    className={cn("cursor-pointer transition-colors", isSelected && "bg-primary/5")}
                    onClick={() => setSelectedPitchName(pitch.name)}
                  >
                    <TD strong>
                      <span className={cn(isSelected && "text-primary")}>{pitch.name}</span>
                    </TD>
                    <TD>{pitch.campaign}</TD>
                    <TD>{pitch.version}</TD>
                    <TD>
                      {pitch.updatedBy}
                      <span className="block text-[11px] text-muted-foreground">{pitch.updated}</span>
                    </TD>
                    <TD>
                      <Pill tone={statusTone(pitch.status)}>{pitch.status}</Pill>
                    </TD>
                    <TD align="right">
                      <Button
                        variant={isSelected ? "default" : "outline"}
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedPitchName(pitch.name);
                        }}
                      >
                        {isSelected ? "Selected" : "Open"}
                      </Button>
                    </TD>
                  </TR>
                );
              })}
              {filteredPitches.length === 0 && (
                <TR>
                  <TD colSpan={6} className="py-8 text-center text-muted-foreground">
                    No pitches found matching the selected filters.
                  </TD>
                </TR>
              )}
            </tbody>
          </TableWrap>
        </Panel>

        <Panel
          title={selectedPitch.name}
          info
          actions={
            <div className="flex items-center gap-2">
              <Pill tone={statusTone(selectedPitch.status)}>
                {selectedPitch.status} · {selectedPitch.version}
              </Pill>
            </div>
          }
        >
          <ol className="space-y-3">
            {MM_PITCH_SECTIONS.map((section) => (
              <li key={section.title} className="rounded-2xl border border-border p-4 bg-card">
                <p className="text-xs font-bold uppercase tracking-wide text-primary">
                  {section.title}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-navy">{section.body}</p>
              </li>
            ))}
          </ol>

          <div className="mt-5 rounded-2xl bg-ai/8 p-4">
            <p className="inline-flex items-center gap-2 text-sm font-bold text-ai">
              <Sparkles className="size-4" /> AI review notes
            </p>
            <ul className="mt-2 space-y-1.5 text-xs text-muted-foreground">
              <li className="flex gap-2">
                <Check className="mt-0.5 size-3.5 shrink-0 text-success" />
                All three mandatory messages present.
              </li>
              <li className="flex gap-2">
                <Check className="mt-0.5 size-3.5 shrink-0 text-success" />
                No prohibited claims detected.
              </li>
              <li className="flex gap-2">
                <Check className="mt-0.5 size-3.5 shrink-0 text-warning" />
                Closing includes compliant patient-benefit rationale.
              </li>
            </ul>
          </div>

          <div className="mt-5 flex flex-wrap justify-end gap-2 border-t border-border pt-4">
            <Button variant="outline" size="sm" onClick={handleSaveDraft}>
              Save Draft
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSendApproval}
              disabled={selectedPitch.status === "Pending Approval" || selectedPitch.status === "Published"}
            >
              {selectedPitch.status === "Pending Approval" ? "Awaiting Review" : "Send for Approval"}
            </Button>
            <Button size="sm" asChild>
              <Link to="/marketing/audio">Publish & Set Audio</Link>
            </Button>
          </div>
        </Panel>
      </div>

      {/* New Pitch Modal */}
      {newPitchOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-navy">Create New Detailing Pitch</h3>
              <button
                type="button"
                onClick={() => setNewPitchOpen(false)}
                className="grid size-8 place-items-center rounded-lg text-muted-foreground hover:bg-muted"
              >
                <X className="size-4" />
              </button>
            </div>
            <form onSubmit={handleCreatePitch} className="mt-4 space-y-4">
              <Field label="Pitch Title" required>
                <input
                  value={newPitchName}
                  onChange={(e) => setNewPitchName(e.target.value)}
                  placeholder="e.g. CARDIOCARE Q3 Follow-up Pitch"
                  className={inputClass}
                  required
                />
              </Field>
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Campaign" required>
                  <select
                    value={newCampaign}
                    onChange={(e) => setNewCampaign(e.target.value)}
                    className={inputClass}
                  >
                    <option value="CARDIOCARE Q2">CARDIOCARE Q2</option>
                    <option value="NEUROPLUS Launch">NEUROPLUS Launch</option>
                    <option value="RESPIRA Max">RESPIRA Max</option>
                    <option value="DIABETA Care">DIABETA Care</option>
                  </select>
                </Field>
                <Field label="Product" required>
                  <select
                    value={newProduct}
                    onChange={(e) => setNewProduct(e.target.value)}
                    className={inputClass}
                  >
                    <option value="CARDIOCARE">CARDIOCARE</option>
                    <option value="NEUROPLUS">NEUROPLUS</option>
                    <option value="RESPIRA Max">RESPIRA Max</option>
                    <option value="DIABETA Care">DIABETA Care</option>
                  </select>
                </Field>
              </div>
              <Field label="Opening Hook" hint="Hook the HCP in the first 30 seconds">
                <textarea
                  rows={2}
                  value={newOpening}
                  onChange={(e) => setNewOpening(e.target.value)}
                  placeholder="Good morning Doctor Sharma, thank you for your time today..."
                  className={`${inputClass} h-auto py-2`}
                />
              </Field>
              <Field label="Core Messages" hint="Include mandatory product benefits and clinical trials">
                <textarea
                  rows={3}
                  value={newCore}
                  onChange={(e) => setNewCore(e.target.value)}
                  placeholder="Proven 24-hour BP control, once-daily dosing with high patient adherence..."
                  className={`${inputClass} h-auto py-2`}
                />
              </Field>
              <Field label="Closing Ask" hint="Clear request for appropriate patient commitment">
                <textarea
                  rows={2}
                  value={newClosing}
                  onChange={(e) => setNewClosing(e.target.value)}
                  placeholder="Doctor, will you consider starting your next suitable hypertensive patient on this?"
                  className={`${inputClass} h-auto py-2`}
                />
              </Field>
              <div className="mt-6 flex justify-end gap-2">
                <Button variant="outline" type="button" onClick={() => setNewPitchOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Create Pitch Draft</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </MarketingShell>
  );
}

