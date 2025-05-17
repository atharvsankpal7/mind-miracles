'use client';
import Image from 'next/image';
import logo from '../../public/mind_miracles_logo.png';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
  return (
    <div className="relative isolate pt-14 bg-gradient-to-b from-white to-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto"
        >
          <h1 className="max-w-lg text-4xl font-bold tracking-tight bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent sm:text-6xl">
          We Are Helping Hands You Have Been Searching For
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Expert psychological healing and hypnotherapy services to help you achieve mental wellness and personal growth.
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <Link
              href="/cources"
              className="rounded-md bg-green-600 px-5 py-3 text-sm font-semibold text-white shadow-lg hover:bg-green-500 hover:scale-105 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              Explore Our Programs
            </Link>
            <Link href="/test" className="text-sm font-semibold leading-6 text-gray-900 hover:text-green-600 transition-colors duration-300">
              Take Mental Health Test <span aria-hidden="true" className="ml-1">→</span>
            </Link>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mt-16 sm:mt-24 lg:mt-0 lg:flex-shrink-0 lg:flex-grow"
        >
          <Image
            src={logo}
            alt="Mind Miracles Logo"
            className="mx-auto max-w-full drop-shadow-2xl hover:scale-105 transition-transform duration-300"
            priority
          />
        </motion.div>
      </div>
    </div>
  );
}