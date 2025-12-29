import dbConnect from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await dbConnect();
    return NextResponse.json({ message: 'اتصال به MongoDB موفق بود!' });
  } catch (error) {
    return NextResponse.json({ error: 'اتصال شکست خورد: ' }, { status: 500 });
  }
}