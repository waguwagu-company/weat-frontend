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

/** 분석 시작 요청 */
export const startAnalysis = async (groupId: string) => {
  const request = { groupId };
  const response = await axiosInstance.post<ApiResponse<StartAnalysisResponse>>(
    `/api/analysis`,
    request
  );

  return response.data;
};

/** 분석 설정 제출 */
export const submitAnalysisSettings = async (settings: AnalysisSettings) => {
  const response = await axiosInstance.post<ApiResponse<SubmitAnalysisSettingResponse>>(
    `/api/analysis/settings`,
    settings
  );

  return response.data;
};

/** 그룹별 분석 상태 조회 */
export const getAnalysisStatus = async (groupId: string) => {
  const response = await axiosInstance.get<ApiResponse<AnalysisStatusResponse>>(
    `/api/analysis/status?groupId=${groupId}`
  );

  return response.data;
};

/** 멤버별 분석 설정 제출 여부 조회 */
export const getAnalysisSettingStatus = async (memberId: number) => {
  const response = await axiosInstance.get<ApiResponse<AnalysisSettingStatusResponse>>(
    `/api/analysis/settings/status?memberId=${memberId}`
  );

  return response.data;
};
