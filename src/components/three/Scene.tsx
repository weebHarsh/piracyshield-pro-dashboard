'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { FloatingGeometry } from './FloatingGeometry'
import { OptimizedParticles } from './OptimizedParticles'
import { MouseParallax } from './MouseParallax'

interface SceneProps {
  /** Stop the render loop when false (hero scrolled out of view) */
  isActive?: boolean
  isMobile?: boolean
}

export function Scene({ isActive = true, isMobile = false }: SceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      className="absolute inset-0"
      dpr={[1, isMobile ? 1.5 : 2]}
      performance={{ min: 0.5 }}
      frameloop={isActive ? 'always' : 'never'}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.2} />
        <pointLight position={[-10, -10, -10]} intensity={0.4} />

        <MouseParallax factor={0.8}>
          <FloatingGeometry />
          <OptimizedParticles count={isMobile ? 100 : 500} />
        </MouseParallax>
      </Suspense>
    </Canvas>
  )
}
