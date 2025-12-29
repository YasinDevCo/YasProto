"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/ui/section-header"
import { ProjectCard } from "@/components/projects/project-card"
import { ProjectCardSkeleton } from "@/components/projects/project-card-skeleton" // اضافه شد
import { ArrowLeft } from "lucide-react"
import { useProjectsQuery } from "@/lib/queries/projectQueries"

export function FeaturedProjects() {
  const { data: projects = [], isLoading } = useProjectsQuery()

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <SectionHeader 
          title="پروژه‌های منتخب" 
          subtitle="برخی از بهترین پروژه‌هایی که اخیراً روی آن‌ها کار کرده‌ام" 
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"> {/* اصلاح به 4 ستون */}
          {isLoading ? (
            <>
              <ProjectCardSkeleton />
              <ProjectCardSkeleton />
              <ProjectCardSkeleton />
              <ProjectCardSkeleton />
            </>
          ) : (
            projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))
          )}
        </div>

        <div className="mt-12 text-center">
          <Button asChild variant="outline" size="lg" className="group bg-transparent">
            <Link href="/projects">
              مشاهده همه پروژه‌ها
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}