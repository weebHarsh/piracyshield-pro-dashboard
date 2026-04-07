'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface Stat {
  value: number
  label: string
  suffix?: string
  prefix?: string
}

interface AnimatedStatsProps {
  stats: Stat[]
}

function useCountUp(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0)
  const countRef = useRef<number>(0)
  const startTime = useRef<number | null>(null)

  useEffect(() => {
    const animate = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp
      const progress = timestamp - startTime.current
      const percentage = Math.min(progress / duration, 1)
      
      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - percentage, 3)
      const current = Math.floor(easeOut * end)
      
      if (current !== countRef.current) {
        countRef.current = current
        setCount(current)
      }
      
      if (percentage < 1) {
        requestAnimationFrame(animate)
      }
    }
    
    requestAnimationFrame(animate)
  }, [end, duration])
  
  return count
}

function StatItem({ stat, index }: { stat: Stat; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const count = useCountUp(stat.value, 2000)
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="text-center"
    >
      <div className="text-3xl sm:text-4xl font-bold text-white mb-2">
        {stat.prefix && <span>{stat.prefix}</span>}
        <span>{isInView ? count : 0}</span>
        {stat.suffix && <span>{stat.suffix}</span>}
      </div>
      <div className="text-sm text-gray-400">{stat.label}</div>
    </motion.div>
  )
}

export function AnimatedStats({ stats }: AnimatedStatsProps) {
  return (
    <div className="grid grid-cols-3 gap-8">
      {stats.map((stat, index) => (
        <StatItem key={stat.label} stat={stat} index={index} />
      ))}
    </div>
  )
}