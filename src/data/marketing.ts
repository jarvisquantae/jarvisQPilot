/**
 * Mock fixtures for the Marketing Manager console.
 * Frontend-only: replace with service calls when the backend lands.
 */

export const MM_USER = {
  roleLabel: "Marketing Manager",
  initials: "MM",
  email: "marketing.manager@quantae.ai",
};

export const MM_FILTER_OPTIONS = {
  quarter: ["Q2 2025 (Apr – Jun)", "Q1 2025 (Jan – Mar)", "Q3 2025 (Jul – Sep)"],
  campaign: ["All Campaigns", "NEUROPLUS Launch", "CARDIOCARE Q2", "RESPIRA Max", "DIABETA Care"],
  product: ["All Products", "NEUROPLUS", "CARDIOCARE", "RESPIRA Max", "DIABETA Care"],
  specialty: ["All Specialties", "Cardiology", "Neurology", "Pulmonology", "Endocrinology"],
  salesManager: ["All Sales Managers", "Vikram Joshi", "Sneha Iyer", "Anita Rao"],
  tm: ["All TMs", "Arjun Mehta", "Priya Nair", "Rahul Sharma", "Sneha Iyer", "Karan Malhotra"],
  status: ["All Statuses", "Active", "Draft", "Pending", "Archived"],
};

export const MM_DASHBOARD_STATS = [
  { label: "Active Campaigns", value: 12, delta: "+2", deltaLabel: " vs Q1 2025", tone: "teal" as const },
  { label: "Published Pitches", value: 34, delta: "+6", deltaLabel: " vs Q1 2025", tone: "info" as const },
  { label: "TMs Practicing", value: 156, note: "of 200 assigned", tone: "success" as const },
  { label: "Avg Accuracy", value: "78", suffix: "%", delta: "+5", deltaLabel: " pp vs Q1 2025", tone: "ai" as const },
];

export const MM_CAMPAIGN_PROGRESS = [
  { campaign: "NEUROPLUS Launch", product: "NEUROPLUS", tms: 48, practices: 214, accuracy: 81, readiness: 74, status: "Active" },
  { campaign: "CARDIOCARE Q2", product: "CARDIOCARE", tms: 52, practices: 268, accuracy: 76, readiness: 69, status: "Active" },
  { campaign: "RESPIRA Max", product: "RESPIRA Max", tms: 36, practices: 152, accuracy: 72, readiness: 61, status: "Active" },
  { campaign: "DIABETA Care", product: "DIABETA Care", tms: 44, practices: 186, accuracy: 79, readiness: 71, status: "Active" },
  { campaign: "ONCOSHIELD Pilot", product: "ONCOSHIELD", tms: 20, practices: 42, accuracy: 64, readiness: 38, status: "Draft" },
];

export const MM_BRAND_CAMPAIGNS = [
  { name: "CARDIOCARE", tagline: "Control today for a healthier tomorrow", campaigns: 6, progress: 67, tone: "teal" as const },
  { name: "NEUROPLUS", tagline: "Clearer thinking. Better living.", campaigns: 4, progress: 50, tone: "info" as const },
  { name: "DIABETA Care", tagline: "For a healthier tomorrow", campaigns: 5, progress: 83, tone: "success" as const },
  { name: "RESPIRA Max", tagline: "Breathe easier. Live fuller.", campaigns: 3, progress: 40, tone: "ai" as const },
];

export const MM_CAMPAIGN_INPUT_PLAN = [
  { month: "Apr", visit: "Visit 1", name: "Disease Awareness Visual Aid", type: "Visual Aid", focus: "Disease burden and need for control", status: "Published" },
  { month: "Apr", visit: "Visit 2", name: "Scientific LBL – Series 1", type: "Scientific LBL", focus: "Efficacy and safety data", status: "Published" },
  { month: "May", visit: "Visit 1", name: "Patient Journey Flipbook", type: "Leave Behind", focus: "Patient journey and adherence", status: "In Progress" },
  { month: "May", visit: "Visit 2", name: "Differentiation vs Competitors", type: "Detailing Aid", focus: "Why CARDIOCARE?", status: "Not Started" },
  { month: "Jun", visit: "Visit 1", name: "Guidelines Update", type: "Scientific LBL", focus: "Latest guidelines and positioning", status: "Published" },
  { month: "Jun", visit: "Visit 2", name: "Closing & Next Steps", type: "Reminder Card", focus: "Drive prescription", status: "Not Started" },
];

export const MM_TREND = {
  labels: ["Q1 W2", "Q1 W6", "Q1 W10", "Q2 W2", "Q2 W6", "Q2 W10"],
  series: [
    { name: "Accuracy", points: [68, 70, 73, 74, 77, 78], tone: "teal" as const },
    { name: "Adherence", points: [72, 74, 75, 78, 80, 81], tone: "success" as const },
  ],
};

