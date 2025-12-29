import { NextRequest, NextResponse } from "next/server";

import User from "@/models/User";
import connectDB from "@/lib/mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ error: "Username و password الزامی هستند" }, { status: 400 });
    }

    // پیدا کردن ادمین
    const admin = await User.findOne({ username });
    if (!admin) {
      return NextResponse.json({ error: "کاربر یافت نشد" }, { status: 401 });
    }

    // بررسی پسورد
    const isValid = await bcrypt.compare(password, admin.password);
    if (!isValid) {
      return NextResponse.json({ error: "پسورد اشتباه است" }, { status: 401 });
    }

    // ساخت JWT
    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    // ارسال cookie
    return NextResponse.json(
      { message: "ورود موفق بود" },
      {
        status: 200,
        headers: {
          "Set-Cookie": `token=${token}; HttpOnly; Path=/; Secure; SameSite=Strict; Max-Age=86400`,
        },
      }
    );
  } catch (error: any) {
    console.error("خطا در لاگین:", error);
    return NextResponse.json({ error: "خطایی رخ داد: " + error.message }, { status: 500 });
  }
}
