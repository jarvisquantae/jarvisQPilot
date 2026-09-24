/**
 * Sales Manager console mock data.
 * Replace with live API queries later — shapes are intentionally stable.
 */

export type TMStatus = "high_performer" | "on_track" | "needs_improvement";
export type RatingLabel = "Excellent" | "Good" | "Average" | "Needs Improvement";
export type ReadinessState = "ready" | "nearly_ready" | "not_ready";
export type Severity = "Critical" | "High" | "Medium";

export interface Brand {
  id: string;
  name: string;
  teamScore: number;
  icon: "heart" | "brain" | "droplet" | "lungs";
}

export interface TeamMember {
  id: string;
  name: string;
  initials: string;
  empId: string;
  region: string;
  zone: string;
  hq: string;
  accuracy: number;
  adherence: number;
  rating: number;
  ratingLabel: RatingLabel;
  status: TMStatus;
  readiness: number;
  topBrandId: string;
  weakBrandId: string;
  weakIssue: string;
  brandScores: { brandId: string; score: number }[];
  managerNotes: string[];
  latestResults: { brandId: string; date: string; score: number; label: RatingLabel }[];
}

export interface CoachingPlan {
  id: string;
  memberId: string;
  brandId: string;
  area: string;
  dueDate: string;
  status: "Pending" | "In Progress" | "Completed";
}

export interface ReviewItem {
  id: string;
  memberId: string;
  brandId: string;
  date: string;
  time: string;
  score: number;
  accuracy: number;
  adherence: number;
  rating: number;
  reviewStatus: "Good" | "Needs Review" | "Critical";
  covered: { label: string; state: "Covered" | "Partial" | "Missed" }[];
  evidence: { at: string; note: string }[];
  feedback: string[];
}

export const salesManager = {
  id: "usr-sm-001",
  name: "Sales Manager",
  initials: "SM",
  empId: "EMP-10234",
  region: "South Zone",
  reportingTo: "Regional Sales Head",
  teamSize: 40,
};

export const REGIONS = [
  "All Regions",
  "Telangana",
  "Maharashtra",
  "NCR",
  "Uttar Pradesh",
  "Madhya Pradesh",
  "West Bengal",
];

export const ZONES = ["All Zones", "North", "South", "East", "West", "Central"];

export const HQS = [
  "All HQs",
  "Hyderabad HQ",
  "Mumbai HQ",
  "Delhi HQ",
  "Lucknow HQ",
  "Bhopal HQ",
  "Kolkata HQ",
];

export const STATUS_FILTERS = ["All Statuses", "High Performer", "On Track", "Needs Improvement"];

export const brands: Brand[] = [
  { id: "cardiocare-a", name: "CardioCare A", teamScore: 85, icon: "heart" },
  { id: "neuroaid-b", name: "NeuroAid B", teamScore: 77, icon: "brain" },
  { id: "glucomanage-c", name: "GlucoManage C", teamScore: 72, icon: "droplet" },
  { id: "respirawell-d", name: "RespiraWell D", teamScore: 61, icon: "lungs" },
];

export const brandById = (id: string) => brands.find((b) => b.id === id) ?? brands[0]!;

export const teamHeadline = {
  accuracy: { value: 82, delta: 6 },
  adherence: { value: 76, delta: 5 },
  readyTms: { value: 68, delta: 7, note: "27 of 40 TMs" },
  needsAttention: { value: 32, delta: 4, note: "13 of 40 TMs" },
};

