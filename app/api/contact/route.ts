import { NextResponse, type NextRequest } from "next/server"
import { mockData } from "@/lib/data/mock-data"
import { checkAuth } from "@/lib/auth/middleware"

// GET - Public: Get contact info
export async function GET() {
  const { email, phone, location, github, linkedin, twitter, instagram } = mockData.profile
  return NextResponse.json({
    email,
    phone,
    location,
    socialLinks: [
      { platform: "GitHub", url: github, icon: "Github" },
      { platform: "LinkedIn", url: linkedin, icon: "Linkedin" },
      { platform: "Twitter", url: twitter, icon: "Twitter" },
      { platform: "Instagram", url: instagram, icon: "Instagram" },
    ],
  })
}

// POST - Public: Submit contact form (redirects to messages)
export async function POST(request: NextRequest) {
  const body = await request.json()

  // Validate required fields
  const { name, email, subject, message } = body

  if (!name || name.length < 2) {
    return NextResponse.json({ error: "نام باید حداقل ۲ کاراکتر باشد" }, { status: 400 })
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "ایمیل معتبر نیست" }, { status: 400 })
  }

  if (!subject || subject.length < 3) {
    return NextResponse.json({ error: "موضوع باید حداقل ۳ کاراکتر باشد" }, { status: 400 })
  }

  if (!message || message.length < 10) {
    return NextResponse.json({ error: "پیام باید حداقل ۱۰ کاراکتر باشد" }, { status: 400 })
  }

  // Forward to messages API
  const messagesResponse = await fetch(new URL("/api/messages", request.url), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })

  if (!messagesResponse.ok) {
    return NextResponse.json({ error: "خطا در ارسال پیام" }, { status: 500 })
  }

  return NextResponse.json({
    success: true,
    message: "پیام شما با موفقیت ارسال شد",
  })
}

// PUT - Protected: Update contact info
export async function PUT(request: NextRequest) {
  const authError = await checkAuth(request)
  if (authError) return authError

  try {
    const body = await request.json()
    // In real app, update profile in database
    return NextResponse.json({
      success: true,
      message: "اطلاعات تماس با موفقیت به‌روزرسانی شد",
    })
  } catch (error) {
    console.error("Contact update error:", error)
    return NextResponse.json({ error: "خطای سرور" }, { status: 500 })
  }
}
