'use client';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import f1 from '../../public/footer-image-0.png';
import f2 from '../../public/footer-image-1.png';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaLinkedinIn } from 'react-icons/fa';
import { IoLogoFacebook } from 'react-icons/io';
import { FaInstagram } from 'react-icons/fa';
import { FaYoutube } from 'react-icons/fa';
import { FaWhatsapp } from 'react-icons/fa';

export default function Register() {
  const { register, handleSubmit } = useForm();
  const [loading, SetLoading] = useState<boolean>(false);
  async function submitForm(data: any) {
    SetLoading(true);
    try {
      const r = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify(data),
      });

      const response = await r.json();
      SetLoading(false);
      toast.success(response.message, {
        description: 'thanks for connecting',
      });
    } catch (e) {
      SetLoading(false);
      toast.warning('try again');
    }
    return;
  }
  return (
    <>
      <div
        id="contact"
        className="mt-12 flex-none rounded-sm bg-[#B6ECD5] p-3 pt-12 md:mt-24 md:flex md:justify-around md:pt-16"
      >
        <div>
          <div className="pb-6">
            <h2 className="text-4xl font-bold md:text-6xl">CONTACT US</h2>
            <div className="pt-8">
              <span className="text-lg font-bold">Contact No: &nbsp;</span>{' '}
              <span className="font-medium">+91-779-808-2219</span>
            </div>
            <div className="pt-8">
              <span className="text-lg font-bold">Email id: &nbsp;</span>{' '}
              <span className="font-medium">mindmiracles1707@gmail.com</span>
            </div>
          </div>
          <div className="flex space-x-4 pb-12 text-3xl">
            <a
              href="https://www.linkedin.com/in/ms-sonali-khade-79b674331?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
              target="_blank"
            >
              <FaLinkedinIn />
            </a>

            <a
              href="https://www.facebook.com/share/1DZRPYsPws/?mibextid=LQQJ4d"
              target="_blank"
            >
              <IoLogoFacebook />
            </a>

            <a href="https://www.instagram.com/mind_miracles_/profilecard/?igsh=bXNxMjRrcnF2ZnMw">
              <FaInstagram />
            </a>

            <a href="https://youtube.com/@ms.sonaleepsychologist?si=S3x_G2-Z0zvzcx9n">
              <FaYoutube />
            </a>
            <a
              href="https://api.whatsapp.com/send/?phone=917798082219&text&type=phone_number&app_absent=0"
              target="_blank"
            >
              <FaWhatsapp />
            </a>
          </div>

          <FooterAnimationImages />
        </div>

        <div className="ml-3 pr-4">
          <form
            className="p-0 md:w-[600px]"
            onSubmit={handleSubmit(submitForm)}
          >
            <button
              type="button"
              className="relative flex w-full transform items-center justify-center rounded-md bg-green-700 px-5 py-2.5 font-medium capitalize tracking-wide text-white transition duration-300 ease-in-out hover:bg-green-700 focus:outline-none active:scale-95"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                enableBackground="new 0 0 24 24"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="#FFFFFF"
              >
                <g>
                  <rect fill="none" height="24" width="24"></rect>
                </g>
                <g>
                  <g>
                    <path d="M19,13h-6v6h-2v-6H5v-2h6V5h2v6h6V13z"></path>
                  </g>
                </g>
              </svg>
              <span className="mx-1 pl-2">Contact Us</span>
            </button>
            <div className="mt-5 rounded-lg bg-white shadow">
              <div className="px-5 pb-5">
                <div className="pb-4 pt-2">
                  <div className="w-full">
                    <p>First Name</p>
                    <input
                      {...register('firstName')}
                      placeholder="Enter first name"
                      type="text"
                      className="focus:border-bluegreen-500 focus:shadow-outline mt-2 w-full transform rounded-lg border-transparent bg-green-200 px-4 py-2.5 text-base text-black placeholder-green-600 ring-green-400 ring-offset-2 ring-offset-current transition duration-500 ease-in-out focus:bg-white focus:outline-none focus:ring-2"
                    />
                  </div>
                  <div className="w-full">
                    <p>Last Name</p>
                    <input
                      {...register('lastName')}
                      placeholder="Enter last name"
                      type="text"
                      className="focus:border-bluegreen-500 focus:shadow-outline mt-2 w-full transform rounded-lg border-transparent bg-green-200 px-4 py-2.5 text-base text-black placeholder-green-600 ring-green-400 ring-offset-2 ring-offset-current transition duration-500 ease-in-out focus:bg-white focus:outline-none focus:ring-2"
                    />
                  </div>
                </div>

                <div className="">
                  <div className="w-full">
                    <p>Mobile Number</p>
                    <input
                      {...register('mobileNo')}
                      type="number"
                      placeholder="Enter 10 digit mobile number"
                      className="focus:border-bluegreen-500 focus:shadow-outline mt-2 w-full transform rounded-lg border-transparent bg-green-200 px-4 py-2.5 text-base text-black placeholder-green-600 ring-green-400 ring-offset-2 ring-offset-current transition duration-500 ease-in-out focus:bg-white focus:outline-none focus:ring-2"
                    />
                  </div>
                  <div className="w-full">
                    <p>Email ID</p>
                    <input
                      {...register('email')}
                      type="email"
                      placeholder="Enter email ID"
                      className="focus:border-bluegreen-500 focus:shadow-outline mt-2 w-full transform rounded-lg border-transparent bg-green-200 px-4 py-2.5 text-base text-black placeholder-green-600 ring-green-400 ring-offset-2 ring-offset-current transition duration-500 ease-in-out focus:bg-white focus:outline-none focus:ring-2"
                    />
                  </div>
                </div>

                <div className="">
                  <div className="w-full">
                    <p>Age</p>
                    <input
                      {...register('age')}
                      type="number"
                      placeholder="Enter your age"
                      className="focus:border-bluegreen-500 focus:shadow-outline mt-2 w-full transform rounded-lg border-transparent bg-green-200 px-4 py-2.5 text-base text-black placeholder-green-600 ring-green-400 ring-offset-2 ring-offset-current transition duration-500 ease-in-out focus:bg-white focus:outline-none focus:ring-2"
                    />
                  </div>
                  <div className="w-full">
                    <p>Place</p>
                    <input
                      {...register('place')}
                      placeholder="Enter Place"
                      type="text"
                      className="focus:border-bluegreen-500 focus:shadow-outline mt-2 w-full transform rounded-lg border-transparent bg-green-200 px-4 py-2.5 text-base text-black placeholder-green-600 ring-green-400 ring-offset-2 ring-offset-current transition duration-500 ease-in-out focus:bg-white focus:outline-none focus:ring-2"
                    />
                  </div>
                </div>
              </div>

              <div className="flex w-full justify-center rounded-3xl">
                {loading ? (
                  <button
                    type="submit"
                    className="mb-2 me-2 w-36 rounded-full bg-green-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300"
                  >
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        className="inline h-6 w-6 animate-spin fill-green-500 text-gray-200 dark:text-gray-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span className="sr-only">Loading...</span>
                    </div>
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="mb-2 me-2 w-36 rounded-full bg-green-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300"
                  >
                    Submit
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

function FooterAnimationImages() {
  return (
    <>
      <div className="hidden md:block">
        {/* larg screen */}
        <div style={{ position: 'relative', width: '400px', height: '400px' }}>
          <Image src={f1} alt="" width={400} height={400} />
          <motion.div
            style={{ position: 'absolute', top: 42, left: 32 }}
            animate={{
              y: [0, -20, 0], // Moves the image up by 20px and back
            }}
            transition={{
              duration: 8, // 10 seconds for one complete cycle
              ease: 'easeInOut',
              repeat: Infinity, // Repeats the animation infinitely
            }}
          >
            <Image src={f2} alt="" width={300} height={300} />
          </motion.div>
        </div>
      </div>

      <div className="md:hidden">
        {/* mobile */}
        <div style={{ position: 'relative', width: '300px', height: '300px' }}>
          <Image src={f1} alt="" width={400} height={400} />
          <motion.div
            style={{ position: 'absolute', top: 56, left: 40 }}
            animate={{
              y: [0, -20, 0], // Moves the image up by 20px and back
            }}
            transition={{
              duration: 8, // 10 seconds for one complete cycle
              ease: 'easeInOut',
              repeat: Infinity, // Repeats the animation infinitely
            }}
          >
            <Image src={f2} alt="" width={200} height={200} />
          </motion.div>
        </div>
      </div>
    </>
  );
}
