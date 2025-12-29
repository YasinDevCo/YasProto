"use client"
import { SectionHeader } from "@/components/ui/section-header"
import { TimelineItem } from "@/components/resume/timeline-item"
import { Button } from "@/components/ui/button"
import { Download, GraduationCap, Briefcase, Award } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"

const workExperience = [
  {
    title: "توسعه‌دهنده ارشد فرانت‌اند",
    company: "شرکت فناوری نوین",
    period: "۱۴۰۱ - اکنون",
    description:
      "مسئول طراحی و توسعه محصولات وب شرکت. همکاری با تیم محصول برای بهبود تجربه کاربری و پیاده‌سازی قابلیت‌های جدید.",
    achievements: ["افزایش ۴۰٪ سرعت بارگذاری", "پیاده‌سازی سیستم طراحی جدید", "رهبری تیم ۵ نفره فرانت‌اند"],
  },
  {
    title: "توسعه‌دهنده فرانت‌اند",
    company: "استارتاپ دیجیتال",
    period: "۱۳۹۸ - ۱۴۰۱",
    description: "توسعه و نگهداری اپلیکیشن‌های وب با استفاده از React و Next.js. همکاری نزدیک با تیم طراحی و بک‌اند.",
    achievements: ["توسعه داشبورد مدیریت", "بهینه‌سازی عملکرد اپلیکیشن", "پیاده‌سازی تست‌های واحد"],
  },
  {
    title: "توسعه‌دهنده جونیور",
    company: "آژانس طراحی وب",
    period: "۱۳۹۶ - ۱۳۹۸",
    description: "شروع فعالیت حرفه‌ای در زمینه توسعه وب. یادگیری مهارت‌های پایه و کار روی پروژه‌های کوچک.",
    achievements: ["توسعه ۲۰+ وبسایت", "یادگیری React", "آشنایی با روش‌های چابک"],
  },
]

const education = [
  {
    title: "کارشناسی ارشد مهندسی نرم‌افزار",
    company: "دانشگاه تهران",
    period: "۱۳۹۴ - ۱۳۹۶",
    description: "تحصیل در رشته مهندسی نرم‌افزار با تمرکز بر سیستم‌های توزیع‌شده و معماری نرم‌افزار.",
  },
  {
    title: "کارشناسی مهندسی کامپیوتر",
    company: "دانشگاه صنعتی شریف",
    period: "۱۳۹۰ - ۱۳۹۴",
    description: "تحصیل در رشته مهندسی کامپیوتر - نرم‌افزار با معدل ۱۸/۵۰.",
  },
]

const certifications = [
  { name: "Meta Front-End Developer", issuer: "Coursera", year: "۱۴۰۲" },
  { name: "AWS Certified Developer", issuer: "Amazon", year: "۱۴۰۱" },
  { name: "React - Advanced Concepts", issuer: "Udemy", year: "۱۴۰۰" },
]

export default function ResumePage() {
  useEffect(()=>{
    location.replace("/")
  },[])
  return (
    <></>
    // <div className="py-20">
    //   <div className="container mx-auto px-4">
    //     <SectionHeader title="رزومه" subtitle="سوابق تحصیلی و کاری من" />

    //     {/* Download CV Button */}
    //     <div className="flex justify-center mb-12">
    //       <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
    //         <Link href="/cv.pdf" download>
    //           <Download className="ml-2 h-5 w-5" />
    //           دانلود رزومه (PDF)
    //         </Link>
    //       </Button>
    //     </div>

    //     <div className="grid gap-12 lg:grid-cols-2">
    //       {/* Work Experience */}
    //       <div>
    //         <div className="flex items-center gap-3 mb-8">
    //           <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
    //             <Briefcase className="h-6 w-6" />
    //           </div>
    //           <h3 className="text-2xl font-bold text-foreground">تجربیات کاری</h3>
    //         </div>
    //         <div className="relative pr-8 border-r-2 border-border space-y-8">
    //           {workExperience.map((item, index) => (
    //             <TimelineItem key={index} item={item} />
    //           ))}
    //         </div>
    //       </div>

    //       {/* Education */}
    //       <div>
    //         <div className="flex items-center gap-3 mb-8">
    //           <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
    //             <GraduationCap className="h-6 w-6" />
    //           </div>
    //           <h3 className="text-2xl font-bold text-foreground">تحصیلات</h3>
    //         </div>
    //         <div className="relative pr-8 border-r-2 border-border space-y-8">
    //           {education.map((item, index) => (
    //             <TimelineItem key={index} item={item} />
    //           ))}
    //         </div>
    //       </div>
    //     </div>

    //     {/* Certifications */}
    //     <div className="mt-16">
    //       <div className="flex items-center gap-3 mb-8 justify-center">
    //         <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
    //           <Award className="h-6 w-6" />
    //         </div>
    //         <h3 className="text-2xl font-bold text-foreground">گواهینامه‌ها</h3>
    //       </div>
    //       <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    //         {certifications.map((cert, index) => (
    //           <div
    //             key={index}
    //             className="rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5"
    //           >
    //             <h4 className="font-bold text-foreground mb-1">{cert.name}</h4>
    //             <p className="text-sm text-muted-foreground">
    //               {cert.issuer} • {cert.year}
    //             </p>
    //           </div>
    //         ))}
    //       </div>
    //     </div>
    //   </div>
    // </div>
  )
}
