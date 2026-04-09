'use client'

import { useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

// ─── Tab definitions ────────────────────────────────────────────────────────

const tabs = [
  {
    id: 'incidents',
    label: 'Incidents',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
        <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    ),
  },
  {
    id: 'takedowns',
    label: 'Takedowns',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <polyline points="9 12 11 14 15 10"/>
      </svg>
    ),
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>
      </svg>
    ),
  },
]

// ─── Risk badge ──────────────────────────────────────────────────────────────

const riskStyle: Record<string, { bg: string; text: string; label: string }> = {
  critical: { bg: 'rgba(239,68,68,0.12)',  text: '#f87171', label: 'Critical' },
  high:     { bg: 'rgba(249,115,22,0.12)', text: '#fb923c', label: 'High'     },
  medium:   { bg: 'rgba(234,179,8,0.12)',  text: '#facc15', label: 'Medium'   },
  low:      { bg: 'rgba(34,197,94,0.12)',  text: '#4ade80', label: 'Low'      },
}

function RiskBadge({ level }: { level: keyof typeof riskStyle }) {
  const s = riskStyle[level]
  return (
    <span
      className="text-[10px] px-2 py-0.5 rounded-full font-semibold flex-shrink-0"
      style={{ background: s.bg, color: s.text, border: `1px solid ${s.text}30` }}
    >
      {s.label}
    </span>
  )
}

// ─── Incidents tab ───────────────────────────────────────────────────────────

const incidents = [
  { platform: 'YouTube',  initial: 'Y', color: '#ef4444', title: 'Full Movie — Unauthorized Upload',  risk: 'critical' as const, time: '2m ago',  status: 'Takedown sent' },
  { platform: 'Telegram', initial: 'T', color: '#38bdf8', title: 'Paid Course Bundle Distributed',    risk: 'high'     as const, time: '8m ago',  status: 'Processing'    },
  { platform: 'Reddit',   initial: 'R', color: '#fb923c', title: 'Ebook PDF Shared Publicly',         risk: 'medium'   as const, time: '19m ago', status: 'Detected'      },
  { platform: 'Discord',  initial: 'D', color: '#818cf8', title: 'Screen Recording Clip — No License',risk: 'low'      as const, time: '1h ago',  status: 'Monitoring'    },
]

