import { ArrowRight, Check } from "lucide-react";
import type { Transcript } from "@/types";
import { cn } from "@/lib/utils";

export function TranscriptPanel({ transcript }: { transcript: Transcript }) {
  return (
    <ul className="space-y-3">
      {transcript.turns.map((turn) => {
        const isTm = turn.speaker === "tm";
        return (
          <li
            key={turn.id}
            className={cn(
              "rounded-2xl border p-4",
              isTm ? "border-primary/20 bg-mint/50" : "border-border bg-surface-2",
            )}
          >
            <p
              className={cn(
                "text-xs font-bold uppercase tracking-wider",
                isTm ? "text-primary" : "text-muted-foreground",
              )}
            >
              {turn.speakerLabel}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-navy">“{turn.text}”</p>
          </li>
        );
      })}
    </ul>
  );
}

export function VocabularyMapping({ transcript }: { transcript: Transcript }) {
  return (
    <ul className="space-y-2.5">
      {transcript.vocabularyMapping.map((item) => (
        <li
          key={item.spoken}
          className="flex items-center gap-2 rounded-xl border border-border bg-surface-2 px-3.5 py-2.5 text-sm"
        >
          <span className="font-semibold text-navy">{item.spoken}</span>
          <ArrowRight className="size-3.5 shrink-0 text-muted-foreground" />
          <span className="font-semibold text-primary">{item.approved}</span>
          {item.matched && (
            <span className="ml-auto grid size-5 shrink-0 place-items-center rounded-full bg-success-soft text-success">
              <Check className="size-3" />
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
