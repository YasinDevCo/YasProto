import { NextResponse, type NextRequest } from "next/server"
import { mockData } from "@/lib/data/mock-data"
import { checkAuth } from "@/lib/auth/middleware"

let services = [...mockData.services]

// GET - Public
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const service = services.find((s) => s.id === id)
  if (!service) {
    return NextResponse.json({ error: "خدمت یافت نشد" }, { status: 404 })
  }
  return NextResponse.json(service)
}

// PUT - Protected
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authError = await checkAuth(request)
  if (authError) return authError

  try {
    const { id } = await params
    const body = await request.json()
    const index = services.findIndex((s) => s.id === id)

    if (index === -1) {
      return NextResponse.json({ error: "خدمت یافت نشد" }, { status: 404 })
    }

    services[index] = { ...services[index], ...body }
    return NextResponse.json(services[index])
  } catch (error) {
    console.error("Service update error:", error)
    return NextResponse.json({ error: "خطای سرور" }, { status: 500 })
  }
}

// DELETE - Protected
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authError = await checkAuth(request)
  if (authError) return authError

  const { id } = await params
  const index = services.findIndex((s) => s.id === id)

  if (index === -1) {
    return NextResponse.json({ error: "خدمت یافت نشد" }, { status: 404 })
  }

  services = services.filter((s) => s.id !== id)
  return NextResponse.json({ success: true, message: "خدمت با موفقیت حذف شد" })
}
