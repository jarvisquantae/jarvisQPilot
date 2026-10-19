import { useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Key,
  Mic,
  Pause,
  Pencil,
  Play,
  RotateCcw,
  Sparkles,
  Square,
  UploadCloud,
  FileText,
  Volume2,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { InputContextBar } from "@/components/tm/InputContextBar";
import { Button } from "@/components/ui/button";
import { AiConfigModal } from "@/components/practice/AiConfigModal";
import { practiceContext } from "@/data/tm";
import { formatClock } from "@/utils/format";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth";
import { uploadPracticeAudio } from "@/services/storage";
import { savePracticeAttempt } from "@/services/practice";
import { isGeminiConfigured } from "@/services/ai";
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

const SAMPLE_PITCH =
  "Good morning Doctor, thank you for your time. I would like to share the latest clinical data on CardioCare A for your patients with uncontrolled hypertension. CardioCare A demonstrates significant 24-hour ambulatory blood pressure reduction with proven cardiorenal protection. With once-daily dosing, it offers high patient adherence and an excellent tolerability profile. Doctor, may I request you to consider CardioCare A for your next hypertensive patients?";

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
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [geminiActive, setGeminiActive] = useState(false);

  // Live Speech Recognition State
  const [liveTranscript, setLiveTranscript] = useState("");
  const [isEditingTranscript, setIsEditingTranscript] = useState(false);
  const recognitionRef = useRef<any>(null);
  const isRecordingRef = useRef(false);

  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioStreamRef = useRef<MediaStream | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
  const playbackUrlRef = useRef<string | null>(null);

  useEffect(() => {
    setGeminiActive(isGeminiConfigured());
  }, []);

  // Timer while recording
  useEffect(() => {
    if (state !== "recording") return;
    timer.current = setInterval(() => setSeconds((value) => value + 1), 1000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [state]);

  // Clean up streams, speech recognition and players only on unmount
  useEffect(() => {
    return () => {
      isRecordingRef.current = false;
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {}
        recognitionRef.current = null;
      }
      if (audioStreamRef.current) {
        audioStreamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (audioPlayerRef.current) {
        audioPlayerRef.current.pause();
        audioPlayerRef.current = null;
      }
      if (playbackUrlRef.current) {
        URL.revokeObjectURL(playbackUrlRef.current);
      }
    };
  }, []);

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
        if (playbackUrlRef.current) {
          URL.revokeObjectURL(playbackUrlRef.current);
        }
        const url = URL.createObjectURL(blob);
        playbackUrlRef.current = url;
        setPlaybackUrl(url);
        if (audioPlayerRef.current) {
          audioPlayerRef.current.pause();
          audioPlayerRef.current = null;
        }
        setIsPlaying(false);
      };

      mediaRecorderRef.current = recorder;
      recorder.start(250);

      // Start Web Speech API Real-Time Transcription
      isRecordingRef.current = true;
      const SpeechRecognition =
        typeof window !== "undefined"
          ? (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
          : null;

      if (SpeechRecognition) {
        try {
          const recognition = new SpeechRecognition();
          recognition.continuous = true;
          recognition.interimResults = true;
          recognition.lang = "en-US";

          recognition.onresult = (event: any) => {
            let fullText = "";
            for (let i = 0; i < event.results.length; i++) {
              fullText += event.results[i][0].transcript + " ";
            }
            const clean = fullText.trim();
            if (clean) {
              setLiveTranscript(clean);
            }
          };

          recognition.onerror = (event: any) => {
            console.warn("Speech recognition notice:", event.error);
            if (event.error === "network") {
              console.info("Browser speech network service unavailable; click 'Use Sample Detailing Pitch' to proceed.");
            }
          };

          recognition.onend = () => {
            if (isRecordingRef.current) {
              try {
                recognition.start();
              } catch {}
            }
          };

          recognition.start();
          recognitionRef.current = recognition;
        } catch (speechErr) {
          console.warn("Web Speech API error:", speechErr);
        }
      }

      setState("recording");
      setSeconds(0);
      toast.info("Microphone connected — recording live detailing audio");
    } catch (err: any) {
      console.warn("Microphone access unavailable:", err);
      toast.error("Could not access microphone: " + (err.message || "Permission denied"));
    }
  };

  const stopRecording = () => {
    isRecordingRef.current = false;
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}
      recognitionRef.current = null;
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
    if (audioStreamRef.current) {
      audioStreamRef.current.getTracks().forEach((track) => track.stop());
      audioStreamRef.current = null;
    }
    setState("stopped");
    toast.success("Recording complete! Review your speech transcript below.");
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
      toast.warning("No audio recorded to play back yet");
      return;
    }

    if (!audioPlayerRef.current || audioPlayerRef.current.src !== playbackUrl) {
      if (audioPlayerRef.current) {
        audioPlayerRef.current.pause();
      }
      const audio = new Audio(playbackUrl);
      audio.onended = () => setIsPlaying(false);
      audio.onpause = () => setIsPlaying(false);
      audio.onplay = () => setIsPlaying(true);
      audioPlayerRef.current = audio;
    }

    if (isPlaying) {
      audioPlayerRef.current.pause();
      setIsPlaying(false);
    } else {
      audioPlayerRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((e) => {
          console.warn("Audio playback notice:", e);
          toast.error("Audio playback error: " + (e.message || "playback blocked"));
          setIsPlaying(false);
        });
    }
  };

  const handleReset = () => {
    isRecordingRef.current = false;
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch {}
      recognitionRef.current = null;
    }
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
      audioPlayerRef.current = null;
    }
    if (playbackUrlRef.current) {
      URL.revokeObjectURL(playbackUrlRef.current);
      playbackUrlRef.current = null;
    }
    setRecordedBlob(null);
    setPlaybackUrl(null);
    setLiveTranscript("");
    setIsPlaying(false);
    setState("idle");
    setSeconds(0);
  };

  const handleInsertSamplePitch = () => {
    setLiveTranscript(SAMPLE_PITCH);
    toast.success("Sample detailing pitch loaded into transcript!");
  };

  const hasTake = state === "stopped" || recordedBlob !== null;

  const submit = async () => {
    const transcriptToSubmit = liveTranscript.trim();
    const hasAudio = recordedBlob !== null && recordedBlob.size > 200;

    // Only block if NEITHER audio nor speech transcript was captured
    if (!transcriptToSubmit && !hasAudio) {
      toast.warning(
        "No audio or speech was recorded. Please click 'Start Practice' and speak, or click 'Use Sample Detailing Pitch' below.",
        {
          duration: 5000,
          action: {
            label: "Insert Sample Pitch",
            onClick: handleInsertSamplePitch,
          },
        }
      );
      return;
    }

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
            ? "Practice audio stored locally"
            : "Practice audio successfully uploaded to Supabase Storage!",
          { id: "audio-upload" },
        );
      }

      toast.loading("Analyzing detailing speech against campaign rubric...", {
        id: "ai-eval",
      });

      const { isAiEvaluated } = await savePracticeAttempt({
        campaignId,
        userId: user.id,
        mode: "guided",
        durationSeconds: seconds || 15,
        audioUrl: finalAudioUrl,
        audioBlob: recordedBlob ?? undefined,
        spokenTranscript: transcriptToSubmit,
      });

      await queryClient.invalidateQueries();

      toast.success("Detailing submitted! AI evaluated accuracy & adherence.", {
        id: "ai-eval",
      });
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
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-lg font-extrabold uppercase tracking-wide text-brand-red">
              {practiceContext.brand}
            </p>
            <h1 className="mt-1 text-3xl font-extrabold text-navy sm:text-4xl">
              {practiceContext.inputTitle}
            </h1>
            <p className="mt-1 text-base font-bold text-primary">Practice Your Detailing</p>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setAiModalOpen(true)}
            className="flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
          >
            <Key className="size-3.5 text-primary" />
            <span>AI Key: {geminiActive ? "Gemini Active" : "Browser Mode"}</span>
          </Button>
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

          {/* Real-Time Live Speech Transcription Panel */}
          <div className="mt-6 rounded-2xl border border-border bg-surface-2 p-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <FileText className="size-4 text-primary" />
                <span className="text-xs font-bold uppercase tracking-wider text-navy">
                  Speech Transcription Preview
                </span>
                {state === "recording" && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary">
                    <span className="size-2 animate-ping rounded-full bg-primary" />
                    Listening live...
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {liveTranscript && (
                  <button
                    type="button"
                    onClick={() => setIsEditingTranscript(!isEditingTranscript)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline cursor-pointer"
                  >
                    <Pencil className="size-3" />
                    {isEditingTranscript ? "Done Editing" : "Edit Words"}
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleInsertSamplePitch}
                  className="text-xs font-semibold text-primary hover:underline cursor-pointer flex items-center gap-1"
                  title="Insert approved pitch text to test scoring"
                >
                  <Sparkles className="size-3" />
                  Use Sample Detailing Pitch
                </button>
              </div>
            </div>

            <div className="mt-3">
              {isEditingTranscript ? (
                <textarea
                  rows={4}
                  value={liveTranscript}
                  onChange={(e) => setLiveTranscript(e.target.value)}
                  placeholder="Type or edit your detailing speech transcript..."
                  className="w-full rounded-xl border border-border bg-card p-3 text-sm text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              ) : liveTranscript ? (
                <p className="text-sm leading-relaxed text-navy italic">
                  “{liveTranscript}”
                </p>
              ) : (
                <p className="text-xs text-muted-foreground italic">
                  {state === "recording"
                    ? "Speak into your microphone — your words will appear here in real time."
                    : "Press 'Start Practice' and speak, or click 'Use Sample Detailing Pitch' to test."}
                </p>
              )}
            </div>

            {/* Missing Speech Banner */}
            {!liveTranscript && hasTake && (
              <div className="mt-3 rounded-xl border border-primary/20 bg-primary/5 p-3 text-xs text-navy">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div className="flex items-start gap-2">
                    <Sparkles className="size-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-navy">
                        {geminiActive ? "Audio recorded successfully." : "Microphone audio captured."}
                      </p>
                      <p className="text-muted-foreground mt-0.5 text-[11px]">
                        {geminiActive
                          ? "Gemini Multimodal AI is active and will transcribe your recording directly upon submission."
                          : "Click 'Insert Sample Detailing Pitch' to test the full clinical assessment and scoring immediately."}
                      </p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    onClick={handleInsertSamplePitch}
                    className="bg-primary text-white hover:bg-primary/90 text-xs font-bold cursor-pointer"
                  >
                    <Sparkles className="size-3.5" /> Insert Sample Detailing Pitch
                  </Button>
                </div>
              </div>
            )}

            {liveTranscript && (
              <div className="mt-2.5 flex items-center justify-between text-[11px] text-muted-foreground border-t border-border/60 pt-2">
                <span>{liveTranscript.split(/\s+/).filter(Boolean).length} words recognized</span>
                <span className="text-primary font-medium">✓ Will be evaluated against clinical rubric</span>
              </div>
            )}
          </div>

          <div className="mt-6 border-t border-border pt-5">
            <p className="flex items-center justify-center gap-2 text-sm font-semibold text-primary">
              <Sparkles className="size-4" />
              {practiceContext.hint}
            </p>

            {playbackUrl && (
              <div className="mt-4 rounded-xl border border-border bg-white p-3 flex flex-col sm:flex-row items-center gap-3">
                <span className="text-xs font-bold text-navy whitespace-nowrap flex items-center gap-1.5">
                  <Volume2 className="size-4 text-primary" />
                  Recorded Audio:
                </span>
                <audio
                  key={playbackUrl}
                  controls
                  src={playbackUrl}
                  className="w-full h-8"
                  preload="auto"
                />
              </div>
            )}

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
                className="rounded-xl cursor-pointer bg-navy hover:bg-navy/90 text-white"
                disabled={!hasTake || submitting}
                onClick={submit}
              >
                {submitting ? (
                  <UploadCloud className="size-4 animate-bounce" />
                ) : (
                  <Sparkles className="size-4" />
                )}
                {submitting ? "Analyzing Detailing..." : "Submit for AI Assessment"}
              </Button>
            </div>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Live microphone recording connected. Real speech transcription evaluates adherence to approved clinical claims.
            </p>
          </div>
        </section>
      </div>

      <AiConfigModal
        open={aiModalOpen}
        onOpenChange={setAiModalOpen}
        onConfigChanged={() => setGeminiActive(isGeminiConfigured())}
      />
    </AppShell>
  );
}
