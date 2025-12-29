// app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { MessageModel } from "@/models/Message";
import { checkAuth } from "@/lib/auth/middleware";

export async function GET(request: NextRequest) {
  await connectDB();

  

  const { searchParams } = new URL(request.url);
  const unreadOnly = searchParams.get("unread") === "true";

  try {
    const query = unreadOnly ? { read: false } : {};

    const messages = await MessageModel.find(query)
      .sort({ date: -1 })
      .lean();

    const formattedMessages = messages.map((msg: any) => ({
      id: msg._id.toString(),
      name: msg.name,
      email: msg.email,
      subject: msg.subject,
      message: msg.message,
      read: msg.read,
      date: msg.date,
      formattedDate: new Date(msg.date).toLocaleDateString("fa-IR"),
    }));

    return NextResponse.json({
      data: formattedMessages,
      total: formattedMessages.length,
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json({ error: "خطا در دریافت پیام‌ها" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  await connectDB();

  try {
    const body = await request.json();

    // اعتبارسنجی
    if (!body.name?.trim() || body.name.trim().length < 2) {
      return NextResponse.json({ error: "نام باید حداقل ۲ کاراکتر باشد" }, { status: 400 });
    }
    if (!body.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email.trim())) {
      return NextResponse.json({ error: "ایمیل معتبر نیست" }, { status: 400 });
    }
    if (!body.subject?.trim() || body.subject.trim().length < 3) {
      return NextResponse.json({ error: "موضوع باید حداقل ۳ کاراکتر باشد" }, { status: 400 });
    }
    if (!body.message?.trim() || body.message.trim().length < 10) {
      return NextResponse.json({ error: "پیام باید حداقل ۱۰ کاراکتر باشد" }, { status: 400 });
    }

    await MessageModel.create({
      name: body.name.trim(),
      email: body.email.trim().toLowerCase(),
      subject: body.subject.trim(),
      message: body.message.trim(),
    });

    return NextResponse.json(
      { success: true, message: "پیام شما با موفقیت ارسال شد" },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Message creation error:", error);
    return NextResponse.json({ error: "خطای سرور" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  await connectDB();


  try {
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ error: "آیدی پیام الزامی است" }, { status: 400 });
    }

    const updated = await MessageModel.findByIdAndUpdate(id, { read: true }, { new: true });

    if (!updated) {
      return NextResponse.json({ error: "پیام یافت نشد" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error marking message as read:", error);
    return NextResponse.json({ error: "خطای سرور" }, { status: 500 });
  }
}