export const MM_READINESS_SPLIT = [
  { label: "Ready", value: 112, tone: "success" as const },
  { label: "In Progress", value: 48, tone: "warning" as const },
  { label: "At Risk", value: 44, tone: "danger" as const },
];

export const MM_PENDING_ACTIONS = [
  { title: "Pitch awaiting approval", detail: "RESPIRA Max — submitted by Priya Nair", tone: "warning" as const },
  { title: "Audio not published", detail: "DIABETA Care detailing audio in draft", tone: "info" as const },
  { title: "Vocabulary review", detail: "32 terms pending review", tone: "ai" as const },
  { title: "Low score alert", detail: "5 TMs below 60% accuracy", tone: "danger" as const },
];

export const MM_PRODUCTS = [
  { name: "CARDIOCARE", molecule: "Telmisartan 40mg", specialty: "Cardiology", campaigns: 3, pitches: 8, vocab: 96, status: "Active" },
  { name: "NEUROPLUS", molecule: "Pregabalin 75mg", specialty: "Neurology", campaigns: 2, pitches: 6, vocab: 74, status: "Active" },
  { name: "RESPIRA Max", molecule: "Formoterol / Budesonide", specialty: "Pulmonology", campaigns: 2, pitches: 5, vocab: 68, status: "Active" },
  { name: "DIABETA Care", molecule: "Dapagliflozin 10mg", specialty: "Endocrinology", campaigns: 3, pitches: 7, vocab: 88, status: "Active" },
  { name: "ONCOSHIELD", molecule: "Capecitabine 500mg", specialty: "Oncology", campaigns: 1, pitches: 2, vocab: 42, status: "Draft" },
  { name: "GASTROLIFE", molecule: "Rabeprazole 20mg", specialty: "Gastroenterology", campaigns: 1, pitches: 4, vocab: 36, status: "Archived" },
];

export const MM_CAMPAIGN_SETUP_STEPS = [
  "Campaign Details",
  "Products & Specialty",
  "Inputs",
  "Pitch & Audio",
  "Assign TMs",
];

export const MM_INPUTS = [
  { name: "Clinical Trial Summary", type: "Document", product: "CARDIOCARE", uploadedBy: "Priya Nair", date: "Jun 12, 2025", size: "2.4 MB", status: "Processed" },
  { name: "Key Messages Deck", type: "Presentation", product: "CARDIOCARE", uploadedBy: "Priya Nair", date: "Jun 12, 2025", size: "8.1 MB", status: "Processed" },
  { name: "Competitor Comparison", type: "Spreadsheet", product: "NEUROPLUS", uploadedBy: "Vikram Joshi", date: "Jun 11, 2025", size: "640 KB", status: "Processing" },
  { name: "Prescribing Information", type: "Document", product: "RESPIRA Max", uploadedBy: "Sneha Iyer", date: "Jun 10, 2025", size: "1.2 MB", status: "Processed" },
  { name: "Objection Handling Notes", type: "Document", product: "DIABETA Care", uploadedBy: "Rahul Sharma", date: "Jun 09, 2025", size: "420 KB", status: "Needs Review" },
];

export const MM_PITCHES = [
  { name: "CARDIOCARE Q2 Detailing Pitch", campaign: "CARDIOCARE Q2", product: "CARDIOCARE", version: "v3", updatedBy: "Priya Nair", updated: "Jun 12, 2025", status: "Published" },
  { name: "NEUROPLUS Launch Pitch", campaign: "NEUROPLUS Launch", product: "NEUROPLUS", version: "v2", updatedBy: "Vikram Joshi", updated: "Jun 11, 2025", status: "Published" },
  { name: "RESPIRA Max Core Pitch", campaign: "RESPIRA Max", product: "RESPIRA Max", version: "v1", updatedBy: "Sneha Iyer", updated: "Jun 10, 2025", status: "Pending Approval" },
  { name: "DIABETA Care Follow-up Pitch", campaign: "DIABETA Care", product: "DIABETA Care", version: "v4", updatedBy: "Rahul Sharma", updated: "Jun 09, 2025", status: "Draft" },
];

export const MM_PITCH_SECTIONS = [
  { title: "Opening", body: "Good morning Doctor, thank you for the time. I would like to share the latest Q2 data on CARDIOCARE for your hypertensive patients." },
  { title: "Key Message 1", body: "CARDIOCARE Q2 is indicated for adults with hypertension and demonstrates superior BP reduction versus the leading ARB." },
  { title: "Key Message 2", body: "Once-daily dosing improves patient adherence, with 24-hour ambulatory BP control shown across the trial population." },
  { title: "Objection Handling", body: "If cost is raised, position the patient support programme and the reduced need for add-on therapy." },
  { title: "Closing", body: "Doctor, may I request you to consider CARDIOCARE for your next five hypertensive patients?" },
];

