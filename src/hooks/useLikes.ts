import { useQuery, useMutation } from '@tanstack/react-query';
import { getLikes, toggleLike, getLikeStatus } from '@/lib/api/likes';
import { useAnalysisStore } from '@/stores';

export const useGetLikes = (analysisResultDetailId: number) => {
  return useQuery({
    queryKey: ['getLikes', analysisResultDetailId],
    queryFn: () => getLikes(analysisResultDetailId),
    select: (response) => {
      return response.data.likeCount;
    },
    enabled: analysisResultDetailId > 0,
  });
};

export const useToggleLike = (analysisResultDetailId: number) => {
  const memberId = useAnalysisStore.getState().memberId;

  return useMutation({
    mutationKey: ['toggleLike', analysisResultDetailId, memberId],
    mutationFn: () => toggleLike(analysisResultDetailId, memberId),
  });
};

export const useGetLikeStatus = (analysisResultDetailId: number) => {
  const memberId = useAnalysisStore.getState().memberId;

  return useQuery({
    queryKey: ['getLikeStatus', analysisResultDetailId, memberId],
    queryFn: () => getLikeStatus(analysisResultDetailId, memberId),
    select: (response) => {
      return response.data.isLiked;
    },
    enabled: analysisResultDetailId > 0 && memberId > 0,
  });
};
