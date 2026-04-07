'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { FloatingGeometry } from './FloatingGeometry'
import { OptimizedParticles } from './OptimizedParticles'
import { MouseParallax } from './MouseParallax'
import { useDeviceCapabilities, useReducedMotion } from '@/hooks'

export function Scene() {
  const capabilities = useDeviceCapabilities()
  const prefersReducedMotion = useReducedMotion()
  
  const shouldRender3D = capabilities.hasWebGL && 
                         !capabilities.isLowEnd && 
                         !prefersReducedMotion

  if (!shouldRender3D) {
    return null
  }

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      className="absolute inset-0"
      dpr={[1, capabilities.isMobile ? 1.5 : 2]}
      performance={{ min: 0.5 }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.2} />
        <pointLight position={[-10, -10, -10]} intensity={0.4} />
        
        <MouseParallax factor={0.8}>
          <FloatingGeometry />
          <OptimizedParticles 
            count={capabilities.isMobile ? 100 : capabilities.isLowEnd ? 50 : 500} 
          />
        </MouseParallax>
      </Suspense>
    </Canvas>
  )
}