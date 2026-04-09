'use client'

import { ReactNode } from 'react'
import { Navigation, Footer, ScrollProgress } from '@/components/landing/shared'
import { generateStructuredData, generateFAQSchema, generateOrganizationSchema } from '@/lib/seo/structured-data'

export default function LandingLayout({
  children,
}: {
  children: ReactNode
}) {
  const softwareSchema = generateStructuredData()
  const faqSchema = generateFAQSchema()
  const orgSchema = generateOrganizationSchema()
  
  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      
      <a
        href="#main-content"
        className="skip-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-teal-700 focus:text-white focus:px-4 focus:py-2 focus:rounded-md"
      >
        Skip to main content
      </a>
      <ScrollProgress />
      <Navigation />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  )
}