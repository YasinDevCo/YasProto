"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  User,
  Wrench,
  FolderOpen,
  FileText,
  Briefcase,
  Mail,
  Settings,
  LogOut,
  Home,
  HomeIcon,
} from "lucide-react";

const menuItems = [
  { href: "/admin", label: "داشبورد", icon: LayoutDashboard },
  { href: "/admin/profile", label: "پروفایل", icon: User },
  { href: "/admin/home", label: "خانه", icon: HomeIcon },
  { href: "/admin/skills", label: "مهارت‌ها", icon: Wrench },
  { href: "/admin/projects", label: "پروژه‌ها", icon: FolderOpen },
  { href: "/admin/experience", label: "تجربیات", icon: FileText },
  { href: "/admin/services", label: "خدمات", icon: Briefcase },
  { href: "/admin/messages", label: "پیام‌ها", icon: Mail },
  { href: "/admin/settings", label: "تنظیمات", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const logout = async () => {
    await fetch("/api/profile/logout", { method: "POST" });
    window.location.href = "/";
  };
  return (
    <aside className="w-64 border-l border-border bg-card flex-shrink-0 hidden md:flex flex-col">
      {/* Logo */}
      <div className="h-16 flex items-center justify-center border-b border-border">
        <Link href="/admin" className="text-xl font-bold">
          <span className="bg-gradient-to-l from-primary to-secondary bg-clip-text text-transparent">
            پنل مدیریت
          </span>
        </Link>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border space-y-1">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-all duration-200"
        >
          <Home className="h-5 w-5" />
          مشاهده سایت
        </Link>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-destructive hover:bg-destructive/10 transition-all duration-200"
        >
          <LogOut className="h-5 w-5" />
          خروج
        </button>
      </div>
    </aside>
  );
}
