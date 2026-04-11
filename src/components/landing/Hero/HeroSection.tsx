'use client'

import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { DashboardPreviewCard } from './DashboardPreviewCard'
import { useDeviceCapabilities, useReducedMotion, useInView, useCountUp } from '@/hooks'

// Three.js — server-side forbidden
const Scene = dynamic(
  () => import('@/components/three/Scene').then((m) => m.Scene),
  { ssr: false, loading: () => null }
)

const stats = [
  { value: 1200000, display: (n: number) => `${(n / 1000000).toFixed(1)}M`, label: 'Takedowns processed' },
  { value: 47,      display: (n: number) => `${n}h`,                         label: 'Avg. removal time'  },
  { value: 15000,   display: (n: number) => `${(n / 1000).toFixed(0)}k+`,    label: 'Creators protected' },
]

type Tier = 1 | 2 | 3

function useTier(): { tier: Tier; isMobile: boolean; ready: boolean } {
  const [ready, setReady] = useState(false)
  const capabilities  = useDeviceCapabilities()
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    setReady(true)
  }, [])

  if (!ready) return { tier: 3, isMobile: false, ready: false }
  if (reducedMotion) return { tier: 3, isMobile: capabilities.isMobile, ready: true }

  const isLowEnd = (navigator.hardwareConcurrency || 4) < 2 ||
                   ((navigator as any).deviceMemory || 8) < 2

  const canRender3D = capabilities.hasWebGL && !isLowEnd

  return {
    tier: canRender3D ? 1 : 2,
    isMobile: capabilities.isMobile,
    ready: true,
  }
}

function HeroStat({
  value,
  display,
  label,
  delay,
  active,
}: {
  value: number
  display: (n: number) => string
  label: string
  delay: number
  active: boolean
}) {
  const count = useCountUp(value, 1800, active)
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="text-left"
    >
      <div className="tabular text-xl font-medium text-[var(--text)]">
        {display(count)}
      </div>
      <div className="text-[11px] text-[var(--text-subtle)] mt-0.5 uppercase tracking-wide">
        {label}
      </div>
    </motion.div>
  )
}

// GlowBackground is loaded only when 3D is not available
function GlowBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="hero-glow absolute inset-0" />
    </div>
  )
}

export function HeroSection() {
  const { tier, isMobile, ready } = useTier()
  const [inViewRef, isInView] = useInView<HTMLElement>({ threshold: 0.05 })

  return (
    <section
      ref={inViewRef}
      className="relative bg-[var(--bg)] overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0 hero-dot-grid opacity-60" />

      {/* Tier 1 — full 3D network */}
      {ready && tier === 1 && (
        <Scene isActive={isInView} isMobile={isMobile} />
      )}

      {/* Tier 2/3 — subtle glow */}
      {(!ready || tier >= 2) && <GlowBackground />}

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left column: text */}
          <div className="flex flex-col items-start">

            {/* Eyebrow badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-8 bg-[var(--brand-dim)] border border-[var(--brand)]/25"
            >
              {/* Static dot — no ping */}
              <span className="inline-flex rounded-full h-2 w-2 bg-[var(--brand)]" />
              <span className="text-[var(--brand)] text-xs font-semibold uppercase tracking-widest">
                AI-Powered Protection
              </span>
            </motion.div>

            {/* Headline — no gradient text */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[var(--text-display-xl)] font-medium text-[var(--text)] leading-[0.95] tracking-[-0.04em] mb-6"
              style={{ fontFamily: 'var(--font-display-loaded, var(--font-sans-loaded, system-ui))' }}
            >
              Detect Piracy.
              <br />
              <em className="not-italic text-[var(--brand)]">Protect Revenue.</em>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-[var(--text-muted)] mb-10 max-w-lg leading-relaxed prose"
            >
              Monitor 1,000+ platforms in real-time. Detected the moment
              unauthorized copies appear — takedowns fired before they spread.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 mb-10"
            >
              <Link
                href="/signup"
                className="btn-press inline-flex items-center justify-center gap-2 px-7 py-3.5 font-semibold text-white rounded-xl bg-[var(--brand)] hover:bg-[var(--brand-strong)] transition-colors duration-[var(--dur-ui-fast)]"
              >
                Start Free Trial
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>

              <Link
                href="#demo"
                className="btn-press inline-flex items-center justify-center gap-2 px-7 py-3.5 font-semibold text-[var(--text-muted)] rounded-xl bg-[var(--surface)] border border-[var(--border)] hover:text-[var(--text)] hover:border-[var(--border-strong)] transition-colors duration-[var(--dur-ui-fast)]"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Watch Demo
              </Link>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex items-center gap-8 pt-8 border-t border-[var(--border)]"
            >
              {stats.map((stat, i) => (
                <HeroStat
                  key={stat.label}
                  value={stat.value}
                  display={stat.display}
                  label={stat.label}
                  delay={0.55 + i * 0.08}
                  active={true}
                />
              ))}
            </motion.div>
          </div>

          {/* Right column: dashboard card */}
          <div className="hidden lg:flex items-center justify-center lg:justify-end">
            <DashboardPreviewCard />
          </div>

        </div>
      </div>

      {/* Bottom fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--bg)] to-transparent pointer-events-none" />
    </section>
  )
}
