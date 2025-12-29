// app/api/contact/[id]/route.ts
import { NextResponse, type NextRequest } from "next/server";
import connectDB from "@/lib/mongodb";
import { MessageModel } from "@/models/Message";
import { checkAuth } from "@/lib/auth/middleware";

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();



  const { id } = params;

  try {
    const deleted = await MessageModel.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: "پیام یافت نشد" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "پیام با موفقیت حذف شد" });
  } catch (error) {
    console.error("Delete message error:", error);
    return NextResponse.json({ error: "خطای سرور" }, { status: 500 });
  }
}