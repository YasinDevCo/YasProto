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
import { Plus, Pencil, Trash2, Code2, Palette, Smartphone, Gauge, Search, Wrench } from "lucide-react"

interface Service {
  id: string
  title: string
  description: string
  iconName: string
  features: string[]
}

const iconMap: Record<string, typeof Code2> = {
  Code2,
  Palette,
  Smartphone,
  Gauge,
  Search,
  Wrench,
}

const initialServices: Service[] = [
  {
    id: "1",
    title: "توسعه وب",
    description: "طراحی و توسعه وب‌سایت‌های مدرن",
    iconName: "Code2",
    features: ["React", "Next.js", "TypeScript"],
  },
  {
    id: "2",
    title: "طراحی UI/UX",
    description: "طراحی رابط کاربری زیبا",
    iconName: "Palette",
    features: ["Wireframing", "Prototyping", "Design Systems"],
  },
]

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>(initialServices)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    iconName: "Code2",
    features: "",
  })

  const handleOpenDialog = (service?: Service) => {
    if (service) {
      setEditingService(service)
      setFormData({
        title: service.title,
        description: service.description,
        iconName: service.iconName,
        features: service.features.join(", "),
      })
    } else {
      setEditingService(null)
      setFormData({
        title: "",
        description: "",
        iconName: "Code2",
        features: "",
      })
    }
    setIsDialogOpen(true)
  }

  const handleSave = () => {
    const newService: Service = {
      id: editingService?.id || Date.now().toString(),
      title: formData.title,
      description: formData.description,
      iconName: formData.iconName,
      features: formData.features.split(",").map((f) => f.trim()),
    }

    if (editingService) {
      setServices(services.map((s) => (s.id === editingService.id ? newService : s)))
    } else {
      setServices([...services, newService])
    }
    setIsDialogOpen(false)
  }

  const handleDelete = (id: string) => {
    setServices(services.filter((s) => s.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">مدیریت خدمات</h1>
          <p className="text-muted-foreground">افزودن و ویرایش خدمات قابل ارائه</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()} className="bg-primary hover:bg-primary/90">
              <Plus className="ml-2 h-4 w-4" />
              خدمت جدید
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border">
            <DialogHeader>
              <DialogTitle className="text-foreground">
                {editingService ? "ویرایش خدمت" : "افزودن خدمت جدید"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">عنوان خدمت</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="bg-muted/50 border-border"
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
              <div className="space-y-2">
                <Label htmlFor="features">ویژگی‌ها (با کاما جدا کنید)</Label>
                <Input
                  id="features"
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  className="bg-muted/50 border-border"
                  placeholder="React, Next.js, TypeScript"
                />
              </div>
            </div>
            <DialogFooter className="gap-2">
              <DialogClose asChild>
                <Button variant="outline">انصراف</Button>
              </DialogClose>
              <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
                {editingService ? "ذخیره" : "افزودن"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {services.map((service) => {
          const Icon = iconMap[service.iconName] || Code2
          return (
            <Card key={service.id} className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground">{service.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{service.description}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {service.features.map((feature, i) => (
                        <span key={i} className="text-xs bg-muted/50 text-muted-foreground px-2 py-1 rounded">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
                  <Button variant="outline" size="sm" onClick={() => handleOpenDialog(service)}>
                    <Pencil className="ml-1 h-3 w-3" />
                    ویرایش
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:bg-destructive/10 bg-transparent"
                    onClick={() => handleDelete(service.id)}
                  >
                    <Trash2 className="ml-1 h-3 w-3" />
                    حذف
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
