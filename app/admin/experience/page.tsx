"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Pencil, Trash2, Briefcase, GraduationCap } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Experience {
  id: string
  title: string
  company: string
  period: string
  description: string
  type: "work" | "education"
}

const initialExperiences: Experience[] = [
  {
    id: "1",
    title: "توسعه‌دهنده ارشد فرانت‌اند",
    company: "شرکت فناوری نوین",
    period: "۱۴۰۱ - اکنون",
    description: "مسئول طراحی و توسعه محصولات وب شرکت",
    type: "work",
  },
  {
    id: "2",
    title: "توسعه‌دهنده فرانت‌اند",
    company: "استارتاپ دیجیتال",
    period: "۱۳۹۸ - ۱۴۰۱",
    description: "توسعه و نگهداری اپلیکیشن‌های وب",
    type: "work",
  },
  {
    id: "3",
    title: "کارشناسی ارشد مهندسی نرم‌افزار",
    company: "دانشگاه تهران",
    period: "۱۳۹۴ - ۱۳۹۶",
    description: "تحصیل در رشته مهندسی نرم‌افزار",
    type: "education",
  },
]

export default function AdminExperiencePage() {
  const [experiences, setExperiences] = useState<Experience[]>(initialExperiences)
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("work")

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    period: "",
    description: "",
    type: "work" as "work" | "education",
  })

  const handleOpenDialog = (experience?: Experience) => {
    if (experience) {
      setEditingExperience(experience)
      setFormData({
        title: experience.title,
        company: experience.company,
        period: experience.period,
        description: experience.description,
        type: experience.type,
      })
    } else {
      setEditingExperience(null)
      setFormData({
        title: "",
        company: "",
        period: "",
        description: "",
        type: activeTab as "work" | "education",
      })
    }
    setIsDialogOpen(true)
  }

  const handleSave = () => {
    const newExperience: Experience = {
      id: editingExperience?.id || Date.now().toString(),
      ...formData,
    }

    if (editingExperience) {
      setExperiences(experiences.map((e) => (e.id === editingExperience.id ? newExperience : e)))
    } else {
      setExperiences([...experiences, newExperience])
    }
    setIsDialogOpen(false)
  }

  const handleDelete = (id: string) => {
    setExperiences(experiences.filter((e) => e.id !== id))
  }

  const filteredExperiences = experiences.filter((e) => e.type === activeTab)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">تجربیات</h1>
          <p className="text-muted-foreground">مدیریت سوابق کاری و تحصیلی</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()} className="bg-primary hover:bg-primary/90">
              <Plus className="ml-2 h-4 w-4" />
              افزودن
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border">
            <DialogHeader>
              <DialogTitle className="text-foreground">
                {editingExperience ? "ویرایش" : "افزودن سابقه جدید"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>نوع</Label>
                <Select
                  value={formData.type}
                  onValueChange={(v) => setFormData({ ...formData, type: v as "work" | "education" })}
                >
                  <SelectTrigger className="bg-muted/50 border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="work">تجربه کاری</SelectItem>
                    <SelectItem value="education">تحصیلات</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">عنوان</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="bg-muted/50 border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">{formData.type === "work" ? "شرکت" : "دانشگاه"}</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="bg-muted/50 border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="period">بازه زمانی</Label>
                <Input
                  id="period"
                  value={formData.period}
                  onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                  className="bg-muted/50 border-border"
                  placeholder="۱۳۹۸ - ۱۴۰۱"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">توضیحات</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="bg-muted/50 border-border"
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter className="gap-2">
              <DialogClose asChild>
                <Button variant="outline">انصراف</Button>
              </DialogClose>
              <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
                {editingExperience ? "ذخیره" : "افزودن"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-muted/50">
          <TabsTrigger value="work" className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            تجربه کاری
          </TabsTrigger>
          <TabsTrigger value="education" className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4" />
            تحصیلات
          </TabsTrigger>
        </TabsList>

        {["work", "education"].map((tab) => (
          <TabsContent key={tab} value={tab} className="mt-4">
            <div className="space-y-4">
              {filteredExperiences.map((exp) => (
                <Card key={exp.id} className="bg-card border-border">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-foreground">{exp.title}</h3>
                        <p className="text-sm text-secondary">{exp.company}</p>
                        <p className="text-xs text-muted-foreground mt-1">{exp.period}</p>
                        <p className="text-sm text-muted-foreground mt-2">{exp.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleOpenDialog(exp)}>
                          <Pencil className="ml-1 h-3 w-3" />
                          ویرایش
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-destructive hover:bg-destructive/10 bg-transparent"
                          onClick={() => handleDelete(exp.id)}
                        >
                          <Trash2 className="ml-1 h-3 w-3" />
                          حذف
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
