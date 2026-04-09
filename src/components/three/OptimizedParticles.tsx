'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface OptimizedParticlesProps {
  count?: number
}

export function OptimizedParticles({ count = 500 }: OptimizedParticlesProps) {
  const meshRef = useRef<THREE.Points>(null)
  const frameCount = useRef(0)

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    const color1 = new THREE.Color('#14b8a6')
    const color2 = new THREE.Color('#8b5cf6')
    const color3 = new THREE.Color('#06b6d4')

    for (let i = 0; i < count; i++) {
      const i3 = i * 3

      positions[i3]     = (Math.random() - 0.5) * 30
      positions[i3 + 1] = (Math.random() - 0.5) * 30
      positions[i3 + 2] = (Math.random() - 0.5) * 30

      const colorChoice = Math.random()
      const particleColor =
        colorChoice < 0.33 ? color1 : colorChoice < 0.66 ? color2 : color3

      colors[i3]     = particleColor.r
      colors[i3 + 1] = particleColor.g
      colors[i3 + 2] = particleColor.b
    }

    return { positions, colors }
  }, [count])

  useFrame((state, delta) => {
    if (!meshRef.current) return

    // Rotation runs every frame — cheap single matrix op
    meshRef.current.rotation.y -= delta * 0.03
    meshRef.current.rotation.x -= delta * 0.01

    // Wave mutation: skip 2 of every 3 frames — imperceptible at this scale
    frameCount.current++
    if (frameCount.current % 3 !== 0) return

    const posArr = meshRef.current.geometry.attributes.position.array as Float32Array
    const time = state.clock.elapsedTime

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const x = posArr[i3]
      posArr[i3 + 1] += Math.sin(time * 0.5 + x * 0.1) * 0.01
    }

    meshRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color"    args={[colors, 3]} />
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
