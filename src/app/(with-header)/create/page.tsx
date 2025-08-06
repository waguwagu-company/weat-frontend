'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

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
    <section className="w-full h-full flex flex-col justify-center gap-[12px] p-6">
      <Button variant="primary" className="h-1/2" onClick={startGroup}>
        다같이
      </Button>
      <Button variant="primary" className="h-1/3" onClick={startSolo}>
        혼자
      </Button>
    </section>
  );
}
