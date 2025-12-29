"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Plus, Pencil, Trash2, Upload, X } from "lucide-react"
import {
  useProjectsQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  useUploadImageMutation, // اضافه شد
} from "@/lib/queries/projectQueries"

const categories = ["فروشگاه", "داشبورد", "اپلیکیشن", "وبلاگ", "لندینگ", "سایر"] as const

export default function AdminProjectsPage() {
  const { data: projects = [], isLoading } = useProjectsQuery()
  const createMutation = useCreateProjectMutation()
  const updateMutation = useUpdateProjectMutation()
  const deleteMutation = useDeleteProjectMutation()
  const uploadMutation = useUploadImageMutation() // اضافه شد

  const [isOpen, setIsOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<any>(null)

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "", // این الان URL از Cloudinary میشه
    technologies: "",
    demoUrl: "",
    githubUrl: "",
    category: "اپلیکیشن" as any,
    featured: false,
  })

  // برای پیش‌نمایش تصویر انتخاب‌شده
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const openDialog = (project?: any) => {
    if (project) {
      setEditingProject(project)
      setFormData({
        title: project.title,
        description: project.description,
        image: project.image || "",
        technologies: project.technologies.join(", "),
        demoUrl: project.demoUrl || "",
        githubUrl: project.githubUrl || "",
        category: project.category,
        featured: project.featured || false,
      })
      setImagePreview(project.image || null)
    } else {
      setEditingProject(null)
      setFormData({
        title: "",
        description: "",
        image: "",
        technologies: "",
        demoUrl: "",
        githubUrl: "",
        category: "اپلیکیشن",
        featured: false,
      })
      setImagePreview(null)
    }
    setIsOpen(true)
  }

  // هندل کردن انتخاب فایل
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // پیش‌نمایش فوری
    const previewUrl = URL.createObjectURL(file)
    setImagePreview(previewUrl)

    try {
      // آپلود به Cloudinary
      const result = await uploadMutation.mutateAsync(file)
      setFormData(prev => ({ ...prev, image: result.url }))
    } catch (err) {
      alert("خطا در آپلود تصویر")
      setImagePreview(null)
      setFormData(prev => ({ ...prev, image: "" }))
    }
  }

  // حذف تصویر انتخاب‌شده
  const removeImage = () => {
    setImagePreview(null)
    setFormData(prev => ({ ...prev, image: "" }))
  }

  const saveProject = () => {
    if (!formData.image) {
      alert("لطفاً یک تصویر برای پروژه انتخاب کنید")
      return
    }

    const techs = formData.technologies.split(",").map(t => t.trim()).filter(Boolean)

    const data = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      image: formData.image,
      technologies: techs,
      demoUrl: formData.demoUrl.trim() || undefined,
      githubUrl: formData.githubUrl.trim() || undefined,
      category: formData.category,
      featured: formData.featured,
    }

    if (editingProject) {
      updateMutation.mutate({ id: editingProject._id, ...data })
    } else {
      createMutation.mutate(data as any)
    }
    setIsOpen(false)
  }

  const removeProject = (id: string) => {
    if (confirm("آیا از حذف این پروژه مطمئن هستید؟")) {
      deleteMutation.mutate(id)
    }
  }

  return (
    <div className="space-y-8 py-6">
      {/* هدر و دکمه افزودن */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">مدیریت پروژه‌ها</h1>
          <p className="text-sm text-muted-foreground mt-1">لیست پروژه‌های نمونه کار</p>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => openDialog()}>
              <Plus className="ml-2 h-4 w-4" />
              افزودن پروژه
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingProject ? "ویرایش پروژه" : "پروژه جدید"}</DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-4">
              {/* عنوان و دسته‌بندی */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>عنوان</Label>
                  <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>دسته‌بندی</Label>
                  <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v as any })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* توضیحات */}
              <div className="space-y-2">
                <Label>توضیحات</Label>
                <Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={3} />
              </div>

              {/* آپلود تصویر */}
              <div className="space-y-3">
                <Label>تصویر پروژه</Label>
                {imagePreview ? (
                  <div className="relative">
                    <img src={imagePreview} alt="پیش‌نمایش" className="w-full h-64 object-cover rounded-lg" />
                    <Button
                      size="sm"
                      variant="destructive"
                      className="absolute top-2 left-2"
                      onClick={removeImage}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-8 text-center">
                    <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-sm text-muted-foreground">تصویر را اینجا بکشید یا کلیک کنید</p>
                  </div>
                )}

                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={uploadMutation.isPending}
                  className="cursor-pointer"
                />
                {uploadMutation.isPending && <p className="text-sm text-muted-foreground">در حال آپلود...</p>}
              </div>

              {/* تکنولوژی‌ها */}
              <div className="space-y-2">
                <Label>تکنولوژی‌ها (با کاما جدا کنید)</Label>
                <Input value={formData.technologies} onChange={(e) => setFormData({ ...formData, technologies: e.target.value })} />
              </div>

              {/* لینک‌ها */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>لینک دمو</Label>
                  <Input value={formData.demoUrl} onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>لینک گیت‌هاب</Label>
                  <Input value={formData.githubUrl} onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })} />
                </div>
              </div>

              {/* ویژه */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                />
                <Label htmlFor="featured" className="cursor-pointer text-sm">پروژه ویژه</Label>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsOpen(false)}>انصراف</Button>
              <Button onClick={saveProject} disabled={uploadMutation.isPending || createMutation.isPending || updateMutation.isPending}>
                ذخیره
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* لیست پروژه‌ها (همون قبلی) */}
      <div className="space-y-3">
        {/* ... بقیه کد لیست مثل قبل ... */}
        {isLoading ? (
          // اسکلتون
          [...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center justify-between p-4 border rounded-lg bg-card">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-muted rounded-lg" />
                <div className="h-5 w-64 bg-muted rounded" />
              </div>
              <div className="flex gap-2">
                <div className="h-9 w-20 bg-muted rounded" />
                <div className="h-9 w-20 bg-muted rounded" />
              </div>
            </div>
          ))
        ) : projects.length === 0 ? (
          <div className="text-center py-10 text-muted-foreground">
            هنوز پروژه‌ای اضافه نشده است.
          </div>
        ) : (
          projects.map((project) => (
            <div
              key={project._id}
              className="flex items-center justify-between p-4 border rounded-lg bg-card hover:bg-muted/20 transition-colors"
            >
              <div className="flex items-center gap-4">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-12 h-12 object-cover rounded-lg"
                />
                <div>
                  <div className="font-medium flex items-center gap-2">
                    {project.title}
                    {project.featured && <Badge variant="secondary" className="text-xs">ویژه</Badge>}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {project.category}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" onClick={() => openDialog(project)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-destructive border-destructive/50"
                  onClick={() => removeProject(project._id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}