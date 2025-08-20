import { create } from 'zustand';
import {
  updateTagGood,
  updateTagBad,
  countTagsByStatus,
  countTagsByStatusPerCategory,
} from '@/lib/category';
import { TAG_STATUS } from '@/constants/category';

import type { Category } from '@/types/category';

interface CategoryState {
  categories: Category[];
  setCategories: (_categories: Category[]) => void;
  setTagGood: (_categoryId: number, _tagId: number) => void;
  setTagBad: (_categoryId: number, _tagId: number) => void;
  getGoodTagCount: () => number;
  getBadTagCount: () => number;
  getGoodTagCountPerCategory: () => Record<number, number>;
  getBadTagCountPerCategory: () => Record<number, number>;
}

export const useCategoryStore = create<CategoryState>((set, get) => ({
  categories: [],
  setCategories: (categories: Category[]) => set({ categories }),

  setTagGood: (categoryId, tagId) => {
    const goodCount = get().getGoodTagCount();

    set((state) => ({
      categories: updateTagGood(state.categories, categoryId, tagId, goodCount),
    }));
  },

  setTagBad: (categoryId, tagId) => {
    const badCount = get().getBadTagCount();

    set((state) => ({
      categories: updateTagBad(state.categories, categoryId, tagId, badCount),
    }));
  },

  getGoodTagCount: () => countTagsByStatus(get().categories, TAG_STATUS.GOOD),
  getBadTagCount: () => countTagsByStatus(get().categories, TAG_STATUS.BAD),

  getGoodTagCountPerCategory: () => countTagsByStatusPerCategory(get().categories, TAG_STATUS.GOOD),
  getBadTagCountPerCategory: () => countTagsByStatusPerCategory(get().categories, TAG_STATUS.BAD),
}));
