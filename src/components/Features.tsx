'use client';

import { motion } from 'framer-motion';
import { BrainCircuit, Heart, Sparkles, Target } from 'lucide-react';

const features = [
  {
    name: 'Expert Guidance',
    description: 'Professional support from experienced psychologists and therapists',
    icon: BrainCircuit,
  },
  {
    name: 'Personalized Care',
    description: 'Tailored approaches to meet your unique mental health needs',
    icon: Heart,
  },
  {
    name: 'Holistic Healing',
    description: 'Comprehensive programs addressing mind, body, and spirit',
    icon: Sparkles,
  },
  {
    name: 'Goal-Oriented',
    description: 'Focused strategies to help you achieve your personal objectives',
    icon: Target,
  },
];

export function Features() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-green-600">
            Our Approach
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need for mental wellness
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
            {features.map((feature) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="flex flex-col"
              >
                <dt className="text-center">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-lg bg-green-600 mx-auto">
                    <feature.icon className="h-8 w-8 text-white" aria-hidden="true" />
                  </div>
                  <span className="text-lg font-semibold leading-7 text-gray-900">
                    {feature.name}
                  </span>
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto text-center">{feature.description}</p>
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}