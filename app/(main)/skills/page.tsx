"use client"

import { SectionHeader } from "@/components/ui/section-header"
import { SkillCard } from "@/components/skills/skill-card"
import { SkillsProgress } from "@/components/skills/skills-progress"
import { useSkillsQuery } from "@/lib/queries/skillQueries"

import * as si from "simple-icons"

const softSkills = [
  { name: "حل مسئله", description: "توانایی تحلیل و حل مشکلات پیچیده" },
  { name: "کار تیمی", description: "همکاری موثر با اعضای تیم" },
  { name: "ارتباطات", description: "برقراری ارتباط شفاق و موثر" },
  { name: "مدیریت زمان", description: "بهینه‌سازی زمان و اولویت‌بندی وظایف" },
  { name: "یادگیری مستمر", description: "علاقه به یادگیری تکنولوژی‌های جدید" },
  { name: "خلاقیت", description: "ارائه راه‌حل‌های خلاقانه" },
]

const categoryTitles: Record<string, string> = {
  frontend: "فرانت‌اند",
  backend: "بک‌اند",
  tools: "ابزارها",
}

const getWhiteIcon = (iconName: string) => {
  const normalized = iconName.toLowerCase().replace(/[^a-z0-9]/g, '')
  const key = `si${normalized.charAt(0).toUpperCase() + normalized.slice(1)}` as keyof typeof si

  const icon = si[key] || si.siReact

  let svg = icon.svg
  svg = svg.replace(/fill="[^"]*"/g, 'fill="#ffffff"')
  svg = svg.replace(/stroke="[^"]*"/g, 'stroke="#ffffff"')
  svg = svg.replace(/<svg/, '<svg fill="#ffffff"')

  return svg
}

// اسکلتون برای SkillsProgress
function SkillsProgressSkeleton() {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-lg bg-muted/30 animate-pulse" />
        <div className="flex-1 space-y-2">
          <div className="h-5 w-32 bg-muted/30 rounded animate-pulse" />
          <div className="h-3 w-20 bg-muted/20 rounded animate-pulse" />
        </div>
      </div>
      <div className="h-2 w-full bg-muted/20 rounded-full overflow-hidden">
        <div className="h-full w-3/4 bg-muted/40 animate-pulse" />
      </div>
    </div>
  )
}

// اسکلتون برای SkillCard (مهارت نرم)
function SoftSkillCardSkeleton() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 text-center transition-all duration-300 hover:shadow-lg animate-pulse">
      <div className="mx-auto mb-4 h-14 w-14 rounded-xl bg-muted/30" />
      <div className="h-6 w-32 mx-auto bg-muted/30 rounded mt-4" />
      <div className="mt-4 space-y-2">
        <div className="h-4 w-full bg-muted/20 rounded mx-auto" />
        <div className="h-4 w-11/12 bg-muted/20 rounded mx-auto" />
      </div>
    </div>
  )
}

export default function SkillsPage() {
  const { data: skills = [], isLoading, isError } = useSkillsQuery()

  const groupedSkills = skills.reduce((acc: Record<string, any[]>, skill: any) => {
    const category = skill.category || "tools"
    if (!acc[category]) acc[category] = []

    const whiteSvg = getWhiteIcon(skill.icon || "react")

    acc[category].push({
      name: skill.name,
      level: skill.level,
      icon: <div
              dangerouslySetInnerHTML={{ __html: whiteSvg }}
              className="w-8 h-8"
            />,
    })
    return acc
  }, {})

  const orderedCategories = ["frontend", "backend", "tools"]
  const categories = orderedCategories
    .filter(cat => groupedSkills[cat]?.length > 0)
    .map(cat => ({
      title: categoryTitles[cat] || cat,
      skills: groupedSkills[cat],
    }))

  if (isError) {
    return (
      <div className="py-20 text-center">
        <p className="text-destructive text-lg">خطا در بارگذاری مهارت‌ها</p>
      </div>
    )
  }

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <SectionHeader title="مهارت‌ها" subtitle="مجموعه مهارت‌های فنی و نرم من" />

        <div className="space-y-12">
          {/* بخش مهارت‌های فنی */}
          {isLoading ? (
            // نمایش ۳ دسته‌بندی با چند اسکلتون در هر کدام
            <>
              {["فرانت‌اند", "بک‌اند", "ابزارها"].map((title, idx) => (
                <div key={idx}>
                  <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                    <span className="h-1 w-8 bg-gradient-to-l from-primary to-secondary rounded-full" />
                    {title}
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <SkillsProgressSkeleton key={i} />
                    ))}
                  </div>
                </div>
              ))}
            </>
          ) : (
            categories.map((category, index) => (
              <div key={index}>
                <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <span className="h-1 w-8 bg-gradient-to-l from-primary to-secondary rounded-full" />
                  {category.title}
                </h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {category.skills.map((skill: any, i: number) => (
                    <SkillsProgress
                      key={i}
                      skill={{
                        name: skill.name,
                        level: skill.level,
                        icon: skill.icon,
                      }}
                    />
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        {/* بخش مهارت‌های نرم */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-foreground text-center mb-8">
            مهارت‌های نرم
          </h3>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {isLoading ? (
              // ۶ تا اسکلتون برای مهارت‌های نرم
              Array(6).fill(0).map((_, i) => <SoftSkillCardSkeleton key={i} />)
            ) : (
              softSkills.map((skill, index) => (
                <SkillCard key={index} skill={skill} index={index} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}