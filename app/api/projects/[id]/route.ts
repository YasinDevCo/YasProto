import { NextResponse, type NextRequest } from "next/server"
import { mockData } from "@/lib/data/mock-data"
import { checkAuth } from "@/lib/auth/middleware"

// In-memory store
let projects = [...mockData.projects]

// GET - Public
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const project = projects.find((p) => p.id === id)
  if (!project) {
    return NextResponse.json({ error: "پروژه یافت نشد" }, { status: 404 })
  }
  return NextResponse.json(project)
}

// PUT - Protected
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authError = await checkAuth(request)
  if (authError) return authError

  try {
    const { id } = await params
    const body = await request.json()
    const index = projects.findIndex((p) => p.id === id)

    if (index === -1) {
      return NextResponse.json({ error: "پروژه یافت نشد" }, { status: 404 })
    }

    projects[index] = { ...projects[index], ...body }
    return NextResponse.json(projects[index])
  } catch (error) {
    console.error("Project update error:", error)
    return NextResponse.json({ error: "خطای سرور" }, { status: 500 })
  }
}

// DELETE - Protected
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authError = await checkAuth(request)
  if (authError) return authError

  const { id } = await params
  const index = projects.findIndex((p) => p.id === id)

  if (index === -1) {
    return NextResponse.json({ error: "پروژه یافت نشد" }, { status: 404 })
  }

  projects = projects.filter((p) => p.id !== id)
  return NextResponse.json({ success: true, message: "پروژه با موفقیت حذف شد" })
}

// Export for use in main route
export { projects }
