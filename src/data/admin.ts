/**
 * Mock fixtures for the Super-Admin console.
 * Frontend-only: replace with service calls when the backend lands.
 */

export const ADMIN_USER = {
  roleLabel: "Super Admin",
  initials: "SA",
  email: "super.admin@quantae.ai",
};

export const ADMIN_FILTER_OPTIONS = {
  tenant: ["All Tenants", "Quantae India", "Quantae SEA", "Quantae LATAM", "Demo Tenant"],
  region: ["All Regions", "North India", "South India", "West India", "East India", "SE Asia", "LatAm"],
  role: ["All Roles", "Super Admin", "Marketing Manager", "Sales Manager", "Territory Manager"],
  status: ["All Statuses", "Active", "Inactive", "Pending"],
  quarter: ["Q2 2025 (Apr – Jun)", "Q1 2025 (Jan – Mar)", "Q3 2025 (Jul – Sep)"],
};

export const ADMIN_DASHBOARD_STATS = [
  { label: "Total Users", value: 486, delta: "+32", deltaLabel: " vs last month", tone: "teal" as const },
  { label: "Active Tenants", value: 12, delta: "+2", deltaLabel: " vs last month", tone: "info" as const },
  { label: "Active Campaigns", value: 38, note: "across all tenants", tone: "success" as const },
  { label: "System Health", value: "99.9", suffix: "%", delta: "+0.1", deltaLabel: " vs last month", tone: "ai" as const },
];

export const ADMIN_USAGE_TREND = {
  labels: ["W1", "W2", "W3", "W4", "W5", "W6"],
  series: [
    { name: "Active Users", points: [312, 338, 356, 384, 402, 420], tone: "teal" as const },
    { name: "Practice Sessions", points: [1240, 1380, 1520, 1680, 1820, 1980], tone: "info" as const },
  ],
};

export const ADMIN_TENANT_SUMMARY = [
  { tenant: "Quantae India", region: "South Asia", users: 210, tms: 156, campaigns: 14, readiness: 74, status: "Active" },
  { tenant: "Quantae SEA", region: "South East Asia", users: 98, tms: 72, campaigns: 8, readiness: 68, status: "Active" },
  { tenant: "Quantae LATAM", region: "Latin America", users: 76, tms: 54, campaigns: 6, readiness: 62, status: "Active" },
  { tenant: "Demo Tenant", region: "Global", users: 28, tms: 12, campaigns: 4, readiness: 81, status: "Pilot" },
];

export const ADMIN_ALERTS = [
  { title: "3 failed login attempts", detail: "User: rahul.sharma@quantae.ai · IP: 203.192.x.x", tone: "warning" as const },
  { title: "New tenant onboarding", detail: "Quantae MENA requested activation", tone: "info" as const },
  { title: "Data retention policy", detail: "Audio transcripts older than 90 days queued for archive", tone: "ai" as const },
  { title: "Critical: role escalation", detail: "User Vikram Joshi granted temporary Super Admin", tone: "danger" as const },
];

export const ADMIN_USERS = [
  { id: "u-1", name: "Arjun Mehta", email: "arjun.mehta@quantae.ai", role: "Territory Manager", tenant: "Quantae India", region: "North India", status: "Active", lastActive: "2 mins ago" },
  { id: "u-2", name: "Priya Nair", email: "priya.nair@quantae.ai", role: "Marketing Manager", tenant: "Quantae India", region: "South India", status: "Active", lastActive: "15 mins ago" },
  { id: "u-3", name: "Vikram Joshi", email: "vikram.joshi@quantae.ai", role: "Sales Manager", tenant: "Quantae India", region: "West India", status: "Active", lastActive: "1 hr ago" },
  { id: "u-4", name: "Sneha Iyer", email: "sneha.iyer@quantae.ai", role: "Territory Manager", tenant: "Quantae SEA", region: "SE Asia", status: "Inactive", lastActive: "3 days ago" },
  { id: "u-5", name: "Rahul Sharma", email: "rahul.sharma@quantae.ai", role: "Territory Manager", tenant: "Quantae LATAM", region: "LatAm", status: "Pending", lastActive: "Never" },
  { id: "u-6", name: "Anita Rao", email: "anita.rao@quantae.ai", role: "Sales Manager", tenant: "Quantae India", region: "East India", status: "Active", lastActive: "4 hrs ago" },
  { id: "u-7", name: "Karan Malhotra", email: "karan.malhotra@quantae.ai", role: "Territory Manager", tenant: "Quantae India", region: "North India", status: "Active", lastActive: "30 mins ago" },
  { id: "u-8", name: "Meera Patel", email: "meera.patel@quantae.ai", role: "Marketing Manager", tenant: "Quantae SEA", region: "SE Asia", status: "Active", lastActive: "2 hrs ago" },
];

