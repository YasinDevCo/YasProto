"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Search, User, Settings, LogOut } from "lucide-react"
import { Input } from "@/components/ui/input"
import { AdminMobileNav } from "./admin-mobile-nav"
import { useProfileQuery } from "@/lib/queries/profileQueries"

export function AdminHeader() {
    const { data: profile} = useProfileQuery();
  
  const [notifications] = useState([
    { id: 1, message: "پیام جدید دریافت شد", time: "۵ دقیقه پیش" },
    { id: 2, message: "پروژه جدید اضافه شد", time: "۱ ساعت پیش" },
  ])

  return (
    <header className="h-16 border-b border-border bg-card flex items-center justify-between px-4 md:px-6">
      {/* Mobile Menu */}
      <AdminMobileNav />

      {/* Search */}
      <div className="hidden md:flex items-center gap-2 flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="جستجو..." className="pr-10 bg-muted/50 border-border" />
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-0.5 -left-0.5 h-4 w-4 rounded-full bg-destructive text-[10px] flex items-center justify-center text-destructive-foreground">
                {notifications.length}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-72">
            <div className="p-2 border-b border-border">
              <p className="font-semibold text-foreground">اعلان‌ها</p>
            </div>
            {notifications.map((notification) => (
              <DropdownMenuItem key={notification.id} className="flex flex-col items-start gap-1 p-3">
                <span className="text-sm text-foreground">{notification.message}</span>
                <span className="text-xs text-muted-foreground">{notification.time}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 px-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/professional-persian-developer-portrait.jpg" />
                <AvatarFallback>{profile?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="hidden md:inline text-sm font-medium">{profile?.name}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            <DropdownMenuItem>
              <User className="ml-2 h-4 w-4" />
              پروفایل
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="ml-2 h-4 w-4" />
              تنظیمات
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              <LogOut className="ml-2 h-4 w-4" />
              خروج
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
