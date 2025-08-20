import { create } from 'zustand';
import { TAG_STATUS } from '@/constants/category';

import type { AnalysisSettings, LocationSetting, CategorySetting } from '@/types/analysis';
import type { Category } from '@/types/category';

interface AnalysisState extends AnalysisSettings {
  setMemberId: (_memberId: number) => void;
  setLocation: (_address: string) => void;
  setPreference: (_categories: Category[]) => void;
  setFreewriting: (_prompt: string) => void;
  getSettings: () => AnalysisSettings;
  resetSettings: () => void;
}

const defaultLocationSetting: LocationSetting = { roadnameAddress: '서울특별시 중구 세종대로 110' };

export const useAnalysisStore = create<AnalysisState>((set, get) => ({
  memberId: 0,
  locationSetting: defaultLocationSetting,
  categorySettingList: [],
  textInputSetting: { inputText: '' },

  setMemberId: (memberId: number) => set({ memberId }),

  setLocation: (address: string) => {
    const setting: LocationSetting = !address
      ? defaultLocationSetting
      : { roadnameAddress: address };

    set({ locationSetting: setting });
  },

  setPreference: (categories: Category[]) => {
    const settings: CategorySetting[] = categories.flatMap((category) =>
      category.tags
        .filter((tag) => tag.status !== TAG_STATUS.DEFAULT)
        .map((tag) => ({
          categoryTagId: tag.categoryTagId,
          isPreferred: tag.status === TAG_STATUS.GOOD,
        }))
    );

    set({ categorySettingList: settings });
  },

  setFreewriting: (prompt: string) => set({ textInputSetting: { inputText: prompt } }),

  getSettings: () => {
    return {
      memberId: get().memberId,
      locationSetting: get().locationSetting,
      categorySettingList: get().categorySettingList,
      textInputSetting: get().textInputSetting,
    };
  },

  resetSettings: () =>
    set({
      memberId: 0,
      locationSetting: defaultLocationSetting,
      categorySettingList: [],
      textInputSetting: { inputText: '' },
    }),
}));
