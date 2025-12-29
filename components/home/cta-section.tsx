import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Mail } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-bl from-primary/20 via-secondary/10 to-accent/20 p-8 md:p-16">
          {/* Background Pattern */}
          <div className="absolute inset-0 -z-10 opacity-30">
            <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-primary blur-3xl" />
            <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-secondary blur-3xl" />
          </div>

          <div className="text-center space-y-6 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground md:text-4xl text-balance">آیا پروژه‌ای در ذهن دارید؟</h2>
            <p className="text-muted-foreground text-lg text-pretty">
              من آماده همکاری با شما هستم. بیایید با هم ایده‌هایتان را به واقعیت تبدیل کنیم.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 group">
                <Link href="/contact">
                  <Mail className="ml-2 h-5 w-5" />
                  تماس با من
                  <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/services">مشاهده خدمات</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
