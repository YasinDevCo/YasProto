"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, X, Home, User, Briefcase, FolderOpen, FileText, Mail, Wrench } from "lucide-react"

const navItems = [
  { href: "/", label: "صفحه اصلی", icon: Home },
  { href: "/about", label: "درباره من", icon: User },
  { href: "/skills", label: "مهارت‌ها", icon: Wrench },
  { href: "/projects", label: "پروژه‌ها", icon: FolderOpen },
  // { href: "/resume", label: "رزومه", icon: FileText },
  // { href: "/services", label: "خدمات", icon: Briefcase },
  { href: "/contact", label: "تماس با من", icon: Mail },
]

export function Header() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 right-0 left-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold text-foreground transition-colors hover:text-primary"
        >
          <span className="bg-gradient-to-l from-primary to-secondary bg-clip-text text-transparent">YasinDevCo</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg",
                pathname === item.href
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
              )}
            >
              {item.label}
              {pathname === item.href && (
                <span className="absolute bottom-0 right-0 left-0 h-0.5 bg-gradient-to-l from-primary to-secondary rounded-full" />
              )}
            </Link>
          ))}
        </nav>

        {/* Mobile Navigation */}
        <Sheet  open={isOpen} onOpenChange={setIsOpen} >
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="text-foreground">
              <Menu className="h-6 w-6" />
              <span className="sr-only">منوی ناوبری</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 border-border bg-card p-0 [&>button]:hidden">
            <div className="flex h-16 items-center justify-between border-b border-border px-6">
              <span className="text-lg font-bold bg-gradient-to-l from-primary to-secondary bg-clip-text text-transparent">
                پورتفولیو
              </span>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-foreground">
                <X className="h-5 w-5" />
              </Button>
            </div>
            <nav className="flex flex-col p-4">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-300",
                      pathname === item.href
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                )
              })}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