export const MM_CALENDAR_ACTIVITIES: Record<number, { campaign: string; activity: string }> = {
  1: { campaign: "NEUROPLUS Launch", activity: "Detailing" },
  2: { campaign: "CARDIOCARE Q2", activity: "E-detailing" },
  5: { campaign: "RESPIRA Max", activity: "Sampling" },
  6: { campaign: "NEUROPLUS Launch", activity: "Detailing" },
  7: { campaign: "DIABETA Care", activity: "Reminder Call" },
  8: { campaign: "NEUROPLUS Launch", activity: "E-detailing" },
  9: { campaign: "CARDIOCARE Q2", activity: "Detailing" },
  12: { campaign: "RESPIRA Max", activity: "Detailing" },
  13: { campaign: "NEUROPLUS Launch", activity: "Detailing" },
  14: { campaign: "DIABETA Care", activity: "Follow-up" },
  15: { campaign: "NEUROPLUS Launch", activity: "Sampling" },
  16: { campaign: "CARDIOCARE Q2", activity: "E-detailing" },
  19: { campaign: "RESPIRA Max", activity: "Reminder Call" },
  20: { campaign: "NEUROPLUS Launch", activity: "Detailing" },
  21: { campaign: "DIABETA Care", activity: "Detailing" },
  22: { campaign: "NEUROPLUS Launch", activity: "E-detailing" },
  23: { campaign: "CARDIOCARE Q2", activity: "Detailing" },
  26: { campaign: "RESPIRA Max", activity: "Detailing" },
  27: { campaign: "NEUROPLUS Launch", activity: "Detailing" },
  28: { campaign: "DIABETA Care", activity: "Follow-up" },
  29: { campaign: "NEUROPLUS Launch", activity: "Sampling" },
  30: { campaign: "CARDIOCARE Q2", activity: "Reminder Call" },
};

export const MM_TM_ASSIGNMENTS = [
  { tm: "Arjun Mehta", sm: "Vikram Joshi", campaign: "NEUROPLUS Launch", product: "NEUROPLUS", due: "May 21, 2025", practice: "Neurology Clinics", status: "Assigned" },
  { tm: "Priya Nair", sm: "Sneha Iyer", campaign: "CARDIOCARE Q2", product: "CARDIOCARE", due: "May 23, 2025", practice: "Cardiology Clinics", status: "Assigned" },
  { tm: "Rahul Sharma", sm: "Vikram Joshi", campaign: "RESPIRA Max", product: "RESPIRA Max", due: "May 19, 2025", practice: "Pulmonology Clinics", status: "In Progress" },
  { tm: "Sneha Iyer", sm: "Sneha Iyer", campaign: "DIABETA Care", product: "DIABETA Care", due: "May 21, 2025", practice: "Diabetology Clinics", status: "Assigned" },
  { tm: "Karan Malhotra", sm: "Vikram Joshi", campaign: "NEUROPLUS Launch", product: "NEUROPLUS", due: "May 22, 2025", practice: "Neurology Clinics", status: "Not Started" },
];

export const MM_RUBRIC = {
  mandatory: [
    "CARDIOCARE Q2 is indicated for adults with hypertension",
    "Demonstrates superior BP reduction vs leading ARB",
    "Once-daily dosing improves patient adherence",
  ],
  optional: ["Discuss lifestyle modifications", "Mention renal protection benefits"],
  prohibited: ["Do not claim CV event reduction", "Do not compare to specific brands by name"],
  weights: [
    { category: "Accuracy", weight: 40 },
    { category: "Adherence", weight: 30 },
    { category: "Input Explanation", weight: 20 },
    { category: "Closing", weight: 10 },
  ],
  file: {
    name: "CARDIOCARE_Q2_Detailing_Audio.mp3",
    type: "MP3",
    duration: "03:42",
    uploadedBy: "Priya Nair",
    uploadDate: "Jun 12, 2025",
  },
};

export const MM_AUDIO_LIBRARY = [
  { pitch: "CARDIOCARE Q2 Detailing Pitch", campaign: "CARDIOCARE Q2", duration: "03:42", rubric: "Complete", updated: "Jun 12, 2025", status: "Published" },
  { pitch: "NEUROPLUS Launch Pitch", campaign: "NEUROPLUS Launch", duration: "04:10", rubric: "Complete", updated: "Jun 11, 2025", status: "Published" },
  { pitch: "RESPIRA Max Core Pitch", campaign: "RESPIRA Max", duration: "03:05", rubric: "Incomplete", updated: "Jun 10, 2025", status: "Draft" },
  { pitch: "DIABETA Care Follow-up Pitch", campaign: "DIABETA Care", duration: "02:48", rubric: "Complete", updated: "Jun 09, 2025", status: "Draft" },
];

