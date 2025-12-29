"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"

interface Project {
  _id: string
  title: string
  description: string
  image: string
  technologies: string[]
  demoUrl?: string
  githubUrl?: string
}

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-500 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5">
      {/* Image */}
      <div className="relative aspect-video overflow-hidden bg-muted">
        <img
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            // اگر تصویر پیدا نشد، placeholder نشون بده
            e.currentTarget.src = "/placeholder.svg"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Hover Actions */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 transition-all duration-300 group-hover:opacity-100">
          {project.demoUrl && (
            <Button asChild size="sm" className="bg-primary hover:bg-primary/90">
              <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="ml-1 h-4 w-4" />
                دمو
              </Link>
            </Button>
          )}
          {project.githubUrl && (
            <Button asChild size="sm" variant="outline">
              <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="ml-1 h-4 w-4" />
                کد
              </Link>
            </Button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <h3 className="text-xl font-bold text-foreground transition-colors group-hover:text-primary">
          {project.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <Badge
              key={tech}
              variant="secondary"
              className="bg-muted/50 text-muted-foreground hover:bg-primary/20 hover:text-primary transition-colors"
            >
              {tech}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}