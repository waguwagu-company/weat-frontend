import { useMutation } from '@tanstack/react-query';
import { createGroup, joinGroup, getGroupResults } from '@/lib/api/group';

export const useCreateGroup = () => {
  return useMutation({
    mutationKey: ['createGroup'],
    mutationFn: createGroup,
    onSuccess: (data) => {
      const groupId = data.data.groupId;
      const memberId = data.data.memberId;

      localStorage.setItem('groupId', groupId);
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
