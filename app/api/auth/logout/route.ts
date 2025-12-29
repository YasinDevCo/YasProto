import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST() {
  try {
    const cookieStore = await cookies()
    cookieStore.delete("admin_token")

    return NextResponse.json({
      success: true,
      message: "خروج موفقیت‌آمیز",
    })
  } catch (error) {
    console.error("Logout error:", error)
    return NextResponse.json({ error: "خطای سرور", code: "SERVER_ERROR" }, { status: 500 })
  }
}
