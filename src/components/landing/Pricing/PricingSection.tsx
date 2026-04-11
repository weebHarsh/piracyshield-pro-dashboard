'use client'

import { useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

const pricingTiers = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    description: 'For getting started',
    features: [
      '50 keywords monitored',
      '5 platforms scanned',
      '100 incidents / month',
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
    description: 'For active rights-holders',
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
    description: 'For studios and labels',
    features: [
      'Everything in Pro',
      'Dedicated account manager',
      'Custom integrations',
      'White-label option',
      'SLA guarantees',
      'On-premise deployment',
    ],
    cta: 'Contact Sales',
    href: '#contact',
    popular: false,
  },
]

function PriceDisplay({ price, yearly }: { price: number | null; yearly: boolean }) {
  if (price === null) {
    return (
      <div className="h-14 flex flex-col justify-center">
        <div className="tabular text-4xl font-medium text-[var(--text)]">Custom</div>
        <p className="text-xs text-[var(--text-subtle)] mt-1">Tailored to your scale</p>
      </div>
    )
  }
  if (price === 0) {
    return (
      <div className="h-14 flex flex-col justify-center">
        <div className="flex items-baseline gap-1.5">
          <span className="tabular text-4xl font-medium text-[var(--text)]">$0</span>
          <span className="text-[var(--text-subtle)] text-sm">/month</span>
        </div>
        <p className="text-xs text-[var(--text-subtle)] mt-1">Free forever, no card needed</p>
      </div>
    )
  }

  const shown = yearly ? Math.round(price * 0.8) : price

  return (
    <div className="h-14 flex flex-col justify-center overflow-hidden">
      <div className="flex items-baseline gap-1.5">
        <AnimatePresence mode="wait">
          <motion.span
            key={`${shown}-price`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="tabular text-4xl font-medium text-[var(--text)]"
          >
            ${shown}
          </motion.span>
        </AnimatePresence>
        <span className="text-[var(--text-subtle)] text-sm">/month</span>
        {yearly && <span className="line-through text-[var(--text-subtle)] text-sm">${price}</span>}
      </div>
      {yearly
        ? <p className="text-xs text-[var(--brand)] mt-1">Billed annually — 20% off</p>
        : <p className="text-xs text-[var(--text-subtle)] mt-1">Billed monthly</p>
      }
    </div>
  )
}

function CheckIcon() {
  return (
    <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  )
}

export function PricingSection() {
  const titleRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(titleRef, { once: true, margin: '-80px' })
  const [yearly, setYearly] = useState(false)

  return (
    <section id="pricing" className="relative py-24 bg-[var(--bg)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header — left-aligned */}
        <div ref={titleRef} className="mb-12">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.4 }}
            className="tabular text-[var(--brand)] text-xs font-medium uppercase tracking-widest mb-3"
          >
            Pricing
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col sm:flex-row sm:items-end gap-6"
          >
            <h2
              className="text-[var(--text-display-l)] font-medium text-[var(--text)] leading-[1.05] tracking-[-0.03em]"
              style={{ fontFamily: 'var(--font-display-loaded, var(--font-sans-loaded, system-ui))' }}
            >
              Simple, transparent pricing.
            </h2>

            {/* Billing toggle — inline with heading on wider screens */}
            <div className="flex items-center gap-3 pb-2">
              <span className={`text-sm transition-colors duration-[var(--dur-ui-fast)] ${!yearly ? 'text-[var(--text)]' : 'text-[var(--text-subtle)]'}`}>
                Monthly
              </span>
              <button
                onClick={() => setYearly((v) => !v)}
                className="relative w-12 h-6 rounded-full transition-colors duration-[var(--dur-ui-fast)] border border-[var(--border)]"
                style={{ background: yearly ? 'var(--brand-dim)' : 'var(--surface-2)' }}
                aria-checked={yearly}
                role="switch"
                aria-label="Toggle annual billing"
              >
                <motion.div
                  animate={{ x: yearly ? 24 : 2, y: '-50%' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className="absolute left-0 top-1/2 w-4 h-4 rounded-full"
                  style={{ background: yearly ? 'var(--brand)' : 'var(--text-muted)' }}
                />
              </button>
              <span className={`text-sm transition-colors duration-[var(--dur-ui-fast)] ${yearly ? 'text-[var(--text)]' : 'text-[var(--text-subtle)]'}`}>
                Annual
                <span className="ml-1.5 tabular text-[var(--brand)] text-xs font-medium">−20%</span>
              </span>
            </div>
          </motion.div>
        </div>

        {/* Comparison strip — one shared container, divide-x */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-[var(--border)] border border-[var(--border)] rounded-xl overflow-hidden"
        >
          {pricingTiers.map((tier) => (
            <div
              key={tier.id}
              className={`flex flex-col p-8 bg-[var(--surface)] ${
                tier.popular ? 'border-t-2 lg:border-t-2 border-t-[var(--brand)] lg:border-l-0' : ''
              }`}
            >
              {/* Tier name + description */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-lg font-semibold text-[var(--text)]">{tier.name}</h3>
                  {tier.popular && (
                    <span className="tabular text-[10px] px-2 py-0.5 rounded-full bg-[var(--brand-dim)] text-[var(--brand)] border border-[var(--brand)]/30 uppercase tracking-wide font-medium">
                      Popular
                    </span>
                  )}
                </div>
                <p className="text-sm text-[var(--text-subtle)]">{tier.description}</p>
              </div>

              {/* Price */}
              <div className="mb-6">
                <PriceDisplay price={tier.price} yearly={yearly} />
              </div>

              {/* CTA */}
              <a
                href={tier.href}
                className={`btn-press block w-full py-2.5 px-6 text-center text-sm font-semibold rounded-lg mb-8 transition-colors duration-[var(--dur-ui-fast)] ${
                  tier.popular
                    ? 'bg-[var(--brand)] hover:bg-[var(--brand-strong)] text-white'
                    : 'bg-[var(--surface-2)] hover:bg-[var(--surface-3)] text-[var(--text)] border border-[var(--border)]'
                }`}
              >
                {tier.cta}
              </a>

              {/* Features */}
              <ul className="space-y-3 flex-1">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-[var(--brand)]">
                      <CheckIcon />
                    </span>
                    <span className="text-sm text-[var(--text-muted)]">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center text-[var(--text-subtle)] text-sm mt-8"
        >
          All plans include a 14-day free trial. No card required.{' '}
          <a href="#contact" className="text-[var(--brand)] hover:text-[var(--brand-strong)] transition-colors duration-[var(--dur-ui-fast)]">
            Questions? Talk to us.
          </a>
        </motion.p>
      </div>
    </section>
  )
}
