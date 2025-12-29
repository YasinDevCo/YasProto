interface TimelineItemProps {
  item: {
    title: string
    company: string
    period: string
    description: string
    achievements?: string[]
  }
}

export function TimelineItem({ item }: TimelineItemProps) {
  return (
    <div className="relative">
      {/* Dot */}
      <div className="absolute -right-[25px] top-0 h-4 w-4 rounded-full bg-primary border-4 border-background" />

      <div className="rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <h4 className="font-bold text-foreground">{item.title}</h4>
          <span className="text-xs text-primary bg-primary/10 px-3 py-1 rounded-full">{item.period}</span>
        </div>
        <p className="text-sm text-secondary mb-2">{item.company}</p>
        <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
        {item.achievements && (
          <ul className="space-y-1">
            {item.achievements.map((achievement, index) => (
              <li key={index} className="text-xs text-muted-foreground flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {achievement}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
