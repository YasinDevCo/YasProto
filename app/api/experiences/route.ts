import { NextResponse, type NextRequest } from "next/server"
import { mockData, type Experience } from "@/lib/data/mock-data"
import { checkAuth } from "@/lib/auth/middleware"
import { validateRequired } from "@/lib/utils/validation"

const experiences = [...mockData.experiences]

// GET - Public
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get("type")

  let filteredExperiences = experiences
  if (type) {
    filteredExperiences = experiences.filter((e) => e.type === type)
  }

  return NextResponse.json(filteredExperiences)
}

// POST - Protected
export async function POST(request: NextRequest) {
  const authError = await checkAuth(request)
  if (authError) return authError

  try {
    const body = await request.json()

    const validation = validateRequired(body, ["title", "company", "period", "type"])
    if (!validation.valid) {
      return NextResponse.json({ error: "اطلاعات نامعتبر", details: validation.errors }, { status: 400 })
    }

    const newExperience: Experience = {
      ...body,
      id: Date.now().toString(),
      achievements: body.achievements || [],
    }
    experiences.push(newExperience)
    return NextResponse.json(newExperience, { status: 201 })
  } catch (error) {
    console.error("Experience creation error:", error)
    return NextResponse.json({ error: "خطای سرور" }, { status: 500 })
  }
}

export { experiences }