export const ADMIN_ROLES = [
  {
    id: "super-admin",
    name: "Super Admin",
    description: "Full platform access across all tenants and modules.",
    users: 2,
    permissions: [
      { module: "Users", access: "Full" },
      { module: "Tenants", access: "Full" },
      { module: "Campaigns", access: "Full" },
      { module: "Products", access: "Full" },
      { module: "Audit", access: "Full" },
      { module: "Settings", access: "Full" },
      { module: "Security", access: "Full" },
    ],
  },
  {
    id: "marketing-manager",
    name: "Marketing Manager",
    description: "Create and publish campaigns, pitches, and vocabulary.",
    users: 8,
    permissions: [
      { module: "Campaigns", access: "Create / Edit" },
      { module: "Products", access: "View" },
      { module: "Pitches", access: "Full" },
      { module: "Vocabulary", access: "Full" },
      { module: "Performance", access: "View" },
      { module: "Audit", access: "View" },
    ],
  },
  {
    id: "sales-manager",
    name: "Sales Manager",
    description: "Manage TM teams, coaching, and readiness reviews.",
    users: 14,
    permissions: [
      { module: "Team", access: "Full" },
      { module: "Reviews", access: "Full" },
      { module: "Coaching", access: "Full" },
      { module: "Performance", access: "View" },
      { module: "Inputs", access: "View" },
    ],
  },
  {
    id: "territory-manager",
    name: "Territory Manager",
    description: "Practice approved pitches and review own assessment results.",
    users: 462,
    permissions: [
      { module: "Practice", access: "Full" },
      { module: "Results", access: "Own only" },
      { module: "Campaigns", access: "View" },
      { module: "Profile", access: "Edit" },
    ],
  },
];

export const ADMIN_TENANTS = [
  { id: "t-1", name: "Quantae India", slug: "quantae-in", region: "South Asia", plan: "Enterprise", users: 210, admins: 2, status: "Active", created: "Jan 15, 2024" },
  { id: "t-2", name: "Quantae SEA", slug: "quantae-sea", region: "South East Asia", plan: "Enterprise", users: 98, admins: 1, status: "Active", created: "Mar 22, 2024" },
  { id: "t-3", name: "Quantae LATAM", slug: "quantae-latam", region: "Latin America", plan: "Professional", users: 76, admins: 1, status: "Active", created: "Aug 05, 2024" },
  { id: "t-4", name: "Demo Tenant", slug: "demo", region: "Global", plan: "Trial", users: 28, admins: 1, status: "Pilot", created: "Feb 10, 2025" },
  { id: "t-5", name: "Quantae MENA", slug: "quantae-mena", region: "Middle East / Africa", plan: "Enterprise", users: 0, admins: 0, status: "Pending", created: "Jun 01, 2025" },
];

export const ADMIN_CAMPAIGNS = [
  { id: "c-1", name: "CARDIOCARE Q2", product: "CARDIOCARE", tenant: "Quantae India", tms: 52, practices: 268, accuracy: 76, status: "Published" },
  { id: "c-2", name: "NEUROPLUS Launch", product: "NEUROPLUS", tenant: "Quantae India", tms: 48, practices: 214, accuracy: 81, status: "Published" },
  { id: "c-3", name: "RESPIRA Max", product: "RESPIRA Max", tenant: "Quantae SEA", tms: 36, practices: 152, accuracy: 72, status: "Published" },
  { id: "c-4", name: "DIABETA Care", product: "DIABETA Care", tenant: "Quantae LATAM", tms: 44, practices: 186, accuracy: 79, status: "Draft" },
  { id: "c-5", name: "ONCOSHIELD Pilot", product: "ONCOSHIELD", tenant: "Demo Tenant", tms: 20, practices: 42, accuracy: 64, status: "Draft" },
];

export const ADMIN_PRODUCTS = [
  { id: "p-1", name: "CARDIOCARE", molecule: "Telmisartan 40mg", indication: "Hypertension", specialty: "Cardiology", tenants: 3, pitches: 8, status: "Active" },
  { id: "p-2", name: "NEUROPLUS", molecule: "Pregabalin 75mg", indication: "Neuropathic pain", specialty: "Neurology", tenants: 2, pitches: 6, status: "Active" },
  { id: "p-3", name: "RESPIRA Max", molecule: "Formoterol / Budesonide", indication: "Asthma / COPD", specialty: "Pulmonology", tenants: 2, pitches: 5, status: "Active" },
  { id: "p-4", name: "DIABETA Care", molecule: "Dapagliflozin 10mg", indication: "Type 2 diabetes", specialty: "Endocrinology", tenants: 2, pitches: 7, status: "Active" },
  { id: "p-5", name: "ONCOSHIELD", molecule: "Capecitabine 500mg", indication: "Colorectal cancer", specialty: "Oncology", tenants: 1, pitches: 2, status: "Pilot" },
];

