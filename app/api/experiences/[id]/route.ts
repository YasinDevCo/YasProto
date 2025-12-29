import { NextResponse, type NextRequest } from "next/server"
import { mockData } from "@/lib/data/mock-data"
import { checkAuth } from "@/lib/auth/middleware"

let experiences = [...mockData.experiences]

// GET - Public
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const experience = experiences.find((e) => e.id === id)
  if (!experience) {
    return NextResponse.json({ error: "سابقه یافت نشد" }, { status: 404 })
  }
  return NextResponse.json(experience)
}

// PUT - Protected
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authError = await checkAuth(request)
  if (authError) return authError

  try {
    const { id } = await params
    const body = await request.json()
    const index = experiences.findIndex((e) => e.id === id)

    if (index === -1) {
      return NextResponse.json({ error: "سابقه یافت نشد" }, { status: 404 })
    }

    experiences[index] = { ...experiences[index], ...body }
    return NextResponse.json(experiences[index])
  } catch (error) {
    console.error("Experience update error:", error)
    return NextResponse.json({ error: "خطای سرور" }, { status: 500 })
  }
}

// DELETE - Protected
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authError = await checkAuth(request)
  if (authError) return authError

  const { id } = await params
  const index = experiences.findIndex((e) => e.id === id)

  if (index === -1) {
    return NextResponse.json({ error: "سابقه یافت نشد" }, { status: 404 })
  }

  experiences = experiences.filter((e) => e.id !== id)
  return NextResponse.json({ success: true, message: "سابقه با موفقیت حذف شد" })
}
