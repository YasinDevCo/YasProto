"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Trash2, Mail, MailOpen, RefreshCw, Loader2 } from "lucide-react";
import {
  useMessagesQuery,
  useMarkAsReadMutation,
  useDeleteMessageMutation,
} from "@/lib/queries/messageQueries";

interface Message {
  id: string;
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  formattedDate: string;
  read: boolean;
}

export default function AdminMessagesPage() {
  const { data: messages = [], isLoading, refetch } = useMessagesQuery();
  const markAsReadMutation = useMarkAsReadMutation();
  const deleteMutation = useDeleteMessageMutation();

  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const handleView = (message: Message) => {
    setSelectedMessage(message);
    if (!message.read) {
      markAsReadMutation.mutate(message.id);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("آیا از حذف این پیام مطمئن هستید؟")) {
      deleteMutation.mutate(id);
      setSelectedMessage(null);
    }
  };

  const unreadCount = messages.filter((m: Message) => !m.read).length;

  return (
    <div className="space-y-6 py-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">پیام‌های تماس</h1>
          <p className="text-muted-foreground mt-1">
            {unreadCount > 0
              ? `${unreadCount} پیام خوانده نشده`
              : "همه پیام‌ها خوانده شده"}
          </p>
        </div>

        <Button
          onClick={() => refetch()}
          variant="outline"
          size="sm"
          disabled={isLoading}
        >
          <RefreshCw
            className={`h-4 w-4 ml-2 ${isLoading ? "animate-spin" : ""}`}
          />
          تازه‌سازی
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-muted rounded-full" />
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-muted rounded w-48" />
                    <div className="h-3 bg-muted rounded w-32" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : messages.length === 0 ? (
        <Card className="p-12 text-center">
          <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">هنوز هیچ پیامی دریافت نشده است.</p>
        </Card>
      ) : (
        <div className="grid gap-4">
          {messages.map((message: Message) => (
            <Card
              key={message.id}
              className={`bg-card border-border cursor-pointer transition-all hover:shadow-md hover:border-primary/50 ${
                !message.read ? "border-r-4 border-r-primary" : ""
              }`}
              onClick={() => handleView(message)}
            >
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div
                      className={`h-12 w-12 rounded-full flex items-center justify-center ${
                        message.read
                          ? "bg-muted text-muted-foreground"
                          : "bg-primary/10 text-primary"
                      }`}
                    >
                      {message.read ? (
                        <MailOpen className="h-6 w-6" />
                      ) : (
                        <Mail className="h-6 w-6" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <span
                          className={`font-semibold text-lg ${
                            message.read ? "text-muted-foreground" : "text-foreground"
                          }`}
                        >
                          {message.name}
                        </span>
                        {!message.read && (
                          <Badge className="bg-primary text-primary-foreground text-xs">
                            جدید
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {message.subject}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                        {message.message}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-3">
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {message.formattedDate}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:bg-destructive/10"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(message.id);
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
      )}

      {/* دیالوگ جزئیات پیام */}
      <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedMessage?.subject}</DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-6">
            <div className="flex items-center gap-5 p-5 rounded-xl bg-muted/40">
              <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center text-primary text-2xl font-bold">
                {selectedMessage?.name[0]}
              </div>
              <div className="flex-1">
                <p className="text-lg font-semibold">{selectedMessage?.name}</p>
                <p className="text-muted-foreground">{selectedMessage?.email}</p>
              </div>
              <span className="text-sm text-muted-foreground">
                {selectedMessage?.formattedDate}
              </span>
            </div>

            <div className="p-6 rounded-xl bg-muted/30">
              <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                {selectedMessage?.message}
              </p>
            </div>
          </div>

          <DialogFooter className="gap-3">
            <Button
              variant="destructive"
              onClick={() => selectedMessage && handleDelete(selectedMessage.id)}
            >
              <Trash2 className="ml-2 h-4 w-4" />
              حذف پیام
            </Button>

            <DialogClose asChild>
              <Button variant="outline">بستن</Button>
            </DialogClose>

            <Button asChild>
              <a href={`mailto:${selectedMessage?.email}?subject=Re: ${selectedMessage?.subject}`}>
                پاسخ با ایمیل
              </a>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}