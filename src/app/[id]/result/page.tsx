'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useAnalysisStore } from '@/stores';
import { useGetGroupResults } from '@/hooks/useGroup';
import { useGetLikes, useToggleLike, useGetLikeStatus } from '@/hooks/useLikes';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import PlaceCard from '@/components/PlaceCard';
import LoadingSpinner from '@/components/LoadingSpinner';

import type { CarouselApi } from '@/components/ui/carousel';
import type { PlaceResult } from '@/types/analysis';

export default function ResultPage() {
  const params = useParams<{ id: string }>();
  const { memberId, setMemberId } = useAnalysisStore();

  const [api, setApi] = useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentResultId, setCurrentResultId] = useState<number>(0);
  const [showBasis, setShowBasis] = useState<boolean>(false);

  const { mutate, data, isPending, isSuccess } = useGetGroupResults();
  const { data: likeCount, refetch: refetchLikeCount } = useGetLikes(currentResultId);
  const { mutate: toggleLike } = useToggleLike(currentResultId);
  const { data: isLiked, refetch: refetchIsLiked } = useGetLikeStatus(currentResultId);

  const likePlaceResult = () => {
    toggleLike(void 0, {
      onSuccess: () => {
        refetchIsLiked();
        refetchLikeCount();
      },
    });
  };

  const navigateCarousel = (index: number) => {
    if (!api) return;

    api.scrollTo(index);
  };

  useEffect(() => {
    if (memberId < 1) setMemberId(Number(window.localStorage.getItem('memberId') || '0'));
  }, []);

  useEffect(() => {
    mutate(params.id, {
      onSuccess: (data) => {
        setCurrentResultId(data.groupResultDetailList[currentIndex].analysisResultDetailId);
      },
    });
  }, [params.id]);

  useEffect(() => {
    if (!api) return;

    setCurrentIndex(api.selectedScrollSnap());

    if (isSuccess) {
      setCurrentResultId(
        data.groupResultDetailList[api.selectedScrollSnap()].analysisResultDetailId
      );
    }

    api.on('select', () => {
      setCurrentIndex(api.selectedScrollSnap());

      if (isSuccess) {
        setCurrentResultId(
          data.groupResultDetailList[api.selectedScrollSnap()].analysisResultDetailId
        );
      }
    });
  }, [api]);

  if (!data || isPending) return <LoadingSpinner />;

  const results: PlaceResult[] = data?.groupResultDetailList;

  return (
    <main className="w-full h-full flex flex-col items-center bg-black">
      <h1 className="w-fit py-3 font-cafe24-pro-up text-3xl bg-gradient-to-r from-gradient-2-from to-gradient-2-to bg-clip-text text-transparent">
        WEAT&#39;s Pick
      </h1>
      <section className="w-full h-full flex flex-col justify-center items-center gap-5">
        <Carousel
          setApi={setApi}
          opts={{
            align: 'center',
          }}
          className="w-full h-fit"
        >
          <CarouselContent className="ml-0 px-[30px] gap-5 items-center">
            {results.map((detail, index) => (
              <CarouselItem
                key={detail.analysisResultDetailId}
                className={`
                  w-fit min-w-fit ${currentIndex === index ? 'h-[70vh]' : 'h-[65vh]'}
                  pl-0 basis-[95%] shrink-0 transition-all last:pr-[30px]
                `}
              >
                <PlaceCard
                  place={detail}
                  likeCount={likeCount || 0}
                  isLiked={isLiked === undefined ? false : isLiked}
                  toggleLike={likePlaceResult}
                  isCurrent={currentIndex === index}
                  showBasis={showBasis}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="flex justify-center gap-2 pb-5">
          {results.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`w-2 h-2 rounded-full transition-colors ${currentIndex === index ? 'bg-white' : 'bg-muted-300'}`}
              onClick={() => navigateCarousel(index)}
            />
          ))}
        </div>
      </section>
      <div className="flex flex-col items-center gap-5 pb-7">
        <Button
          variant="gradient"
          className="w-fit h-fit px-5 py-2 rounded-full bg-black text-md"
          onClick={() => setShowBasis(!showBasis)}
        >
          이 식당을 추천하는 이유?
        </Button>
        <Link href="/" className="text-sm text-muted-300 underline underline-offset-3">
          다시 검색하기
        </Link>
      </div>
    </main>
  );
}
