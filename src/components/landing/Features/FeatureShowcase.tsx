'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// ─── Feature data ─────────────────────────────────────────────────────────────

const features = [
  {
    id: 'detection',
    eyebrow: '01 — Detection',
    title: 'Caught before it spreads',
    body: 'ML models scan 1,000+ platforms around the clock, fingerprinting audio, video, and text. Unauthorized copies surface within minutes of being posted — not after the damage is done.',
    stat: { value: '18 min', label: 'avg. detection lag' },
    artifact: 'scan-feed',
  },
  {
    id: 'takedowns',
    eyebrow: '02 — Enforcement',
    title: 'DMCA on autopilot',
    body: 'Once a violation is confirmed, a legally-sound notice is drafted, filed, and tracked automatically. No manual queues, no missed windows, no expensive counsel for routine removals.',
    stat: { value: '94.7%', label: 'takedown success rate' },
    artifact: 'dmca-preview',
  },
  {
    id: 'monitoring',
    eyebrow: '03 — Coverage',
    title: 'Nothing slips through',
    body: 'Streaming sites, torrent trackers, social platforms, cyberlockers, private Telegram channels. Coverage is continuous — not a point-in-time scan. You see what we see, as we see it.',
    stat: { value: '1,247+', label: 'platforms monitored' },
    artifact: 'coverage',
  },
  {
    id: 'analytics',
    eyebrow: '04 — Reporting',
    title: 'Data your legal team can use',
    body: 'Incident trends, geographic distribution, takedown timelines, revenue impact estimates. Every event is logged, every state change is auditable. Export-ready for counsel or board decks.',
    stat: { value: '100%', label: 'audit log completeness' },
    artifact: 'analytics',
  },
]

// ─── Rendered artifacts ───────────────────────────────────────────────────────

function ScanFeedArtifact() {
  const hits = [
    { domain: 'stream-vault-0412.net', match: '97.2%', type: 'Video', time: '2m ago' },
    { domain: 'bayshore-mirror.io',    match: '99.1%', type: 'Video', time: '8m ago' },
    { domain: 'filmdb-cdn.cc',         match: '94.8%', type: 'Video', time: '19m ago' },
  ]
  return (
    <div className="card-surface rounded-xl overflow-hidden">
      <div className="px-4 py-2.5 border-b border-[var(--border)] flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-[var(--brand)]" />
        <span className="text-[11px] text-[var(--text-subtle)] uppercase tracking-wider">Scan feed — live</span>
      </div>
      {hits.map((hit, i) => (
        <div key={hit.domain} className={`flex items-center gap-3 px-4 py-3 ${i < hits.length - 1 ? 'border-b border-[var(--border)]' : ''}`}>
          <div className="flex-1 min-w-0">
            <div className="tabular text-xs text-[var(--text)] font-medium truncate">{hit.domain}</div>
            <div className="text-[10px] text-[var(--text-subtle)] mt-0.5">{hit.type} · {hit.time}</div>
          </div>
          <span className="tabular text-xs font-medium" style={{ color: 'var(--status-critical)' }}>{hit.match}</span>
        </div>
      ))}
    </div>
  )
}

function DmcaPreviewArtifact() {
  return (
    <div className="card-surface rounded-xl overflow-hidden">
      <div className="px-4 py-2.5 border-b border-[var(--border)]">
        <span className="text-[11px] text-[var(--text-subtle)] uppercase tracking-wider">DMCA Notice — Auto-generated</span>
      </div>
      <div className="px-4 py-3 space-y-2.5">
        <div className="grid grid-cols-[80px_1fr] gap-2 text-xs">
          <span className="text-[var(--text-subtle)]">Status</span>
          <span className="tabular font-medium" style={{ color: 'var(--status-low)' }}>Filed · Acknowledged</span>
        </div>
        <div className="grid grid-cols-[80px_1fr] gap-2 text-xs">
          <span className="text-[var(--text-subtle)]">Platform</span>
          <span className="text-[var(--text)]">YouTube</span>
        </div>
        <div className="grid grid-cols-[80px_1fr] gap-2 text-xs">
          <span className="text-[var(--text-subtle)]">Filed</span>
          <span className="tabular text-[var(--text-muted)]">2026-04-03 · 09:41 UTC</span>
        </div>
        <div className="grid grid-cols-[80px_1fr] gap-2 text-xs">
          <span className="text-[var(--text-subtle)]">Removed</span>
          <span className="tabular text-[var(--text-muted)]">2026-04-04 · 14:18 UTC</span>
        </div>
      </div>
      <div className="px-4 py-2.5 border-t border-[var(--border)] bg-[var(--surface-2)]">
        <span className="tabular text-[10px] text-[var(--text-subtle)]">Response in 28h 37m — 94.7% of notices resolve within 48h</span>
      </div>
    </div>
  )
}

