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
      
      <ScrollProgress />
      <Navigation />
      <main>{children}</main>
      <Footer />
    </>
  )
}