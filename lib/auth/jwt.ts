import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"

// Secret key for JWT signing - in production, use environment variable
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "your-super-secret-key-change-in-production")

// Admin credentials - in production, store in database with hashed password
const ADMIN_CREDENTIALS = {
  username: process.env.ADMIN_USERNAME || "admin",
  password: process.env.ADMIN_PASSWORD || "admin123",
}

export interface JWTPayload {
  username: string
  role: "admin"
  exp?: number
}

// Create JWT token
export async function createToken(payload: Omit<JWTPayload, "exp">): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(JWT_SECRET)
}

// Verify JWT token
export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload as JWTPayload
  } catch {
    return null
  }
}

// Validate admin credentials
export function validateCredentials(username: string, password: string): boolean {
  return username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password
}

// Get token from cookies
export async function getTokenFromCookies(): Promise<string | null> {
  const cookieStore = await cookies()
  return cookieStore.get("admin_token")?.value || null
}

// Check if user is authenticated
export async function isAuthenticated(): Promise<boolean> {
  const token = await getTokenFromCookies()
  if (!token) return false
  const payload = await verifyToken(token)
  return payload !== null
}

// Get current user from token
export async function getCurrentUser(): Promise<JWTPayload | null> {
  const token = await getTokenFromCookies()
  if (!token) return null
  return await verifyToken(token)
}
