'use client';

import { useRouter, useParams } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RotateCw } from 'lucide-react';

const HEADCOUNT_MIN = 0;
const HEADCOUNT_MAX = 9;

export default function MeetingPage() {
  const router = useRouter();
  const params = useParams<{ uuid: string }>();
  const [headcount, setHeadcount] = useState<number>(HEADCOUNT_MIN);

  const getHeadcountText = (count: number) => {
    if (count === HEADCOUNT_MIN) return '아직 아무도 조건을 알려주지 않았어요.';
    if (count === HEADCOUNT_MAX) return '모두 입력했어요.';
    return `${headcount}명의 친구가 입력했어요.`;
  };

  const refreshHeadcount = () => {
    if (headcount === HEADCOUNT_MAX) return;

    setHeadcount((prev) => prev + 1);
  };

  const enterPreference = () => {
    router.push(`/${params.uuid}/location`);
  };

  return (
    <section className="h-full flex flex-col justify-end gap-[22vh]">
      <article>
        <h3
          className={`font-cafe24-pro-up text-[128px] text-center ${headcount > 0 ? 'text-gradient' : 'text-muted-medium'}`}
        >
          {headcount}
        </h3>
        <div className="w-full flex justify-center items-center gap-2">
          <p className="text-lg font-semibold">{getHeadcountText(headcount)}</p>
          <button type="button" className="cursor-pointer" onClick={refreshHeadcount}>
            <RotateCw size={16} />
          </button>
        </div>
      </article>
      <div>
        <div className="flex flex-col gap-2 p-[20px]">
          <Button variant="secondary" className="h-fit p-[16px]">
            그룹에 초대하기
          </Button>
          <Button variant="primary" className="h-fit p-[16px]" onClick={enterPreference}>
            나의 조건 알려주기
          </Button>
        </div>
        <p className="text-xs text-muted-dark text-center pb-7">최대 9명까지 입력할 수 있어요.</p>
      </div>
    </section>
  );
}
