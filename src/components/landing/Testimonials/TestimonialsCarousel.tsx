'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const testimonials = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'Content Creator',
    company: 'TechReview Pro',
    quote: 'PiracyShield found hundreds of unauthorized copies of my course content in the first week and had most of them down within days. It\'s become a core part of how I protect my work.',
    initials: 'SC',
    rating: 5,
  },
  {
    id: 2,
    name: 'Michael Black',
    role: 'CEO',
    company: 'IndieFilm Studios',
    quote: 'The automated takedown system saves us thousands in legal fees. What used to take weeks now happens in hours. Absolutely indispensable.',
    initials: 'MB',
    rating: 4,
  },
  {
    id: 3,
    name: 'Emma White',
    role: 'Digital Marketing Manager',
    company: 'Creative Agency',
    quote: 'Real-time monitoring across 1,000+ platforms is a game-changer. We caught a piracy ring distributing our content across 50 different sites simultaneously.',
    initials: 'EW',
    rating: 5,
  },
  {
    id: 4,
    name: 'David Kim',
    role: 'Founder',
    company: 'EduTech Inc',
    quote: 'We were losing significant revenue to piracy before PiracyShield. The difference in detected and removed content has been dramatic — highly recommended for any digital publisher.',
    initials: 'DK',
    rating: 4,
  },
  {
    id: 5,
    name: 'Priya Sharma',
    role: 'Head of Content',
    company: 'StreamVault',
    quote: 'Onboarding took under an hour and we were monitoring live the same day. The dashboard is clean, the alerts are actionable, and the team is responsive.',
    initials: 'PS',
    rating: 5,
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <motion.svg
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.05 * i, type: 'spring', stiffness: 400, damping: 15 }}
          className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-700'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </motion.svg>
      ))}
    </div>
  )
}

function TestimonialCard({ testimonial, index }: { testimonial: typeof testimonials[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, rotateX: 8 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 30, rotateX: 8 }}
      transition={{ duration: 0.55, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -6, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
      className="group relative"
      style={{ perspective: '800px' }}
    >
      <div
        className="relative h-full rounded-2xl p-7 overflow-hidden transition-all duration-300"
        style={{
          background: 'rgba(11,17,32,0.8)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        {/* Glow on hover */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300"
          style={{
            border: '1px solid rgba(20,184,166,0.3)',
            boxShadow: '0 0 30px rgba(20,184,166,0.06)',
          }}
        />

        {/* Decorative quote mark */}
        <motion.div
          className="absolute top-4 left-5 text-7xl font-serif text-teal-500/10 leading-none select-none pointer-events-none"
          whileHover={{ scale: 1.15 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          "
        </motion.div>

        <div className="relative z-10">
          <StarRating rating={testimonial.rating} />

          <blockquote className="text-gray-300 text-sm leading-relaxed mb-6">
            "{testimonial.quote}"
          </blockquote>

          <div className="flex items-center gap-3">
            {/* Avatar with gradient rotation */}
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 animate-gradient-rotate"
              style={{
                background: 'linear-gradient(135deg, #14b8a6, #8b5cf6, #06b6d4)',
              }}
            >
              {testimonial.initials}
            </div>
            <div>
              <div className="text-sm font-semibold text-white">{testimonial.name}</div>
              <div className="text-xs text-gray-500">{testimonial.role} · {testimonial.company}</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function TestimonialsCarousel() {
  const titleRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(titleRef, { once: true, margin: '-80px' })

  const headingWords = ['Trusted', 'by']
  const gradientWords = ['Content', 'Creators']
  const restWords = ['Worldwide']

  return (
    <section id="testimonials" className="relative py-24 bg-[#060d1a]">
      {/* Background orb */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 right-0 w-96 h-96 -translate-y-1/2 bg-purple-500/6 rounded-full blur-3xl" />
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
            Social Proof
          </motion.p>

          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {headingWords.map((word, i) => (
              <motion.span
                key={word + i}
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
                transition={{ duration: 0.5, delay: 0.18 + i * 0.04 }}
                className="inline-block mr-2 bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent"
              >
                {word}
              </motion.span>
            ))}
            {restWords.map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.26 + i * 0.04 }}
                className="inline-block mr-2"
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
            See how PiracyShield helps creators protect their content and revenue.
          </motion.p>
        </div>

        {/* 3-col grid on desktop, 2-col tablet, 1-col mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
