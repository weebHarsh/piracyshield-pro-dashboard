export function generateStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'PiracyShield Pro',
    applicationCategory: 'SecurityApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '99',
      priceCurrency: 'USD',
      priceValidUntil: '2025-12-31',
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '2847',
      bestRating: '5',
      worstRating: '1',
    },
    creator: {
      '@type': 'Organization',
      name: 'PiracyShield Pro',
      url: 'https://piracyshield.pro',
      logo: 'https://piracyshield.pro/logo.png',
      sameAs: [
        'https://twitter.com/piracyshield',
        'https://linkedin.com/company/piracyshield',
        'https://github.com/piracyshield',
      ],
    },
    featureList: [
      'AI-powered content detection',
      'Real-time monitoring across 1000+ platforms',
      'Automated DMCA takedowns',
      'Advanced analytics dashboard',
      'Team collaboration',
      'API access',
    ],
    screenshot: 'https://piracyshield.pro/screenshot.png',
    releaseNotes: 'https://piracyshield.pro/changelog',
  }
}

export function generateFAQSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How does PiracyShield detect pirated content?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'PiracyShield uses advanced AI and machine learning algorithms to scan 1000+ platforms including streaming sites, file-sharing platforms, and social media. Our system continuously monitors for your content keywords and fingerprints.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the success rate for takedowns?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'PiracyShield has a 95% success rate for automated DMCA takedown requests. Our system handles the entire process from detection to takedown, saving you time and legal fees.',
        },
      },
      {
        '@type': 'Question',
        name: 'How many platforms does PiracyShield monitor?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'PiracyShield monitors over 1000+ platforms including streaming sites, torrent trackers, cyberlockers, social media platforms, and more. We continuously add new platforms to our monitoring network.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is there a free trial?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! All plans include a 14-day free trial. You can test all features including monitoring, detection, and automated takedowns before committing to a paid plan.',
        },
      },
    ],
  }
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'PiracyShield Pro',
    url: 'https://piracyshield.pro',
    logo: 'https://piracyshield.pro/logo.png',
    description: 'AI-powered content protection and anti-piracy platform',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-888-PIRACY',
      contactType: 'customer service',
      availableLanguage: 'English',
    },
    sameAs: [
      'https://twitter.com/piracyshield',
      'https://linkedin.com/company/piracyshield',
      'https://github.com/piracyshield',
    ],
  }
}