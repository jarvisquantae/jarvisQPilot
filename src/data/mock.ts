import type {
  AiSuggestion,
  AppNotification,
  AssessmentResult,
  AssessmentRubric,
  Campaign,
  CoachingAction,
  DashboardMetrics,
  InputStatus,
  Pitch,
  PracticeAttempt,
  Product,
  Progress,
  PromotionalInput,
  Transcript,
  User,
} from "@/types";

export const QUARTER_LABEL = "Q2 2025 (Apr – Jun)";
export const QUARTERS = ["Q1 2025 (Jan – Mar)", "Q2 2025 (Apr – Jun)", "Q3 2025 (Jul – Sep)"];

export const currentUser: User = {
  id: "usr-tm-001",
  name: "Territory Manager",
  role: "TM",
  roleLabel: "Territory Manager",
  email: "tm.manager@quantae.ai",
  territory: "North Zone",
  reportingManager: "Regional Sales Manager",
  currentCampaignId: "cardiocare-a",
  initials: "TM",
};

export const products: Product[] = [
  {
    id: "prd-cardiocare-a",
    name: "CardioCare A",
    indication: "Hypertension",
    therapyArea: "Cardiometabolic Health",
  },
  {
    id: "prd-neuroaid-b",
    name: "NeuroAid B",
    indication: "Migraine",
    therapyArea: "Neurology",
  },
  {
    id: "prd-metabocare-c",
    name: "MetaboCare C",
    indication: "Type 2 Diabetes",
    therapyArea: "Endocrinology",
  },
];

export const campaigns: Campaign[] = [
  {
    id: "cardiocare-a",
    slug: "cardiocare-a",
    code: "CARD-Q2-01",
    title: "Spring Cardio Drive",
    productId: "prd-cardiocare-a",
    productName: "CardioCare A",
    quarter: "Q2 2025 Cardiovascular Care Campaign",
    objective:
      "Drive appropriate use of CardioCare A as first-line therapy for hypertension.",
    dueDate: "20 May 2025",
    status: "on_track",
    progress: 78,
    readiness: "ready",
    readinessScore: 98,
    assigned: true,
  },
  {
    id: "neuroaid-b",
    slug: "neuroaid-b",
    code: "NEUR-Q2-02",
    title: "Neuro Support Focus",
    productId: "prd-neuroaid-b",
    productName: "NeuroAid B",
    quarter: "Q2 2025 Neurology Campaign",
    objective:
      "Position NeuroAid B for patients with frequent episodic migraine requiring preventive therapy.",
    dueDate: "10 Jun 2025",
    status: "in_progress",
    progress: 45,
    readiness: "on_track",
    readinessScore: 75,
    assigned: true,
  },
  {
    id: "metabocare-c",
    slug: "metabocare-c",
    code: "META-Q2-03",
    title: "Metabolic Health Initiative",
    productId: "prd-metabocare-c",
    productName: "MetaboCare C",
    quarter: "Q2 2025 Metabolic Campaign",
    objective:
      "Build awareness of MetaboCare C for patients needing additional glycaemic control.",
    dueDate: "30 Jun 2025",
    status: "not_started",
    progress: 0,
    readiness: "not_started",
    readinessScore: 0,
    assigned: true,
  },
];

