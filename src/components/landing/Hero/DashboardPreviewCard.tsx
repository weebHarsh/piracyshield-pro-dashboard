'use client'

import { motion } from 'framer-motion'

const incidents = [
  {
    platform: 'YouTube',
    initial: 'Y',
    title: 'Studio Alpha S02E04 — Pre-release Leak',
    risk: 'Critical' as const,
    riskToken: 'var(--status-critical)',
    riskBg: 'var(--status-critical-bg)',
  },
  {
    platform: 'Telegram',
    initial: 'T',
    title: 'Project Helios OST — Full Album',
    risk: 'High' as const,
    riskToken: 'var(--status-high)',
    riskBg: 'var(--status-high-bg)',
  },
  {
    platform: 'Reddit',
    initial: 'R',
    title: 'Meridian Suite — Installer + Crack',
    risk: 'Medium' as const,
    riskToken: 'var(--status-medium)',
    riskBg: 'var(--status-medium-bg)',
  },
  {
    platform: 'Twitter',
    initial: 'X',
    title: 'Clip Compilation — No License',
    risk: 'Low' as const,
    riskToken: 'var(--status-low)',
    riskBg: 'var(--status-low-bg)',
  },
]

const kpis = [
  { label: 'Active',   value: '47',    tokenColor: 'var(--status-critical)' },
  { label: 'Resolved', value: '1,247', tokenColor: 'var(--brand)'           },
  { label: 'Success',  value: '94.7%', tokenColor: 'var(--brand)'           },
]

export function DashboardPreviewCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 48, rotateY: -8 }}
      animate={{ opacity: 1, x: 0, rotateY: 0 }}
      transition={{ duration: 0.9, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative w-full max-w-md mx-auto lg:mx-0"
      style={{ perspective: '1200px' }}
    >
      <div className="relative hover:-translate-y-1 transition-transform duration-300">

        {/* Card */}
        <div className="relative rounded-2xl overflow-hidden card-surface shadow-2xl">

          {/* Top accent line — 1px brand only */}
          <div className="absolute top-0 left-0 right-0 h-px bg-[var(--brand)]" style={{ opacity: 0.5 }} />

          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]">
            <div className="flex items-center gap-2.5">
              {/* Static status dot — no ping */}
              <div className="w-2 h-2 rounded-full bg-[var(--brand)]" />
              <span className="text-[var(--text)] text-sm font-semibold tracking-tight">
                Threat Intelligence
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="tabular text-[11px] font-medium text-[var(--text-subtle)] uppercase tracking-wider">
                Live
              </span>
              <div className="w-2 h-2 rounded-full bg-[var(--brand)]" />
            </div>
          </div>

          {/* KPI strip */}
          <div className="grid grid-cols-3 divide-x divide-[var(--border)] border-b border-[var(--border)]">
            {kpis.map(({ label, value, tokenColor }) => (
              <div key={label} className="px-4 py-3 text-center">
                <div
                  className="tabular text-base font-medium"
                  style={{ color: tokenColor }}
                >
                  {value}
                </div>
                <div className="text-[10px] text-[var(--text-subtle)] uppercase tracking-wider mt-0.5">
                  {label}
                </div>
              </div>
            ))}
          </div>

          {/* Incident rows */}
          <div className="divide-y divide-[var(--border)]" style={{ borderColor: 'var(--border)' }}>
            {incidents.map((inc, i) => (
              <motion.div
                key={inc.title}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.55 + i * 0.07, duration: 0.4 }}
                className="flex items-center gap-3 px-5 py-3 hover:bg-[var(--surface-2)] transition-colors duration-[var(--dur-ui-fast)]"
              >
                {/* Platform badge */}
                <div
                  className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center text-xs font-bold"
                  style={{
                    background: inc.riskBg,
                    border: `1px solid ${inc.riskToken}`,
                    color: inc.riskToken,
                  }}
                >
                  {inc.initial}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-[var(--text)] font-medium truncate leading-tight">
                    {inc.title}
                  </div>
                  <div className="text-[10px] text-[var(--text-subtle)] mt-0.5">{inc.platform}</div>
                </div>

                {/* Risk badge */}
                <span
                  className="tabular text-[10px] px-2 py-0.5 rounded-full font-semibold flex-shrink-0"
                  style={{
                    background: inc.riskBg,
                    color: inc.riskToken,
                  }}
                >
                  {inc.risk}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Footer */}
          <div className="px-5 py-3 flex items-center justify-between bg-[var(--surface-2)] border-t border-[var(--border)]">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--brand)]" />
              <span className="text-[10px] text-[var(--text-subtle)]">Monitoring 1,000+ platforms</span>
            </div>
            <span className="tabular text-[11px] text-[var(--brand)] font-medium cursor-pointer hover:text-[var(--brand-strong)] transition-colors duration-[var(--dur-ui-fast)]">
              View all →
            </span>
          </div>

        </div>
      </div>
    </motion.div>
  )
}
