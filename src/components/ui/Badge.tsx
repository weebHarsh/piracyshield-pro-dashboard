import { STATUS, resolveStatusKey } from '@/lib/status';
import type { StatusKey } from '@/lib/status';

interface BadgeProps {
  /** Canonical status key or raw string — auto-resolved via resolveStatusKey */
  status: StatusKey | string;
  /** Override the display label (defaults to STATUS[key].label) */
  label?: string;
  className?: string;
}

const iconPaths: Record<StatusKey, { d: string; viewBox?: string }> = {
  critical: { d: 'M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01' },
  high:     { d: 'M12 8v4M12 16h.01M12 2a10 10 0 100 20A10 10 0 0012 2z' },
  medium:   { d: 'M12 2a10 10 0 100 20A10 10 0 0012 2z' },
  low:      { d: 'M22 11.08V12a10 10 0 11-5.93-9.14M22 4L12 14.01l-3-3' },
  info:     { d: 'M12 2a10 10 0 100 20A10 10 0 0012 2zM12 16v-4M12 8h.01' },
};

export function Badge({ status, label, className = '' }: BadgeProps) {
  const key = resolveStatusKey(status);
  const def = STATUS[key];
  const displayLabel = label ?? def.label;
  const icon = iconPaths[key];

  return (
    <span
      className={[
        'inline-flex items-center gap-1.5',
        'px-2 py-0.5 rounded-md',
        'text-sm font-medium font-sans',
        'tabular',
        def.tw,
        def.twBg,
        className,
      ].join(' ')}
    >
      <svg
        className="w-3 h-3 shrink-0"
        viewBox={icon.viewBox ?? '0 0 24 24'}
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d={icon.d} />
      </svg>
      {displayLabel}
    </span>
  );
}

export default Badge;
