'use client';

import * as React from 'react';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export function ServicesCards() {
  return (
    <>
      <main className="hidden md:flex md:flex-col md:p-8">
        <p className="p-3 text-6xl text-green-900">Service</p>
        <Carousel className="w-full max-w-xs md:max-w-[90vw]">
          <CarouselContent className="w-full">
            {Array.from({ length: 2 }).map((_, index) => (
              <div key={index}>
                <CarouselItem key={index}>
                  <div className="p-1">
                    <div className="flex md:h-96 md:space-x-6 md:pl-4">
                      <Card className="md:w-[400px]">
                        <CardHeader>Meditation and yoga</CardHeader>
                        <CardContent className="flex aspect-square items-center justify-center p-6">
                          <span className="text-4xl font-semibold">
                            karto he pn
                          </span>
                        </CardContent>
                      </Card>
                      <Card className="md:w-[400px]">
                        <CardHeader>Training Programs</CardHeader>
                        <CardContent className="flex aspect-square items-center justify-center p-6">
                          <span className="text-4xl font-semibold">
                            {index + 1}
                          </span>
                        </CardContent>
                      </Card>
                      <Card className="md:w-[400px]">
                        <CardContent className="flex aspect-square items-center justify-center p-6">
                          <span className="text-4xl font-semibold">
                            {index + 1}
                          </span>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CarouselItem>
              </div>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </main>

      <main className="w-[80vw] pb-8 md:hidden">
        <p className="p-3 text-6xl text-green-900">Service</p>
        <Carousel className="md:hidden">
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <span className="text-4xl font-semibold">
                        {index + 1}
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </main>
    </>
  );
}
