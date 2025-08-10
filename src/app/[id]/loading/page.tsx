'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAnalysis, useAnalysisSettings, useAnalysisStatus } from '@/hooks/useAnalysis';
import Loading from '@/components/Loading';
import { ANALYSIS_STATUS, LOADING_TEXT } from '@/constants/analysis';

export default function LoadingPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();

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
    if (isSuccessStatus && analysisStatus.data.analysisStatus === ANALYSIS_STATUS.COMPLETED) {
      router.push(`/${params.id}/result`);
    }
  }, [isSuccessStatus, analysisStatus?.data?.analysisStatus, params.id]);

  return (
    <main className="w-full h-full flex justify-center items-center">
      <Loading loopText={LOADING_TEXT} />
    </main>
  );
}
