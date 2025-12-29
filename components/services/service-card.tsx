// "use client"

import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

interface ServiceCardProps {
  service: {
    icon: LucideIcon
    title: string
    description: string
    features: string[]
  }
  index: number
}

export function ServiceCard({ service, index }: ServiceCardProps) {
  const Icon = service.icon
  const colors = ["text-primary", "text-secondary", "text-accent"]
  const bgColors = ["bg-primary/10", "bg-secondary/10", "bg-accent/10"]

  return (
    <div className="group rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5">
      <div
        className={cn(
          "mb-5 flex h-14 w-14 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110",
          bgColors[index % 3],
        )}
      >
        <Icon className={cn("h-7 w-7", colors[index % 3])} />
      </div>

      <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
        {service.title}
      </h3>
      <p className="text-muted-foreground text-sm mb-5 leading-relaxed">{service.description}</p>

      <ul className="space-y-2">
        {service.features.map((feature, i) => (
          <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
            <Check className={cn("h-4 w-4", colors[index % 3])} />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  )
}