function CoverageArtifact() {
  const platforms = [
    { name: 'Streaming', count: 412,  pct: 88 },
    { name: 'Torrents',  count: 287,  pct: 72 },
    { name: 'Social',    count: 341,  pct: 94 },
    { name: 'Cyberlock', count: 207,  pct: 65 },
  ]
  return (
    <div className="card-surface rounded-xl overflow-hidden">
      <div className="px-4 py-2.5 border-b border-[var(--border)]">
        <span className="text-[11px] text-[var(--text-subtle)] uppercase tracking-wider">Platform coverage</span>
      </div>
      {platforms.map((p, i) => (
        <div key={p.name} className={`px-4 py-3 ${i < platforms.length - 1 ? 'border-b border-[var(--border)]' : ''}`}>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-[var(--text-muted)]">{p.name}</span>
            <div className="flex items-center gap-2">
              <span className="tabular text-[10px] text-[var(--text-subtle)]">{p.count} incidents</span>
              <span className="tabular text-xs font-medium text-[var(--brand)]">{p.pct}%</span>
            </div>
          </div>
          <div className="h-1 rounded-full bg-[var(--surface-3)]">
            <div className="h-full rounded-full bg-[var(--brand)]" style={{ width: `${p.pct}%` }} />
          </div>
        </div>
      ))}
    </div>
  )
}

function AnalyticsArtifact() {
  const weeks = [
    { label: 'W14', detected: 132, removed: 45 },
    { label: 'W15', detected: 145, removed: 52 },
    { label: 'W16', detected: 128, removed: 38 },
    { label: 'W17', detected: 167, removed: 61 },
    { label: 'W18', detected: 142, removed: 48 },
  ]
  const max = 180
  return (
    <div className="card-surface rounded-xl overflow-hidden">
      <div className="px-4 py-2.5 border-b border-[var(--border)] flex items-center justify-between">
        <span className="text-[11px] text-[var(--text-subtle)] uppercase tracking-wider">Weekly incidents</span>
        <div className="flex items-center gap-3 text-[10px] text-[var(--text-subtle)]">
          <span className="flex items-center gap-1"><span className="inline-block w-2 h-2 rounded-sm bg-[var(--brand)]" /> Detected</span>
          <span className="flex items-center gap-1"><span className="inline-block w-2 h-2 rounded-sm" style={{ background: 'var(--status-high)' }} /> Removed</span>
        </div>
      </div>
      <div className="px-4 py-4">
        <div className="flex items-end gap-2 h-16">
          {weeks.map((w) => (
            <div key={w.label} className="flex-1 flex flex-col items-center gap-0.5">
              <div className="w-full flex items-end gap-0.5" style={{ height: '48px' }}>
                <div className="flex-1 rounded-sm bg-[var(--brand)]" style={{ height: `${(w.detected / max) * 48}px`, opacity: 0.8 }} />
                <div className="flex-1 rounded-sm" style={{ height: `${(w.removed / max) * 48}px`, background: 'var(--status-high)', opacity: 0.8 }} />
              </div>
              <span className="tabular text-[9px] text-[var(--text-subtle)]">{w.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Artifact({ id }: { id: string }) {
  if (id === 'detection')  return <ScanFeedArtifact />
  if (id === 'takedowns')  return <DmcaPreviewArtifact />
  if (id === 'monitoring') return <CoverageArtifact />
  if (id === 'analytics')  return <AnalyticsArtifact />
  return null
}

// ─── Feature row ──────────────────────────────────────────────────────────────

function FeatureRow({ feature, index }: { feature: typeof features[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const isEven = index % 2 === 0

  return (
    <div ref={ref} className="grid grid-cols-1 lg:grid-cols-[5fr_4fr] gap-10 lg:gap-16 items-center py-16 border-b border-[var(--border)] last:border-0">

      {/* Text side — always col-1, swap order on even rows via CSS */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={isEven ? 'lg:order-1' : 'lg:order-2'}
      >
        <p className="tabular text-xs text-[var(--brand)] font-medium uppercase tracking-widest mb-3">
          {feature.eyebrow}
        </p>
        <h3
          className="text-[var(--text-display-m)] font-medium text-[var(--text)] leading-[1.15] tracking-[-0.02em] mb-4"
          style={{ fontFamily: 'var(--font-display-loaded, var(--font-sans-loaded, system-ui))' }}
        >
          {feature.title}
        </h3>
        <p className="text-[var(--text-muted)] leading-relaxed max-w-[55ch] text-base mb-6">
          {feature.body}
        </p>
        <div className="inline-flex items-baseline gap-2">
          <span className="tabular text-2xl font-medium text-[var(--text)] tracking-tight">
            {feature.stat.value}
          </span>
          <span className="text-xs text-[var(--text-subtle)] uppercase tracking-wide">
            {feature.stat.label}
          </span>
        </div>
      </motion.div>

      {/* Artifact side */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={isEven ? 'lg:order-2' : 'lg:order-1'}
      >
        <Artifact id={feature.id} />
      </motion.div>

    </div>
  )
}

// ─── Main section ─────────────────────────────────────────────────────────────

export function FeatureShowcase() {
  const titleRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(titleRef, { once: true, margin: '-80px' })

  return (
    <section id="features" className="relative py-16 bg-[var(--bg)]">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section title — left-aligned, not centered */}
        <div ref={titleRef} className="mb-4">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.4 }}
            className="tabular text-[var(--brand)] text-xs font-medium uppercase tracking-widest mb-3"
          >
            Why PiracyShield
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[var(--text-display-l)] font-medium text-[var(--text)] leading-[1.05] tracking-[-0.03em] max-w-2xl"
            style={{ fontFamily: 'var(--font-display-loaded, var(--font-sans-loaded, system-ui))' }}
          >
            Built for operations,<br />not demos.
          </motion.h2>
        </div>

        {/* Feature rows */}
        <div>
          {features.map((feature, index) => (
            <FeatureRow key={feature.id} feature={feature} index={index} />
          ))}
        </div>

      </div>
    </section>
  )
}
