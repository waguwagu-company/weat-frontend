'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const loadingText: string[] = [
  '당신의 위치를 반영 중이에요...',
  '당신의 취향을 반영 중이에요...',
  'Google Map 리뷰를 분석 중이에요...',
  'CLOVA가 진정한 맛집을 고민 중이에요...',
];

export default function LoadingPage() {
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const textInterval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % loadingText.length);
    }, 6000);
    return () => clearInterval(textInterval);
  }, []);

  return (
    <main className="w-full h-full flex justify-center items-center">
      <section>
        <img src="/images/loading-60fps.gif" alt="로딩" />
        <AnimatePresence mode="wait">
          <motion.h1
            key={textIndex}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="font-semibold text-xl text-gradient text-center pb-20"
          >
            {loadingText[textIndex]}
          </motion.h1>
        </AnimatePresence>
      </section>
    </main>
  );
}