export const teamMembers: TeamMember[] = [
  {
    id: "tm-amit-reddy",
    name: "Amit Reddy",
    initials: "AR",
    empId: "TM-10234",
    region: "Telangana",
    zone: "South",
    hq: "Hyderabad HQ",
    accuracy: 92,
    adherence: 87,
    rating: 4.6,
    ratingLabel: "Excellent",
    status: "high_performer",
    readiness: 68,
    topBrandId: "cardiocare-a",
    weakBrandId: "respirawell-d",
    weakIssue: "Missed Key Message",
    brandScores: [
      { brandId: "cardiocare-a", score: 92 },
      { brandId: "neuroaid-b", score: 77 },
      { brandId: "glucomanage-c", score: 72 },
      { brandId: "respirawell-d", score: 61 },
    ],
    managerNotes: [
      "Strong accuracy and explanation on CardioCare A. Keep it up!",
      "Improve product differentiation and objection handling for GlucoManage C.",
      "Focus on closing confidence and adding value in RespiraWell D.",
    ],
    latestResults: [
      { brandId: "cardiocare-a", date: "Jun 20, 2025", score: 92, label: "Excellent" },
      { brandId: "neuroaid-b", date: "Jun 18, 2025", score: 78, label: "Good" },
      { brandId: "glucomanage-c", date: "Jun 16, 2025", score: 65, label: "Needs Improvement" },
    ],
  },
  {
    id: "tm-pooja-kapoor",
    name: "Pooja Kapoor",
    initials: "PK",
    empId: "TM-10241",
    region: "Maharashtra",
    zone: "West",
    hq: "Mumbai HQ",
    accuracy: 89,
    adherence: 82,
    rating: 4.4,
    ratingLabel: "Excellent",
    status: "high_performer",
    readiness: 74,
    topBrandId: "neuroaid-b",
    weakBrandId: "glucomanage-c",
    weakIssue: "Weak Input Explanation",
    brandScores: [
      { brandId: "cardiocare-a", score: 84 },
      { brandId: "neuroaid-b", score: 89 },
      { brandId: "glucomanage-c", score: 64 },
      { brandId: "respirawell-d", score: 70 },
    ],
    managerNotes: [
      "Excellent clinical framing on NeuroAid B.",
      "Reinforce GlucoManage C input explanation with clearer evidence.",
    ],
    latestResults: [
      { brandId: "neuroaid-b", date: "Jun 19, 2025", score: 89, label: "Excellent" },
      { brandId: "cardiocare-a", date: "Jun 15, 2025", score: 84, label: "Good" },
      { brandId: "glucomanage-c", date: "Jun 11, 2025", score: 64, label: "Needs Improvement" },
    ],
  },
  {
    id: "tm-rohit-kumar",
    name: "Rohit Kumar",
    initials: "RK",
    empId: "TM-10256",
    region: "NCR",
    zone: "North",
    hq: "Delhi HQ",
    accuracy: 87,
    adherence: 78,
    rating: 4.0,
    ratingLabel: "Good",
    status: "on_track",
    readiness: 61,
    topBrandId: "glucomanage-c",
    weakBrandId: "respirawell-d",
    weakIssue: "Missed Key Message",
    brandScores: [
      { brandId: "cardiocare-a", score: 78 },
      { brandId: "neuroaid-b", score: 74 },
      { brandId: "glucomanage-c", score: 87 },
      { brandId: "respirawell-d", score: 55 },
    ],
    managerNotes: [
      "Good command of GlucoManage C dosing conversation.",
      "Mandatory safety message often skipped on RespiraWell D.",
    ],
    latestResults: [
      { brandId: "glucomanage-c", date: "Jun 18, 2025", score: 87, label: "Excellent" },
      { brandId: "respirawell-d", date: "Jun 12, 2025", score: 55, label: "Needs Improvement" },
    ],
  },
  {
    id: "tm-neha-gupta",
    name: "Neha Gupta",
    initials: "NG",
    empId: "TM-10262",
    region: "Uttar Pradesh",
    zone: "North",
    hq: "Lucknow HQ",
    accuracy: 83,
    adherence: 68,
    rating: 3.4,
    ratingLabel: "Average",
    status: "on_track",
    readiness: 55,
    topBrandId: "neuroaid-b",
    weakBrandId: "cardiocare-a",
    weakIssue: "Weak Input Explanation",
    brandScores: [
      { brandId: "cardiocare-a", score: 66 },
      { brandId: "neuroaid-b", score: 83 },
      { brandId: "glucomanage-c", score: 71 },
      { brandId: "respirawell-d", score: 62 },
    ],
    managerNotes: [
      "NeuroAid B messaging is improving quarter on quarter.",
      "CardioCare A input explanation needs structure and evidence.",
    ],
    latestResults: [
      { brandId: "neuroaid-b", date: "Jun 17, 2025", score: 83, label: "Good" },
      { brandId: "cardiocare-a", date: "Jun 10, 2025", score: 66, label: "Needs Improvement" },
    ],
  },
  {
    id: "tm-manoj-jaiswal",
    name: "Manoj Jaiswal",
    initials: "MJ",
    empId: "TM-10277",
    region: "Madhya Pradesh",
    zone: "Central",
    hq: "Bhopal HQ",
    accuracy: 80,
    adherence: 62,
    rating: 3.2,
    ratingLabel: "Average",
    status: "on_track",
    readiness: 50,
    topBrandId: "cardiocare-a",
    weakBrandId: "neuroaid-b",
    weakIssue: "Missed Key Message",
    brandScores: [
      { brandId: "cardiocare-a", score: 58 },
      { brandId: "neuroaid-b", score: 60 },
      { brandId: "glucomanage-c", score: 66 },
      { brandId: "respirawell-d", score: 57 },
    ],
    managerNotes: [
      "Confidence improving but mandatory messages still missed.",
      "Schedule 1:1 coaching on CardioCare A closing.",
    ],
    latestResults: [
      { brandId: "cardiocare-a", date: "Jun 14, 2025", score: 58, label: "Needs Improvement" },
      { brandId: "neuroaid-b", date: "Jun 09, 2025", score: 60, label: "Needs Improvement" },
    ],
  },
  {
    id: "tm-suresh-kannan",
    name: "Suresh Kannan",
    initials: "SK",
    empId: "TM-10288",
    region: "West Bengal",
    zone: "East",
    hq: "Kolkata HQ",
    accuracy: 72,
    adherence: 55,
    rating: 2.6,
    ratingLabel: "Needs Improvement",
    status: "needs_improvement",
    readiness: 42,
    topBrandId: "respirawell-d",
    weakBrandId: "neuroaid-b",
    weakIssue: "Low Confidence Opening",
    brandScores: [
      { brandId: "cardiocare-a", score: 52 },
      { brandId: "neuroaid-b", score: 48 },
      { brandId: "glucomanage-c", score: 58 },
      { brandId: "respirawell-d", score: 58 },
    ],
    managerNotes: [
      "Openings lack confidence — practise first 30 seconds daily.",
      "NeuroAid B mandatory message missed in 3 of last 4 attempts.",
    ],
    latestResults: [
      { brandId: "respirawell-d", date: "Jun 13, 2025", score: 58, label: "Needs Improvement" },
      { brandId: "neuroaid-b", date: "Jun 08, 2025", score: 48, label: "Needs Improvement" },
    ],
  },
];

