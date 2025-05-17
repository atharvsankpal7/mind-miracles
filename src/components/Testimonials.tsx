'use client';

import { InfiniteMovingCards } from './ui/infinite-moving-cards';

const testimonials = [
  {
    quote: "Mind Miracles transformed my life. The personalized approach and expert guidance helped me overcome my anxiety and build confidence.",
    name: "Sarah M.",
    title: "Student"
  },
  {
    quote: "The 7-day program was a game-changer. I learned valuable techniques for stress management that I use every day.",
    name: "Rahul P.",
    title: "Professional"
  },
  {
    quote: "The counseling sessions provided me with the tools and support I needed during a difficult time. Highly recommended!",
    name: "Priya K.",
    title: "Teacher"
  },
  {
    quote: "A truly holistic approach to mental wellness. The team's expertise and compassion make all the difference.",
    name: "Amit S.",
    title: "Business Owner"
  },
  {
    quote: "The youth programs are excellent. They address real challenges and provide practical solutions.",
    name: "Neha R.",
    title: "College Student"
  }
];

export function Testimonials() {
  return (
    <div className="py-12 md:py-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          What Our Clients Say
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Real stories from people we've helped
        </p>
      </div>
      <div className="relative">
        <InfiniteMovingCards
          items={testimonials}
          direction="left"
          speed="slow"
        />
      </div>
    </div>
  );
}