export const MM_VOCAB_STATS = [
  { label: "Active Terms", value: 428, delta: "+18", deltaLabel: " vs Q1 2025", tone: "teal" as const },
  { label: "Brands Covered", value: 24, delta: "+3", deltaLabel: " vs Q1 2025", tone: "info" as const },
  { label: "Pending Review", value: 32, delta: "+7", deltaLabel: " vs Q1 2025", tone: "warning" as const },
  { label: "Deprecated Terms", value: 15, delta: "-2", deltaLabel: " vs Q1 2025", tone: "danger" as const },
];

export const MM_VOCAB = [
  { tag: "HTN", term: "Hypertension", brand: "CARDIOCARE", product: "Cardiocare 10", specialty: "Cardiology", type: "Abbreviation", acceptable: "Yes", status: "Active" },
  { tag: "High BP", term: "Hypertension", brand: "CARDIOCARE", product: "Cardiocare 10", specialty: "Cardiology", type: "Lay Term", acceptable: "Yes", status: "Active" },
  { tag: "Elevated BP", term: "Hypertension", brand: "CARDIOCARE", product: "Cardiocare 10", specialty: "Cardiology", type: "Lay Term", acceptable: "Yes", status: "Active" },
  { tag: "HT", term: "Hypertension", brand: "CARDIOCARE", product: "Cardiocare 10", specialty: "Cardiology", type: "Abbreviation", acceptable: "Yes", status: "Active" },
  { tag: "Lung Attack", term: "COPD Exacerbation", brand: "RESPIRA", product: "Respira Max", specialty: "Pulmonology", type: "Lay Term", acceptable: "No", status: "Active" },
  { tag: "COPD Flare", term: "COPD Exacerbation", brand: "RESPIRA", product: "Respira Max", specialty: "Pulmonology", type: "Lay Term", acceptable: "Yes", status: "Active" },
  { tag: "Heart Failure", term: "Heart Failure", brand: "CARDIOCARE", product: "Cardiocare 10", specialty: "Cardiology", type: "Standard Term", acceptable: "Yes", status: "Active" },
  { tag: "CHF", term: "Heart Failure", brand: "CARDIOCARE", product: "Cardiocare 10", specialty: "Cardiology", type: "Abbreviation", acceptable: "Yes", status: "Active" },
  { tag: "MI", term: "Myocardial Infarction", brand: "CARDIOCARE", product: "Cardiocare 10", specialty: "Cardiology", type: "Abbreviation", acceptable: "Yes", status: "Active" },
  { tag: "Acute MI", term: "Myocardial Infarction", brand: "CARDIOCARE", product: "Cardiocare 10", specialty: "Cardiology", type: "Lay Term", acceptable: "Yes", status: "Pending" },
  { tag: "DM", term: "Diabetes Mellitus", brand: "DIABETA", product: "DIABETA Care", specialty: "Endocrinology", type: "Abbreviation", acceptable: "Yes", status: "Active" },
  { tag: "Sugar Disease", term: "Diabetes Mellitus", brand: "DIABETA", product: "DIABETA Care", specialty: "Endocrinology", type: "Lay Term", acceptable: "No", status: "Deprecated" },
];

export const MM_PERFORMANCE_STATS = [
  { label: "Average Accuracy", value: "78", suffix: "%", delta: "+5", deltaLabel: " pp vs Q1 2025", tone: "teal" as const },
  { label: "Average Adherence", value: "81", suffix: "%", delta: "+4", deltaLabel: " pp vs Q1 2025", tone: "success" as const },
  { label: "Ready TMs", value: 112, note: "72% of total", tone: "info" as const },
  { label: "Review Required", value: 44, note: "28% of total", tone: "warning" as const },
];

export const MM_TM_PERFORMANCE = [
  { tm: "Arjun Mehta", campaign: "NEUROPLUS Launch", accuracy: 48, adherence: 56, rating: 1, readiness: "At Risk", last: "Jun 14, 2025", action: "Assign Guided Practice" },
  { tm: "Priya Nair", campaign: "CARDIOCARE Q2", accuracy: 55, adherence: 63, rating: 2, readiness: "At Risk", last: "Jun 15, 2025", action: "Repeat Practice" },
  { tm: "Rahul Sharma", campaign: "DIABETA Care", accuracy: 58, adherence: 64, rating: 2, readiness: "At Risk", last: "Jun 13, 2025", action: "Coach" },
  { tm: "Sneha Iyer", campaign: "RESPIRA Max", accuracy: 61, adherence: 67, rating: 3, readiness: "In Progress", last: "Jun 15, 2025", action: "Assign Guided Practice" },
  { tm: "Vikram Joshi", campaign: "NEUROPLUS Launch", accuracy: 62, adherence: 70, rating: 3, readiness: "In Progress", last: "Jun 14, 2025", action: "Review" },
  { tm: "Karan Malhotra", campaign: "CARDIOCARE Q2", accuracy: 72, adherence: 79, rating: 4, readiness: "Ready", last: "Jun 16, 2025", action: "Review" },
  { tm: "Meera Patel", campaign: "RESPIRA Max", accuracy: 80, adherence: 85, rating: 4, readiness: "Ready", last: "Jun 16, 2025", action: "Review" },
  { tm: "Ankit Verma", campaign: "DIABETA Care", accuracy: 85, adherence: 88, rating: 5, readiness: "Ready", last: "Jun 16, 2025", action: "Review" },
];

