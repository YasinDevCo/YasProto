"use client"

import { cn } from "@/lib/utils"

interface SkillCardProps {
  skill: {
    name: string
    description: string
  }
  index: number
}

export function SkillCard({ skill, index }: SkillCardProps) {
  const colors = [
    "from-primary/20 to-primary/5",
    "from-secondary/20 to-secondary/5",
    "from-accent/20 to-accent/5",
    "from-primary/20 to-secondary/10",
    "from-secondary/20 to-accent/10",
    "from-accent/20 to-primary/10",
  ]

  return (
    <div
      className={cn(
        "group rounded-2xl border border-border p-6 transition-all duration-300",
        "hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5",
        "bg-gradient-to-bl",
        colors[index % colors.length],
      )}
    >
      <h4 className="font-bold text-foreground text-lg mb-2 group-hover:text-primary transition-colors">
        {skill.name}
      </h4>
      <p className="text-sm text-muted-foreground">{skill.description}</p>
    </div>
  )
}
