// razorpay.d.ts
interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description?: string;
  order_id: string;
  // Add other options as needed
}

interface RazorpayError {
  code: string;
  description: string;
  source: string;
  step: string;
  reason: string;
  metadata: {
    order_id: string;
    payment_id: string;
  };
}

interface RazorpayResponse {
  error: RazorpayError;
}

interface RazorpayInstance {
  on(event: string, handler: (response: RazorpayResponse) => void): void;
  open(): void;
}

interface Razorpay {
  new (options: RazorpayOptions): RazorpayInstance;
}

interface Window {
  Razorpay: Razorpay;
}
