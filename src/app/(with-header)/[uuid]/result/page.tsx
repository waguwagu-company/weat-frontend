'use client';

import { useState, useEffect } from 'react';
import { ThumbsUp } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import PlaceCard from '@/components/PlaceCard';

import type { CarouselApi } from '@/components/ui/carousel';
import type { PlaceResult } from '@/types/place';

const mockData: PlaceResult[] = [
  {
    placeId: 0,
    placeName: '문래옥 본점',
    placeAddress: '서울특별시 영등포구 선유로17길 28',
    analysisResultContent: '',
    analysisBasisList: [
      {
        analysisBasisType: '위잇 추천 식당',
        analysisBasisContent: '위잇이 추천하는 식당이에요!',
      },
    ],
    placeImageList: [
      {
        imageUrl: '',
      },
    ],
  },
  {
    placeId: 1,
    placeName: '문래옥 2호점',
    placeAddress: '서울특별시 영등포구 선유로17길 29 2층',
    analysisResultContent: '',
    analysisBasisList: [
      {
        analysisBasisType: '조건과 일치하는 리뷰',
        analysisBasisContent:
          '문래동 고기집을 검색하다가 나온 곳이었습니다. 이름도 문래옥이라 당연히 지도 확인도 못하고 방문하였는데 실질적으로는 5호선 양평역? 근처 아파트 단지에 있는 고기집이었습니다. 일단 고기맛이 일품이고 여러가지 반찬들과의 조합도 너무 좋았으며 소고기를 옥돌판? 에 구워주시는데 너무 신기한 경험이었어요 ㅎㅎㅎ 통장 잔고가 넉넉히 받혀준다면 맨날 가고 싶어요',
      },
    ],
    placeImageList: [
      {
        imageUrl:
          'https://pimg.mk.co.kr/news/cms/202409/03/news-p.v1.20240830.b4869f379bd14577b89f27b9561557f7_P1.jpg',
      },
    ],
  },
  {
    placeId: 2,
    placeName: '문래옥 3호점',
    placeAddress: '서울특별시 영등포구 선유로17길 28',
    analysisResultContent: '',
    analysisBasisList: [
      {
        analysisBasisType: '제일 가까워요!',
        analysisBasisContent: '선택하신 위치에서 제일 가까운 식당이에요.',
      },
    ],
    placeImageList: [
      {
        imageUrl: '',
      },
    ],
  },
];

export default function ResultPage() {
  const [api, setApi] = useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    if (!api) return;

    setCurrentIndex(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrentIndex(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section className="h-full flex flex-col justify-between">
      <div className="py-2.5 flex flex-col justify-between items-center gap-5">
        <Carousel
          setApi={setApi}
          opts={{
            align: 'center',
          }}
          className="w-full"
        >
          <CarouselContent className="ml-0 px-[70px] gap-8">
            {mockData.map((detail, index) => (
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
        <article className="w-full h-full flex flex-col justify-center items-center gap-3 px-5 py-3">
          <h3 className="font-semibold text-gradient text-xl">
            {mockData[currentIndex].analysisBasisList[0].analysisBasisType}
          </h3>
          <p className="line-clamp-5 overflow-hidden text-ellipsis break-words whitespace-pre-wrap font-paperlogy font-semibold text-[26px] text-center text-foreground">
            {mockData[currentIndex].analysisBasisList[0].analysisBasisContent}
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
        >
          다시 검색하기
        </button>
      </div>
    </section>
  );
}