export const weeklyInputs: PromotionalInput[] = [
  {
    id: "inp-01",
    campaignId: "cardiocare-a",
    day: "Monday",
    dayNumber: "19",
    specialty: "Cardiologist",
    title: "AHA Guideline Update",
    status: "completed",
    usage: "For Doctor Use",
    format: "Digital Aid",
    validity: "01 Apr – 30 Jun 2025",
    approvedBy: "Medical Affairs",
    lastUpdated: "20 Apr 2025",
    explanation:
      "This aid highlights the clinical benefits of CardioCare A and supports appropriate patient selection and use.",
  },
  {
    id: "inp-02",
    campaignId: "neuroaid-b",
    day: "Tuesday",
    dayNumber: "20",
    specialty: "Neurologist",
    title: "Migraine Care Pathways",
    status: "pending",
    usage: "For Doctor Use",
    format: "Digital Aid",
    validity: "01 Apr – 30 Jun 2025",
    approvedBy: "Medical Affairs",
    lastUpdated: "18 Apr 2025",
    explanation:
      "Explains the preventive care pathway and where NeuroAid B fits for episodic migraine patients.",
  },
  {
    id: "inp-03",
    campaignId: "metabocare-c",
    day: "Wednesday",
    dayNumber: "21",
    specialty: "Endocrinologist",
    title: "GLP-1 Patient Support",
    status: "pending",
    usage: "For Doctor Use",
    format: "Leave Behind",
    validity: "01 Apr – 30 Jun 2025",
    approvedBy: "Medical Affairs",
    lastUpdated: "12 Apr 2025",
    explanation:
      "Supports the patient counselling conversation for treatment initiation and adherence.",
  },
  {
    id: "inp-04",
    campaignId: "cardiocare-a",
    day: "Friday",
    dayNumber: "23",
    specialty: "Cardiologist",
    title: "Patient Education Handout",
    status: "not_started",
    usage: "For Patient Use",
    format: "Printed Handout",
    validity: "01 Apr – 30 Jun 2025",
    approvedBy: "Medical Affairs",
    lastUpdated: "08 Apr 2025",
    explanation:
      "Helps patients understand blood pressure control and the importance of daily adherence.",
  },
];

export const pitches: Record<string, Pitch> = {
  "cardiocare-a": {
    id: "pitch-cardiocare-a",
    campaignId: "cardiocare-a",
    status: "approved",
    totalDuration: "09:32",
    listeningFocus: [
      "Hook the HCP early with a relevant opener.",
      "Communicate the core value with clarity and confidence.",
      "Link benefits to patient outcomes.",
      "End with a confident close and next step.",
    ],
    sections: [
      {
        id: "sec-opening",
        kind: "opening",
        order: 1,
        title: "Opening",
        durationLabel: "00:48",
        script:
          "Good morning Dr. Sharma, thank you for seeing me today. I'd like to share how CardioCare A can help your patients better manage their cardiovascular risk and improve long-term outcomes.",
        bullets: [],
        reminders: [
          "Build rapport and thank the HCP for their time.",
          "State the purpose clearly and confidently.",
          "Link to patient benefit to create relevance.",
        ],
        aiFocus:
          "Focus on a confident, warm opening that builds trust and sets the right tone.",
        aiCriteria: ["Greeting & rapport", "Clarity of purpose", "Relevance to patient benefit"],
      },
      {
        id: "sec-core",
        kind: "core_messages",
        order: 2,
        title: "Core Messages",
        durationLabel: "04:32",
        script:
          "CardioCare A delivers proven and consistent BP reduction, with once daily dosing that simplifies treatment, and a strong safety and tolerability profile.",
        bullets: [
          "CardioCare A delivers proven and consistent BP reduction.",
          "Once daily dosing simplifies treatment and improves adherence.",
          "Well tolerated with a strong safety profile.",
        ],
        reminders: [
          "Cover all three mandatory messages in order.",
          "Support each claim with the approved data.",
          "Pause and check for HCP agreement.",
        ],
        aiFocus:
          "Ensure every mandatory message is delivered clearly, in approved language, without embellishment.",
        aiCriteria: ["Mandatory message coverage", "Approved terminology", "Clarity of benefit"],
        mandatory: true,
      },
      {
        id: "sec-input",
        kind: "input_explanation",
        order: 3,
        title: "Input Explanation",
        durationLabel: "03:10",
        script:
          "This aid highlights the clinical benefits of CardioCare A and supports appropriate patient selection and use.",
        bullets: [
          "Walk the HCP through the digital aid in sequence.",
          "Anchor each panel to a patient type they see.",
        ],
        reminders: [
          "Reference the approved input, not personal material.",
          "Explain how the aid supports patient selection.",
          "Keep to the approved usage and validity.",
        ],
        aiFocus: "Explain the approved input accurately and tie it to appropriate patient use.",
        aiCriteria: ["Correct input referenced", "Patient selection explained", "Approved usage"],
      },
      {
        id: "sec-closing",
        kind: "closing",
        order: 4,
        title: "Closing",
        durationLabel: "01:02",
        script:
          "CardioCare A helps your patients achieve better control and a better quality of life.",
        bullets: [],
        reminders: [
          "Summarise the value in one sentence.",
          "Make a clear, specific ask.",
          "Confirm the next step before you leave.",
        ],
        aiFocus: "Close with confidence, a clear ask and an agreed next step.",
        aiCriteria: ["Confident summary", "Clear call to action", "Next step confirmed"],
      },
    ],
    objections: [
      {
        id: "obj-01",
        objection: "My patients experience dizziness.",
        response:
          "CardioCare A has a low incidence of dizziness and is generally well tolerated.",
      },
      {
        id: "obj-02",
        objection: "There are cheaper options available.",
        response:
          "CardioCare A offers proven efficacy, once daily convenience, and better long-term outcomes.",
      },
    ],
  },
};

