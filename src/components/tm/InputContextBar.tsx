import { CalendarDays, FileText, MapPin } from "lucide-react";

export function InputContextBar({
  inputName,
  month,
  visit,
}: {
  inputName: string;
  month: string;
  visit: number | string;
}) {
  return (
    <div className="card-surface flex flex-wrap items-center gap-x-6 gap-y-2 px-5 py-3">
      <span className="inline-flex items-center gap-2 text-sm font-extrabold text-navy">
        <FileText className="size-4 text-primary" />
        {inputName}
      </span>
      <span className="hidden h-4 w-px bg-border sm:block" />
      <span className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground">
        <CalendarDays className="size-4 text-primary" />
        {month}
      </span>
      <span className="hidden h-4 w-px bg-border sm:block" />
      <span className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground">
        <MapPin className="size-4 text-primary" />
        Visit {visit}
      </span>
    </div>
  );
}
