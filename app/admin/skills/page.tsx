"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
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
import { Plus, Pencil, Trash2, Search } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

import {
  useSkillsQuery,
  useCreateSkillMutation,
  useUpdateSkillMutation,
  useDeleteSkillMutation,
} from "@/lib/queries/skillQueries"

// لیست کامل آیکون‌ها از فایل خودت + مپینگ به نام واقعی skillicons.dev
import { SKILL_ICONS, ICON_DISPLAY_NAME, SKILL_ICON_MAPPING } from "@/lib/skills-icone"

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

export default function AdminSkillsPage() {
  const { data: skills = [], isLoading, isError, error } = useSkillsQuery()
  const createMutation = useCreateSkillMutation()
  const updateMutation = useUpdateSkillMutation()
  const deleteMutation = useDeleteSkillMutation()

  const [editingSkill, setEditingSkill] = useState<Skill | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("frontend")
  const [iconSearchOpen, setIconSearchOpen] = useState(false)
  const [iconSearchQuery, setIconSearchQuery] = useState("")

  const [formData, setFormData] = useState({
    name: "",
    level: 50,
    icon: "react",
    category: "frontend",
  })

  // لیست فیلتر شده بر اساس جستجو
  const filteredIcons = useMemo(() => {
    if (!iconSearchQuery) return SKILL_ICONS

    const lowerQuery = iconSearchQuery.toLowerCase()
    return SKILL_ICONS.filter((icon) => {
      const displayName = (ICON_DISPLAY_NAME[icon as keyof typeof ICON_DISPLAY_NAME] || icon).toLowerCase()
      return displayName.includes(lowerQuery) || icon.includes(lowerQuery)
    })
  }, [iconSearchQuery])

  const handleOpenDialog = (skill?: Skill) => {
    if (skill) {
      setEditingSkill(skill)
      setFormData({
        name: skill.name,
        level: skill.level,
        icon: skill.icon || "react",
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
        { onSuccess: () => { alert("مهارت با موفقیت ویرایش شد"); setIsDialogOpen(false) } }
      )
    } else {
      createMutation.mutate(payload, {
        onSuccess: () => { alert("مهارت جدید با موفقیت اضافه شد"); setIsDialogOpen(false) }
      })
    }
  }

  const handleDelete = (id: string) => {
    if (confirm("مطمئنید که می‌خواهید این مهارت را حذف کنید؟")) {
      deleteMutation.mutate(id, { onSuccess: () => alert("مهارت با موفقیت حذف شد") })
    }
  }

  const filteredSkills = skills.filter((s: Skill) => s.category === activeTab)

  // گرفتن نام واقعی برای نمایش آیکون (با مپینگ)
  const getIconNameForUrl = (key: string) => {
    return SKILL_ICON_MAPPING[key as keyof typeof SKILL_ICON_MAPPING] || key
  }

  if (isLoading) return <div className="p-8 text-center">در حال بارگذاری...</div>
  if (isError) return <div className="p-8 text-center text-destructive">خطا: {(error as any)?.message}</div>

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">مدیریت مهارت‌ها</h1>
          <p className="text-muted-foreground">افزودن، ویرایش و حذف مهارت‌های فنی</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()}>
              <Plus className="ml-2 h-4 w-4" />
              مهارت جدید
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{editingSkill ? "ویرایش مهارت" : "افزودن مهارت جدید"}</DialogTitle>
            </DialogHeader>

            <div className="space-y-5 py-4">
              {/* نام مهارت */}
              <div className="space-y-2">
                <Label htmlFor="name">نام مهارت</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="مثال: React, TypeScript, Docker"
                />
              </div>

              {/* انتخاب آیکون با جستجو (Command) */}
              <div className="space-y-2">
                <Label>آیکون مهارت</Label>
                <Popover open={iconSearchOpen} onOpenChange={setIconSearchOpen}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" role="combobox" className="w-full justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={`https://skillicons.dev/icons?i=${getIconNameForUrl(formData.icon)}&theme=dark`}
                          alt={formData.icon}
                          className="w-8 h-8"
                        />
                        <span>{ICON_DISPLAY_NAME[formData.icon as keyof typeof ICON_DISPLAY_NAME] || formData.icon}</span>
                      </div>
                      <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0" align="start">
                    <Command>
                      <CommandInput
                        placeholder="جستجو در آیکون‌ها..."
                        value={iconSearchQuery}
                        onValueChange={setIconSearchQuery}
                      />
                      <CommandList>
                        <CommandEmpty>آیکونی یافت نشد.</CommandEmpty>
                        <CommandGroup>
                          {filteredIcons.map((icon) => (
                            <CommandItem
                              key={icon}
                              onSelect={() => {
                                setFormData({ ...formData, icon })
                                setIconSearchOpen(false)
                                setIconSearchQuery("")
                              }}
                            >
                              <div className="flex items-center gap-3">
                                <img
                                  src={`https://skillicons.dev/icons?i=${getIconNameForUrl(icon)}&theme=dark`}
                                  alt={icon}
                                  className="w-8 h-8"
                                />
                                <span>{ICON_DISPLAY_NAME[icon as keyof typeof ICON_DISPLAY_NAME] || icon}</span>
                              </div>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              {/* سطح مهارت */}
              <div className="space-y-2">
                <Label htmlFor="level">سطح مهارت ({formData.level}%)</Label>
                <input
                  id="level"
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: Number(e.target.value) })}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              {/* دسته‌بندی */}
              <div className="space-y-2">
                <Label>دسته‌بندی</Label>
                <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">انصراف</Button>
              </DialogClose>
              <Button onClick={handleSave} disabled={createMutation.isPending || updateMutation.isPending}>
                {createMutation.isPending || updateMutation.isPending ? "در حال ذخیره..." : "ذخیره"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* لیست مهارت‌ها */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          {categories.map((cat) => (
            <TabsTrigger key={cat.value} value={cat.value}>{cat.label}</TabsTrigger>
          ))}
        </TabsList>

        {categories.map((cat) => (
          <TabsContent key={cat.value} value={cat.value} className="mt-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredSkills.map((skill) => (
                <Card key={skill._id} className="overflow-hidden">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-3 mb-4">
                      <img
                        src={`https://skillicons.dev/icons?i=${getIconNameForUrl(skill.icon)}&theme=dark`}
                        alt={skill.name}
                        className="w-10 h-10"
                        onError={(e) => (e.currentTarget.src = "https://skillicons.dev/icons?i=react&theme=dark")}
                      />
                      <div className="flex-1">
                        <p className="font-semibold">{skill.name}</p>
                        <p className="text-sm text-muted-foreground">{skill.level}%</p>
                      </div>
                    </div>

                    <div className="h-2 rounded-full bg-muted mb-4 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-secondary transition-all"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleOpenDialog(skill)}>
                        <Pencil className="h-3 w-3 ml-1" /> ویرایش
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(skill._id)}>
                        <Trash2 className="h-3 w-3 ml-1" /> حذف
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredSkills.length === 0 && (
              <p className="text-center text-muted-foreground py-8">هنوز مهارتی در این دسته اضافه نشده.</p>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}