'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCreateGroup } from '@/hooks/useGroup';
import { Button } from '@/components/ui/button';

export default function CreatePage() {
  const router = useRouter();
  const { mutate } = useCreateGroup();

  const start = (isSingle: boolean) => {
    mutate(isSingle, {
      onSuccess: (response) => {
        const groupId = response.data.groupId;
        const path = isSingle ? `/${groupId}/location` : `/${groupId}`;
        router.push(path);
      },
    });
  };

  return (
    <section className="w-full h-full flex flex-col justify-center gap-7 p-5">
      <Button variant="primary" className="h-1/2 flex flex-col gap-6" onClick={() => start(false)}>
        <div className="flex flex-col items-center gap-3">
          <span className="block font-cafe24-pro-up text-[32px]">WE EAT</span>
          <Image src="./images/icon-group.svg" alt="WE EAT" width={168} height={169} />
        </div>
        여러 명이 같이 갈 가게를 찾아볼래요.
      </Button>
      <Button
        variant="secondary"
        className="h-[36%] flex flex-col gap-6"
        onClick={() => start(true)}
      >
        <div className="flex flex-col items-center gap-3">
          <span className="block font-cafe24-pro-up text-[32px]">Just mine</span>
          <Image src="./images/icon-solo.svg" alt="Just mine" width={100} height={101} />
        </div>
        혼자서 갈 가게를 찾아볼래요.
      </Button>
    </section>
  );
}
