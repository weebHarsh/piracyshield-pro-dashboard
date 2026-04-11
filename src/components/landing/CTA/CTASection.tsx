'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { useCountUp } from '@/hooks'

const stats = [
  { value: 1200000, display: (n: number) => `${(n / 1000000).toFixed(1)}M`, label: 'Takedowns processed' },
  { value: 47,      display: (n: number) => `${n}h`,                         label: 'Avg. removal time'  },
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
      <div className="tabular text-3xl sm:text-4xl font-medium text-white mb-1">
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
    <section ref={sectionRef} className="relative py-24 overflow-hidden bg-[var(--brand-strong)]">

      {/* Dot grid texture overlay */}
      <div className="absolute inset-0 hero-dot-grid opacity-10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-medium text-white mb-6 leading-tight tracking-[-0.03em]"
            style={{ fontFamily: 'var(--font-display-loaded, var(--font-sans-loaded, system-ui))' }}
          >
            Ready to protect your content?
          </h2>
          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            Rights-holders use PiracyShield to monitor, detect, and remove piracy automatically —
            without retaining counsel for every notice.
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
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/signup"
              className="btn-press inline-flex items-center justify-center px-8 py-4 bg-white text-[var(--brand-strong)] font-semibold rounded-xl hover:bg-[var(--brand-soft)] transition-colors duration-[var(--dur-ui-fast)] shadow-xl"
            >
              Start Free Trial
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="#demo"
              className="btn-press inline-flex items-center justify-center px-8 py-4 text-white font-semibold rounded-xl transition-colors duration-[var(--dur-ui-fast)] border border-white/30 hover:border-white/50 hover:bg-white/10"
            >
              Schedule Demo
            </Link>
          </motion.div>

          {/* Trust — SOC 2 and GDPR only, no slop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12 pt-8 border-t border-white/20 flex flex-wrap justify-center gap-6"
          >
            {['SOC 2 Type II', 'GDPR Ready', 'DMCA Compliant'].map((badge) => (
              <span key={badge} className="text-sm text-white/60 font-medium">
                {badge}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