export const memberById = (id: string) =>
  teamMembers.find((m) => m.id === id) ?? teamMembers[0]!;

export const statusLabel: Record<TMStatus, string> = {
  high_performer: "High Performer",
  on_track: "On Track",
  needs_improvement: "Needs Improvement",
};

export const performanceMix = [
  { label: "High Performers", count: 2, share: 33 },
  { label: "On Track", count: 3, share: 50 },
  { label: "Needs Improvement", count: 1, share: 17 },
];

export const quickInsights = [
  { title: "NeuroAid B", body: "has the lowest adherence in West Zone.", tone: "ai" as const },
  { title: "RespiraWell D", body: "is a weak brand for 4 TMs.", tone: "warning" as const },
  {
    title: "Amit Reddy and Pooja Kapoor",
    body: "are top performers this quarter.",
    tone: "success" as const,
  },
];

export const todaysPriorities = [
  {
    id: "pri-1",
    title: "Review Low Performers",
    body: "13 TMs need attention. Review performance and identify gaps.",
    to: "/sales/low-performers",
    tone: "ai" as const,
  },
  {
    id: "pri-2",
    title: "Assign Coaching",
    body: "Assign coaching plans to TMs who need improvement.",
    to: "/sales/coaching",
    tone: "success" as const,
  },
  {
    id: "pri-3",
    title: "Check Brand Readiness",
    body: "Ensure TMs are ready on key brands and latest inputs.",
    to: "/sales/readiness",
    tone: "info" as const,
  },
];

/* ---------- Brand inputs (screen 04) ---------- */

export const brandInputRows = [
  { memberId: "tm-amit-reddy", accuracy: 92, adherence: 90, stars: 5, status: "Strong" },
  { memberId: "tm-pooja-kapoor", accuracy: 89, adherence: 86, stars: 4, status: "Strong" },
  { memberId: "tm-rohit-kumar", accuracy: 78, adherence: 75, stars: 3, status: "Needs Improvement" },
  { memberId: "tm-neha-gupta", accuracy: 66, adherence: 63, stars: 3, status: "Needs Improvement" },
  { memberId: "tm-manoj-jaiswal", accuracy: 58, adherence: 55, stars: 2, status: "Critical" },
  { memberId: "tm-suresh-kannan", accuracy: 52, adherence: 48, stars: 1, status: "Critical" },
] as const;

export const brandOverview = {
  teamScore: 82,
  teamScoreDelta: 6,
  readiness: 85,
  readinessDelta: 5,
  topIssue: "Mandatory message missed",
  topIssueShare: 27,
};

export const commonGaps = [
  { id: "gap-1", title: "Opening weak", share: 42, impact: "High" as const },
  { id: "gap-2", title: "Mandatory message missed", share: 27, impact: "High" as const },
  { id: "gap-3", title: "Input explanation incomplete", share: 22, impact: "Medium" as const },
];

/* ---------- Readiness (screen 05) ---------- */

export const readinessHeadline = {
  overall: 68,
  overallDelta: 7,
  ready: { count: 27, share: 68, delta: 7 },
  nearlyReady: { count: 8, share: 20, delta: -1 },
  reviewRequired: { count: 5, share: 13, delta: -6 },
};

export const readinessByBrand = [
  {
    brandId: "cardiocare-a",
    ready: 22,
    readyShare: 73,
    nearly: 6,
    nearlyShare: 20,
    notReady: 2,
    notReadyShare: 7,
    total: 30,
  },
  {
    brandId: "neuroaid-b",
    ready: 18,
    readyShare: 60,
    nearly: 8,
    nearlyShare: 27,
    notReady: 4,
    notReadyShare: 13,
    total: 30,
  },
  {
    brandId: "glucomanage-c",
    ready: 20,
    readyShare: 67,
    nearly: 6,
    nearlyShare: 20,
    notReady: 4,
    notReadyShare: 13,
    total: 30,
  },
  {
    brandId: "respirawell-d",
    ready: 15,
    readyShare: 50,
    nearly: 8,
    nearlyShare: 27,
    notReady: 7,
    notReadyShare: 23,
    total: 30,
  },
];

export const recommendedActions = [
  {
    id: "act-1",
    title: "Schedule 1:1 Coaching",
    body: "Meet with TMs who need immediate support.",
    tone: "teal" as const,
  },
  {
    id: "act-2",
    title: "Review Brand Inputs",
    body: "Ensure critical brands have latest inputs.",
    tone: "ai" as const,
  },
  {
    id: "act-3",
    title: "Focus on Weak Brands",
    body: "Prioritise improvement in low-performing brands.",
    tone: "warning" as const,
  },
];