export const rubrics: Record<string, AssessmentRubric> = {
  "cardiocare-a": {
    id: "rub-cardiocare-a",
    campaignId: "cardiocare-a",
    weights: { accuracy: 0.4, adherence: 0.4, mandatoryMessages: 0.2 },
    mandatoryMessages: [
      "Proven and consistent BP reduction",
      "Once daily dosing improves adherence",
      "Well tolerated with a strong safety profile",
    ],
    approvedSynonyms: [
      { spoken: "High BP", approved: "Hypertension" },
      { spoken: "HTN", approved: "Hypertension" },
      { spoken: "Lung Attack", approved: "COPD Exacerbation" },
    ],
    prohibitedClaims: ["Cures hypertension", "No side effects", "Best in class"],
    readinessThreshold: 85,
  },
};

export const dashboardMetrics: DashboardMetrics = {
  accuracy: 92,
  accuracyDelta: 8,
  adherence: 88,
  adherenceDelta: 6,
  rating: 4.6,
  ratingDelta: 0.4,
  readiness: "ready",
  readinessNote: "You're all set!",
};

export const aiSuggestions: AiSuggestion[] = [
  {
    id: "ai-01",
    title: "Improve Opening",
    detail: "Create stronger engagement in the first 60 seconds.",
  },
  {
    id: "ai-02",
    title: "Mention Mandatory Message 2",
    detail: "Consistently include MM2 for better impact.",
  },
  {
    id: "ai-03",
    title: "Strengthen Closing",
    detail: "End with confidence and a clear next step.",
  },
];

export const nextActions: string[] = [
  "Complete today's practice for CardioCare A",
  "Review feedback from your last practice",
  "MM2 focus recommended for next practice",
];

export const latestAttempt: PracticeAttempt = {
  id: "att-2025-05-20",
  campaignId: "cardiocare-a",
  userId: currentUser.id,
  mode: "full",
  date: "20 May 2025",
  score: 90,
  rating: 4.6,
  verdict: "Great job!",
  durationSeconds: 512,
};

export const transcripts: Record<string, Transcript> = {
  "cardiocare-a": {
    id: "trn-2025-05-20",
    attemptId: "att-2025-05-20",
    campaignId: "cardiocare-a",
    submittedAt: "20 May 2025, 10:42 AM",
    status: "complete",
    turns: [
      {
        id: "t1",
        speaker: "tm",
        speakerLabel: "You",
        text: "Good morning, Dr. Sharma. I wanted to discuss CardioCare A for your patients with high BP.",
      },
      {
        id: "t2",
        speaker: "hcp",
        speakerLabel: "HCP",
        text: "Thanks. I usually see a lot of HTN patients. How does this help?",
      },
      {
        id: "t3",
        speaker: "tm",
        speakerLabel: "You",
        text: "CardioCare A helps control blood pressure effectively and also provides renal protection. In our studies, it reduced the risk of cardiovascular events.",
      },
      {
        id: "t4",
        speaker: "hcp",
        speakerLabel: "HCP",
        text: "That's good. I also have some elderly patients who get breathless during exertion, almost like a lung attack.",
      },
      {
        id: "t5",
        speaker: "tm",
        speakerLabel: "You",
        text: "Yes, in those cases, CardioCare A has shown benefit in reducing hospitalizations related to COPD exacerbation.",
      },
    ],
    vocabularyMapping: [
      { spoken: "High BP", approved: "Hypertension", matched: true },
      { spoken: "HTN", approved: "Hypertension", matched: true },
      { spoken: "Lung Attack", approved: "COPD Exacerbation", matched: true },
    ],
    corrections: [
      { id: "c1", spoken: "lung attack", mappedTo: "COPD Exacerbation", confirmed: false },
      { id: "c2", spoken: "high BP", mappedTo: "Hypertension", confirmed: false },
    ],
  },
};

