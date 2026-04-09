'use client'

import { useEffect, useRef, useState } from 'react'

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

/**
 * Animates a number from 0 to `end` over `duration` ms using cubic ease-out.
 * Starts when `active` becomes true.
 */
export function useCountUp(end: number, duration = 1500, active = true): number {
  const [value, setValue] = useState(0)
  const rafRef = useRef<number>(0)
  const startTimeRef = useRef<number | null>(null)

  useEffect(() => {
    if (!active) return

    startTimeRef.current = null

    const step = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp
      }
      const elapsed = timestamp - startTimeRef.current
      const progress = Math.min(elapsed / duration, 1)
      setValue(Math.round(easeOutCubic(progress) * end))

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step)
      }
    }

    rafRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafRef.current)
  }, [end, duration, active])

  return value
}
