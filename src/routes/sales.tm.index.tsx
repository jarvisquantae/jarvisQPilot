import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { teamMembers } from "@/data/sales";

export const Route = createFileRoute("/sales/tm/")({
  beforeLoad: () => {
    throw redirect({ to: "/sales/tm/$tmId", params: { tmId: teamMembers[0]!.id } });
  },
  component: () => (
    <Link to="/sales/tm/$tmId" params={{ tmId: teamMembers[0]!.id }}>
      Open TM detail
    </Link>
  ),
});
