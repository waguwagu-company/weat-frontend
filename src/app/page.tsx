import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <section className="w-full h-full px-5 py-14 flex flex-col justify-between items-center">
      <article className="h-full flex flex-col justify-center items-center gap-13">
        <div className="flex flex-col items-center gap-3">
          <Image src="/images/logo.svg" alt="WEAT" width={156} height={157} />
          <h1 className="font-cafe24-pro-up text-primary text-[32px] text-center">WEAT</h1>
        </div>
        <p className="font-paperlogy font-semibold text-primary text-xl text-center leading-9">
          혼자 그리고 함께,
          <br />
          빠르게 정하는 오늘의 메뉴
        </p>
      </article>
      <Button variant="primary" asChild>
        <Link href="/create">시작해 볼까요?</Link>
      </Button>
    </section>
  );
}
