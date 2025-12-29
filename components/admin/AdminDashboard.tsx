"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FolderOpen, Eye, Mail, TrendingUp } from "lucide-react"

const stats = [
  { title: "پروژه‌ها", value: "۱۲", icon: FolderOpen, change: "+۲ این ماه", color: "text-primary" },
  { title: "بازدید", value: "۲,۴۵۰", icon: Eye, change: "+۱۲% این هفته", color: "text-secondary" },
  { title: "پیام‌ها", value: "۸", icon: Mail, change: "۳ جدید", color: "text-accent" },
  { title: "رشد", value: "۲۵%", icon: TrendingUp, change: "+۵% نسبت به ماه قبل", color: "text-primary" },
]

const recentMessages = [
  { id: 1, name: "محمد رضایی", subject: "درخواست همکاری", time: "۲ ساعت پیش" },
  { id: 2, name: "سارا احمدی", subject: "سوال درباره پروژه", time: "۵ ساعت پیش" },
  { id: 3, name: "علی کریمی", subject: "پیشنهاد کاری", time: "دیروز" },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">داشبورد</h1>
        <p className="text-muted-foreground">خوش آمدید! آمار کلی سایت شما</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Recent Messages */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">پیام‌های اخیر</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentMessages.map((message) => (
              <div
                key={message.id}
                className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    {message.name[0]}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{message.name}</p>
                    <p className="text-sm text-muted-foreground">{message.subject}</p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">{message.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
