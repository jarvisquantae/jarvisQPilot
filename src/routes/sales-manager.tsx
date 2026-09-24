import { createFileRoute, Link, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/sales-manager")({
  beforeLoad: () => {
    throw redirect({ to: "/sales/team" });
  },
  component: () => <Link to="/sales/team">Sales Manager console</Link>,
});
