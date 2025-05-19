'use client';

import Script from 'next/script';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { courses } from '@/types';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { registrationFormStateAtom } from '@/store';
import { Spinner } from '../spinner';

export const PayAndRegisterButton = ({
  course_name,
  amount_to_pay,
  onBeforePayment,
}: {
  course_name: courses;
  amount_to_pay: number;
  onBeforePayment: () => boolean;
}) => {
  const form_values = useRecoilValue(registrationFormStateAtom);
  const reset_form_values = useResetRecoilState(registrationFormStateAtom);
  const [loading, SetLoading] = useState<boolean>(false);
  const router = useRouter();

  const amountToPay = amount_to_pay * 100;

  const createOrder = async () => {
    if (!onBeforePayment()) {
      return;
    }

    SetLoading(true);
    try {
      const res = await fetch('/api/createOrder', {
        method: 'POST',
        body: JSON.stringify({ amount: amountToPay }),
      });
      const data = await res.json();
      const paymentData = {
        key: process.env.key_id,
        order_id: data.id,

        handler: async function (response: any) {
          // verify payment
          const res = await fetch('/api/verify', {
            method: 'POST',
            body: JSON.stringify({
              orderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            }),
          });
          const data = await res.json();
          if (data.isOk) {
            toast.success('Registration successful');
            const response = await fetch(`/api/purchase`, {
              method: 'POST',
              body: JSON.stringify({
                form_values,
                course_name,
                amountToPay: amountToPay / 100,
              }),
            });
            const res = await response.json();
            if (res.id) {
              SetLoading(false);
              router.push(`/courses/${res.courseId}`);
              toast.success('Course access granted');
              reset_form_values();
            } else {
              SetLoading(false);
              toast.error(`Please Contact to Administrator`);
            }
          } else {
            alert('Payment failed');
          }
        },
      };

      const payment = new (window as any).Razorpay(paymentData);
      payment.open();
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Payment failed');
    }
    SetLoading(false);
  };

  return (
    <>
      <Script
        type="text/javascript"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      <Button
        onClick={createOrder}
        type="submit"
        className="w-full bg-green-700 hover:bg-[#3a5a40]"
      >
        {loading ? <Spinner /> : 'Pay And Register'}
      </Button>
    </>
  );
};