import { useEffect, useMemo, useRef, useState } from "react";
import { Pause, Play, RotateCcw, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatClock } from "@/utils/format";

const SPEEDS = [0.75, 1, 1.25, 1.5] as const;

/**
 * Mock audio player. No real audio file is attached in this phase — playback is
 * simulated against the approved pitch duration so the transport, waveform and
 * section timings behave exactly as they will once approved audio is stored.
 */
export function AudioPlayer({
  durationSeconds,
  title,
  className,
}: {
  durationSeconds: number;
  title: string;
  className?: string;
}) {
  const [position, setPosition] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState<number>(1);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!playing) return;
    timer.current = setInterval(() => {
      setPosition((current) => {
        const next = current + speed;
        if (next >= durationSeconds) {
          setPlaying(false);
          return durationSeconds;
        }
        return next;
      });
    }, 1000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [playing, speed, durationSeconds]);

  const bars = useMemo(
    () =>
      Array.from({ length: 64 }, (_, index) =>
        Math.round(28 + Math.abs(Math.sin(index * 1.7)) * 60 + ((index * 13) % 17)),
      ),
    [],
  );

  const progress = (position / durationSeconds) * 100;
  const seek = (delta: number) =>
    setPosition((current) => Math.max(0, Math.min(durationSeconds, current + delta)));

  return (
    <div className={cn("card-surface p-5 sm:p-6", className)}>
      <p className="text-sm font-bold text-navy">{title}</p>

      <div
        className="mt-5 flex h-28 items-center gap-[3px] overflow-hidden rounded-2xl bg-surface-2 px-3"
        aria-hidden="true"
      >
        {bars.map((height, index) => {
          const played = (index / bars.length) * 100 <= progress;
          return (
            <span
              key={index}
              className={cn(
                "w-full shrink-0 rounded-full transition-colors",
                played ? "bg-primary" : "bg-border",
              )}
              style={{ height: `${Math.min(96, height)}%` }}
            />
          );
        })}
      </div>

      <div className="mt-3">
        <input
          type="range"
          min={0}
          max={durationSeconds}
          value={Math.floor(position)}
          onChange={(event) => setPosition(Number(event.target.value))}
          aria-label="Seek audio"
          className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-muted accent-[var(--primary)]"
        />
        <div className="mt-2 flex items-center justify-between text-xs font-semibold text-muted-foreground">
          <span className="text-navy">{formatClock(Math.floor(position))}</span>
          <span>{formatClock(durationSeconds)}</span>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => seek(-15)} aria-label="Rewind 15 seconds">
            <RotateCcw className="size-4" />
          </Button>
          <Button
            size="lg"
            onClick={() => setPlaying((value) => !value)}
            aria-label={playing ? "Pause" : "Play"}
            className="w-32"
          >
            {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
            {playing ? "Pause" : "Play"}
          </Button>
          <Button variant="outline" size="icon" onClick={() => seek(15)} aria-label="Forward 15 seconds">
            <RotateCw className="size-4" />
          </Button>
        </div>

        <div className="flex items-center gap-1 rounded-xl bg-surface-2 p-1">
          {SPEEDS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setSpeed(option)}
              aria-pressed={speed === option}
              className={cn(
                "rounded-lg px-3 py-1.5 text-xs font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                speed === option ? "bg-navy text-navy-foreground" : "text-muted-foreground hover:text-navy",
              )}
            >
              {option}x
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
