import axiosInstance from '@/lib/axiosInstance';

import type { ApiResponse } from '@/types/api';
import type { AnalysisStatus, AnalysisSettings } from '@/types/analysis';

interface StartAnalysisResponse {
  groupId: string;
  analysisId: number;
  analysisStatus: AnalysisStatus;
}

interface SubmitAnalysisSettingResponse {
  memberId: number;
  analysisSettingId: number;
}

interface AnalysisStatusResponse {
  groupId: string;
  submittedCount: number;
  isSingleMemberGroup: boolean;
  isAnalysisStartConditionSatisfied: boolean;
  analysisStatus: AnalysisStatus;
}

interface AnalysisSettingStatusResponse {
  groupId: string;
  memberId: number;
  isSubmitted: boolean;
}

export const startAnalysis = async (groupId: string) => {
  const request = { groupId };
  const response = await axiosInstance.post<ApiResponse<StartAnalysisResponse>>(
    `/api/analysis`,
    request
  );

  return response.data;
};

export const submitAnalysisSettings = async (settings: AnalysisSettings) => {
  const response = await axiosInstance.post<ApiResponse<SubmitAnalysisSettingResponse>>(
    `/api/analysis/settings`,
    settings
  );

  return response.data;
};

export const getAnalysisStatus = async (groupId: string) => {
  const response = await axiosInstance.get<ApiResponse<AnalysisStatusResponse>>(
    `/api/analysis/status?groupId=${groupId}`
  );

  return response.data;
};

export const getAnalysisSettingStatus = async (memberId: number) => {
  const response = await axiosInstance.get<ApiResponse<AnalysisSettingStatusResponse>>(
    `/api/analysis/settings/status?memberId=${memberId}`
  );

  return response.data;
};
