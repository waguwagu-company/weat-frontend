import { create } from 'zustand';
import { getCategories } from '@/lib/api/category';
import { TAG_STATUS, GOOD_MAX, BAD_MAX } from '@/constants/category';

import type { Category } from '@/types/category';

interface CategoryState {
  categories: Category[];
  setCategories: (_categories: Category[]) => void;
  fetchCategories: () => Promise<void>;
  setTagGood: (_categoryTitle: string, _tagLabel: string) => void;
  setTagBad: (_categoryTitle: string, _tagLabel: string) => void;
  getGoodTagCount: () => number;
  getBadTagCount: () => number;
}

export const useCategoryStore = create<CategoryState>((set, get) => ({
  categories: [],
  setCategories: (categories: Category[]) => set({ categories }),
  fetchCategories: async () => {
    const response = await getCategories();
    set({ categories: response.categoryList });
  },

  setTagGood: (categoryTitle, tagLabel) => {
    const goodCount = get().getGoodTagCount();

    set((state) => {
      return {
        categories: state.categories.map((category) => {
          if (category.title !== categoryTitle) return category;

          return {
            ...category,
            tags: category.tags.map((tag) => {
              if (tag.label !== tagLabel) return tag;
              if (tag.status === TAG_STATUS.BAD) return tag;

              if (tag.status === TAG_STATUS.GOOD) {
                return {
                  ...tag,
                  status: TAG_STATUS.DEFAULT,
                };
              }

              if (goodCount >= GOOD_MAX) return tag;

              return {
                ...tag,
                status: TAG_STATUS.GOOD,
              };
            }),
          };
        }),
      };
    });
  },

  getGoodTagCount: () => {
    return get().categories.reduce((acc, category) => {
      return acc + category.tags.filter((tag) => tag.status === TAG_STATUS.GOOD).length;
    }, 0);
  },

  setTagBad: (categoryTitle, tagLabel) => {
    const badCount = get().getBadTagCount();

    set((state) => {
      return {
        categories: state.categories.map((category) => {
          if (category.title !== categoryTitle) return category;

          return {
            ...category,
            tags: category.tags.map((tag) => {
              if (tag.label !== tagLabel) return tag;
              if (tag.status === TAG_STATUS.GOOD) return tag;

              if (tag.status === TAG_STATUS.BAD) {
                return {
                  ...tag,
                  status: TAG_STATUS.DEFAULT,
                };
              }

              if (badCount >= BAD_MAX) return tag;

              return {
                ...tag,
                status: TAG_STATUS.BAD,
              };
            }),
          };
        }),
      };
    });
  },

  getBadTagCount: () => {
    return get().categories.reduce((acc, category) => {
      return acc + category.tags.filter((tag) => tag.status === TAG_STATUS.BAD).length;
    }, 0);
  },
}));
