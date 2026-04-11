'use client';

import type { KPIData } from '@/types';

interface KPICardProps {
  data: KPIData;
  index: number;
}

const iconMap: Record<string, React.ReactNode> = {
  shield: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  takedown: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
    </svg>
  ),
  success: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  money: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

const trendUp = (
  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
  </svg>
);
const trendDown = (
  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V2" />
  </svg>
);
const trendNeutral = (
  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
  </svg>
);

const trendColor: Record<string, string> = {
  up:      'text-[var(--status-low)]',
  down:    'text-[var(--status-critical)]',
  neutral: 'text-[var(--text-subtle)]',
};

export function KPICard({ data }: KPICardProps) {
  const trendIcon = data.trend === 'up' ? trendUp : data.trend === 'down' ? trendDown : trendNeutral;

  return (
    <article
      className={[
        'surface-flat rounded-lg p-4',
        'transition-[border-color] duration-150',
        'hover:border-[var(--border-strong)]',
        'cursor-default',
      ].join(' ')}
      aria-label={`${data.title}: ${data.value}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs text-[var(--text-subtle)] mb-2 uppercase tracking-wide">
            {data.title}
          </p>
          {/* KPI number — PP Fraktion Mono, tabular, no truncation */}
          <div className="flex items-baseline gap-2">
            <span
              className="tabular text-[var(--text)] leading-none"
              style={{ fontSize: 'var(--text-3xl)', fontWeight: 500 }}
              aria-labelledby={`kpi-${data.title.replace(/\s+/g, '-').toLowerCase()}`}
            >
              {data.value}
            </span>
            <span
              className={[
                'tabular flex items-center gap-1 text-xs',
                trendColor[data.trend],
              ].join(' ')}
              aria-label={`${data.trend === 'up' ? 'up' : data.trend === 'down' ? 'down' : 'unchanged'} ${data.change}`}
            >
              {trendIcon}
              {data.change}
            </span>
          </div>
        </div>

        {/* Icon pill — muted teal, no gradient */}
        <div
          className="w-8 h-8 rounded-md flex items-center justify-center shrink-0 bg-[var(--brand-dim)] text-[var(--brand)]"
          aria-hidden="true"
        >
          {iconMap[data.icon] ?? iconMap.shield}
        </div>
      </div>
    </article>
  );
}
