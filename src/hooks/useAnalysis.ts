import { useMutation, useQuery } from '@tanstack/react-query';
import {
  startAnalysis,
  submitAnalysisSettings,
  getAnalysisStatus,
  getAnalysisSettingStatus,
} from '@/lib/api/analysis';
import { useAnalysisStore } from '@/stores';

export const useAnalysis = () => {
  return useMutation({
    mutationKey: ['startAnalysis'],
    mutationFn: startAnalysis,
  });
};

export const useAnalysisSettings = () => {
  const settings = useAnalysisStore.getState().getSettings();

  return useMutation({
    mutationKey: ['submitAnalysisSettings'],
    mutationFn: () => submitAnalysisSettings(settings),
  });
};

export const useAnalysisStatus = (groupId: string) => {
  return useQuery({
    queryKey: ['getAnalysisStatus', groupId],
    queryFn: () => getAnalysisStatus(groupId),
  });
};

export const useAnalysisSettingStatus = (memberId: number) => {
  return useQuery({
    queryKey: ['getAnalysisSettingStatus', memberId],
    queryFn: () => getAnalysisSettingStatus(memberId),
  });
};
