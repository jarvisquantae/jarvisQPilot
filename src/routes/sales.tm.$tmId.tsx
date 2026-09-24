import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Target, Users } from "lucide-react";
import { SalesShell } from "@/components/layout/SalesShell";
import { PageHeader, SectionCard } from "@/components/common/Layout";
import { Button } from "@/components/ui/button";
import {
  Avatar,
  FilterBar,
  RatingBadge,
  ScoreValue,
  SelectFilter,
  StarRating,
  Table,
  Td,
  Th,
  TMStatusBadge,
  Tr,
} from "@/components/sales/primitives";
import { brandById, INPUT_MONTHS, inputPerformance, memberById } from "@/data/sales";

export const Route = createFileRoute("/sales/tm/$tmId")({
  head: ({ params }) => {
    const member = memberById(params.tmId);
    return {
      meta: [
        { title: `${member.name} — TM Detail | Q-Pilot Sales Manager` },
        {
          name: "description",
          content: `Input-wise accuracy and adherence for ${member.name} in ${member.region}, filtered by month.`,
        },
        { property: "og:title", content: `${member.name} — TM Detail | Q-Pilot` },
        {
          property: "og:description",
          content: `Input-wise accuracy and adherence scores for ${member.name}.`,
        },
        { property: "og:type", content: "profile" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: TMDetail,
});

function TMDetail() {
  const { tmId } = Route.useParams();
  const member = memberById(tmId);
  const ALL_MONTHS = INPUT_MONTHS[0]!;
  const [month, setMonth] = useState(ALL_MONTHS);

  const rows = useMemo(
    () =>
      inputPerformance.filter((row) => month === ALL_MONTHS || row.month === month),
    [month, ALL_MONTHS],
  );

  return (
    <SalesShell>
      <div className="space-y-6">
        <PageHeader
          eyebrow={
            <span className="inline-flex items-center gap-2 rounded-full bg-mint px-3 py-1 text-xs font-bold text-primary">
              <Users className="size-3.5" /> Territory Manager Detail
            </span>
          }
          title={member.name}
          subtitle={`${member.empId} · ${member.hq} · ${member.region} · ${member.zone} Zone`}
          actions={
            <Button variant="outline" asChild>
              <Link to="/sales/team">Back to team</Link>
            </Button>
          }
        />

        <div className="card-surface flex flex-wrap items-center gap-4 p-5">
          <Avatar initials={member.initials} className="size-14 text-base" />
          <div className="min-w-0 flex-1">
            <p className="text-lg font-extrabold text-navy">{member.name}</p>
            <p className="text-sm text-muted-foreground">
              Accuracy {member.accuracy}% · Adherence {member.adherence}%
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <TMStatusBadge status={member.status} />
            <RatingBadge label={member.ratingLabel} />
            <StarRating value={member.rating} />
          </div>
        </div>

        <SectionCard
          title="Input-wise Performance"
          subtitle="Accuracy and adherence for each approved input"
          icon={<Target className="size-5" />}
        >
          <div className="space-y-4">
            <FilterBar>
              <SelectFilter
                label="Month"
                options={INPUT_MONTHS}
                value={month}
                onChange={setMonth}
              />
            </FilterBar>

            <Table minWidth={720}>
              <thead>
                <tr>
                  <Th>Input</Th>
                  <Th>Brand</Th>
                  <Th>Month</Th>
                  <Th>Visit</Th>
                  <Th align="center">Accuracy %</Th>
                  <Th align="center">Adherence %</Th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <Tr key={row.id}>
                    <Td>
                      <span className="text-sm font-bold text-navy">{row.inputName}</span>
                    </Td>
                    <Td>
                      <span className="text-xs font-semibold text-muted-foreground">
                        {brandById(row.brandId).name}
                      </span>
                    </Td>
                    <Td>
                      <span className="text-xs font-semibold text-muted-foreground">
                        {row.month}
                      </span>
                    </Td>
                    <Td>
                      <span className="text-xs font-semibold text-muted-foreground">
                        {row.visit}
                      </span>
                    </Td>
                    <Td align="center">
                      <ScoreValue value={row.accuracy} />
                    </Td>
                    <Td align="center">
                      <ScoreValue value={row.adherence} />
                    </Td>
                  </Tr>
                ))}
                {rows.length === 0 && (
                  <Tr>
                    <Td className="py-8 text-center text-muted-foreground">
                      No inputs recorded for this month.
                    </Td>
                  </Tr>
                )}
              </tbody>
            </Table>
          </div>
        </SectionCard>
      </div>
    </SalesShell>
  );
}
