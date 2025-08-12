'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAnalysisStore } from '@/stores';
import { useAnalysis, useAnalysisSettings, useAnalysisStatus } from '@/hooks/useAnalysis';
import { ANALYSIS_STATUS, LOADING_TEXT } from '@/constants/analysis';

import Loading from './Loading';

export default function LoadingPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { resetSettings } = useAnalysisStore();

  const { mutate: submitSettings } = useAnalysisSettings();
  const { mutate: startAnalysis, isSuccess: isSuccessAnalysis } = useAnalysis();
  const {
    data: analysisStatus,
    isSuccess: isSuccessStatus,
    refetch: refetchStatus,
  } = useAnalysisStatus(params.id);

  useEffect(() => {
    submitSettings(void 0, {
      onSuccess: () => {
        startAnalysis(params.id);
        resetSettings();
      },
    });
  }, [params.id]);

  useEffect(() => {
    const pollingInterval = setInterval(() => {
      if (isSuccessAnalysis) refetchStatus();
    }, 5000);

    return () => clearInterval(pollingInterval);
  }, [isSuccessAnalysis]);

  useEffect(() => {
    if (isSuccessStatus) {
      switch (analysisStatus.analysisStatus) {
        case ANALYSIS_STATUS.FAILED:
          router.replace(`/${params.id}/no-result`);
          break;
        case ANALYSIS_STATUS.COMPLETED:
          router.replace(`/${params.id}/result`);
          break;
        default:
          break;
      }
    }
  }, [isSuccessStatus, analysisStatus?.analysisStatus, params.id]);

  return (
    <main className="w-full h-full flex justify-center items-center">
      <Loading loopText={LOADING_TEXT} />
    </main>
  );
}
