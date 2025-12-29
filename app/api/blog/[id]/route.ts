import { NextResponse, type NextRequest } from "next/server"
import { mockData } from "@/lib/data/mock-data"
import { checkAuth } from "@/lib/auth/middleware"

let blogPosts = [...mockData.blogPosts]

// GET - Public (single post by id or slug)
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  // Find by id or slug
  const post = blogPosts.find((p) => p.id === id || p.slug === id)

  if (!post) {
    return NextResponse.json({ error: "مقاله یافت نشد" }, { status: 404 })
  }

  // Check if post is published for public access
  const authHeader = request.headers.get("Authorization")
  if (!post.published && !authHeader) {
    return NextResponse.json({ error: "مقاله یافت نشد" }, { status: 404 })
  }

  return NextResponse.json(post)
}

// PUT - Protected
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authError = await checkAuth(request)
  if (authError) return authError

  try {
    const { id } = await params
    const body = await request.json()
    const index = blogPosts.findIndex((p) => p.id === id)

    if (index === -1) {
      return NextResponse.json({ error: "مقاله یافت نشد" }, { status: 404 })
    }

    blogPosts[index] = {
      ...blogPosts[index],
      ...body,
      updatedAt: new Date().toISOString(),
    }
    return NextResponse.json(blogPosts[index])
  } catch (error) {
    console.error("Blog post update error:", error)
    return NextResponse.json({ error: "خطای سرور" }, { status: 500 })
  }
}

// DELETE - Protected
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authError = await checkAuth(request)
  if (authError) return authError

  const { id } = await params
  const index = blogPosts.findIndex((p) => p.id === id)

  if (index === -1) {
    return NextResponse.json({ error: "مقاله یافت نشد" }, { status: 404 })
  }

  blogPosts = blogPosts.filter((p) => p.id !== id)
  return NextResponse.json({ success: true, message: "مقاله با موفقیت حذف شد" })
}
