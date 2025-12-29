"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderOpen, Eye, Mail, TrendingUp, Loader2 } from "lucide-react";
import { useMessagesQuery } from "@/lib/queries/messageQueries";
import { useProjectsQuery } from "@/lib/queries/projectQueries"; // فرض می‌کنیم داری

export default function AdminDashboard() {
  // دریافت پروژه‌ها
  const {
    data: projects = [],
    isLoading: projectsLoading,
  } = useProjectsQuery();

  // دریافت پیام‌ها
  const {
    data: messages = [],
    isLoading: messagesLoading,
  } = useMessagesQuery();

  // محاسبه آمار
  const totalProjects = projects.length;
  const totalMessages = messages.length;
  const unreadMessages = messages.filter((m: any) => !m.read).length;

  // فرض کنیم بازدیدها رو از یه API دیگه می‌گیریم یا فعلاً فیک
  const totalViews = "۲,۴۵۰";
  const viewsChange = "+۱۲% این هفته";

  // پیام‌های اخیر (۳ تا جدیدترین)
  const recentMessages = messages
    .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3)
    .map((msg: any) => ({
      id: msg.id,
      name: msg.name,
      subject: msg.subject,
      time: formatRelativeTime(msg.date),
    }));

  // تابع برای نمایش زمان نسبی (مثل "۲ ساعت پیش")
  function formatRelativeTime(dateString: string) {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 3600));

    if (diffInHours < 1) return "لحظاتی پیش";
    if (diffInHours < 24) return `${diffInHours} ساعت پیش`;
    if (diffInHours < 48) return "دیروز";
    return date.toLocaleDateString("fa-IR");
  }

  const stats = [
    {
      title: "پروژه‌ها",
      value: projectsLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : totalProjects.toString(),
      icon: FolderOpen,
      change: "+۲ این ماه",
      color: "text-blue-500",
    },
    {
      title: "بازدید",
      value: totalViews,
      icon: Eye,
      change: viewsChange,
      color: "text-green-500",
    },
    {
      title: "پیام‌ها",
      value: messagesLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : totalMessages.toString(),
      icon: Mail,
      change: unreadMessages > 0 ? `${unreadMessages} جدید` : "بدون پیام جدید",
      color: "text-purple-500",
    },
    {
      title: "رشد",
      value: "۲۵%",
      icon: TrendingUp,
      change: "+۵% نسبت به ماه قبل",
      color: "text-orange-500",
    },
  ];

  return (
    <div className="space-y-8 py-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">داشبورد ادمین</h1>
        <p className="text-muted-foreground mt-2">خوش آمدید! خلاصه‌ای از فعالیت سایت شما</p>
      </div>

      {/* کارت‌های آمار */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card
              key={index}
              className="bg-card/80 backdrop-blur border-border hover:shadow-lg transition-shadow"
            >
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground flex items-center gap-2">
                  {stat.value}
                </div>
                <p className={`text-xs mt-2 ${unreadMessages > 0 && stat.title === "پیام‌ها" ? "text-purple-500 font-medium" : "text-muted-foreground"}`}>
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* پیام‌های اخیر */}
      <Card className="bg-card/80 backdrop-blur border-border">
        <CardHeader>
          <CardTitle className="text-xl text-foreground">پیام‌های اخیر</CardTitle>
        </CardHeader>
        <CardContent>
          {messagesLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-lg bg-muted/30 animate-pulse">
                  <div className="h-10 w-10 rounded-full bg-muted" />
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-muted rounded w-32" />
                    <div className="h-3 bg-muted rounded w-48" />
                  </div>
                </div>
              ))}
            </div>
          ) : recentMessages.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              هنوز هیچ پیامی دریافت نشده است.
            </p>
          ) : (
            <div className="space-y-4">
              {recentMessages.map((message) => (
                <div
                  key={message.id}
                  className="flex items-center justify-between p-5 rounded-xl bg-muted/30 hover:bg-muted/50 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                      {message.name[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{message.name}</p>
                      <p className="text-sm text-muted-foreground mt-1">{message.subject}</p>
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">{message.time}</span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}