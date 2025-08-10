'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ThumbsUp } from 'lucide-react';
import { useGetGroupResults } from '@/hooks/useGroup';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import PlaceCard from '@/components/PlaceCard';
import Loading from '@/components/Loading';
import { LOADING_TEXT } from '@/constants/analysis';

import type { CarouselApi } from '@/components/ui/carousel';
import type { PlaceResult } from '@/types/analysis';

const mockData: PlaceResult[] = [
  {
    analysisResultDetailId: 0,
    placeId: 262,
    placeName: '월가갈비',
    placeAddress: '대한민국 서울 중구 세종대로18길 22 1층',
    analysisResultContent: '',
    analysisBasisList: [
      {
        analysisBasisType: 'REVIEW',
        analysisBasisContent:
          '갈비는 원래 좋아하지만 여기 고기는 진짜 부드럽고 양념도 제대로 배어 있어서 한 입 먹자마자 감탄 나왔어요\uD83D\uDD25 숯불에 구우니까 향까지 살아나서 밥이랑 같이 먹으니 조합이 완벽했어요ㅎㅎ 반찬도 깔끔하고 분위기도 좋아서 다음에도 또 올거같아여!!',
      },
    ],
    placeImageList: [
      {
        imageUrl:
          'https://lh3.googleusercontent.com/places/ANXAkqFEeY_rMj1_OM1Yl6gVs_Z45v3-BpzB3bbVXN3XqN9AeDfWQXXbzja2YCZUdoE9b6aqR2zinDk6OOQ-6KWzSxEnWBiK4ErkHes=s1600-w400',
      },
    ],
  },
];

export default function ResultPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [api, setApi] = useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const { mutate, data, isPending } = useGetGroupResults();

  const getBasisTitle = (type: string) => {
    switch (type) {
      case 'REVIEW':
        return '조건과 일치하는 리뷰';
      default:
        return '이런 식당은 어떠세요?';
    }
  };

  useEffect(() => {
    mutate(params.id);
  }, [params.id]);

  useEffect(() => {
    if (!api) return;

    setCurrentIndex(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrentIndex(api.selectedScrollSnap());
    });
  }, [api]);

  if (!data || isPending) {
    return (
      <main className="w-full h-full flex justify-center items-center">
        <Loading loopText={LOADING_TEXT} />
      </main>
    );
  }

  const results: PlaceResult[] = data?.data.groupResultDetailList || mockData;

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
            {getBasisTitle(results[currentIndex]?.analysisBasisList[0].analysisBasisType)}
          </h3>
          <p className="line-clamp-4 overflow-hidden text-ellipsis break-words whitespace-pre-wrap font-paperlogy font-semibold text-[26px] text-center text-foreground">
            {results[currentIndex]?.analysisBasisList[0].analysisBasisContent.replaceAll('\n', ' ')}
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
          다른 조건으로 찾아볼래요.
        </button>
      </div>
    </section>
  );
}
