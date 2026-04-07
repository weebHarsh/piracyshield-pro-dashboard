'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh, Group } from 'three'
import { Float } from '@react-three/drei'

function FloatingShape({
  position,
  rotation,
  scale,
  color,
  geometry,
}: {
  position: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
  color?: string
  geometry?: 'box' | 'sphere' | 'octahedron' | 'torus'
}) {
  const meshRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01
      meshRef.current.rotation.y += 0.01
    }
  })

  const getGeometry = () => {
    switch (geometry) {
      case 'sphere':
        return <sphereGeometry args={[0.5, 32, 32]} />
      case 'octahedron':
        return <octahedronGeometry args={[0.5]} />
      case 'torus':
        return <torusGeometry args={[0.5, 0.2, 16, 32]} />
      default:
        return <boxGeometry args={[0.5, 0.5, 0.5]} />
    }
  }

  return (
    <Float
      speed={2}
      rotationIntensity={1}
      floatIntensity={2}
      floatingRange={[-0.5, 0.5]}
    >
      <mesh
        ref={meshRef}
        position={position}
        rotation={rotation}
        scale={scale}
      >
        {getGeometry()}
        <meshStandardMaterial
          color={color || '#14b8a6'}
          transparent
          opacity={0.8}
          emissive={color || '#14b8a6'}
          emissiveIntensity={0.3}
        />
      </mesh>
    </Float>
  )
}

export function FloatingGeometry() {
  const groupRef = useRef<Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      <FloatingShape
        position={[-2, 1, -2]}
        geometry="octahedron"
        color="#14b8a6"
        scale={0.8}
      />
      <FloatingShape
        position={[2, -1, -1]}
        geometry="torus"
        color="#8b5cf6"
        scale={0.6}
      />
      <FloatingShape
        position={[-1.5, -1.5, 1]}
        geometry="sphere"
        color="#06b6d4"
        scale={0.7}
      />
      <FloatingShape
        position={[1.5, 1.2, 0]}
        geometry="box"
        color="#14b8a6"
        scale={0.5}
      />
      <FloatingShape
        position={[0, 0, -3]}
        geometry="octahedron"
        color="#9d4edd"
        scale={1}
      />
    </group>
  )
}