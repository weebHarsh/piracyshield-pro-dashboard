export { gsap } from 'gsap'
export { ScrollTrigger } from 'gsap/ScrollTrigger'
export { TextPlugin } from 'gsap/TextPlugin'

// Initialize ScrollTrigger
export const initScrollTrigger = () => {
  if (typeof window !== 'undefined') {
    const { gsap } = require('gsap')
    const { ScrollTrigger } = require('gsap/ScrollTrigger')
    gsap.registerPlugin(ScrollTrigger)
    return { gsap, ScrollTrigger }
  }
  return null
}

// Scroll animation configurations
export const scrollAnimationConfig = {
  // Fade in from bottom
  fadeInUp: {
    from: { opacity: 0, y: 100 },
    to: { opacity: 1, y: 0, duration: 0.8 },
  },
  
  // Fade in from left
  fadeInLeft: {
    from: { opacity: 0, x: -100 },
    to: { opacity: 1, x: 0, duration: 0.8 },
  },
  
  // Fade in from right
  fadeInRight: {
    from: { opacity: 0, x: 100 },
    to: { opacity: 1, x: 0, duration: 0.8 },
  },
  
  // Scale in
  scaleIn: {
    from: { opacity: 0, scale: 0.8 },
    to: { opacity: 1, scale: 1, duration: 0.8 },
  },
  
  // Stagger children
  stagger: {
    each: 0.1,
    from: 'start',
  },
}

// Easing configurations
export const easings = {
  smooth: 'power2.out',
  bounce: 'back.out(1.7)',
  elastic: 'elastic.out(1, 0.3)',
  smoothInOut: 'power2.inOut',
  expo: 'expo.out',
}