'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

export function LiveDemo() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [activeTab, setActiveTab] = useState('incidents')
  
  const tabs = [
    { id: 'incidents', label: 'Incidents', icon: '⚠️' },
    { id: 'takedowns', label: 'Takedowns', icon: '🎯' },
    { id: 'analytics', label: 'Analytics', icon: '📊' },
  ]
  
  const mockData = {
    incidents: {
      critical: 12,
      high: 48,
      medium: 156,
      total: 2847,
    },
    takedowns: {
      pending: 234,
      completed: 12453,
      success: 95,
    },
    analytics: {
      platforms: 1247,
      countries: 89,
      weeklyGrowth: 12.5,
    },
  }
  
  return (
    <section ref={sectionRef} id="demo" className="relative py-24 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            See PiracyShield{' '}
            <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
              In Action
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Explore our powerful dashboard with real-time monitoring and automated takedowns.
          </p>
        </motion.div>
        
        {/* Demo preview container */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.95 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-700"
        >
          {/* Browser chrome */}
          <div className="flex items-center gap-2 px-4 py-3 bg-gray-800 border-b border-gray-700">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="flex-1 mx-4">
              <div className="bg-gray-700 rounded-md px-3 py-1 text-xs text-gray-400 text-center">
                piracyshield.pro/dashboard
              </div>
            </div>
          </div>
          
          {/* Dashboard content */}
          <div className="p-6 bg-gray-900">
            {/* Tabs */}
            <div className="flex gap-4 mb-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-teal-500/20 text-teal-400 border border-teal-500/50'
                      : 'bg-gray-800 text-gray-400 border border-gray-700 hover:border-gray-600'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
            
            {/* Content based on active tab */}
            {activeTab === 'incidents' && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-gradient-to-br from-red-500/10 to-red-600/10 rounded-xl p-4 border border-red-500/20"
                >
                  <div className="text-3xl font-bold text-red-400">{mockData.incidents.critical}</div>
                  <div className="text-sm text-gray-400 mt-1">Critical</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 rounded-xl p-4 border border-orange-500/20"
                >
                  <div className="text-3xl font-bold text-orange-400">{mockData.incidents.high}</div>
                  <div className="text-sm text-gray-400 mt-1">High Priority</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 rounded-xl p-4 border border-yellow-500/20"
                >
                  <div className="text-3xl font-bold text-yellow-400">{mockData.incidents.medium}</div>
                  <div className="text-sm text-gray-400 mt-1">Medium</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gradient-to-br from-teal-500/10 to-teal-600/10 rounded-xl p-4 border border-teal-500/20"
                >
                  <div className="text-3xl font-bold text-teal-400">{mockData.incidents.total.toLocaleString()}</div>
                  <div className="text-sm text-gray-400 mt-1">Total Incidents</div>
                </motion.div>
              </div>
            )}
            
            {activeTab === 'takedowns' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 rounded-xl p-6 border border-yellow-500/20"
                >
                  <div className="text-4xl font-bold text-yellow-400">{mockData.takedowns.pending}</div>
                  <div className="text-sm text-gray-400 mt-1">Pending Requests</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-xl p-6 border border-green-500/20"
                >
                  <div className="text-4xl font-bold text-green-400">{mockData.takedowns.completed.toLocaleString()}</div>
                  <div className="text-sm text-gray-400 mt-1">Completed</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-gradient-to-br from-teal-500/10 to-teal-600/10 rounded-xl p-6 border border-teal-500/20"
                >
                  <div className="text-4xl font-bold text-teal-400">{mockData.takedowns.success}%</div>
                  <div className="text-sm text-gray-400 mt-1">Success Rate</div>
                </motion.div>
              </div>
            )}
            
            {activeTab === 'analytics' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-xl p-6 border border-purple-500/20"
                >
                  <div className="text-4xl font-bold text-purple-400">{mockData.analytics.platforms.toLocaleString()}</div>
                  <div className="text-sm text-gray-400 mt-1">Platforms Monitored</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-xl p-6 border border-blue-500/20"
                >
                  <div className="text-4xl font-bold text-blue-400">{mockData.analytics.countries}</div>
                  <div className="text-sm text-gray-400 mt-1">Countries Protected</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="bg-gradient-to-br from-teal-500/10 to-teal-600/10 rounded-xl p-6 border border-teal-500/20"
                >
                  <div className="text-4xl font-bold text-teal-400">+{mockData.analytics.weeklyGrowth}%</div>
                  <div className="text-sm text-gray-400 mt-1">Weekly Growth</div>
                </motion.div>
              </div>
            )}
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
            className="inline-flex items-center px-6 py-3 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-all border border-white/20"
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