export const immediateAttention = [
  {
    id: "ia-1",
    memberId: "tm-suresh-kannan",
    brandId: "cardiocare-a",
    score: 58,
    status: "Needs Review" as const,
    action: "Schedule 1:1 Coaching",
  },
  {
    id: "ia-2",
    memberId: "tm-neha-gupta",
    brandId: "neuroaid-b",
    score: 55,
    status: "Needs Review" as const,
    action: "Share Brand Resources",
  },
  {
    id: "ia-3",
    memberId: "tm-manoj-jaiswal",
    brandId: "cardiocare-a",
    score: 50,
    status: "Not Ready" as const,
    action: "Create Action Plan",
  },
  {
    id: "ia-4",
    memberId: "tm-rohit-kumar",
    brandId: "glucomanage-c",
    score: 47,
    status: "Not Ready" as const,
    action: "Schedule 1:1 Coaching",
  },
  {
    id: "ia-5",
    memberId: "tm-suresh-kannan",
    brandId: "respirawell-d",
    score: 46,
    status: "Not Ready" as const,
    action: "Share Brand Resources",
  },
];

/* ---------- Reviews (screen 06) ---------- */

export const reviews: ReviewItem[] = [
  {
    id: "rev-1",
    memberId: "tm-amit-reddy",
    brandId: "cardiocare-a",
    date: "May 28, 2025",
    time: "10:32 AM",
    score: 92,
    accuracy: 92,
    adherence: 88,
    rating: 4.6,
    reviewStatus: "Good",
    covered: [
      { label: "Opening", state: "Covered" },
      { label: "Core Messages", state: "Covered" },
      { label: "Input Explanation", state: "Covered" },
      { label: "Closing", state: "Covered" },
    ],
    evidence: [
      { at: "00:32", note: "TM opened well and established rapport with the HCP." },
      { at: "02:15", note: "Explained CardioCare A benefits clearly with relevant clinical evidence." },
      { at: "04:42", note: "Handled objection on side effects appropriately and redirected well." },
    ],
    feedback: [
      "Great job establishing need and aligning with the HCP's concerns.",
      "Consider reinforcing key differentiators during the benefit discussion.",
      "Closing could be more confident—ask for commitment clearly.",
    ],
  },
  {
    id: "rev-2",
    memberId: "tm-pooja-kapoor",
    brandId: "neuroaid-b",
    date: "May 28, 2025",
    time: "09:14 AM",
    score: 68,
    accuracy: 70,
    adherence: 64,
    rating: 3.4,
    reviewStatus: "Needs Review",
    covered: [
      { label: "Opening", state: "Covered" },
      { label: "Core Messages", state: "Partial" },
      { label: "Input Explanation", state: "Partial" },
      { label: "Closing", state: "Covered" },
    ],
    evidence: [
      { at: "00:41", note: "Opening was warm but did not set a clear agenda." },
      { at: "03:02", note: "Mandatory safety message was summarised rather than stated." },
      { at: "05:20", note: "Closing lacked a specific next step." },
    ],
    feedback: [
      "State the mandatory safety message verbatim before benefits.",
      "Use one supporting study instead of three general claims.",
      "Close with an agreed follow-up date.",
    ],
  },
  {
    id: "rev-3",
    memberId: "tm-rohit-kumar",
    brandId: "glucomanage-c",
    date: "May 27, 2025",
    time: "04:45 PM",
    score: 45,
    accuracy: 48,
    adherence: 42,
    rating: 2.2,
    reviewStatus: "Critical",
    covered: [
      { label: "Opening", state: "Partial" },
      { label: "Core Messages", state: "Missed" },
      { label: "Input Explanation", state: "Missed" },
      { label: "Closing", state: "Partial" },
    ],
    evidence: [
      { at: "00:18", note: "Jumped into product detail without HCP context." },
      { at: "02:35", note: "Dosing guidance was inaccurate versus approved pitch." },
      { at: "04:10", note: "No mandatory message delivered." },
    ],
    feedback: [
      "Re-listen to the approved detailing audio before the next attempt.",
      "Rehearse the dosing section until it matches the approved pitch.",
      "Book coaching on structure and mandatory messaging.",
    ],
  },
  {
    id: "rev-4",
    memberId: "tm-neha-gupta",
    brandId: "neuroaid-b",
    date: "May 27, 2025",
    time: "11:21 AM",
    score: 72,
    accuracy: 74,
    adherence: 69,
    rating: 3.6,
    reviewStatus: "Needs Review",
    covered: [
      { label: "Opening", state: "Covered" },
      { label: "Core Messages", state: "Covered" },
      { label: "Input Explanation", state: "Partial" },
      { label: "Closing", state: "Partial" },
    ],
    evidence: [
      { at: "00:29", note: "Confident opening with a clear purpose statement." },
      { at: "02:58", note: "Input explanation missed the tolerability evidence." },
      { at: "05:04", note: "Closing did not confirm commitment." },
    ],
    feedback: [
      "Add tolerability data to the input explanation.",
      "Ask a closing question that invites commitment.",
    ],
  },
  {
    id: "rev-5",
    memberId: "tm-manoj-jaiswal",
    brandId: "cardiocare-a",
    date: "May 26, 2025",
    time: "03:50 PM",
    score: 88,
    accuracy: 88,
    adherence: 84,
    rating: 4.2,
    reviewStatus: "Good",
    covered: [
      { label: "Opening", state: "Covered" },
      { label: "Core Messages", state: "Covered" },
      { label: "Input Explanation", state: "Covered" },
      { label: "Closing", state: "Partial" },
    ],
    evidence: [
      { at: "00:35", note: "Strong opening referencing the last visit." },
      { at: "03:12", note: "Clear benefit framing supported by clinical evidence." },
      { at: "05:41", note: "Closing was rushed." },
    ],
    feedback: [
      "Great improvement on core message delivery.",
      "Slow the closing down and confirm the next step.",
    ],
  },
];

