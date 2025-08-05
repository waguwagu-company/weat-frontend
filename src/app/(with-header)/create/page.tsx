'use client';

import { useRouter } from 'next/navigation';
import { GradientButton } from '@/components/ui/button';

export default function CreatePage() {
  const router = useRouter();

  const startGroup = () => {
    const uuid = crypto.randomUUID();
    router.push(`/${uuid}`);
  };

  const startSolo = () => {
    const uuid = crypto.randomUUID();
    router.push(`/${uuid}/location`);
  };

  return (
    <section className="w-full h-full flex flex-col justify-center gap-4 p-6">
      <GradientButton className="w-full h-1/2" onClick={startGroup}>
        다같이
      </GradientButton>
      <GradientButton className="w-full h-1/2" onClick={startSolo}>
        혼자
      </GradientButton>
    </section>
  );
}
