/**
 * Canonical status taxonomy — single source of truth for all status colors,
 * labels, and icons across incidents, takedowns, charts, and notifications.
 *
 * The five tiers map to CSS tokens defined in globals.css.
 * DO NOT define status colors anywhere else in the codebase.
 */

export type StatusKey = 'critical' | 'high' | 'medium' | 'low' | 'info';

export interface StatusDef {
  key: StatusKey;
  label: string;
  /** CSS custom property name — use getComputedStyle to read in JS */
  token: string;
  bgToken: string;
  /** Tailwind utility classes */
  tw: string;
  twBg: string;
}

export const STATUS: Record<StatusKey, StatusDef> = {
  critical: {
    key: 'critical',
    label: 'Critical',
    token: '--status-critical',
    bgToken: '--status-critical-bg',
    tw: 'text-[var(--status-critical)]',
    twBg: 'bg-[var(--status-critical-bg)]',
  },
  high: {
    key: 'high',
    label: 'High',
    token: '--status-high',
    bgToken: '--status-high-bg',
    tw: 'text-[var(--status-high)]',
    twBg: 'bg-[var(--status-high-bg)]',
  },
  medium: {
    key: 'medium',
    label: 'Medium',
    token: '--status-medium',
    bgToken: '--status-medium-bg',
    tw: 'text-[var(--status-medium)]',
    twBg: 'bg-[var(--status-medium-bg)]',
  },
  low: {
    key: 'low',
    label: 'Low',
    token: '--status-low',
    bgToken: '--status-low-bg',
    tw: 'text-[var(--status-low)]',
    twBg: 'bg-[var(--status-low-bg)]',
  },
  info: {
    key: 'info',
    label: 'Info',
    token: '--status-info',
    bgToken: '--status-info-bg',
    tw: 'text-[var(--status-info)]',
    twBg: 'bg-[var(--status-info-bg)]',
  },
};

/**
 * Map common legacy string values to canonical StatusKey.
 * Use at call sites that receive raw API strings.
 */
export function resolveStatusKey(raw: string): StatusKey {
  const normalized = raw.toLowerCase().trim();
  const aliases: Record<string, StatusKey> = {
    // Direct matches
    critical: 'critical',
    high: 'high',
    medium: 'medium',
    low: 'low',
    info: 'info',
    // Takedown statuses → semantic severity
    pending: 'medium',
    processing: 'info',
    approved: 'low',
    completed: 'low',
    rejected: 'critical',
    // Incident-specific
    active: 'high',
    resolved: 'low',
    investigating: 'medium',
    escalated: 'critical',
  };
  return aliases[normalized] ?? 'info';
}

/**
 * Reads the computed OKLCH value for a status token.
 * Use this when you need the actual color value for canvas/chart renderers
 * that don't understand CSS variables (e.g. ECharts).
 */
export function getStatusColor(key: StatusKey): string {
  if (typeof window === 'undefined') {
    // SSR fallback — approximate values
    const fallbacks: Record<StatusKey, string> = {
      critical: '#e05a30',
      high:     '#d4922a',
      medium:   '#c8b830',
      low:      '#3daa78',
      info:     '#4e8dd4',
    };
    return fallbacks[key];
  }
  return getComputedStyle(document.documentElement)
    .getPropertyValue(`--status-${key}`)
    .trim();
}
