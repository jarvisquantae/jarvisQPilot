# TM Screens — Match Reference Slides

Restyle three Territory Manager screens to the attached mockups. Same app, same data, same routes — layout and presentation only. No AI/backend work.

## 1. Sidebar (all TM screens)

Replace the current nav labels with the five tags from the mockups:

- Home → `/dashboard`
- Input Plan → `/campaigns`
- Learning → `/campaigns/cardiocare-a/learning`
- Practice → `/practice`
- Progress → `/results/progress`

Keep the deep-navy sidebar, Q-Pilot mark with "AI for Every Visit", the constellation artwork at the bottom, and the pill-shaped active state (white pill, purple label). Notifications and Profile stay reachable from the top-right header menu; "Switch console" stays at the bottom.

## 2. Input Plan (Option-1 Slide 1) — `/campaigns`

Rebuild the page as a month-based visit plan:

- Title "MY INPUT PLAN" with month pills (APRIL / MAY / JUNE), active pill filled purple.
- Right-aligned brand dropdown (All Brands, CardioVia, LipiCore, Vascora) with a check on the active option; filters the list.
- Sub-header: "April 2026" + "4 Visits Planned".
- One row card per visit: circular pastel icon by input type (reminder card, scientific literature, booklet, conference), a CURRENT badge on the active visit, "VISIT n" + brand name in red caps, title + one-line description, and two actions — "View Input" (outline) and "Learn Detailing" (filled).
- Footer card: "COMING NEXT MONTH — MAY" listing Visit 1–4 items with a "Preview May" button that switches the month pill.

The existing input-calendar view moves off this page (it stays available on Learning).

## 3. Learning (Option-2 Slide 3) — `/campaigns/$campaignId/learning`

Rebuild as a guided detailing walkthrough:

- Header: brand name in large purple caps, input title beneath, "APRIL • VISIT 2" line; right side holds the quarter picker and brand dropdown.
- Left column: "INPUT: …" panel showing the approved input artwork/preview card.
- Right column top: "YOUR DETAILING FLOW" — a 6-node numbered stepper (Opening, Introduce Visual, Scientific Concept, Key Takeaway, Campaign Link, Closing) with completed nodes green-checked and the current node ringed purple.
- Right column body: the current step card — "STEP n OF 7", step title, script paragraph, and emphasis chips.
- Chip legend under the card: KEY MESSAGE, IMPORTANT (green), DO NOT MISS (red).
- Sticky footer bar: Previous / "n / 7" / Next, wired to advance the stepper through the existing pitch sections.

Objection responses and the monthly input calendar move into secondary tabs/accordions so the walkthrough stays the focus.

## 4. Practice — record (Option-1 Slide 2) — `/practice/$campaignId/record`

- Header: brand in red caps, input title large, "Practice Your Detailing" in purple.
- Two cards side by side: the input visual preview, and "Your Key Points" as a purple-check bullet list.
- Below: a centred recording panel — large purple mic button in a concentric halo, timer at the left, waveform at the right, "START PRACTICE" button under it.
- Hint line: "Speak naturally and cover the key points clearly."
- Action row: Listen, Record Again (disabled until a take exists), and "Submit for AI Assessment".

## 5. Practice — result (Option-1 Slide 4) — `/results/$campaignId/latest`

- Header row: icon well, brand in purple caps, input title, "Practice Your Detailing"; top-right "INPUT" thumbnail card.
- Left card "YOUR RESULT": Accuracy, Adherence, Overall rows each with a circular icon and large percentage; Overall highlighted on a tinted row. Divider, then "READINESS" with a status pill (e.g. Nearly Ready).
- Right column: "What You Did Well" (green tinted, quoted italic) and "Improve Next" (amber tinted, quoted italic).
- Bottom bar: check icon + encouragement line, "Practice Again" (outline) and "Next Input →" (filled).

## Technical notes

- Reuse existing mock data in `src/data/mock.ts`; extend it with month/visit/brand fields (visit number, brand, input type, current flag, next-month preview list) and per-step emphasis tags for the detailing flow.
- New presentational components under `src/components/tm/`: `VisitRow`, `MonthPills`, `BrandFilter`, `DetailingFlowStepper`, `EmphasisChip`, `ScoreRow`, `RecorderPanel`.
- `AppShell` nav list updated; shell chrome otherwise unchanged.
- All colours via existing semantic tokens in `src/styles.css`; add tokens for the red brand caps and the pastel icon wells if not already present.
- Recording stays simulated (timer + fake waveform), scores stay mock.
