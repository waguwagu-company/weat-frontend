'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAnalysis, useAnalysisStatus } from '@/hooks/useAnalysis';
import { ANALYSIS_STATUS, LOADING_TEXT } from '@/constants/analysis';

import Loading from './Loading';

export default function LoadingPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const { mutate: startAnalysis, isSuccess: isSuccessAnalysis } = useAnalysis();
  const {
    data: analysisStatus,
    isSuccess: isSuccessStatus,
    refetch: refetchStatus,
  } = useAnalysisStatus(params.id);

  useEffect(() => {
    startAnalysis(params.id);
  }, []);

  useEffect(() => {
    const pollingInterval = setInterval(() => {
      if (isSuccessAnalysis) refetchStatus();
    }, 6000);

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
    <main className="relative w-full h-full flex justify-center items-center">
      <Loading loopText={LOADING_TEXT} />
      <span className="absolute bottom-7.5 inline-block w-full text-center text-sm text-muted-300 underline underline-offset-3">
        결과 조회까지 평균 30초 정도의 시간이 소요됩니다.
      </span>
    </main>
  );
}
