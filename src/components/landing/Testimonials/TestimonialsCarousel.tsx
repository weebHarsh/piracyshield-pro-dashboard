'use client'

import { useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

const testimonials = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'Content Creator',
    company: 'TechReview Pro',
    quote: 'PiracyShield found over 500 illegal streams of my course content in the first week. Within days, they took down 95% of them. My revenue increased by 40%.',
    avatar: null,
    rating: 5,
  },
  {
    id: 2,
    name: 'Michael Black',
    role: 'CEO',
    company: 'IndieFilm Studios',
    quote: 'The automated takedown system saves us thousands in legal fees. What used to take weeks now happens in hours.',
    avatar: null,
    rating: 5,
  },
  {
    id: 3,
    name: 'Emma White',
    role: 'Digital Marketing Manager',
    company: 'Creative Agency',
    quote: 'Real-time monitoring across 1000+ platforms is a game-changer. We caught a piracy ring that was distributing our content across 50 different sites.',
    avatar: null,
    rating: 5,
  },
  {
    id: 4,
    name: 'David Kim',
    role: 'Founder',
    company: 'EduTech Inc',
    quote: 'The ROI is incredible. We estimated losing $200k annually to piracy. With PiracyShield, we\'ve reduced that by over 80%.',
    avatar: null,
    rating: 5,
  },
]

function TestimonialCard({ testimonial, isActive }: { testimonial: typeof testimonials[0]; isActive: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: isActive ? 1 : 0.5, scale: isActive ? 1 : 0.95 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className={`bg-gray-900/80 backdrop-blur-xl rounded-2xl p-8 border ${
        isActive ? 'border-teal-500/50 shadow-xl shadow-teal-500/10' : 'border-gray-700/50'
      }`}
    >
      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      {/* Quote */}
      <blockquote className="text-lg text-gray-200 mb-6 leading-relaxed">
        "{testimonial.quote}"
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-500 to-purple-500 flex items-center justify-center text-white font-semibold">
          {testimonial.name.split(' ').map(n => n[0]).join('')}
        </div>
        <div>
          <div className="font-semibold text-white">{testimonial.name}</div>
          <div className="text-sm text-gray-400">{testimonial.role} at {testimonial.company}</div>
        </div>
      </div>
    </motion.div>
  )
}

export function TestimonialsCarousel() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [activeIndex, setActiveIndex] = useState(0)
  const [dragDirection, setDragDirection] = useState(0)
  
  const handleDragEnd = (_: any, info: { offset: { x: number } }) => {
    const threshold = 50
    if (info.offset.x > threshold) {
      setActiveIndex(Math.max(0, activeIndex - 1))
    } else if (info.offset.x < -threshold) {
      setActiveIndex(Math.min(testimonials.length - 1, activeIndex + 1))
    }
  }
  
  return (
    <section ref={sectionRef} className="relative py-24 bg-gray-900">
      {/* Background gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-teal-500/5 rounded-full blur-3xl" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Trusted by{' '}
            <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Content Creators
            </span>{' '}
            Worldwide
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            See how PiracyShield helps creators protect their content and revenue.
          </p>
        </motion.div>
        
        {/* Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            onDragEnd={handleDragEnd}
            className="cursor-grab active:cursor-grabbing"
          >
            <AnimatePresence mode="wait">
              <TestimonialCard
                key={testimonials[activeIndex].id}
                testimonial={testimonials[activeIndex]}
                isActive={true}
              />
            </AnimatePresence>
          </motion.div>
          
          {/* Navigation dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === activeIndex
                    ? 'bg-teal-500 w-8'
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Navigation arrows */}
          <button
            onClick={() => setActiveIndex(Math.max(0, activeIndex - 1))}
            disabled={activeIndex === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 w-10 h-10 rounded-full bg-gray-800 border border-gray-700 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
            aria-label="Previous testimonial"
          >
            <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => setActiveIndex(Math.min(testimonials.length - 1, activeIndex + 1))}
            disabled={activeIndex === testimonials.length - 1}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 w-10 h-10 rounded-full bg-gray-800 border border-gray-700 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
            aria-label="Next testimonial"
          >
            <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}