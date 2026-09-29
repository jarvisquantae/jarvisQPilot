import { useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowLeftRight, ChevronDown, LogOut, Menu, Search, UserCircle2, X, type LucideIcon } from "lucide-react";
import { QPilotLogo } from "@/components/brand/QPilotLogo";
import { cn } from "@/lib/utils";
import { QUARTERS, QUARTER_LABEL } from "@/data/mock";
import { useAuth } from "@/lib/auth";
import { AuthModal } from "@/components/auth/AuthModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type ConsoleNavItem = {
  label: string;
  to: string;
  icon: LucideIcon;
  badge?: number | undefined;
};

function ConsoleNav({
  items,
  onNavigate,
}: {
  items: readonly ConsoleNavItem[];
  onNavigate?: () => void;
}) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  return (
    <nav className="space-y-1" aria-label="Console navigation">
      {items.map((item, index) => {
        const firstWithPath = items.findIndex((entry) => entry.to === item.to) === index;
        const active =
          firstWithPath && (pathname === item.to || pathname.startsWith(`${item.to}/`));

        return (
          <Link
            key={item.label}
            to={item.to}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
              active
                ? "bg-primary/90 text-primary-foreground"
                : "text-navy-foreground/70 hover:bg-navy-foreground/10 hover:text-navy-foreground",
            )}
          >
            <item.icon className="size-4.5 shrink-0" />
            <span className="flex-1 truncate">{item.label}</span>
            {item.badge ? (
              <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground">
                {item.badge}
              </span>
            ) : null}
          </Link>
        );
      })}

      <Link
        to="/"
        onClick={onNavigate}
        className="mt-5 flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-navy-foreground/70 transition-colors hover:bg-navy-foreground/10 hover:text-navy-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <ArrowLeftRight className="size-4.5 shrink-0" />
        Switch console
      </Link>
    </nav>

  );
}

/**
 * Dark-sidebar shell used by the manager / admin consoles.
 */
export function ConsoleShell({
  navItems,
  roleLabel,
  initials,
  email,
  searchPlaceholder = "Search...",
  children,
}: {
  navItems: readonly ConsoleNavItem[];
  roleLabel: string;
  initials: string;
  email: string;
  searchPlaceholder?: string | undefined;
  children: ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [quarter, setQuarter] = useState(QUARTER_LABEL);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { user, signOut } = useAuth();

  const displayInitials = user?.initials || initials;
  const displayRole = user?.roleLabel || roleLabel;
  const displayEmail = user?.email || email;
  const displayName = user?.name || roleLabel;

  return (
    <div className="flex min-h-screen w-full bg-background">
      <aside className="sticky top-0 hidden h-screen w-[16.5rem] shrink-0 flex-col bg-navy px-3.5 py-6 lg:flex">
        <div className="px-2">
          <QPilotLogo variant="onDark" />
        </div>
        <div className="mt-8 flex-1 overflow-y-auto pr-1">
          <ConsoleNav items={navItems} />
        </div>
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close navigation"
            className="absolute inset-0 bg-navy/50"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative flex h-full w-72 flex-col bg-navy px-3.5 py-6">
            <div className="flex items-start justify-between px-2">
              <QPilotLogo variant="onDark" />
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close navigation"
                className="grid size-9 place-items-center rounded-lg text-navy-foreground/70 hover:bg-navy-foreground/10"
              >
                <X className="size-4" />
              </button>
            </div>
            <div className="mt-8 flex-1 overflow-y-auto">
              <ConsoleNav items={navItems} onNavigate={() => setMobileOpen(false)} />
            </div>
          </div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-40 flex flex-wrap items-center gap-3 border-b border-border bg-card/95 px-4 py-3 backdrop-blur sm:px-6">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation"
            className="grid size-10 place-items-center rounded-xl text-navy hover:bg-muted lg:hidden"
          >
            <Menu className="size-5" />
          </button>

          <div id="console-title" className="min-w-0 flex-1" />

          <label className="relative hidden lg:block">
            <span className="sr-only">{searchPlaceholder}</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder={searchPlaceholder}
              className="h-10 w-60 rounded-xl border border-border bg-card pl-9 pr-3 text-sm text-navy placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </label>

          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl border border-border bg-card px-3 text-xs font-bold text-navy hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
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
            <DropdownMenuTrigger className="inline-flex h-10 cursor-pointer items-center gap-2.5 rounded-xl border border-border bg-card pl-1.5 pr-3 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <span className="grid size-7 place-items-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">
                {displayInitials}
              </span>
              <span className="hidden text-xs font-bold text-navy sm:block">{displayRole}</span>
              <ChevronDown className="size-3.5 text-muted-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-60">
              <DropdownMenuLabel>
                <p className="font-bold text-navy">{displayName}</p>
                <p className="text-xs font-normal text-muted-foreground">{displayEmail}</p>
                <span className="mt-1 inline-block rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-extrabold text-primary uppercase">
                  {displayRole}
                </span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/dashboard">Switch to Territory Manager</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setAuthModalOpen(true)} className="cursor-pointer gap-2">
                <UserCircle2 className="size-4 text-primary" />
                <span>Switch Role / Account</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => signOut()}
                className="cursor-pointer gap-2 text-destructive focus:text-destructive"
              >
                <LogOut className="size-4" />
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
        </header>

        <main className="mx-auto w-full max-w-[1500px] flex-1 px-4 py-6 sm:px-6">{children}</main>
      </div>
    </div>
  );
}

export function ConsolePageTitle({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: string | undefined;
  actions?: ReactNode | undefined;
}) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-navy sm:text-[1.75rem]">
          {title}
        </h1>
        {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}
