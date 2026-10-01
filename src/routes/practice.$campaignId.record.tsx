import { useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  CheckCircle2,
  Clock,
  Mic,
  Pause,
  Play,
  RotateCcw,
  Sparkles,
  Square,
  UploadCloud,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { InputContextBar } from "@/components/tm/InputContextBar";
import { Button } from "@/components/ui/button";
import { practiceContext } from "@/data/tm";
import { formatClock } from "@/utils/format";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth";
import { uploadPracticeAudio } from "@/services/storage";
import { savePracticeAttempt } from "@/services/practice";
import type { RecordingState } from "@/types";

export const Route = createFileRoute("/practice/$campaignId/record")({
  head: () => ({
    meta: [
      { title: "Practice Your Detailing — Q-Pilot" },
      {
        name: "description",
        content:
          "Record your detailing for the approved input, cover the key points and submit it for AI assessment.",
      },
      { property: "og:title", content: "Practice Your Detailing — Q-Pilot" },
      {
        property: "og:description",
        content: "Record, review and submit your detailing practice attempt in Q-Pilot.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RecordPracticePage,
});

function RecordPracticePage() {
  const { campaignId } = Route.useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const [state, setState] = useState<RecordingState>("idle");
  const [seconds, setSeconds] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [playbackUrl, setPlaybackUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioStreamRef = useRef<MediaStream | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);

  // Timer while recording
  useEffect(() => {
    if (state !== "recording") return;
    timer.current = setInterval(() => setSeconds((value) => value + 1), 1000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [state]);

  // Clean up streams and players on unmount
  useEffect(() => {
    return () => {
      if (audioStreamRef.current) {
        audioStreamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (audioPlayerRef.current) {
        audioPlayerRef.current.pause();
      }
      if (playbackUrl) {
        URL.revokeObjectURL(playbackUrl);
      }
    };
  }, [playbackUrl]);

  const bars = useMemo(
    () => Array.from({ length: 64 }, (_, index) => 12 + ((index * 37) % 70)),
    [],
  );

  const startRecording = async () => {
    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error("Microphone API not supported on this browser");
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioStreamRef.current = stream;
      audioChunksRef.current = [];

      let mimeType = "audio/webm";
      if (!MediaRecorder.isTypeSupported("audio/webm")) {
        if (MediaRecorder.isTypeSupported("audio/mp4")) {
          mimeType = "audio/mp4";
        } else {
          mimeType = "";
        }
      }

      const recorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);

      recorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        const type = recorder.mimeType || "audio/webm";
        const blob = new Blob(audioChunksRef.current, { type });
        setRecordedBlob(blob);
        const url = URL.createObjectURL(blob);
        setPlaybackUrl(url);
      };

      mediaRecorderRef.current = recorder;
      recorder.start(250);
      setState("recording");
      setSeconds(0);
      toast.info("Microphone connected — recording live detailing audio");
    } catch (err: any) {
      console.warn("Microphone access unavailable, using simulated take:", err);
      toast.warning("Microphone access unavailable — starting simulated recording take");
      setState("recording");
      setSeconds(0);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
    if (audioStreamRef.current) {
      audioStreamRef.current.getTracks().forEach((track) => track.stop());
      audioStreamRef.current = null;
    }
    setState("stopped");
    toast.success("Recording complete! You can listen back or submit for scoring.");
  };

  const toggleRecording = () => {
    if (state === "recording") {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const togglePlayback = () => {
    if (!playbackUrl) {
      setIsPlaying((prev) => !prev);
      return;
    }

    if (!audioPlayerRef.current) {
      audioPlayerRef.current = new Audio(playbackUrl);
      audioPlayerRef.current.onended = () => setIsPlaying(false);
    }

    if (isPlaying) {
      audioPlayerRef.current.pause();
      setIsPlaying(false);
    } else {
      audioPlayerRef.current.play().catch((e) => console.warn("Playback error:", e));
      setIsPlaying(true);
    }
  };

  const handleReset = () => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
      audioPlayerRef.current = null;
    }
    setIsPlaying(false);
    setState("idle");
    setSeconds(0);
    setRecordedBlob(null);
    if (playbackUrl) {
      URL.revokeObjectURL(playbackUrl);
      setPlaybackUrl(null);
    }
  };

  const hasTake = state === "stopped";

  const submit = async () => {
    setSubmitting(true);
    try {
      let finalAudioUrl = playbackUrl || "";

      if (recordedBlob) {
        toast.loading("Uploading audio to Supabase Storage...", { id: "audio-upload" });
        const uploadResult = await uploadPracticeAudio({
          audioBlob: recordedBlob,
          campaignId,
          userId: user.id,
        });
        finalAudioUrl = uploadResult.url;
        toast.success(
          uploadResult.isFallback
            ? "Practice take stored locally (connect Supabase bucket for cloud sync)"
            : "Practice audio successfully uploaded to Supabase Storage!",
          { id: "audio-upload" },
        );
      }

      toast.loading("Evaluating detailing with Gemini AI...", { id: "ai-eval" });
      const { isAiEvaluated } = await savePracticeAttempt({
        campaignId,
        userId: user.id,
        mode: "guided",
        durationSeconds: seconds || 15,
        audioUrl: finalAudioUrl,
        audioBlob: recordedBlob ?? undefined,
      });

      await queryClient.invalidateQueries();

      toast.success(
        isAiEvaluated
          ? "Gemini 2.0 Flash evaluated detailing accuracy, adherence & rubric!"
          : "Assessment submitted! Reviewing detailing rubric...",
        { id: "ai-eval" },
      );
      setTimeout(() => {
        navigate({ to: "/practice/$campaignId/transcript", params: { campaignId } });
      }, 700);
    } catch (err: any) {
      console.error("Submission failed:", err);
      toast.error("Failed to submit recording: " + (err.message || "Unknown error"));
      setSubmitting(false);
    }
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <InputContextBar
          inputName={practiceContext.inputTitle}
          month={practiceContext.month}
          visit={practiceContext.visit}
        />
        <header>
          <p className="text-lg font-extrabold uppercase tracking-wide text-brand-red">
            {practiceContext.brand}
          </p>
          <h1 className="mt-1 text-3xl font-extrabold text-navy sm:text-4xl">
            {practiceContext.inputTitle}
          </h1>
          <p className="mt-1 text-base font-bold text-primary">Practice Your Detailing</p>
        </header>

        <div className="grid gap-5 lg:grid-cols-12">
          <section className="card-surface p-5 lg:col-span-5">
            <div className="overflow-hidden rounded-2xl border-2 border-brand-red/40">
              <div className="bg-card p-5 text-center">
                <p className="text-lg font-extrabold uppercase tracking-wide text-brand-red">
                  {practiceContext.brand}
                </p>
                <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  Consistent BP Control
                </p>
                <p className="mt-4 text-xl font-extrabold text-navy">
                  {practiceContext.cardTitleLine1}
                </p>
                <p className="text-xl font-extrabold text-brand-red">
                  {practiceContext.cardTitleLine2}
                </p>
              </div>
              <p className="bg-navy px-4 py-3 text-center text-sm font-bold text-navy-foreground">
                {practiceContext.cardFooter}
              </p>
            </div>
          </section>

          <section className="card-surface p-6 lg:col-span-7">
            <h2 className="text-lg font-extrabold text-navy">Your Key Points</h2>
            <ul className="mt-4 space-y-3">
              {practiceContext.keyPoints.map((point) => (
                <li key={point} className="flex items-center gap-3 text-sm font-semibold text-navy">
                  <CheckCircle2 className="size-5 shrink-0 text-primary" />
                  {point}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="card-surface p-6 sm:p-8">
          <div className="grid items-center gap-6 md:grid-cols-[1fr_auto_1fr]">
            <div className="flex items-center gap-3 md:justify-end">
              <Clock className="size-6 text-primary" />
              <p className="font-mono text-3xl font-extrabold tracking-tight text-navy">
                {formatClock(seconds)}
              </p>
            </div>

            <div className="relative mx-auto grid size-44 place-items-center">
              <span className="absolute inset-0 rounded-full bg-accent" />
              <span
                className={cn(
                  "absolute inset-3 rounded-full border-2 border-dashed border-primary/30",
                  state === "recording" && "animate-pulse-ring",
                )}
              />
              <button
                type="button"
                aria-label={state === "recording" ? "Stop practice" : "Start practice"}
                onClick={toggleRecording}
                className="relative grid size-24 cursor-pointer place-items-center rounded-full bg-primary text-primary-foreground shadow-card transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/40"
              >
                {state === "recording" ? <Square className="size-8" /> : <Mic className="size-9" />}
              </button>
            </div>

            <div className="flex h-16 items-center gap-[2px] overflow-hidden" aria-hidden="true">
              {bars.map((height, index) => (
                <span
                  key={index}
                  className={cn(
                    "w-full rounded-full transition-all duration-300",
                    state === "recording" ? "bg-primary" : "bg-primary/30",
                  )}
                  style={{
                    height:
                      state === "recording"
                        ? `${Math.min(95, height + ((seconds * 11 + index * 7) % 35))}%`
                        : `${Math.max(8, Math.min(45, height / 2))}%`,
                  }}
                />
              ))}
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <Button
              size="lg"
              className="rounded-xl px-10 text-sm font-extrabold uppercase tracking-wide cursor-pointer"
              onClick={toggleRecording}
            >
              {state === "recording" ? "Stop Practice" : hasTake ? "Practice Again" : "Start Practice"}
            </Button>
          </div>

          <div className="mt-6 border-t border-border pt-5">
            <p className="flex items-center justify-center gap-2 text-sm font-semibold text-primary">
              <Sparkles className="size-4" />
              {practiceContext.hint}
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <Button
                variant="outline"
                className="rounded-xl cursor-pointer"
                disabled={!hasTake}
                onClick={togglePlayback}
              >
                {isPlaying ? <Pause className="size-4 text-primary" /> : <Play className="size-4" />}
                {isPlaying ? "Pause Playback" : "Listen Back"}
              </Button>
              <Button
                variant="outline"
                className="rounded-xl cursor-pointer"
                disabled={!hasTake}
                onClick={handleReset}
              >
                <RotateCcw className="size-4" />
                Record Again
              </Button>
              <Button
                className="rounded-xl cursor-pointer"
                disabled={!hasTake || submitting}
                onClick={submit}
              >
                {submitting ? (
                  <UploadCloud className="size-4 animate-bounce" />
                ) : (
                  <Sparkles className="size-4" />
                )}
                {submitting ? "Uploading to Supabase..." : "Submit for AI Assessment"}
              </Button>
            </div>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Live microphone recording connected. Submissions are saved to Supabase Storage and logged to the practice database.
            </p>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
