import { NextRequest, NextResponse } from 'next/server';
import { getTestResultMail } from '@/mail';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    await getTestResultMail(data);

    return NextResponse.json({
      success: true,
      message: 'Test results sent successfully',
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Failed to send test results',
    });
  }
}
