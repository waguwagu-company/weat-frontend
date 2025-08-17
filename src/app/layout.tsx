import { ReactNode } from 'react';
import { Toaster } from 'sonner';
import { pretendard, paperlogy, cafe24proup } from './fonts';
import Providers from './providers';

import type { Metadata, Viewport } from 'next';
import type { CSSProperties } from 'react';

import './globals.css';

export const metadata: Metadata = {
  title: '위잇 WEAT',
  description: '혼자 그리고 함께, 빠르게 정하는 오늘의 메뉴',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

const toastOptions = {
  style: {
    width: 'fit-content',
    maxWidth: '100%',
    padding: '8px 20px',
    background: 'black',
    color: 'white',
    border: 'none',
    boxShadow: '0px 4px 4px 0px #00000040',
  } as CSSProperties,
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ko">
      <body
        className={`${pretendard.variable} ${paperlogy.variable} ${cafe24proup.variable} font-pretendard antialiased`}
      >
        <Providers>
          <div className="w-full max-w-[400px] h-full min-h-screen mx-auto bg-white shadow-md">
            <Toaster
              position="bottom-center"
              className="flex justify-center"
              toastOptions={toastOptions}
            />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
