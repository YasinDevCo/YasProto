import { NextResponse, type NextRequest } from "next/server"
import { mockData, type Service } from "@/lib/data/mock-data"
import { checkAuth } from "@/lib/auth/middleware"
import { validateRequired } from "@/lib/utils/validation"

const services = [...mockData.services]

// GET - Public
export async function GET() {
  return NextResponse.json(services)
}

// POST - Protected
export async function POST(request: NextRequest) {
  const authError = await checkAuth(request)
  if (authError) return authError

  try {
    const body = await request.json()

    const validation = validateRequired(body, ["title", "description"])
    if (!validation.valid) {
      return NextResponse.json({ error: "اطلاعات نامعتبر", details: validation.errors }, { status: 400 })
    }

    const newService: Service = {
      ...body,
      id: Date.now().toString(),
      features: body.features || [],
    }
    services.push(newService)
    return NextResponse.json(newService, { status: 201 })
  } catch (error) {
    console.error("Service creation error:", error)
    return NextResponse.json({ error: "خطای سرور" }, { status: 500 })
  }
}

export { services }
