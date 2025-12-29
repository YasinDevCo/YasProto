import { SectionHeader } from "@/components/ui/section-header"
import { ServiceCard } from "@/components/services/service-card"
import { Code2, Palette, Smartphone, Gauge, Search, Wrench } from "lucide-react"

const services = [
  {
    icon: Code2,
    title: "توسعه وب",
    description: "طراحی و توسعه وب‌سایت‌های مدرن و واکنش‌گرا با استفاده از جدیدترین تکنولوژی‌ها",
    features: ["React & Next.js", "TypeScript", "API Development", "Database Design"],
  },
  {
    icon: Palette,
    title: "طراحی UI/UX",
    description: "طراحی رابط کاربری زیبا و تجربه کاربری عالی برای محصولات دیجیتال",
    features: ["Wireframing", "Prototyping", "Design Systems", "User Research"],
  },
  {
    icon: Smartphone,
    title: "اپلیکیشن موبایل",
    description: "توسعه اپلیکیشن‌های موبایل با React Native برای iOS و Android",
    features: ["Cross-platform", "Native Features", "Performance", "Push Notifications"],
  },
  {
    icon: Gauge,
    title: "بهینه‌سازی عملکرد",
    description: "بهبود سرعت و عملکرد وب‌سایت‌ها و اپلیکیشن‌های موجود",
    features: ["Core Web Vitals", "Caching", "Code Splitting", "Image Optimization"],
  },
  {
    icon: Search,
    title: "سئو و بازاریابی",
    description: "بهینه‌سازی سایت برای موتورهای جستجو و افزایش دیده شدن در وب",
    features: ["Technical SEO", "Content Strategy", "Analytics", "Local SEO"],
  },
  {
    icon: Wrench,
    title: "پشتیبانی و نگهداری",
    description: "خدمات پشتیبانی مداوم و نگهداری از سایت‌ها و اپلیکیشن‌ها",
    features: ["Bug Fixes", "Updates", "Security", "Monitoring"],
  },
]

export default function ServicesPage() {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <SectionHeader title="خدمات" subtitle="خدماتی که می‌توانم به شما ارائه دهم" />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </div>
  )
}
