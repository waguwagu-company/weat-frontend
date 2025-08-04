'use client';

import { useRouter } from 'next/navigation';

export default function CreateMeeting() {
  const router = useRouter();

  const createGroup = () => {
    const uuid = crypto.randomUUID();
    router.push(`/${uuid}`);
  };

  return (
    <>
      <header className="fixed top-0 w-full max-w-mobile p-4 text-center z-10">
        인원을 선택해 주세요.
      </header>
      <main className="w-full max-w-mobile min-h-full">
        <section className="w-full h-full flex flex-col justify-center gap-5">
          <button
            type="button"
            className="w-full h-1/3 bg-black text-white rounded-xl cursor-pointer"
            onClick={createGroup}
          >
            그룹
          </button>
          <button
            type="button"
            className="w-full h-1/4 bg-black text-white rounded-xl cursor-pointer"
          >
            개인
          </button>
        </section>
      </main>
    </>
  );
}
