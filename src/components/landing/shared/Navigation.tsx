'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useScrollPosition } from '@/hooks'

const links = [
  { href: '#features',     label: 'Features'     },
  { href: '#demo',         label: 'Demo'         },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#pricing',      label: 'Pricing'      },
]

function NavLink({ href, label }: { href: string; label: string }) {
  const [hovered, setHovered] = useState(false)

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (el) {
      e.preventDefault()
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative text-sm font-medium text-gray-300 hover:text-white transition-colors py-1"
    >
      {label}
      <motion.span
        className="absolute bottom-0 left-0 right-0 h-px bg-teal-400 rounded-full"
        initial={false}
        animate={{ scaleX: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        style={{ originX: 0 }}
      />
    </a>
  )
}

export function Navigation() {
  const [isVisible, setIsVisible] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { scrollPosition, scrollDirection } = useScrollPosition()

  const isScrolled = scrollPosition > 20

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

  const handleMobileClick = (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (el) {
      e.preventDefault()
      closeMobile()
      setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 150)
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            isScrolled
              ? 'border-b border-white/[0.07] backdrop-blur-xl'
              : 'border-b border-transparent'
          }`}
          style={{
            background: isScrolled ? 'rgba(15,23,42,0.85)' : 'transparent',
          }}
          aria-label="Main navigation"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">

              {/* Logo */}
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-9 h-9 bg-gradient-to-br from-teal-600 to-teal-700 rounded-lg flex items-center justify-center shadow-lg shadow-teal-500/20">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <span className="text-xl font-bold text-white">PiracyShield</span>
              </Link>

              {/* Desktop links */}
              <div className="hidden md:flex items-center space-x-8">
                {links.map((link) => (
                  <NavLink key={link.href} href={link.href} label={link.label} />
                ))}
              </div>

              {/* Desktop CTA */}
              <div className="hidden md:flex items-center space-x-4">
                <Link
                  href="/login"
                  className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-teal-600 to-teal-700 text-white text-sm font-semibold rounded-lg shadow-[0_0_20px_rgba(20,184,166,0.2)] hover:shadow-[0_0_32px_rgba(20,184,166,0.4)] hover:from-teal-700 hover:to-teal-800 transition-all"
                >
                  Start Free Trial
                </Link>
              </div>

              {/* Mobile hamburger */}
              <button
                className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
                onClick={() => setMobileOpen((v) => !v)}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
              >
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
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
                transition={{ duration: 0.25 }}
                className="md:hidden overflow-hidden card-surface-elevated border-t border-white/[0.07]"
              >
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
                  className="px-4 py-4 space-y-1"
                >
                  {links.map((link) => (
                    <motion.div
                      key={link.href}
                      variants={{ hidden: { opacity: 0, x: -12 }, visible: { opacity: 1, x: 0 } }}
                    >
                      <a
                        href={link.href}
                        onClick={handleMobileClick(link.href)}
                        className="block px-3 py-2.5 text-sm font-medium text-gray-300 hover:text-teal-400 hover:bg-white/[0.05] rounded-lg transition-colors"
                      >
                        {link.label}
                      </a>
                    </motion.div>
                  ))}
                  <div className="pt-3 border-t border-white/[0.07] space-y-2">
                    <a
                      href="/login"
                      onClick={closeMobile}
                      className="block px-3 py-2.5 text-sm font-medium text-gray-300 hover:text-teal-400 hover:bg-white/[0.05] rounded-lg transition-colors"
                    >
                      Sign In
                    </a>
                    <a
                      href="/signup"
                      onClick={closeMobile}
                      className="block px-3 py-2.5 text-sm font-medium text-center text-white bg-gradient-to-r from-teal-600 to-teal-700 rounded-lg hover:from-teal-700 hover:to-teal-800 transition-all"
                    >
                      Start Free Trial
                    </a>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
