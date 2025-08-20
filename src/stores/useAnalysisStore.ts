import { create } from 'zustand';
import { DEFAULT_LOCATION, FALLBACK_LOCATION } from '@/constants/location';
import { TAG_STATUS } from '@/constants/category';

import type { AnalysisSettings, LocationSetting, CategorySetting } from '@/types/analysis';
import type { Category } from '@/types/category';

interface AnalysisState extends AnalysisSettings {
  setMemberId: (_memberId: number) => void;
  setLocation: (_address: string | undefined) => void;
  resetLocation: () => void;
  setPreference: (_categories: Category[]) => void;
  setFreewriting: (_prompt: string) => void;
  getSettings: () => AnalysisSettings;
  resetSettings: () => void;
}

export const useAnalysisStore = create<AnalysisState>((set, get) => ({
  memberId: 0,
  locationSetting: DEFAULT_LOCATION,
  categorySettingList: [],
  textInputSetting: { inputText: '' },

  setMemberId: (memberId: number) => set({ memberId }),

  setLocation: (address: string | undefined) => {
    const legacyAddress = get().locationSetting.roadnameAddress;

    if (!address && !legacyAddress) {
      set({ locationSetting: FALLBACK_LOCATION });
    }

    const setting: LocationSetting = { roadnameAddress: !address ? legacyAddress : address };
    set({ locationSetting: setting });
  },

  resetLocation: () => set({ locationSetting: DEFAULT_LOCATION }),

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
      locationSetting: DEFAULT_LOCATION,
      categorySettingList: [],
      textInputSetting: { inputText: '' },
    }),
}));
