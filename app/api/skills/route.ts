// app/api/skills/route.ts
import { NextResponse, type NextRequest } from "next/server";
import connectDB from "@/lib/mongodb";
import { SkillModel } from "@/models/Skill";
import { z } from "zod";
import jwt from "jsonwebtoken";


// Schema validation با Zod
const createSkillSchema = z.object({
  name: z.string().min(1, "نام مهارت الزامی است"),
  level: z.number().min(0).max(100, "سطح باید بین ۰ تا ۱۰۰ باشد"),
  icon: z.string().min(1, "آیکون الزامی است"),
  category: z.enum(["frontend", "backend", "tools"], {
    message: "دسته‌بندی باید frontend، backend یا tools باشد",
  }),
});

// GET - عمومی (همه می‌تونن ببینن)
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    const filter: any = {};
    if (category && ["frontend", "backend", "tools"].includes(category)) {
      filter.category = category;
    }

    const skills = await SkillModel.find(filter).sort({ level: -1 }).lean();

    return NextResponse.json(skills);
  } catch (error) {
    console.error("Error fetching skills:", error);
    return NextResponse.json(
      { error: "خطا در دریافت مهارت‌ها" },
      { status: 500 }
    );
  }
}

// POST - فقط ادمین (با توکن JWT)
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { error: "احراز هویت لازم است" },
        { status: 401 }
      );
    }

    let payload: any;
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET!);
    } catch (err) {
      return NextResponse.json(
        { error: "توکن نامعتبر یا منقضی شده" },
        { status: 401 }
      );
    }

    const body = await request.json();

    // Validation با Zod
    const validation = createSkillSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          error: "اطلاعات ورودی نامعتبر است",
          details: validation.error.format(),
        },
        { status: 400 }
      );
    }

    const newSkill = await SkillModel.create(validation.data);

    return NextResponse.json(newSkill, { status: 201 });
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json(
        { error: "مهارت با این نام قبلاً وجود دارد" },
        { status: 400 }
      );
    }
    console.error("Error creating skill:", error);
    return NextResponse.json({ error: "خطای سرور" }, { status: 500 });
  }
}

// PUT - ویرایش مهارت
export async function PUT(request: NextRequest) {
  // ... چک auth مشابه POST

  const { id, ...updateData } = await request.json();

  const validation = createSkillSchema.partial().safeParse(updateData);
  if (!validation.success) {
    return NextResponse.json({ error: "داده‌های نامعتبر" }, { status: 400 });
  }

  const updated = await SkillModel.findByIdAndUpdate(id, validation.data, {
    new: true,
  });

  if (!updated) {
    return NextResponse.json({ error: "مهارت یافت نشد" }, { status: 404 });
  }

  return NextResponse.json(updated);
}

// DELETE - حذف مهارت
export async function DELETE(request: NextRequest) {
  // ... چک auth

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "آیدی الزامی است" }, { status: 400 });
  }

  const deleted = await SkillModel.findByIdAndDelete(id);
  if (!deleted) {
    return NextResponse.json({ error: "مهارت یافت نشد" }, { status: 404 });
  }

  return NextResponse.json({ message: "مهارت با موفقیت حذف شد" });
}