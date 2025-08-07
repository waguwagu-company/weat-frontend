import { ReactNode } from 'react';
import { pretendard, paperlogy, cafe24proup } from './fonts';

import type { Metadata, Viewport } from 'next';

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
