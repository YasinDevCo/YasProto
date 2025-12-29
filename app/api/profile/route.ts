// app/api/profile/route.ts
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// تابع مشترک برای احراز هویت (بهتر از تکرار کد)
async function authenticate(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return { error: NextResponse.json({ error: "احراز هویت لازم است" }, { status: 401 }) };
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    const user = await User.findById(payload.id);
    if (!user) {
      return { error: NextResponse.json({ error: "کاربر یافت نشد" }, { status: 401 }) };
    }
    return { user, payload };
  } catch (error) {
    return { error: NextResponse.json({ error: "توکن نامعتبر یا منقضی شده" }, { status: 401 }) };
  }
}

// POST - فقط یک بار: ساخت ادمین اولیه
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const existingCount = await User.countDocuments();
    if (existingCount > 0) {
      return NextResponse.json(
        { error: "ادمین قبلاً ساخته شده. این روت فقط برای اولین بار قابل استفاده است." },
        { status: 403 }
      );
    }

    const body = await request.json();
    const {
      name,
      username,
      password,
      email,
      title = "",
      phone = "",
      location = "",
      bio = "",
      image = "",
      github = "",
      linkedin = "",
      twitter = "",
      instagram = "",
    } = body;

    if (!name || !username || !password || !email) {
      return NextResponse.json(
        { error: "نام، یوزرنیم، پسورد و ایمیل الزامی هستند" },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "ایمیل یا نام کاربری قبلاً استفاده شده" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12); // 12 بهتر از 10 هست

    const newUser = await User.create({
      name,
      username,
      password: hashedPassword,
      email: email.toLowerCase(),
      title,
      phone,
      location,
      bio,
      image,
      github,
      linkedin,
      twitter,
      instagram,
      role: "admin", // صراحتاً اضافه کن
    });

    const { password: _, ...safeUser } = newUser.toObject();

    return NextResponse.json(
      {
        message: "ادمین با موفقیت ساخته شد 🎉",
        profile: safeUser,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("خطا در ساخت ادمین:", error);
    if (error.code === 11000) {
      return NextResponse.json({ error: "ایمیل یا نام کاربری تکراری است" }, { status: 409 });
    }
    return NextResponse.json({ error: "خطای سرور" }, { status: 500 });
  }
}

// GET - گرفتن پروفایل ادمین
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const auth = await authenticate(request);
    if (auth.error) return auth.error;

    const { user } = auth;
    const { password, ...safeUser } = user.toObject();

    return NextResponse.json({ profile: safeUser });
  } catch (error) {
    console.error("خطا در دریافت پروفایل:", error);
    return NextResponse.json({ error: "خطای سرور" }, { status: 500 });
  }
}

// PUT - ویرایش پروفایل ادمین
export async function PUT(request: NextRequest) {
  try {
    await connectDB();

    const auth = await authenticate(request);
    if (auth.error) return auth.error;

    const { user, payload } = auth;
    const body = await request.json();

    // اگر پسورد جدید بود، هش کن
    if (body.password) {
      body.password = await bcrypt.hash(body.password, 12);
    }

    // حذف فیلدهای undefined
    Object.keys(body).forEach((key) => body[key] === undefined && delete body[key]);

    // چک تکراری بودن یوزرنیم یا ایمیل (جز برای خودش)
    if (body.username || body.email) {
      const existing = await User.findOne({
        $or: [
          body.username ? { username: body.username } : null,
          body.email ? { email: body.email.toLowerCase() } : null,
        ].filter(Boolean),
        _id: { $ne: payload.id },
      });

      if (existing) {
        return NextResponse.json(
          { error: "این نام کاربری یا ایمیل قبلاً استفاده شده" },
          { status: 409 }
        );
      }
    }

    const updatedUser = await User.findByIdAndUpdate(payload.id, body, {
      new: true,
      runValidators: true,
    }).lean();

    if (!updatedUser) {
      return NextResponse.json({ error: "کاربر یافت نشد" }, { status: 404 });
    }

    const { password, ...safeUser } = updatedUser;

    return NextResponse.json({ profile: safeUser });
  } catch (error) {
    console.error("خطا در آپدیت پروفایل:", error);
    return NextResponse.json({ error: "خطای سرور" }, { status: 500 });
  }
}