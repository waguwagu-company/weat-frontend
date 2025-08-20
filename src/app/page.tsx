'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Lottie from 'lottie-react';
import onboarding1 from '@/assets/animations/lottie-onboarding-1.json';
import onboarding2 from '@/assets/animations/lottie-onboarding-2.json';
import onboarding3 from '@/assets/animations/lottie-onboarding-3.json';
import onboarding4 from '@/assets/animations/lottie-onboarding-4.json';
import onboarding5 from '@/assets/animations/lottie-onboarding-5.json';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';

// import type { ReactNode } from 'react';
import type { CarouselApi } from '@/components/ui/carousel';

// interface Onboarding {
//   title: string;
//   description: string;
//   lottie: ReactNode;
// }

export default function Home() {
  const [api, setApi] = useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const navigateCarousel = (index: number) => {
    if (!api) return;

    api.scrollTo(index);
  };

  useEffect(() => {
    if (!api) return;

    setCurrentIndex(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrentIndex(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <main className="w-full h-full px-5 pt-7 pb-5 flex flex-col justify-between items-center bg-[linear-gradient(340.34deg,var(--primary)_10%,rgba(214,50,229,0.92)_90%)] text-white overflow-hidden">
      <div className="w-full flex items-center gap-2 px-5 pb-4">
        <h1 className="font-semibold text-sm">How to use WEAT?</h1>
        <div className="flex justify-center gap-1">
          {Array.from({ length: 5 }, (_, i) => i).map((_, index) => (
            <button
              key={index}
              type="button"
              className={`w-2 h-2 rounded-full transition-all ${currentIndex === index ? 'bg-white' : 'bg-transparent border border-white'}`}
              onClick={() => navigateCarousel(index)}
            />
          ))}
        </div>
      </div>

      <Carousel
        setApi={setApi}
        opts={{
          align: 'center',
        }}
        className="w-full h-full"
      >
        <CarouselContent className="ml-0">
          <CarouselItem className="flex flex-col justify-between gap-4 pl-0">
            <section className="flex flex-col gap-2 px-5">
              <h2 className="font-extrabold text-xl">
                <span className="font-cafe24-pro-up">WEAT</span>은 혼자 또는 함께 이용 가능해요.
              </h2>
              <p className="text-sm">
                함께 결정하기로 했다면, 그룹을 만들고 친구를 초대하세요.
                <br />
                친구들이 참여했는지 실시간으로 확인할 수 있어요.
              </p>
            </section>
            <Lottie animationData={onboarding1} loop autoplay className="px-15" />
          </CarouselItem>
          <CarouselItem className="flex flex-col justify-between gap-4 pl-0">
            <section className="flex flex-col gap-2 px-5">
              <h2 className="font-extrabold text-xl">원하는 위치를 알려주세요.</h2>
              <p className="text-sm">WEAT이 위치에 맞는 맛집을 추천해드려요.</p>
            </section>
            <Lottie animationData={onboarding2} loop autoplay className="px-15" />
          </CarouselItem>
          <CarouselItem className="flex flex-col justify-between gap-4 pl-0">
            <section className="flex flex-col gap-2 px-5">
              <h2 className="font-extrabold text-xl">나의 음식 취향을 알려주세요.</h2>
              <p className="text-sm">좋아하는 음식과 싫어하는 음식을 선택해 주세요.</p>
            </section>
            <Lottie animationData={onboarding3} loop autoplay className="px-15" />
          </CarouselItem>
          <CarouselItem className="flex flex-col justify-between gap-4 pl-0">
            <section className="flex flex-col gap-2 px-5">
              <h2 className="font-extrabold text-xl">내가 원하는 식당의 조건을 알려주세요.</h2>
              <p className="text-sm">Google 리뷰를 CLOVA AI가 분석해 딱 맞는 맛집을 찾아드려요!</p>
            </section>
            <Lottie animationData={onboarding4} loop autoplay className="px-15" />
          </CarouselItem>
          <CarouselItem className="flex flex-col justify-between gap-4 pl-0">
            <section className="flex flex-col gap-2 px-5">
              <h2 className="font-extrabold text-xl">
                <span className="font-cafe24-pro-up">WEAT</span>이 찾은 맛집들을 확인하세요!
              </h2>
              <p className="text-sm">카드 형태로 편하게 넘기며 맛집을 골라볼 수 있어요.</p>
            </section>
            <Lottie animationData={onboarding5} loop autoplay className="px-15" />
          </CarouselItem>
        </CarouselContent>
      </Carousel>

      <div className="w-full flex flex-col items-center gap-3">
        <Button
          variant="primary"
          className="font-cafe24-pro-up text-2xl"
          onClick={currentIndex === 4 ? undefined : () => navigateCarousel(currentIndex + 1)}
          asChild={currentIndex === 4}
        >
          {currentIndex === 4 ? <Link href="/create">START</Link> : 'NEXT'}
        </Button>
        <Link
          href="/create"
          className={`
              text-xs text-white underline underline-offset-3
              ${currentIndex === 4 ? 'opacity-0 pointer-events-none' : 'opacity-100'}
            `}
        >
          SKIP
        </Link>
      </div>
    </main>
  );
}
