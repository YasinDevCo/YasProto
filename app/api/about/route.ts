import { NextResponse } from "next/server"
import { mockData, type About } from "@/lib/data/mock-data"
import { checkAuth } from "@/lib/auth/middleware"
import { validateRequired } from "@/lib/utils/validation"

// In-memory store
let aboutData: About = { ...mockData.about }

// GET - Public
export async function GET() {
  return NextResponse.json(aboutData)
}

// POST - Protected: Update about content
export async function POST(request: Request) {
  const authError = await checkAuth(request as unknown as import("next/server").NextRequest)
  if (authError) return authError

  try {
    const body = await request.json()

    const validation = validateRequired(body, ["title", "biography"])
    if (!validation.valid) {
      return NextResponse.json({ error: "اطلاعات نامعتبر", details: validation.errors }, { status: 400 })
    }

    aboutData = {
      ...aboutData,
      ...body,
      id: aboutData.id,
    }

    return NextResponse.json(aboutData)
  } catch (error) {
    console.error("About update error:", error)
    return NextResponse.json({ error: "خطای سرور" }, { status: 500 })
  }
}

// PUT - Protected
export async function PUT(request: Request) {
  return POST(request)
}

// DELETE - Protected: Reset about content
export async function DELETE(request: Request) {
  const authError = await checkAuth(request as unknown as import("next/server").NextRequest)
  if (authError) return authError

  aboutData = { ...mockData.about }
  return NextResponse.json({ success: true, message: "محتوای درباره من به حالت پیش‌فرض بازگردانده شد" })
}
