'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const pricingTiers = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    period: 'forever',
    description: 'Perfect for getting started',
    features: [
      '50 keywords monitored',
      '5 platforms scanned',
      '100 incidents per month',
      'Basic analytics',
      'Email support',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 99,
    period: 'month',
    description: 'Best for growing creators',
    features: [
      'Unlimited keywords',
      'All platforms (1000+)',
      'Unlimited incidents',
      'Advanced analytics',
      'Automatic takedowns',
      'API access',
      'Priority support',
    ],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    period: '',
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
    popular: false,
  },
]

function PricingCard({ tier, index }: { tier: typeof pricingTiers[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`relative ${
        tier.popular ? 'lg:-mt-4' : ''
      }`}
    >
      {/* Popular badge */}
      {tier.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-sm font-semibold rounded-full shadow-lg">
          Most Popular
        </div>
      )}
      
      <motion.div
        whileHover={{ y: -8 }}
        className={`h-full bg-gray-900/80 backdrop-blur-xl rounded-2xl border ${
          tier.popular
            ? 'border-teal-500/50 shadow-xl shadow-teal-500/20'
            : 'border-gray-700/50'
        } overflow-hidden`}
      >
        {/* Gradient top border */}
        {tier.popular && (
          <div className="h-1 bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-500" />
        )}
        
        <div className="p-8">
          {/* Tier name */}
          <h3 className="text-xl font-semibold text-white mb-2">{tier.name}</h3>
          <p className="text-sm text-gray-400 mb-6">{tier.description}</p>
          
          {/* Price */}
          <div className="mb-6">
            <div className="flex items-baseline gap-2">
              {typeof tier.price === 'number' ? (
                <>
                  <span className="text-4xl font-bold text-white">${tier.price}</span>
                  <span className="text-gray-400">/{tier.period}</span>
                </>
              ) : (
                <span className="text-4xl font-bold text-white">{tier.price}</span>
              )}
            </div>
          </div>
          
          {/* Features */}
          <ul className="space-y-3 mb-8">
            {tier.features.map((feature, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: index * 0.1 + i * 0.05 }}
                className="flex items-start gap-3"
              >
                <svg
                  className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm text-gray-300">{feature}</span>
              </motion.li>
            ))}
          </ul>
          
          {/* CTA */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${
              tier.popular
                ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white hover:from-teal-600 hover:to-teal-700 shadow-lg shadow-teal-500/25'
                : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
            }`}
          >
            {tier.cta}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function PricingSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly')
  
  return (
    <section ref={sectionRef} id="pricing" className="relative py-24 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Simple,{' '}
            <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Transparent Pricing
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Choose the plan that fits your needs. All plans include a 14-day free trial.
          </p>
          
          {/* Billing toggle */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <span className={`text-sm ${billingPeriod === 'monthly' ? 'text-white' : 'text-gray-400'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly')}
              className="relative w-14 h-7 bg-gray-700 rounded-full transition-colors"
            >
              <motion.div
                animate={{ x: billingPeriod === 'yearly' ? 28 : 0 }}
                className="absolute left-0 top-0 w-7 h-7 bg-teal-500 rounded-full"
              />
            </button>
            <span className={`text-sm ${billingPeriod === 'yearly' ? 'text-white' : 'text-gray-400'}`}>
              Yearly
              <span className="ml-1 text-teal-400 text-xs">(Save 20%)</span>
            </span>
          </div>
        </motion.div>
        
        {/* Pricing cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
          {pricingTiers.map((tier, index) => (
            <PricingCard key={tier.id} tier={tier} index={index} />
          ))}
        </div>
        
        {/* FAQ link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-gray-400">
            Need help choosing?{' '}
            <a href="#contact" className="text-teal-400 hover:text-teal-300 underline">
              Contact our sales team
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}