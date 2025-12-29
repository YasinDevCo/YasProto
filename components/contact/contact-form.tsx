"use client";

import type React from "react";

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

  const validateForm = (formData: FormData) => {
    const newErrors: Record<string, string> = {};
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

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

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center  rounded-2xl border border-accent/50 bg-card p-12 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
          <CheckCircle className="h-8 w-8 text-accent" />
        </div>
        <h3 className="text-xl font-bold text-foreground mb-2">
          پیام شما ارسال شد!
        </h3>
        <p className="text-muted-foreground">به زودی با شما تماس خواهم گرفت.</p>
        <Button
          onClick={() => setIsSubmitted(false)}
          variant="outline"
          className="mt-6"
        >
          ارسال پیام جدید
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-border bg-card p-6 md:p-8 space-y-6"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">نام و نام خانوادگی</Label>
          <Input
            id="name"
            name="name"
            placeholder=" مثال: علی رضایی"
            className="bg-muted/50 border-border focus:border-primary"
          />
          {errors.name && (
            <p className="text-xs text-destructive">{errors.name}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">ایمیل</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="example@email.com"
            className="bg-muted/50 border-border focus:border-primary"
          />
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject">موضوع</Label>
        <Input
          id="subject"
          name="subject"
          placeholder="موضوع پیام شما"
          className="bg-muted/50 border-border focus:border-primary"
        />
        {errors.subject && (
          <p className="text-xs text-destructive">{errors.subject}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">پیام</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="پیام خود را بنویسید..."
          rows={5}
          className="bg-muted/50 border-border focus:border-primary resize-none"
        />
        {errors.message && (
          <p className="text-xs text-destructive">{errors.message}</p>
        )}
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full bg-primary hover:bg-primary/90"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="ml-2 h-5 w-5 animate-spin" />
            در حال ارسال...
          </>
        ) : (
          <>
            <Send className="ml-2 h-5 w-5" />
            ارسال پیام
          </>
        )}
      </Button>
    </form>
  );
}
