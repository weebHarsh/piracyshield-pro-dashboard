'use client'

import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Group } from 'three'

interface MouseParallaxProps {
  children: React.ReactNode
  factor?: number
}

export function MouseParallax({ children, factor = 0.5 }: MouseParallaxProps) {
  const groupRef = useRef<Group>(null)
  const { viewport } = useThree()
  
  const mouse = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })
  
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1
    }
    
    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        mouse.current.x = (event.touches[0].clientX / window.innerWidth) * 2 - 1
        mouse.current.y = -(event.touches[0].clientY / window.innerHeight) * 2 + 1
      }
    }
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [])
  
  useFrame(() => {
    if (!groupRef.current) return
    
    target.current.x += (mouse.current.x - target.current.x) * 0.05
    target.current.y += (mouse.current.y - target.current.y) * 0.05
    
    groupRef.current.rotation.y = target.current.x * factor * 0.5
    groupRef.current.rotation.x = target.current.y * factor * 0.3
  })
  
  return <group ref={groupRef}>{children}</group>
}