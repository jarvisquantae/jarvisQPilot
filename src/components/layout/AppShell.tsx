import { useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  BarChart3,
  CalendarDays,
  ChevronDown,
  GraduationCap,
  Headphones,
  Home,
  Menu,
  UserRound,
  Users,
  X,
} from "lucide-react";
import { QPilotLogo } from "@/components/brand/QPilotLogo";
import { SummitMark } from "@/components/brand/SummitMark";
import { cn } from "@/lib/utils";
import { currentUser, QUARTERS, QUARTER_LABEL } from "@/data/mock";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navItems = [
  { label: "Home", to: "/dashboard", icon: Home, match: "/dashboard", isActive: undefined },
  {
    label: "Campaign",
    to: "/campaigns",
    icon: CalendarDays,
    match: "/campaigns",
    isActive: (p: string) => p.startsWith("/campaigns") && !p.includes("/learning") && !p.includes("/audio"),
  },
  {
    label: "Learn",
    to: "/campaigns/$campaignId/learning",
    params: { campaignId: "cardiocare-a" },
    icon: GraduationCap,
    match: "/campaigns/$campaignId/learning",
    isActive: (p: string) => p.endsWith("/learning"),
  },
  {
    label: "Listen",
    to: "/campaigns/$campaignId/audio",
    params: { campaignId: "cardiocare-a" },
    icon: Headphones,
    match: "/campaigns/$campaignId/audio",
    isActive: (p: string) => p.endsWith("/audio"),
  },
  { label: "Practice", to: "/practice", icon: UserRound, match: "/practice", isActive: undefined },
  { label: "Progress", to: "/results/progress", icon: BarChart3, match: "/results", isActive: undefined },
] as const;


const navBase =
  "flex items-center gap-3 rounded-2xl border px-3.5 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  return (
    <nav className="space-y-1.5" aria-label="Main navigation">
      {navItems.map((item) => {
        const active = item.isActive ? item.isActive(pathname) : pathname.startsWith(item.match);
        return (
          <Link
            key={item.label}
            to={item.to}
            params={"params" in item ? item.params : {}}
            onClick={onNavigate}
            className={cn(
              navBase,
              active
                ? "border-primary/60 bg-card text-primary shadow-soft"
                : "border-transparent text-navy hover:bg-card/70",
            )}
          >
            <item.icon className={cn("size-5 shrink-0", active ? "text-primary" : "text-navy/70")} />
            <span className="flex-1">{item.label}</span>
          </Link>
        );
      })}

      <Link
        to="/"
        onClick={onNavigate}
        className={cn(navBase, "mt-6 border-transparent text-navy hover:bg-card/70")}
      >
        <Users className="size-5 shrink-0 text-navy/70" />
        Switch console
      </Link>
    </nav>
  );
}


function SidebarFooter() {
  return (
    <div className="px-2 pt-6">
      <SummitMark className="mx-auto max-w-[150px] text-primary" />
      <p className="mt-2 text-center text-xs font-bold leading-snug text-primary">
        Better Detailing.
        <br />
        Stronger Impact.
      </p>
    </div>
  );
}

export function AppShell({
  children,
  headerLeft,
}: {
  children: ReactNode;
  headerLeft?: ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [quarter, setQuarter] = useState(QUARTER_LABEL);

  return (
    <div className="flex min-h-screen w-full bg-background">
      <aside className="sticky top-0 hidden h-screen w-[17rem] shrink-0 flex-col border-r border-sidebar-border bg-sidebar px-4 py-7 lg:flex">
        <Link to="/dashboard" className="px-1.5 focus-visible:outline-none">
          <QPilotLogo />
        </Link>
        <div className="mt-9 flex-1 overflow-y-auto">
          <NavList />
        </div>
        <SidebarFooter />
      </aside>


      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close navigation"
            className="absolute inset-0 bg-navy/40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative flex h-full w-72 flex-col border-r border-sidebar-border bg-sidebar px-4 py-6">
            <div className="flex items-center justify-between">
              <QPilotLogo />
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close navigation"
                className="grid size-9 place-items-center rounded-lg text-muted-foreground hover:bg-muted"
              >
                <X className="size-4" />
              </button>
            </div>
            <div className="mt-8 flex-1 overflow-y-auto">
              <NavList onNavigate={() => setMobileOpen(false)} />
            </div>
          </div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-40 flex h-16 items-center gap-3 border-b border-border bg-card/90 px-4 backdrop-blur sm:px-6">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation"
            className="grid size-10 place-items-center rounded-xl text-navy hover:bg-muted lg:hidden"
          >
            <Menu className="size-5" />
          </button>

          {headerLeft ?? (
            <p className="hidden text-sm font-bold text-navy sm:block">Field Intelligence Q-Pilot</p>
          )}

          <div className="ml-auto flex items-center gap-2 sm:gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl border border-border bg-card px-3 text-xs font-bold text-navy transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                {quarter}
                <ChevronDown className="size-3.5 text-muted-foreground" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Select quarter</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {QUARTERS.map((option) => (
                  <DropdownMenuItem key={option} onClick={() => setQuarter(option)}>
                    {option}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex h-10 cursor-pointer items-center gap-2.5 rounded-xl border border-border bg-card pl-1.5 pr-3 transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <span className="grid size-7 place-items-center rounded-lg bg-navy text-[11px] font-bold text-navy-foreground">
                  {currentUser.initials}
                </span>
                <span className="hidden text-xs font-bold text-navy sm:block">
                  {currentUser.roleLabel}
                </span>
                <ChevronDown className="size-3.5 text-muted-foreground" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <p className="font-bold text-navy">{currentUser.roleLabel}</p>
                  <p className="text-xs font-normal text-muted-foreground">{currentUser.email}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile">Profile & settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/notifications">Notifications</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="mx-auto w-full max-w-[1400px] flex-1 px-4 py-6 sm:px-6 sm:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
