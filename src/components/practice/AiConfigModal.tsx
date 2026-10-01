import { useState, useEffect } from "react";
import { Sparkles, Key, Check, ExternalLink, ShieldCheck, Cpu } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getGeminiApiKey, setGeminiApiKey, isGeminiConfigured } from "@/services/ai";
import { toast } from "sonner";

export function AiConfigModal({
  open,
  onOpenChange,
  onConfigChanged,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfigChanged?: () => void;
}) {
  const [apiKey, setApiKey] = useState("");
  const [isConfigured, setIsConfigured] = useState(false);

  useEffect(() => {
    if (open) {
      const current = getGeminiApiKey() || "";
      setApiKey(current);
      setIsConfigured(isGeminiConfigured());
    }
  }, [open]);

  const handleSave = () => {
    const trimmed = apiKey.trim();
    if (!trimmed) {
      toast.error("Please enter a valid Gemini API key");
      return;
    }
    setGeminiApiKey(trimmed);
    setIsConfigured(true);
    toast.success("Gemini API key saved! Multimodal audio evaluation is active.");
    onConfigChanged?.();
    onOpenChange(false);
  };

  const handleClear = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("qp_gemini_api_key");
    }
    setApiKey("");
    setIsConfigured(false);
    toast.info("Gemini key removed. Recording will use browser real-time speech recognition.");
    onConfigChanged?.();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-white border border-border shadow-xl">
        <DialogHeader>
          <div className="flex items-center gap-2 text-primary mb-1">
            <Sparkles className="size-5" />
            <DialogTitle className="text-lg font-bold text-navy">AI Detailing Evaluation Engine</DialogTitle>
          </div>
          <DialogDescription className="text-xs text-muted-foreground">
            Configure how medical detailing recordings are transcribed and scored against brand guidelines.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Active status indicator */}
          <div className="rounded-xl border border-border bg-surface-2 p-3.5">
            <p className="text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">
              Current Evaluation Mode
            </p>
            {isConfigured ? (
              <div className="flex items-start gap-2.5 text-xs text-emerald-800">
                <div className="mt-0.5 rounded-full bg-emerald-100 p-1 text-emerald-600">
                  <ShieldCheck className="size-3.5" />
                </div>
                <div>
                  <span className="font-bold">Google Gemini 2.0 Flash (Cloud Multimodal API)</span>
                  <p className="mt-0.5 text-muted-foreground text-[11px]">
                    Zero load on your device. Audio is directly analyzed for pronunciation, clinical adherence, and compliance.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-2.5 text-xs text-amber-800">
                <div className="mt-0.5 rounded-full bg-amber-100 p-1 text-amber-600">
                  <Cpu className="size-3.5" />
                </div>
                <div>
                  <span className="font-bold">Browser Real-Time Speech Recognition</span>
                  <p className="mt-0.5 text-muted-foreground text-[11px]">
                    Transcribes your live voice directly via browser Web Speech API with 0% GPU load.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* API Key field */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-navy flex items-center justify-between">
              <span>Google Gemini API Key</span>
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-primary hover:underline flex items-center gap-1 font-normal"
              >
                Get free key <ExternalLink className="size-2.5" />
              </a>
            </label>
            <div className="relative">
              <Key className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
              <Input
                type="password"
                placeholder="AIzaSy..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="pl-9 text-xs font-mono"
              />
            </div>
            <p className="text-[11px] text-muted-foreground">
              Free tier includes generous RPM limits and requires no credit card.
            </p>
          </div>
        </div>

        <DialogFooter className="flex items-center justify-between sm:justify-between gap-2 border-t pt-3">
          {isConfigured ? (
            <Button variant="ghost" size="sm" onClick={handleClear} className="text-xs text-rose-600 hover:text-rose-700">
              Clear Key
            </Button>
          ) : (
            <div />
          )}
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleSave} className="bg-navy hover:bg-navy/90 text-white">
              <Check className="size-3.5 mr-1" />
              Save & Activate
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
