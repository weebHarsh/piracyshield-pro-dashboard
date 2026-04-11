'use client'

import { useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

// ─── Tab definitions ──────────────────────────────────────────────────────────

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

// ─── Incidents tab ────────────────────────────────────────────────────────────

const incidents = [
  { platform: 'YouTube',  initial: 'Y', title: 'Studio Alpha S02E04 — Pre-release Leak',  risk: 'critical', time: '2m ago',  status: 'Takedown sent'  },
  { platform: 'Telegram', initial: 'T', title: 'Project Helios OST — Full Album Dump',    risk: 'high',     time: '8m ago',  status: 'Processing'     },
  { platform: 'Reddit',   initial: 'R', title: 'Meridian Suite — Installer + Crack',      risk: 'medium',   time: '19m ago', status: 'Detected'       },
  { platform: 'Discord',  initial: 'D', title: 'Clip Compilation — Unlicensed Use',       risk: 'low',      time: '1h ago',  status: 'Monitoring'     },
]

const riskToken: Record<string, string> = {
  critical: 'var(--status-critical)',
  high:     'var(--status-high)',
  medium:   'var(--status-medium)',
  low:      'var(--status-low)',
}
const riskBgToken: Record<string, string> = {
  critical: 'var(--status-critical-bg)',
  high:     'var(--status-high-bg)',
  medium:   'var(--status-medium-bg)',
  low:      'var(--status-low-bg)',
}

function IncidentsTab() {
  return (
    <div>
      <div className="flex items-center gap-6 mb-4 px-1">
        {[
          { label: 'Critical', value: '12', color: 'var(--status-critical)' },
          { label: 'High',     value: '48', color: 'var(--status-high)'     },
          { label: 'Total',    value: '2,847', color: 'var(--text-muted)'   },
        ].map((s) => (
          <div key={s.label} className="flex items-center gap-1.5">
            <span className="tabular text-sm font-medium" style={{ color: s.color }}>{s.value}</span>
            <span className="text-xs text-[var(--text-subtle)]">{s.label}</span>
          </div>
        ))}
        <div className="ml-auto flex items-center gap-1.5">
          {/* Static dot — no pulse */}
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--brand)]" />
          <span className="tabular text-xs text-[var(--brand)]">Live</span>
        </div>
      </div>

      <div className="card-surface rounded-xl overflow-hidden">
        {incidents.map((inc, i) => (
          <div
            key={inc.title}
            className={`flex items-center gap-3 px-4 py-3 ${i < incidents.length - 1 ? 'border-b border-[var(--border)]' : ''}`}
          >
            <div
              className="w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center text-[11px] font-bold"
              style={{ background: riskBgToken[inc.risk], border: `1px solid ${riskToken[inc.risk]}`, color: riskToken[inc.risk] }}
            >
              {inc.initial}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs text-[var(--text)] font-medium truncate">{inc.title}</div>
              <div className="tabular text-[10px] text-[var(--text-subtle)] mt-0.5">{inc.platform} · {inc.time}</div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-[10px] text-[var(--text-subtle)] hidden sm:block">{inc.status}</span>
              <span
                className="tabular text-[10px] px-2 py-0.5 rounded-full font-medium flex-shrink-0"
                style={{ background: riskBgToken[inc.risk], color: riskToken[inc.risk] }}
              >
                {inc.risk.charAt(0).toUpperCase() + inc.risk.slice(1)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Takedowns tab ────────────────────────────────────────────────────────────

const takedowns = [
  { platform: 'YouTube',   count: 847, resolved: 812, pending: 35 },
  { platform: 'Telegram',  count: 621, resolved: 589, pending: 32 },
  { platform: 'Reddit',    count: 412, resolved: 401, pending: 11 },
  { platform: 'Twitter/X', count: 298, resolved: 271, pending: 27 },
]

function TakedownsTab() {
  return (
    <div>
      <div className="flex items-center gap-6 mb-4 px-1">
        {[
          { label: 'Total filed',  value: '12,453', color: 'var(--text-muted)'   },
          { label: 'Success rate', value: '94.7%',  color: 'var(--brand)'        },
          { label: 'Pending',      value: '234',    color: 'var(--status-medium)' },
        ].map((s) => (
          <div key={s.label} className="flex items-center gap-1.5">
            <span className="tabular text-sm font-medium" style={{ color: s.color }}>{s.value}</span>
            <span className="text-xs text-[var(--text-subtle)]">{s.label}</span>
          </div>
        ))}
      </div>
      <div className="card-surface rounded-xl overflow-hidden">
        {takedowns.map((t, i) => {
          const pct = Math.round((t.resolved / t.count) * 100)
          return (
            <div
              key={t.platform}
              className={`px-4 py-3 ${i < takedowns.length - 1 ? 'border-b border-[var(--border)]' : ''}`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-[var(--text-muted)] font-medium">{t.platform}</span>
                <div className="flex items-center gap-3">
                  <span className="tabular text-[10px] text-[var(--text-subtle)]">{t.resolved.toLocaleString()} resolved</span>
                  <span className="tabular text-xs font-medium text-[var(--brand)]">{pct}%</span>
                </div>
              </div>
              <div className="h-1 rounded-full bg-[var(--surface-3)]">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 1, delay: i * 0.1, ease: 'easeOut' }}
                  className="h-full rounded-full bg-[var(--brand)]"
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Analytics tab ────────────────────────────────────────────────────────────

const platformStats = [
  { name: 'YouTube',  incidents: 847, share: 33 },
  { name: 'Telegram', incidents: 621, share: 24 },
  { name: 'Reddit',   incidents: 412, share: 16 },
  { name: 'Twitter',  incidents: 298, share: 12 },
  { name: 'Discord',  incidents: 203, share: 8  },
]

function AnalyticsTab() {
  return (
    <div>
      <div className="flex items-center gap-6 mb-4 px-1">
        {[
          { label: 'Platforms', value: '1,247', color: 'var(--status-info)'   },
          { label: 'Countries', value: '89',    color: 'var(--text-muted)'    },
          { label: 'This week', value: '+12%',  color: 'var(--brand)'         },
        ].map((s) => (
          <div key={s.label} className="flex items-center gap-1.5">
            <span className="tabular text-sm font-medium" style={{ color: s.color }}>{s.value}</span>
            <span className="text-xs text-[var(--text-subtle)]">{s.label}</span>
          </div>
        ))}
      </div>
      <div className="card-surface rounded-xl overflow-hidden">
        {platformStats.map((p, i) => (
          <div
            key={p.name}
            className={`flex items-center gap-3 px-4 py-3 ${i < platformStats.length - 1 ? 'border-b border-[var(--border)]' : ''}`}
          >
            <span className="text-xs text-[var(--text-muted)] w-16 flex-shrink-0">{p.name}</span>
            <div className="flex-1 h-1.5 rounded-full bg-[var(--surface-3)]">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${p.share * 3}%` }}
                transition={{ duration: 0.9, delay: i * 0.08, ease: 'easeOut' }}
                className="h-full rounded-full bg-[var(--brand)]"
              />
            </div>
            <span className="tabular text-xs text-[var(--text-subtle)] w-12 text-right">{p.incidents.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export function LiveDemo() {
  const sectionRef  = useRef<HTMLElement>(null)
  const isInView    = useInView(sectionRef, { once: true, margin: '-100px' })
  const titleRef    = useRef<HTMLDivElement>(null)
  const isTitleInView = useInView(titleRef, { once: true, margin: '-80px' })
  const [activeTab, setActiveTab] = useState('incidents')

  return (
    <section ref={sectionRef} id="demo" className="relative py-24 bg-[var(--bg)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section title */}
        <div ref={titleRef} className="mb-12">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.4 }}
            className="tabular text-[var(--brand)] text-xs font-medium uppercase tracking-widest mb-3"
          >
            Live Dashboard Preview
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[var(--text-display-l)] font-medium text-[var(--text)] leading-[1.05] tracking-[-0.03em]"
            style={{ fontFamily: 'var(--font-display-loaded, var(--font-sans-loaded, system-ui))' }}
          >
            See PiracyShield in action.
          </motion.h2>
        </div>

        {/* Browser window */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="rounded-2xl overflow-hidden shadow-2xl card-surface"
        >
          {/* Browser chrome */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border)] bg-[var(--surface-2)]">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[var(--status-critical)] opacity-60" />
              <div className="w-2.5 h-2.5 rounded-full bg-[var(--status-medium)] opacity-60" />
              <div className="w-2.5 h-2.5 rounded-full bg-[var(--status-low)] opacity-60" />
            </div>
            <div className="flex-1 mx-4">
              <div className="rounded-md px-3 py-1 text-xs text-[var(--text-subtle)] text-center bg-[var(--surface)] border border-[var(--border)]">
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
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium transition-colors duration-[var(--dur-ui-fast)] border ${
                    activeTab === tab.id
                      ? 'bg-[var(--brand-dim)] text-[var(--brand)] border-[var(--brand)]/30'
                      : 'text-[var(--text-subtle)] hover:text-[var(--text-muted)] bg-[var(--surface-2)] border-[var(--border)]'
                  }`}
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
                {activeTab === 'incidents'  && <IncidentsTab />}
                {activeTab === 'takedowns'  && <TakedownsTab />}
                {activeTab === 'analytics'  && <AnalyticsTab />}
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
            href="/login"
            className="btn-press inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-[var(--text-muted)] hover:text-[var(--text)] rounded-xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--border-strong)] transition-colors duration-[var(--dur-ui-fast)]"
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
