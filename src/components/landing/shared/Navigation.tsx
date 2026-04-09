'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useScrollPosition } from '@/hooks'

export function Navigation({ transparent = false }: { transparent?: boolean }) {
  const [isVisible, setIsVisible] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { scrollPosition, scrollDirection } = useScrollPosition()

  useEffect(() => {
    if (scrollDirection === 'down' && scrollPosition > 100) {
      setIsVisible(false)
      setMobileOpen(false)
    } else {
      setIsVisible(true)
    }
  }, [scrollPosition, scrollDirection])

  const closeMobile = useCallback(() => setMobileOpen(false), [])

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMobile()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [closeMobile])

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as const },
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
          aria-label="Main navigation"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <div className="flex items-center">
                <Link href="/" className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-teal-600 to-teal-700 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <span className={`text-xl font-bold ${transparent ? 'text-white' : 'text-gray-900'}`}>
                    PiracyShield
                  </span>
                </Link>
              </div>

              {/* Desktop links */}
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

              {/* Desktop CTA */}
              <div className="hidden md:flex items-center space-x-4">
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
                  className="px-4 py-2 bg-gradient-to-r from-teal-600 to-teal-700 text-white text-sm font-medium rounded-lg hover:from-teal-700 hover:to-teal-800 transition-all shadow-lg shadow-teal-500/25"
                >
                  Start Free Trial
                </Link>
              </div>

              {/* Mobile hamburger */}
              <button
                className="md:hidden p-2 rounded-lg hover:bg-gray-100/50 transition-colors"
                onClick={() => setMobileOpen((v) => !v)}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
              >
                <svg className={`w-6 h-6 ${transparent ? 'text-white' : 'text-gray-700'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  {mobileOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="md:hidden overflow-hidden bg-white border-t border-gray-100"
              >
                <div className="px-4 py-4 space-y-1">
                  {links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeMobile}
                      className="block px-3 py-2.5 text-sm font-medium text-gray-700 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="pt-3 border-t border-gray-100 space-y-2">
                    <Link
                      href="/login"
                      onClick={closeMobile}
                      className="block px-3 py-2.5 text-sm font-medium text-gray-700 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/signup"
                      onClick={closeMobile}
                      className="block px-3 py-2.5 text-sm font-medium text-center text-white bg-gradient-to-r from-teal-600 to-teal-700 rounded-lg hover:from-teal-700 hover:to-teal-800 transition-all"
                    >
                      Start Free Trial
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
