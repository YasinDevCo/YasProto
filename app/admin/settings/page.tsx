"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Save, Loader2 } from "lucide-react"

export default function AdminSettingsPage() {
  const [isSaving, setIsSaving] = useState(false)
  const [settings, setSettings] = useState({
    siteTitle: "پورتفولیو علی محمدی",
    siteDescription: "توسعه‌دهنده فرانت‌اند و طراح رابط کاربری",
    emailNotifications: true,
    showBlog: false,
    maintenanceMode: false,
  })

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSaving(false)
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">تنظیمات</h1>
        <p className="text-muted-foreground">تنظیمات عمومی سایت</p>
      </div>

      {/* General Settings */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">تنظیمات عمومی</CardTitle>
          <CardDescription>اطلاعات اصلی سایت</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="siteTitle">عنوان سایت</Label>
            <Input
              id="siteTitle"
              value={settings.siteTitle}
              onChange={(e) => setSettings({ ...settings, siteTitle: e.target.value })}
              className="bg-muted/50 border-border"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="siteDescription">توضیحات سایت</Label>
            <Input
              id="siteDescription"
              value={settings.siteDescription}
              onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
              className="bg-muted/50 border-border"
            />
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">اعلان‌ها</CardTitle>
          <CardDescription>مدیریت اعلان‌ها و ایمیل‌ها</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">اعلان‌های ایمیل</p>
              <p className="text-sm text-muted-foreground">دریافت ایمیل هنگام پیام جدید</p>
            </div>
            <Switch
              checked={settings.emailNotifications}
              onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Features */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">قابلیت‌ها</CardTitle>
          <CardDescription>فعال/غیرفعال کردن بخش‌های سایت</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">بخش وبلاگ</p>
              <p className="text-sm text-muted-foreground">نمایش بخش وبلاگ در سایت</p>
            </div>
            <Switch
              checked={settings.showBlog}
              onCheckedChange={(checked) => setSettings({ ...settings, showBlog: checked })}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">حالت نگهداری</p>
              <p className="text-sm text-muted-foreground">نمایش صفحه در دست تعمیر</p>
            </div>
            <Switch
              checked={settings.maintenanceMode}
              onCheckedChange={(checked) => setSettings({ ...settings, maintenanceMode: checked })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isSaving} className="bg-primary hover:bg-primary/90">
          {isSaving ? (
            <>
              <Loader2 className="ml-2 h-4 w-4 animate-spin" />
              در حال ذخیره...
            </>
          ) : (
            <>
              <Save className="ml-2 h-4 w-4" />
              ذخیره تغییرات
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