/* ---------- Coaching (screen 07) ---------- */

export const coachingHeadline = {
  assigned: { value: 28, delta: 12 },
  pending: { value: 16, delta: 6 },
  completed: { value: 20, delta: 8 },
  repeatNeeded: { value: 6, delta: 2 },
};

export const coachingAreas = [
  {
    id: "ca-1",
    title: "Opening",
    body: "Stronger openings to engage customers",
    share: 35,
    count: 14,
    tone: "ai" as const,
  },
  {
    id: "ca-2",
    title: "Mandatory Messages",
    body: "Missing or weak mandatory messages",
    share: 28,
    count: 11,
    tone: "warning" as const,
  },
  {
    id: "ca-3",
    title: "Brand Benefits",
    body: "Not communicating key brand benefits",
    share: 22,
    count: 9,
    tone: "success" as const,
  },
  {
    id: "ca-4",
    title: "Closing",
    body: "Weak closes and next steps",
    share: 15,
    count: 6,
    tone: "info" as const,
  },
];

export const coachingIssues = [
  "Opening",
  "Mandatory Messages",
  "Brand Benefits",
  "Input Explanation",
  "Objection Handling",
  "Closing",
];

export const coachingPlans: CoachingPlan[] = [
  {
    id: "cp-1",
    memberId: "tm-amit-reddy",
    brandId: "cardiocare-a",
    area: "Opening",
    dueDate: "May 28, 2025",
    status: "In Progress",
  },
  {
    id: "cp-2",
    memberId: "tm-suresh-kannan",
    brandId: "neuroaid-b",
    area: "Mandatory Messages",
    dueDate: "May 30, 2025",
    status: "Pending",
  },
  {
    id: "cp-3",
    memberId: "tm-neha-gupta",
    brandId: "neuroaid-b",
    area: "Brand Benefits",
    dueDate: "Jun 2, 2025",
    status: "Pending",
  },
  {
    id: "cp-4",
    memberId: "tm-manoj-jaiswal",
    brandId: "cardiocare-a",
    area: "Closing",
    dueDate: "Jun 3, 2025",
    status: "In Progress",
  },
  {
    id: "cp-5",
    memberId: "tm-pooja-kapoor",
    brandId: "glucomanage-c",
    area: "Opening",
    dueDate: "Jun 5, 2025",
    status: "Pending",
  },
];

export const recentCompletions = [
  {
    id: "rc-1",
    memberId: "tm-pooja-kapoor",
    brandId: "glucomanage-c",
    area: "Brand Benefits",
    date: "May 20, 2025",
  },
  {
    id: "rc-2",
    memberId: "tm-rohit-kumar",
    brandId: "respirawell-d",
    area: "Closing",
    date: "May 18, 2025",
  },
];

/* ---------- Low performers (screen 08) ---------- */

export const lowPerformers = [
  {
    id: "lp-1",
    memberId: "tm-manoj-jaiswal",
    brandId: "cardiocare-a",
    issue: "Missed Key Message",
    accuracy: 50,
    adherence: 52,
    overall: 51,
    severity: "Critical" as Severity,
  },
  {
    id: "lp-2",
    memberId: "tm-neha-gupta",
    brandId: "neuroaid-b",
    issue: "Weak Input Explanation",
    accuracy: 55,
    adherence: 60,
    overall: 57,
    severity: "High" as Severity,
  },
  {
    id: "lp-3",
    memberId: "tm-suresh-kannan",
    brandId: "respirawell-d",
    issue: "Low Confidence Opening",
    accuracy: 58,
    adherence: 57,
    overall: 58,
    severity: "High" as Severity,
  },
  {
    id: "lp-4",
    memberId: "tm-pooja-kapoor",
    brandId: "glucomanage-c",
    issue: "Incomplete Closing",
    accuracy: 61,
    adherence: 63,
    overall: 62,
    severity: "High" as Severity,
  },
  {
    id: "lp-5",
    memberId: "tm-rohit-kumar",
    brandId: "neuroaid-b",
    issue: "Weak Input Explanation",
    accuracy: 64,
    adherence: 65,
    overall: 65,
    severity: "Medium" as Severity,
  },
  {
    id: "lp-6",
    memberId: "tm-amit-reddy",
    brandId: "cardiocare-a",
    issue: "Missed Key Message",
    accuracy: 65,
    adherence: 66,
    overall: 66,
    severity: "Medium" as Severity,
  },
];

export const rootCauses = [
  {
    id: "rc-a",
    title: "Missed Mandatory Message",
    body: "TMs are skipping key messages in brand conversations.",
    share: 36,
    tone: "warning" as const,
  },
  {
    id: "rc-b",
    title: "Weak Input Explanation",
    body: "Inputs are not explained with enough clarity or relevance.",
    share: 28,
    tone: "ai" as const,
  },
  {
    id: "rc-c",
    title: "Low Confidence Opening",
    body: "TMs struggle to open conversations with confidence.",
    share: 22,
    tone: "info" as const,
  },
  {
    id: "rc-d",
    title: "Incomplete Closing",
    body: "Conversations are not being closed with key next steps.",
    share: 14,
    tone: "success" as const,
  },
];

