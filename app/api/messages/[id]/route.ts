import { NextResponse, type NextRequest } from "next/server"
import { mockData } from "@/lib/data/mock-data"
import { checkAuth } from "@/lib/auth/middleware"

let messages = [...mockData.messages]

// GET - Protected
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authError = await checkAuth(request)
  if (authError) return authError

  const { id } = await params
  const message = messages.find((m) => m.id === id)
  if (!message) {
    return NextResponse.json({ error: "پیام یافت نشد" }, { status: 404 })
  }
  return NextResponse.json(message)
}

// PUT - Protected (mark as read/unread)
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authError = await checkAuth(request)
  if (authError) return authError

  try {
    const { id } = await params
    const body = await request.json()
    const index = messages.findIndex((m) => m.id === id)

    if (index === -1) {
      return NextResponse.json({ error: "پیام یافت نشد" }, { status: 404 })
    }

    messages[index] = { ...messages[index], ...body }
    return NextResponse.json(messages[index])
  } catch (error) {
    console.error("Message update error:", error)
    return NextResponse.json({ error: "خطای سرور" }, { status: 500 })
  }
}

// DELETE - Protected
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authError = await checkAuth(request)
  if (authError) return authError

  const { id } = await params
  const index = messages.findIndex((m) => m.id === id)

  if (index === -1) {
    return NextResponse.json({ error: "پیام یافت نشد" }, { status: 404 })
  }

  messages = messages.filter((m) => m.id !== id)
  return NextResponse.json({ success: true, message: "پیام با موفقیت حذف شد" })
}
