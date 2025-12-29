import { NextResponse, type NextRequest } from "next/server"
import { mockData, type BlogPost } from "@/lib/data/mock-data"
import { checkAuth } from "@/lib/auth/middleware"
import { validateRequired, paginate, getPaginationParams } from "@/lib/utils/validation"

const blogPosts = [...mockData.blogPosts]

// GET - Public with pagination
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const { page, limit } = getPaginationParams(searchParams)
  const category = searchParams.get("category")
  const tag = searchParams.get("tag")
  const published = searchParams.get("published")

  let filteredPosts = [...blogPosts]

  // Only show published posts for public (unless admin requesting all)
  const authHeader = request.headers.get("Authorization")
  const token = authHeader?.replace("Bearer ", "") || request.cookies.get("admin_token")?.value
  const isAdmin = !!token

  if (!isAdmin || published === "true") {
    filteredPosts = filteredPosts.filter((p) => p.published)
  } else if (published === "false") {
    filteredPosts = filteredPosts.filter((p) => !p.published)
  }

  // Filter by category
  if (category) {
    filteredPosts = filteredPosts.filter((p) => p.category === category)
  }

  // Filter by tag
  if (tag) {
    filteredPosts = filteredPosts.filter((p) => p.tags.includes(tag))
  }

  // Sort by date (newest first)
  filteredPosts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  const result = paginate(filteredPosts, page, limit)
  return NextResponse.json(result)
}

// POST - Protected
export async function POST(request: NextRequest) {
  const authError = await checkAuth(request)
  if (authError) return authError

  try {
    const body = await request.json()

    const validation = validateRequired(body, ["title", "content", "excerpt"])
    if (!validation.valid) {
      return NextResponse.json({ error: "اطلاعات نامعتبر", details: validation.errors }, { status: 400 })
    }

    // Generate slug from title
    const slug =
      body.slug ||
      body.title
        .toLowerCase()
        .replace(/[^\w\s\u0600-\u06FF-]/g, "")
        .replace(/\s+/g, "-")
        .substring(0, 50)

    const now = new Date().toISOString()
    const newPost: BlogPost = {
      ...body,
      id: Date.now().toString(),
      slug,
      tags: body.tags || [],
      category: body.category || "عمومی",
      author: body.author || "علی محمدی",
      published: body.published ?? false,
      createdAt: now,
      updatedAt: now,
    }

    blogPosts.push(newPost)
    return NextResponse.json(newPost, { status: 201 })
  } catch (error) {
    console.error("Blog post creation error:", error)
    return NextResponse.json({ error: "خطای سرور" }, { status: 500 })
  }
}

export { blogPosts }
