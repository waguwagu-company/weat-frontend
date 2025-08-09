import { useMutation } from '@tanstack/react-query';
import { createGroup, joinGroup, getGroupResults } from '@/lib/api/group';
import { useAnalysisStore } from '@/stores';

export const useCreateGroup = () => {
  return useMutation({
    mutationKey: ['createGroup'],
    mutationFn: createGroup,
    onSuccess: (data) => {
      const memberId = data.data.memberId;

      useAnalysisStore.setState({ memberId });
      localStorage.setItem('memberId', memberId.toString());

      return data;
    },
  });
};

export const useJoinGroup = () => {
  return useMutation({
    mutationKey: ['joinGroup'],
    mutationFn: joinGroup,
    onSuccess: (data) => {
      const memberId = data.data.memberId;

      useAnalysisStore.setState({ memberId });
      localStorage.setItem('memberId', memberId.toString());

      return data;
    },
  });
};

export const useGetGroupResults = () => {
  return useMutation({
    mutationKey: ['getGroupResults'],
    mutationFn: getGroupResults,
  });
};
