import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth/jwt"

export async function GET() {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "عدم احراز هویت", code: "UNAUTHORIZED" }, { status: 401 })
    }

    return NextResponse.json({
      success: true,
      user: {
        username: user.username,
        role: user.role,
      },
    })
  } catch (error) {
    console.error("Auth check error:", error)
    return NextResponse.json({ error: "خطای سرور", code: "SERVER_ERROR" }, { status: 500 })
  }
}
