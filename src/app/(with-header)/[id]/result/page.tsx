'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ThumbsUp } from 'lucide-react';
import { useGetGroupResults } from '@/hooks/useGroup';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import PlaceCard from '@/components/PlaceCard';

import type { CarouselApi } from '@/components/ui/carousel';
import type { PlaceResult } from '@/types/analysis';

export default function ResultPage() {
  const router = useRouter();
  const [api, setApi] = useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const { data } = useGetGroupResults();

  const results: PlaceResult[] = data?.data.groupResultDetailList || [];

  useEffect(() => {
    if (!api) return;

    setCurrentIndex(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrentIndex(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section className="w-full h-full flex flex-col justify-between">
      <div className="h-full py-2.5 flex flex-col justify-center items-center gap-5">
        <Carousel
          setApi={setApi}
          opts={{
            align: 'center',
          }}
          className="w-full"
        >
          <CarouselContent className="ml-0 px-[70px] gap-8">
            {results.map((detail, index) => (
              <CarouselItem
                key={detail.placeId}
                className="w-fit min-w-fit pl-0 basis-[95%] shrink-0 last:pr-[70px]"
              >
                <PlaceCard
                  placeName={detail.placeName}
                  placeAddress={detail.placeAddress}
                  placeImageList={detail.placeImageList}
                  likeCount={0}
                  isCurrent={index === currentIndex}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <article className="w-full max-h-full flex flex-col justify-start items-center gap-3 px-5 py-3">
          <h3 className="font-semibold text-gradient text-xl">
            {results[currentIndex]?.analysisBasisList[0].analysisBasisType}
          </h3>
          <p className="line-clamp-4 overflow-hidden text-ellipsis break-words whitespace-pre-wrap font-paperlogy font-semibold text-[26px] text-center text-foreground">
            {results[currentIndex]?.analysisBasisList[0].analysisBasisContent}
          </p>
        </article>
      </div>
      <div className="flex flex-col items-center gap-5 pb-7">
        <Button variant="primary" size="round" className="flex-col text-xs font-normal">
          <ThumbsUp size={30} />
          좋아요
        </Button>
        <button
          type="button"
          className="text-sm text-muted-dark underline underline-offset-3 cursor-pointer"
          onClick={() => router.replace('/')}
        >
          다시 검색하기
        </button>
      </div>
    </section>
  );
}
