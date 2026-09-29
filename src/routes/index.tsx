import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  LineChart,
  LogIn,
  Megaphone,
  Mic,
  ShieldCheck,
  Sparkles,
  Target,
  UserCheck,
} from "lucide-react";
import { QPilotLogo } from "@/components/brand/QPilotLogo";
import { SummitMark } from "@/components/brand/SummitMark";
import { QUARTER_LABEL } from "@/data/mock";
import { useAuth } from "@/lib/auth";
import { AuthModal } from "@/components/auth/AuthModal";
import { Button } from "@/components/ui/button";
import type { UserRole } from "@/types";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Q-Pilot Consoles — Sign in to your dashboard" },
      {
        name: "description",
        content:
          "Choose your Q-Pilot console: Territory Manager, Marketing Manager or Sales Manager. Field intelligence and detailing readiness by Quantae AI.",
      },
      { property: "og:title", content: "Q-Pilot Consoles — Sign in to your dashboard" },
      {
        property: "og:description",
        content:
          "One entry point for Territory Manager, Marketing Manager and Sales Manager dashboards in Q-Pilot.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LandingPage,
});

const consoles: Array<{
  role: string;
  roleKey: UserRole;
  kicker: string;
  to: "/dashboard" | "/marketing/dashboard" | "/sales/dashboard";
  icon: typeof Target;
  tone: string;
  ring: string;
  glow: string;
  summary: string;
  points: string[];
  cta: string;
}> = [
  {
    role: "Territory Manager",
    roleKey: "TM",
    kicker: "Field practice",
    to: "/dashboard",
    icon: Target,
    tone: "bg-mint text-primary",
    ring: "group-hover:border-primary/60",
    glow: "from-primary/20",
    summary: "Learn approved pitches, practise detailing and track your campaign readiness.",
    points: ["Guided practice & recording", "AI assessment results", "My progress & readiness"],
    cta: "Sign in as Territory Manager",
  },
  {
    role: "Marketing Manager",
    roleKey: "MM",
    kicker: "Brand control",
    to: "/marketing/dashboard",
    icon: Megaphone,
    tone: "bg-ai-soft text-ai",
    ring: "group-hover:border-ai/60",
    glow: "from-ai/20",
    summary: "Build campaigns, publish approved inputs and monitor brand-level performance.",
    points: ["Campaign & pitch library", "Vocabulary and rubric control", "Performance copilot"],
    cta: "Sign in as Marketing Manager",
  },
  {
    role: "Sales Manager",
    roleKey: "SM",
    kicker: "Team coaching",
    to: "/sales/dashboard",
    icon: LineChart,
    tone: "bg-info-soft text-info",
    ring: "group-hover:border-info/60",
    glow: "from-info/20",
    summary: "Track team readiness, review practice attempts and assign targeted coaching.",
    points: ["Team command centre", "Practice reviews", "Coaching assignment"],
    cta: "Sign in as Sales Manager",
  },
];

const capabilities = [
  { icon: Mic, label: "Voice-led practice", value: "Record & review detailing in minutes" },
  { icon: Sparkles, label: "AI assessment", value: "Rubric-scored feedback per attempt" },
  { icon: BadgeCheck, label: "Approved content", value: "One source of truth per campaign" },
  { icon: BarChart3, label: "Readiness analytics", value: "Brand, region and rep level" },
];

