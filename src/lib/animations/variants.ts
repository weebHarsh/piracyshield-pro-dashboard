// Animation timing constants
export const TIMING = {
  // Durations
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
  verySlow: 0.8,
  
  // Delays
  stagger: {
    fast: 0.05,
    normal: 0.1,
    slow: 0.15,
  },
  
  // Easing
  easing: {
    smooth: [0.25, 0.1, 0.25, 1],
    spring: { type: 'spring', stiffness: 300, damping: 30 },
    gentle: { type: 'spring', stiffness: 200, damping: 40 },
    bouncy: { type: 'spring', stiffness: 400, damping: 20 },
  },
} as const

// Animation variants for Framer Motion
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

export const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
}

export const slideInLeft = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
}

export const slideInRight = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 50 },
}

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: TIMING.stagger.normal,
    },
  },
}

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: TIMING.easing.smooth,
  },
}

// Scroll-triggered animations
export const scrollReveal = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: TIMING.normal },
}

// Hover effects
export const hoverLift = {
  whileHover: { y: -8, transition: TIMING.easing.smooth },
}

export const hoverScale = {
  whileHover: { scale: 1.05, transition: TIMING.easing.smooth },
}

export const hoverGlow = {
  whileHover: {
    boxShadow: '0 0 30px rgba(20, 184, 166, 0.3)',
    transition: TIMING.easing.smooth,
  },
}

// Tap/click effects
export const tapScale = {
  whileTap: { scale: 0.95 },
}

// Counter animation
export const counterAnimation = {
  initial: { opacity: 0, scale: 0.5 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 20,
    },
  },
}

// Text animations
export const textReveal = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: TIMING.normal,
      ease: 'easeOut',
    },
  },
}

// Navigation animations
export const navHideShow = {
  initial: { y: -100 },
  animate: { y: 0 },
  exit: { y: -100 },
}

// Modal animations
export const modalBackdrop = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

export const modalContent = {
  initial: { opacity: 0, scale: 0.9, y: 20 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.9, y: 20 },
}

// Performance breakpoints
export const PERFORMANCE = {
  // Frame budget (60fps = 16.67ms)
  frameBudget: 16.67,
  
  // Reduced motion users
  preferReducedMotion: true,
  
  // Mobile thresholds
  mobileParticleCount: 100,
  desktopParticleCount: 500,
  
  // Animation modes
  mode: {
    full: {
      enable3D: true,
      enableParticles: true,
      enableVideoBackgrounds: true,
      enableParallax: true,
      particleCount: 500,
    },
    reduced: {
      enable3D: false,
      enableParticles: true,
      enableVideoBackgrounds: false,
      enableParallax: false,
      particleCount: 200,
    },
    minimal: {
      enable3D: false,
      enableParticles: false,
      enableVideoBackgrounds: false,
      enableParallax: false,
      particleCount: 50,
    },
  },
} as const