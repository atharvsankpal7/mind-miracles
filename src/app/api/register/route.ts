import { NextRequest, NextResponse } from 'next/server';
import db from '@/db';
import { getMailonRegister } from '@/mail';

export async function POST(req: NextRequest) {
  const { firstName, lastName, mobileNo, email, age, place } = await req.json();

  try {
    const data = { firstName, lastName, mobileNo, email, age, place };
    getMailonRegister(data);

    const new_register = await db.register.create({
      data: {
        firstName,
        lastName,
        mobileNo: Number(mobileNo),
        email,
        age: Number(age),
        place,
      },
    });
    return NextResponse.json({
      success: true,
      id: new_register.id,
      message: 'register successfully',
    });
  } catch (e) {
    // console.log(e);
  }

  return NextResponse.json({
    message: false,
  });
}
