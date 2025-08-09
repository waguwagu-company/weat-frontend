'use client';

import { useRouter } from 'next/navigation';
import { useCreateGroup } from '@/hooks/useGroup';
import { useCategories } from '@/hooks/useCategory';
import { Button } from '@/components/ui/button';
import IconGroup from '@/assets/images/icon-group.svg';
import IconSolo from '@/assets/images/icon-solo.svg';

export default function CreatePage() {
  const router = useRouter();
  const { mutate, data: response, isSuccess } = useCreateGroup();
  const { isSuccess: isSuccessCategories } = useCategories();

  const startGroup = () => {
    mutate(false);

    if (isSuccess && isSuccessCategories) {
      const groupId = response.data.groupId;
      router.push(`/${groupId}`);
    }
  };

  const startSolo = () => {
    mutate(true);

    if (isSuccess && isSuccessCategories) {
      const groupId = response.data.groupId;
      router.push(`/${groupId}/location`);
    }
  };

  return (
    <section className="w-full h-full flex flex-col justify-center gap-7 p-5">
      <Button variant="primary" className="h-1/2 flex flex-col gap-6" onClick={startGroup}>
        <div className="flex flex-col items-center gap-3">
          <label className="block font-cafe24-pro-up text-[32px]">WE EAT</label>
          <IconGroup width="168" height="169" />
        </div>
        여러 명이 같이 갈 가게를 찾아볼래요.
      </Button>
      <Button variant="secondary" className="h-[36%] flex flex-col gap-6" onClick={startSolo}>
        <div className="flex flex-col items-center gap-3">
          <label className="block font-cafe24-pro-up text-[32px]">Just mine</label>
          <IconSolo width="100" height="101" />
        </div>
        혼자서 갈 가게를 찾아볼래요.
      </Button>
    </section>
  );
}
