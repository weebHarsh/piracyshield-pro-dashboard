'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations/variants'

const features = [
  {
    id: 'ai-engine',
    icon: '🤖',
    title: 'AI-Powered Detection',
    description: 'Advanced machine learning algorithms scan 1000+ platforms to detect pirated content in real-time with 98% accuracy.',
    gradient: 'from-teal-500 to-cyan-500',
  },
  {
    id: 'real-time',
    icon: '⚡',
    title: 'Real-Time Monitoring',
    description: '24/7 automated surveillance of your content across streaming sites, file-sharing platforms, and social media.',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    id: 'platforms',
    icon: '🌐',
    title: '1000+ Platforms',
    description: 'Comprehensive coverage including streaming sites, torrent trackers, cyberlockers, and social media platforms.',
    gradient: 'from-blue-500 to-teal-500',
  },
  {
    id: 'takedowns',
    icon: '🎯',
    title: 'Automatic Takedowns',
    description: 'Automated DMCA takedown requests sent directly to infringing sites with a 95% success rate.',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    id: 'analytics',
    icon: '📊',
    title: 'Advanced Analytics',
    description: 'Detailed reports on piracy trends, geographic distribution, and protection effectiveness.',
    gradient: 'from-orange-500 to-red-500',
  },
  {
    id: 'team',
    icon: '👥',
    title: 'Team Collaboration',
    description: 'Multi-user access with role-based permissions, activity logs, and collaborative workflow management.',
    gradient: 'from-indigo-500 to-purple-500',
  },
]

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl opacity-50 group-hover:opacity-70 transition-opacity" />
      
      <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 group-hover:border-teal-500/50 transition-all">
        <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} mb-4`}>
          <span className="text-2xl">{feature.icon}</span>
        </div>
        
        <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
        
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity`} />
      </div>
    </motion.div>
  )
}

export function FeatureShowcase() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(titleRef, { once: true, margin: '-100px' })
  
  return (
    <section ref={sectionRef} className="relative py-24 bg-gray-900">
      {/* Background gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section title */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Powerful Features for{' '}
            <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Complete Protection
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Everything you need to monitor, detect, and eliminate piracy in one unified platform.
          </p>
        </motion.div>
        
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
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40"
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