'use client'

import { HeroSection } from '@/components/landing/Hero/HeroSection'
import { FeatureShowcase } from '@/components/landing/Features/FeatureShowcase'
import { LiveDemo } from '@/components/landing/Demo/LiveDemo'
import { TestimonialsCarousel } from '@/components/landing/Testimonials/TestimonialsCarousel'
import { PricingSection } from '@/components/landing/Pricing/PricingSection'
import { CTASection } from '@/components/landing/CTA/CTASection'

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <FeatureShowcase />
      <LiveDemo />
      <TestimonialsCarousel />
      <PricingSection />
      <CTASection />
    </>
  )
}
