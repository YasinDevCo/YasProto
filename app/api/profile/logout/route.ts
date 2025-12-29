import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { message: "با موفقیت خارج شدید" },
    {
      status: 200,
      headers: {
        "Set-Cookie": `token=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict; Secure`,
      },
    }
  );
}