export const assessmentResults: Record<string, AssessmentResult> = {
  "cardiocare-a": {
    id: "asr-2025-05-20",
    attemptId: "att-2025-05-20",
    campaignId: "cardiocare-a",
    accuracy: 92,
    adherence: 88,
    rating: 4.6,
    readiness: "ready",
    calculatedBy: "application",
    requiresHumanReview: true,
    positives: [
      {
        id: "p1",
        kind: "positive",
        title: "Clear & Engaging Opening",
        detail: "You established a strong connection and created interest early.",
      },
      {
        id: "p2",
        kind: "positive",
        title: "Effective MM2 Handling",
        detail: "You communicated MM2 clearly with relevance and confidence.",
      },
      {
        id: "p3",
        kind: "positive",
        title: "Confident Closing",
        detail: "You closed the conversation positively and next steps were clear.",
      },
    ],
    improvements: [
      {
        id: "i1",
        kind: "improvement",
        title: "Strengthen Need Exploration",
        detail: "Ask more open-ended questions to uncover deeper customer needs.",
      },
      {
        id: "i2",
        kind: "improvement",
        title: "Reinforce Key Benefits",
        detail: "Highlight CardioCare A benefits more consistently.",
      },
      {
        id: "i3",
        kind: "improvement",
        title: "Use Stronger Call to Action",
        detail: "End with a clear ask and confirm the next step.",
      },
    ],
    coverage: [
      { id: "cv1", label: "Mandatory Messages", state: "covered" },
      { id: "cv2", label: "Input Explanation", state: "covered" },
      { id: "cv3", label: "Closing", state: "covered" },
      { id: "cv4", label: "Prohibited Claims", state: "needs_review" },
    ],
  },
};

export const progress: Progress = {
  improvementDelta: 30,
  scoreTrend: [
    { label: "Apr 29", score: 62 },
    { label: "May 6", score: 68 },
    { label: "May 13", score: 74 },
    { label: "May 20", score: 82 },
    { label: "May 27", score: 90 },
    { label: "Jun 3", score: 92 },
  ],
  readinessByCampaign: [
    { campaignId: "cardiocare-a", name: "CardioCare A", score: 98, readiness: "ready" },
    { campaignId: "neuroaid-b", name: "NeuroPlus B", score: 75, readiness: "on_track" },
    { campaignId: "metabocare-c", name: "GlucoManage C", score: 60, readiness: "needs_focus" },
    { campaignId: "respirawell-d", name: "RespiraWell D", score: 40, readiness: "needs_focus" },
  ],
  history: [
    {
      id: "h1",
      campaignId: "cardiocare-a",
      userId: currentUser.id,
      mode: "full",
      date: "20 May 2025",
      score: 90,
      rating: 4.6,
      verdict: "Great job!",
      durationSeconds: 512,
    },
    {
      id: "h2",
      campaignId: "cardiocare-a",
      userId: currentUser.id,
      mode: "guided",
      date: "13 May 2025",
      score: 82,
      rating: 4.2,
      verdict: "Good progress",
      durationSeconds: 486,
    },
    {
      id: "h3",
      campaignId: "neuroaid-b",
      userId: currentUser.id,
      mode: "full",
      date: "6 May 2025",
      score: 74,
      rating: 3.8,
      verdict: "Keep it up",
      durationSeconds: 455,
    },
    {
      id: "h4",
      campaignId: "neuroaid-b",
      userId: currentUser.id,
      mode: "guided",
      date: "29 Apr 2025",
      score: 68,
      rating: 3.6,
      verdict: "Review more",
      durationSeconds: 402,
    },
    {
      id: "h5",
      campaignId: "metabocare-c",
      userId: currentUser.id,
      mode: "guided",
      date: "22 Apr 2025",
      score: 55,
      rating: 3.2,
      verdict: "Needs work",
      durationSeconds: 388,
    },
  ],
  coachNotes: [
    "Excellent momentum! Your scores have improved consistently over the past 5 attempts.",
    "You're performing strongest on CardioCare A. Keep leveraging those strengths.",
    "Focus on GlucoManage C. Review key messages and try a practice session.",
  ],
};

