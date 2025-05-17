'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const courses = [
  {
    title: '7 Days Life Changing Program',
    description:
      'Transform your life with our comprehensive program designed to help you achieve your full potential',
    features: [
      'Develop powerful mindset strategies',
      'Create lasting positive habits',
      'Master emotional intelligence',
      'Build effective communication skills',
      'Learn stress management techniques',
    ],
    link: '/cources/7-days-program',
  },
  {
    title: 'Personal Counselling',
    description:
      'One-on-one guidance to help you overcome challenges and achieve personal growth',
    features: [
      'Personalized attention and support',
      'Confidential environment',
      'Flexible scheduling',
      'Expert guidance',
      'Tailored strategies for growth',
    ],
    link: '/cources/personal-counselling',
  },
];

export default function CoursesList() {
  return (
    <div className="min-h-screen bg-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">Our Courses</h1>
          <p className="text-xl text-gray-600">
            Choose the right program for your journey
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {courses.map((course, index) => (
            <Card key={index} className="overflow-hidden border-0 shadow-lg">
              <div className="flex h-48 items-center justify-center bg-green-700 p-6">
                <h2 className="text-center text-3xl font-bold text-white">
                  {course.title}
                </h2>
              </div>

              <CardHeader>
                <CardDescription className="text-lg text-gray-600">
                  {course.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    What you&apos;ll learn:
                  </h3>
                  <ul className="space-y-2">
                    {course.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <svg
                          className="mr-2 h-6 w-6 text-[#407A45]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href={course.link}>
                    <Button className="mt-6 w-full bg-green-700 text-white hover:bg-[#2f5a32]">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
