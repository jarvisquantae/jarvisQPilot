# Q-Pilot — Field Intelligence Platform (Frontend Prototype)

**Q-Pilot** is a pharmaceutical field-intelligence web application by **Quantae AI**.
It gives Territory Managers, Marketing Managers, Sales Managers and Super-Admins a single
workspace for input planning, detailing practice, AI-style assessment and performance analytics.

This repository contains the **production-quality frontend prototype**, built with realistic
mock data. Backend/AI services are intentionally out of scope for this phase.

---

## Internship Documentation

This project was designed and built during my internship with Quantae AI.

**Role:** Frontend / Product Engineering Intern
**Scope:** End-to-end UI/UX implementation of the Q-Pilot platform from reference designs and
a written requirements sheet, across four role-based consoles (~45 screens).

### What I built

| Area | Work delivered |
| --- | --- |
| Design system | Light Q-Pilot shell, teal/mint semantic token palette, typography scale, shared primitives (stat tiles, score rows, tables, charts, audio player) |
| Territory Manager console | Home, Input Plan (monthly input calendar with communication modes), Learning (detailing structure, listen detailing, practise), Practice recorder, Results & rubric, Progress, Notifications, Profile |
| Marketing Manager console | Campaign creation & publication, pitch upload, distribution calendar, vocabulary knowledge bank, performance action management, marketing copilot, reports |
| Sales Manager console | Team command centre, performance drill-downs, brand inputs, readiness, coaching, reports |
| Super-Admin console | Dashboard, users, roles, tenants, campaigns, products, audit log, settings, security, analytics |
| Platform work | Console launcher landing page, role-aware navigation, routing architecture, mock data layer, SEO metadata per route, responsive layouts |

### Engineering decisions worth noting

- **Mock data layer** (`src/data/*`, `src/services/qpilot.ts`) mirrors the shape of the future
  API, including simulated latency so loading states are real and swapping in a live backend is
  a drop-in change.
- **Semantic design tokens only** — no hardcoded colour utilities, so theming stays consistent
  across all four consoles.
- **File-based routing** with typed route definitions and per-route head metadata.

---

## Tech stack

- TanStack Start (React 19, file-based routing, SSR)
- TypeScript
- Vite 7
- Tailwind CSS v4 + shadcn/ui primitives
- Recharts for analytics visualisations

---

## Getting started

```sh
git clone <this-repository-url>
cd q-pilot
npm install
npm run dev
```

The app runs at `http://localhost:8080`.

### Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build to `dist/` |

---

## Project structure

```
src/
  routes/        file-based routes (TM, /marketing, /sales, /admin)
  components/    layout shells, shared UI primitives, charts
  data/          mock datasets per console
  services/      data-access layer (swap for live API)
  styles.css     design tokens and Tailwind theme
```

---

## Deployment (Netlify)

- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Node version:** 20+

Add a `_redirects` file or `netlify.toml` SPA fallback if client-side routes 404 on refresh.

---

## Status

Frontend prototype — complete. AI assessment engine, authentication and persistence are
planned for the next phase.

© Quantae AI
