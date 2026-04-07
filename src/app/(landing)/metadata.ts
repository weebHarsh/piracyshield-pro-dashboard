import type { Metadata } from 'next'
import type { Viewport } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://piracyshield.pro'),
  
  title: {
    default: 'PiracyShield Pro - AI-Powered Content Protection & Anti-Piracy Platform',
    template: '%s | PiracyShield Pro',
  },
  
  description: 'Protect your content from piracy with AI-powered monitoring, real-time detection across 1000+ platforms, and automated DMCA takedowns. Trusted by 15,000+ creators worldwide.',
  
  keywords: [
    'content protection',
    'anti-piracy',
    'DMCA takedown',
    'piracy monitoring',
    'content security',
    'digital rights management',
    'copyright protection',
    'streaming protection',
    'course protection',
    'software protection',
  ],
  
  authors: [{ name: 'PiracyShield Pro' }],
  creator: 'PiracyShield Pro',
  publisher: 'PiracyShield Pro',
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://piracyshield.pro',
    siteName: 'PiracyShield Pro',
    title: 'PiracyShield Pro - Protect Your Content from Piracy',
    description: 'AI-powered content protection. Monitor 1000+ platforms, detect piracy in real-time, and automatically issue takedowns. 95% success rate.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'PiracyShield Pro - Content Protection Platform',
      },
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    site: '@piracyshield',
    creator: '@piracyshield',
    title: 'PiracyShield Pro - Protect Your Content from Piracy',
    description: 'AI-powered content protection. Monitor 1000+ platforms, detect piracy in real-time, and automatically issue takedowns. 95% success rate.',
    images: ['/twitter-image.png'],
  },
  
  alternates: {
    canonical: 'https://piracyshield.pro',
  },
  
  verification: {
    google: 'google-site-verification-code',
    // Add other verification codes as needed
  },
  
  category: 'technology',
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f766e' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default metadata