export const notifications: AppNotification[] = [
  {
    id: "n1",
    kind: "campaign",
    title: "New Campaign Assigned",
    message: "CardioCare A has been assigned to you.",
    time: "Today, 08:15 AM",
    unread: true,
  },
  {
    id: "n2",
    kind: "feedback",
    title: "Feedback Ready",
    message: "New feedback is available for your last practice.",
    time: "Today, 10:48 AM",
    unread: true,
  },
  {
    id: "n3",
    kind: "practice",
    title: "Practice Due Today",
    message: "CardioCare A practice is due today.",
    time: "Today, 07:00 AM",
    unread: false,
  },
  {
    id: "n4",
    kind: "audio",
    title: "Audio Updated",
    message: "Audio for MM2 has been updated.",
    time: "Yesterday, 04:30 PM",
    unread: false,
  },
];

export const coachingActions: CoachingAction[] = [
  {
    id: "ca1",
    tmName: "Anil Kumar",
    campaignName: "CardioCare A",
    action: "Repeat practice — mandatory message 2",
    dueDate: "24 May 2025",
    status: "open",
  },
  {
    id: "ca2",
    tmName: "Priya Nair",
    campaignName: "NeuroAid B",
    action: "Coaching call — objection handling",
    dueDate: "26 May 2025",
    status: "in_progress",
  },
  {
    id: "ca3",
    tmName: "Rohit Sharma",
    campaignName: "MetaboCare C",
    action: "Review approved pitch and re-record",
    dueDate: "28 May 2025",
    status: "open",
  },
  {
    id: "ca4",
    tmName: "Sneha Iyer",
    campaignName: "CardioCare A",
    action: "Field ride-along review",
    dueDate: "18 May 2025",
    status: "done",
  },
];

/* ------------------------------------------------------------------ */
/* Monthly input calendar (communication modes per day)               */
/* ------------------------------------------------------------------ */

export type InputMode =
  | "visual_aid"
  | "scientific_literature"
  | "gift"
  | "crm_drm"
  | "digital_aid"
  | "sample";

export type CalendarInput = {
  id: string;
  campaignId: string;
  day: number;
  mode: InputMode;
  title: string;
  specialty: string;
  status: InputStatus;
};

export const INPUT_CALENDAR_MONTH = {
  label: "June 2025",
  year: 2025,
  month: 5, // 0-indexed → June
  daysInMonth: 30,
  startWeekday: 0, // Sunday
};

export const inputModeMeta: Record<InputMode, { label: string; short: string; className: string; dot: string }> = {
  visual_aid: {
    label: "Visual Aid",
    short: "VA",
    className: "border-primary/30 bg-mint/70 text-primary",
    dot: "bg-primary",
  },
  scientific_literature: {
    label: "Scientific Literature",
    short: "SL",
    className: "border-info/30 bg-info-soft text-info",
    dot: "bg-info",
  },
  gift: {
    label: "Gifts / Reminders",
    short: "GF",
    className: "border-warning/30 bg-warning/12 text-warning",
    dot: "bg-warning",
  },
  crm_drm: {
    label: "CRM / DRM",
    short: "CR",
    className: "border-ai/30 bg-ai-soft text-ai",
    dot: "bg-ai",
  },
  digital_aid: {
    label: "Digital Aid",
    short: "DA",
    className: "border-navy/20 bg-navy-soft text-navy",
    dot: "bg-navy",
  },
  sample: {
    label: "Samples",
    short: "SM",
    className: "border-success/30 bg-success/12 text-success",
    dot: "bg-success",
  },
};

