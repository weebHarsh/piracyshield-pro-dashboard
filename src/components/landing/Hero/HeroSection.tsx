'use client'

import dynamic from 'next/dynamic'
import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { GlowBackground } from './GlowBackground'
import { DashboardPreviewCard } from './DashboardPreviewCard'
import { useDeviceCapabilities, useReducedMotion, useInView, useCountUp } from '@/hooks'

// Three.js — server-side forbidden
const Scene = dynamic(
  () => import('@/components/three/Scene').then((m) => m.Scene),
  { ssr: false, loading: () => null }
)

const stats = [
  { value: 2847, display: (n: number) => `${n.toLocaleString()}+`, label: 'Threats detected' },
  { value: 95,   display: (n: number) => `${n}%`,                  label: 'Takedown success' },
  { value: 15000,display: (n: number) => `${(n / 1000).toFixed(0)}k+`, label: 'Creators protected' },
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
      <div className="text-2xl font-bold text-white tabular-nums">
        {display(count)}
      </div>
      <div className="text-xs text-gray-500 mt-0.5 uppercase tracking-wide">
        {label}
      </div>
    </motion.div>
  )
}

export function HeroSection() {
  const { tier, isMobile, ready } = useTier()
  const [inViewRef, isInView] = useInView<HTMLElement>({ threshold: 0.05 })

  return (
    <section
      ref={inViewRef}
      className="relative bg-[#060d1a] overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0 hero-dot-grid opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-br from-teal-950/40 via-transparent to-purple-950/30" />

      {/* Tier 1 — full 3D network */}
      {ready && tier === 1 && (
        <Scene isActive={isInView} isMobile={isMobile} />
      )}

      {/* Tier 2 — glow orbs */}
      {(!ready || tier === 2) && <GlowBackground />}

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
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-8 bg-teal-500/[0.08] border border-teal-500/20"
            >
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-400" />
              </div>
              <span className="text-teal-400 text-xs font-semibold uppercase tracking-widest">
                AI-Powered Piracy Detection
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-6"
            >
              Detect Piracy.
              <br />
              <span className="bg-gradient-to-br from-teal-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Protect Revenue.
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-gray-400 mb-10 max-w-lg leading-relaxed"
            >
              Monitor 1,000+ platforms in real-time. AI detects unauthorized
              copies the moment they appear — and automatically fires takedowns
              before they spread.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 mb-14"
            >
              <motion.div
                animate={{
                  boxShadow: [
                    '0 0 0 1px rgba(20,184,166,0.3), 0 8px 24px rgba(20,184,166,0.25)',
                    '0 0 0 1px rgba(20,184,166,0.5), 0 12px 32px rgba(20,184,166,0.45)',
                    '0 0 0 1px rgba(20,184,166,0.3), 0 8px 24px rgba(20,184,166,0.25)',
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="rounded-xl"
              >
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 font-semibold text-white rounded-xl bg-gradient-to-br from-teal-800 to-teal-600 transition-all duration-200 hover:brightness-110"
                >
                  Start Free Trial
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </motion.div>

              <Link
                href="#demo"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 font-semibold text-gray-300 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-sm transition-all duration-200 hover:text-white hover:bg-white/[0.06]"
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
              className="flex items-center gap-8 pt-8 border-t border-white/[0.07]"
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
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#060d1a] to-transparent pointer-events-none" />
    </section>
  )
}
