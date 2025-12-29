"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { Plus, Pencil, Trash2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import {
  useSkillsQuery,
  useCreateSkillMutation,
  useUpdateSkillMutation,
  useDeleteSkillMutation,
} from "@/lib/queries/skillQueries"

interface Skill {
  _id: string
  name: string
  level: number
  icon: string
  category: string
}

const categories = [
  { value: "frontend", label: "فرانت‌اند" },
  { value: "backend", label: "بک‌اند" },
  { value: "tools", label: "ابزارها" },
]

// لیست آیکون‌های ممکن (می‌تونی بیشتر اضافه کنی)
const iconOptions = [
  "typescript",
  "react",
  "next",
  "node",
  "mongodb",
  "github",
  // اضافه کن هر چی لازم داری
]

export default function AdminSkillsPage() {
  const { data: skills = [], isLoading, isError, error } = useSkillsQuery()
  const createMutation = useCreateSkillMutation()
  const updateMutation = useUpdateSkillMutation()
  const deleteMutation = useDeleteSkillMutation()

  const [editingSkill, setEditingSkill] = useState<Skill | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("frontend")

  const [formData, setFormData] = useState({
    name: "",
    level: 50,
    icon: "react",
    category: "frontend",
  })

  const handleOpenDialog = (skill?: Skill) => {
    if (skill) {
      setEditingSkill(skill)
      setFormData({
        name: skill.name,
        level: skill.level,
        icon: skill.icon,
        category: skill.category,
      })
    } else {
      setEditingSkill(null)
      setFormData({
        name: "",
        level: 50,
        icon: "react",
        category: activeTab,
      })
    }
    setIsDialogOpen(true)
  }

  const handleSave = () => {
    if (!formData.name.trim()) {
      alert("نام مهارت الزامی است")
      return
    }

    const payload = {
      name: formData.name.trim(),
      level: formData.level,
      icon: formData.icon,
      category: formData.category,
    }

    if (editingSkill) {
      updateMutation.mutate(
        { id: editingSkill._id, ...payload },
        {
          onSuccess: () => {
            alert("مهارت با موفقیت ویرایش شد")
            setIsDialogOpen(false)
          },
          onError: (err: any) => alert(err.message || "خطا در ویرایش مهارت"),
        }
      )
    } else {
      createMutation.mutate(payload, {
        onSuccess: () => {
          alert("مهارت جدید با موفقیت اضافه شد")
          setIsDialogOpen(false)
        },
        onError: (err: any) => alert(err.message || "خطا در افزودن مهارت"),
      })
    }
  }

  const handleDelete = (id: string) => {
    if (confirm("مطمئنید که می‌خواهید این مهارت را حذف کنید؟")) {
      deleteMutation.mutate(id, {
        onSuccess: () => alert("مهارت با موفقیت حذف شد"),
        onError: (err: any) => alert(err.message || "خطا در حذف مهارت"),
      })
    }
  }

  const filteredSkills = skills.filter((s: Skill) => s.category === activeTab)

  if (isLoading) {
    return <div className="p-8 text-center">در حال بارگذاری مهارت‌ها...</div>
  }

  if (isError) {
    return <div className="p-8 text-center text-destructive">خطا: {(error as any)?.message}</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">مدیریت مهارت‌ها</h1>
          <p className="text-muted-foreground">افزودن و ویرایش مهارت‌های فنی</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()} className="bg-primary hover:bg-primary/90">
              <Plus className="ml-2 h-4 w-4" />
              مهارت جدید
            </Button>
          </DialogTrigger>

          <DialogContent className="bg-card border-border">
            <DialogHeader>
              <DialogTitle className="text-foreground">
                {editingSkill ? "ویرایش مهارت" : "افزودن مهارت جدید"}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">نام مهارت</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-muted/50 border-border"
                  placeholder="React"
                />
              </div>

              <div className="space-y-2">
                <Label>آیکون</Label>
                <Select value={formData.icon} onValueChange={(v) => setFormData({ ...formData, icon: v })}>
                  <SelectTrigger className="bg-muted/50 border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {iconOptions.map((icon) => (
                      <SelectItem key={icon} value={icon}>
                        {icon}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="level">سطح مهارت ({formData.level}%)</Label>
                <input
                  id="level"
                  type="range"
                  min="0"
                  max="100"
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: Number(e.target.value) })}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label>دسته‌بندی</Label>
                <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v })}>
                  <SelectTrigger className="bg-muted/50 border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter className="gap-2">
              <DialogClose asChild>
                <Button variant="outline">انصراف</Button>
              </DialogClose>
              <Button
                onClick={handleSave}
                disabled={createMutation.isPending || updateMutation.isPending}
                className="bg-primary hover:bg-primary/90"
              >
                {createMutation.isPending || updateMutation.isPending
                  ? "در حال ذخیره..."
                  : editingSkill
                  ? "ذخیره تغییرات"
                  : "افزودن مهارت"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-muted/50">
          {categories.map((cat) => (
            <TabsTrigger key={cat.value} value={cat.value}>
              {cat.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((cat) => (
          <TabsContent key={cat.value} value={cat.value} className="mt-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredSkills.map((skill) => (
                <Card key={skill._id} className="bg-card border-border">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-medium text-foreground">{skill.name}</span>
                      <span className="text-sm text-primary font-bold">{skill.level}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted overflow-hidden mb-4">
                      <div
                        className="h-full rounded-full bg-gradient-to-l from-primary to-secondary"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleOpenDialog(skill)}>
                        <Pencil className="ml-1 h-3 w-3" />
                        ویرایش
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-destructive hover:bg-destructive/10 bg-transparent"
                        onClick={() => handleDelete(skill._id)}
                        disabled={deleteMutation.isPending}
                      >
                        <Trash2 className="ml-1 h-3 w-3" />
                        حذف
                      </Button>
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