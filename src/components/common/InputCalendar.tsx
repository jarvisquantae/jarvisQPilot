import { useMemo, useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import {
  INPUT_CALENDAR_MONTH,
  inputCalendar,
  inputModeMeta,
  type CalendarInput,
  type InputMode,
} from "@/data/mock";

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];
const MODES = Object.keys(inputModeMeta) as InputMode[];

type Props = {
  campaignId?: string;
};

export function InputCalendar({ campaignId }: Props) {
  const entries = useMemo(
    () => (campaignId ? inputCalendar.filter((i) => i.campaignId === campaignId) : inputCalendar),
    [campaignId],
  );

  const byDay = useMemo(() => {
    const map = new Map<number, CalendarInput[]>();
    entries.forEach((entry) => {
      map.set(entry.day, [...(map.get(entry.day) ?? []), entry]);
    });
    return map;
  }, [entries]);

  const firstBusyDay = entries[0]?.day ?? 1;
  const [selectedDay, setSelectedDay] = useState<number>(firstBusyDay);
  const selected = byDay.get(selectedDay) ?? [];

  const cells: (number | null)[] = [
    ...Array.from({ length: INPUT_CALENDAR_MONTH.startWeekday }, () => null),
    ...Array.from({ length: INPUT_CALENDAR_MONTH.daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <p className="inline-flex items-center gap-2 text-sm font-bold text-navy">
          <CalendarDays className="size-4 text-primary" />
          {INPUT_CALENDAR_MONTH.label}
        </p>
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Previous month"
            className="grid size-8 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-surface-2"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            aria-label="Next month"
            className="grid size-8 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-surface-2"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {WEEKDAYS.map((day, index) => (
          <span
            key={`${day}-${index}`}
            className="py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground"
          >
            {day}
          </span>
        ))}
        {cells.map((day, index) => {
          if (day === null) return <span key={`pad-${index}`} />;
          const dayInputs = byDay.get(day) ?? [];
          const isSelected = day === selectedDay;
          return (
            <button
              key={day}
              type="button"
              onClick={() => setSelectedDay(day)}
              className={`flex min-h-[52px] flex-col items-center gap-1 rounded-xl border p-1.5 transition-all ${
                isSelected
                  ? "border-primary bg-mint/60 shadow-sm"
                  : dayInputs.length > 0
                    ? "border-border bg-surface-2 hover:border-primary/40"
                    : "border-transparent bg-surface-2/40 hover:bg-surface-2"
              }`}
            >
              <span
                className={`text-xs font-bold ${dayInputs.length ? "text-navy" : "text-muted-foreground"}`}
              >
                {day}
              </span>
              <span className="flex flex-wrap items-center justify-center gap-0.5">
                {dayInputs.slice(0, 3).map((entry) => (
                  <span
                    key={entry.id}
                    className={`size-1.5 rounded-full ${inputModeMeta[entry.mode].dot}`}
                    aria-hidden="true"
                  />
                ))}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-2 border-t border-border pt-3">
        {MODES.map((mode) => (
          <span
            key={mode}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-2 px-2.5 py-1 text-[11px] font-semibold text-navy"
          >
            <span className={`size-1.5 rounded-full ${inputModeMeta[mode].dot}`} aria-hidden="true" />
            {inputModeMeta[mode].label}
          </span>
        ))}
      </div>

      <div className="rounded-2xl border border-border bg-surface-2 p-4">
        <p className="text-xs font-bold uppercase tracking-wider text-primary">
          {selectedDay} {INPUT_CALENDAR_MONTH.label}
        </p>
        {selected.length === 0 ? (
          <p className="mt-2 text-sm text-muted-foreground">No inputs planned for this day.</p>
        ) : (
          <ul className="mt-3 space-y-2.5">
            {selected.map((entry) => (
              <li key={entry.id} className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-navy">{entry.title}</p>
                  <p className="text-xs text-muted-foreground">{entry.specialty}</p>
                </div>
                <span
                  className={`shrink-0 rounded-full border px-2.5 py-1 text-[11px] font-bold ${inputModeMeta[entry.mode].className}`}
                >
                  {inputModeMeta[entry.mode].label}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
