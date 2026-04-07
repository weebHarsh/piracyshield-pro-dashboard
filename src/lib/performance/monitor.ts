'use client'

import { useEffect } from 'react'

export function usePerformanceMonitor() {
  useEffect(() => {
    if (typeof window === 'undefined' || process.env.NODE_ENV === 'development') {
      return
    }

    // Report Web Vitals
    const reportWebVitals = () => {
      if ('performance' in window && 'getEntriesByType' in performance) {
        // Largest Contentful Paint
        const lcpEntries = performance.getEntriesByType('largest-contentful-paint')
        const lcp = lcpEntries[lcpEntries.length - 1]
        if (lcp) {
          console.log('LCP:', lcp.startTime)
          // Send to analytics
          if (window.gtag) {
            window.gtag('event', 'web_vitals', {
              name: 'LCP',
              value: lcp.startTime,
              event_category: 'Web Vitals',
              event_label: 'Largest Contentful Paint',
            })
          }
        }

        // First Input Delay
        const fidEntries = performance.getEntriesByType('first-input')
        const fid = fidEntries[0] as FirstInputEntry
        if (fid) {
          console.log('FID:', fid.processingStart - fid.startTime)
          if (window.gtag) {
            window.gtag('event', 'web_vitals', {
              name: 'FID',
              value: fid.processingStart - fid.startTime,
              event_category: 'Web Vitals',
              event_label: 'First Input Delay',
            })
          }
        }

        // Cumulative Layout Shift
        let clsValue = 0
        const clsEntries = performance.getEntriesByType('layout-shift')
        clsEntries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value
          }
        })
        console.log('CLS:', clsValue)
        if (window.gtag) {
          window.gtag('event', 'web_vitals', {
            name: 'CLS',
            value: clsValue,
            event_category: 'Web Vitals',
            event_label: 'Cumulative Layout Shift',
          })
        }

        // Time to First Byte
        const navigationEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[]
        if (navigationEntries.length > 0) {
          const ttfb = navigationEntries[0].responseStart - navigationEntries[0].requestStart
          console.log('TTFB:', ttfb)
          if (window.gtag) {
            window.gtag('event', 'web_vitals', {
              name: 'TTFB',
              value: ttfb,
              event_category: 'Web Vitals',
              event_label: 'Time to First Byte',
            })
          }
        }
      }
    }

    // Report after page load
    if (document.readyState === 'complete') {
      setTimeout(reportWebVitals, 0)
    } else {
      window.addEventListener('load', () => {
        setTimeout(reportWebVitals, 0)
      })
    }

    // Monitor Long Tasks
    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            if (entry.entryType === 'longtask') {
              console.warn('Long Task detected:', entry.duration + 'ms')
              if (window.gtag) {
                window.gtag('event', 'long_task', {
                  duration: entry.duration,
                  name: entry.name,
                })
              }
            }
          })
        })
        observer.observe({ entryTypes: ['longtask'] })
      } catch (e) {
        // Long Task API not supported
      }
    }
  }, [])
}

// Performance budget checker
export function checkPerformanceBudget() {
  const budgets = {
    LCP: 2500, // 2.5s
    FID: 100, // 100ms
    CLS: 0.1, // 0.1
    TTFB: 600, // 600ms
    bundleSize: 500000, // 500KB
  }

  if (typeof window !== 'undefined' && 'performance' in window) {
    setTimeout(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      const lcpEntries = performance.getEntriesByType('largest-contentful-paint')
      const lcp = lcpEntries[lcpEntries.length - 1] as any
      const fidEntries = performance.getEntriesByType('first-input')
      const fid = fidEntries[0] as any

      const metrics = {
        TTFB: navigation?.responseStart - navigation?.requestStart || 0,
        LCP: lcp?.startTime || 0,
        FID: fid ? fid.processingStart - fid.startTime : 0,
        CLS: 0, // Calculate similarly
      }

      console.group('Performance Budget Check')
      Object.entries(metrics).forEach(([key, value]) => {
        const budget = budgets[key as keyof typeof budgets]
        const status = value <= budget ? '✅' : '❌'
        console.log(`${status} ${key}: ${value}ms (budget: ${budget}ms)`)
      })
      console.groupEnd()
    }, 3000)
  }
}

// Add global type declarations
declare global {
  interface Window {
    gtag?: (command: string, action: string, params: any) => void
  }
}

// Type for First Input Entry
interface FirstInputEntry extends PerformanceEntry {
  processingStart: number
  startTime: number
  hadRecentInput?: boolean
}