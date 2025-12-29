"use client"

import { useEffect, useState } from "react"

const stats = [
  { value: 50, suffix: "+", label: "پروژه موفق" },
  { value: 30, suffix: "+", label: "مشتری راضی" },
  { value: 5, suffix: "+", label: "سال تجربه" },
  { value: 100, suffix: "%", label: "رضایت مشتری" },
]

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const duration = 2000 // میلی‌ثانیه
    const steps = 60
    const increment = value / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [value])

  return (
    <span className="text-4xl font-bold text-foreground md:text-5xl tabular-nums">
      {count.toLocaleString("fa-IR")}
      {suffix}
    </span>
  )
}

// Skeleton برای هر آیتم آماری
function StatsItemSkeleton() {
  return (
    <div className="text-center space-y-3">
      <div className="inline-block">
        <div className="h-12 w-32 md:h-14 md:w-40 bg-muted/40 rounded-lg animate-pulse" />
        <div className="h-12 w-20 md:h-14 md:w-28 bg-muted/30 rounded-lg animate-pulse mt-1 -ml-4 inline-block" />
      </div>
      <div className="h-5 w-32 mx-auto bg-muted/20 rounded animate-pulse" />
    </div>
  )
}

interface StatsSectionProps {
  isLoading?: boolean
}

export function StatsSection({ isLoading = false }: StatsSectionProps) {
  if (isLoading) {
    return (
      <section className="border-y border-border bg-card/50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <StatsItemSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="border-y border-border bg-card/50 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center space-y-2">
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              <p className="text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}