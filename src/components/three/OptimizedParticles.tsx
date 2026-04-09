'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface OptimizedParticlesProps {
  count?: number
}

const MAX_LINE_PAIRS = 300 // max line segments to draw
const TRACKED        = 60  // particles to check for proximity (O(n²) capped)
const THRESHOLD_SQ   = 16  // 4 units squared — connection distance

export function OptimizedParticles({ count = 500 }: OptimizedParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null)
  const linesRef  = useRef<THREE.LineSegments>(null)
  const frameCount = useRef(0)

  // Pre-allocate line buffer — filled in-place each frame
  const lineBuffer = useMemo(
    () => new Float32Array(MAX_LINE_PAIRS * 6),
    []
  )
  const lineAttr = useMemo(() => {
    const attr = new THREE.BufferAttribute(lineBuffer, 3)
    attr.setUsage(THREE.DynamicDrawUsage)
    return attr
  }, [lineBuffer])

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors    = new Float32Array(count * 3)

    const palette = [
      new THREE.Color('#14b8a6'),
      new THREE.Color('#8b5cf6'),
      new THREE.Color('#06b6d4'),
    ]

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      positions[i3]     = (Math.random() - 0.5) * 22
      positions[i3 + 1] = (Math.random() - 0.5) * 22
      positions[i3 + 2] = (Math.random() - 0.5) * 22

      const c = palette[Math.floor(Math.random() * palette.length)]
      colors[i3]     = c.r
      colors[i3 + 1] = c.g
      colors[i3 + 2] = c.b
    }

    return { positions, colors }
  }, [count])

  useFrame((state, delta) => {
    const pts = pointsRef.current
    const lns = linesRef.current
    if (!pts || !lns) return

    // Rotation every frame — cheap
    pts.rotation.y -= delta * 0.025
    pts.rotation.x -= delta * 0.008

    frameCount.current++
    if (frameCount.current % 3 !== 0) return

    const posArr = pts.geometry.attributes.position.array as Float32Array
    const time   = state.clock.elapsedTime

    // Wave motion
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      posArr[i3 + 1] += Math.sin(time * 0.45 + posArr[i3] * 0.12) * 0.008
    }
    pts.geometry.attributes.position.needsUpdate = true

    // Network lines — O(TRACKED²/2) comparisons, pre-allocated buffer
    const track = Math.min(count, TRACKED)
    let vi = 0 // vertex index into lineBuffer (each line = 6 floats)

    outer: for (let i = 0; i < track; i++) {
      for (let j = i + 1; j < track; j++) {
        if (vi >= MAX_LINE_PAIRS * 6) break outer
        const i3 = i * 3, j3 = j * 3
        const dx = posArr[i3] - posArr[j3]
        const dy = posArr[i3 + 1] - posArr[j3 + 1]
        const dz = posArr[i3 + 2] - posArr[j3 + 2]
        if (dx * dx + dy * dy + dz * dz < THRESHOLD_SQ) {
          lineBuffer[vi]     = posArr[i3];     lineBuffer[vi + 1] = posArr[i3 + 1]; lineBuffer[vi + 2] = posArr[i3 + 2]
          lineBuffer[vi + 3] = posArr[j3];     lineBuffer[vi + 4] = posArr[j3 + 1]; lineBuffer[vi + 5] = posArr[j3 + 2]
          vi += 6
        }
      }
    }

    lineAttr.needsUpdate = true
    lns.geometry.setDrawRange(0, vi / 3)
  })

  return (
    <>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color"    args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          vertexColors
          transparent
          opacity={0.7}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <lineSegments ref={linesRef}>
        <bufferGeometry>
          {/* Attach pre-allocated attr — updated in-place each frame */}
          <primitive object={lineAttr} attach="attributes-position" />
        </bufferGeometry>
        <lineBasicMaterial
          color="#14b8a6"
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </>
  )
}
