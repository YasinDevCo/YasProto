"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Menu,
  LayoutDashboard,
  User,
  Wrench,
  FolderOpen,
  FileText,
  Briefcase,
  Mail,
  Settings,
  Home,
  X,
} from "lucide-react"

const menuItems = [
  { href: "/admin", label: "داشبورد", icon: LayoutDashboard },
  { href: "/admin/profile", label: "پروفایل", icon: User },
  { href: "/admin/skills", label: "مهارت‌ها", icon: Wrench },
  { href: "/admin/projects", label: "پروژه‌ها", icon: FolderOpen },
  { href: "/admin/experience", label: "تجربیات", icon: FileText },
  { href: "/admin/services", label: "خدمات", icon: Briefcase },
  { href: "/admin/messages", label: "پیام‌ها", icon: Mail },
  { href: "/admin/settings", label: "تنظیمات", icon: Settings },
]

export function AdminMobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-72 p-0 bg-card">
        <div className="h-16 flex items-center justify-between px-4 border-b border-border">
          <span className="text-lg font-bold bg-gradient-to-l from-primary to-secondary bg-clip-text text-transparent">
            پنل مدیریت
          </span>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                )}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            )
          })}
          <div className="pt-4 border-t border-border mt-4">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-muted/50 hover:text-foreground"
            >
              <Home className="h-5 w-5" />
              مشاهده سایت
            </Link>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
