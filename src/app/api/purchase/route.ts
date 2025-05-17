import db from '@/db';
import { courses } from '@/types';
import { NextRequest, NextResponse } from 'next/server';
import { FormState } from '@/store';
import { sendCounsellingConfirmation } from '@/mail';

export async function POST(request: NextRequest) {
  const { form_values, course_name, amount_to_pay } =
    (await request.json()) as {
      form_values: FormState;
      course_name: courses;
      amount_to_pay: number;
    };

  const { name, age, whatsapp, email } = form_values;
  try {
    switch (course_name) {
      case courses['seven-day-program']:
        const newPurchase = await db.sevenDaysProgramUser.create({
          data: {
            name,
            email,
            whatsapp: +whatsapp,
            age: +age,
            amountPaid: 1499,
          },
        });
        return NextResponse.json({
          message: `Registration successful`,
          id: newPurchase.id,
        });

      case courses['personal-couselling']:
        const new_purchase = await db.personalCounsellingUser.create({
          data: {
            name,
            email,
            whatsapp: +whatsapp,
            age: +age,
            amountPaid: amount_to_pay,
          },
        });

        // Send confirmation emails
        await sendCounsellingConfirmation({
          name,
          email,
          whatsapp,
          age,
          amountPaid: amount_to_pay
        });

        return NextResponse.json({
          message: `Registration successful`,
          id: new_purchase.id,
        });
    }
  } catch (error) {
    return NextResponse.json({
      message: 'Registration failed',
    });
  }
}