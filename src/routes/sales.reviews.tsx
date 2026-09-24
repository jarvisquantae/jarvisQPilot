import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ClipboardCheck,
  MessageSquareText,
  Play,
  Sparkles,
  TriangleAlert,
} from "lucide-react";
import { SalesShell } from "@/components/layout/SalesShell";
import { PageHeader, SectionCard } from "@/components/common/Layout";
import { Button } from "@/components/ui/button";
import {
  Avatar,
  FilterBar,
  PersonCell,
  ScoreValue,
  SelectFilter,
  StarRating,
  Table,
  Td,
  Th,
  TextBadge,
  Tr,
} from "@/components/sales/primitives";
import { brandById, brands, memberById, REGIONS, reviews } from "@/data/sales";

export const Route = createFileRoute("/sales/reviews")({
  head: () => ({
    meta: [
      { title: "Practice Reviews — Q-Pilot Sales Manager" },
      {
        name: "description",
        content:
          "Review recorded practice attempts, AI evidence timestamps and coverage of approved messaging for each territory manager.",
      },
      { property: "og:title", content: "Practice Reviews — Q-Pilot Sales Manager" },
      {
        property: "og:description",
        content: "Attempt-level review with AI evidence, coverage checklist and coaching feedback.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Reviews,
});

const BRAND_FILTERS = ["All Brands", ...brands.map((brand) => brand.name)];
const REVIEW_STATUS = ["All Statuses", "Good", "Needs Review", "Critical"];

const reviewTone = (status: string) =>
  status === "Good" ? "success" : status === "Needs Review" ? "ai" : "warning";

const coverageTone = (state: string) =>
  state === "Covered" ? "success" : state === "Partial" ? "ai" : "warning";

function Reviews() {
  const [brand, setBrand] = useState(BRAND_FILTERS[0]!);
  const [status, setStatus] = useState(REVIEW_STATUS[0]!);
  const [region, setRegion] = useState(REGIONS[0]!);
  const [selectedId, setSelectedId] = useState(reviews[0]!.id);

  const filtered = reviews.filter((review) => {
    if (brand !== BRAND_FILTERS[0] && brandById(review.brandId).name !== brand) return false;
    if (status !== REVIEW_STATUS[0] && review.reviewStatus !== status) return false;
    return true;
  });

  const selected = reviews.find((review) => review.id === selectedId) ?? reviews[0]!;
  const selectedMember = memberById(selected.memberId);

  return (
    <SalesShell>
      <div className="space-y-6">
        <PageHeader
          title="Practice & Pitch Review"
          subtitle="Listen to attempts, read the AI evidence and leave coaching feedback."
          actions={
            <Button variant="outline" asChild>
              <Link to="/sales/coaching">Coaching board</Link>
            </Button>
          }
        />

        <FilterBar>
          <SelectFilter label="Brand" options={BRAND_FILTERS} value={brand} onChange={setBrand} />
          <SelectFilter
            label="Review status"
            options={REVIEW_STATUS}
            value={status}
            onChange={setStatus}
          />
          <SelectFilter label="Region" options={REGIONS} value={region} onChange={setRegion} />
        </FilterBar>

        <SectionCard
          title="Recent Attempts"
          subtitle={`${filtered.length} attempts in this view`}
          icon={<ClipboardCheck className="size-5" />}
        >
          <Table minWidth={860}>
            <thead>
              <tr>
                <Th>TM Name</Th>
                <Th>Brand</Th>
                <Th>Date</Th>
                <Th align="center">Score</Th>
                <Th align="center">AI Rating</Th>
                <Th align="center">Status</Th>
                <Th align="right" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((review) => {
                const member = memberById(review.memberId);
                const active = review.id === selected.id;
                return (
                  <Tr key={review.id} className={active ? "bg-mint/60" : undefined}>
                    <Td>
                      <PersonCell
                        initials={member.initials}
                        name={member.name}
                        meta={member.region}
                      />
                    </Td>
                    <Td>{brandById(review.brandId).name}</Td>
                    <Td>
                      <span className="text-xs font-semibold text-muted-foreground">
                        {review.date}
                        <br />
                        {review.time}
                      </span>
                    </Td>
                    <Td align="center">
                      <ScoreValue value={review.score} />
                    </Td>
                    <Td align="center">
                      <StarRating value={review.rating} />
                    </Td>
                    <Td align="center">
                      <TextBadge label={review.reviewStatus} tone={reviewTone(review.reviewStatus)} />
                    </Td>
                    <Td align="right">
                      <Button
                        variant={active ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedId(review.id)}
                      >
                        Review
                      </Button>
                    </Td>
                  </Tr>
                );
              })}
              {filtered.length === 0 && (
                <Tr>
                  <Td className="py-8 text-center text-muted-foreground">
                    No attempts match these filters.
                  </Td>
                </Tr>
              )}
            </tbody>
          </Table>
        </SectionCard>

        <div className="grid gap-4 lg:grid-cols-3">
          <SectionCard
            className="lg:col-span-2"
            title="AI Evidence Timeline"
            subtitle={`${selectedMember.name} · ${brandById(selected.brandId).name} · ${selected.date}`}
            icon={<Sparkles className="size-5" />}
          >
            <div className="mb-5 flex flex-wrap items-center gap-3 rounded-2xl border border-border bg-surface-2 p-4">
              <Avatar initials={selectedMember.initials} className="size-11" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-navy">Attempt recording</p>
                <p className="text-xs font-medium text-muted-foreground">
                  06:12 · accuracy {selected.accuracy}% · adherence {selected.adherence}%
                </p>
              </div>
              <Button variant="soft" size="sm">
                <Play className="size-4" /> Play attempt
              </Button>
            </div>

            <ol className="space-y-3">
              {selected.evidence.map((item) => (
                <li
                  key={item.at}
                  className="flex gap-3 rounded-2xl border border-border bg-card p-4"
                >
                  <span className="rounded-lg bg-navy px-2 py-1 text-[11px] font-bold text-navy-foreground">
                    {item.at}
                  </span>
                  <p className="text-sm text-navy">{item.note}</p>
                </li>
              ))}
            </ol>
          </SectionCard>

          <div className="space-y-4">
            <SectionCard title="Coverage Checklist" icon={<ClipboardCheck className="size-5" />}>
              <ul className="space-y-3">
                {selected.covered.map((item) => (
                  <li key={item.label} className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-navy">{item.label}</span>
                    <TextBadge label={item.state} tone={coverageTone(item.state)} />
                  </li>
                ))}
              </ul>
            </SectionCard>

            <SectionCard title="Manager Feedback" icon={<MessageSquareText className="size-5" />}>
              <ul className="space-y-3">
                {selected.feedback.map((item) => (
                  <li
                    key={item}
                    className="rounded-2xl border border-border bg-surface-2 p-3.5 text-sm text-navy"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <label className="mt-4 block">
                <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                  Add feedback
                </span>
                <textarea
                  rows={3}
                  placeholder="Write coaching feedback for this attempt…"
                  className="mt-1.5 w-full rounded-2xl border border-border bg-card p-3 text-sm text-navy placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </label>
              <div className="mt-3 flex gap-2">
                <Button size="sm">Save feedback</Button>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/sales/coaching">Assign coaching</Link>
                </Button>
              </div>
            </SectionCard>

            {selected.reviewStatus === "Critical" && (
              <div className="card-surface flex items-start gap-3 border-warning/40 bg-warning-soft p-4">
                <TriangleAlert className="mt-0.5 size-5 shrink-0 text-warning" />
                <p className="text-sm font-semibold text-navy">
                  This attempt missed mandatory messaging. Escalate to a 1:1 coaching session.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </SalesShell>
  );
}
