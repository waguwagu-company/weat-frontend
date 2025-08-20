'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Share2 } from 'lucide-react';

import type { CSSProperties } from 'react';

interface ShareButtonProps {
  className?: string;
  toastStyle?: CSSProperties;
}

export default function ShareButton({ className, toastStyle }: ShareButtonProps) {
  const [href, setHref] = useState<string>('');

  const copyLink = () => {
    navigator.clipboard.writeText(href);

    toast('결과 링크가 클립보드에 복사됐어요.', {
      position: 'top-center',
      style: toastStyle,
    });
  };

  useEffect(() => {
    setHref(window.location.href);
  }, []);

  return (
    <button
      type="button"
      className={`absolute text-white p-2 cursor-pointer ${className}`}
      aria-label="공유하기"
      onClick={copyLink}
    >
      <Share2 width={24} height={24} />
    </button>
  );
}
