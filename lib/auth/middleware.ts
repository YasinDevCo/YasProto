import { type NextRequest, NextResponse } from "next/server"
import { verifyToken } from "./jwt"

// Middleware to protect API routes
export async function withAuth(
  request: NextRequest,
  handler: (request: NextRequest) => Promise<NextResponse>,
): Promise<NextResponse> {
  // Get token from Authorization header or cookies
  const authHeader = request.headers.get("Authorization")
  const token = authHeader?.replace("Bearer ", "") || request.cookies.get("admin_token")?.value

  if (!token) {
    return NextResponse.json({ error: "عدم احراز هویت - لطفاً وارد شوید", code: "UNAUTHORIZED" }, { status: 401 })
  }

  const payload = await verifyToken(token)
  if (!payload) {
    return NextResponse.json(
      { error: "توکن نامعتبر یا منقضی شده - لطفاً دوباره وارد شوید", code: "INVALID_TOKEN" },
      { status: 401 },
    )
  }

  // Token is valid, proceed with the handler
  return handler(request)
}

// Helper to check auth and return error response if not authenticated
export async function checkAuth(request: NextRequest): Promise<NextResponse | null> {
  const authHeader = request.headers.get("Authorization")
  const token = authHeader?.replace("Bearer ", "") || request.cookies.get("admin_token")?.value

  if (!token) {
    return NextResponse.json({ error: "عدم احراز هویت - لطفاً وارد شوید", code: "UNAUTHORIZED" }, { status: 401 })
  }

  const payload = await verifyToken(token)
  if (!payload) {
    return NextResponse.json(
      { error: "توکن نامعتبر یا منقضی شده - لطفاً دوباره وارد شوید", code: "INVALID_TOKEN" },
      { status: 401 },
    )
  }

  return null // Authentication successful
}
