import { NextResponse, type NextRequest } from "next/server"
import { mockData, type Message } from "@/lib/data/mock-data"
import { checkAuth } from "@/lib/auth/middleware"
import { validateRequired, validateEmail, paginate, getPaginationParams } from "@/lib/utils/validation"

const messages = [...mockData.messages]

// GET - Protected (admin only can see messages)
export async function GET(request: NextRequest) {
  const authError = await checkAuth(request)
  if (authError) return authError

  const { searchParams } = new URL(request.url)
  const { page, limit } = getPaginationParams(searchParams)
  const unreadOnly = searchParams.get("unread") === "true"

  let filteredMessages = [...messages]

  if (unreadOnly) {
    filteredMessages = filteredMessages.filter((m) => !m.read)
  }

  // Sort by date (newest first)
  filteredMessages.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const result = paginate(filteredMessages, page, limit)
  return NextResponse.json(result)
}

// POST - Public (contact form submission)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const validation = validateRequired(body, ["name", "email", "subject", "message"])
    if (!validation.valid) {
      return NextResponse.json({ error: "اطلاعات نامعتبر", details: validation.errors }, { status: 400 })
    }

    const emailError = validateEmail(body.email)
    if (emailError) {
      return NextResponse.json({ error: emailError.message }, { status: 400 })
    }

    if (body.message.length < 10) {
      return NextResponse.json({ error: "پیام باید حداقل ۱۰ کاراکتر باشد" }, { status: 400 })
    }

    const newMessage: Message = {
      ...body,
      id: Date.now().toString(),
      date: new Date().toLocaleDateString("fa-IR"),
      read: false,
    }
    messages.push(newMessage)

    return NextResponse.json(
      {
        success: true,
        message: "پیام شما با موفقیت ارسال شد",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Message creation error:", error)
    return NextResponse.json({ error: "خطای سرور" }, { status: 500 })
  }
}

export { messages }
