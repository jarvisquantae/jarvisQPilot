import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  ChevronRight,
  ClipboardList,
  GraduationCap,
  Heart,
  LineChart,
  MessagesSquare,
  Quote,
  Target,
  UserRound,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Home — Q-Pilot Field Intelligence" },
      {
        name: "description",
        content:
          "Your Q-Pilot home: input plan, learning, detailing audio, practice and progress in one place.",
      },
      { property: "og:title", content: "Home — Q-Pilot Field Intelligence" },
      {
        property: "og:description",
        content: "Territory Manager home with quick access to input plan, learning, practice and progress.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DashboardPage,
});

const navCards = [
  {
    label: "Input Plan",
    description: "View detail of your monthly input plan.",
    icon: ClipboardList,
    to: "/campaigns",
  },
  {
    label: "Learn",
    description: "Explore resources to strengthen your skills.",
    icon: BookOpen,
    to: "/campaigns/$campaignId/learning",
    params: { campaignId: "cardiocare-a" },
  },
  {
    label: "Practice",
    description: "Practice with guidance and build confidence.",
    icon: Target,
    to: "/practice",
  },
  {
    label: "Progress",
    description: "Track your progress and stay on track.",
    icon: LineChart,
    to: "/results/progress",
  },
] as const;

const executionSteps = [
  { icon: ClipboardList, title: "View", subtitle: "Input Plan" },
  { icon: CalendarDays, title: "Learn about", subtitle: "inputs & execution calendar" },
  { icon: BookOpen, title: "Learn", subtitle: "detailing story" },
  { icon: Target, title: "Practice", subtitle: "detailing" },
  { icon: UserRound, title: "Get ready for", subtitle: "execution" },
];

function DashboardPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <div className="grid gap-5 lg:grid-cols-3">
          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-2">
            {navCards.map((card) => (
              <Link
                key={card.label}
                to={card.to}
                params={"params" in card ? card.params : {}}
                className="card-surface group flex items-center gap-4 p-5 transition-all hover:-translate-y-0.5 hover:shadow-card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span className="grid size-14 shrink-0 place-items-center rounded-full bg-accent text-primary">
                  <card.icon className="size-6" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-base font-extrabold text-navy">{card.label}</span>
                  <span className="mt-0.5 block text-sm leading-snug text-muted-foreground">
                    {card.description}
                  </span>
                </span>
                <ChevronRight className="size-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
              </Link>
            ))}
          </div>

          <section className="card-surface relative flex flex-col justify-between overflow-hidden bg-accent/50 p-7">
            <Quote className="size-8 text-primary" />
            <blockquote className="mt-6 text-xl font-bold leading-snug text-navy">
              Sales teams bring strategy to life — every doctor interaction turns planning into
              impact.
            </blockquote>
            <span className="mt-6 block h-1 w-12 rounded-full bg-primary" />
          </section>
        </div>

        <section className="card-surface p-6">
          <h2 className="text-base font-extrabold text-navy">Your 5-Step Execution Guide</h2>
          <ol className="mt-6 grid gap-6 sm:grid-cols-3 lg:grid-cols-5">
            {executionSteps.map((step, index) => (
              <li key={step.title + step.subtitle} className="relative">
                {index < executionSteps.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute left-[calc(50%+2.5rem)] top-10 hidden w-[calc(100%-5rem)] border-t-2 border-dashed border-primary/30 lg:block"
                  />
                )}
                <div className="flex flex-col items-center text-center">
                  <span className="relative grid size-20 place-items-center rounded-2xl border border-border bg-card shadow-soft">
                    <span className="absolute -top-2.5 grid size-6 place-items-center rounded-full bg-primary text-xs font-extrabold text-primary-foreground">
                      {index + 1}
                    </span>
                    <span className="grid size-11 place-items-center rounded-full bg-accent text-primary">
                      <step.icon className="size-5" />
                    </span>
                  </span>
                  <p className="mt-4 text-sm font-bold text-navy">{step.title}</p>
                  <p className="text-sm text-navy">{step.subtitle}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <div className="card-surface flex items-center gap-3 px-6 py-4">
          <Heart className="size-5 shrink-0 text-primary" />
          <p className="text-sm font-semibold text-navy">
            You're doing great. Every conversation creates better outcomes.
          </p>
          <Link
            to="/practice"
            className="ml-auto inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline"
          >
            <GraduationCap className="size-4" />
            Keep learning
            <ArrowRight className="size-4" />
          </Link>
          <MessagesSquare className="hidden" />
        </div>
      </div>
    </AppShell>
  );
}
