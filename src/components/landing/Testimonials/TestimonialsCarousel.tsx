'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const testimonials = [
  {
    id: 1,
    quote: 'The DMCA workflow is the best I\'ve seen — notices are legally sound, filed fast, and the audit trail makes enforcement cases trivial. We\'ve recommended it to every client.',
    name: 'James Okafor',
    role: 'IP Counsel',
    company: 'MediaGuard Legal',
  },
  {
    id: 2,
    quote: 'Onboarding took under an hour and we were monitoring live the same day. The dashboard is precise, the alerts are actionable, and it hasn\'t missed a single incident in six months.',
    name: 'Priya Ramaswamy',
    role: 'VP Content Protection',
    company: 'StreamVault',
  },
  {
    id: 3,
    quote: 'We were losing significant revenue to piracy before switching. Detected and removed 1,200 infringing copies in the first quarter — mostly automated, no manual review required.',
    name: 'Marcus Chen',
    role: 'Rights Operations Lead',
    company: 'Atlas Distribution',
  },
]

export function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)
  const next = () => setCurrent((c) => (c + 1) % testimonials.length)

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft')  prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const t = testimonials[current]

  return (
    <section id="testimonials" className="relative py-24 bg-[var(--bg)] border-y border-[var(--border)]">
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Opening mark */}
        <div
          className="text-[var(--brand)] mb-6 select-none"
          style={{ fontFamily: 'var(--font-display-loaded, var(--font-sans-loaded, system-ui))', fontSize: 'clamp(3rem, 5vw, 5rem)', lineHeight: 1, opacity: 0.35 }}
          aria-hidden="true"
        >
          &ldquo;
        </div>

        {/* Quote — display font, large */}
        <div className="relative min-h-[7rem]">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={t.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.32, ease: [0.23, 1, 0.32, 1] }}
              className="text-[var(--text)] leading-[1.25] tracking-[-0.02em]"
              style={{
                fontFamily: 'var(--font-display-loaded, var(--font-sans-loaded, system-ui))',
                fontSize: 'clamp(1.75rem, 2vw + 1rem, 2.75rem)',
                fontStyle: 'italic',
              }}
            >
              {t.quote}
            </motion.blockquote>
          </AnimatePresence>
        </div>

        {/* Attribution */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`attr-${t.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-8 flex items-center gap-6"
          >
            <div>
              <div
                className="text-sm font-medium text-[var(--text)] uppercase tracking-[0.08em]"
                style={{ fontVariant: 'small-caps' }}
              >
                {t.name}
              </div>
              <div className="text-xs text-[var(--text-subtle)] mt-0.5">
                {t.role} · {t.company}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation row */}
        <div className="mt-10 flex items-center justify-between">

          {/* Indicator */}
          <div className="flex items-center gap-1 tabular text-xs text-[var(--text-subtle)]">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`transition-colors duration-[var(--dur-ui-fast)] ${i === current ? 'text-[var(--brand)]' : 'text-[var(--text-subtle)] hover:text-[var(--text-muted)]'}`}
                aria-label={`Go to testimonial ${i + 1}`}
              >
                {String(i + 1).padStart(1, '0')}
                {i < testimonials.length - 1 && <span className="mx-1.5 text-[var(--border)]">·</span>}
              </button>
            ))}
          </div>

          {/* Prev / Next */}
          <div className="flex items-center gap-2">
            <button
              onClick={prev}
              className="btn-press w-9 h-9 rounded-lg border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--border-strong)] transition-colors duration-[var(--dur-ui-fast)]"
              aria-label="Previous testimonial"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={next}
              className="btn-press w-9 h-9 rounded-lg border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--border-strong)] transition-colors duration-[var(--dur-ui-fast)]"
              aria-label="Next testimonial"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

        </div>

      </div>
    </section>
  )
}
