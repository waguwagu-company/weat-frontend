'use client';

import { ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

export default function WithHeaderLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const isMap = pathname.includes('/location');

  return (
    <>
      <header
        className={`sticky top-0 left-0 w-full h-13 bg-white ${isMap && 'shadow-lg'} z-1 flex items-center justify-center`}
      >
        <button
          type="button"
          className="absolute left-4 p-2 cursor-pointer"
          aria-label="뒤로 가기"
          onClick={() => router.back()}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="w-2/3 text-center font-semibold text-xl">헤더</h1>
      </header>
      <main className="w-full h-[calc(100vh-52px)]">{children}</main>
    </>
  );
}
