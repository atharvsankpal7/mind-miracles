'use client';
import { ReactNode } from 'react';
import { RecoilRoot } from 'recoil';
import { SessionProvider } from 'next-auth/react';
export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
      <RecoilRoot>{children}</RecoilRoot>;
    </SessionProvider>
  );
};
