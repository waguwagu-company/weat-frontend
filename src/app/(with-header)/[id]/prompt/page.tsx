'use client';

import { useRef, useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';

import type { ChangeEvent } from 'react';

export default function PromptPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [prompt, setPrompt] = useState<string>('');
  const isEmpty = prompt.trim().length === 0;

  const getButtonText = () => {
    if (isEmpty) return '입력 중';
    return 'OK';
  };

  const enterPrompt = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);

    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, []);

  return (
    <section className="h-full flex flex-col justify-end items-center">
      <article className="h-full flex flex-col justify-center items-center gap-3 px-5 py-3">
        <label htmlFor="prompt" className="block font-semibold text-gradient">
          음식점은...
        </label>
        <textarea
          id="prompt"
          placeholder="원하는 내용을 적어주세요."
          maxLength={100}
          value={prompt}
          onChange={enterPrompt}
          className="w-full max-h-full resize-none break-words whitespace-pre-wrap font-paperlogy font-bold text-[32px] text-center text-foreground placeholder:text-muted-medium placeholder:underline placeholder:underline-offset-5 placeholder:decoration-2 outline-none"
        ></textarea>
      </article>
      <div className="flex flex-col items-center gap-5 pb-7">
        <Button
          variant={isEmpty ? 'gradient' : 'primary'}
          size="round"
          className={isEmpty ? 'pointer-events-none' : ''}
        >
          {getButtonText()}
        </Button>
        <button
          type="button"
          className="text-sm text-muted-dark underline underline-offset-3 cursor-pointer"
          onClick={() => router.push(`/${params.id}/result`)}
        >
          입력하지 않고 넘어갈래요.
        </button>
      </div>
    </section>
  );
}
