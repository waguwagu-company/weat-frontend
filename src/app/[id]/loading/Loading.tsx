'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'lottie-react';
import lottieLoading from '@/assets/animations/lottie-loading.json';

interface LoadingProps {
  loopText: string[];
}

export default function Loading({ loopText }: LoadingProps) {
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const textInterval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % loopText.length);
    }, 6000);

    return () => clearInterval(textInterval);
  }, [loopText]);

  return (
    <section>
      <Lottie animationData={lottieLoading} loop autoplay />
      <AnimatePresence mode="wait">
        <motion.h1
          key={textIndex}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="font-semibold text-xl text-gradient text-center pt-5 pb-15"
        >
          {loopText[textIndex]}
        </motion.h1>
      </AnimatePresence>
    </section>
  );
}
