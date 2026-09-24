/**
 * Territory Manager reference-screen data (Input Plan, Learning walkthrough,
 * Practice recorder and Practice result). Mock-only — no backend.
 */

export type InputKind =
  | "reminder_card"
  | "scientific_lbl"
  | "booklet"
  | "conference"
  | "visual_aid"
  | "gift";

export const BRANDS = ["All Brands", "CardioVia", "LipiCore", "Vascora"] as const;
export type BrandFilterValue = (typeof BRANDS)[number];

export const MONTHS = ["APRIL", "MAY", "JUNE"] as const;
export type MonthValue = (typeof MONTHS)[number];

export interface PlannedVisit {
  id: string;
  visit: number;
  brand: string;
  brandLabel: string;
  kind: InputKind;
  title: string;
  description: string;
  current?: boolean;
  campaignId: string;
}

export const monthPlans: Record<MonthValue, { label: string; visits: PlannedVisit[] }> = {
  APRIL: {
    label: "April 2026",
    visits: [
      {
        id: "apr-v1",
        visit: 1,
        brand: "CardioVia",
        brandLabel: "CARDIOVIA",
        kind: "reminder_card",
        title: "Reminder Card – Series 1",
        description: "Start with consistent BP control.",
        current: true,
        campaignId: "cardiocare-a",
      },
      {
        id: "apr-v2",
        visit: 2,
        brand: "CardioVia",
        brandLabel: "CARDIOVIA",
        kind: "scientific_lbl",
        title: "Scientific LBL – Series 1",
        description: "Understanding the Importance of Sustained BP Control",
        campaignId: "cardiocare-a",
      },
      {
        id: "apr-v3",
        visit: 3,
        brand: "CardioVia",
        brandLabel: "CARDIOVIA",
        kind: "booklet",
        title: "Prescription Booklet",
        description: "Brand Recall / Clinic Utility",
        campaignId: "cardiocare-a",
      },
      {
        id: "apr-v4",
        visit: 4,
        brand: "CardioVia",
        brandLabel: "CARDIO CONFERENCE INSIGHT",
        kind: "conference",
        title: "Series 1",
        description: "Hypertension Insights: Early Control Matters",
        campaignId: "cardiocare-a",
      },
    ],
  },
  MAY: {
    label: "May 2026",
    visits: [
      {
        id: "may-v1",
        visit: 1,
        brand: "CardioVia",
        brandLabel: "CARDIOVIA",
        kind: "reminder_card",
        title: "Reminder Card Series 2",
        description: "Reinforce daily adherence messaging.",
        current: true,
        campaignId: "cardiocare-a",
      },
      {
        id: "may-v2",
        visit: 2,
        brand: "LipiCore",
        brandLabel: "LIPICORE",
        kind: "scientific_lbl",
        title: "Scientific LBL Series 2",
        description: "Lipid control and residual cardiovascular risk.",
        campaignId: "metabocare-c",
      },
      {
        id: "may-v3",
        visit: 3,
        brand: "CardioVia",
        brandLabel: "CARDIOVIA",
        kind: "gift",
        title: "Heart-Shaped Table-Top",
        description: "Clinic visibility / brand recall.",
        campaignId: "cardiocare-a",
      },
      {
        id: "may-v4",
        visit: 4,
        brand: "Vascora",
        brandLabel: "VASCORA",
        kind: "gift",
        title: "Parker Pen",
        description: "Relationship reminder item.",
        campaignId: "neuroaid-b",
      },
    ],
  },
  JUNE: {
    label: "June 2026",
    visits: [
      {
        id: "jun-v1",
        visit: 1,
        brand: "Vascora",
        brandLabel: "VASCORA",
        kind: "visual_aid",
        title: "Visual Aid – Series 1",
        description: "Vascular protection across the risk continuum.",
        current: true,
        campaignId: "neuroaid-b",
      },
      {
        id: "jun-v2",
        visit: 2,
        brand: "LipiCore",
        brandLabel: "LIPICORE",
        kind: "scientific_lbl",
        title: "Scientific LBL – Series 3",
        description: "Statin intensity and LDL goal attainment.",
        campaignId: "metabocare-c",
      },
      {
        id: "jun-v3",
        visit: 3,
        brand: "CardioVia",
        brandLabel: "CARDIOVIA",
        kind: "booklet",
        title: "Patient Counselling Booklet",
        description: "Support adherence conversations at home.",
        campaignId: "cardiocare-a",
      },
      {
        id: "jun-v4",
        visit: 4,
        brand: "CardioVia",
        brandLabel: "CARDIO CONFERENCE INSIGHT",
        kind: "conference",
        title: "Series 2",
        description: "Quarter close: sustained control outcomes.",
        campaignId: "cardiocare-a",
      },
    ],
  },
};

export const nextMonthOf: Record<MonthValue, MonthValue | null> = {
  APRIL: "MAY",
  MAY: "JUNE",
  JUNE: null,
};

/* ---------------- Learning: guided detailing flow ---------------- */

export type Emphasis = "key_message" | "important" | "do_not_miss";

export interface FlowStep {
  id: string;
  node: number;
  nodeLabel: string;
  title: string;
  script: string;
  emphasis: Emphasis[];
}

