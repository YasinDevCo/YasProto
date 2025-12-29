"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, Clock, Github, Linkedin, Twitter, Instagram } from "lucide-react";
import { useProfileQuery } from "@/lib/queries/profileQueries";

const socialLinksConfig = [
  { icon: Github, key: "github", label: "گیت‌هاب", color: "hover:bg-[#333] hover:text-white" },
  { icon: Linkedin, key: "linkedin", label: "لینکدین", color: "hover:bg-[#0077B5] hover:text-white" },
  { icon: Twitter, key: "twitter", label: "توییتر", color: "hover:bg-[#1DA1F2] hover:text-white" },
  { icon: Instagram, key: "instagram", label: "اینستاگرام", color: "hover:bg-[#E4405F] hover:text-white" },
];

export function ContactInfo() {
  const { data: profile, isLoading } = useProfileQuery();

  // لودینگ ساده
  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="h-8 w-64 bg-muted/30 rounded animate-pulse" />
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-muted/20 animate-pulse">
              <div className="h-12 w-12 rounded-xl bg-muted/30" />
              <div className="space-y-2">
                <div className="h-4 w-24 bg-muted/30 rounded" />
                <div className="h-5 w-48 bg-muted/30 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // اطلاعات تماس پویا
  const contactDetails = [
    {
      icon: Mail,
      label: "ایمیل",
      value: profile?.email || "m.ysain.abspor@gmail.com",
      href: profile?.email ? `mailto:${profile.email}` : "#",
    },
    {
      icon: Phone,
      label: "تلفن",
      value: profile?.phone || "09913445586",
      href: profile?.phone ? `tel:${profile.phone.replace(/[^+\d]/g, "")}` : "#",
    },
    {
      icon: MapPin,
      label: "آدرس",
      value: profile?.location || "اصفهان",
      href: "#",
    },
    {
      icon: Clock,
      label: "ساعات کاری",
      value: "شنبه تا پنجشنبه ۹-۱۸", // بعداً می‌تونی اینو هم به پروفایل اضافه کنی
      href: "#",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold text-foreground mb-4">بیایید صحبت کنیم!</h3>
        <p className="text-muted-foreground leading-relaxed text-pretty">
          آماده شنیدن ایده‌های شما هستم. اگر پروژه‌ای در ذهن دارید یا سوالی دارید، از طریق فرم یا اطلاعات تماس زیر با من در ارتباط باشید.
        </p>
      </div>

      {/* Contact Details - پویا */}
      <div className="space-y-4">
        {contactDetails.map((item, index) => {
          const Icon = item.icon;
          const isClickable = item.href !== "#";

          return (
            <Link
              key={index}
              href={item.href}
              className={`flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-all duration-300 ${
                isClickable
                  ? "hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 cursor-pointer"
                  : "opacity-70 cursor-not-allowed"
              }`}
              {...(isClickable ? { target: item.href.startsWith("mailto:") || item.href.startsWith("tel:") ? undefined : "_blank", rel: "noopener noreferrer" } : {})}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{item.label}</p>
                <p className="font-medium text-foreground">{item.value}</p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Social Links - پویا از دیتابیس */}
      <div>
        <h4 className="font-semibold text-foreground mb-4">مرا در شبکه‌های اجتماعی دنبال کنید</h4>
        <div className="flex gap-3">
          {socialLinksConfig.map((social) => {
            const Icon = social.icon;
            const url = profile?.[social.key as keyof typeof profile] as string | undefined;

            return (
              <Link
                key={social.key}
                href={url || "#"}
                target={url ? "_blank" : undefined}
                rel={url ? "noopener noreferrer" : undefined}
                className={`flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition-all duration-300 ${
                  url ? social.color + " hover:scale-110 cursor-pointer" : "opacity-50 cursor-not-allowed"
                }`}
                aria-label={social.label}
              >
                <Icon className="h-5 w-5" />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}