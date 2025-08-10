'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'lottie-react';
import lottieLoading from '@/assets/animations/lottie-loading.json';
import { useAnalysisStore } from '@/stores';
import { useAnalysis, useAnalysisSettings, useAnalysisStatus } from '@/hooks/useAnalysis';
import { useGetGroupResults } from '@/hooks/useGroup';
import { ANALYSIS_STATUS } from '@/constants/analysis';

const loadingText: string[] = [
  '당신의 위치를 반영 중이에요...',
  '당신의 취향을 반영 중이에요...',
  'Google Map 리뷰를 분석 중이에요...',
  'CLOVA가 진정한 맛집을 고민 중이에요...',
];

export default function LoadingPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [textIndex, setTextIndex] = useState(0);
  const { memberId, locationSetting, categorySettingList, textInputSetting } = useAnalysisStore();

  const { mutate: submitSettings } = useAnalysisSettings();
  const { mutate: startAnalysis, isSuccess: isSuccessAnalysis } = useAnalysis();
  const {
    data: analysisStatus,
    isSuccess: isSuccessStatus,
    refetch: refetchStatus,
  } = useAnalysisStatus(params.id);
  const { mutate: getGroupResults } = useGetGroupResults();

  useEffect(() => {
    const textInterval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % loadingText.length);
    }, 6000);

    submitSettings(
      { memberId, locationSetting, categorySettingList, textInputSetting },
      {
        onSuccess: () => {
          startAnalysis(params.id);
        },
      }
    );

    return () => clearInterval(textInterval);
  }, [params.id, memberId, locationSetting, categorySettingList, textInputSetting]);

  useEffect(() => {
    const pollingInterval = setInterval(() => {
      if (isSuccessAnalysis) refetchStatus();
    }, 5000);

    return () => clearInterval(pollingInterval);
  }, [isSuccessAnalysis]);

  useEffect(() => {
    if (isSuccessStatus && analysisStatus.data.analysisStatus === ANALYSIS_STATUS.COMPLETED) {
      getGroupResults(params.id, {
        onSuccess: () => {
          router.push(`/${params.id}/result`);
        },
      });
    }
  }, [isSuccessStatus, analysisStatus?.data?.analysisStatus, params.id]);

  return (
    <main className="w-full h-full flex justify-center items-center">
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
            {loadingText[textIndex]}
          </motion.h1>
        </AnimatePresence>
      </section>
    </main>
  );
}
