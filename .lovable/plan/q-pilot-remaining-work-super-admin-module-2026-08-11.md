# Q-Pilot — Remaining Work: Super-Admin Module

The Territory Manager, Marketing Manager, and Sales Manager modules are implemented. The remaining scope is the **Super-Admin module** (10 reference screens from the Google Drive folder) plus a small cleanup pass.

## What is left

1. **Super-Admin console** — 10 screens under a new `/admin/*` route tree based on the Google Drive reference screenshots:
   - Admin layout shell (dark/navy or system-management style consistent with the references)
   - Mock data layer for users, roles, teams, tenants, audit, configuration
   - Routes: exact screens to be aligned with the 10 Super-Admin reference images
2. **Cleanup** — remove the leftover `/sales-manager` placeholder route or redirect it to `/sales/dashboard`
3. **Final QA** — quick navigation smoke-test across all four role modules after the Admin routes are added

## Out of scope

Real AI/STT/TTS, authentication, database, backend APIs, CRM, GPS, patient management, leaderboards.

## Architecture

- `src/components/layout/AdminShell.tsx` — Super-Admin navigation shell
- `src/data/admin.ts` — mock fixtures for admin screens
- `src/routes/admin.*.tsx` — TanStack file routes for each screen
- Reuse existing primitives and query patterns from TM/MM/SM modules
