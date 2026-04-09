# PiracyShield Pro - Complete Theming & Design System

## Executive Summary

This document provides a comprehensive mapping of the PiracyShield Pro dashboard's design system, theming, and visual styling. It serves as a complete reference for recreating the dashboard from scratch with exact fidelity.

---

## Table of Contents

1. [Color System](#color-system)
2. [Typography](#typography)
3. [Spacing & Layout](#spacing--layout)
4. [Shadows & Elevation](#shadows--elevation)
5. [Animations & Transitions](#animations--transitions)
6. [Component Styles](#component-styles)
7. [Iconography](#iconography)
8. [Responsive Design](#responsive-design)

---

## Color System

### Primary Brand Colors

#### Teal Color Palette (Brand Identity)

```css
:root {
  /* Primary Teal - Main Brand */
  --primary-teal: #0f766e;
  --primary-teal-light: #14b8a6;
  --primary-teal-lighter: #5eead4;
  --primary-teal-dark: #0d5e56;
  --primary-teal-darker: #134e4a;/* Complete Teal Scale */
  --teal-50: #f0fdfa;   /* Background tint */
  --teal-100: #ccfbf1;  /* Light background */
  --teal-200: #99f6e4;  /* Hover states */
  --teal-300: #5eead4;  /* Active states */
  --teal-400: #2dd4bf;  /* Accent */
  --teal-500: #14b8a6;  /* Primary interactive */
  --teal-600: #0d9488;  /* Hover dark */
  --teal-700: #0f766e;  /* Brand primary */
  --teal-800: #115e59;  /* Text emphasis */
  --teal-900: #134e4a;  /* Darkest */
}
```

**Usage Guidelines:**
- `--primary-teal (#0f766e)` - Brand logo, primary buttons, active navigation
- `--primary-teal-light (#14b8a6)` - Hover states, secondary buttons, links
- `--teal-50 (#f0fdfa)` - Page backgrounds, cards
- `--teal-100 (#ccfbf1)` - Section backgrounds, highlights
- `--teal-700-900` - Text, headings, emphasis

### Secondary Colors

#### Slate (Neutrals)

```css
:root {
  --secondary-slate: #475569;
  --secondary-slate-light: #64748b;
  --secondary-slate-dark: #334155;
}
```

**Usage:**Secondary text, borders, disabled states

#### Accent Colors

```css
:root {
  --accent-amber: #f59e0b;  /* Warnings, highlights */
  --accent-rose: #e11d48;   /* Errors, critical */
  --accent-emerald: #10b981;/* Success, positive */
}
```

### Status & Semantic Colors

```css
:root {
  /* Risk Levels */
  --status-critical: #dc2626;  /* High priority */
  --status-high: #ea580c;     /* Medium-high */
  --status-medium: #d97706;   /* Medium */
  --status-low: #65a30d;      /* Low priority */
  --status-resolved: #16a34a; /* Completed */
}
```

**Usage Matrix:**
| Status | Color | Hex | Use Case |
|--------|-------|-----|----------|
| Critical | Red | #dc2626 | High-risk incidents, urgent issues |
| High | Orange | #ea580c | Medium-high priority items |
| Medium | Amber | #d97706 | Moderate attention needed |
| Low | Green | #65a30d | Low priority, informational |
| Resolved | Green | #16a34a | Completed, successful actions |

### Neutral Grayscale

```css
:root {
  --neutral-50: #fafafa;  /* Background */
  --neutral-100: #f5f5f5; /* Light background */
  --neutral-200: #e5e5e5; /* Borders */
  --neutral-300: #d4d4d4; /* Disabled */
  --neutral-400: #a3a3a3; /* Placeholder text */
  --neutral-500: #737373; /* Secondary text */
  --neutral-600: #525252; /* Primary text */
  --neutral-700: #404040; /* Headings */
  --neutral-800: #262626; /* Emphasis text */
  --neutral-900: #171717; /* Dark text */
  --neutral-white: #FFFFFF;
}
```

### Account Tier Colors

```css
:root {
  --account-free: #6b7280;      /* Gray - Basic tier */
  --account-pro: #0f766e;       /* Teal - Professional */
  --account-enterprise: #134e4a;/* Dark teal - Premium */
}
```

### Gradients

```css
/* Professional Teal Gradients */
:root {
  --gradient-teal-primary: linear-gradient(135deg, #0f766e 0%, #14b8a6 100%);
  --gradient-teal-soft: linear-gradient(135deg, #14b8a6 0%, #5eead4 100%);
  --gradient-teal-dark: linear-gradient(135deg, #134e4a 0%, #0f766e 100%);
  --gradient-hero: linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 50%, #ffffff 100%);
}
```

**Usage:**
- Primary gradient: Buttons, CTAs, hero backgrounds
- Soft gradient: Hover states, decorative elements
- Dark gradient: Footer, dark sections
- Hero gradient: Landing page background

---

## Typography

### Font Families

```css
/* Primary: Inter - Body text, UI elements */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;

/* Secondary: Poppins - Headings only */
font-family: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
```

**Font Loading:**
```html
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&display=swap" rel="stylesheet">
```

### Type Scale

```css
/* Headings */
h1 { font-size: 3.75rem;  /* 60px - Hero */
    line-height: 1.25; }h2 { font-size: 2.25rem;  /* 36px - Sections */
    line-height: 1.25; }
h3 { font-size: 1.5rem;   /* 24px - Subsections */
    line-height: 1.25; }
h4 { font-size: 1.25rem;  /* 20px - Cards */
    line-height: 1.25; }
h5 { font-size: 1.125rem; /* 18px - Small headings */
    line-height: 1.25; }
h6 { font-size: 1rem;     /* 16px - Label headings */
    line-height: 1.25; }

/* Body */
body {
  font-size: 1rem; /* 16px */
  line-height: 1.6;
}
```

### Font Weights

```css
/* Weight Scale */
font-weight: 400; /* Regular - Body text */
font-weight: 500; /* Medium - Labels, secondary */
font-weight: 600; /* Semibold - Emphasis, buttons */
font-weight: 700; /* Bold - Headings */
```

### Letter Spacing

```css
/* Headings */
h1, h2, h3, h4, h5, h6 {
  letter-spacing: -0.02em; /* Tighter kerning */
}

/* Body */
body {
  letter-spacing: 0;       /* Normal */
}```

### Text Styles

```css
/* Gradient Text */
.gradient-text {
  background: var(--gradient-teal-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Colors */
.text-primary { color: var(--primary-teal); }
.text-secondary { color: var(--secondary-slate); }
.text-accent { color: var(--accent-amber); }
```

---

## Spacing & Layout

### Spacing Scale (8px base)

```css
/* Spacing Tokens */
--space-0: 0;
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-5: 1.25rem;  /* 20px */
--space-6: 1.5rem;   /* 24px */
--space-8: 2rem;     /* 32px */
--space-10: 2.5rem;  /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
--space-24: 6rem;     /* 96px */
```

### Border Radius

```css
--radius-sm: 0.25rem;   /* 4px - Badges, small elements */
--radius-md: 0.5rem;    /* 8px - Buttons, inputs */
--radius-lg: 0.75rem;   /* 12px - Cards */
--radius-xl: 1rem;     /* 16px - Large cards */
--radius-2xl: 1.5rem;  /* 24px - Modals */
--radius-full: 9999px; /* Pills, avatars */
```

### Container Widths

```css
:max-w-sm: 24rem;    /* 384px */
--max-w-md: 28rem;   /* 448px */
--max-w-lg: 32rem;   /* 512px */
--max-w-xl: 36rem;   /* 576px */
--max-w-2xl: 42rem;  /* 672px */
--max-w-3xl: 48rem;  /* 768px */
--max-w-4xl: 56rem;  /* 896px */
--max-w-5xl: 64rem;  /* 1024px */
--max-w-6xl: 72rem;  /* 1152px */
--max-w-7xl: 80rem;  /* 1280px - Main content */
```

---

## Shadows & Elevation

### Shadow System

```css
:root {
  /* Base Shadows */
  --shadow-xs: 0 1px 3px rgba(0, 0, 0, 0.12);
  --shadow-sm: 0 4px 12px rgba(0, 0, 0, 0.08);
  --shadow-md: 0 8px 24px rgba(0, 0, 0, 0.12);
  --shadow-lg: 0 16px 48px rgba(0, 0, 0, 0.15);
  --shadow-xl: 0 24px 64px rgba(0, 0, 0, 0.18);
  
  /* Teal Glow Effects */
  --shadow-glow-teal: 0 0 20px rgba(15, 118, 110, 0.2);
  --shadow-glow-teal-strong: 0 0 30px rgba(15, 118,110, 0.3);
  --shadow-teal-soft: 0 8px 32px rgba(20, 184, 166, 0.2);
  --shadow-teal-medium: 0 12px 40px rgba(15, 118, 110, 0.25);
  --shadow-teal-strong: 0 16px 48px rgba(13, 94, 86, 0.3);
}
```

**Usage:**
- `shadow-xs` - Tooltips, dropdowns
- `shadow-sm` - Cards at rest
- `shadow-md` - Elevated cards, modals
- `shadow-lg` - Popovers, floating panels
- `shadow-xl` - Large overlays
- `shadow-glow-teal` - Interactive highlights

### Elevation Classes

```css
/* Elevation on interaction */
.card-hover {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}.card-hover:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
              0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
```

---

## Animations & Transitions

### Transition System

```css
:root {
  --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-base: 300ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 500ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

**Usage:**
- Fast: Micro-interactions (hover, focus)
- Base: Component transitions (modal, dropdown)
- Slow: Page transitions, complex animations

### Key Animations

#### 1. Floating Shapes (Hero Background)

```css
@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
}

.shape {
  position: absolute;
  border-radius: 50%;
  opacity: 0.3;
  animation: float 6s ease-in-out infinite;
}

.shape:nth-child(1) {
  width: 80px;
  height: 80px;
  top: 20%;
  left: 10%;
  background: var(--gradient-teal-primary);
  animation-delay: 0s;
}

.shape:nth-child(2) {
  width: 120px;
  height: 120px;
  top: 60%;
  right: 15%;
  background: var(--gradient-teal-soft);
  animation-delay: 2s;
}
```

#### 2. Section Fade In

```css
@keyframes sectionFadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.section.active {
  animation: sectionFadeIn 0.3s ease-out;
}
```

#### 3. Status Badge Pulse

```css
@keyframes statusPulse {
  0%, 100% { opacity: 1; transform: translateY(-50%) scale(1); }
  50% { opacity: 0.5; transform: translateY(-50%) scale(1.2); }
}

.status-new::before {
  content: '';
  position: absolute;
  left: 6px;
  top: 50%;
  transform: translateY(-50%);
  width: 6px;
  height: 6px;
  background: currentColor;
  border-radius: 50%;
  animation: statusPulse 2s ease-in-out infinite;
}
```

#### 4. Button Ripple Effect

```css
.btn-primary::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: translate(-50%, -50%);
  transition: width var(--transition-base), 
              height var(--transition-base);
}

.btn-primary:hover::before {
  width: 300px;
  height: 300px;
}
```

#### 5. Slide Down Animation

```css
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.bulk-upload-panel {
  animation: slideDown 0.2s ease;
}
```

---

## Component Styles

### Buttons

#### Primary Button

```css
.btn-primary {
  background: var(--gradient-teal-primary);
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all var(--transition-base);
  border: none;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  box-shadow: var(--shadow-sm), var(--shadow-teal-soft);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-teal-medium), var(--shadow-glow-teal-strong);
}
```

#### Secondary Button

```css
.btn-secondary {
  background: white;
  color: var(--primary-teal);
  border: 2px solid var(--primary-teal);
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all var(--transition-base);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  box-shadow: var(--shadow-xs);
}

.btn-secondary:hover {
  background: var(--gradient-teal-primary);
  color: white;
  border-color: transparent;
  transform: translateY(-2px);
  box-shadow: var(--shadow-teal-soft), var(--shadow-glow-teal);
}
```

### Cards

#### KPI Card

```css
.kpi-card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;}
.kpi-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 28px rgba(15, 118, 110, 0.12), 
              0 0 20px rgba(15, 118, 110, 0.08);
}
```

#### Feature Card

```css
.feature-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-base);
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
              0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
```

### Navigation

#### Top Navigation

```css
nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: white/0.9;
  backdrop-filter: blur(8px);
  border-bottom: 1px solid #e5e7eb;
  z-index: 50;
}
```

#### Sidebar Navigation

```css
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 240px;
  background: white;
  border-right: 1px solid #e5e7eb;
  padding: 16px 0;
  overflow-y: auto;
}

