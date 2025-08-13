import { create } from 'zustand';
import { DEFAULT_POSITION } from '@/constants/location';
import { TAG_STATUS } from '@/constants/category';

import type { AnalysisSettings, LocationSetting, CategorySetting } from '@/types/analysis';
import type { MapLatLng } from '@/types/googlemaps';
import type { Category } from '@/types/category';

interface AnalysisState extends AnalysisSettings {
  setMemberId: (_memberId: number) => void;
  setLocation: (_position: MapLatLng) => void;
  setPreference: (_categories: Category[]) => void;
  setFreewriting: (_prompt: string) => void;
  getSettings: () => AnalysisSettings;
  resetSettings: () => void;
}

const defaultLocationSetting: LocationSetting = {
  xPosition: DEFAULT_POSITION?.lat as number,
  yPosition: DEFAULT_POSITION?.lng as number,
};

export const useAnalysisStore = create<AnalysisState>((set, get) => ({
  memberId: 0,
  locationSetting: defaultLocationSetting,
  categorySettingList: [],
  textInputSetting: { inputText: '' },

  setMemberId: (memberId: number) => set({ memberId }),

  setLocation: (position: MapLatLng) => {
    const setting: LocationSetting =
      !position || typeof position.lat !== 'number' || typeof position.lng !== 'number'
        ? defaultLocationSetting
        : { xPosition: position.lat, yPosition: position.lng };

    set({ locationSetting: setting });
  },

  setPreference: (categories: Category[]) => {
    const settings: CategorySetting[] = categories.flatMap((category) =>
      category.tags
        .filter((tag) => tag.status !== TAG_STATUS.DEFAULT)
        .map((tag) => ({
          categoryId: category.categoryId,
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
