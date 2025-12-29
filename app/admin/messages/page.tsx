"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Trash2, Mail, MailOpen } from "lucide-react"

interface Message {
  id: string
  name: string
  email: string
  subject: string
  message: string
  date: string
  read: boolean
}

const initialMessages: Message[] = [
  {
    id: "1",
    name: "محمد رضایی",
    email: "mohammad@example.com",
    subject: "درخواست همکاری",
    message: "سلام، من علاقه‌مند به همکاری در پروژه وب‌سایت فروشگاهی هستم. لطفاً با من تماس بگیرید.",
    date: "۱۴۰۳/۰۱/۱۵",
    read: false,
  },
  {
    id: "2",
    name: "سارا احمدی",
    email: "sara@example.com",
    subject: "سوال درباره پروژه",
    message: "با سلام، می‌خواستم در مورد پروژه داشبورد مدیریت بیشتر بدانم. آیا امکان دموی آنلاین وجود دارد؟",
    date: "۱۴۰۳/۰۱/۱۴",
    read: true,
  },
  {
    id: "3",
    name: "علی کریمی",
    email: "ali@example.com",
    subject: "پیشنهاد کاری",
    message: "سلام، یک پروژه استارتاپی داریم که به یک توسعه‌دهنده فرانت‌اند نیاز داریم. آیا علاقه‌مند هستید؟",
    date: "۱۴۰۳/۰۱/۱۳",
    read: false,
  },
]

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)

  const handleView = (message: Message) => {
    setSelectedMessage(message)
    if (!message.read) {
      setMessages(messages.map((m) => (m.id === message.id ? { ...m, read: true } : m)))
    }
  }

  const handleDelete = (id: string) => {
    setMessages(messages.filter((m) => m.id !== id))
    setSelectedMessage(null)
  }

  const unreadCount = messages.filter((m) => !m.read).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">پیام‌ها</h1>
          <p className="text-muted-foreground">
            {unreadCount > 0 ? `${unreadCount} پیام خوانده نشده` : "همه پیام‌ها خوانده شده"}
          </p>
        </div>
      </div>

      <div className="grid gap-4">
        {messages.map((message) => (
          <Card
            key={message.id}
            className={`bg-card border-border cursor-pointer transition-all hover:border-primary/50 ${!message.read ? "border-r-4 border-r-primary" : ""}`}
            onClick={() => handleView(message)}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center ${message.read ? "bg-muted text-muted-foreground" : "bg-primary/10 text-primary"}`}
                  >
                    {message.read ? <MailOpen className="h-5 w-5" /> : <Mail className="h-5 w-5" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`font-medium ${message.read ? "text-muted-foreground" : "text-foreground"}`}>
                        {message.name}
                      </span>
                      {!message.read && <Badge className="bg-primary/10 text-primary text-xs">جدید</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground">{message.subject}</p>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{message.message}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{message.date}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:bg-destructive/10"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDelete(message.id)
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Message Dialog */}
      <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
        <DialogContent className="bg-card border-border max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-foreground">{selectedMessage?.subject}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/30">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                {selectedMessage?.name[0]}
              </div>
              <div>
                <p className="font-medium text-foreground">{selectedMessage?.name}</p>
                <p className="text-sm text-muted-foreground">{selectedMessage?.email}</p>
              </div>
              <span className="mr-auto text-xs text-muted-foreground">{selectedMessage?.date}</span>
            </div>
            <div className="p-4 rounded-lg bg-muted/20">
              <p className="text-foreground whitespace-pre-wrap leading-relaxed">{selectedMessage?.message}</p>
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              className="text-destructive hover:bg-destructive/10 bg-transparent"
              onClick={() => selectedMessage && handleDelete(selectedMessage.id)}
            >
              <Trash2 className="ml-2 h-4 w-4" />
              حذف پیام
            </Button>
            <DialogClose asChild>
              <Button variant="outline">بستن</Button>
            </DialogClose>
            <Button className="bg-primary hover:bg-primary/90" asChild>
              <a href={`mailto:${selectedMessage?.email}`}>پاسخ</a>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
