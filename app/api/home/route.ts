// app/api/home/route.ts

import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Home from "@/models/Home";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

// GET - همه می‌تونن ببینن (عمومی)
export async function GET() {
  try {
    await connectDB();

    const homeData = await Home.findOne().lean();

    if (!homeData) {
      return NextResponse.json(
        { error: "صفحه اصلی هنوز تنظیم نشده است." },
        { status: 404 }
      );
    }

    return NextResponse.json(homeData);
  } catch (error) {
    return NextResponse.json(
      { error: "خطایی رخ داد" },
      { status: 500 }
    );
  }
}

// POST - فقط یک بار: ساخت اولیه (مثل setup اولیه)
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    // اگر قبلاً ساخته شده بود، اجازه نده دوباره بسازه
    const exists = await Home.findOne();
    if (exists) {
      return NextResponse.json(
        { error: "صفحه اصلی قبلاً ساخته شده. برای تغییر از PUT استفاده کن." },
        { status: 400 }
      );
    }

    const body = await request.json();

    // حداقل فیلدهای لازم
    if (!body.heroTitle || !body.heroSubtitle || !body.heroDescription) {
      return NextResponse.json(
        { error: "heroTitle، heroSubtitle و heroDescription اجباری هستند." },
        { status: 400 }
      );
    }

    const newHome = await Home.create({
      id: "home",
      ...body,
      ctaButtons: body.ctaButtons || [],
      socialLinks: body.socialLinks || [],
      stats: body.stats || [],
    });

    return NextResponse.json(
      { message: "صفحه اصلی با موفقیت ساخته شد!", home: newHome },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "خطایی رخ داد" },
      { status: 500 }
    );
  }
}

// PUT - فقط ادمین: تغییر دادن محتوا
export async function PUT(request: NextRequest) {
  try {
    await connectDB();

    // چک کردن لاگین بودن ادمین
    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { error: "برای تغییر صفحه اصلی باید لاگین کنی." },
        { status: 401 }
      );
    }

    try {
      jwt.verify(token, JWT_SECRET);
    } catch {
      return NextResponse.json(
        { error: "توکن نامعتبر است." },
        { status: 401 }
      );
    }

    const body = await request.json();

    // اگر چیزی وجود نداشت، خطا بده
    const existing = await Home.findOne();
    if (!existing) {
      return NextResponse.json(
        { error: "صفحه اصلی هنوز ساخته نشده. اول با POST بساز." },
        { status: 404 }
      );
    }

    // آپدیت کن
    const updated = await Home.findOneAndUpdate({}, body, {
      new: true,
      runValidators: true,
    });

    return NextResponse.json({
      message: "صفحه اصلی با موفقیت تغییر کرد!",
      home: updated,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "خطایی رخ داد" },
      { status: 500 }
    );
  }
}