export const MM_ACTION_GUIDE = [
  { label: "At Risk", tone: "danger" as const, rule: "Accuracy < 60% or Adherence < 70%", action: "Assign Guided Practice or Coach" },
  { label: "In Progress", tone: "warning" as const, rule: "Accuracy 60%–74% or Adherence 70%–84%", action: "Review or Assign Practice" },
  { label: "Ready", tone: "success" as const, rule: "Accuracy ≥ 75% and Adherence ≥ 85%", action: "Reinforce & Advance" },
];

export const MM_REPORTS = [
  { name: "Campaign Performance Summary", scope: "All Campaigns", updated: "Jun 16, 2025 10:15 AM", format: "PDF" },
  { name: "TM Readiness Overview", scope: "All TMs", updated: "Jun 16, 2025 9:40 AM", format: "PDF" },
  { name: "Product Performance Report", scope: "All Products", updated: "Jun 15, 2025 4:30 PM", format: "Excel" },
  { name: "Pitch Performance Report", scope: "All Campaigns", updated: "Jun 15, 2025 11:20 AM", format: "Excel" },
  { name: "Vocabulary Usage Report", scope: "All Campaigns", updated: "Jun 14, 2025 3:05 PM", format: "PDF" },
  { name: "Adherence & Accuracy Report", scope: "All TMs", updated: "Jun 14, 2025 9:10 AM", format: "PDF" },
  { name: "TM Activity Report", scope: "All TMs", updated: "Jun 13, 2025 6:45 PM", format: "Excel" },
  { name: "Action Items Report", scope: "All Campaigns", updated: "Jun 13, 2025 2:30 PM", format: "Excel" },
];

export const MM_NOTIFICATIONS = [
  { title: "Pitch published", detail: "Pitch: CARDIOCARE Q2", time: "10:15 AM", tone: "success" as const },
  { title: "Vocabulary updated", detail: "Added 12 new terms to 'Heart Failure'", time: "9:45 AM", tone: "info" as const },
  { title: "Low score alert", detail: "5 TMs have accuracy below 60%", time: "9:20 AM", tone: "warning" as const },
  { title: "Action assigned", detail: "Action assigned to Priya Nair", time: "8:50 AM", tone: "ai" as const },
];

export const MM_AUDIT_TRAIL = [
  { by: "Priya Nair", module: "Pitch Library", event: "Pitch Published", at: "Jun 16, 2025 10:15 AM" },
  { by: "Vikram Joshi", module: "Vocabulary Bank", event: "Vocabulary Updated", at: "Jun 16, 2025 9:45 AM" },
  { by: "Rahul Sharma", module: "Performance", event: "Score Alert Triggered", at: "Jun 16, 2025 9:20 AM" },
  { by: "Sneha Iyer", module: "Inputs", event: "Action Assigned", at: "Jun 16, 2025 8:50 AM" },
  { by: "Arjun Mehta", module: "Campaigns", event: "Campaign Updated", at: "Jun 15, 2025 4:10 PM" },
];

/* ---------- Module 5: Pitch upload & AI extraction ---------- */

export const MM_PITCH_UPLOADS = [
  { file: "CARDIOCARE_Q2_Pitch_Final.pdf", size: "2.4 MB", campaign: "CARDIOCARE Q2", uploaded: "Jun 12, 2025 10:02 AM", by: "Priya Nair", state: "Extracted", confidence: 94 },
  { file: "NEUROPLUS_Launch_Deck.pptx", size: "8.1 MB", campaign: "NEUROPLUS Launch", uploaded: "Jun 11, 2025 4:35 PM", by: "Vikram Joshi", state: "Extracted", confidence: 88 },
  { file: "RESPIRA_Max_Core_Pitch.docx", size: "640 KB", campaign: "RESPIRA Max", uploaded: "Jun 10, 2025 11:12 AM", by: "Sneha Iyer", state: "Processing", confidence: 0 },
  { file: "DIABETA_Care_Followup.txt", size: "38 KB", campaign: "DIABETA Care", uploaded: "Jun 09, 2025 9:20 AM", by: "Rahul Sharma", state: "Failed", confidence: 0 },
];

