import Link from 'next/link';

export function Footer() {
  return (
    <>
      <footer className="h-24 bg-[#B6ECD5]">
        <div className="h-16 justify-around rounded-md bg-gradient-to-r from-[#B6ECD5] to-green-500 p-2 md:flex md:h-10">
          <div className="indent-6 text-sm md:pr-48 md:pt-1">
            <span className="mt-1">&copy;</span>{' '}
            <span className="font-semibold">
              <Link href={'/admin'}>{new Date().getFullYear()} Mind Miracles</Link>
            </span>{' '}
            - All rights reserved
          </div>
          <div className="indent-16 text-sm md:pt-1">
            Developed by{' '}
            <span>
              <a href="https://github.com/DipakKhade/" target="_blank">
                Dipak Khade
              </a>{' '}
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
