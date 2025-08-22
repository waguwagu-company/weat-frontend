'use client';

import { useRef, useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'sonner';
import { useGroupStore, useAnalysisStore } from '@/stores';
import { useValidatePrompt, useAnalysisSettings } from '@/hooks/useAnalysis';
import { Button } from '@/components/ui/button';

import type { ChangeEvent } from 'react';

export default function PromptPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { isSingle } = useGroupStore();
  const { setFreewriting, resetSettings } = useAnalysisStore();

  const { mutate: validate, isPending: isPendingValidation } = useValidatePrompt();
  const { mutate: submitSettings } = useAnalysisSettings();

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [isInvalid, setIsInvalid] = useState<boolean>(false);
  const isEmpty = prompt.trim().length === 0;

  const enterPrompt = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;

    if (isInvalid) setIsInvalid(false);

    if (textarea.value.length >= 100) {
      toast('공백을 포함해 100자까지만 입력할 수 있어요.', {
        style: { marginBottom: '140px' },
      });
      return;
    }

    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;

    setPrompt(textarea.value);
  };

  const validatePrompt = () => {
    validate(prompt.trim(), {
      onSuccess: (response) => {
        if (response.isValid) {
          if (isInvalid) setIsInvalid(false);
          savePrompt(true);
        } else {
          setIsInvalid(true);
          toast(response.message, {
            style: { marginBottom: '140px' },
          });
        }
      },
      onError: () => {
        setIsInvalid(true);
        toast('AI 서버 호출 중 오류가 발생했어요.', {
          style: { marginBottom: '140px' },
        });
      },
    });
  };

  const savePrompt = (isSaving: boolean) => {
    if (isSaving) setFreewriting(prompt.trim());

    submitSettings(void 0, {
      onSuccess: () => {
        resetSettings();

        if (isSingle) {
          router.replace(`/${params.id}/loading`);
        } else {
          router.replace(`/${params.id}`);
        }
      },
    });
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
          className="
            w-full max-h-full resize-none break-words whitespace-pre-wrap
            font-paperlogy font-bold text-[32px] leading-13 text-center text-muted-400
            placeholder:text-muted-200 placeholder:underline placeholder:underline-offset-5
            placeholder:decoration-2 outline-none"
        ></textarea>
      </article>
      <div className="flex flex-col items-center gap-5 pb-7">
        <Button
          variant={isEmpty || isPendingValidation || isInvalid ? 'gradient' : 'primary'}
          size="round"
          className={isEmpty || isPendingValidation || isInvalid ? 'pointer-events-none' : ''}
          onClick={validatePrompt}
        >
          {isEmpty ? '입력 중' : isPendingValidation || isInvalid ? '생각 중' : 'OK'}
        </Button>
        <button
          type="button"
          className="text-sm text-muted-300 underline underline-offset-3 cursor-pointer"
          onClick={() => savePrompt(false)}
        >
          입력하지 않고 넘어갈래요.
        </button>
      </div>
    </section>
  );
}
