"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { useProjectsQuery } from "@/lib/queries/projectQueries"
import { ProjectCard } from "./project-card"
import { Skeleton } from "@/components/ui/skeleton"

const filters = ["همه", "فروشگاه", "داشبورد", "اپلیکیشن", "وبلاگ", "لندینگ", "سایر"] as const

type FilterType = (typeof filters)[number]

export function ProjectFilters() {
  const [active, setActive] = useState<FilterType>("همه")

  // فیلتر رو بر اساس حالت فعال به query پاس می‌دیم
  const filterOptions =
    active === "همه"
      ? undefined
      : { category: active }

  const { data: projects, isLoading } = useProjectsQuery(filterOptions)

  // اسکلتون ساده (همون قبلی، بدون رنگ سبز)
  const ProjectSkeleton = () => (
    <div className="rounded-2xl border border-border bg-card overflow-hidden">
      <div className="aspect-video w-full bg-muted" />
      <div className="p-6 space-y-4">
        <div className="h-7 w-3/4 rounded-md bg-muted" />
        <div className="space-y-2">
          <div className="h-4 w-full rounded-md bg-muted" />
          <div className="h-4 w-full rounded-md bg-muted" />
          <div className="h-4 w-5/6 rounded-md bg-muted" />
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="h-6 w-20 rounded-full bg-muted" />
          <div className="h-6 w-24 rounded-full bg-muted" />
          <div className="h-6 w-16 rounded-full bg-muted" />
          <div className="h-6 w-28 rounded-full bg-muted" />
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* دکمه‌های فیلتر */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActive(filter)}
            className={cn(
              "px-5 py-2 rounded-full text-sm font-medium transition-all duration-300",
              active === filter
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* لیست پروژه‌ها */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {isLoading
          ? Array(6)
              .fill(0)
              .map((_, i) => <ProjectSkeleton key={i} />)
          : projects?.map((project) => (
              <ProjectCard
                key={project._id}
                project={{
                  id: project._id,
                  title: project.title,
                  description: project.description,
                  image: project.image,
                  technologies: project.technologies,
                  demoUrl: project.demoUrl,
                  githubUrl: project.githubUrl,
                }}
              />
            ))}

        {/* اگر پروژه‌ای نبود */}
        {!isLoading && projects?.length === 0 && (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground text-lg">
              هیچ پروژه‌ای در دسته "{active}" یافت نشد.
            </p>
          </div>
        )}
      </div>
    </>
  )
}