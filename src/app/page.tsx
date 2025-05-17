// "use client"
import Register from '@/components/Register';
import Script from 'next/script';
import Hero from '@/components/Hero';
import WhoWeAre from '@/components/WhoAreWe';
import MissionVision from '@/components/MissionVision';
import Founder from '@/components/Founder';
import { Footer } from '@/components/Footer';
import { Features } from '@/components/Features';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Hero />
        <hr className='border-t-2 border-gray-300' />
        <Features />
        <hr className='border-t-2 border-gray-300' />
        <WhoWeAre />
        <hr className='border-t-2 border-gray-300 mb-32' />
        <MissionVision />
        <hr className='border-t-2 border-gray-300 my-52' />
        
        <Founder />
      </div>
      <Register />
      <Footer />
    </main>
  );
}