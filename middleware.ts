// /middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // اجازه به صفحه لاگین
  if (pathname.startsWith("/admin/login")) {
    return NextResponse.next();
  }

  // محافظت مسیرهای ادمین
  if (pathname.startsWith("/admin")) {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    // ❗ فقط وجود توکن، نه verify
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
