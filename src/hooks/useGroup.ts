import { useMutation } from '@tanstack/react-query';
import { createGroup, joinGroup, getGroupResults } from '@/lib/api/group';
import { useAnalysisStore } from '@/stores';

export const useCreateGroup = () => {
  return useMutation({
    mutationKey: ['createGroup'],
    mutationFn: createGroup,
    onSuccess: (response) => {
      const memberId = response.data.memberId;

      useAnalysisStore.setState({ memberId });
      localStorage.setItem('memberId', memberId.toString());

      return response.data;
    },
  });
};

export const useJoinGroup = () => {
  return useMutation({
    mutationKey: ['joinGroup'],
    mutationFn: joinGroup,
    onSuccess: (response) => {
      const memberId = response.data.memberId;

      useAnalysisStore.setState({ memberId });
      localStorage.setItem('memberId', memberId.toString());

      return response.data;
    },
  });
};

export const useGetGroupResults = () => {
  return useMutation({
    mutationKey: ['getGroupResults'],
    mutationFn: getGroupResults,
  });
};
