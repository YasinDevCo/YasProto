"use client"
import { useState } from "react"
import { SectionHeader } from "@/components/ui/section-header"
import { ProjectCard } from "@/components/projects/project-card"
import { ProjectCardSkeleton } from "@/components/projects/project-card-skeleton" // اضافه شد
import { cn } from "@/lib/utils"
import { useProjectsQuery } from "@/lib/queries/projectQueries"

const filters = ["همه", "فروشگاه", "داشبورد", "اپلیکیشن", "وبلاگ", "لندینگ", "سایر"] as const
type FilterType = (typeof filters)[number]

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("همه")
  const filterOptions = activeFilter === "همه" ? undefined : { category: activeFilter }
  const { data: projects = [], isLoading } = useProjectsQuery(filterOptions)

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="پروژه‌ها"
          subtitle="مجموعه‌ای از پروژه‌های طراحی و توسعه وب که انجام داده‌ام"
        />

        {/* فیلترها */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-medium transition-all duration-300",
                activeFilter === filter
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* لیست پروژه‌ها */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mt-8">
          {isLoading ? (
            Array(8).fill(0).map((_, i) => <ProjectCardSkeleton key={i} />) // ۸ تا برای پر کردن صفحه
          ) : projects.length > 0 ? (
            projects.map((project) => (
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
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <p className="text-muted-foreground text-lg">
                هیچ پروژه‌ای در دسته "{activeFilter}" یافت نشد.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}