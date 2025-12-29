// app/layout.tsx   ← همین فایل فعلی رو جایگزین کن
import type React from "react";
import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Providers from "./providers"; // ← فقط این خط رو اضافه کن

export const metadata: Metadata = {
  title: "YasinDevCo | توسعه‌دهنده وب",
  description: "YasinDevCo طراح وب",
  icons: {
    icon: [
      { url: "/avatar.png" },

    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#0F172A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <Providers>           {/* ← فقط اینجا عوض شد */}
          {children}
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}