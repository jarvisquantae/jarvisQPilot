import type { ReactNode } from "react";
import {
  BookOpen,
  LayoutGrid,
  Megaphone,
  Presentation,
  ChartNoAxesColumnIncreasing,
} from "lucide-react";
import { ConsoleShell, type ConsoleNavItem } from "@/components/layout/ConsoleShell";
import { MM_USER } from "@/data/marketing";

export const MARKETING_NAV: readonly ConsoleNavItem[] = [
  { label: "Dashboard", to: "/marketing/dashboard", icon: LayoutGrid },
  { label: "Campaigns", to: "/marketing/campaigns", icon: Megaphone },
  { label: "Templates", to: "/marketing/products", icon: Presentation },
  { label: "Learn", to: "/marketing/pitches", icon: BookOpen },
  { label: "Reports", to: "/marketing/reports", icon: ChartNoAxesColumnIncreasing },
];

export function MarketingShell({
  searchPlaceholder,
  children,
}: {
  searchPlaceholder?: string | undefined;
  children: ReactNode;
}) {
  return (
    <ConsoleShell
      navItems={MARKETING_NAV}
      roleLabel={MM_USER.roleLabel}
      initials={MM_USER.initials}
      email={MM_USER.email}
      searchPlaceholder={searchPlaceholder}
    >
      {children}
    </ConsoleShell>
  );
}
