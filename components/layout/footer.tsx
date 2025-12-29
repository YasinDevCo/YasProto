"use client";   // ← این خط اضافه شد!

import Link from "next/link";
import { Github, Linkedin, Twitter, Instagram, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { useProfileQuery } from "@/lib/queries/profileQueries";

const socialLinks = [
  { icon: Github, label: "گیت‌هاب", key: "github" },
  { icon: Linkedin, label: "لینکدین", key: "linkedin" },
  { icon: Twitter, label: "توییتر", key: "twitter" },

  { icon: Mail, label: "ایمیل", key: "email" },
];

const footerLinks = [
  { href: "/", label: "صفحه اصلی" },
  { href: "/about", label: "درباره من" },
  { href: "/projects", label: "پروژه‌ها" },
  { href: "/contact", label: "تماس با من" },
];

export function Footer() {
  const { data: profile } = useProfileQuery();

  return (
    <footer className="border-t border-border bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-bold bg-gradient-to-l from-primary to-secondary bg-clip-text text-transparent">
                پورتفولیو
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              توسعه‌دهنده فرانت‌اند با تمرکز بر ساخت تجربه‌های کاربری زیبا و کاربردی
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">دسترسی سریع</h3>
            <nav className="flex flex-col gap-2">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">شبکه‌های اجتماعی</h3>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                const rawUrl = profile?.[social.key as keyof typeof profile] as string | undefined;
                const url = social.key === "email" ? (rawUrl ? `mailto:${rawUrl}` : undefined) : rawUrl;

                return (
                  <Link
                    key={social.key}
                    href={url || "#"}
                    target={url && !url.startsWith("mailto:") ? "_blank" : undefined}
                    rel={url && !url.startsWith("mailto:") ? "noopener noreferrer" : undefined}
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-all duration-300",
                      url
                        ? "hover:border-primary hover:text-primary hover:scale-110 cursor-pointer"
                        : "opacity-50 cursor-not-allowed"
                    )}
                    aria-label={social.label}
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} تمامی حقوق محفوظ است.
          </p>
        </div>
      </div>
    </footer>
  );
}