.nav-item {
  padding: 12px 24px;
  color: #6b7280;
  transition: all var(--transition-fast);
}

.nav-item:hover {
  background: var(--teal-50);
  color: var(--primary-teal);
}

.nav-item.active {
  background: var(--gradient-teal-primary);
  color: white;
}
```

### Tables

```css
.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table thead {
  background: var(--teal-50);
  border-bottom: 2px solid var(--primary-teal);
}

.data-table th {
  padding: 12px 16px;
  text-align: left;
  font-weight: 600;
  color: var(--primary-teal);
}

.data-table td {
  padding: 12px 16px;
  border-bottom: 1px solid #e5e7eb;
}

.data-table tbody tr {
  transition: background-color 0.2s ease, box-shadow 0.2s ease;
}

.data-table tbody tr:hover {
  background: linear-gradient(90deg, rgba(15, 118, 110, 0.04), transparent);
}
```

### Modals

```css
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: none;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-overlay.open {
  display: flex;
  animation: fadeIn 0.2s ease;
}

.modal {
  background: white;
  border-radius: 16px;
  padding: 32px;
  max-width: 500px;
  width: 90%;
  box-shadow: var(--shadow-xl);
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Form Inputs

```css
.form-input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  transition: all var(--transition-fast);
}

.form-input:focus {
  outline: none;
  border-color: var(--primary-teal);
  box-shadow: var(--shadow-glow-teal);
}

.form-label {
  display: block;
  font-weight: 600;
  color: var(--neutral-800);
  margin-bottom: 8px;
}
```

---

## Iconography

### Icon System

Using Heroicons (SVG-based):

```html
<!-- Example: Shield Icon -->
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-2.332 9-7.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
</svg>```

**Icon Sizes:**
- Small: `w-4 h-4` (16px)
- Default: `w-5 h-5` (20px)
- Medium: `w-6 h-6` (24px)
- Large: `w-8 h-8` (32px)
- XL: `w-12 h-12` (48px)

---

## Responsive Design

### Breakpoints

```css
/* Tailwind Default Breakpoints */
--breakpoint-sm: 640px;--breakpoint-md: 768px;
--breakpoint-lg: 1024px;
--breakpoint-xl: 1280px;
--breakpoint-2xl: 1536px;
```

### Mobile-First Approach

```css
/* Base: Mobile (< 640px) */
.container {
  padding: 16px;
}

/* Tablet (≥ 768px) */
@media (min-width: 768px) {
  .container {
    padding: 24px;
  }
}

/* Desktop (≥ 1024px) */
@media (min-width: 1024px) {
  .container {
    padding: 32px;
  }
}
```

---

## Implementation Checklist

### Required CDN Links

```html
<!-- Tailwind CSS -->
<script src="https://cdn.tailwindcss.com"></script>

<!-- Anime.js for animations -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js"></script>

<!-- Typed.js for typewriter effect -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/typed.js/2.0.12/typed.min.js"></script>

<!-- Splide for carousels -->
<script src="https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/js/splide.min.js"></script>

<!-- ECharts for data visualization -->
<script src="https://cdn.jsdelivr.net/npm/echarts@5.4.3/dist/echarts.min.js"></script>

<!-- p5.js for creative effects -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.7.0/p5.min.js"></script>

<!-- Pixi.js for high-performance graphics -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/pixi.js/7.3.2/pixi.min.js"></script>

<!-- SheetJS for Excel import -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>

<!-- Splitting.js for text animations -->
<link href="https://unpkg.com/splitting@1.0.6/dist/splitting.css" rel="stylesheet">
<script src="https://unpkg.com/splitting@1.0.6/dist/splitting.min.js"></script>

<!-- Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&display=swap" rel="stylesheet">
```

### Font Loading Strategy

```css
/* Body font - System font stack with fallback */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;

/* Headings - Poppins loaded via Google Fonts */
font-family: 'Poppins', sans-serif;
```

---

## Color Contrast Requirements

All color combinations meet WCAG 2.1 AA standards:

| Text Color | Background | Contrast Ratio | Pass |
|------------|------------|----------------|------|
| `--neutral-900` | White | 16.1:1 | ✅ |
| `--primary-teal` | White | 4.8:1 | ✅ |
| White | `--primary-teal` | 4.8:1 | ✅ |
| `--neutral-800` | `--teal-50` | 15.3:1 | ✅ |

---

## Best Practices

### 1. Color Usage

- **Primary actions:** Use `--primary-teal` gradient
- **Secondary actions:** Use outlined buttons with teal border
- **Status indicators:** Use semantic colors (critical, high, medium, low)
- **Text hierarchy:** Use neutral scale (900 → 500)

### 2. Spacing

- Use 8px grid system
- Consistent padding: 16px (mobile), 24px (tablet), 32px (desktop)
- Card gutters: 24px
- Section spacing: 64px

### 3. Typography

- Headings: Poppins, 700 weight
- Body: Inter, 400-600 weight
- Line height: 1.6 for body, 1.25 for headings
- Letter spacing: -0.02em for headings

### 4. Shadows

- Cards: `shadow-sm` at rest, `shadow-md` on hover
- Dropdowns: `shadow-sm`
- Modals: `shadow-xl`
- Glow effects for interactive elements

### 5. Animations

- Use `cubic-bezier(0.4, 0, 0.2, 1)` for smooth curves
- Duration: 150ms (fast), 300ms (base), 500ms (slow)
- Avoid animations on mobile for performance
- Respect `prefers-reduced-motion`

---

## File Structure for Implementation

```
/styles
  /theme.css         # CSS variables and design tokens
  /components.css    # Component-specific styles
  /animations.css    # Keyframe animations
  /utilities.css     # Helper classes
```

---

**Last Updated:** 2025-04-07  
**Version:** 1.0  
**Dashboard:** PiracyShield Pro v5.0