function IncidentsTab() {
  return (
    <div>
      {/* Summary strip */}
      <div className="flex items-center gap-6 mb-4 px-1">
        {[
          { label: 'Critical', value: '12', color: '#f87171' },
          { label: 'High',     value: '48', color: '#fb923c' },
          { label: 'Total',    value: '2,847', color: '#94a3b8' },
        ].map((s) => (
          <div key={s.label} className="flex items-center gap-1.5">
            <span className="text-sm font-bold tabular-nums" style={{ color: s.color }}>{s.value}</span>
            <span className="text-xs text-gray-500">{s.label}</span>
          </div>
        ))}
        <div className="ml-auto flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
          <span className="text-xs text-teal-400">Live</span>
        </div>
      </div>

      {/* Incident rows */}
      <div
        className="card-surface rounded-xl overflow-hidden"
      >
        {incidents.map((inc, i) => (
          <div
            key={inc.title}
            className={`flex items-center gap-3 px-4 py-3 ${i < incidents.length - 1 ? 'border-b' : ''}`}
            style={{ borderColor: 'rgba(255,255,255,0.06)' }}
          >
            <div
              className="w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center text-[11px] font-bold"
              style={{ background: `${inc.color}15`, border: `1px solid ${inc.color}30`, color: inc.color }}
            >
              {inc.initial}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs text-gray-200 font-medium truncate">{inc.title}</div>
              <div className="text-[10px] text-gray-500 mt-0.5">{inc.platform} · {inc.time}</div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-[10px] text-gray-500 hidden sm:block">{inc.status}</span>
              <RiskBadge level={inc.risk} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Takedowns tab ───────────────────────────────────────────────────────────

const takedowns = [
  { platform: 'YouTube',     count: 847,   resolved: 812,  pending: 35  },
  { platform: 'Telegram',    count: 621,   resolved: 589,  pending: 32  },
  { platform: 'Reddit',      count: 412,   resolved: 401,  pending: 11  },
  { platform: 'Twitter/X',   count: 298,   resolved: 271,  pending: 27  },
]

function TakedownsTab() {
  return (
    <div>
      <div className="flex items-center gap-6 mb-4 px-1">
        {[
          { label: 'Total filed',   value: '12,453', color: '#94a3b8' },
          { label: 'Success rate',  value: '95%',    color: '#34d399' },
          { label: 'Pending',       value: '234',    color: '#facc15' },
        ].map((s) => (
          <div key={s.label} className="flex items-center gap-1.5">
            <span className="text-sm font-bold tabular-nums" style={{ color: s.color }}>{s.value}</span>
            <span className="text-xs text-gray-500">{s.label}</span>
          </div>
        ))}
      </div>
      <div
        className="card-surface rounded-xl overflow-hidden"
      >
        {takedowns.map((t, i) => {
          const pct = Math.round((t.resolved / t.count) * 100)
          return (
            <div
              key={t.platform}
              className={`px-4 py-3 ${i < takedowns.length - 1 ? 'border-b' : ''}`}
              style={{ borderColor: 'rgba(255,255,255,0.06)' }}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-gray-300 font-medium">{t.platform}</span>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-gray-500">{t.resolved.toLocaleString()} resolved</span>
                  <span className="text-xs font-semibold text-teal-400">{pct}%</span>
                </div>
              </div>
              <div className="h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 1, delay: i * 0.1, ease: 'easeOut' }}
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg, #14b8a6, #06b6d4)' }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Analytics tab ───────────────────────────────────────────────────────────

const platformStats = [
  { name: 'YouTube',   incidents: 847,  share: 33 },
  { name: 'Telegram',  incidents: 621,  share: 24 },
  { name: 'Reddit',    incidents: 412,  share: 16 },
  { name: 'Twitter',   incidents: 298,  share: 12 },
  { name: 'Discord',   incidents: 203,  share: 8  },
]

function AnalyticsTab() {
  return (
    <div>
      <div className="flex items-center gap-6 mb-4 px-1">
        {[
          { label: 'Platforms',  value: '1,247', color: '#818cf8' },
          { label: 'Countries',  value: '89',    color: '#38bdf8' },
          { label: 'This week',  value: '+12%',  color: '#34d399' },
        ].map((s) => (
          <div key={s.label} className="flex items-center gap-1.5">
            <span className="text-sm font-bold tabular-nums" style={{ color: s.color }}>{s.value}</span>
            <span className="text-xs text-gray-500">{s.label}</span>
          </div>
        ))}
      </div>
      <div
        className="card-surface rounded-xl overflow-hidden"
      >
        {platformStats.map((p, i) => (
          <div
            key={p.name}
            className={`flex items-center gap-3 px-4 py-3 ${i < platformStats.length - 1 ? 'border-b' : ''}`}
            style={{ borderColor: 'rgba(255,255,255,0.06)' }}
          >
            <span className="text-xs text-gray-400 w-16 flex-shrink-0">{p.name}</span>
            <div className="flex-1 h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.07)' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${p.share * 3}%` }}
                transition={{ duration: 0.9, delay: i * 0.08, ease: 'easeOut' }}
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #818cf8, #14b8a6)' }}
              />
            </div>
            <span className="text-xs text-gray-500 w-12 text-right tabular-nums">{p.incidents.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Main component ──────────────────────────────────────────────────────────

export function LiveDemo() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView   = useInView(sectionRef, { once: true, margin: '-100px' })
  const titleRef   = useRef<HTMLDivElement>(null)
  const isTitleInView = useInView(titleRef, { once: true, margin: '-80px' })
  const [activeTab, setActiveTab] = useState('incidents')

  return (
    <section ref={sectionRef} id="demo" className="relative py-24 bg-[#060d1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section title */}
        <div ref={titleRef} className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.4 }}
            className="text-teal-400 text-xs font-semibold uppercase tracking-widest mb-4"
          >
            Live Dashboard Preview
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
          >
            See PiracyShield{' '}
            <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
              In Action
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            A glimpse into the dashboard used by content teams to monitor and act on piracy daily.
          </motion.p>
        </div>

        {/* Browser window */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="rounded-2xl overflow-hidden shadow-2xl card-surface-elevated"
        >
          {/* Browser chrome */}
          <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ background: 'rgba(15,23,42,0.98)', borderColor: 'rgba(255,255,255,0.07)' }}>
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
            </div>
            <div className="flex-1 mx-4">
              <div className="rounded-md px-3 py-1 text-xs text-gray-500 text-center" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)' }}>
                app.piracyshield.pro/dashboard
              </div>
            </div>
          </div>

          {/* Dashboard body */}
          <div className="p-5 sm:p-6">
            {/* Tabs */}
            <div className="flex gap-2 mb-5">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-teal-500/15 text-teal-400'
                      : 'text-gray-500 hover:text-gray-300'
                  }`}
                  style={{
                    border: activeTab === tab.id
                      ? '1px solid rgba(20,184,166,0.35)'
                      : '1px solid rgba(255,255,255,0.07)',
                    background: activeTab !== tab.id ? 'rgba(255,255,255,0.02)' : undefined,
                  }}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === 'incidents' && <IncidentsTab />}
                {activeTab === 'takedowns' && <TakedownsTab />}
                {activeTab === 'analytics' && <AnalyticsTab />}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-8"
        >
          <a
            href="/signup"
            className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-white rounded-xl transition-all"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
          >
            Try the Full Dashboard
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
