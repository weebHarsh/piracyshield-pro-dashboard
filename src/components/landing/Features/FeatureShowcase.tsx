'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const features = [
  {
    id: 'ai-engine',
    icon: (
      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2M12 3v1m0 16v1m-8-9H3m18 0h-1" />
      </svg>
    ),
    title: 'AI-Powered Detection',
    description: 'Advanced machine learning algorithms scan 1,000+ platforms to detect pirated content in real-time with 98% accuracy.',
    gradient: 'from-teal-500 to-cyan-500',
    accentColor: 'rgba(20,184,166,',
  },
  {
    id: 'real-time',
    icon: (
      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Real-Time Monitoring',
    description: '24/7 automated surveillance of your content across streaming sites, file-sharing platforms, and social media.',
    gradient: 'from-purple-500 to-pink-500',
    accentColor: 'rgba(168,85,247,',
  },
  {
    id: 'platforms',
    icon: (
      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: '1,000+ Platforms',
    description: 'Comprehensive coverage including streaming sites, torrent trackers, cyberlockers, and social media platforms.',
    gradient: 'from-blue-500 to-teal-500',
    accentColor: 'rgba(59,130,246,',
  },
  {
    id: 'takedowns',
    icon: (
      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Automatic Takedowns',
    description: 'Automated DMCA takedown requests sent directly to infringing sites with a 95% success rate.',
    gradient: 'from-green-500 to-emerald-500',
    accentColor: 'rgba(34,197,94,',
  },
  {
    id: 'analytics',
    icon: (
      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: 'Advanced Analytics',
    description: 'Detailed reports on piracy trends, geographic distribution, and protection effectiveness.',
    gradient: 'from-orange-500 to-red-500',
    accentColor: 'rgba(249,115,22,',
  },
  {
    id: 'team',
    icon: (
      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: 'Team Collaboration',
    description: 'Multi-user access with role-based permissions, activity logs, and collaborative workflow management.',
    gradient: 'from-indigo-500 to-purple-500',
    accentColor: 'rgba(99,102,241,',
  },
]

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -10, scale: 1.02, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
      className="relative group"
    >
      {/* Card */}
      <div
        className="relative h-full rounded-2xl p-6 overflow-hidden transition-all duration-300"
        style={{
          background: 'rgba(15,23,42,0.6)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        {/* Top accent line — reveals on hover */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl bg-gradient-to-r from-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            backgroundImage: `linear-gradient(90deg, transparent, ${feature.accentColor}0.8), transparent)`,
          }}
        />

        {/* Gradient background overlay on hover */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `linear-gradient(135deg, ${feature.accentColor}0.06), transparent)`,
          }}
        />

        {/* Glow border on hover */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300"
          style={{
            border: `1px solid ${feature.accentColor}0.35)`,
            boxShadow: `0 0 20px ${feature.accentColor}0.08)`,
          }}
        />

        {/* Icon */}
        <div className="relative z-10 mb-5">
          <motion.div
            className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient}`}
            whileHover={{ rotate: 5, scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          >
            {feature.icon}
          </motion.div>
        </div>

        <h3 className="relative z-10 text-lg font-semibold text-white mb-2">{feature.title}</h3>
        <p className="relative z-10 text-gray-400 text-sm leading-relaxed">{feature.description}</p>
      </div>
    </motion.div>
  )
}

export function FeatureShowcase() {
  const titleRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(titleRef, { once: true, margin: '-80px' })

  const words = ['Powerful', 'Features', 'for']
  const gradientWords = ['Complete', 'Protection']

  return (
    <section id="features" className="relative py-24 bg-[#0b1120]">
      {/* Background glow orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/8 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section title */}
        <div ref={titleRef} className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.4 }}
            className="text-teal-400 text-xs font-semibold uppercase tracking-widest mb-4"
          >
            Why PiracyShield
          </motion.p>

          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {words.map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
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
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.22 + i * 0.04 }}
                className="inline-block mr-2 bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent"
              >
                {word}
              </motion.span>
            ))}
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="text-lg text-gray-400 max-w-2xl mx-auto"
          >
            Everything you need to monitor, detect, and eliminate piracy in one unified platform.
          </motion.p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={feature.id} feature={feature} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <a
            href="#demo"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold rounded-xl hover:from-teal-600 hover:to-teal-700 transition-all shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40"
          >
            See It In Action
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
