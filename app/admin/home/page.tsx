"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Save, Plus, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { Home } from "@/lib/data/mock-data";
import { useHomeQuery, useUpdateHome } from "@/lib/queries/homeQueries";

type CTA = { text: string; link: string; _id?: string };
type Social = { platform: string; url: string; icon: string; _id?: string };
type Stat = { label: string; value: string; _id?: string };

export default function HomeSettingsPage() {
  const { data: home, isLoading, error } = useHomeQuery();
  const { mutate: updateHome, isPending: isSaving } = useUpdateHome();

  const [formData, setFormData] = useState<Home | null>(null);

  useEffect(() => {
    if (home) {
      setFormData(home);
    }
  }, [home]);

  const handleSave = () => {
    if (!formData) return;

    updateHome(formData, {
      onSuccess: () => {
        alert("تنظیمات صفحه اصلی با موفقیت ذخیره شد 🎉");
      },
      onError: (err: any) => {
        alert("خطا در ذخیره: " + (err.message || "نامشخص"));
      },
    });
  };

  // توابع کمکی برای مدیریت لیست‌ها
  const addCTA = () => setFormData((prev: { ctaButtons: any; }) => prev && {
    ...prev,
    ctaButtons: [...prev.ctaButtons, { text: "دکمه جدید", link: "/link" }]
  });

  const updateCTA = (index: number, field: keyof CTA, value: string) => {
    setFormData((prev: { ctaButtons: any[]; }) => prev && {
      ...prev,
      ctaButtons: prev.ctaButtons.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    });
  };

  const removeCTA = (index: number) => {
    setFormData((prev: { ctaButtons: any[]; }) => prev && {
      ...prev,
      ctaButtons: prev.ctaButtons.filter((_, i) => i !== index)
    });
  };

  // همین برای socialLinks
  const addSocial = () => setFormData((prev: { socialLinks: any; }) => prev && {
    ...prev,
    socialLinks: [...prev.socialLinks, { platform: "جدید", url: "https://", icon: "globe" }]
  });

  const updateSocial = (index: number, field: keyof Social, value: string) => {
    setFormData((prev: { socialLinks: any[]; }) => prev && {
      ...prev,
      socialLinks: prev.socialLinks.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    });
  };

  const removeSocial = (index: number) => {
    setFormData((prev: { socialLinks: any[]; }) => prev && {
      ...prev,
      socialLinks: prev.socialLinks.filter((_, i) => i !== index)
    });
  };

  // و برای stats
  const addStat = () => setFormData((prev: { stats: any; }) => prev && {
    ...prev,
    stats: [...prev.stats, { label: "عنوان جدید", value: "مقدار" }]
  });

  const updateStat = (index: number, field: keyof Stat, value: string) => {
    setFormData((prev: { stats: any[]; }) => prev && {
      ...prev,
      stats: prev.stats.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    });
  };

  const removeStat = (index: number) => {
    setFormData((prev: { stats: any[]; }) => prev && {
      ...prev,
      stats: prev.stats.filter((_, i) => i !== index)
    });
  };

  if (isLoading) return <div className="flex items-center justify-center py-20"><Loader2 className="h-8 w-8 animate-spin ml-3" /><span>در حال بارگذاری...</span></div>;
  if (error) return <div className="p-6 bg-red-500/10 border border-red-500/50 rounded-lg text-red-600">خطا: {error.message}</div>;
  if (!formData) return null;

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">تنظیمات صفحه اصلی</h1>
        <p className="text-muted-foreground">محتوای صفحه اصلی سایت را ویرایش کنید</p>
      </div>

      {/* بخش هیرو */}
      <Card>
        <CardHeader><CardTitle>بخش هیرو (Hero Section)</CardTitle></CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>عنوان اصلی</Label>
            <Input
              value={formData.heroTitle}
              onChange={(e) => setFormData({ ...formData, heroTitle: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>زیرعنوان</Label>
            <Input
              value={formData.heroSubtitle}
              onChange={(e) => setFormData({ ...formData, heroSubtitle: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>توضیحات</Label>
            <Textarea
              value={formData.heroDescription}
              onChange={(e) => setFormData({ ...formData, heroDescription: e.target.value })}
              className="min-h-32"
            />
          </div>
        </CardContent>
      </Card>

      {/* دکمه‌های CTA */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>دکمه‌های فراخوان به عمل</CardTitle>
          <Button size="sm" onClick={addCTA}><Plus className="h-4 w-4 ml-1" />افزودن دکمه</Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {formData.ctaButtons.map((btn: { _id: any; text: string | number | readonly string[] | undefined; link: string | number | readonly string[] | undefined; }, index: number) => (
            <div key={btn._id || index} className="flex gap-3 items-end">
              <div className="flex-1 space-y-2">
                <Label className="text-xs">متن دکمه</Label>
                <Input
                  value={btn.text}
                  onChange={(e) => updateCTA(index, "text", e.target.value)}
                />
              </div>
              <div className="flex-1 space-y-2">
                <Label className="text-xs">لینک</Label>
                <Input
                  value={btn.link}
                  onChange={(e) => updateCTA(index, "link", e.target.value)}
                  placeholder="/page یا https://..."
                />
              </div>
              <Button
                size="icon"
                variant="destructive"
                onClick={() => removeCTA(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* لینک‌های اجتماعی */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>لینک‌های اجتماعی</CardTitle>
          <Button size="sm" onClick={addSocial}><Plus className="h-4 w-4 ml-1" />افزودن لینک</Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {formData.socialLinks.map((link: { _id: any; platform: string | number | readonly string[] | undefined; icon: string | number | readonly string[] | undefined; url: string | number | readonly string[] | undefined; }, index: number) => (
            <div key={link._id || index} className="flex gap-3 items-end">
              <div className="flex-1 space-y-2">
                <Label className="text-xs">پلتفرم (مثل Instagram)</Label>
                <Input
                  value={link.platform}
                  onChange={(e) => updateSocial(index, "platform", e.target.value)}
                />
              </div>
              <div className="flex-1 space-y-2">
                <Label className="text-xs">آیکون (نام آیکون)</Label>
                <Input
                  value={link.icon}
                  onChange={(e) => updateSocial(index, "icon", e.target.value)}
                  placeholder="مثل instagram, twitter, linkedin"
                />
              </div>
              <div className="flex-1 space-y-2">
                <Label className="text-xs">لینک</Label>
                <Input
                  value={link.url}
                  onChange={(e) => updateSocial(index, "url", e.target.value)}
                />
              </div>
              <Button size="icon" variant="destructive" onClick={() => removeSocial(index)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* آمار */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>آمار و اعداد کلیدی</CardTitle>
          <Button size="sm" onClick={addStat}><Plus className="h-4 w-4 ml-1" />افزودن آمار</Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {formData.stats.map((stat: { _id: any; label: string | number | readonly string[] | undefined; value: string | number | readonly string[] | undefined; }, index: number) => (
            <div key={stat._id || index} className="flex gap-3 items-end">
              <div className="flex-1 space-y-2">
                <Label className="text-xs">عنوان</Label>
                <Input
                  value={stat.label}
                  onChange={(e) => updateStat(index, "label", e.target.value)}
                />
              </div>
              <div className="flex-1 space-y-2">
                <Label className="text-xs">مقدار</Label>
                <Input
                  value={stat.value}
                  onChange={(e) => updateStat(index, "value", e.target.value)}
                />
              </div>
              <Button size="icon" variant="destructive" onClick={() => removeStat(index)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isSaving} size="lg">
          {isSaving ? (
            <> <Loader2 className="ml-2 h-4 w-4 animate-spin" />در حال ذخیره...</>
          ) : (
            <> <Save className="ml-2 h-4 w-4" />ذخیره تغییرات</>
          )}
        </Button>
      </div>
    </div>
  );
}