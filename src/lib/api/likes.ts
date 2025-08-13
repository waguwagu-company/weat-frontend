import axiosInstance from '@/lib/axiosInstance';

import type { ApiResponse } from '@/types/api';

interface GetLikesResponse {
  analysisResultDetailId: number;
  likeCount: number;
}

interface LikeResponse {
  analysisResultDetailId: number;
  memberId: number;
  isLiked: boolean;
}

export const getLikes = async (analysisResultDetailId: number) => {
  const response = await axiosInstance.get<ApiResponse<GetLikesResponse>>(
    `/api/analysis/likes?analysisDetailId=${analysisResultDetailId}`
  );

  return response.data;
};

export const toggleLike = async (analysisResultDetailId: number, memberId: number) => {
  const request = { analysisResultDetailId, memberId };
  const response = await axiosInstance.post<ApiResponse<LikeResponse>>(
    `/api/analysis/likes`,
    request
  );

  return response.data;
};

export const getLikeStatus = async (analysisResultDetailId: number, memberId: number) => {
  const response = await axiosInstance.get<ApiResponse<LikeResponse>>(
    `/api/analysis/likes/status?analysisResultDetailId=${analysisResultDetailId}&memberId=${memberId}`
  );

  return response.data;
};
