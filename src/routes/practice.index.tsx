import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/practice/")({
  beforeLoad: () => {
    throw redirect({ to: "/practice/$campaignId", params: { campaignId: "cardiocare-a" } });
  },
});
