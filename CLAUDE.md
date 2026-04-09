# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Important: Read Next.js docs first

This project uses Next.js 16.2.2 with the App Router. Check `node_modules/next/dist/docs/` for current API conventions before writing any code — breaking changes may differ from training data.

## Commands

```bash
# Development
npm run dev         # Start dev server at http://localhost:3000

# Build & production
npm run build
npm start

# Linting
npm run lint        # ESLint

# Type checking (add to package.json if missing)
npx tsc --noEmit

# E2E tests (requires dev server running or auto-starts it)
npx playwright test
npx playwright test tests/animation-ui.spec.ts  # single test file
npx playwright show-report                       # view HTML report
```

## Architecture

This is a **content piracy detection SaaS dashboard** rebuilt with Next.js 16 App Router, TypeScript strict mode, Tailwind CSS v4, Zustand, and Framer Motion.

### Route groups

- `(landing)` — public marketing site at `/`
- `(auth)` — login page at `/login`  
- `(dashboard)` — protected app at `/incidents`, `/takedowns`, `/content`, `/configuration`, `/users`
- `dashboard/` — legacy alias redirecting to the tab-based dashboard
- `api/` — mock REST API routes (no real DB; serves mock data from `src/lib/mockData.tsx`)

Auth is **client-side only** via Zustand (`src/stores/appStore.ts`). The middleware in `src/middleware.ts` is a passthrough — real auth guards live in `src/app/(dashboard)/layout.tsx` which redirects to `/login` when unauthenticated.

### State management

`useAppStore` (Zustand + persist) is the single source of truth. It holds auth state, all domain data (incidents, takedowns, whitelist, blacklist, keywords, users), and UI state (current tab, selected incidents). Only `currentTab` and `accountTier` are persisted to localStorage.

### Component structure

```
src/components/
  ui/           # Base primitives: Button, Input, Modal, EmptyState, Skeleton
  layout/       # Sidebar, Header, Navigation (dashboard shell)
  dashboard/    # KPICard (draggable)
  charts/       # ECharts wrapper
  modals/       # CreateIncidentModal, EditIncidentModal, IncidentDetailsModal, EditUserModal
  table/        # Reusable Table component
  three/        # Three.js/R3F 3D components for landing hero
  landing/      # Landing page sections: Hero, Features, Pricing, Testimonials, CTA, Demo
```

### Animation system

Two animation libraries coexist:
- **Framer Motion** — page transitions (`PageTransition` in `src/lib/animations.tsx`), component variants (`src/lib/animations/variants.ts`)
- **GSAP** — scroll-triggered animations (`src/lib/animations/gsap.ts`)

Always check `prefers-reduced-motion` before adding animations. Shared animation constants are in `src/lib/animations/constants.ts`.

### API layer

`src/lib/api.ts` exports a typed `APIClient` class (`api` singleton). All API routes under `src/app/api/` return `{ data, error }` shaped responses. The client handles errors uniformly — always check `result.success`.

### Brand colors

Primary teal palette (must match exactly):
- `#0f766e` — primary
- `#14b8a6` — light  
- `#5eead4` — lighter
- `#0d5e56` — dark
- `#134e4a` — darker

Full palette is in `tailwind.config.ts`.

## Critical constraints

- **Demo credentials:** `admin@piracyshield.com` / `demo123`
- All 6 nav tabs must work: Dashboard, Incidents, Takedowns, Content, Configuration, Users
- All 9 modals must open/close correctly
- All 4 KPI cards must be draggable
- All 4 ECharts charts must render
- WCAG 2.1 AA accessibility compliance required on all components

## MCP Tools: code-review-graph

**ALWAYS use the code-review-graph MCP tools BEFORE using Grep/Glob/Read to explore the codebase.**

| Tool | Use when |
|------|----------|
| `detect_changes` | Reviewing code changes — gives risk-scored analysis |
| `get_review_context` | Need source snippets — token-efficient |
| `get_impact_radius` | Understanding blast radius of a change |
| `semantic_search_nodes` | Finding functions/classes by name or keyword |
| `query_graph` | Tracing callers, callees, imports, tests |
| `get_architecture_overview` | High-level codebase structure |

Fall back to Grep/Glob/Read only when the graph doesn't cover what you need.
