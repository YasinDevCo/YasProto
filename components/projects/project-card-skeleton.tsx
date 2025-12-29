// components/projects/project-card-skeleton.tsx
"use client";

export function ProjectCardSkeleton() {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:shadow-xl">
      {/* تصویر */}
      <div className="aspect-video w-full overflow-hidden bg-muted/30">
        <div className="h-full w-full bg-muted/40 animate-pulse" />
      </div>

      {/* محتوا */}
      <div className="p-6 space-y-4">
        {/* عنوان */}
        <div className="h-7 w-3/4 bg-muted/30 rounded animate-pulse" />

        {/* توضیحات */}
        <div className="space-y-2">
          <div className="h-4 w-full bg-muted/20 rounded animate-pulse" />
          <div className="h-4 w-11/12 bg-muted/20 rounded animate-pulse" />
          <div className="h-4 w-10/12 bg-muted/20 rounded animate-pulse" />
        </div>

        {/* تگ‌ها */}
        <div className="flex flex-wrap gap-2 pt-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="h-6 w-20 bg-muted/20 rounded-full animate-pulse"
            />
          ))}
        </div>

        {/* دکمه‌های لینک (دمو و گیت‌هاب) */}
        <div className="flex gap-3 pt-4">
          <div className="h-9 w-28 bg-muted/30 rounded animate-pulse" />
          <div className="h-9 w-28 bg-muted/30 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}   