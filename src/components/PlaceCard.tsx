import { Image, ThumbsUp } from 'lucide-react';

import type { PlaceResult } from '@/types/analysis';

interface PlaceCardProps
  extends Pick<PlaceResult, 'placeName' | 'placeAddress' | 'placeImageList'> {
  likeCount: number;
  isCurrent: boolean;
}

export default function PlaceCard({
  placeName,
  placeAddress,
  placeImageList,
  likeCount,
  isCurrent,
}: PlaceCardProps) {
  const defaultImage = placeImageList[0].imageUrl;

  return (
    <article className="w-[260px] border border-foreground rounded-[8px]">
      <div className="h-[236px] flex justify-center items-center bg-background text-foreground rounded-t-[8px] overflow-hidden object-cover">
        {defaultImage ? (
          <img src={defaultImage} alt={placeName} className="w-full h-full" />
        ) : (
          <Image size={24} aria-label="빈 이미지" />
        )}
      </div>
      <div
        className={`w-full border-t border-foreground rounded-b-[8px] ${isCurrent ? 'bg-primary text-background' : 'bg-background text-foreground'}`}
      >
        <div className="flex justify-between items-center px-5 pt-3">
          <h2
            title={placeName}
            className="font-bold text-2xl overflow-hidden whitespace-nowrap text-ellipsis"
          >
            {placeName}
          </h2>
          <span className="flex gap-1">
            <ThumbsUp size={20} strokeWidth={1} />
            <span className="font-semibold">{likeCount}</span>
          </span>
        </div>
        <p
          title={placeAddress}
          className="text-sm px-5 pt-2 pb-3 overflow-hidden whitespace-nowrap text-ellipsis"
        >
          {placeAddress}
        </p>
      </div>
    </article>
  );
}
