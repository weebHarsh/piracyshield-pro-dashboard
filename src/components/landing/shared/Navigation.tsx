'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useScrollPosition } from '@/hooks'

export function Navigation({ transparent = false }: { transparent?: boolean }) {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const { scrollPosition, scrollDirection } = useScrollPosition()

  useEffect(() => {
    if (scrollDirection === 'down' && scrollPosition > 100) {
      setIsVisible(false)
    } else {
      setIsVisible(true)
    }
    setLastScrollY(scrollPosition)
  }, [scrollPosition, scrollDirection])

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as const }
    },
  }

  const links = [
    { href: '#features', label: 'Features' },
    { href: '#demo', label: 'Demo' },
    { href: '#pricing', label: 'Pricing' },
    { href: '#testimonials', label: 'Testimonials' },
  ]

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={navVariants}
          className={`fixed top-0 left-0 right-0 z-50 ${
            transparent
              ? 'bg-transparent'
              : 'bg-white/80 backdrop-blur-xl border-b border-gray-200/50'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <Link href="/" className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-teal-600 to-teal-700 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <span className={`text-xl font-bold ${transparent ? 'text-white' : 'text-gray-900'}`}>
                    PiracyShield
                  </span>
                </Link>
              </div>

              <div className="hidden md:flex items-center space-x-8">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-sm font-medium transition-colors hover:text-teal-600 ${
                      transparent ? 'text-white/90' : 'text-gray-700'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className={`text-sm font-medium transition-colors hover:text-teal-600 ${
                    transparent ? 'text-white' : 'text-gray-700'
                  }`}
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 bg-gradient-to-r from-teal-600 to-teal-700 text-white text-sm font-medium rounded-lg hover:from-teal-700 hover:to-teal-800 transition-all shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40"
                >
                  Start Free Trial
                </Link>
              </div>
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}