export const MM_EXTRACTED_SECTIONS = [
  { section: "Opening", body: "Good morning Doctor, thank you for the time. I would like to share the latest Q2 data on CARDIOCARE for your hypertensive patients.", source: "Page 2, Slide title block", confidence: 96, state: "Accepted" },
  { section: "Need Statement", body: "Nearly 1 in 3 adults in your practice remain uncontrolled on current antihypertensive therapy.", source: "Page 3, paragraph 1", confidence: 91, state: "Accepted" },
  { section: "Core Message", body: "CARDIOCARE Q2 delivers superior BP reduction versus the leading ARB with once-daily dosing.", source: "Page 4, bullet 2", confidence: 93, state: "Pending" },
  { section: "Input Explanation", body: "Use the BP control leave-behind to walk the doctor through the 24-hour ambulatory profile.", source: "Page 6, callout", confidence: 82, state: "Pending" },
  { section: "Objection Handling", body: "If cost is raised, position the patient support programme and the reduced need for add-on therapy.", source: "Page 8, Q&A table", confidence: 76, state: "Edited" },
  { section: "Prohibited Statements", body: "Do not claim cardiovascular event reduction or name competitor brands.", source: "Page 10, compliance note", confidence: 98, state: "Accepted" },
];

/* ---------- Module 8: TM & team assignment ---------- */

export const MM_ASSIGNMENT_BUNDLE = [
  { label: "Campaign", value: "CARDIOCARE Q2 (Apr – Jun 2025)" },
  { label: "Pitch Version", value: "v3 · Published Jun 12, 2025" },
  { label: "Promotional Inputs", value: "3 inputs mapped" },
  { label: "Detailing Audio", value: "CARDIOCARE_Q2_Detailing_Audio.mp3 · 03:42" },
  { label: "Assessment Rubric", value: "Cardiology rubric v2" },
  { label: "Vocabulary Version", value: "Cardiology vocabulary v5" },
  { label: "Practice Requirement", value: "2 guided + 1 full practice" },
  { label: "Readiness Deadline", value: "Jun 28, 2025" },
];

export const MM_ASSIGNMENT_SCOPE = [
  { scope: "North Region", target: "4 HQs · 38 TMs", state: "Included" },
  { scope: "West Region", target: "3 HQs · 29 TMs", state: "Included" },
  { scope: "SM Team — Vikram Joshi", target: "12 TMs", state: "Included" },
  { scope: "SM Team — Sneha Iyer", target: "9 TMs", state: "Included" },
  { scope: "South Region", target: "5 HQs · 41 TMs", state: "Excluded" },
];

export const MM_ASSIGNMENT_ISSUES = [
  { severity: "Blocking", detail: "6 TMs in East HQ have no published pitch version for CARDIOCARE Q2.", fix: "Publish pitch v3 to East HQ" },
  { severity: "Warning", detail: "4 TMs already have 3 open practice assignments this week.", fix: "Shift readiness deadline by 3 days" },
  { severity: "Warning", detail: "Vocabulary version v5 is not yet published for Endocrinology.", fix: "Publish vocabulary v5" },
];

/* ---------- Module 12: Vocabulary import, review & versioning ---------- */

export const MM_VOCAB_REVIEW_QUEUE = [
  { heard: "Lung attack", suggestion: "COPD Exacerbation", brand: "RESPIRA", occurrences: 14, confidence: 91, source: "AI suggested" },
  { heard: "Sugar problem", suggestion: "Diabetes Mellitus", brand: "DIABETA", occurrences: 11, confidence: 88, source: "AI suggested" },
  { heard: "Heart weakness", suggestion: "Heart Failure", brand: "CARDIOCARE", occurrences: 9, confidence: 84, source: "AI suggested" },
  { heard: "BP high hai", suggestion: "Hypertension", brand: "CARDIOCARE", occurrences: 7, confidence: 79, source: "AI suggested" },
  { heard: "Nerve pain tablet", suggestion: "Neuropathic Pain", brand: "NEUROPLUS", occurrences: 5, confidence: 68, source: "Unmatched" },
];

export const MM_VOCAB_VERSIONS = [
  { version: "v5", specialty: "Cardiology", terms: 168, effective: "Jun 12, 2025", status: "Published", by: "Priya Nair" },
  { version: "v4", specialty: "Pulmonology", terms: 94, effective: "Jun 05, 2025", status: "Published", by: "Sneha Iyer" },
  { version: "v3", specialty: "Endocrinology", terms: 88, effective: "Jul 01, 2025", status: "Review", by: "Rahul Sharma" },
  { version: "v2", specialty: "Neurology", terms: 78, effective: "—", status: "Draft", by: "Vikram Joshi" },
  { version: "v1", specialty: "Cardiology", terms: 121, effective: "Jan 08, 2025", status: "Deprecated", by: "Priya Nair" },
];

/* ---------- Module 13: Campaign publication ---------- */

