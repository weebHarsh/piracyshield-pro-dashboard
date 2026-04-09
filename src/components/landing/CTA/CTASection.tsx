'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { useCountUp } from '@/hooks'

const trustBadges = [
  'SOC 2 Compliant',
  'GDPR Ready',
  '99.9% Uptime',
  'Enterprise Grade',
]

const stats = [
  { value: 15000, display: (n: number) => `${n.toLocaleString()}+`, label: 'Users Protected' },
  { value: 95,    display: (n: number) => `${n}%`,                  label: 'Success Rate'   },
  { value: 1000,  display: (n: number) => `${n.toLocaleString()}+`, label: 'Platforms'      },
]

function AnimatedStat({
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
  const count = useCountUp(value, 2000, active)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ delay, duration: 0.5 }}
      className="text-center"
    >
      <div className="text-3xl sm:text-4xl font-bold text-white mb-1 tabular-nums">
        {display(count)}
      </div>
      <div className="text-sm text-white/70">{label}</div>
    </motion.div>
  )
}

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden">
      {/* Solid teal gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-teal-700 via-teal-600 to-cyan-600" />

      {/* Dot grid texture overlay */}
      <div className="absolute inset-0 hero-dot-grid opacity-[0.15]" />

      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-white/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], rotate: [360, 180, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-white/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], rotate: [0, 90, 180, 270, 360] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-400/10 rounded-full blur-2xl"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Ready to Protect Your Content?
          </h2>
          <p className="text-lg sm:text-xl text-white/85 max-w-2xl mx-auto mb-10">
            Join 15,000+ creators who trust PiracyShield to monitor, detect, and eliminate piracy automatically.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-10 mb-12">
            {stats.map((stat, index) => (
              <AnimatedStat
                key={stat.label}
                value={stat.value}
                display={stat.display}
                label={stat.label}
                delay={0.3 + index * 0.1}
                active={isInView}
              />
            ))}
          </div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-teal-700 font-bold rounded-xl hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl"
              >
                Start Free Trial
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="#demo"
                className="inline-flex items-center justify-center px-8 py-4 text-white font-semibold rounded-xl transition-all border border-white/30 hover:border-white/50 hover:bg-white/10"
              >
                Schedule Demo
              </Link>
            </motion.div>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-12 pt-8 border-t border-white/20"
          >
            <p className="text-sm text-white/50 mb-5">Enterprise-ready from day one</p>
            <motion.div
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
              className="flex flex-wrap justify-center gap-3"
            >
              {trustBadges.map((badge) => (
                <motion.span
                  key={badge}
                  variants={{
                    hidden:  { opacity: 0, scale: 0.85 },
                    visible: { opacity: 1, scale: 1 },
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="px-4 py-1.5 text-xs font-medium text-white/80 rounded-full"
                  style={{
                    background: 'rgba(255,255,255,0.12)',
                    border: '1px solid rgba(255,255,255,0.22)',
                  }}
                >
                  {badge}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
