'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh, Group } from 'three'

interface ShieldModelProps {
  scale?: number
}

export function ShieldModel({ scale = 1 }: ShieldModelProps) {
  const groupRef = useRef<Group>(null)
  const meshRef = useRef<Mesh>(null)
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1
    }
  })
  
  return (
    <group ref={groupRef} scale={scale}>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <circleGeometry args={[1, 32]} />
        <meshStandardMaterial
          color="#0f766e"
          metalness={0.8}
          roughness={0.2}
          emissive="#14b8a6"
          emissiveIntensity={0.2}
        />
      </mesh>
      
      <mesh position={[0, 0, 0.01]}>
        <ringGeometry args={[0.8, 0.95, 32]} />
        <meshStandardMaterial
          color="#14b8a6"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      
      <mesh position={[0, 0, 0.02]}>
        <circleGeometry args={[0.15, 32]} />
        <meshStandardMaterial
          color="#5eead4"
          emissive="#5eead4"
          emissiveIntensity={0.5}
        />
      </mesh>
    </group>
  )
}