import { cn } from "@/lib/utils";

/**
 * Decorative "climber at the summit" mark used at the foot of the sidebar.
 * Pure SVG so it inherits the design tokens and stays crisp at any size.
 */
export function SummitMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 170"
      role="presentation"
      aria-hidden="true"
      className={cn("w-full", className)}
    >
      {/* back ridge */}
      <path d="M8 160 L58 74 L96 122 L128 78 L192 160 Z" fill="currentColor" opacity="0.16" />
      {/* mid ridge */}
      <path d="M28 160 L92 62 L150 160 Z" fill="currentColor" opacity="0.3" />
      {/* front peak */}
      <path d="M56 160 L104 44 L152 160 Z" fill="currentColor" opacity="0.5" />
      {/* snow cap */}
      <path d="M104 44 L126 98 L112 90 L100 104 L88 88 L78 96 Z" fill="currentColor" opacity="0.22" />
      {/* flag */}
      <g className="text-navy" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <line x1="122" y1="16" x2="122" y2="52" />
      </g>
      <path d="M122 18 L146 24 L138 30 L146 36 L122 34 Z" className="text-primary" fill="currentColor" />
      {/* climber */}
      <g className="text-navy" fill="currentColor">
        <circle cx="104" cy="24" r="5" />
        <path d="M99 31 h10 l3 15 h-16 z" />
        <path d="M99 46 l-4 16 h4 l4 -11 l4 11 h4 l-4 -16 z" />
        <path d="M108 34 l12 -8 l2 3 l-13 9 z" />
        <path d="M99 34 l-8 6 l2 3 l8 -6 z" />
      </g>
    </svg>
  );
}
