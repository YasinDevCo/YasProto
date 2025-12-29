"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface Skill {
  name: string
  level: number
  icon: string
}

interface SkillsProgressProps {
  skill: Skill
}

export function SkillsProgress({ skill }: SkillsProgressProps) {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setWidth(skill.level)
    }, 100)
    return () => clearTimeout(timer)
  }, [skill.level])

  return (
    <div className="group rounded-xl border border-border bg-card p-4 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">{skill.icon}</span>
          <span className="font-medium text-foreground">{skill.name}</span>
        </div>
        <span className="text-sm text-primary font-bold">{skill.level.toLocaleString("fa-IR")}%</span>
      </div>
      <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full bg-gradient-to-l from-primary to-secondary transition-all duration-1000 ease-out",
          )}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  )
}
