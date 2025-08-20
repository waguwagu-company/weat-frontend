'use client';

import Link from 'next/link';
import Lottie from 'lottie-react';
import lottieNoResult from '@/assets/animations/lottie-no-result.json';

export default function NoResultPage() {
  return (
    <main className="relative w-full flex-1 overflow-y-auto flex flex-col justify-center items-center">
      <h1 className="font-cafe24-pro-up text-primary text-2xl text-center mb-6">
        검색된 식당이 없어요...
      </h1>
      <Lottie animationData={lottieNoResult} loop autoplay className="w-72" />
      <p className="font-paperlogy font-medium text-md text-muted-400 leading-7">
        위치와 입력하신 조건에
        <br />
        모두 맞는 맛집을 찾기가 어려워요.
        <br />
        조금만 더 여유롭게 선택해 주시면
        <br />
        <span className="font-cafe24-pro-up text-primary">WEAT</span>이 다시 추천해드릴게요!
      </p>
      <Link
        href="/"
        className="absolute bottom-7.5 left-1/2 -translate-1/2 text-sm text-black underline underline-offset-3"
      >
        다시 검색하기
      </Link>
    </main>
  );
}
