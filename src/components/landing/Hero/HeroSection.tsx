'use client'

import dynamic from 'next/dynamic'
import { useRef } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { CSSFloatingShapes } from './CSSFloatingShapes'
import { useDeviceCapabilities, useReducedMotion, useInView } from '@/hooks'

// Dynamic import — Three.js must not run on the server
const Scene = dynamic(
  () => import('@/components/three/Scene').then((m) => m.Scene),
  { ssr: false, loading: () => null }
)

const stats = [
  { value: '2,847+', label: 'Threats Detected' },
  { value: '95%',    label: 'Success Rate' },
  { value: '15,000+', label: 'Users Protected' },
]

type Tier = 1 | 2 | 3

function useTier(): { tier: Tier; isMobile: boolean } {
  const capabilities    = useDeviceCapabilities()
  const reducedMotion   = useReducedMotion()

  if (reducedMotion) return { tier: 3, isMobile: capabilities.isMobile }

  const canRender3D =
    capabilities.hasWebGL && !capabilities.isLowEnd

  return {
    tier: canRender3D ? 1 : 2,
    isMobile: capabilities.isMobile,
  }
}

export function HeroSection() {
  const { tier, isMobile } = useTier()
  const heroRef = useRef<HTMLElement>(null)
  const [inViewRef, isInView] = useInView<HTMLElement>({ threshold: 0.1 })

  // Merge both refs onto the section
  const setRef = (el: HTMLElement | null) => {
    ;(heroRef as React.MutableRefObject<HTMLElement | null>).current = el
    ;(inViewRef as React.MutableRefObject<HTMLElement | null>).current = el
  }

  return (
    <section
      ref={setRef}
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center relative overflow-hidden"
    >
      {/* Ambient gradient always present as base layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-600/20 to-purple-600/20" />

      {/* Tier 1 — Full 3D (desktop, WebGL, no reduced-motion) */}
      {tier === 1 && (
        <Scene isActive={isInView} isMobile={isMobile} />
      )}

      {/* Tier 2 — CSS geometric shapes (low-end / no WebGL, no reduced-motion) */}
      {tier === 2 && <CSSFloatingShapes />}

      {/* Tier 3 — Minimal: static gradient only (prefers-reduced-motion) */}
      {/* Nothing extra — ambient gradient above is sufficient */}

      {/* Hero content — always above the background layer */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center px-4 py-2 bg-teal-500/10 border border-teal-500/20 rounded-full mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-teal-400 mr-2 animate-pulse" />
          <span className="text-teal-400 text-sm font-medium">
            Trusted by 15,000+ creators worldwide
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight"
        >
          Protect Your{' '}
          <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
            Content
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          AI-powered content protection. Monitor 1,000+ platforms, detect
          piracy in real-time, and automatically issue takedowns.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/signup"
            className="px-8 py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold rounded-lg hover:from-teal-400 hover:to-teal-500 transition-all shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40"
          >
            Start Free Trial
          </Link>
          <Link
            href="#demo"
            className="px-8 py-4 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-all border border-white/20 backdrop-blur-sm"
          >
            Watch Demo
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-20"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 + i * 0.08 }}
              className="text-center"
            >
              <div className="text-3xl sm:text-4xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400 uppercase tracking-widest">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
