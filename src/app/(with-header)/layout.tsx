'use client';

import { ReactNode, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import { toast } from 'sonner';
import { Share2 } from 'lucide-react';

function ShareButton() {
  const [href, setHref] = useState<string>('');

  const copyLink = () => {
    navigator.clipboard.writeText(href);

    toast('결과 링크가 클립보드에 복사됐어요.', { position: 'top-center' });
  };

  useEffect(() => {
    setHref(window.location.href);
  }, []);

  return (
    <button
      type="button"
      className="absolute right-4 text-primary p-2 cursor-pointer"
      aria-label="공유하기"
      onClick={copyLink}
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
      className="absolute left-4 w-fit h-fit cursor-pointer"
      aria-label="뒤로 가기"
      onClick={() => router.back()}
    >
      <Image src="/images/header-back.svg" alt="뒤로 가기" width={18} height={25} />
    </button>
  );
}

function Header() {
  const pathname = usePathname();
  const isMap = pathname.includes('/location');

  const titleMap: Record<string, ReactNode> = {
    create: '같이 갈 인원을 정해볼까요?',
    '': '원하는 조건을 알려주세요.', // /[id]
    location: '위치를 선택해 주세요.',
    like: (
      <>
        <span className="text-good">좋아</span>하는 음식을 알려주세요.
      </>
    ),
    dislike: (
      <>
        <span className="text-bad">싫어</span>하는 음식을 알려주세요.
      </>
    ),
    prompt: '중요하게 생각하는 게 뭘까요?',
  };

  const segments = pathname.split('/');
  const title =
    segments[1] === 'create' ? titleMap['create'] : (titleMap[segments[2] || ''] ?? 'WEAT');

  return (
    <header
      className={`sticky top-0 left-0 w-full h-13 bg-white ${isMap && 'shadow-md'} z-1 flex items-center justify-center`}
    >
      <BackButton />
      <h1 className="text-center font-cafe24-pro-up text-2xl text-muted-400 leading-none">
        {title}
      </h1>
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
