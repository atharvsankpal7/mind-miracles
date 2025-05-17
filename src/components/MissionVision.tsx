import React from 'react';
import Image from 'next/image';
import m1 from '../../public/mission1.jpg';
import m2 from '../../public/mission2.jpg';
const MissionVision = () => {
  return (
    <div className="p-4 md:p-8">
      <div className="mb-8 pl-4 text-4xl font-bold text-teal-900 md:text-6xl">
        <span className="block pl-12 md:inline-block md:pl-0"> VISION</span>
      </div>

      <div className="flex flex-col space-y-8">
        {/* Mission Section */}
        <div className="pt-4 md:pl-[20vw]">
          {/* <div className="md:flex items-center bg-teal-100 md:p-8 pb-3 rounded-lg shadow-lg md:w-[70vw] justify-end">
          <div className="md:w-1/4 flex justify-center pt-2">
          <Image
          src={m1}
          height={200}
          width={200}
          alt=''
          className='rounded-full p-2 object-none'
          />
          </div>
          <div className="md:w-3/4 p-6 md:pl-8">
            <h2 className="text-2xl font-bold text-teal-900 pl-10 md:pl-0">Our Mission</h2>
            <p className="text-teal-800 mt-4 text-center">
              Our mission is to inspire individuals to prioritize their mental health and well-being through accessible and transformative hypnotherapy services. We are dedicated to helping people embrace life to the fullest, making every moment count before they die.
            </p>
          </div>
        </div> */}
        </div>
        {/* Vision Section */}
        <div className="md:pr-[20vw]">
          <div className="transform items-center justify-end rounded-lg bg-teal-100 pb-3 shadow-xl md:flex md:w-[70vw] md:p-8">
            <div className="p-6 md:w-3/4 md:pl-8">
              <h2 className="pl-10 text-3xl font-bold text-teal-900 md:pl-0">
                Our Vision
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-teal-800">
                We aim to help the youth improve their mental, emotional, and
                psychological health, building a strong and confident generation
                ready to handle life's challenges.
              </p>
            </div>
            <div className="flex justify-center md:w-1/4">
              <Image
                src={m2}
                height={500}
                width={500}
                alt="Vision illustration"
                className="rounded-full object-cover p-2 shadow-md transition duration-300 hover:scale-110"
              />
            </div>
          </div>
        </div>{' '}
      </div>
    </div>
  );
};

export default MissionVision;
