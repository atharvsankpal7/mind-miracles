import Register from "@/components/Register";
import { Programs } from "@/components/Programs";
import Script from "next/script";
import Payment from "@/components/Payment";
import Hero from "@/components/Hero";
import WhoWeAre from "@/components/WhoAreWe";
import { ServicesCards } from "@/components/ServicesCards";

export default function Home() {
  return (
    <main className="p-8 bg-slate-50">
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />

      <Hero />
      <WhoWeAre />
      {/* <div className="flex justify-between">
        <div>
          <Payment/>
        </div>
        <Register />
      </div> */}
      {/* <Programs /> */}
      <div>
        <ServicesCards />
      </div>
      <Register />
    </main>
  );
}
