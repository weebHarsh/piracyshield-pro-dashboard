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
      <div className="section-divider" />
      <FeatureShowcase />
      <div className="section-divider" />
      <LiveDemo />
      <div className="section-divider" />
      <TestimonialsCarousel />
      <div className="section-divider" />
      <PricingSection />
      <div className="section-divider" />
      <CTASection />
    </>
  )
}
