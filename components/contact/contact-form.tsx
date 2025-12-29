"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send, Loader2, CheckCircle } from "lucide-react";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // اعتبارسنجی سمت کلاینت
  const validateForm = (formData: FormData) => {
    const newErrors: Record<string, string> = {};

    const name = (formData.get("name") as string)?.trim();
    const email = (formData.get("email") as string)?.trim();
    const subject = (formData.get("subject") as string)?.trim();
    const message = (formData.get("message") as string)?.trim();

    if (!name || name.length < 2) {
      newErrors.name = "نام باید حداقل ۲ کاراکتر باشد";
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "ایمیل معتبر نیست";
    }
    if (!subject || subject.length < 3) {
      newErrors.subject = "موضوع باید حداقل ۳ کاراکتر باشد";
    }
    if (!message || message.length < 10) {
      newErrors.message = "پیام باید حداقل ۱۰ کاراکتر باشد";
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          subject: formData.get("subject"),
          message: formData.get("message"),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // اگر خطای اعتبارسنجی از سرور برگشت
        if (data.error) {
          alert(data.error);
        }
        return;
      }

      // موفقیت!
      setIsSubmitted(true);
    } catch (error) {
      alert("خطا در اتصال به سرور. لطفاً دوباره تلاش کنید.");
      console.error("Contact form error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // حالت موفقیت — صفحه تشکر
  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-accent/50 bg-card p-12 text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-accent/10">
          <CheckCircle className="h-12 w-12 text-accent" />
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-3">
          پیام شما با موفقیت ارسال شد!
        </h3>
        <p className="text-lg text-muted-foreground max-w-md">
          ممنون از شما. در اسرع وقت پیامتون رو می‌خونم و جواب می‌دم.
        </p>
        <Button
          onClick={() => {
            setIsSubmitted(false);
            setErrors({});
          }}
          variant="outline"
          size="lg"
          className="mt-8"
        >
          ارسال پیام جدید
        </Button>
      </div>
    );
  }

  // فرم اصلی
  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-border bg-card p-6 md:p-8 space-y-7 shadow-lg"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">نام و نام خانوادگی</Label>
          <Input
            id="name"
            name="name"
            placeholder="مثال: یاسین محمدی"
            className="bg-muted/50 border-border focus:border-primary transition-colors"
            disabled={isSubmitting}
          />
          {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">ایمیل</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="yasin@example.com"
            className="bg-muted/50 border-border focus:border-primary transition-colors"
            disabled={isSubmitting}
          />
          {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject">موضوع</Label>
        <Input
          id="subject"
          name="subject"
          placeholder="موضوع پیام شما..."
          className="bg-muted/50 border-border focus:border-primary transition-colors"
          disabled={isSubmitting}
        />
        {errors.subject && <p className="text-sm text-destructive">{errors.subject}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">پیام شما</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="پیامت رو اینجا بنویس... (حداقل ۱۰ کاراکتر)"
          rows={6}
          className="bg-muted/50 border-border focus:border-primary resize-none transition-colors"
          disabled={isSubmitting}
        />
        {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full text-lg font-medium bg-primary hover:bg-primary/90 transition-all"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="ml-3 h-5 w-5 animate-spin" />
            در حال ارسال...
          </>
        ) : (
          <>
            <Send className="ml-3 h-5 w-5" />
            ارسال پیام
          </>
        )}
      </Button>
    </form>
  );
}