function LandingPage() {
  const { user, role, signInWithDemoRole, isAuthenticated } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);

  return (
    <div className="aurora-field min-h-screen overflow-hidden">
      <div className="grid-veil pointer-events-none absolute inset-x-0 top-0 h-[560px]" aria-hidden="true" />

      <header className="relative mx-auto flex w-full max-w-[1200px] items-center justify-between gap-4 px-5 py-6 sm:px-8">
        <QPilotLogo />
        <div className="flex items-center gap-2.5">
          <span className="hidden rounded-xl border border-border/70 bg-card/70 px-3 py-2 text-xs font-bold text-navy backdrop-blur sm:block">
            {QUARTER_LABEL}
          </span>
          <button
            type="button"
            onClick={() => setAuthModalOpen(true)}
            className="inline-flex h-9 items-center gap-2 rounded-xl border border-border/70 bg-card/80 px-3 text-xs font-bold text-navy backdrop-blur transition-colors hover:border-primary/40 hover:bg-card cursor-pointer"
          >
            <LogIn className="size-3.5 text-primary" />
            <span>Sign In / Role</span>
          </button>
          <Link
            to="/admin/dashboard"
            onClick={() => signInWithDemoRole("ADMIN")}
            className="inline-flex h-9 items-center gap-2 rounded-xl border border-border/70 bg-card/70 px-3 text-xs font-bold text-navy backdrop-blur transition-colors hover:border-navy/30 hover:bg-card"
          >
            <ShieldCheck className="size-4" />
            Admin
          </Link>
        </div>
      </header>

      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />

      <main className="relative mx-auto w-full max-w-[1200px] px-5 pb-20 sm:px-8">
        <section className="animate-rise pt-8 text-center sm:pt-14">
          <p className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-card/60 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-primary backdrop-blur">
            <span className="relative grid size-2 place-items-center">
              <span className="absolute size-2 rounded-full bg-primary animate-pulse-ring" />
              <span className="size-1.5 rounded-full bg-primary" />
            </span>
            Field Intelligence Platform
          </p>
          <h1 className="text-gradient-brand mx-auto mt-5 max-w-4xl text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
            Choose your Q-Pilot console
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm text-muted-foreground sm:text-base">
            Every role gets a purpose-built dashboard — territory practice, brand campaign control
            and team coaching — all running on the same approved content and AI assessment.
          </p>
        </section>

        <section className="mt-12 grid gap-5 lg:grid-cols-3">
          {consoles.map((item, index) => (
            <Link
              key={item.role}
              to={item.to}
              onClick={() => signInWithDemoRole(item.roleKey)}
              style={{ animationDelay: `${120 + index * 90}ms` }}
              className={`glass-card lift-hover animate-rise group relative flex flex-col overflow-hidden p-6 hover:-translate-y-1.5 hover:shadow-[var(--shadow-card-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${item.ring}`}
            >
              <span
                className={`pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-gradient-to-br ${item.glow} to-transparent opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100`}
                aria-hidden="true"
              />
              <div className="flex items-center justify-between">
                <span
                  className={`grid size-12 place-items-center rounded-2xl transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6 ${item.tone}`}
                  aria-hidden="true"
                >
                  <item.icon className="size-6" />
                </span>
                <span className="rounded-full border border-border/70 bg-card/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                  {item.kicker}
                </span>
              </div>
              <h2 className="mt-5 text-xl font-bold text-navy">{item.role}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{item.summary}</p>
              <ul className="mt-5 space-y-2 border-t border-border/70 pt-4">
                {item.points.map((point) => (
                  <li key={point} className="flex items-center gap-2.5 text-sm text-navy">
                    <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary">
                {item.cta}
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </section>

        <section className="animate-rise mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-4" style={{ animationDelay: "380ms" }}>
          {capabilities.map((cap) => (
            <div key={cap.label} className="glass-card lift-hover flex items-start gap-3 p-5 hover:-translate-y-1">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-navy-soft text-navy" aria-hidden="true">
                <cap.icon className="size-5" />
              </span>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-primary">
                  {cap.label}
                </p>
                <p className="mt-1 text-sm font-semibold leading-snug text-navy">{cap.value}</p>
              </div>
            </div>
          ))}
        </section>

        <section
          className="animate-rise mt-6 grid gap-5 md:grid-cols-[1.6fr_1fr]"
          style={{ animationDelay: "460ms" }}
        >
          <div className="glass-card relative flex flex-wrap items-center justify-between gap-4 overflow-hidden p-6">
            <span
              className="pointer-events-none absolute -left-10 -bottom-16 size-48 rounded-full bg-gradient-to-tr from-navy/15 to-transparent blur-2xl"
              aria-hidden="true"
            />
            <div className="flex items-start gap-4">
              <span
                className="grid size-12 place-items-center rounded-2xl bg-navy text-navy-foreground"
                aria-hidden="true"
              >
                <ShieldCheck className="size-6" />
              </span>
              <div>
                <h2 className="text-lg font-bold text-navy">Super Admin</h2>
                <p className="mt-1 max-w-md text-sm text-muted-foreground">
                  Platform-wide users, roles, tenants, security and adoption analytics.
                </p>
              </div>
            </div>
            <Link
              to="/admin/dashboard"
              className="group inline-flex h-11 items-center gap-2 rounded-xl bg-navy px-5 text-sm font-semibold text-navy-foreground transition-all hover:bg-navy/90 hover:shadow-[var(--shadow-card-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Open admin console
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="glass-card flex items-center gap-5 p-6">
            <SummitMark className="w-24 shrink-0 animate-float text-primary" />
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-primary">
                One platform
              </p>
              <p className="mt-2 text-base font-bold leading-snug text-navy">
                Better Detailing.
                <br />
                Stronger Impact.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
