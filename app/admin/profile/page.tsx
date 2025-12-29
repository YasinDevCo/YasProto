"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Save, Loader2 } from "lucide-react";
import { useProfileQuery, useUpdateProfile } from "@/lib/queries/profileQueries";
import { useState, useEffect } from "react";
import { Profile } from "@/lib/data/mock-data";

export default function AdminProfilePage() {
  const { data: profile, isLoading, error } = useProfileQuery();
  const { mutate: updateProfile, isPending: isSaving } = useUpdateProfile();

  // state محلی برای ویرایش فرم
  const [formData, setFormData] = useState<Profile | null>(null);

  // وقتی پروفایل لود شد، فرم رو پر کن
  useEffect(() => {
    if (profile) {
      setFormData(profile);
    }
  }, [profile]);

  const handleSave = () => {
    if (!formData) return;

    updateProfile(formData, {
      onSuccess: () => {
        alert("پروفایل با موفقیت ذخیره شد 🎉");
      },
      onError: (err: any) => {
        alert("خطا: " + err.message);
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin ml-3" />
        <span>در حال بارگذاری پروفایل...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-500/10 border border-red-500/50 rounded-lg text-red-600">
        خطا: {error.message}
      </div>
    );
  }

  if (!formData) return null; // در حال پر شدن

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">ویرایش پروفایل</h1>
        <p className="text-muted-foreground">اطلاعات شخصی و حساب کاربری خود را مدیریت کنید</p>
      </div>

      {/* Profile Picture */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <Avatar className="h-32 w-32 ring-4 ring-background">
                <AvatarImage src={formData.image || "/professional-persian-developer-portrait.jpg"} />
                <AvatarFallback className="text-3xl">
                  {formData.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <Button
                onClick={() => alert("آپلود تصویر در آینده اضافه می‌شه 😊")}
                size="icon"
                className="absolute -bottom-2 -left-2 h-10 w-10 rounded-full bg-primary shadow-lg"
              >
                <Camera className="h-5 w-5" />
              </Button>
            </div>
            <div>
              <h3 className="text-xl font-bold">{formData.name}</h3>
              <p className="text-muted-foreground">{formData.title || "عنوان شغلی وارد نشده"}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* فرم ویرایش */}
      <Card>
        <CardHeader>
          <CardTitle>اطلاعات شخصی</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>نام و نام خانوادگی</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>عنوان شغلی</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>ایمیل</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>تلفن</Label>
              <Input
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                dir="ltr"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>موقعیت جغرافیایی</Label>
            <Input
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>درباره من</Label>
            <Textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="min-h-32"
              placeholder="کمی درباره خودتون بنویسید..."
            />
          </div>
        </CardContent>
      </Card>

      {/* شبکه‌های اجتماعی */}
      <Card>
        <CardHeader>
          <CardTitle>شبکه‌های اجتماعی</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>گیت‌هاب</Label>
            <Input
              value={formData.github}
              onChange={(e) => setFormData({ ...formData, github: e.target.value })}
              placeholder="https://github.com/..."
            />
          </div>
          <div className="space-y-2">
            <Label>لینکدین</Label>
            <Input
              value={formData.linkedin}
              onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
              placeholder="https://linkedin.com/in/..."
            />
          </div>
          <div className="space-y-2">
            <Label>توییتر / ایکس</Label>
            <Input
              value={formData.twitter}
              onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
              placeholder="https://twitter.com/..."
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isSaving} size="lg">
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
  );
}