export const MM_PUBLISH_CHECKLIST = [
  { item: "Campaign details & deadlines", detail: "CARDIOCARE Q2 · Apr 01 – Jun 30, 2025", state: "Ready" },
  { item: "Approved pitch version", detail: "v3 · Approval ref MED/2025/0412", state: "Ready" },
  { item: "Promotional inputs", detail: "3 inputs with mandatory explanation", state: "Ready" },
  { item: "Detailing audio", detail: "Generated from published pitch v3", state: "Ready" },
  { item: "Assessment rubric", detail: "Weights total 100%, 3 critical errors defined", state: "Ready" },
  { item: "Vocabulary version", detail: "Cardiology v5 published", state: "Ready" },
  { item: "Distribution calendar", detail: "21 scheduled activities", state: "Ready" },
  { item: "TM & team assignment", detail: "67 TMs · 1 blocking issue", state: "Attention" },
];

export const MM_PUBLISH_HISTORY = [
  { campaign: "NEUROPLUS Launch", version: "v2", action: "Published", by: "Vikram Joshi", at: "Jun 11, 2025 4:52 PM" },
  { campaign: "RESPIRA Max", version: "v1", action: "Withdrawn", by: "Sneha Iyer", at: "Jun 08, 2025 12:10 PM" },
  { campaign: "DIABETA Care", version: "v3", action: "Revised", by: "Rahul Sharma", at: "Jun 02, 2025 10:35 AM" },
  { campaign: "CARDIOCARE Q1", version: "v6", action: "Archived", by: "Priya Nair", at: "Apr 01, 2025 9:00 AM" },
];

/* ---------- Module 15: Saved views ---------- */

export const MM_SAVED_VIEWS = [
  { name: "At-risk cardiology TMs", detail: "Q2 · Cardiology · Accuracy < 60%" },
  { name: "NEUROPLUS launch readiness", detail: "Q2 · NEUROPLUS · Readiness ≠ Ready" },
  { name: "Critical claims this month", detail: "Jun 2025 · Critical error = Yes" },
  { name: "West region overview", detail: "Q2 · West · All brands" },
];

/* ---------- Module 16: Marketing copilot ---------- */

export const MM_COPILOT_SUGGESTED_PROMPTS = [
  "Explain why adherence dropped for RESPIRA Max this quarter",
  "Summarise the most commonly missed concepts across cardiology",
  "Which brands have the lowest message adherence right now?",
  "What support actions could lift at-risk TMs in West region?",
];

export const MM_COPILOT_THREAD = [
  {
    role: "user" as const,
    body: "Which brands have the lowest message adherence this quarter?",
  },
  {
    role: "assistant" as const,
    body: "Across the current filter (Q2 2025 · all regions), RESPIRA Max has the lowest adherence at 67%, followed by NEUROPLUS at 71%. Both sit below the 85% readiness threshold defined in their rubrics.",
    evidence: [
      "RESPIRA Max: 412 attempts, adherence 67%, mandatory concept 'exacerbation reduction' missed in 38% of attempts",
      "NEUROPLUS: 388 attempts, adherence 71%, opening skipped in 24% of attempts",
    ],
    actions: [
      "Concept-specific practice on 'exacerbation reduction' for 22 RESPIRA TMs",
      "Guided practice on opening for 14 NEUROPLUS TMs",
    ],
  },
];

export const MM_MISSED_CONCEPTS = [
  { label: "Exacerbation reduction", value: 38 },
  { label: "Once-daily dosing", value: 31 },
  { label: "Input explanation", value: 27 },
  { label: "Renal safety profile", value: 19 },
  { label: "Closing commitment", value: 14 },
];

/* ---------- Module 17: Performance action management ---------- */

export const MM_ACTION_STATS = [
  { label: "Open Actions", value: 46, delta: "+8", deltaLabel: " vs last month", tone: "warning" as const },
  { label: "In Progress", value: 21, note: "46% of open", tone: "info" as const },
  { label: "Completed", value: 132, delta: "+24", deltaLabel: " vs last month", tone: "success" as const },
  { label: "Overdue", value: 7, note: "Escalate to SM", tone: "danger" as const },
];

export const MM_ACTIONS = [
  { id: "ACT-1042", assignee: "Arjun Mehta", type: "Guided Practice", brand: "NEUROPLUS", reason: "Accuracy 48% · opening skipped", due: "Jun 20, 2025", status: "In Progress", outcome: "—" },
  { id: "ACT-1041", assignee: "Priya Nair", type: "Concept Practice", brand: "CARDIOCARE", reason: "Missed once-daily dosing", due: "Jun 19, 2025", status: "Open", outcome: "—" },
  { id: "ACT-1038", assignee: "Rahul Sharma", type: "Coaching", brand: "DIABETA Care", reason: "Adherence 64% for 2 quarters", due: "Jun 18, 2025", status: "Overdue", outcome: "—" },
  { id: "ACT-1035", assignee: "Sneha Iyer", type: "Full Practice", brand: "RESPIRA Max", reason: "Readiness not achieved", due: "Jun 22, 2025", status: "In Progress", outcome: "—" },
  { id: "ACT-1030", assignee: "Karan Malhotra", type: "Reminder", brand: "CARDIOCARE", reason: "Practice not attempted", due: "Jun 15, 2025", status: "Completed", outcome: "Accuracy 72% (+14)" },
  { id: "ACT-1026", assignee: "Meera Patel", type: "Manager Review", brand: "RESPIRA Max", reason: "Critical claim flagged", due: "Jun 14, 2025", status: "Completed", outcome: "Claim corrected" },
];

