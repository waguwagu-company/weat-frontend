import { ReactNode } from 'react';
import { pretendard, paperlogy, cafe24proup } from './fonts';

import type { Metadata, Viewport } from 'next';

import './globals.css';

export const metadata: Metadata = {
  title: 'WEAT',
  description: 'B-Side Potenday 508 WaguWagu Company',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ko">
      <body
        className={`${pretendard.variable} ${paperlogy.variable} ${cafe24proup.variable} font-pretendard antialiased`}
      >
        <div className="w-full max-w-[400px] h-full min-h-screen mx-auto bg-white shadow-md">
          {children}
        </div>
      </body>
    </html>
  );
}
