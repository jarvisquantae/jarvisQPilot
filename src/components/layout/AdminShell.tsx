import type { ReactNode } from "react";
import {
  BarChart3,
  Bell,
  Building2,
  ClipboardList,
  FileText,
  LayoutGrid,
  LineChart,
  Lock,
  Megaphone,
  Pill,
  Settings,
  Shield,
  Users,
  UsersRound,
} from "lucide-react";
import { ConsoleShell, type ConsoleNavItem } from "@/components/layout/ConsoleShell";
import { ADMIN_USER } from "@/data/admin";

export const ADMIN_NAV: readonly ConsoleNavItem[] = [
  { label: "Admin Dashboard", to: "/admin/dashboard", icon: LayoutGrid },
  { label: "User Management", to: "/admin/users", icon: Users },
  { label: "Roles & Permissions", to: "/admin/roles", icon: Lock },
  { label: "Tenants & Regions", to: "/admin/tenants", icon: Building2 },
  { label: "Campaigns", to: "/admin/campaigns", icon: Megaphone },
  { label: "Product Catalog", to: "/admin/products", icon: Pill },
  { label: "Audit Trail", to: "/admin/audit", icon: ClipboardList },
  { label: "System Settings", to: "/admin/settings", icon: Settings },
  { label: "Security & Compliance", to: "/admin/security", icon: Shield },
  { label: "Analytics & Usage", to: "/admin/analytics", icon: LineChart },
];

export function AdminShell({
  searchPlaceholder,
  children,
}: {
  searchPlaceholder?: string | undefined;
  children: ReactNode;
}) {
  return (
    <ConsoleShell
      navItems={ADMIN_NAV}
      roleLabel={ADMIN_USER.roleLabel}
      initials={ADMIN_USER.initials}
      email={ADMIN_USER.email}
      searchPlaceholder={searchPlaceholder ?? "Search users, tenants, campaigns..."}
    >
      {children}
    </ConsoleShell>
  );
}
