import { createFileRoute } from "@tanstack/react-router";
import { Download } from "lucide-react";
import { SalesShell } from "@/components/layout/SalesShell";
import { TMPerformanceTable } from "@/components/sales/TMPerformanceTable";

export const Route = createFileRoute("/sales/team")({
  head: () => ({
    meta: [
      { title: "Team Performance — Q-Pilot Sales Manager" },
      {
        name: "description",
        content:
          "View team performance across territory managers including accuracy, adherence, and status.",
      },
      { property: "og:title", content: "Team Performance — Q-Pilot Sales Manager" },
      {
        property: "og:description",
        content: "Compare TM accuracy and adherence across HQs, regions and zones.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TeamPerformance,
});

function TeamPerformance() {
  return (
    <SalesShell>
      <div className="space-y-4">
        {/* Title row */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-extrabold tracking-tight text-[#1a1a2e] sm:text-3xl">
            TEAM PERFORMANCE
          </h1>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg bg-[#e8533f] px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#d4432f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8533f]/50"
            onClick={() => {
              // Download functionality placeholder
              alert("Download initiated");
            }}
          >
            <Download className="size-4" />
            DOWNLOAD
          </button>
        </div>

        {/* Performance table */}
        <TMPerformanceTable />
      </div>
    </SalesShell>
  );
}
