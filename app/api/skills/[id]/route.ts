import { NextResponse, type NextRequest } from "next/server"
import { mockData } from "@/lib/data/mock-data"
import { checkAuth } from "@/lib/auth/middleware"

let skills = [...mockData.skills]

// GET - Public
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const skill = skills.find((s) => s.id === id)
  if (!skill) {
    return NextResponse.json({ error: "مهارت یافت نشد" }, { status: 404 })
  }
  return NextResponse.json(skill)
}

// PUT - Protected
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authError = await checkAuth(request)
  if (authError) return authError

  try {
    const { id } = await params
    const body = await request.json()
    const index = skills.findIndex((s) => s.id === id)

    if (index === -1) {
      return NextResponse.json({ error: "مهارت یافت نشد" }, { status: 404 })
    }

    skills[index] = { ...skills[index], ...body }
    return NextResponse.json(skills[index])
  } catch (error) {
    console.error("Skill update error:", error)
    return NextResponse.json({ error: "خطای سرور" }, { status: 500 })
  }
}

// DELETE - Protected
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authError = await checkAuth(request)
  if (authError) return authError

  const { id } = await params
  const index = skills.findIndex((s) => s.id === id)

  if (index === -1) {
    return NextResponse.json({ error: "مهارت یافت نشد" }, { status: 404 })
  }

  skills = skills.filter((s) => s.id !== id)
  return NextResponse.json({ success: true, message: "مهارت با موفقیت حذف شد" })
}
