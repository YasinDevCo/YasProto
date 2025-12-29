import { NextResponse } from "next/server"
import { createToken, validateCredentials } from "@/lib/auth/jwt"
import { cookies } from "next/headers"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { username, password } = body

    // Validate input
    if (!username || !password) {
      return NextResponse.json(
        { error: "نام کاربری و رمز عبور الزامی است", code: "MISSING_CREDENTIALS" },
        { status: 400 },
      )
    }

    // Validate credentials
    if (!validateCredentials(username, password)) {
      return NextResponse.json(
        { error: "نام کاربری یا رمز عبور اشتباه است", code: "INVALID_CREDENTIALS" },
        { status: 401 },
      )
    }

    // Create JWT token
    const token = await createToken({ username, role: "admin" })

    // Set cookie
    const cookieStore = await cookies()
    cookieStore.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    })

    return NextResponse.json({
      success: true,
      message: "ورود موفقیت‌آمیز",
      token,
      user: { username, role: "admin" },
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "خطای سرور", code: "SERVER_ERROR" }, { status: 500 })
  }
}