export const inputCalendar: CalendarInput[] = [
  { id: "c01", campaignId: "cardiocare-a", day: 2, mode: "visual_aid", title: "AHA Guideline Update", specialty: "Cardiologist", status: "completed" },
  { id: "c02", campaignId: "cardiocare-a", day: 3, mode: "crm_drm", title: "CRM call plan sync", specialty: "Cardiologist", status: "completed" },
  { id: "c03", campaignId: "cardiocare-a", day: 5, mode: "scientific_literature", title: "SPRINT trial reprint", specialty: "Cardiologist", status: "completed" },
  { id: "c04", campaignId: "cardiocare-a", day: 9, mode: "gift", title: "BP diary pad", specialty: "Cardiologist", status: "pending" },
  { id: "c05", campaignId: "cardiocare-a", day: 11, mode: "digital_aid", title: "Interactive dosing aid", specialty: "Cardiologist", status: "pending" },
  { id: "c06", campaignId: "cardiocare-a", day: 12, mode: "sample", title: "CardioCare A 5mg samples", specialty: "Physician", status: "pending" },
  { id: "c07", campaignId: "cardiocare-a", day: 16, mode: "visual_aid", title: "Patient selection flip chart", specialty: "Physician", status: "pending" },
  { id: "c08", campaignId: "cardiocare-a", day: 18, mode: "scientific_literature", title: "Real-world evidence summary", specialty: "Cardiologist", status: "not_started" },
  { id: "c09", campaignId: "cardiocare-a", day: 19, mode: "crm_drm", title: "DRM e-detail follow-up", specialty: "Cardiologist", status: "not_started" },
  { id: "c10", campaignId: "cardiocare-a", day: 23, mode: "gift", title: "Clinic reminder kit", specialty: "Physician", status: "not_started" },
  { id: "c11", campaignId: "cardiocare-a", day: 25, mode: "digital_aid", title: "Adherence support module", specialty: "Cardiologist", status: "not_started" },
  { id: "c12", campaignId: "cardiocare-a", day: 27, mode: "visual_aid", title: "Objection handling leaflet", specialty: "Physician", status: "not_started" },
  { id: "c13", campaignId: "neuroaid-b", day: 4, mode: "visual_aid", title: "Migraine Care Pathways", specialty: "Neurologist", status: "completed" },
  { id: "c14", campaignId: "neuroaid-b", day: 6, mode: "scientific_literature", title: "Preventive therapy meta-analysis", specialty: "Neurologist", status: "pending" },
  { id: "c15", campaignId: "neuroaid-b", day: 10, mode: "crm_drm", title: "CRM segment refresh", specialty: "Neurologist", status: "pending" },
  { id: "c16", campaignId: "neuroaid-b", day: 13, mode: "gift", title: "Headache tracker pad", specialty: "Neurologist", status: "pending" },
  { id: "c17", campaignId: "neuroaid-b", day: 17, mode: "digital_aid", title: "Titration digital aid", specialty: "Neurologist", status: "not_started" },
  { id: "c18", campaignId: "neuroaid-b", day: 20, mode: "sample", title: "NeuroAid B starter pack", specialty: "Physician", status: "not_started" },
  { id: "c19", campaignId: "neuroaid-b", day: 24, mode: "visual_aid", title: "Patient journey visual", specialty: "Neurologist", status: "not_started" },
  { id: "c20", campaignId: "neuroaid-b", day: 26, mode: "crm_drm", title: "DRM email approval", specialty: "Neurologist", status: "not_started" },
  { id: "c21", campaignId: "metabocare-c", day: 3, mode: "visual_aid", title: "GLP-1 Patient Support", specialty: "Endocrinologist", status: "pending" },
  { id: "c22", campaignId: "metabocare-c", day: 9, mode: "scientific_literature", title: "HbA1c outcomes reprint", specialty: "Endocrinologist", status: "not_started" },
  { id: "c23", campaignId: "metabocare-c", day: 12, mode: "crm_drm", title: "CRM coverage plan", specialty: "Endocrinologist", status: "not_started" },
  { id: "c24", campaignId: "metabocare-c", day: 18, mode: "gift", title: "Diet chart booklet", specialty: "Physician", status: "not_started" },
  { id: "c25", campaignId: "metabocare-c", day: 22, mode: "digital_aid", title: "Injection technique aid", specialty: "Endocrinologist", status: "not_started" },
  { id: "c26", campaignId: "metabocare-c", day: 28, mode: "sample", title: "MetaboCare C samples", specialty: "Physician", status: "not_started" },
];
