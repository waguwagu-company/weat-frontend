'use client';

import { useRouter } from 'next/navigation';

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
      <button
        type="button"
        onClick={startGroup}
        className="w-full h-1/2 bg-black text-white rounded-xl cursor-pointer"
      >
        다같이
      </button>
      <button
        type="button"
        onClick={startSolo}
        className="w-full h-1/3 bg-black text-white rounded-xl cursor-pointer"
      >
        혼자
      </button>
    </section>
  );
}
