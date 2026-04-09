'use client'

import { motion } from 'framer-motion'

const incidents = [
  {
    platform: 'YouTube',
    initial: 'Y',
    title: 'Full Movie — Unauthorized Upload',
    risk: 'Critical' as const,
    color: '#ef4444',
  },
  {
    platform: 'Telegram',
    initial: 'T',
    title: 'Paid Course Bundle Leaked',
    risk: 'High' as const,
    color: '#f97316',
  },
  {
    platform: 'Reddit',
    initial: 'R',
    title: 'Ebook PDF Distribution',
    risk: 'Medium' as const,
    color: '#eab308',
  },
  {
    platform: 'Twitter',
    initial: 'X',
    title: 'Clip Compilation — No License',
    risk: 'Low' as const,
    color: '#22c55e',
  },
]

const riskStyle: Record<string, string> = {
  Critical: 'bg-red-500/15 text-red-400 border border-red-500/25',
  High:     'bg-orange-500/15 text-orange-400 border border-orange-500/25',
  Medium:   'bg-yellow-500/15 text-yellow-400 border border-yellow-500/25',
  Low:      'bg-green-500/15 text-green-400 border border-green-500/25',
}

const kpis = [
  { label: 'Active',    value: '47',    color: 'text-red-400' },
  { label: 'Resolved',  value: '1,209', color: 'text-teal-400' },
  { label: 'Success',   value: '95%',   color: 'text-cyan-400' },
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
      {/* Outer glow */}
      <div className="absolute -inset-4 bg-gradient-to-br from-teal-500/20 to-purple-500/10 rounded-3xl blur-2xl" />

      {/* Floating card */}
      <div className="animate-card-float relative">

        {/* Glass card */}
        <div
          className="relative rounded-2xl overflow-hidden shadow-2xl"
          style={{
            background: 'rgba(15, 23, 42, 0.85)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-500/60 to-transparent" />

          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.07]">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-2 h-2 rounded-full bg-teal-400" />
                <div className="absolute inset-0 rounded-full bg-teal-400 animate-ping opacity-50" />
              </div>
              <span className="text-white text-sm font-semibold tracking-tight">
                Threat Intelligence
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">
                Live
              </span>
              <div className="flex gap-1">
                <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
              </div>
            </div>
          </div>

          {/* KPI strip */}
          <div className="grid grid-cols-3 divide-x divide-white/[0.07] border-b border-white/[0.07]">
            {kpis.map(({ label, value, color }) => (
              <div key={label} className="px-4 py-3 text-center">
                <div className={`text-base font-bold tabular-nums ${color}`}>
                  {value}
                </div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider mt-0.5">
                  {label}
                </div>
              </div>
            ))}
          </div>

          {/* Incident rows */}
          <div className="divide-y divide-white/[0.05]">
            {incidents.map((inc, i) => (
              <motion.div
                key={inc.title}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.55 + i * 0.07, duration: 0.4 }}
                className="flex items-center gap-3 px-5 py-3 hover:bg-white/[0.03] transition-colors"
              >
                {/* Platform badge */}
                <div
                  className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center text-xs font-bold"
                  style={{
                    background: `${inc.color}18`,
                    border: `1px solid ${inc.color}35`,
                    color: inc.color,
                  }}
                >
                  {inc.initial}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-gray-100 font-medium truncate leading-tight">
                    {inc.title}
                  </div>
                  <div className="text-[10px] text-gray-500 mt-0.5">{inc.platform}</div>
                </div>

                {/* Risk badge */}
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-semibold flex-shrink-0 ${riskStyle[inc.risk]}`}
                >
                  {inc.risk}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Footer */}
          <div className="px-5 py-3 flex items-center justify-between bg-white/[0.03] border-t border-white/[0.05]">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-teal-400" />
              <span className="text-[10px] text-gray-500">Monitoring 1,000+ platforms</span>
            </div>
            <span className="text-[11px] text-teal-400 font-medium cursor-pointer hover:text-teal-300 transition-colors">
              View all →
            </span>
          </div>

          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
        </div>

        {/* Reflection / depth shadow */}
        <div
          className="absolute -bottom-6 left-4 right-4 h-12 rounded-full opacity-30"
          style={{
            background: 'radial-gradient(ellipse, rgba(20,184,166,0.4) 0%, transparent 70%)',
            filter: 'blur(8px)',
          }}
        />
      </div>
    </motion.div>
  )
}
