import type { Metadata } from 'next';
import { Merriweather } from 'next/font/google';
import './globals.css';
import Appbar from '@/components/Appbar';
import { Toaster } from 'sonner';
import NextTopLoader from 'nextjs-toploader';
import { Providers } from './Providers';

const merriweather = Merriweather({ subsets: ['latin'], weight: '300' });

export const metadata: Metadata = {
  title: 'Mindmiracles',
  description:
    'Mind Miracles is a dedicated Hypnotherapy and healing center established in 2019, focused on empowering the mental health of society, particularly the youth. We offer expert Hypnotherapy and counseling services to address your mental, emotional, and educational needs with care and expertise.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body
          className={`${merriweather.className} box-border bg-[#F8F9FA] text-[#003C2F]`}
        >
          <NextTopLoader showSpinner={false} color="#19c255" />
          <Appbar />
          <Toaster richColors position="top-right" />
          {children}
        </body>
      </Providers>
    </html>
  );
}
