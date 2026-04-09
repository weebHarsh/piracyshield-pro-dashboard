'use client'

import { useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

const pricingTiers = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    description: 'Perfect for getting started',
    features: [
      '50 keywords monitored',
      '5 platforms scanned',
      '100 incidents per month',
      'Basic analytics',
      'Email support',
    ],
    cta: 'Get Started',
    href: '/signup',
    popular: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 99,
    description: 'Best for growing creators',
    features: [
      'Unlimited keywords',
      'All platforms (1,000+)',
      'Unlimited incidents',
      'Advanced analytics',
      'Automatic takedowns',
      'API access',
      'Priority support',
    ],
    cta: 'Start Free Trial',
    href: '/signup',
    popular: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: null,
    description: 'For large organizations',
    features: [
      'Everything in Pro',
      'Dedicated account manager',
      'Custom integrations',
      'White-label solution',
      'SLA guarantees',
      'On-premise deployment',
      '24/7 phone support',
    ],
    cta: 'Contact Sales',
    href: '#contact',
    popular: false,
  },
]

function PriceDisplay({ price, yearly }: { price: number | null; yearly: boolean }) {
  // Fixed outer container height so all three cards align
  if (price === null) {
    return (
      <div className="h-14 flex flex-col justify-center">
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold text-white">Custom</span>
        </div>
        <p className="text-xs text-gray-500 mt-1">Tailored to your scale</p>
      </div>
    )
  }
  if (price === 0) {
    return (
      <div className="h-14 flex flex-col justify-center">
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold text-white">$0</span>
          <span className="text-gray-500 text-sm">/month</span>
        </div>
        <p className="text-xs text-gray-500 mt-1">Free forever, no card needed</p>
      </div>
    )
  }

  const monthlyDisplay = price
  const yearlyDisplay  = Math.round(price * 0.8)
  const shown          = yearly ? yearlyDisplay : monthlyDisplay

  return (
    <div className="h-14 flex flex-col justify-center overflow-hidden">
      <div className="flex items-baseline gap-2">
        <AnimatePresence mode="wait">
          <motion.span
            key={`${shown}-price`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.22 }}
            className="text-4xl font-bold text-white tabular-nums"
          >
            ${shown}
          </motion.span>
        </AnimatePresence>
        <span className="text-gray-500 text-sm">/month</span>
        {yearly && <span className="line-through text-gray-600 text-sm">${monthlyDisplay}</span>}
      </div>
      {yearly
        ? <p className="text-xs text-teal-400 mt-1">Billed annually — 20% off</p>
        : <p className="text-xs text-gray-600 mt-1">Billed monthly</p>
      }
    </div>
  )
}

function PricingCard({
  tier,
  index,
  yearly,
}: {
  tier: typeof pricingTiers[0]
  index: number
  yearly: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  // Center card appears first, then flanks simultaneously
  const delay = tier.popular ? 0 : 0.12

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative"
    >
      {/* Popular badge */}
      {tier.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
          <span className="px-4 py-1 bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-xs font-bold rounded-full shadow-lg shadow-teal-500/30">
            Most Popular
          </span>
        </div>
      )}

      <div
        className={`h-full rounded-2xl overflow-hidden card-surface-elevated ${
          tier.popular
            ? 'border-teal-500/45 shadow-[0_0_40px_rgba(20,184,166,0.12)]'
            : ''
        }`}
      >
        {/* Top gradient bar for popular */}
        {tier.popular && (
          <div className="h-px bg-gradient-to-r from-transparent via-teal-500 to-transparent" />
        )}

        <div className="p-8">
          <h3 className="text-xl font-bold text-white mb-1">{tier.name}</h3>
          <p className="text-sm text-gray-400 mb-6">{tier.description}</p>

          <div className="mb-4">
            <PriceDisplay price={tier.price} yearly={yearly} />
          </div>

          {/* Feature list */}
          <ul className="space-y-3 mb-8">
            {tier.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-3">
                <svg
                  className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm text-gray-300">{feature}</span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <motion.a
            href={tier.href}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`block w-full py-3 px-6 text-center rounded-xl font-semibold transition-all ${
              tier.popular
                ? 'text-white'
                : 'text-white border border-white/20 hover:border-white/40 hover:bg-white/[0.06]'
            }`}
            style={
              tier.popular
                ? {
                    background: 'linear-gradient(135deg, #0f766e 0%, #0d9488 100%)',
                    boxShadow: '0 0 0 1px rgba(20,184,166,0.3), 0 8px 24px rgba(20,184,166,0.25)',
                  }
                : { background: 'rgba(255,255,255,0.04)' }
            }
          >
            {tier.cta}
          </motion.a>
        </div>
      </div>
    </motion.div>
  )
}

export function PricingSection() {
  const titleRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(titleRef, { once: true, margin: '-80px' })
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly')
  const yearly = billingPeriod === 'yearly'

  return (
    <section id="pricing" className="relative py-24 bg-[#060d1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section title */}
        <div ref={titleRef} className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.4 }}
            className="text-teal-400 text-xs font-semibold uppercase tracking-widest mb-4"
          >
            Pricing
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
          >
            Simple,{' '}
            <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Transparent
            </span>{' '}
            Pricing
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg text-gray-400 max-w-2xl mx-auto"
          >
            Choose the plan that fits your needs. All plans include a 14-day free trial.
          </motion.p>

          {/* Billing toggle */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <span className={`text-sm transition-colors ${!yearly ? 'text-white font-medium' : 'text-gray-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingPeriod(yearly ? 'monthly' : 'yearly')}
              className="relative w-12 h-6 rounded-full transition-colors"
              style={{
                background: yearly ? 'rgba(20,184,166,0.3)' : 'rgba(255,255,255,0.12)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
              aria-checked={yearly}
              role="switch"
            >
              <motion.div
                animate={{ x: yearly ? 24 : 2, y: '-50%' }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="absolute left-0 top-1/2 w-5 h-5 rounded-full"
                style={{ background: yearly ? '#14b8a6' : '#fff' }}
              />
            </button>
            <span className={`text-sm transition-colors ${yearly ? 'text-white font-medium' : 'text-gray-500'}`}>
              Yearly
              <span className="ml-1.5 text-teal-400 text-xs font-semibold">−20%</span>
            </span>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
          {pricingTiers.map((tier, index) => (
            <PricingCard key={tier.id} tier={tier} index={index} yearly={yearly} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-gray-500 text-sm">
            Need help choosing?{' '}
            <a href="#contact" className="text-teal-400 hover:text-teal-300 transition-colors">
              Contact our sales team
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
