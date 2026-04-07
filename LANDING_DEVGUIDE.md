# Landing Page Developer Guide

## Quick Start

```bash
# Start development server
cd piracyshield-pro
npm run dev

# Visit http://localhost:3000
# Dashboard available at http://localhost:3000/dashboard
```

## Architecture Overview

### Route Structure
```
src/app/
├── (landing)/              # Public landing page
│   ├── layout.tsx         # Landing layout with nav/footer
│   └── page.tsx           # Main landing page
├── (dashboard)/           # Protected dashboard
│   ├── layout.tsx         # Dashboard layout
│   └── dashboard/page.tsx # Dashboard home
└── (auth)/                # Authentication pages
    └── login/page.tsx     # Login page
```

### Component Architecture

#### Three.js Components (`src/components/three/`)
- **Scene.tsx**: Canvas wrapper with camera, lights, and performance settings
- **FloatingGeometry.tsx**: Animated 3D shapes (octahedron, torus, sphere, box)
- **ParticleSystem.tsx**: Background particle effects with color gradients
- **ShieldModel.tsx**: 3D shield logo component

#### Landing Page Components (`src/components/landing/`)
- **shared/Navigation.tsx**: Glassmorphism navbar with scroll hide/show
- **shared/Footer.tsx**: Multi-column footer with social links
- **shared/ScrollProgress.tsx**: Fixed progress indicator
- **Hero/HeroSection.tsx**: Main hero with 3D background and stats
- **Hero/AnimatedStats.tsx**: Count-up animation for statistics
- **Hero/HeroFallback.tsx**: CSS-only fallback for non-WebGL devices

## Component Patterns

### 1. Dynamic Imports for Heavy Components

```typescript
// Use for Three.js and other heavy libraries
const Scene = dynamic(
  () => import('@/components/three/Scene').then((mod) => mod.Scene),
  { 
    ssr: false,  // Disable server-side rendering
    loading: () => <FallbackComponent />,  // Show while loading
  }
)
```

### 2. Device Capability Detection

```typescript
import { useDeviceCapabilities, useReducedMotion } from '@/hooks'

function MyComponent() {
  const capabilities = useDeviceCapabilities()
  const prefersReducedMotion = useReducedMotion()
  
  const shouldRender3D = capabilities.hasWebGL && 
                         !capabilities.isLowEnd && 
                         !prefersReducedMotion
  
  return shouldRender3D ? <Scene3D /> : <Scene2D />
}
```

### 3. Animation Variants

```typescript
import { fadeInUp, staggerContainer, TIMING } from '@/lib/animations/variants'

function MyComponent() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      <motion.div variants={fadeInUp}>Item 1</motion.div>
      <motion.div variants={fadeInUp}>Item 2</motion.div>
    </motion.div>
  )
}
```

### 4. Scroll-Triggered Animations

```typescript
import { useScrollAnimation, useIntersectionObserver } from '@/hooks'

function MySection() {
  const { ref, isInView } = useScrollAnimation(0.1)
  
  return (
    <section ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
      >
        Content that animates when scrolled into view
      </motion.div>
    </section>
  )
}
```

## Styling Guidelines

### Tailwind CSS Classes

#### Brand Colors
```css
/* Teal - Primary */
bg-teal-500, bg-teal-600, bg-teal-700
text-teal-400, text-teal-500
border-teal-500

/* Gradient - Primary */
bg-gradient-to-r from-teal-500 to-teal-600
bg-gradient-to-br from-teal-500 to-purple-600

/* Background - Dark Theme */
bg-gray-900, bg-gray-800, bg-gray-700
text-white, text-gray-300, text-gray-400
```

#### Glassmorphism Effect
```css
/* Navigation, Cards */
className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50"

/* Dark glassmorphism */
className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/50"
```

#### Hover Effects
```css
/* Buttons */
className="hover:shadow-teal-500/40 transition-all"

/* Cards */
className="hover:scale-105 transition-transform"

/* Glow effect */
className="hover:shadow-lg hover:shadow-teal-500/25"
```

### Animation Classes

#### Fade In Up
```css
/* In component */
className="animate-fade-in-up"
```

#### Slide In
```css
/* From left */
className="animate-slide-in-left"

/* From right */
className="animate-slide-in-right"
```

#### Pulse
```css
/* Background elements */
className="animate-pulse"
```

## Performance Guidelines

### Animation Budget (60fps = 16.67ms per frame)

```typescript
const ANIMATION_BUDGET = {
  hero: {
    threeJS: 8,      // 8ms for 3D rendering
    particles: 4,    // 4ms for particle system
    dom: 2,          // 2ms for DOM animations
    total: 14,       // Total budget
  },
  scroll: {
    calculation: 2,  // Position calculations
    render: 10,      // Re-render animations
    total: 12,
  },
}
```

### Bundle Size Targets

