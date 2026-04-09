'use client'

import dynamic from 'next/dynamic'
import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { GlowBackground } from './GlowBackground'
import { DashboardPreviewCard } from './DashboardPreviewCard'
import { useDeviceCapabilities, useReducedMotion, useInView } from '@/hooks'

// Three.js — server-side forbidden
const Scene = dynamic(
  () => import('@/components/three/Scene').then((m) => m.Scene),
  { ssr: false, loading: () => null }
)

const stats = [
  { value: '2,847+', label: 'Threats detected' },
  { value: '95%',    label: 'Takedown success' },
  { value: '15k+',   label: 'Creators protected' },
]

type Tier = 1 | 2 | 3

function useTier(): { tier: Tier; isMobile: boolean; ready: boolean } {
  // Prevent hydration mismatch — render nothing until client capabilities known
  const [ready, setReady] = useState(false)
  const capabilities  = useDeviceCapabilities()
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    setReady(true)
  }, [])

  if (!ready) return { tier: 3, isMobile: false, ready: false }
  if (reducedMotion) return { tier: 3, isMobile: capabilities.isMobile, ready: true }

  // isLowEnd threshold: < 2 cores or < 2GB RAM (more lenient than before)
  const isLowEnd = (navigator.hardwareConcurrency || 4) < 2 ||
                   ((navigator as any).deviceMemory || 8) < 2

  const canRender3D = capabilities.hasWebGL && !isLowEnd

  return {
    tier: canRender3D ? 1 : 2,
    isMobile: capabilities.isMobile,
    ready: true,
  }
}

export function HeroSection() {
  const { tier, isMobile, ready } = useTier()
  const [inViewRef, isInView] = useInView<HTMLElement>({ threshold: 0.05 })

  return (
    <section
      ref={inViewRef}
      className="relative min-h-screen bg-[#060d1a] flex items-center overflow-hidden"
    >
      {/* === Background layers === */}

      {/* Dot grid — always visible */}
      <div className="absolute inset-0 hero-dot-grid opacity-60" />

      {/* Ambient gradient sweeps */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-950/40 via-transparent to-purple-950/30" />

      {/* Tier 1 — full 3D network */}
      {ready && tier === 1 && (
        <Scene isActive={isInView} isMobile={isMobile} />
      )}

      {/* Tier 2 — glow orbs (low-end / no WebGL) */}
      {(!ready || tier === 2) && <GlowBackground />}

      {/* Tier 3 — reduced motion: just the gradients above, nothing extra */}

      {/* === Content === */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-screen lg:py-20">

          {/* ── Left column: text ── */}
          <div className="flex flex-col items-start">

            {/* Eyebrow badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-8"
              style={{
                background: 'rgba(20,184,166,0.08)',
                border: '1px solid rgba(20,184,166,0.2)',
              }}
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
              className="text-5xl sm:text-6xl lg:text-[4.5rem] font-bold text-white leading-[1.08] tracking-tight mb-6"
            >
              Detect Piracy.
              <br />
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    'linear-gradient(135deg, #14b8a6 0%, #06b6d4 50%, #a78bfa 100%)',
                }}
              >
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
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 font-semibold text-white rounded-xl transition-all duration-200"
                style={{
                  background: 'linear-gradient(135deg, #0f766e 0%, #0d9488 100%)',
                  boxShadow: '0 0 0 1px rgba(20,184,166,0.3), 0 8px 24px rgba(20,184,166,0.25)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                    '0 0 0 1px rgba(20,184,166,0.5), 0 12px 32px rgba(20,184,166,0.4)'
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                    '0 0 0 1px rgba(20,184,166,0.3), 0 8px 24px rgba(20,184,166,0.25)'
                }}
              >
                Start Free Trial
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>

              <Link
                href="#demo"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 font-semibold text-gray-300 rounded-xl transition-all duration-200 hover:text-white hover:bg-white/[0.06]"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(8px)',
                }}
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
              className="flex items-center gap-8 pt-8"
              style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 + i * 0.08 }}
                  className="text-left"
                >
                  <div className="text-2xl font-bold text-white tabular-nums">
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5 uppercase tracking-wide">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* ── Right column: dashboard card ── */}
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
