import axiosInstance from '@/lib/axiosInstance';

import type { ApiResponse } from '@/types/api';
import type { PlaceResult } from '@/types/analysis';

interface CreateGroupResponse {
  groupId: string;
  memberId: number;
}

interface JoinGroupResponse {
  memberId: number;
}

interface GroupResultsResponse {
  groupResultDetailList: PlaceResult[];
}

/** 그룹 생성 */
export const createGroup = async (isSingleMemberGroup: boolean) => {
  const request = { isSingleMemberGroup };
  const response = await axiosInstance.post<ApiResponse<CreateGroupResponse>>(
    `/api/group`,
    request
  );

  return response.data;
};

/** 그룹 참여 */
export const joinGroup = async (groupId: string) => {
  const response = await axiosInstance.post<ApiResponse<JoinGroupResponse>>(
    `/api/group/${groupId}/members`
  );

  return response.data;
};

/** 그룹별 분석 결과 조회 */
export const getGroupResults = async (groupId: string) => {
  const response = await axiosInstance.post<ApiResponse<GroupResultsResponse>>(
    `/api/group/${groupId}/result`
  );

  return response.data;
};