export const detailingFlowNodes = [
  "Opening",
  "Introduce Visual",
  "Scientific Concept",
  "Key Takeaway",
  "Campaign Link",
  "Closing",
];

export const detailingFlow: FlowStep[] = [
  {
    id: "step-1",
    node: 1,
    nodeLabel: "Opening",
    title: "Opening",
    script:
      "Doctor, in our previous interaction we introduced the importance of consistent BP control. Today I would like to take that discussion one step further by focusing on sustained BP control.",
    emphasis: ["important"],
  },
  {
    id: "step-2",
    node: 2,
    nodeLabel: "Introduce Visual",
    title: "Introduce the Visual",
    script:
      "This Scientific LBL summarises what sustained control means over 24 hours, and why morning surges matter for your hypertensive patients.",
    emphasis: ["key_message"],
  },
  {
    id: "step-3",
    node: 3,
    nodeLabel: "Scientific Concept",
    title: "Scientific Concept",
    script:
      "Every 5 mmHg reduction maintained over time translates into a meaningful reduction in cardiovascular events — consistency matters more than a single reading.",
    emphasis: ["key_message", "do_not_miss"],
  },
  {
    id: "step-4",
    node: 3,
    nodeLabel: "Scientific Concept",
    title: "Supporting Evidence",
    script:
      "In the sustained-control cohort, 24-hour ambulatory readings stayed within target for 8 out of 10 patients at week 12.",
    emphasis: ["important"],
  },
  {
    id: "step-5",
    node: 4,
    nodeLabel: "Key Takeaway",
    title: "Key Takeaway",
    script:
      "Sustained control, not occasional control, is what protects your patient — that is the single message to carry into the next prescription decision.",
    emphasis: ["key_message", "do_not_miss"],
  },
  {
    id: "step-6",
    node: 5,
    nodeLabel: "Campaign Link",
    title: "Campaign Link",
    script:
      "This connects directly to the Reminder Card you saw in Visit 1 — 'Control Today. Every Day Matters.' Same idea, now backed by the science.",
    emphasis: ["important"],
  },
  {
    id: "step-7",
    node: 6,
    nodeLabel: "Closing",
    title: "Closing",
    script:
      "Doctor, may I request you to consider CardioVia for your next three patients who need dependable, day-long BP control?",
    emphasis: ["key_message", "do_not_miss"],
  },
];

export const emphasisLabel: Record<Emphasis, string> = {
  key_message: "KEY MESSAGE",
  important: "IMPORTANT",
  do_not_miss: "DO NOT MISS",
};

/** Simple, single-page detailing structure shown on the Learning screen. */
export interface StructureStep {
  id: string;
  icon: "greeting" | "opening" | "core" | "prescription" | "closing";
  title: string;
  script: string;
}

export const detailingStructure: StructureStep[] = [
  {
    id: "s1",
    icon: "greeting",
    title: "Greeting",
    script: "Good morning Doctor, may I know how are you doing?",
  },
  {
    id: "s2",
    icon: "opening",
    title: "Opening",
    script:
      "In our last discussion we talked about consistent BP control. Today I would like to take that discussion forward.",
  },
  {
    id: "s3",
    icon: "core",
    title: "Core Message",
    script:
      "Sustained BP control is key to reduce cardiovascular risk and improve long-term outcomes.",
  },
  {
    id: "s4",
    icon: "prescription",
    title: "Prescription Demand",
    script:
      "I would recommend CardioVia as it helps achieve sustained BP control effectively.",
  },
  {
    id: "s5",
    icon: "closing",
    title: "Closing",
    script: "Thank you Doctor. I look forward to your continued support.",
  },
];

export const learningContext = {
  brand: "CARDIOVIA",
  inputTitle: "Scientific LBL – Series 1",
  month: "APRIL",
  visit: 2,
  quarter: "APR–JUN 2026",
  inputLabel: "INPUT: CARDIOVIA SCIENTIFIC LBL BOOKLET",
  coverKicker: "SCIENTIFIC LBL",
  coverSeries: "SERIES 1",
  coverSubtitle: "Understanding Sustained BP Control",
  coverFooter: "Science that controls better.",
};

/* ---------------- Practice ---------------- */

export const practiceContext = {
  brand: "CARDIOVIA",
  inputTitle: "Reminder Card – Series 1",
  month: "April 2026",
  visit: 2,
  cardTitleLine1: "Control Today.",
  cardTitleLine2: "Every Day Matters.",
  cardFooter: "Consistent Control. Confident Protection.",
  keyPoints: [
    "Consistent BP control",
    "Control Today",
    "Every Day Matters",
    "Healthier Tomorrow",
    "Consistent Control. Confident Protection.",
  ],
  hint: "Speak naturally and cover the key points clearly.",
};

export const practiceResult = {
  accuracy: 88,
  adherence: 91,
  overall: 90,
  readiness: "Nearly Ready",
  didWell:
    "You clearly communicated the core message around consistent BP control.",
  improveNext:
    "Include the “Healthier Tomorrow” message more clearly in your closing.",
  encouragement: "Good progress — one more practice can make you ready.",
};
