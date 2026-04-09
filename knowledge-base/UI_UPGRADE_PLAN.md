# PiracyShield Pro — World-Class UI Upgrade Plan

## Context

PiracyShield Pro is a content piracy detection SaaS dashboard (Next.js 16, TypeScript, Tailwind v4, Zustand, Framer Motion). It has a dark-themed landing page (6 sections) and a light dashboard (5 pages) — all using mock data. The project lives at `/Users/harshthapliyal/Code/Content Piracy/piracyshield-pro/`.

**Problem:** The UI has spec mismatches with the knowledge base, multiple built-but-unused components (3D, GSAP, Lottie), missing features (dark mode, /signup, search modal, dashboard overview), no mobile responsiveness on the dashboard, and accessibility gaps. The goal is to make this world-class.

**Git State:** Single commit on `main`, no remote configured, never pushed. The parent repo (`content-piracy-original`) on GitHub contains only the original HTML/CSS/JS prototype. The `piracyshield-pro/` directory needs its own remote.

---

## Phase 0: Critical Bug Fixes & Spec Alignment (Day 1-2)

> Fix all bugs and mismatches with knowledge-base specs before adding features.

### 0.1 Fix AnimatedButton — Nested `<button>` Bug
- **File:** `src/components/ui/Button.tsx:119-133`
- `motion.button` wraps `<Button>` which renders another `<button>` — **invalid HTML**
- **Fix:** Make `AnimatedButton` spread motion props onto a single `<button>`, not nest them

### 0.2 Fix Modal Hooks Rule Violation
- **File:** `src/components/ui/Modal.tsx:47-49`
- `descriptionId` conditionally calls `useRef` — violates React Rules of Hooks
- **Fix:** Always call `useRef`, conditionally use the value

### 0.3 Fix Sidebar Width (256px → 240px per spec)
- **File:** `src/components/layout/Sidebar.tsx:13` — change `w-64` to `w-60`
- **File:** `src/app/(dashboard)/layout.tsx:40` — change `ml-64` to `ml-60`
- COMPONENTS.md specifies 240px sidebar width

### 0.4 Fix Header — Static "Dashboard" Title
- **File:** `src/components/layout/Header.tsx:16-18`
- Currently hardcodes "Dashboard" regardless of route
- **Fix:** Use `usePathname()` to derive title: `/incidents` → "Incidents", `/takedowns` → "Takedowns", etc.

### 0.5 Fix Button — Missing Gradient Per Spec
- **File:** `src/components/ui/Button.tsx` primary variant
- THEMING.md specifies `background: var(--gradient-teal-primary)` with teal glow on hover
- Current: flat `bg-teal-700`. **Fix:** `bg-gradient-to-r from-teal-700 to-teal-500` + glow shadow

### 0.6 Fix Chart Resize — No Debounce
- **File:** `src/components/charts/Charts.tsx:28`
- Resize fires on every pixel. **Fix:** 200ms debounce wrapper

### 0.7 Fix Table Search — No Debounce
- **File:** `src/components/table/Table.tsx`
- USER_FLOWS.md specifies 300ms debounce. Currently filters on every keystroke

### 0.8 Fix KPI Card Hover — Wrong translateY
- THEMING.md: `translateY(-8px)`. Current KPICard uses `y: -4`. Update to `-8`

### 0.9 Fix MouseParallax Passive Listener
- **File:** `src/components/three/MouseParallax.tsx`
- Add `{ passive: true }` to `mousemove`/`touchmove` listeners to prevent scroll jank

---

## Phase 1: Missing Features (Days 3-5)

### 1.1 Create /signup Page
- **New file:** `src/app/(auth)/signup/page.tsx`
- Multi-step form: email, password, name, company
- For demo: redirect to login with toast "Account created! Sign in."
- **Fix broken links** in `HeroSection.tsx:60`, `Navigation.tsx:101`, `PricingSection.tsx`, `CTASection.tsx`

