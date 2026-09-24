import { Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays } from "lucide-react";
import type { Campaign } from "@/types";
import { CampaignStatusBadge } from "@/components/common/StatusBadge";
import { ProgressBar } from "@/components/common/ProgressBar";

export function CampaignCard({ campaign }: { campaign: Campaign }) {
  return (
    <Link
      to="/campaigns/$campaignId/learning"
      params={{ campaignId: campaign.slug }}
      className="card-surface group block p-5 transition-all hover:-translate-y-0.5 hover:shadow-card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-navy">{campaign.productName}</h3>
          <p className="mt-0.5 text-sm text-muted-foreground">{campaign.title}</p>
        </div>
        <CampaignStatusBadge status={campaign.status} />
      </div>

      <p className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
        <CalendarDays className="size-3.5" />
        Due {campaign.dueDate}
      </p>

      <ProgressBar value={campaign.progress} className="mt-4" label="Campaign readiness" />

      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
        Open learning
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