export const lowPerformanceByBrand = [
  { brandId: "cardiocare-a", score: 62 },
  { brandId: "neuroaid-b", score: 58 },
  { brandId: "glucomanage-c", score: 55 },
  { brandId: "respirawell-d", score: 54 },
];

/* ---------- Reports (screen 09) ---------- */

export const reportTypes = [
  {
    id: "rt-1",
    title: "Team Performance Report",
    body: "Overview of team performance and key metrics.",
    tone: "success" as const,
  },
  {
    id: "rt-2",
    title: "Brand-wise Report",
    body: "Performance breakdown across brands and inputs.",
    tone: "ai" as const,
  },
  {
    id: "rt-3",
    title: "Readiness Report",
    body: "Readiness status of TMs and key observations.",
    tone: "teal" as const,
  },
  {
    id: "rt-4",
    title: "Low Performer Report",
    body: "Identify TMs who are underperforming based on key metrics.",
    tone: "warning" as const,
  },
  {
    id: "rt-5",
    title: "Coaching Report",
    body: "Summary of coaching activities and follow-ups by TMs.",
    tone: "success" as const,
  },
  {
    id: "rt-6",
    title: "Assessment Summary",
    body: "Summary of assessments conducted and outcomes.",
    tone: "info" as const,
  },
];

export const exportFormats = [
  { id: "pdf", label: "Export as PDF", body: "Best for sharing and printing", badge: "PDF" },
  { id: "excel", label: "Export as Excel", body: "Best for data analysis", badge: "XLS" },
  { id: "csv", label: "Export as CSV", body: "Best for raw data", badge: "CSV" },
];

export const generatedReports = [
  {
    id: "gr-1",
    name: "Team Performance Report",
    createdOn: "May 20, 2025 10:30 AM",
    filters: "Q2 2025, All Regions, All Brands, All TMs",
  },
  {
    id: "gr-2",
    name: "Brand-wise Report",
    createdOn: "May 18, 2025 04:15 PM",
    filters: "Q2 2025, South Zone, All Brands, All TMs",
  },
  {
    id: "gr-3",
    name: "Readiness Report",
    createdOn: "May 16, 2025 11:45 AM",
    filters: "Q2 2025, East Zone, All Brands, All TMs",
  },
  {
    id: "gr-4",
    name: "Low Performer Report",
    createdOn: "May 14, 2025 09:20 AM",
    filters: "Q2 2025, All Regions, All Brands",
  },
  {
    id: "gr-5",
    name: "Coaching Report",
    createdOn: "May 12, 2025 03:05 PM",
    filters: "Q2 2025, West Zone, All Brands, All TMs",
  },
];

/* ---------- Notifications (screen 10) ---------- */

export const salesNotifications = [
  {
    id: "sn-1",
    title: "Low Performer Alert",
    body: "2 TMs in your team need immediate attention.",
    time: "10m ago",
    tone: "warning" as const,
  },
  {
    id: "sn-2",
    title: "Brand Readiness Issue",
    body: "3 TMs have brand readiness below 60%.",
    time: "1h ago",
    tone: "ai" as const,
  },
  {
    id: "sn-3",
    title: "Coaching Completed",
    body: 'Pooja Kapoor completed "Handling Objections".',
    time: "3h ago",
    tone: "success" as const,
  },
  {
    id: "sn-4",
    title: "Review Pending",
    body: "Review pending for 2 TMs.",
    time: "1d ago",
    tone: "info" as const,
  },
  {
    id: "sn-5",
    title: "New Report Ready",
    body: "Q2 Performance Summary is now available.",
    time: "1d ago",
    tone: "teal" as const,
  },
];

/* ---------- Input-wise performance (SM TM detail, month filtered) ---------- */

export const INPUT_MONTHS = ["All Months", "April", "May", "June"];

export interface InputPerformanceRow {
  id: string;
  month: string;
  brandId: string;
  inputName: string;
  visit: string;
  accuracy: number;
  adherence: number;
}

export const inputPerformance: InputPerformanceRow[] = [
  {
    id: "ip-1",
    month: "April",
    brandId: "cardiocare-a",
    inputName: "Reminder Card – Series 1",
    visit: "Visit 1",
    accuracy: 88,
    adherence: 84,
  },
  {
    id: "ip-2",
    month: "April",
    brandId: "cardiocare-a",
    inputName: "Scientific LBL – Series 1",
    visit: "Visit 2",
    accuracy: 92,
    adherence: 87,
  },
  {
    id: "ip-3",
    month: "April",
    brandId: "neuroaid-b",
    inputName: "Patient Booklet",
    visit: "Visit 3",
    accuracy: 77,
    adherence: 71,
  },
  {
    id: "ip-4",
    month: "May",
    brandId: "glucomanage-c",
    inputName: "Clinical Reprint",
    visit: "Visit 1",
    accuracy: 72,
    adherence: 68,
  },
  {
    id: "ip-5",
    month: "May",
    brandId: "cardiocare-a",
    inputName: "Visual Aid – Core Story",
    visit: "Visit 2",
    accuracy: 85,
    adherence: 80,
  },
  {
    id: "ip-6",
    month: "June",
    brandId: "respirawell-d",
    inputName: "Conference Highlights",
    visit: "Visit 1",
    accuracy: 61,
    adherence: 58,
  },
  {
    id: "ip-7",
    month: "June",
    brandId: "neuroaid-b",
    inputName: "Scientific LBL – Series 2",
    visit: "Visit 2",
    accuracy: 79,
    adherence: 74,
  },
];

