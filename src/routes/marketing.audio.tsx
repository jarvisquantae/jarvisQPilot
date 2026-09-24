import { useState, useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  GripVertical,
  Loader2,
  Plus,
  RefreshCw,
  Sparkles,
  Trash2,
  Upload,
  X,
} from "lucide-react";
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
} from "@/components/console/primitives";
import { Button } from "@/components/ui/button";
import { AudioPlayer } from "@/components/audio/AudioPlayer";
import { MM_AUDIO_LIBRARY, MM_RUBRIC } from "@/data/marketing";
import { toast } from "sonner";

export const Route = createFileRoute("/marketing/audio")({
  head: () => ({
    meta: [
      { title: "Detailing Audio & Rubric — Q-Pilot Marketing" },
      {
        name: "description",
        content:
          "Attach detailing audio and define the assessment rubric: mandatory messages, prohibited claims and score weights.",
      },
      { property: "og:title", content: "Detailing Audio & Rubric — Q-Pilot Marketing" },
      { property: "og:description", content: "Audio setup plus the rubric Q-Pilot scores TM practice against." },
    ],
  }),
  component: MarketingAudio,
});

function RubricList({
  title,
  action,
  items,
  onAdd,
  onRemove,
}: {
  title: string;
  action: string;
  items: readonly string[];
  onAdd: (item: string) => void;
  onRemove: (index: number) => void;
}) {
  const [adding, setAdding] = useState(false);
  const [inputVal, setInputVal] = useState("");

  const handleSave = () => {
    if (inputVal.trim()) {
      onAdd(inputVal.trim());
      setInputVal("");
      setAdding(false);
      toast.success(`Added ${action}`);
    }
  };

  return (
    <div className="mb-5">
      <div className="mb-2 flex items-center justify-between gap-3">
        <h3 className="text-sm font-bold text-navy">{title}</h3>
        {!adding ? (
          <button
            type="button"
            onClick={() => setAdding(true)}
            className="cursor-pointer text-xs font-bold text-primary hover:underline"
          >
            + {action}
          </button>
        ) : null}
      </div>

      {adding && (
        <div className="mb-2 flex gap-2">
          <input
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder={`Enter ${action.toLowerCase()}...`}
            className={`${inputClass} text-xs`}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSave();
              } else if (e.key === "Escape") {
                setAdding(false);
              }
            }}
          />
          <Button size="sm" onClick={handleSave}>
            Add
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setAdding(false)}>
            <X className="size-3.5" />
          </Button>
        </div>
      )}

      <ul className="space-y-2">
        {items.map((item, index) => (
          <li
            key={item}
            className="group flex items-center gap-2.5 rounded-xl border border-border bg-card px-3 py-2.5 shadow-2xs"
          >
            <GripVertical className="size-4 shrink-0 text-muted-foreground/60" />
            <span className="flex-1 text-sm text-navy">{item}</span>
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="text-muted-foreground transition-colors hover:text-destructive"
              title="Remove item"
            >
              <Trash2 className="size-4" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MarketingAudio() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedPitch, setSelectedPitch] = useState("CARDIOCARE Q2");
  const [audioFile, setAudioFile] = useState(MM_RUBRIC.file);
  const [mandatoryList, setMandatoryList] = useState([...MM_RUBRIC.mandatory]);
  const [optionalList, setOptionalList] = useState([...MM_RUBRIC.optional]);
  const [prohibitedList, setProhibitedList] = useState([...MM_RUBRIC.prohibited]);
  const [audioLibrary, setAudioLibrary] = useState(MM_AUDIO_LIBRARY);
  const [generatingAudio, setGeneratingAudio] = useState(false);

  // Add Audio Modal
  const [addAudioOpen, setAddAudioOpen] = useState(false);
  const [newPitchName, setNewPitchName] = useState("");
  const [newCampaign, setNewCampaign] = useState("CARDIOCARE Q2");
  const [newDuration, setNewDuration] = useState("3m 15s");

  const handleReplaceAudioClick = () => {
    fileInputRef.current?.click();
  };

  const handleAudioFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAudioFile({
        ...audioFile,
        name: file.name,
        type: file.type || "audio/mpeg",
        uploadDate: "Just now",
        uploadedBy: "You (Marketing Manager)",
      });
      toast.success(`Attached new audio file: ${file.name}`);
    }
  };

  const handleGenerateAudio = () => {
    setGeneratingAudio(true);
    setTimeout(() => {
      setGeneratingAudio(false);
      setAudioFile({
        ...audioFile,
        name: `${selectedPitch.toLowerCase().replace(/\s+/g, "_")}_ai_model_v2.mp3`,
        uploadDate: "Just now",
        uploadedBy: "AI Neural TTS Engine",
      });
      toast.success("Synthesized AI detailing master audio!");
    }, 1200);
  };

  const handleSaveRubric = () => {
    toast.success("Assessment rubric and scoring weights saved!");
  };

  const handlePublishAudio = () => {
    setAudioLibrary((prev) =>
      prev.map((a) =>
        a.pitch.includes(selectedPitch) ? { ...a, status: "Published", rubric: "Complete" } : a
      )
    );
    toast.success(`Published detailing audio & rubric for ${selectedPitch}!`);
  };

  const handleAddAudioSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPitchName.trim()) {
      toast.error("Please enter a pitch name");
      return;
    }
    const created = {
      pitch: newPitchName.trim(),
      campaign: newCampaign,
      duration: newDuration,
      rubric: "Draft",
      updated: "Just now",
      status: "Draft",
    };
    setAudioLibrary([created, ...audioLibrary]);
    setSelectedPitch(created.pitch);
    setAddAudioOpen(false);
    setNewPitchName("");
    toast.success(`Added ${created.pitch} to Audio Library`);
  };

  return (
    <MarketingShell searchPlaceholder="Search audio...">
      <input
        ref={fileInputRef}
        type="file"
        accept="audio/*"
        className="hidden"
        onChange={handleAudioFileSelected}
      />

      <ConsolePageTitle title="Detailing Audio & Rubric" />

      <Link
        to="/marketing/pitches"
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline"
      >
        <ArrowLeft className="size-4" /> Back to Pitch Library
      </Link>

      <div className="grid gap-5 xl:grid-cols-2">
        <Panel title="Audio Setup">
          <p className="mb-2 text-sm font-bold text-navy">Selected Pitch</p>
          <div className="flex items-start justify-between gap-3 rounded-2xl border border-border p-4 bg-muted/20">
            <div>
              <p className="text-sm font-bold text-navy">{selectedPitch}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Managed by Marketing · Ready for evaluation
              </p>
            </div>
            <Pill tone="teal">Pitch</Pill>
          </div>

          <p className="mb-2 mt-5 text-sm font-bold text-navy">Audio File / Generated Audio</p>
          <AudioPlayer title={`${selectedPitch} detailing audio`} durationSeconds={222} />

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Button variant="outline" onClick={handleReplaceAudioClick}>
              <RefreshCw className="size-4" /> Replace Audio
            </Button>
            <Button variant="outline" onClick={handleGenerateAudio} disabled={generatingAudio}>
              {generatingAudio ? (
                <>
                  <Loader2 className="size-4 animate-spin text-ai" /> Generating...
                </>
              ) : (
                <>
                  <Sparkles className="size-4 text-ai" /> Generate Audio
                </>
              )}
            </Button>
          </div>

          <div className="mt-5 rounded-2xl border border-border">
            <p className="border-b border-border px-4 py-3 text-sm font-bold text-navy">
              File Details
            </p>
            <dl className="divide-y divide-border text-sm">
              {[
                ["File Name", audioFile.name],
                ["File Type", audioFile.type],
                ["Duration", audioFile.duration],
                ["Uploaded By", audioFile.uploadedBy],
                ["Upload Date", audioFile.uploadDate],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between gap-3 px-4 py-2.5">
                  <dt className="text-muted-foreground">{label}</dt>
                  <dd className="font-semibold text-navy truncate max-w-[14rem]">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Panel>

        <Panel title="Assessment Rubric" info>
          <RubricList
            title="Mandatory Messages"
            action="Message"
            items={mandatoryList}
            onAdd={(item) => setMandatoryList([...mandatoryList, item])}
            onRemove={(idx) => setMandatoryList(mandatoryList.filter((_, i) => i !== idx))}
          />
          <RubricList
            title="Optional Concepts"
            action="Concept"
            items={optionalList}
            onAdd={(item) => setOptionalList([...optionalList, item])}
            onRemove={(idx) => setOptionalList(optionalList.filter((_, i) => i !== idx))}
          />
          <RubricList
            title="Prohibited Claims"
            action="Claim"
            items={prohibitedList}
            onAdd={(item) => setProhibitedList([...prohibitedList, item])}
            onRemove={(idx) => setProhibitedList(prohibitedList.filter((_, i) => i !== idx))}
          />

          <h3 className="mb-2 text-sm font-bold text-navy">Score Weights (%)</h3>
          <div className="overflow-hidden rounded-2xl border border-border">
            <TableWrap>
              <THead columns={["Category", { label: "Weight (%)", align: "right" }]} />
              <tbody>
                {MM_RUBRIC.weights.map((row) => (
                  <TR key={row.category}>
                    <TD>{row.category}</TD>
                    <TD align="right" strong>
                      {row.weight}
                    </TD>
                  </TR>
                ))}
                <TR>
                  <TD strong>Total</TD>
                  <TD align="right" strong>
                    100
                  </TD>
                </TR>
              </tbody>
            </TableWrap>
          </div>

          <div className="mt-5 flex flex-wrap justify-end gap-2 border-t border-border pt-4">
            <Button variant="outline" size="sm" onClick={handleSaveRubric}>
              Save Rubric
            </Button>
            <Button size="sm" onClick={handlePublishAudio}>
              Publish Audio
            </Button>
          </div>
        </Panel>
      </div>

      <Panel
        className="mt-5"
        title="Audio Library"
        info
        bodyClassName=""
        actions={
          <Button variant="outline" size="sm" onClick={() => setAddAudioOpen(true)}>
            <Plus className="size-4" /> Add Audio
          </Button>
        }
      >
        <TableWrap>
          <THead
            columns={[
              "Pitch",
              "Campaign",
              { label: "Duration", align: "right" },
              "Rubric",
              "Updated",
              "Status",
              { label: "Actions", align: "right" },
            ]}
          />
          <tbody>
            {audioLibrary.map((row) => (
              <TR key={row.pitch}>
                <TD strong>{row.pitch}</TD>
                <TD>{row.campaign}</TD>
                <TD align="right">{row.duration}</TD>
                <TD>
                  <Pill tone={row.rubric === "Complete" ? "success" : "warning"}>{row.rubric}</Pill>
                </TD>
                <TD>{row.updated}</TD>
                <TD>
                  <Pill tone={row.status === "Published" ? "teal" : "muted"}>{row.status}</Pill>
                </TD>
                <TD align="right">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedPitch(row.pitch);
                      toast.info(`Loaded audio setup for ${row.pitch}`);
                    }}
                  >
                    Edit
                  </Button>
                </TD>
              </TR>
            ))}
          </tbody>
        </TableWrap>
      </Panel>

      {/* Add Audio Modal */}
      {addAudioOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-navy">Add Audio Track to Library</h3>
              <button
                type="button"
                onClick={() => setAddAudioOpen(false)}
                className="grid size-8 place-items-center rounded-lg text-muted-foreground hover:bg-muted"
              >
                <X className="size-4" />
              </button>
            </div>
            <form onSubmit={handleAddAudioSubmit} className="mt-4 space-y-4">
              <Field label="Pitch Name" required>
                <input
                  value={newPitchName}
                  onChange={(e) => setNewPitchName(e.target.value)}
                  placeholder="e.g. CARDIOVIA Series 1 Detailing"
                  className={inputClass}
                  required
                />
              </Field>
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
              <Field label="Duration" required>
                <input
                  value={newDuration}
                  onChange={(e) => setNewDuration(e.target.value)}
                  placeholder="e.g. 3m 45s"
                  className={inputClass}
                  required
                />
              </Field>
              <div className="mt-6 flex justify-end gap-2">
                <Button variant="outline" type="button" onClick={() => setAddAudioOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Add to Library</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </MarketingShell>
  );
}

