'use client';

import { ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Share2, ChevronLeft } from 'lucide-react';

function ShareButton() {
  return (
    <button
      type="button"
      className="absolute right-4 text-primary p-2 cursor-pointer"
      aria-label="공유하기"
    >
      <Share2 width={24} height={24} />
    </button>
  );
}

function BackButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      className="absolute left-4 p-2 cursor-pointer"
      aria-label="뒤로 가기"
      onClick={() => router.back()}
    >
      <ChevronLeft width={24} height={24} />
    </button>
  );
}

function Header() {
  const pathname = usePathname();

  const isRoot = pathname === '/';
  const isMap = pathname.includes('/location');
  const isLoading = pathname.includes('/loading');
  const isResult = pathname.includes('/result');

  if (isRoot || isLoading) return <></>;

  const titleMap: Record<string, string> = {
    create: '인원을 선택해 주세요.',
    '': '내가 원하는 조건을 알려주세요.', // /[uuid]
    location: '위치를 선택해 주세요.',
    like: '좋아하는 음식을 알려주세요.',
    dislike: '싫어하는 음식을 알려주세요.',
    prompt: '중요하게 생각하는 게 뭘까요?',
    result: '음식점을 추천 드려요!',
  };

  const segments = pathname.split('/');
  const title =
    segments[1] === 'create' ? titleMap['create'] : (titleMap[segments[2] || ''] ?? 'WEAT');

  return (
    <header
      className={`sticky top-0 left-0 w-full h-13 bg-white ${isMap && 'shadow-lg'} z-1 flex items-center justify-center`}
    >
      {isResult ? <ShareButton /> : <BackButton />}
      <h1 className="w-2/3 text-center font-semibold text-xl">{title}</h1>
    </header>
  );
}

export default function WithHeaderLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="w-full h-[calc(100vh-52px)]">{children}</main>
    </>
  );
}
