import { NextResponse } from "next/server"
import { mockData } from "@/lib/data/mock-data"

export async function GET() {
  const stats = {
    projects: mockData.projects.length,
    skills: mockData.skills.length,
    experiences: mockData.experiences.filter((e) => e.type === "work").length,
    messages: mockData.messages.length,
    unreadMessages: mockData.messages.filter((m) => !m.read).length,
  }

  return NextResponse.json(stats)
}
