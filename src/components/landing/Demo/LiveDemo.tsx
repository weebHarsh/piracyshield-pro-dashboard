'use client'

import { useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useCountUp } from '@/hooks'

const tabs = [
  {
    id: 'incidents',
    label: 'Incidents',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
  },
  {
    id: 'takedowns',
    label: 'Takedowns',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
]

function StatCard({
  value,
  label,
  color,
  delay,
  isActive,
  suffix = '',
  prefix = '',
}: {
  value: number
  label: string
  color: string
  delay: number
  isActive: boolean
  suffix?: string
  prefix?: string
}) {
  const count = useCountUp(value, 1500, isActive)
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ delay, duration: 0.4 }}
      className={`rounded-xl p-5 border`}
      style={{
        background: `${color}12`,
        borderColor: `${color}30`,
      }}
    >
      <div className="text-3xl font-bold tabular-nums" style={{ color }}>
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <div className="text-sm text-gray-400 mt-1">{label}</div>
    </motion.div>
  )
}

function IncidentsTab({ isActive }: { isActive: boolean }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <StatCard value={12}   label="Critical"        color="#ef4444" delay={0}    isActive={isActive} />
      <StatCard value={48}   label="High Priority"   color="#f97316" delay={0.1}  isActive={isActive} />
      <StatCard value={156}  label="Medium"          color="#eab308" delay={0.2}  isActive={isActive} />
      <StatCard value={2847} label="Total Incidents" color="#14b8a6" delay={0.3}  isActive={isActive} />
    </div>
  )
}

function TakedownsTab({ isActive }: { isActive: boolean }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatCard value={234}   label="Pending Requests" color="#eab308" delay={0}   isActive={isActive} />
      <StatCard value={12453} label="Completed"        color="#22c55e" delay={0.1} isActive={isActive} />
      <StatCard value={95}    label="Success Rate"     color="#14b8a6" delay={0.2} isActive={isActive} suffix="%" />
    </div>
  )
}

function AnalyticsTab({ isActive }: { isActive: boolean }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatCard value={1247} label="Platforms Monitored" color="#a78bfa" delay={0}   isActive={isActive} />
      <StatCard value={89}   label="Countries Protected" color="#60a5fa" delay={0.1} isActive={isActive} />
      <StatCard value={125}  label="Weekly Growth"       color="#14b8a6" delay={0.2} isActive={isActive} prefix="+" suffix="%" />
    </div>
  )
}

export function LiveDemo() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [activeTab, setActiveTab] = useState('incidents')
  const titleRef = useRef<HTMLDivElement>(null)
  const isTitleInView = useInView(titleRef, { once: true, margin: '-80px' })

  const headingWords = ['See', 'PiracyShield']
  const gradientWords = ['In', 'Action']

  return (
    <section ref={sectionRef} id="demo" className="relative py-24 bg-[#060d1a]">
      {/* Cyan glow accent */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 right-1/4 w-96 h-96 -translate-y-1/2 bg-cyan-500/6 rounded-full blur-3xl" />
      </div>

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

          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {headingWords.map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 20 }}
                animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.04 }}
                className="inline-block mr-2"
              >
                {word}
              </motion.span>
            ))}
            {gradientWords.map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 20 }}
                animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.18 + i * 0.04 }}
                className="inline-block mr-2 bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent"
              >
                {word}
              </motion.span>
            ))}
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg text-gray-400 max-w-2xl mx-auto"
          >
            Explore our powerful dashboard with real-time monitoring and automated takedowns.
          </motion.p>
        </div>

        {/* Browser window */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative rounded-2xl shadow-2xl overflow-hidden"
          style={{
            border: '1px solid rgba(255,255,255,0.1)',
            background: 'rgba(9,15,28,0.95)',
          }}
        >
          {/* Browser chrome */}
          <div
            className="flex items-center gap-2 px-4 py-3 border-b"
            style={{ background: 'rgba(15,23,42,0.95)', borderColor: 'rgba(255,255,255,0.08)' }}
          >
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="flex-1 mx-4">
              <div
                className="rounded-md px-3 py-1 text-xs text-gray-400 text-center overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <span className="inline-block overflow-hidden whitespace-nowrap"
                  style={{
                    animation: isInView ? 'typing 1.2s steps(32, end) 0.6s both' : 'none',
                    width: isInView ? undefined : 0,
                  }}>
                  app.piracyshield.pro/dashboard
                </span>
              </div>
            </div>
          </div>

          {/* Dashboard content */}
          <div className="p-6">
            {/* Tabs */}
            <div className="flex gap-3 mb-6 flex-wrap">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-teal-500/15 text-teal-400 border border-teal-500/40'
                      : 'text-gray-400 border border-white/[0.08] hover:border-white/20 hover:text-gray-300'
                  }`}
                  style={{ background: activeTab === tab.id ? undefined : 'rgba(255,255,255,0.03)' }}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab content — crossfades */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                {activeTab === 'incidents'  && <IncidentsTab  isActive={isInView} />}
                {activeTab === 'takedowns'  && <TakedownsTab  isActive={isInView} />}
                {activeTab === 'analytics'  && <AnalyticsTab  isActive={isInView} />}
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
            className="inline-flex items-center px-6 py-3 font-semibold text-white rounded-xl transition-all border border-white/20 hover:border-white/40 hover:bg-white/[0.06]"
            style={{ background: 'rgba(255,255,255,0.06)' }}
          >
            Try Interactive Demo
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
