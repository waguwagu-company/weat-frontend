import { create } from 'zustand';

interface GroupState {
  isSingle: boolean;
  setIsSingle: (_isSingle: boolean) => void;
}

export const useGroupStore = create<GroupState>((set) => ({
  isSingle: true,
  setIsSingle: (isSingle: boolean) => set({ isSingle }),
}));
