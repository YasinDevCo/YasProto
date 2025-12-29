"use client";

import { SectionHeader } from "@/components/ui/section-header";
import { Badge } from "@/components/ui/badge";
import { Code2, Palette, Rocket, Users } from "lucide-react";
import { useProfileQuery } from "@/lib/queries/profileQueries";
import { useHomeQuery } from "@/lib/queries/homeQueries";

const values = [
  {
    icon: Code2,
    title: "کد تمیز",
    description: "نوشتن کدهای خوانا، قابل نگهداری و با استانداردهای بالا",
  },
  {
    icon: Palette,
    title: "طراحی زیبا",
    description: "ایجاد رابط‌های کاربری جذاب و کاربرپسند",
  },
  {
    icon: Rocket,
    title: "عملکرد بالا",
    description: "بهینه‌سازی برای سرعت و تجربه کاربری عالی",
  },
  {
    icon: Users,
    title: "همکاری تیمی",
    description: "کار گروهی موثر و ارتباط شفاف با تیم",
  },
];

export default function AboutPage() {
  const { data: profile, isLoading: profileLoading } = useProfileQuery();
  const { data: home, isLoading: homeLoading } = useHomeQuery();

  const isLoading = profileLoading || homeLoading;

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="درباره من"
          subtitle="کمی بیشتر درباره من و مسیر حرفه‌ایم بدانید"
        />

        <div className="grid gap-12 lg:grid-cols-2 items-center">
          {/* تصویر سمت چپ */}
          <div className="relative">
            {isLoading ? (
              <div className="relative aspect-square max-w-md mx-auto overflow-hidden rounded-3xl border border-border bg-muted/30 animate-pulse">
                <div className="h-full w-full bg-muted/40" />
              </div>
            ) : (
              <div className="relative aspect-square max-w-md mx-auto overflow-hidden rounded-3xl border border-border">
                <img
                  src="/developer-laptop.png"
                  alt="درباره من"
                  className="h-full w-full object-cover"
                />
              </div>
            )}

            {/* المان‌های تزئینی */}
            <div className="absolute -top-4 -right-4 h-24 w-24 rounded-2xl bg-primary/20 -z-10" />
            <div className="absolute -bottom-4 -left-4 h-32 w-32 rounded-2xl bg-secondary/20 -z-10" />
          </div>

          {/* محتوا سمت راست */}
          <div className="space-y-6">
            <div className="space-y-4">
              {isLoading ? (
                <>
                  <div className="h-9 w-64 bg-muted/40 rounded animate-pulse" />
                  <div className="space-y-3">
                    <div className="h-5 w-full bg-muted/20 rounded animate-pulse" />
                    <div className="h-5 w-full bg-muted/20 rounded animate-pulse" />
                    <div className="h-5 w-11/12 bg-muted/20 rounded animate-pulse" />
                    <div className="h-5 w-10/12 bg-muted/20 rounded animate-pulse" />
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-2xl font-bold text-foreground">
                    سلام! {home?.heroTitle} هستم
                  </h3>
                  <div className="space-y-4 text-muted-foreground leading-relaxed text-pretty">
                    <div className="text-muted-foreground leading-relaxed text-pretty max-w-2xl">
                      {home?.heroDescription
                        ?.split(/(?<=\.)\s+/)
                        .filter((sentence: string) => sentence.trim().length > 0)
                        .map((sentence: string, index: number) => (
                          <p key={index} className="mb-1">
                            {sentence.trim()}
                          </p>
                        ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* بخش ابزارها (کامنت شده) - اگر فعال کردی، اسکلتون هم براش می‌ذارم */}
          </div>
        </div>

        {/* بخش ارزش‌ها */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-foreground text-center mb-8">
            ارزش‌های من
          </h3>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {isLoading ? (
              // ۴ تا اسکلتون برای کارت‌های ارزش‌ها
              Array(4)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-border bg-card p-6 text-center animate-pulse"
                  >
                    <div className="mx-auto mb-4 h-14 w-14 rounded-xl bg-muted/30" />
                    <div className="h-6 w-32 mx-auto bg-muted/30 rounded mt-4" />
                    <div className="space-y-2 mt-4">
                      <div className="h-4 w-full bg-muted/20 rounded" />
                      <div className="h-4 w-11/12 bg-muted/20 rounded mx-auto" />
                    </div>
                  </div>
                ))
            ) : (
              values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div
                    key={index}
                    className="group rounded-2xl border border-border bg-card p-6 text-center transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
                  >
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-7 w-7" />
                    </div>
                    <h4 className="font-bold text-foreground mb-2">
                      {value.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {value.description}
                    </p>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}