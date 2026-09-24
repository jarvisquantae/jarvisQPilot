# Q-Pilot — Frontend MVP (TM Journey + Manager Placeholders)

Build the complete clickable Q-Pilot experience with realistic mock data. No AI, no backend, no auth, no database.

## Design direction

The four attachments are role journey infographics (Admin, MM, SM, TM), so they set the visual identity and the exact step-by-step flows rather than pixel layouts. I'll carry their language directly into the app:

- Deep navy headings, teal/cyan primary, soft mint-tinted icon circles
- Large rounded cards (~16px radius), thin light borders, soft shadows, generous whitespace
- Numbered step chips (navy square with white numeral) reused in the practice stepper and pitch sections
- Green readiness, orange warning, purple for AI-labelled elements
- Q-Pilot lockup in the sidebar: "FIELD INTELLIGENCE / Q-PILOT / By Quantae AI" with the Q mark
- Desktop/tablet first, responsive down to mobile

All colors and shadows become semantic tokens in `src/styles.css` — no hardcoded color utilities in components.

## Screens (TM journey)

| Route | Screen |
| --- | --- |
| `/dashboard` | 4 metric cards with progress, AI Improvement Focus (3 items), Today's Practice, Latest Result, Next Actions, Listen to Detailing card |
| `/campaigns` | Campaigns / Input Calendar tabs, 3 campaign cards, This Week's Inputs, Today's Priority, Open Learning |
| `/campaigns/cardiocare-a/learning` | Product Learning Centre: objective, approved input details, approved pitch sections, objection responses, Listen to Audio + Start Guided Practice |
| `/campaigns/cardiocare-a/audio` | Listen to Detailing: waveform player, timestamps, 15s skip, 0.75x–1.5x speed, 4 pitch sections, focus guidance, Proceed to Practice |
| `/practice/cardiocare-a` | Guided Practice: 4-step stepper, sample script, key reminders, AI focus panel, Record This Section |
| `/practice/cardiocare-a/record` | Record Practice: mic UI, timer, animated waveform, Start/Pause/Resume/Stop/Replay/Delete (mock state machine), Before you submit, Submit for AI Review |
| `/practice/cardiocare-a/transcript` | Transcript Review: editable You/HCP turns, Vocabulary Mapping, detected corrections, Edit & Confirm, Continue to Assessment |
| `/results/cardiocare-a/latest` | AI Assessment Result: 4 score cards, positive feedback, improvement suggestions, coverage check, Practice Again / Review Transcript |
| `/results/progress` | My Progress: score improvement chart, readiness by campaign, practice history table, coach notes |
| `/profile` | Profile + settings, notifications list, readiness snapshot |
| `/marketing`, `/sales-manager` | Placeholder consoles listing their journey sections with mock summary data |

`/` redirects to `/dashboard`. Sidebar: Dashboard, Campaigns, Practice, Results, Notifications, Profile with teal active state. Top bar: Q2 2025 (Apr – Jun) quarter selector, TM avatar, "Territory Manager", dropdown.

Every button in the spec navigates to the mapped destination. Tabs, hover/focus/active states, loading skeletons on data reads, and empty states included.

## Architecture

```
src/
  components/         Sidebar, TopBar, PageHeader, MetricCard, CampaignCard,
                      StatusBadge, ProgressBar, PracticeStepper, FeedbackCard,
                      AIInsightCard, AudioPlayer, TranscriptPanel, AssessmentCard,
                      NotificationItem, ActionItem, DataTable, EmptyState, Modal
  routes/             file-based routes per the table above
  types/              Campaign, Product, PromotionalInput, Pitch, PitchSection,
                      AssessmentRubric, PracticeAttempt, Transcript,
                      TranscriptCorrection, AssessmentResult, Feedback,
                      ReadinessStatus, Notification, CoachingAction, User
  data/               mock fixtures only
  services/           getCurrentUser, getCampaigns, getCampaign, getPracticeAttempt,
                      getTranscript, getAssessmentResult, getProgress, getNotifications
  hooks/ utils/
```

Technical notes: TanStack Start with file-based routing (`src/routes/`) — this project's router, not React Router. Services are async functions returning mock fixtures with a small delay, consumed via TanStack Query, so they can later be swapped for Cloud/Supabase calls without touching components. Recording, transcription, and scoring are UI state machines over fixture data — no fake AI endpoints. Each route gets its own `head()` metadata.

## Out of scope this phase

Real AI/STT/TTS, auth, database, chatbot, CRM, GPS, patient management, leaderboards. The Google Drive link isn't used; say the word if there are assets there I should pull in.
