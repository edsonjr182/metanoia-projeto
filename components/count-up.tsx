"use client"

import { useState, useEffect } from "react"

interface CountUpProps {
  end: number
  duration?: number
  decimals?: number
}

export default function CountUp({ end, duration = 2, decimals = 0 }: CountUpProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const countUp = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = timestamp - startTime

      const percentage = Math.min(progress / (duration * 1000), 1)
      const easeOutQuart = 1 - Math.pow(1 - percentage, 4) // Easing function for smoother animation
      const currentCount = Math.min(easeOutQuart * end, end)

      setCount(currentCount)

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(countUp)
      }
    }

    animationFrame = requestAnimationFrame(countUp)

    return () => {
      cancelAnimationFrame(animationFrame)
    }
  }, [end, duration])

  return <>{count.toFixed(decimals)}</>
}
