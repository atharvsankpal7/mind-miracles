'use client';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import React from 'react';
import Image from 'next/image';
import weweare_logo from '../../public/whoweare.png';

export default function WhoWeAre() {
  const controls = useAnimation();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  React.useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={variants}
        className="pb-12 pt-12"
      >
        <motion.h1
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: 'easeInOut',
          }}
          className="mt-8 bg-gradient-to-br from-slate-300 to-green-500 bg-clip-text py-4 text-center font-medium tracking-tight text-slate-50 text-transparent"
        >
          <div className="justify-around md:flex" id="about">
            <div className="flex justify-center">
              <div className="flex flex-col">
                <div className="font-mono text-4xl text-green-900 md:pt-12 md:text-5xl">
                  WHO ARE WE ?
                </div>

                <div>
                  <div className="flex justify-center">
                    <Image
                      alt="mindmiracles"
                      src={weweare_logo}
                      height={700}
                      width={500}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 text-base/loose text-teal-800 md:w-[500px] md:pt-24 md:text-2xl">
              Mind Miracles is a dedicated center for psychological healing and
              Hypnotherapy, established in 2019, focused on enhancing mental
              health, especially for the youth. We specialize in psychological
              therapies, relaxation techniques, and counseling to address a wide
              range of mental, emotional, and behavioral needs with professional
              care and expertise.{' '}
            </div>
          </div>
        </motion.h1>
      </motion.div>
    </>
  );
}
