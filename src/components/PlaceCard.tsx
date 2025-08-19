import Image from 'next/image';
import { ThumbsUp } from 'lucide-react';
import { BASIS_TYPE } from '@/constants/analysis';

import type { PlaceResult } from '@/types/analysis';

interface PlaceCardProps {
  place: PlaceResult;
  likeCount: number;
  isLiked: boolean;
  showBasis: boolean;
}

export default function PlaceCard({ place, likeCount, isLiked, showBasis }: PlaceCardProps) {
  if (showBasis) {
    return (
      <article className="w-[340px] h-full pt-12 pb-5 px-5 flex flex-col justify-between items-center text-white border border-white/30 rounded-[8px] overflow-hidden">
        <h3 className="font-cafe24-pro-up text-2xl">
          <span className="text-primary">WEAT</span> 분석 결과
        </h3>
        <div className="text-primary">
          <p className="font-cafe24-pro-up text-4xl text-center">
            <span className="text-6xl">{place.analysisScore}</span>%
          </p>
          <p className="text-xs">CLOVA AI 매칭 적합도</p>
        </div>
        <p className="text-md">
          <span className="font-bold text-primary">{place.keywordList.join(' ')}</span>
          키워드를 고려한 맛집이에요!
        </p>
        <div className="h-1/5 max-h-1/4">
          <h4 className="font-semibold text-center pb-2">
            {place.analysisBasisType === BASIS_TYPE.REVIEW ? '일치하는 리뷰' : 'CLOVA 코멘트'}
          </h4>
          <p className="max-h-3/4 overflow-y-auto text-sm">{place.analysisBasisContent}</p>
        </div>
        <Image src="/images/logo-clova.svg" alt="CLOVA" width={78} height={11} />
      </article>
    );
  }

  return (
    <article className="relative w-[340px] h-full text-white border border-white/30 rounded-[8px] overflow-hidden">
      <img src={place.imageUrl} alt={place.placeName} className="w-full h-full object-cover" />

      <div className="absolute bottom-32 right-3 flex items-center gap-1">
        <button type="button" className="cursor-pointer">
          <ThumbsUp
            size={20}
            fill={isLiked ? 'white' : 'transparent'}
            strokeWidth={isLiked ? 0 : 1}
            className="transition-all"
          />
        </button>
        <span className="font-semibold text-lg">{likeCount}</span>
      </div>

      <div className="absolute bottom-0 w-full px-5 py-4 flex flex-col justify-between gap-2 rounded-b-[8px] bg-black/20 backdrop-blur-sm">
        <p className="text-sm pb-1">
          {place.analysisBasisType === BASIS_TYPE.REVIEW
            ? '조건과 가장 일치하는 맛집이에요 😋'
            : 'CLOVA가 가장 추천하는 맛집이에요 😋'}
        </p>
        <h2
          title={place.placeName}
          className="font-bold text-xl overflow-hidden whitespace-nowrap text-ellipsis"
        >
          {place.placeName}
        </h2>
        <p className="text-sm overflow-hidden whitespace-nowrap text-ellipsis">
          {place.placeAddress}
        </p>
      </div>
    </article>
  );
}
