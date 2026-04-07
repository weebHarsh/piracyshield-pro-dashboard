'use client'

import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useDeviceCapabilities } from '@/hooks'

interface OptimizedParticlesProps {
  count?: number
}

export function OptimizedParticles({ count = 500 }: OptimizedParticlesProps) {
  const meshRef = useRef<THREE.Points>(null)
  const { viewport } = useThree()
  const capabilities = useDeviceCapabilities()
  
  const particleCount = capabilities.isMobile ? Math.min(count, 100) : count
  
  const { positions, colors, scales } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const scales = new Float32Array(particleCount)
    
    const color1 = new THREE.Color('#14b8a6')
    const color2 = new THREE.Color('#8b5cf6')
    const color3 = new THREE.Color('#06b6d4')
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      
      positions[i3] = (Math.random() - 0.5) * 30
      positions[i3 + 1] = (Math.random() - 0.5) * 30
      positions[i3 + 2] = (Math.random() - 0.5) * 30
      
      const colorChoice = Math.random()
      let particleColor
      if (colorChoice < 0.33) {
        particleColor = color1
      } else if (colorChoice < 0.66) {
        particleColor = color2
      } else {
        particleColor = color3
      }
      
      colors[i3] = particleColor.r
      colors[i3 + 1] = particleColor.g
      colors[i3 + 2] = particleColor.b
      
      scales[i] = Math.random() * 2 + 0.5
    }
    
    return { positions, colors, scales }
  }, [particleCount])
  
  useFrame((state, delta) => {
    if (!meshRef.current) return
    
    meshRef.current.rotation.y -= delta * 0.03
    meshRef.current.rotation.x -= delta * 0.01
    
    const positions = meshRef.current.geometry.attributes.position.array as Float32Array
    const time = state.clock.elapsedTime
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      const x = positions[i3]
      const y = positions[i3 + 1]
      const z = positions[i3 + 2]
      
      // Wave motion
      positions[i3 + 1] = y + Math.sin(time * 0.5 + x * 0.1) * 0.01
    }
    
    meshRef.current.geometry.attributes.position.needsUpdate = true
  })
  
  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
        <bufferAttribute
          attach="attributes-scale"
          args={[scales, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}