### 1.2 Build Dashboard Overview Page
- **File:** `src/app/(dashboard)/page.tsx` (new — default route for dashboard group)
- Render 4 KPI cards in responsive grid + 4 charts in 2×2 grid
- Recent activity feed, skeleton loading states
- The stub at `src/app/dashboard/page.tsx` should redirect to this

### 1.3 Build Search Modal (Cmd+K)
- **New file:** `src/components/modals/SearchModal.tsx`
- Command palette: search across incidents/takedowns/content/users
- Keyboard nav (↑↓ arrows, Enter to select, Esc to close)
- Register `Cmd+K` / `Ctrl+K` globally
- **Modify:** `src/components/layout/Header.tsx` — add search button with shortcut hint

### 1.4 Implement Dark Mode
- **New file:** `src/stores/themeStore.ts` — Zustand store: `'light' | 'dark' | 'system'`, persisted
- **Modify:** `src/app/globals.css` — dark palette under `.dark` class (#0f172a, #1e293b, #e2e8f0)
- **Modify:** All component files — add `dark:` Tailwind prefixes (`bg-white dark:bg-slate-800`, etc.)
- **Modify:** `src/components/charts/Charts.tsx` — dark chart theme variant
- **Modify:** `src/components/layout/Header.tsx` — add sun/moon toggle button

### 1.5 Fix Skip Links & Section IDs
- **Modify:** `src/app/(landing)/layout.tsx` — add skip link (currently missing)
- **Modify:** Landing sections — add `id` attributes: `id="features"`, `id="demo"`, `id="pricing"`, `id="testimonials"`

---

## Phase 2: 3D Hero Integration (Days 5-7)

> The Three.js components are fully built but orphaned. Wire them in.

### 2.1 Integrate Scene into Hero
- **File:** `src/components/landing/Hero/HeroSection.tsx`
- Dynamic import Scene (`next/dynamic`, `ssr: false`) as absolute-positioned background
- Scene already handles capability detection (WebGL, low-end, reduced-motion)
- Use `HeroFallback.tsx` (already exists) as fallback for non-3D devices

### 2.2 3-Tier Device Capability Rendering
- **Tier 1 (Full):** 3D Scene + Particles + Mouse Parallax (desktop, high-end)
- **Tier 2 (Reduced):** CSS floating shapes animation — **New file:** `src/components/landing/Hero/CSSFloatingShapes.tsx`
- **Tier 3 (Minimal):** Static gradient, no animation (prefers-reduced-motion)

### 2.3 Off-Screen Culling
- **File:** `src/components/three/Scene.tsx`
- Use `useInView` to suspend/resume Canvas when hero scrolls out of viewport → prevents GPU waste

### 2.4 Optimize Particles
- **File:** `src/components/three/OptimizedParticles.tsx`
- Currently mutates ALL particle positions every frame. Add visibility check, reduce update frequency

---

## Phase 3: Dashboard UX — World-Class (Days 7-10)

### 3.1 KPI Card Drag-and-Drop
- **File:** `src/components/dashboard/KPICard.tsx`
- Use Framer Motion `Reorder` for drag-and-drop reordering
- Persist order to localStorage (per COMPONENTS.md spec)

### 3.2 Responsive Sidebar (Mobile Drawer)
- **File:** `src/components/layout/Sidebar.tsx`
- Hidden on `< md`, slide-in drawer on hamburger click, backdrop overlay
- **File:** `src/components/layout/Header.tsx` — add hamburger button for mobile
- **File:** `src/app/(dashboard)/layout.tsx` — remove fixed `ml-60` on mobile, apply `md:ml-60`

### 3.3 Notification Dropdown
- **File:** `src/components/layout/Header.tsx`
- Real dropdown with mock notifications, "Mark all read", ARIA (`aria-expanded`, `aria-haspopup`)

### 3.4 Data States Overhaul
- Replace string `emptyMessage` with rich `EmptyState` components on all pages
- **New file:** `src/components/ui/ErrorBoundary.tsx` — catches render errors, "Retry" button
- Add inline error states to API hooks
- Replace artificial 300ms loading timeout with Suspense boundaries

### 3.5 Micro-Interactions
- Button ripple effect on primary buttons (CSS `::before` pseudo-element)
- Status badge pulse animation on "New" badges
- Table row hover: subtle left-border accent + row highlight
- Toast notifications: custom styled with teal brand + icons per type

### 3.6 Real-Time Simulation
- **New file:** `src/lib/realtime.ts`
- 30-second interval: add random incident, update KPIs/charts, show toast
- "Live" indicator badge in header

---

## Phase 4: Landing Page Polish (Days 10-12)

### 4.1 Mobile Landing Navigation
- **File:** `src/components/landing/shared/Navigation.tsx`
- Add hamburger button (visible `< md`), slide-down mobile menu, close on link click/Esc

### 4.2 Smooth Scroll for Anchor Links
- Navigation.tsx — `scroll-behavior: smooth` + offset for fixed header height

### 4.3 Remove Unused Packages & Dead Code
- **Remove from package.json:** `gsap`, `@react-spring/web`, `lottie-web`, `@remotion/cli`, `@remotion/player`
- **Delete:** `src/lib/animations/gsap.ts`
- Keep `@use-gesture/react` only if used for KPI drag (Phase 3.1)
- **Estimated savings:** ~150-200KB gzipped

### 4.4 Use Framer Motion `whileInView` Everywhere (Replace GSAP Intent)
- Landing sections already use `whileInView` — verify all sections have scroll-triggered animations
- No need for GSAP ScrollTrigger — Framer Motion covers it

---

## Phase 5: Performance & SEO (Days 12-14)

### 5.1 Dynamic Imports for Heavy Components
- Charts: `dynamic(() => import('@/components/charts/Charts'), { ssr: false })`
- Three.js Scene: already dynamic from Phase 2.1
- Modals: lazy load on trigger

### 5.2 Image & Meta Optimization
- Add OG image to `/public/og-image.png` (1200×630)
- Update root layout metadata
- **New files:** `public/robots.txt`, `src/app/sitemap.ts`

### 5.3 Page-Specific Titles
- Each dashboard page exports `metadata` with route-specific `<title>`

### 5.4 Performance Budget Targets (from LANDING_PAGE_PLAN.md)

| Metric | Target |
|--------|--------|
| Lighthouse (Desktop) | > 85 |
| Bundle (gzipped) | < 500KB |
| LCP | < 2.5s |
| FID | < 100ms |
| CLS | < 0.1 |
| TTI | < 3.5s |
| Animation FPS | 60fps |

---

## Phase 6: Accessibility Hardening (Days 14-15)

### 6.1 ARIA Landmarks & Labels
- Landing nav: `aria-label="Main navigation"`
- Charts: add hidden data table alternative for screen readers
- Notification bell: `aria-expanded`, `aria-haspopup`

### 6.2 Screen Reader Announcements
- Use `announceToScreenReader` utility when filters change, bulk actions complete, modals open

### 6.3 Focus Management
- Return focus to trigger after modal close
- Move focus to main content on route change
- Tab-trapping: fix Modal.tsx to re-query focusable elements when content changes dynamically

### 6.4 Status Badges — Not Color Alone
- Add icon or pattern distinction for risk levels (Critical ⬤, High ▲, Medium ◆, Low ▼)

---

## Complete Edge Case Map

### Responsive/Device (7 cases)
| ID | Edge Case | Mitigation | Phase |
|----|-----------|------------|-------|
| EC-R1 | Sidebar renders off-screen on mobile, no toggle | Mobile drawer with hamburger | 3.2 |
| EC-R2 | Landing nav has no hamburger for mobile | Add mobile menu | 4.1 |
| EC-R3 | KPI cards grid may not wrap on narrow screens | Explicit responsive grid: `grid-cols-1 sm:grid-cols-2 xl:grid-cols-4` | 1.2 |
| EC-R4 | Table pagination wraps oddly on small screens | Stack pagination controls vertically on mobile | 3.4 |
| EC-R5 | Orientation change doesn't resize charts/3D | Add resize listener to useDeviceCapabilities | 0.8 |
| EC-R6 | `useDeviceCapabilities` checks width only on mount | Add resize event listener, cache WebGL check | 0.8 |
| EC-R7 | Chart containers collapse on mobile | Set `min-h-[250px]` on chart wrappers | 3.4 |

### Animation (6 cases)
| ID | Edge Case | Mitigation | Phase |
|----|-----------|------------|-------|
| EC-A1 | `prefers-reduced-motion` not checked in FM components | Wrap motion components with `useReducedMotion()` check | 2.2 |
| EC-A2 | No fallback when 3D returns null on low-end devices | Use HeroFallback.tsx (CSS gradient blobs) | 2.1 |
| EC-A3 | FloatingGeometry runs `useFrame` when off-screen | useInView culling on Scene | 2.3 |
| EC-A4 | OptimizedParticles mutates ALL positions per frame | Visibility check, reduce update frequency | 2.4 |
| EC-A5 | GSAP initialized but never used — dead code | Remove GSAP entirely | 4.3 |
| EC-A6 | Table row motion stagger on 50+ rows = 1s+ delay | Cap stagger animation to first 10 rows, instant for rest | 3.4 |

### Accessibility (8 cases)
| ID | Edge Case | Mitigation | Phase |
|----|-----------|------------|-------|
| EC-ACC1 | Landing nav missing `aria-label` | Add `aria-label="Main navigation"` | 6.1 |
| EC-ACC2 | Landing sections missing `id` for anchor scroll | Add `id="features"`, `id="demo"`, etc. | 1.5 |
| EC-ACC3 | Charts have no data table for screen readers | Add hidden `<table>` with chart data | 6.1 |
| EC-ACC4 | Modal `descriptionId` uses conditional `useRef` | Always call useRef | 0.2 |
| EC-ACC5 | Status badges use color alone for risk | Add icon/pattern distinction | 6.4 |
| EC-ACC6 | Notification bell has no ARIA dropdown markup | Add `aria-expanded`, `aria-haspopup` | 3.3 |
| EC-ACC7 | Focus trap in Modal only queries elements once | Re-query on content change with MutationObserver | 6.3 |
| EC-ACC8 | Skip link missing on landing layout | Add skip link | 1.5 |

### Data States (8 cases)
| ID | Edge Case | Mitigation | Phase |
|----|-----------|------------|-------|
| EC-D1 | Dashboard overview is a blank stub | Build real overview with KPIs + charts | 1.2 |
| EC-D2 | Loading state is artificial 300ms (data is sync) | Replace with Suspense or remove fake delay | 3.4 |
| EC-D3 | No error state UI anywhere | Add ErrorBoundary + inline error states | 3.4 |
| EC-D4 | EmptyState component exists but unused on most pages | Wire EmptyState into all pages | 3.4 |
| EC-D5 | Can't simulate "no data" without code changes | Add env flag or devtools toggle | 3.4 |
| EC-D6 | Chart data hardcoded, can't update from state | Pass data as props from page-level state | 1.2 |
| EC-D7 | `Set` for selectedIncidents not JSON-serializable | Convert to array in Zustand persist serialize | 0.2 |
| EC-D8 | No pagination info beyond Table's internal state | Surface pagination counts in page-level UI | 3.4 |

### Auth/Navigation (6 cases)
| ID | Edge Case | Mitigation | Phase |
|----|-----------|------------|-------|
| EC-AUTH1 | `/signup` 404s — linked from hero, nav, pricing, CTA | Create signup page | 1.1 |
| EC-AUTH2 | Flash-of-nothing on refresh (auth check delay) | Show skeleton/loading state while hydrating | 3.4 |
| EC-AUTH3 | Middleware is no-op — no edge auth protection | Acceptable for demo; document limitation | — |
| EC-AUTH4 | Authenticated user on landing page not redirected | Add "Go to Dashboard" CTA when authenticated | 1.1 |
| EC-AUTH5 | Back button after logout shows cached dashboard | Clear cache on logout, redirect middleware | 3.4 |
| EC-AUTH6 | Deep link to `/incidents` flashes before auth check | Suspense boundary with skeleton | 3.4 |

### Modal/Overlay (6 cases)
| ID | Edge Case | Mitigation | Phase |
|----|-----------|------------|-------|
| EC-M1 | `createPortal` SSR guard may cause hydration warnings | Verify with `typeof window` check before render | 0.2 |
| EC-M2 | Nested modals — only one focus trap active | Sequential close-then-open pattern (already done) | — |
| EC-M3 | Modals not full-screen adapted on mobile | Add `sm:max-w-[500px] w-full` + full-screen on xs | 3.4 |
| EC-M4 | Scroll lock uses `overflow: hidden` — iOS Safari bug | Use `position: fixed` + scroll offset technique | 0.2 |
| EC-M5 | Two modals open → one closes → scroll lock removed | Track modal count, only unlock when count = 0 | 0.2 |
| EC-M6 | Modal focus trap doesn't handle dynamic content | Re-query focusable elements on content change | 6.3 |

### Form/Input (6 cases)
| ID | Edge Case | Mitigation | Phase |
|----|-----------|------------|-------|
| EC-F1 | Edit modal mutates display state directly | Separate form state from display state | 3.5 |
| EC-F2 | No field-level validation or error display | Add Zod schemas + field-level errors | 3.5 |
| EC-F3 | No character limits — long titles overflow table | Add `maxLength` + truncation with tooltip | 3.4 |
| EC-F4 | URL input has no format validation | Add regex or Zod URL validation | 3.5 |
| EC-F5 | Search passes raw input to `.includes()` | Escape special regex characters | 0.7 |
| EC-F6 | No paste handling or input masking | Low priority — skip for demo | — |

### Performance (8 cases)
| ID | Edge Case | Mitigation | Phase |
|----|-----------|------------|-------|
| EC-P1 | ~200KB+ unused packages in bundle | Remove GSAP, react-spring, Lottie, Remotion | 4.3 |
| EC-P2 | All 4 chart variants bundled together | Dynamic imports per chart | 5.1 |
| EC-P3 | Three.js bundled but never rendered on any page | Dynamic import only in hero | 2.1 |
| EC-P4 | Chart resize no debounce | Add 200ms debounce | 0.6 |
| EC-P5 | Particles update all positions every frame | Visibility culling | 2.4 |
| EC-P6 | WebGL check creates canvas every call | Cache result | 0.8 |
| EC-P7 | Table search has no debounce | 300ms debounce | 0.7 |
| EC-P8 | `motion.tr` per row — expensive at 50+ rows | Cap stagger, reduce motion config | 3.4 |

### Browser (5 cases)
| ID | Edge Case | Mitigation | Phase |
|----|-----------|------------|-------|
| EC-B1 | Scrollbar width measurement differs per OS | Use CSS `scrollbar-gutter: stable` where possible | 0.2 |
| EC-B2 | `backdrop-filter` limited on older Firefox | Fallback to solid semi-transparent bg | — |
| EC-B3 | `navigator.deviceMemory` not in Firefox/Safari | Already has fallback (returns 8) — acceptable | — |
| EC-B4 | Touch events without `{ passive: true }` | Fix in MouseParallax | 0.9 |
| EC-B5 | iOS Safari scroll lock workaround needed | Use fixed-position technique | 0.2 |

### Dark Mode (6 cases)
| ID | Edge Case | Mitigation | Phase |
|----|-----------|------------|-------|
| EC-DM1 | No dark mode implementation | Build full dark mode system | 1.4 |
| EC-DM2 | All components hardcode light colors | Add `dark:` Tailwind prefixes | 1.4 |
| EC-DM3 | ECharts theme hardcoded light | Create dark chart theme | 1.4 |
| EC-DM4 | 3D scene already dark-compatible | No change needed | — |
| EC-DM5 | Status badges may fail contrast on dark bg | Test + adjust dark palette | 6.5 |
| EC-DM6 | No dark OG image variant | Low priority — skip | — |

### SEO (5 cases)
| ID | Edge Case | Mitigation | Phase |
|----|-----------|------------|-------|
| EC-SEO1 | No OG image | Add OG image | 5.2 |
| EC-SEO2 | No sitemap.xml or robots.txt | Create both | 5.2 |
| EC-SEO3 | Dashboard pages have generic title | Page-specific titles | 5.3 |
| EC-SEO4 | No canonical URLs | Add to metadata | 5.3 |
| EC-SEO5 | Structured data exists — good | Verify renders correctly | 5.2 |

---

## Verification Plan

### Per-Phase Testing
1. **Phase 0:** `npx tsc --noEmit` passes, `npm run build` succeeds, no console errors in browser
2. **Phase 1:** Navigate to all new routes (/signup, /dashboard overview), Cmd+K opens search, dark mode toggles
3. **Phase 2:** 3D renders on desktop, falls back to CSS on mobile/low-end, no GPU memory leak (Chrome DevTools)
4. **Phase 3:** Drag KPI cards, mobile sidebar works, notifications dropdown opens, error boundary catches thrown errors
5. **Phase 4:** Mobile landing nav works, smooth scroll anchors, `npm ls` shows removed packages gone
6. **Phase 5:** Run Lighthouse — score > 85, bundle analyze < 500KB gzipped
7. **Phase 6:** Tab through entire app with keyboard, test with VoiceOver/NVDA

### E2E Tests (Playwright)
- Auth flow (login → dashboard → logout)
- All 6 nav tabs work
- All 9 modals open/close
- KPI drag-and-drop persists
- Dark mode toggle persists
- Mobile responsive (375px, 768px, 1440px)
- Cmd+K search modal
- Keyboard-only navigation

### Knowledge Base Compliance Checklist
- [ ] Sidebar = 240px (COMPONENTS.md)
- [ ] 4 KPI cards, draggable (TEST_RESULTS.md)
- [ ] 4 ECharts render (TEST_RESULTS.md)
- [ ] 9 modals open/close (USER_FLOWS.md)
- [ ] Primary button has teal gradient (THEMING.md)
- [ ] 300ms search debounce (USER_FLOWS.md)
- [ ] Card hover translateY(-8px) (THEMING.md)
- [ ] Skip links on all layouts (TEST_RESULTS.md)
- [ ] Demo credentials work (COMPONENTS.md)
- [ ] All 42+ test cases from USER_FLOWS.md pass

---

## Critical Files Reference

| File | What Changes |
|------|-------------|
| `src/components/ui/Button.tsx` | Fix nested button bug, add gradient |
| `src/components/ui/Modal.tsx` | Fix hooks violation, scroll lock iOS fix |
| `src/components/layout/Sidebar.tsx` | Width fix, mobile drawer |
| `src/components/layout/Header.tsx` | Dynamic title, search, dark toggle, hamburger, notifications |
| `src/components/dashboard/KPICard.tsx` | Drag-and-drop, hover fix |
| `src/components/charts/Charts.tsx` | Debounce, dark theme, dynamic import |
| `src/components/table/Table.tsx` | Search debounce, row animation cap |
| `src/components/landing/Hero/HeroSection.tsx` | 3D integration, fix /signup links |
| `src/components/landing/shared/Navigation.tsx` | Mobile hamburger, smooth scroll |
| `src/components/three/Scene.tsx` | Off-screen culling |
| `src/app/globals.css` | Dark mode CSS variables |
| `src/app/(dashboard)/layout.tsx` | Sidebar width, mobile margin |
| `src/app/(dashboard)/page.tsx` | New dashboard overview |
| `src/app/(auth)/signup/page.tsx` | New signup page |
| `src/stores/themeStore.ts` | New dark mode store |
| `src/components/modals/SearchModal.tsx` | New search modal |
| `src/components/ui/ErrorBoundary.tsx` | New error boundary |
| `package.json` | Remove 5 unused deps |
