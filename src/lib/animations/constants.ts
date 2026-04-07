// Animation constants
export const ANIMATION_CONFIG = {
  // Sections animation timing
  sections: {
    hero: {
      duration: 0.8,
      stagger: 0.1,
    },
    features: {
      duration: 0.5,
      stagger: 0.15,
    },
    testimonials: {
      duration: 0.6,
      stagger: 0.1,
    },
    pricing: {
      duration: 0.5,
      stagger: 0.1,
    },
  },
  
  // Three.js config
  threejs: {
    particles: {
      desktop: 500,
      tablet: 200,
      mobile: 100,
      lowEnd: 50,
    },
    camera: {
      fov: 60,
      near: 0.1,
      far: 1000,
      position: [0, 0, 5],
    },
    scene: {
      background: '#000000',
      fog: {
        color: '#0f766e',
        near: 1,
        far: 50,
      },
    },
  },
  
  // Scroll settings
  scroll: {
    threshold: 0.1,
    rootMargin: '-100px',
    debounceTime: 100,
  },
  
  // Transition settings
  transition: {
    page: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    },
    modal: {
      duration: 0.3,
      ease: 'easeOut',
    },
    hover: {
      duration: 0.2,
      ease: 'easeInOut',
    },
  },
  
  // Counter animation
  counter: {
    duration: 2,
    ease: 'easeOut',
  },
  
  // Typed text
  typed: {
    typeSpeed: 50,
    deleteSpeed: 30,
    pauseTime: 2000,
  },
} as const

// Breakpoints
export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const

// Z-index layers
export const Z_INDEX = {
  background: -1,
  base: 0,
  content: 10,
  navigation: 50,
  modal: 100,
  overlay: 150,
  tooltip: 200,
} as const