export const ADMIN_AUDIT_TRAIL = [
  { id: "a-1", at: "Jun 16, 2025 10:15 AM", user: "Priya Nair", tenant: "Quantae India", module: "Pitch Library", action: "Pitch Published", detail: "CARDIOCARE Q2 Detailing Pitch" },
  { id: "a-2", at: "Jun 16, 2025 9:45 AM", user: "Vikram Joshi", tenant: "Quantae India", module: "Vocabulary Bank", action: "Vocabulary Updated", detail: "Added 12 terms to 'Heart Failure'" },
  { id: "a-3", at: "Jun 16, 2025 9:20 AM", user: "System", tenant: "Quantae India", module: "Performance", action: "Score Alert Triggered", detail: "5 TMs below 60% accuracy" },
  { id: "a-4", at: "Jun 16, 2025 8:50 AM", user: "Sneha Iyer", tenant: "Quantae SEA", module: "Campaigns", action: "Campaign Assigned", detail: "RESPIRA Max assigned to 12 TMs" },
  { id: "a-5", at: "Jun 15, 2025 4:10 PM", user: "Arjun Mehta", tenant: "Quantae India", module: "Practice", action: "Practice Submitted", detail: "NEUROPLUS Launch attempt #3" },
  { id: "a-6", at: "Jun 15, 2025 2:30 PM", user: "Super Admin", tenant: "All", module: "Security", action: "Role Changed", detail: "Vikram Joshi granted temporary Super Admin" },
  { id: "a-7", at: "Jun 15, 2025 11:20 AM", user: "Meera Patel", tenant: "Quantae SEA", module: "Inputs", action: "Input Uploaded", detail: "Competitor Comparison for NEUROPLUS" },
];

export const ADMIN_SYSTEM_SETTINGS = [
  { id: "s-1", category: "Practice", name: "Minimum practice duration", value: "30 seconds", type: "number" },
  { id: "s-2", category: "Practice", name: "AI review confidence threshold", value: "75%", type: "percentage" },
  { id: "s-3", category: "Data", name: "Transcript retention period", value: "90 days", type: "duration" },
  { id: "s-4", category: "Data", name: "Audio archive after", value: "30 days", type: "duration" },
  { id: "s-5", category: "Security", name: "Session timeout", value: "8 hours", type: "duration" },
  { id: "s-6", category: "Security", name: "MFA required for admin roles", value: "Enabled", type: "toggle" },
  { id: "s-7", category: "Notifications", name: "Low score alert threshold", value: "60%", type: "percentage" },
  { id: "s-8", category: "Notifications", name: "Digest email frequency", value: "Daily", type: "select" },
];

export const ADMIN_SECURITY_STATUS = [
  { label: "SSO / SAML", state: "Configured", tone: "success" as const },
  { label: "MFA Enrollment", state: "72% of admins", tone: "warning" as const },
  { label: "Password Policy", state: "Enforced", tone: "success" as const },
  { label: "Data Encryption", state: "AES-256-GCM", tone: "success" as const },
  { label: "Failed Logins (24h)", state: "14 attempts", tone: "warning" as const },
  { label: "Pending Access Reviews", state: "3 users", tone: "danger" as const },
];

export const ADMIN_ANALYTICS_STATS = [
  { label: "Total Practice Sessions", value: "8,642", delta: "+12", deltaLabel: "% vs last month", tone: "teal" as const },
  { label: "Avg Session Duration", value: "4:32", delta: "+18", deltaLabel: "s vs last month", tone: "info" as const },
  { label: "Transcription Minutes", value: "34,120", delta: "+9", deltaLabel: "% vs last month", tone: "success" as const },
  { label: "AI Assessments", value: "8,638", delta: "+12", deltaLabel: "% vs last month", tone: "ai" as const },
];

export const ADMIN_FEATURE_FLAGS = [
  { feature: "AI Pitch Extraction", status: "Enabled", rollout: "100%" },
  { feature: "Copilot Insights", status: "Enabled", rollout: "75%" },
  { feature: "Audio Playback", status: "Enabled", rollout: "100%" },
  { feature: "Real-time Transcription", status: "Beta", rollout: "20%" },
  { feature: "Mobile Offline Practice", status: "Disabled", rollout: "0%" },
];

export const ADMIN_ADOPTION_BY_ROLE = [
  { label: "Territory Managers", value: 86, tone: "success" as const },
  { label: "Sales Managers", value: 92, tone: "success" as const },
  { label: "Marketing Managers", value: 78, tone: "warning" as const },
  { label: "Super Admins", value: 100, tone: "success" as const },
];
