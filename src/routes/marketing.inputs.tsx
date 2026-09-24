import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  FileText,
  Image,
  Lightbulb,
  Sparkles,
  Upload,
  Volume2,
  X,
} from "lucide-react";
import { MarketingShell } from "@/components/layout/MarketingShell";
import { Button } from "@/components/ui/button";
import { Field, inputClass, Pill } from "@/components/console/primitives";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const Route = createFileRoute("/marketing/inputs")({
  head: () => ({
    meta: [
      { title: "Create New Input — JARVIS Q-PILOT" },
      { name: "description", content: "Create and prepare a campaign input for the field team." },
      { property: "og:title", content: "Create New Input — JARVIS Q-PILOT" },
      { property: "og:description", content: "Create and prepare a campaign input for the field team." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MarketingInputs,
});

const steps = [
  "Campaign Details",
  "Upload Input",
  "Detailing Story",
  "AI Audio",
  "Key Points",
  "Preview & Publish",
];

function MarketingInputs() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  // Form states
  const [theme, setTheme] = useState("BP Control Awareness");
  const [brandName, setBrandName] = useState("CARDIOCARE");
  const [month, setMonth] = useState("April 2025");
  const [inputName, setInputName] = useState("Scientific LBL – Series 1");
  const [inputType, setInputType] = useState("Scientific LBL");
  const [visit, setVisit] = useState("Visit 1");
  const [detailingStory, setDetailingStory] = useState(
    "CARDIOCARE helps achieve sustained blood pressure control, supported by a clear and compliant scientific story for appropriate patients."
  );
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [keyPoints, setKeyPoints] = useState([
    "Superior 24h ambulatory BP reduction versus standard ARB",
    "Once-daily morning dose maximizes adherence",
    "Favorable renal safety profile across comorbid diabetic patients",
  ]);
  const [newPoint, setNewPoint] = useState("");

  const handleNext = () => {
    if (currentStep === 0 && !inputName.trim()) {
      toast.error("Please provide an Input Name");
      return;
    }
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
      toast.info(`Step ${currentStep + 2}: ${steps[currentStep + 1]}`);
    } else {
      // Final step: Publish
      toast.success(`Successfully published "${inputName}" for ${brandName}!`);
      setTimeout(() => {
        navigate({ to: "/marketing/campaigns" });
      }, 600);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleAddPoint = () => {
    if (newPoint.trim()) {
      setKeyPoints([...keyPoints, newPoint.trim()]);
      setNewPoint("");
      toast.success("Key recall point added");
    }
  };

  const handleRemovePoint = (index: number) => {
    setKeyPoints(keyPoints.filter((_, i) => i !== index));
  };

  return (
    <MarketingShell>
      <Button variant="ghost" size="sm" asChild className="mb-4 -ml-2">
        <Link to="/marketing/campaigns">
          <ArrowLeft className="size-4" /> Back to Campaigns
        </Link>
      </Button>

      <section className="card-surface mb-5 flex flex-wrap items-center justify-between gap-4 p-4">
        <div className="flex items-center gap-3">
          <span className="grid size-12 place-items-center rounded-xl bg-mint text-primary">
            <FileText className="size-6" />
          </span>
          <div>
            <h1 className="text-xl font-extrabold text-navy">{brandName}</h1>
            <p className="text-sm text-muted-foreground">{theme}</p>
          </div>
        </div>
        <ol className="flex max-w-full items-start overflow-x-auto pb-1" aria-label="Wizard steps">
          {steps.map((step, index) => (
            <li key={step} className="flex min-w-24 items-start">
              <button
                type="button"
                onClick={() => setCurrentStep(index)}
                className="flex min-w-20 cursor-pointer flex-col items-center text-center focus-visible:outline-none"
              >
                <span
                  className={cn(
                    "grid size-7 place-items-center rounded-full text-xs font-bold transition-colors",
                    index === currentStep
                      ? "bg-primary text-primary-foreground ring-2 ring-primary/30"
                      : index < currentStep
                        ? "bg-success text-success-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                  )}
                >
                  {index < currentStep ? <Check className="size-3.5" /> : index + 1}
                </span>
                <span
                  className={cn(
                    "mt-1 text-[10px] font-semibold transition-colors",
                    index === currentStep ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {step}
                </span>
              </button>
              {index < steps.length - 1 && <span className="mt-3.5 h-px w-5 shrink-0 bg-border" />}
            </li>
          ))}
        </ol>
      </section>

      <div className="grid gap-5 xl:grid-cols-[1fr_17rem]">
        <section className="card-surface p-5 sm:p-6">
          <div className="border-b border-border pb-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-extrabold text-navy">
                Step {currentStep + 1}: {steps[currentStep]}
              </h2>
              <Pill tone="teal">
                Step {currentStep + 1} of {steps.length}
              </Pill>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {currentStep === 0 && "Configure campaign details and field scheduling."}
              {currentStep === 1 && "Upload the collateral document (PDF, PPT, or images)."}
              {currentStep === 2 && "Draft the recommended representative detailing narrative."}
              {currentStep === 3 && "Configure AI voice synthesis and model detailing audio."}
              {currentStep === 4 && "Define mandatory recall bullets for representative assessment."}
              {currentStep === 5 && "Review pre-flight checklist and deploy to the field team."}
            </p>
          </div>

          {/* STEP 0: Campaign Details */}
          {currentStep === 0 && (
            <div className="mt-5 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                <Field label="Theme" required>
                  <select
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    className={inputClass}
                  >
                    <option value="BP Control Awareness">BP Control Awareness</option>
                    <option value="Renal Protection Focus">Renal Protection Focus</option>
                    <option value="Comorbidity Management">Comorbidity Management</option>
                  </select>
                </Field>
                <Field label="Brand Name" required>
                  <select
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    className={inputClass}
                  >
                    <option value="CARDIOCARE">CARDIOCARE</option>
                    <option value="NEUROPLUS">NEUROPLUS</option>
                    <option value="DIABETA Care">DIABETA Care</option>
                    <option value="RESPIRA Max">RESPIRA Max</option>
                  </select>
                </Field>
                <Field label="Utilization Month" required>
                  <div className="relative">
                    <CalendarDays className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      value={month}
                      onChange={(e) => setMonth(e.target.value)}
                      className={`${inputClass} pl-9`}
                    />
                  </div>
                </Field>
                <Field label="Input Name" required>
                  <input
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)}
                    className={inputClass}
                    placeholder="e.g. Scientific LBL – Series 1"
                  />
                </Field>
                <Field label="Input Type" required>
                  <select
                    value={inputType}
                    onChange={(e) => setInputType(e.target.value)}
                    className={inputClass}
                  >
                    <option value="Scientific LBL">Scientific LBL</option>
                    <option value="Visual Aid">Visual Aid</option>
                    <option value="Leave Behind">Leave Behind</option>
                    <option value="Detailing Aid">Detailing Aid</option>
                    <option value="Reminder Card">Reminder Card</option>
                  </select>
                </Field>
                <Field label="Visit" required>
                  <select
                    value={visit}
                    onChange={(e) => setVisit(e.target.value)}
                    className={inputClass}
                  >
                    <option value="Visit 1">Visit 1</option>
                    <option value="Visit 2">Visit 2</option>
                    <option value="Visit 3">Visit 3</option>
                  </select>
                </Field>
              </div>
            </div>
          )}

          {/* STEP 1: Upload Input */}
          {currentStep === 1 && (
            <div className="mt-5 space-y-4">
              <label className="flex min-h-36 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-primary/40 bg-mint/30 p-6 text-center transition-colors hover:bg-mint/50">
                <Upload className="size-8 text-primary" />
                <span className="mt-2 text-sm font-bold text-navy">
                  {uploadedFile ? uploadedFile.name : "Drag and drop a file, or click to browse"}
                </span>
                <span className="mt-1 text-xs text-muted-foreground">
                  {uploadedFile
                    ? `${(uploadedFile.size / 1024).toFixed(1)} KB · Ready for processing`
                    : "PDF, PPT, JPG or PNG up to 10 MB"}
                </span>
                <input
                  type="file"
                  accept=".pdf,.ppt,.pptx,.jpg,.jpeg,.png"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) {
                      setUploadedFile(f);
                      toast.success(`Attached file: ${f.name}`);
                    }
                  }}
                />
              </label>

              {uploadedFile && (
                <div className="flex items-center justify-between rounded-xl border border-border bg-card p-3">
                  <div className="flex items-center gap-2">
                    <FileText className="size-4 text-primary" />
                    <span className="text-sm font-semibold text-navy">{uploadedFile.name}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setUploadedFile(null);
                      toast.info("Removed attachment");
                    }}
                    className="text-xs font-semibold text-destructive hover:underline"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: Detailing Story */}
          {currentStep === 2 && (
            <div className="mt-5 space-y-4">
              <Field
                label="Detailing Narrative / Script"
                hint="Provide the core medical and positioning narrative reps should memorize and practice."
              >
                <textarea
                  rows={6}
                  value={detailingStory}
                  onChange={(e) => setDetailingStory(e.target.value)}
                  className="w-full rounded-xl border border-border bg-card p-3 text-sm text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </Field>
              <div className="rounded-xl border border-ai/20 bg-ai/5 p-4 text-xs text-navy flex items-center justify-between">
                <span className="inline-flex items-center gap-2 font-semibold">
                  <Sparkles className="size-4 text-ai" /> AI Copilot suggests: 3 clinical claims detected
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toast.success("AI clinical terminology verified")}
                >
                  Verify Compliance
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3: AI Audio */}
          {currentStep === 3 && (
            <div className="mt-5 space-y-4">
              <div className="rounded-2xl border border-border bg-card p-5">
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-xl bg-primary/12 text-primary">
                    <Volume2 className="size-5" />
                  </span>
                  <div>
                    <h4 className="font-bold text-navy">Simulated Voice Detailing Track</h4>
                    <p className="text-xs text-muted-foreground">Neural Voice: Standard Indian English (Medical Professional)</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <Button
                    size="sm"
                    onClick={() => toast.success("Playing sample AI voice detailing")}
                  >
                    Preview Voice Sample
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toast.success("Synthesized audio updated with current story")}
                  >
                    Regenerate Track
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Key Points */}
          {currentStep === 4 && (
            <div className="mt-5 space-y-4">
              <div className="flex gap-2">
                <input
                  value={newPoint}
                  onChange={(e) => setNewPoint(e.target.value)}
                  placeholder="Add mandatory messaging recall point..."
                  className={inputClass}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddPoint();
                    }
                  }}
                />
                <Button onClick={handleAddPoint}>Add Point</Button>
              </div>

              <ul className="space-y-2">
                {keyPoints.map((pt, i) => (
                  <li
                    key={pt}
                    className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card p-3 text-sm text-navy"
                  >
                    <span className="flex items-center gap-2">
                      <span className="grid size-5 place-items-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                        {i + 1}
                      </span>
                      {pt}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemovePoint(i)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <X className="size-4" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* STEP 5: Preview & Publish */}
          {currentStep === 5 && (
            <div className="mt-5 space-y-4">
              <div className="space-y-3 rounded-2xl border border-border bg-muted/20 p-5 text-sm">
                <div className="flex justify-between border-b border-border pb-2">
                  <span className="text-muted-foreground">Brand:</span>
                  <span className="font-bold text-navy">{brandName}</span>
                </div>
                <div className="flex justify-between border-b border-border pb-2">
                  <span className="text-muted-foreground">Input Name:</span>
                  <span className="font-bold text-navy">{inputName}</span>
                </div>
                <div className="flex justify-between border-b border-border pb-2">
                  <span className="text-muted-foreground">Format & Visit:</span>
                  <span className="font-semibold text-navy">{inputType} · {visit} ({month})</span>
                </div>
                <div className="flex justify-between border-b border-border pb-2">
                  <span className="text-muted-foreground">Key Messaging Points:</span>
                  <span className="font-semibold text-navy">{keyPoints.length} mandatory criteria</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Medical Affairs Approval:</span>
                  <span className="inline-flex items-center gap-1 font-bold text-success">
                    <CheckCircle2 className="size-4" /> Ready for Field Release
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="mt-6 flex flex-wrap justify-between gap-3 border-t border-border pt-5">
            <Button
              variant="outline"
              onClick={currentStep === 0 ? () => navigate({ to: "/marketing/campaigns" }) : handlePrev}
            >
              {currentStep === 0 ? "Cancel" : "Previous"}
            </Button>
            <Button onClick={handleNext}>
              {currentStep === steps.length - 1 ? (
                <>
                  <CheckCircle2 className="size-4" /> Publish to Field
                </>
              ) : (
                <>
                  Next <ArrowRight className="size-4" />
                </>
              )}
            </Button>
          </div>
        </section>

        <aside className="space-y-4">
          <section className="card-surface p-4">
            <h2 className="font-bold text-navy">Input Preview</h2>
            <div className="mt-3 rounded-xl border border-border bg-muted/35 p-4">
              <span className="grid size-10 place-items-center rounded-xl bg-mint text-primary">
                <Image className="size-5" />
              </span>
              <p className="mt-5 text-xs font-bold text-primary">{brandName}</p>
              <p className="mt-1 text-lg font-extrabold leading-tight text-navy uppercase">
                {inputName || "Input Title"}
              </p>
              <p className="mt-2 text-xs text-muted-foreground line-clamp-3">
                {detailingStory || "Understanding sustained BP control"}
              </p>
              <div className="mt-4 flex items-center justify-between border-t border-border pt-2 text-[11px] text-muted-foreground">
                <span>{inputType}</span>
                <span>{visit}</span>
              </div>
            </div>
          </section>
          <section className="rounded-xl border border-primary/20 bg-mint p-4">
            <h2 className="inline-flex items-center gap-2 font-bold text-navy">
              <Lightbulb className="size-4 text-primary" /> Tips for a Good Input
            </h2>
            <ul className="mt-3 space-y-2">
              {[
                "Keep the content concise and relevant.",
                "Use simple, clear language.",
                "Focus on approved key messages.",
                "Ensure the content is compliant.",
              ].map((tip) => (
                <li key={tip} className="flex gap-2 text-xs text-muted-foreground">
                  <Check className="mt-0.5 size-3.5 shrink-0 text-success" />
                  {tip}
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>
    </MarketingShell>
  );
}