# Q-Pilot — Feedback Deck Updates (TM + SM)

Applying the 16-slide review deck. Slides 3, 4 and 14 are marked "This is fine" — untouched. Slide 16 (MM) is a request for a live demo, not a code change.

## A. Territory Manager

### 1. Home (`/dashboard`)
- Rebrand the sidebar lockup to **JARVIS Q-PILOT**.
- Rename the "Learning" nav item to **Learn**.
- Remove the **Listen** card from the Home dashboard grid; keep the Listen route reachable from the left nav and from the Learn page.

### 2. Shared input context header
Slides 5–8 all ask for the same header line. Add a single reusable context strip showing:

```text
Input Name  |  April 2026  |  Visit 2
```

sourced from the input plan data, placed at the top of:
- Guided Practice (`/practice/$campaignId`)
- Record Practice (`/practice/$campaignId/record`)
- Transcript Review (`/practice/$campaignId/transcript`)
- Practice Result (`/results/$campaignId/latest`)

### 3. Guided Practice sequence (slide 5)
Replace the 4-step sequence (Opening / Core Messages / Input Explanation / Closing) with the same 5 steps used by the Learn module's detailing structure: **Greeting, Opening, Core Message, Prescription Demand, Closing**. Script, reminders and AI-focus content are remapped to those five steps.

### 4. Transcript Review (slide 7)
- Remove every per-line **Edit** control — the transcript becomes read-only once the detailing voice is submitted.
- Replace "Edit & Confirm Transcript" with a plain confirm action, and drop the "Edit any line that was captured incorrectly" helper text.
- Remove the **Vocabulary Mapping** and **Possible corrections detected** panels.

## B. Sales Manager

### 5. Left panel (slide 15)
Hide **Readiness, Reviews, Coaching, Low Performers, Notifications** from the sidebar. The routes stay live and reachable from in-page links, so nothing breaks.

### 6. Dashboard (`/sales/dashboard`, slide 10)
- Replace the "Team Performance Overview" panel with a **TMs Need Attention** table: `TM Name | HQ | Region | Zone | Accuracy % | Adherence %`, with working **HQ / Region / Zone** filters.
- Remove: the three action cards (Review Low Performers, Assign Coaching, Check Brand Readiness), **Brand-wise Team Score**, **Performance Mix**, and **AI Quick Insights**.

### 7. Team Performance (`/sales/team`, slide 11)
- Replace "TM Comparison" with a **TMs Performance Board** table using the same six columns, plus a **See Details** button on every row that navigates to that TM's detail page.
- Remove: the four KPI cards, **Brand Performance**, **Distribution**, **Weak Brand Watchlist**.

### 8. Brand Inputs (`/sales/inputs`, slide 13)
- Replace "TM-wise Input Performance" with the same **TMs Performance Board** table (six columns).
- Remove: the four KPI cards, **Common Gaps**, **Brand Comparison**.

### 9. TM Detail (`/sales/tm/$tmId`, slide 12)
- Rename "Brand-wise Performance" to **Input-wise Performance**, list inputs instead of brands, add a **Month** filter, and show **Accuracy % and Adherence %** side by side per row.
- Remove: the four KPI cards, **Score Trend**, **Latest Assessment Results**, **AI Feedback & Manager Notes**, **Switch Territory Manager**.

## Technical notes

- Frontend only. All changes are presentational plus mock-data shape updates — no AI, backend or auth work.
- `src/data/sales.ts` gains HQ / Region / Zone / adherence fields per TM and an input-level (rather than brand-level) performance list with month tagging.
- `src/data/tm.ts` gains the input-context values (input name, month, visit number) and the 5-step practice sequence reusing `detailingStructure`.
- New shared components: `InputContextBar` (TM) and `TMPerformanceTable` (SM, reused across three screens with a `showSeeDetails` flag).
- Existing teal/mint Q-Pilot tokens and shell chrome are unchanged.

## Not included

MM console changes (slide 16 asks for a demo, not edits), and anything AI/STT/backend.