/* ---------- Team Performance Board (Sales Manager overview) ---------- */

export type TeamPerfStatus = "Strong" | "Good" | "Needs Focus" | "";

export interface TeamPerformanceRow {
  id: string;
  tm: string;
  region: string;
  zone: string;
  sm: string;
  brandCampaign: string;
  month: string;
  input: string;
  accuracy: number | null;
  adherence: number | null;
  attempts: number | null;
  statusScore: number | null;
  status: TeamPerfStatus;
}

export const teamPerformanceRows: TeamPerformanceRow[] = [
  { id: "tp-01", tm: "Amit Sharma", region: "North", zone: "Delhi", sm: "R. Mehta", brandCampaign: "CardioVia – Consistent Control Confident Protection", month: "April", input: "Reminder Card – S1", accuracy: 91, adherence: 90, attempts: 2, statusScore: 89, status: "Strong" },
  { id: "tp-02", tm: "Ravi Kumar", region: "South", zone: "Chennai", sm: "P. Rao", brandCampaign: "LipiCore – Look Beyond the Number", month: "May", input: "Scientific LBL – S2", accuracy: 93, adherence: 93, attempts: 1, statusScore: 93, status: "Strong" },
  { id: "tp-03", tm: "Neha Singh", region: "East", zone: "Kolkata", sm: "A. Bose", brandCampaign: "Vascotra – Protect the Journey Ahead", month: "June", input: "Conference Insight – S2", accuracy: 91, adherence: 91, attempts: 1, statusScore: 91, status: "Strong" },
  { id: "tp-04", tm: "Rahul Verma", region: "West", zone: "Mumbai", sm: "P. Deshmukh", brandCampaign: "CardioVia – Consistent Control Confident Protection", month: "April", input: "Conference Insight – S1", accuracy: 91, adherence: 90, attempts: 2, statusScore: 90, status: "Good" },
  { id: "tp-05", tm: "Priya Nair", region: "Central", zone: "Bhopal", sm: "M. Tiwari", brandCampaign: "LipiCore – Look Beyond the Number", month: "May", input: "Reminder Card – S2", accuracy: 84, adherence: 85, attempts: 2, statusScore: 85, status: "Good" },
  { id: "tp-06", tm: "Sandeep Yadav", region: "North", zone: "Punjab", sm: "A. Khanna", brandCampaign: "Vascotra – Protect the Journey Ahead", month: "April", input: "Scientific LBL – S1", accuracy: 89, adherence: 87, attempts: 3, statusScore: 83, status: "Good" },
  { id: "tp-07", tm: "Pooja Mehta", region: "South", zone: "Bengaluru", sm: "K. Nar", brandCampaign: "CardioVia – Consistent Control Confident Protection", month: "April", input: "Heart-Shaped Table-Top", accuracy: 84, adherence: 87, attempts: null, statusScore: 83, status: "Good" },
  { id: "tp-08", tm: "Vikram Patel", region: "East", zone: "Bhubaneswar", sm: "D. Das", brandCampaign: "CardioVia – Consistent Control Confident Protection", month: "June", input: "QR Evidence Card", accuracy: 82, adherence: 84, attempts: 3, statusScore: 82, status: "Needs Focus" },
  { id: "tp-09", tm: "Anjali Gupta", region: "West", zone: "Pune", sm: "A. Kulkarni", brandCampaign: "LipiCore – Look Beyond the Number", month: "April", input: "Reminder Card – S1", accuracy: 84, adherence: 77, attempts: null, statusScore: 77, status: "Needs Focus" },
  { id: "tp-10", tm: "Arjun Rao", region: "Central", zone: "Indore", sm: "R. Jain", brandCampaign: "Vascotra – Protect the Journey Ahead", month: "May", input: "Scientific LBL – S2", accuracy: 70, adherence: null, attempts: null, statusScore: null, status: "Strong" },
  { id: "tp-11", tm: "Karan Malhotra", region: "North", zone: "UP", sm: "V. Saxena", brandCampaign: "CardioVia – Consistent Control Confident Protection", month: "April", input: "Prescription Booklet", accuracy: 95, adherence: 91, attempts: null, statusScore: 91, status: "Strong" },
  { id: "tp-12", tm: "Sneha Iyer", region: "South", zone: "Hyderabad", sm: "M. Reddy", brandCampaign: "LipiCore – Look Beyond the Number", month: "May", input: "QR Evidence Card", accuracy: 96, adherence: 91, attempts: 5, statusScore: 91, status: "" },
  { id: "tp-13", tm: "Deepak Joshi", region: "East", zone: "Patna", sm: "N. Sinha", brandCampaign: "Vascotra – Protect the Journey Ahead", month: "June", input: "Reminder Card – S3", accuracy: null, adherence: null, attempts: null, statusScore: 94, status: "" },
  { id: "tp-14", tm: "Rita Kapoor", region: "West", zone: "Ahmedabad", sm: "H. Patel", brandCampaign: "CardioVia – Consistent Control Confident Protection", month: "April", input: "Scientific LBL – S1", accuracy: 92, adherence: 87, attempts: 2, statusScore: 87, status: "Good" },
  { id: "tp-15", tm: "Manish Tiwari", region: "Central", zone: "Nagpur", sm: "S. Patil", brandCampaign: "CardioVia – Consistent Control Confident Protection", month: "April", input: "Heart-Shaped Table-Top", accuracy: 87, adherence: 83, attempts: null, statusScore: null, status: "Good" },
  { id: "tp-16", tm: "Kavita Reddy", region: "North", zone: "Delhi", sm: "S. Gupta", brandCampaign: "LipiCore – Look Beyond the Number", month: "April", input: "Conference Insight – S1", accuracy: 91, adherence: 90, attempts: 2, statusScore: 83, status: "Good" },
  { id: "tp-17", tm: "Nitin Chauhan", region: "South", zone: "Chennai", sm: "P. Rao", brandCampaign: "Vascotra – Protect the Journey Ahead", month: "June", input: "Reminder Card – S2", accuracy: 93, adherence: 93, attempts: null, statusScore: null, status: "" },
  { id: "tp-18", tm: "Meera Das", region: "East", zone: "Kolkata", sm: "R. Ghosh", brandCampaign: "CardioVia – Consistent Control Confident Protection", month: "April", input: "Scientific LBL – S3", accuracy: null, adherence: null, attempts: null, statusScore: null, status: "" },
  { id: "tp-19", tm: "Ajay Bhatia", region: "West", zone: "Mumbai", sm: "V. Shah", brandCampaign: "LipiCore – Look Beyond the Number", month: "April", input: "Patient Profile Card", accuracy: null, adherence: null, attempts: null, statusScore: null, status: "" },
  { id: "tp-20", tm: "Swati Kulkarni", region: "Central", zone: "Bhopal", sm: "M. Tiwari", brandCampaign: "Vascotra – Protect the Journey Ahead", month: "April", input: "Doctor Desk Card", accuracy: 69, adherence: 83, attempts: 4, statusScore: 83, status: "" },
  { id: "tp-21", tm: "Rohit Sinha", region: "North", zone: "Punjab", sm: "A. Khanna", brandCampaign: "CardioVia – Consistent Control Confident Protection", month: "April", input: "Reminder Card – S1", accuracy: 94, adherence: 91, attempts: 2, statusScore: 94, status: "" },
  { id: "tp-22", tm: "Divya Menon", region: "South", zone: "Bengaluru", sm: "S. Iyer", brandCampaign: "CardioVia – Consistent Control Confident Protection", month: "June", input: "Scientific LBL – S2", accuracy: 92, adherence: 95, attempts: 2, statusScore: null, status: "" },
  { id: "tp-23", tm: "Ashish Saxena", region: "East", zone: "Bhubaneswar", sm: "D. Das", brandCampaign: "LipiCore – Look Beyond the Number", month: "April", input: "Case Discussion Card", accuracy: 91, adherence: 94, attempts: null, statusScore: null, status: "" },
  { id: "tp-24", tm: "Nisha Jain", region: "West", zone: "Pune", sm: "A. Kulkarni", brandCampaign: "Vascotra – Protect the Journey Ahead", month: "April", input: "Conference Insight – S1", accuracy: 91, adherence: 94, attempts: null, statusScore: null, status: "" },
  { id: "tp-25", tm: "Gaurav Mishra", region: "Central", zone: "Indore", sm: "R. Jain", brandCampaign: "CardioVia – Consistent Control Confident Protection", month: "May", input: "Reminder Card – S2", accuracy: 83, adherence: 87, attempts: 3, statusScore: null, status: "" },
  { id: "tp-26", tm: "Preeti Shah", region: "North", zone: "UP", sm: "V. Saxena", brandCampaign: "LipiCore – Look Beyond the Number", month: "April", input: "Scientific LBL – S1", accuracy: 85, adherence: 90, attempts: 2, statusScore: null, status: "" },
  { id: "tp-27", tm: "Vivek Pandey", region: "South", zone: "Hyderabad", sm: "M. Reddy", brandCampaign: "Vascotra – Protect the Journey Ahead", month: "April", input: "Patient Journey Card", accuracy: 91, adherence: 85, attempts: 2, statusScore: null, status: "" },
  { id: "tp-28", tm: "Shalini Bose", region: "East", zone: "Patna", sm: "N. Sinha", brandCampaign: "CardioVia – Consistent Control Confident Protection", month: "May", input: "QR Evidence Card", accuracy: 69, adherence: 61, attempts: 4, statusScore: 61, status: "Needs Focus" },
  { id: "tp-29", tm: "Abhishek Roy", region: "West", zone: "Ahmedabad", sm: "H. Patel", brandCampaign: "CardioVia – Consistent Control Confident Protection", month: "April", input: "Reminder Card – S1", accuracy: 74, adherence: null, attempts: 3, statusScore: 68, status: "Needs Focus" },
  { id: "tp-30", tm: "Monika Chawla", region: "Central", zone: "Nagpur", sm: "S. Patil", brandCampaign: "LipiCore – Look Beyond the Number", month: "May", input: "Scientific LBL – S2", accuracy: 68, adherence: 78, attempts: 5, statusScore: 68, status: "Needs Focus" },
];

