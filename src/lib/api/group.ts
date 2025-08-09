import axiosInstance from '@/lib/axiosInstance';

import type { ApiResponse } from '@/types/api';
import type { Group } from '@/types/group';
import type { PlaceResult } from '@/types/place';

type CreateGroupResponse = Omit<Group, 'isSingleMemberGroup'>;
type JoinGroupResponse = Pick<Group, 'memberId'>;
type GroupResultsResponse = { groupResultDetailList: PlaceResult[] };

export const createGroup = async (isSingleMemberGroup: boolean) => {
  const response = await axiosInstance.post<ApiResponse<CreateGroupResponse>>(`/api/group`, {
    isSingleMemberGroup,
  });

  return response.data;
};

export const joinGroup = async (groupId: string) => {
  const response = await axiosInstance.post<ApiResponse<JoinGroupResponse>>(
    `/api/group/${groupId}/members`
  );

  return response.data;
};

export const getGroupResults = async (groupId: string) => {
  const response = await axiosInstance.post<ApiResponse<GroupResultsResponse>>(
    `/api/group/${groupId}/result`
  );

  return response.data;
};
