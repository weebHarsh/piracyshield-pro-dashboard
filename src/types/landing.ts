export interface LandingPageProps {}

export interface HeroSectionProps {
  title?: string
  subtitle?: string
  ctaText?: string
}

export interface AnimatedStatsProps {
  stats: Array<{
    value: number
    label: string
    suffix?: string
    prefix?: string
  }>
}

export interface Feature {
  id: string
  title: string
  description: string
  icon: string
  animation?: string
}

export interface FeatureCardProps {
  feature: Feature
  index: number
}

export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  quote: string
  avatar?: string
  rating: number
}

export interface PricingTier {
  id: string
  name: string
  price: number | 'Custom'
  period?: string
  features: string[]
  popular?: boolean
  ctaText: string
}

export interface NavigationProps {
  transparent?: boolean
}

export interface FooterProps {}

export interface DeviceCapabilities {
  hasWebGL: boolean
  isLowEnd: boolean
  isMobile: boolean
  prefersReducedMotion: boolean
  connectionSpeed: 'slow-2g' | '2g' | '3g' | '4g' | 'unknown'
}

export type AnimationMode = 'full' | 'reduced' | 'minimal'