export const MM_ACTION_TYPES = [
  "Reminder",
  "Guided Practice",
  "Full Practice",
  "Concept-specific Practice",
  "Coaching",
  "Manager Review",
];

/* ---------- Module 19/20: Notifications & audit ---------- */

export const MM_NOTIFICATION_FEED = [
  { title: "Pitch processed", detail: "CARDIOCARE_Q2_Pitch_Final.pdf extracted with 94% confidence", time: "10:15 AM", type: "Pitch", tone: "success" as const, unread: true },
  { title: "Pitch extraction failed", detail: "DIABETA_Care_Followup.txt could not be structured — re-upload required", time: "9:58 AM", type: "Pitch", tone: "danger" as const, unread: true },
  { title: "Vocabulary review pending", detail: "5 unmatched terms waiting for Marketing approval", time: "9:45 AM", type: "Vocabulary", tone: "warning" as const, unread: true },
  { title: "Campaign published", detail: "NEUROPLUS Launch published with pitch v2 and rubric v1", time: "Yesterday", type: "Campaign", tone: "info" as const, unread: false },
  { title: "Assignment deadline approaching", detail: "67 TMs must complete CARDIOCARE Q2 practice by Jun 28", time: "Yesterday", type: "Assignment", tone: "warning" as const, unread: false },
  { title: "Low score threshold breached", detail: "5 TMs recorded accuracy below 60% for NEUROPLUS", time: "Jun 15", type: "Performance", tone: "danger" as const, unread: false },
  { title: "Critical claim detected", detail: "Meera Patel — unapproved CV event reduction claim", time: "Jun 15", type: "Compliance", tone: "danger" as const, unread: false },
  { title: "Action updated", detail: "ACT-1030 completed by Karan Malhotra", time: "Jun 14", type: "Action", tone: "success" as const, unread: false },
];

export const MM_NOTIFICATION_PREFS = [
  { label: "Pitch processed / failed", detail: "Email + in-app", on: true },
  { label: "Vocabulary review pending", detail: "In-app daily digest", on: true },
  { label: "Campaign published", detail: "Email + in-app", on: true },
  { label: "Assignment deadline reminders", detail: "3 days before due date", on: true },
  { label: "Low-score threshold alerts", detail: "Accuracy below 60%", on: true },
  { label: "Critical claim alerts", detail: "Immediate email", on: true },
  { label: "Action status updates", detail: "Weekly summary", on: false },
];

export const MM_AUDIT_LOG = [
  { at: "Jun 16, 2025 10:15 AM", by: "Priya Nair", module: "Pitch", entity: "CARDIOCARE Q2 Pitch v3", event: "Published", before: "Pending Approval", after: "Published", reason: "Medical approval MED/2025/0412" },
  { at: "Jun 16, 2025 9:45 AM", by: "Vikram Joshi", module: "Vocabulary", entity: "Cardiology v5", event: "Terms added", before: "156 terms", after: "168 terms", reason: "Quarterly refresh" },
  { at: "Jun 16, 2025 9:20 AM", by: "System", module: "Performance", entity: "NEUROPLUS Launch", event: "Alert triggered", before: "—", after: "5 TMs below 60%", reason: "Threshold rule" },
  { at: "Jun 15, 2025 6:02 PM", by: "Sneha Iyer", module: "Rubric", entity: "Cardiology rubric v2", event: "Weights updated", before: "Accuracy 35%", after: "Accuracy 40%", reason: "Aligned to Q2 objective" },
  { at: "Jun 15, 2025 4:10 PM", by: "Rahul Sharma", module: "Assignment", entity: "West Region", event: "Scope changed", before: "24 TMs", after: "29 TMs", reason: "HQ realignment" },
  { at: "Jun 14, 2025 11:30 AM", by: "Priya Nair", module: "Input", entity: "BP Control Leave-behind", event: "Version created", before: "v2", after: "v3", reason: "Updated approval reference" },
  { at: "Jun 12, 2025 8:15 AM", by: "Vikram Joshi", module: "Campaign", entity: "RESPIRA Max", event: "Withdrawn", before: "Published", after: "Draft", reason: "Rubric incomplete" },
];
