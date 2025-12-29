import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const existingCount = await User.countDocuments();
    if (existingCount > 0) {
      return NextResponse.json(
        { error: "ادمین قبلاً ساخته شده. نمی‌تونی دوباره از این روت استفاده کنی." },
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
        { error: "فیلدهای اجباری (name, username, password, email) رو پر کن" },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return NextResponse.json(
        { error: "ایمیل یا یوزرنیم قبلاً استفاده شده" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      username,
      password: hashedPassword,
      email,
      title,
      phone,
      location,
      bio,
      image,
      github,
      linkedin,
      twitter,
      instagram,
    });

    const { password: _, ...safeNewUser } = newUser.toObject();

    return NextResponse.json(
      {
        message: "ادمین با موفقیت ساخته شد 🎉",
        profile: safeNewUser,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("خطا در ساخت ادمین:", error);
    if (error.code === 11000) {
      return NextResponse.json({ error: "ایمیل یا یوزرنیم تکراریه" }, { status: 409 });
    }
    return NextResponse.json(
      { error: "خطایی در سرور رخ داد. دوباره امتحان کن." },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "احراز هویت لازم است" }, { status: 401 });
    }

    let payload: any;
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET!);
    } catch {
      return NextResponse.json({ error: "توکن نامعتبر یا منقضی شده" }, { status: 401 });
    }

    const user = await User.findById(payload.id).lean();
    if (!user) {
      return NextResponse.json({ error: "پروفایل پیدا نشد" }, { status: 404 });
    }

    const { password, ...safeUser } = user;

    return NextResponse.json({ profile: safeUser }, { status: 200 });
  } catch (error) {
    console.error("خطا در GET پروفایل:", error);
    return NextResponse.json({ error: "خطایی در سرور رخ داد" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB();

    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "احراز هویت لازم است" }, { status: 401 });
    }

    let payload: any;
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET!);
    } catch {
      return NextResponse.json({ error: "توکن نامعتبر یا منقضی شده" }, { status: 401 });
    }

    const body = await request.json();

    if (body.password) {
      body.password = await bcrypt.hash(body.password, 10);
    }

    Object.keys(body).forEach((key) => body[key] === undefined && delete body[key]);

    if (body.username || body.email) {
      const existing = await User.findOne({
        $or: [{ username: body.username }, { email: body.email }],
        _id: { $ne: payload.id },
      });

      if (existing) {
        return NextResponse.json(
          { error: "این یوزرنیم یا ایمیل قبلاً توسط شخص دیگری استفاده شده" },
          { status: 409 }
        );
      }
    }

    const updatedUser = await User.findByIdAndUpdate(payload.id, body, {
      new: true,
      runValidators: true,
      lean: true, // ← اضافه شد
    });

    if (!updatedUser) {
      return NextResponse.json({ error: "کاربر پیدا نشد" }, { status: 404 });
    }

    const { password, ...safeUser } = updatedUser;

    return NextResponse.json({ profile: safeUser }, { status: 200 });
  } catch (error) {
    console.error("خطا در آپدیت پروفایل:", error);
    return NextResponse.json({ error: "خطایی در سرور رخ داد" }, { status: 500 });
  }
}