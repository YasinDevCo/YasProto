import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  title: string
  subtitle?: string
  className?: string
  align?: "right" | "center"
}

export function SectionHeader({ title, subtitle, className, align = "center" }: SectionHeaderProps) {
  return (
    <div className={cn("space-y-2 mb-12", align === "center" && "text-center", className)}>
      <h2 className="text-3xl font-bold text-foreground md:text-4xl text-balance">{title}</h2>
      {subtitle && <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">{subtitle}</p>}
      <div
        className={cn(
          "h-1 w-20 bg-gradient-to-l from-primary to-secondary rounded-full mt-4",
          align === "center" && "mx-auto",
        )}
      />
    </div>
  )
}
