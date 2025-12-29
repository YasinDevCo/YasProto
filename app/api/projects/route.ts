// app/api/projects/route.ts
import { NextResponse, type NextRequest } from "next/server";
import connectDB from "@/lib/mongodb";
import { ProjectModel } from "@/models/Project";
import { z } from "zod";
import jwt from "jsonwebtoken";

// Schema validation با Zod
const createProjectSchema = z.object({
  title: z.string().min(1, "عنوان پروژه الزامی است"),
  description: z.string().min(1, "توضیحات پروژه الزامی است"),
  image: z.string().min(1, "تصویر پروژه الزامی است"),
  technologies: z.array(z.string()).min(1, "حداقل یک تکنولوژی انتخاب کنید"),
  demoUrl: z.string().optional(),
  githubUrl: z.string().optional(),
  category: z.enum(["فروشگاه", "داشبورد", "اپلیکیشن", "وبلاگ", "لندینگ", "سایر"], {
    message: "دسته‌بندی معتبر نیست",
  }),
  featured: z.boolean().optional(),
});

const updateProjectSchema = createProjectSchema.partial();

// تابع مشترک برای چک کردن احراز هویت ادمین
async function verifyAdmin(token?: string) {
  if (!token) {
    return { error: "احراز هویت لازم است", status: 401 };
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET!);
    return { valid: true };
  } catch (err) {
    return { error: "توکن نامعتبر یا منقضی شده", status: 401 };
  }
}

// GET - عمومی (همه می‌تونن ببینن)
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");

    const filter: any = {};
    if (category && ["فروشگاه", "داشبورد", "اپلیکیشن", "وبلاگ", "لندینگ", "سایر"].includes(category)) {
      filter.category = category;
    }
    if (featured === "true") {
      filter.featured = true;
    }

    const projects = await ProjectModel.find(filter)
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "خطا در دریافت پروژه‌ها" },
      { status: 500 }
    );
  }
}

// POST - فقط ادمین
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const token = request.cookies.get("token")?.value;
    const auth = await verifyAdmin(token);
    if ("error" in auth) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const body = await request.json();

    const validation = createProjectSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          error: "اطلاعات ورودی نامعتبر است",
          details: validation.error.format(),
        },
        { status: 400 }
      );
    }

    const newProject = await ProjectModel.create(validation.data);

    return NextResponse.json(newProject, { status: 201 });
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json(
        { error: "پروژه با این عنوان قبلاً وجود دارد" },
        { status: 400 }
      );
    }
    console.error("Error creating project:", error);
    return NextResponse.json({ error: "خطای سرور" }, { status: 500 });
  }
}

// PUT - ویرایش پروژه (فقط ادمین)
export async function PUT(request: NextRequest) {
  try {
    await connectDB();

    const token = request.cookies.get("token")?.value;
    const auth = await verifyAdmin(token);
    if ("error" in auth) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json({ error: "آیدی پروژه الزامی است" }, { status: 400 });
    }

    const validation = updateProjectSchema.safeParse(updateData);
    if (!validation.success) {
      return NextResponse.json(
        { error: "داده‌های ورودی نامعتبر است", details: validation.error.format() },
        { status: 400 }
      );
    }

    const updated = await ProjectModel.findByIdAndUpdate(id, validation.data, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return NextResponse.json({ error: "پروژه یافت نشد" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json({ error: "خطای سرور" }, { status: 500 });
  }
}

// DELETE - حذف پروژه (فقط ادمین)
export async function DELETE(request: NextRequest) {
  try {
    await connectDB();

    const token = request.cookies.get("token")?.value;
    const auth = await verifyAdmin(token);
    if ("error" in auth) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "آیدی پروژه الزامی است" }, { status: 400 });
    }

    const deleted = await ProjectModel.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: "پروژه یافت نشد" }, { status: 404 });
    }

    return NextResponse.json({ message: "پروژه با موفقیت حذف شد" });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json({ error: "خطای سرور" }, { status: 500 });
  }
}