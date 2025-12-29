"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Github, Linkedin, Twitter, Instagram, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { useHomeQuery } from "@/lib/queries/homeQueries";
import Image from "next/image";

// مپ کردن نام آیکون (string) به کامپوننت واقعی Lucide
const iconMap: Record<string, React.ComponentType<any>> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  instagram: Instagram,
  default: Globe, // برای پلتفرم‌های ناشناخته
};
export function HeroSectionSkeleton() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center overflow-hidden">
      {/* Background Effects - همون افکت‌های اصلی رو نگه داشتم تا حس مشابه باشه */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-1/4 h-96 w-96 rounded-full bg-primary/20 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 h-96 w-96 rounded-full bg-secondary/20 blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-accent/10 blur-3xl animate-pulse delay-500" />
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          {/* سمت محتوا - متن‌ها و دکمه‌ها */}
          <div className="space-y-8 text-right">
            {/* Badge "آماده همکاری" */}
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              <div className="h-4 w-24 bg-primary/30 rounded animate-pulse" />
            </div>

            {/* عنوان اصلی */}
            <div className="space-y-4">
              <div className="h-12 w-full max-w-md bg-muted/40 rounded animate-pulse" />
              <div className="h-12 w-11/12 bg-muted/30 rounded animate-pulse" />
              <div className="h-12 w-10/12 bg-muted/20 rounded animate-pulse" />
            </div>

            {/* زیرعنوان */}
            <div className="h-7 w-96 bg-muted/30 rounded animate-pulse" />

            {/* توضیحات */}
            <div className="space-y-3 max-w-xl">
              <div className="h-5 w-full bg-muted/20 rounded animate-pulse" />
              <div className="h-5 w-11/12 bg-muted/20 rounded animate-pulse" />
              <div className="h-5 w-10/12 bg-muted/20 rounded animate-pulse" />
              <div className="h-5 w-9/12 bg-muted/20 rounded animate-pulse" />
            </div>

            {/* دکمه‌های CTA */}
            <div className="flex flex-wrap gap-4">
              <Button size="lg" disabled className="opacity-70">
                <div className="h-5 w-32 bg-muted/50 rounded animate-pulse mr-2" />
                <ArrowLeft className="h-4 w-4" />
              </Button>

              <Button variant="outline" size="lg" disabled className="opacity-70">
                <Download className="ml-2 h-4 w-4" />
                <div className="h-5 w-28 bg-muted/40 rounded animate-pulse" />
              </Button>
            </div>

            {/* شبکه‌های اجتماعی */}
            <div className="flex items-center gap-4 pt-4">
              <div className="h-4 w-28 bg-muted/30 rounded animate-pulse" />
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card/80 animate-pulse"
                  >
                    <div className="h-5 w-5 bg-muted/40 rounded" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* سمت تصویر پروفایل و آمارها */}
          <div className="relative flex justify-center lg:justify-start">
            <div className="relative">
              {/* حلقه چرخان دور عکس */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-secondary to-accent p-1 animate-spin-slow">
                <div className="h-full w-full rounded-full bg-background" />
              </div>

              {/* تصویر پروفایل placeholder */}
              <div className="relative h-72 w-72 md:h-96 md:w-96 overflow-hidden rounded-full border-4 border-background shadow-2xl bg-muted/30 animate-pulse" />

              {/* آمارهای شناور (دو تا) */}
              <div className="absolute -bottom-4 right-8 rounded-xl border border-border bg-card px-4 py-2 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 bg-muted/30 rounded animate-pulse" />
                  <div className="space-y-2">
                    <div className="h-3 w-20 bg-muted/30 rounded animate-pulse" />
                    <div className="h-6 w-16 bg-muted/50 rounded animate-pulse" />
                  </div>
                </div>
              </div>

              <div className="absolute -top-4 left-8 rounded-xl border border-border bg-card px-4 py-2 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 bg-muted/30 rounded animate-pulse" />
                  <div className="space-y-2">
                    <div className="h-3 w-20 bg-muted/30 rounded animate-pulse" />
                    <div className="h-6 w-16 bg-muted/50 rounded animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* انیمیشن چرخش آهسته */}
      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </section>
  );
}
export function HeroSection() {
  const { data: home, isLoading, error } = useHomeQuery();

  if (isLoading) {
  return <HeroSectionSkeleton />;
}

  if (error || !home) {
    return (
      <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">خطا در بارگذاری صفحه اصلی</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-1/4 h-96 w-96 rounded-full bg-primary/20 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 h-96 w-96 rounded-full bg-secondary/20 blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-accent/10 blur-3xl animate-pulse delay-500" />
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          {/* Content */}
          <div className="space-y-8 text-right">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-primary">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                آماده همکاری
              </div>

              <h1 className="text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl text-balance">
                {home.heroTitle}
              </h1>

              <p className="text-xl text-muted-foreground md:text-2xl">
                {home.heroSubtitle}
              </p>
            </div>

            <p className="text-muted-foreground leading-relaxed max-w-xl text-pretty">
              {home.heroDescription}
            </p>

            {/* CTA Buttons - پویا از دیتابیس */}
            <div className="flex flex-wrap gap-4">
              <Link href={'/projects'}>  <Button
                  size="lg"
                  className={"bg-primary hover:bg-primary/90 text-primary-foreground group"}
                >
                  مشاهده پروژه‌ها
                  <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />

                </Button></Link>

              {/* دکمه رزومه - ثابت (می‌تونی بعداً به تنظیمات اضافه کنی) */}
              <Button asChild variant="outline" size="lg">
                <Link href="/resume.pdf" download>
                  <Download className="ml-2 h-4 w-4" />
                  دانلود رزومه
                </Link>
              </Button>
            </div>

            {/* Social Links - درست و پویا */}
            <div className="flex items-center gap-4 pt-4">
              <span className="text-sm text-muted-foreground">مرا دنبال کنید:</span>
              <div className="flex gap-2">
                {home.socialLinks.map((social: any, index: any) => {
                  const Icon = iconMap[social.icon?.toLowerCase()] || iconMap.default;

                  return (
                    <Link
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-all duration-300",
                        social.url
                          ? "hover:border-primary hover:text-primary hover:scale-110 cursor-pointer"
                          : "opacity-50 cursor-not-allowed"
                      )}
                      aria-label={social.platform}
                    >
                      <Icon className="h-5 w-5" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* تصویر پروفایل - ثابت (چون در Home نیست) */}
          <div className="relative flex justify-center lg:justify-start">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-liner-to-bl from-primary via-secondary to-accent p-1 animate-spin-slow">
                <div className="h-full w-full rounded-full bg-background" />
              </div>

              <div className="relative h-72 w-72 overflow-hidden rounded-full border-4 border-background shadow-2xl md:h-96 md:w-96">
                <Image
                  src={home?.ctaButtons[0]?.link || "./professional-persian-developer-portrait.jpg"}
                  alt="محمد یاسین عباس‌پور"
                  className="h-full w-full object-cover"
                  priority
                  width={100}
                  height={100}
                />
              </div>

              {/* آمارهای شناور - پویا از دیتابیس */}
              {home.stats.slice(0, 2).map((stat: any, index: any) => (
                <div
                  key={index}
                  className={cn(
                    "absolute rounded-xl border border-border bg-card px-4 py-2 shadow-lg",
                    index === 0 ? "-bottom-4 right-8" : "-top-4 left-8"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{index === 0 ? "💻" : "🚀"}</span>
                    <div>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                      <p className="font-bold text-foreground">{stat.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </section>
  );
}