```yaml
First Load JS:
  max: 150KB
  warning: 130KB

Third-party Libraries:
  three: 150KB gzipped
  gsap: 45KB
  framer-motion: 30KB
  react-spring: 20KB
```

### Optimization Techniques

1. **Lazy Load Heavy Components**
```typescript
const HeavyComponent = dynamic(
  () => import('./HeavyComponent'),
  { loading: () => <Skeleton /> }
)
```

2. **Reduce Animation Complexity on Mobile**
```typescript
const particleCount = useMediaQuery('(max-width: 768px)') ? 100 : 500
```

3. **Use CSS for Simple Animations**
```css
/* Instead of Framer Motion for simple animations */
.element {
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
```

4. **Memoize Expensive Calculations**
```typescript
import { useMemo } from 'react'

function ExpensiveComponent({ data }) {
  const processedData = useMemo(() => {
    return expensiveCalculation(data)
  }, [data])
  
  return <div>{processedData}</div>
}
```

5. **Virtualize Long Lists**
```typescript
// Use libraries like react-window for long lists
import { FixedSizeList } from 'react-window'
```

## Testing Checklist

### Browser Testing
- [ ] Chrome (Desktop & Mobile)
- [ ] Firefox (Desktop)
- [ ] Safari (Desktop & Mobile)
- [ ] Edge (Desktop)
- [ ] Low-end devices
- [ ] Slow network (3G)

### Accessibility Testing
- [ ] Keyboard navigation
- [ ] Screen reader compatibility
- [ ] Color contrast (WCAG AA)
- [ ] Reduced motion preferences
- [ ] Focus indicators
- [ ] ARIA labels

### Performance Testing
- [ ] Lighthouse audit (> 85)
- [ ] Core Web Vitals
- [ ] Bundle size (< 500KB gzipped)
- [ ] Animation frame rate (60fps)
- [ ] Memory usage
- [ ] CPU usage on mobile

### Device Testing
- [ ] Desktop (1920x1080)
- [ ] Laptop (1366x768)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)
- [ ] Low-end Android
- [ ] High-end iOS

## Common Issues & Solutions

### Issue: Three.js Bundle Too Large
**Solution**: Use dynamic imports and tree shaking
```typescript
// Only import what you need
import { Scene, PerspectiveCamera } from 'three'
// Not: import * as THREE from 'three'
```

### Issue: Hydration Mismatch
**Solution**: Use suppressHydrationWarning or client-only rendering
```typescript
<span suppressHydrationWarning>{count}</span>

// Or
const ClientOnly = dynamic(() => import('./ClientOnly'), { ssr: false })
```

### Issue: Animation Jank on Mobile
**Solution**: Detect device capabilities and reduce complexity
```typescript
const capabilities = useDeviceCapabilities()
const particleCount = capabilities.isLowEnd ? 50 : 500
```

### Issue: Scroll Performance Issues
**Solution**: Use passive event listeners and requestAnimationFrame
```typescript
useEffect(() => {
  const handleScroll = () => {
    requestAnimationFrame(() => {
      // Update position
    })
  }
  
  window.addEventListener('scroll', handleScroll, { passive: true })
  return () => window.removeEventListener('scroll', handleScroll)
}, [])
```

## Debugging Tips

### 1. Performance Profiling
```bash
# Chrome DevTools
# 1. Open DevTools (F12)
# 2. Go to Performance tab
# 3. Click Record
# 4. Interact with page
# 5. Stop recording
# 6. Analyze flame graph
```

### 2. Three.js Debugging
```typescript
// Add stats to see FPS
import Stats from 'three/examples/jsm/libs/stats.module'

const stats = new Stats()
document.body.appendChild(stats.dom)

useFrame(() => {
  stats.update()
})
```

### 3. Animation Debugging
```typescript
// Log animation performance
useFrame(() => {
  const start = performance.now()
  // Animation logic
  const duration = performance.now() - start
  if (duration > 16) {
    console.warn('Frame took too long:', duration)
  }
})
```

## Next Developer Steps

### Immediate (Day 3)
1. Optimize Three.js scene with instanced meshes
2. Add post-processing effects (bloom, depth)
3. Implement mouse-follow parallax
4. Integrate GSAP ScrollTrigger

### Short Term (Days 4-5)
1. Build Feature showcase section
2. Create Testimonials carousel
3. Implement Pricing section
4. Add CTA section

### Medium Term (Days 6-7)
1. Integration testing
2. Cross-browser testing
3. Performance optimization
4. Accessibility audit
5. Final polish

## Resources

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Three.js Docs](https://threejs.org/docs/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [Framer Motion](https://www.framer.com/motion/)
- [GSAP](https://greensock.com/docs/)

### Performance
- [Web.dev Performance](https://web.dev/performance/)
- [React Performance](https://react.dev/learn/render-and-commit)
- [Three.js Performance](https://threejs.org/docs/#manual/en/introduction/Performance)

### Accessibility
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [Reduced Motion](https://web.dev/prefers-reduced-motion/)