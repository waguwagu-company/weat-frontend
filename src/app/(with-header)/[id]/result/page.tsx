'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ThumbsUp } from 'lucide-react';
import { useAnalysisStore } from '@/stores';
import { useGetGroupResults } from '@/hooks/useGroup';
import { useGetLikes, useToggleLike, useGetLikeStatus } from '@/hooks/useLikes';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import PlaceCard from '@/components/PlaceCard';
import LoadingSpinner from '@/components/LoadingSpinner';

import type { CarouselApi } from '@/components/ui/carousel';
import type { PlaceResult } from '@/types/analysis';

const mockData: PlaceResult[] = [
  {
    analysisResultDetailId: 0,
    placeId: 0,
    placeName: '위잇',
    placeAddress: '서울 중구 세종대로 110',
    analysisResultContent: '',
    analysisBasisList: [
      {
        analysisBasisType: '',
        analysisBasisContent: '위잇이 추천하는 식당이에요!',
      },
    ],
    placeImageList: [
      {
        imageUrl: 'src/app/opengraph-image.png',
      },
    ],
  },
];

export default function ResultPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [api, setApi] = useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentResultId, setCurrentResultId] = useState<number>(0);
  const { memberId, setMemberId } = useAnalysisStore();

  const { mutate, data, isPending, isSuccess } = useGetGroupResults();
  const { data: likeCount, refetch: refetchLikeCount } = useGetLikes(currentResultId);
  const { mutate: toggleLike } = useToggleLike(currentResultId);
  const { data: isLiked, refetch: refetchIsLiked } = useGetLikeStatus(currentResultId);

  const getBasisTitle = (type: string) => {
    switch (type) {
      case 'REVIEW':
        return '조건과 일치하는 리뷰';
      default:
        return '이런 식당은 어떠세요?';
    }
  };

  const likeResult = () => {
    toggleLike(void 0, {
      onSuccess: () => {
        refetchIsLiked();
        refetchLikeCount();
      },
    });
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

  const results: PlaceResult[] = data?.groupResultDetailList || mockData;

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
                  likeCount={likeCount || 0}
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
        <Button
          variant="primary"
          size="round"
          className="flex-col text-xs font-normal"
          onClick={likeResult}
        >
          <ThumbsUp
            size={30}
            fill={isLiked ? 'white' : 'transparent'}
            strokeWidth={isLiked ? 0 : 2}
            className="transition-all"
          />
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
