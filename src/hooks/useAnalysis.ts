import { useMutation, useQuery } from '@tanstack/react-query';
import {
  startAnalysis,
  submitAnalysisSettings,
  getAnalysisStatus,
  getAnalysisSettingStatus,
  validatePrompt,
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
    select: (response) => {
      return response.data;
    },
    staleTime: 0,
    refetchOnMount: true,
  });
};

export const useAnalysisSettingStatus = () => {
  const memberId = useAnalysisStore.getState().memberId;

  return useQuery({
    queryKey: ['getAnalysisSettingStatus', memberId],
    queryFn: () => getAnalysisSettingStatus(memberId),
    select: (response) => {
      return response.data;
    },
    enabled: memberId > 0,
    staleTime: 0,
    refetchOnMount: true,
  });
};

export const useValidatePrompt = () => {
  return useMutation({
    mutationKey: ['validatePrompt'],
    mutationFn: validatePrompt,
  });
};
