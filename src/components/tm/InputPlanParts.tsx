import { Link } from "@tanstack/react-router";
import { BookOpen, Check, ChevronDown, FlaskConical, Gift, Presentation, ScrollText, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { BRANDS, MONTHS, type BrandFilterValue, type InputKind, type MonthValue, type PlannedVisit } from "@/data/tm";

const kindIcon: Record<InputKind, typeof FileText> = {
  reminder_card: FileText,
  scientific_lbl: FlaskConical,
  booklet: BookOpen,
  conference: Presentation,
  visual_aid: ScrollText,
  gift: Gift,
};

export function MonthPills({
  value,
  onChange,
}: {
  value: MonthValue;
  onChange: (month: MonthValue) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-3" role="tablist" aria-label="Plan month">
      {MONTHS.map((month) => {
        const active = month === value;
        return (
          <button
            key={month}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(month)}
            className={cn(
              "min-w-[7rem] cursor-pointer rounded-full border px-6 py-2.5 text-sm font-extrabold tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              active
                ? "border-primary bg-primary text-primary-foreground shadow-soft"
                : "border-primary/40 bg-card text-primary hover:bg-accent",
            )}
          >
            {month}
          </button>
        );
      })}
    </div>
  );
}

export function BrandFilter({
  value,
  onChange,
}: {
  value: BrandFilterValue;
  onChange: (brand: BrandFilterValue) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex h-11 min-w-[11rem] cursor-pointer items-center justify-between gap-3 rounded-full border border-primary/40 bg-card px-5 text-sm font-bold text-navy transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        {value}
        <ChevronDown className="size-4 text-primary" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 rounded-2xl p-2">
        {BRANDS.map((brand) => (
          <DropdownMenuItem
            key={brand}
            onClick={() => onChange(brand)}
            className="flex cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold"
          >
            {brand}
            {brand === value && <Check className="size-4 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function VisitRow({ visit }: { visit: PlannedVisit }) {
  const Icon = kindIcon[visit.kind];
  return (
    <article className="card-surface flex flex-wrap items-center gap-5 p-5 transition-shadow hover:shadow-card-hover">
      <span className="grid size-16 shrink-0 place-items-center rounded-full bg-accent text-primary">
        <Icon className="size-7" />
      </span>

      <div className="w-40 shrink-0">
        {visit.current && (
          <span className="mb-2 inline-flex rounded-full bg-brand-red px-3 py-1 text-[10px] font-extrabold tracking-wider text-primary-foreground">
            CURRENT
          </span>
        )}
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Visit {visit.visit}
        </p>
        <p className="mt-1 text-xs font-extrabold uppercase leading-tight tracking-wider text-brand-red">
          {visit.brandLabel}
        </p>
      </div>

      <div className="min-w-[12rem] flex-1">
        <h3 className="text-base font-extrabold text-navy">{visit.title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{visit.description}</p>
      </div>

      <div className="flex items-center gap-3 border-border sm:border-l sm:pl-5">
        <Button asChild variant="outline" className="rounded-xl border-primary/40 text-primary">
          <Link to="/campaigns/$campaignId" params={{ campaignId: visit.campaignId }}>
            View Input
          </Link>
        </Button>
        <Button asChild className="rounded-xl">
          <Link to="/campaigns/$campaignId/learning" params={{ campaignId: visit.campaignId }}>
            Learn Detailing
          </Link>
        </Button>
      </div>
    </article>
  );
}
