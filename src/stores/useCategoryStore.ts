import { create } from 'zustand';
import { TAG_STATUS, GOOD_MAX, BAD_MAX } from '@/constants/category';

import type { Category } from '@/types/category';

const categoryData: Category[] = [
  {
    title: '국가별',
    tags: [
      { label: '한식', status: TAG_STATUS.DEFAULT },
      { label: '일식', status: TAG_STATUS.DEFAULT },
      { label: '중식', status: TAG_STATUS.DEFAULT },
      { label: '양식', status: TAG_STATUS.DEFAULT },
      { label: '이탈리아음식', status: TAG_STATUS.DEFAULT },
      { label: '프랑스음식', status: TAG_STATUS.DEFAULT },
      { label: '스페인음식', status: TAG_STATUS.DEFAULT },
      { label: '아메리칸음식', status: TAG_STATUS.DEFAULT },
      { label: '유러피안음식', status: TAG_STATUS.DEFAULT },
      { label: '아시아음식', status: TAG_STATUS.DEFAULT },
      { label: '베트남음식', status: TAG_STATUS.DEFAULT },
      { label: '태국음식', status: TAG_STATUS.DEFAULT },
      { label: '인도음식', status: TAG_STATUS.DEFAULT },
      { label: '멕시코/남미음식', status: TAG_STATUS.DEFAULT },
      { label: '퓨전음식', status: TAG_STATUS.DEFAULT },
      { label: '기타 세계음식', status: TAG_STATUS.DEFAULT },
    ],
  },
  {
    title: '식당 형태',
    tags: [
      { label: '일반식당', status: TAG_STATUS.DEFAULT },
      { label: '파인다이닝', status: TAG_STATUS.DEFAULT },
      { label: '코스요리', status: TAG_STATUS.DEFAULT },
      { label: '한정식', status: TAG_STATUS.DEFAULT },
      { label: '뷔페', status: TAG_STATUS.DEFAULT },
      { label: '컨템포러리', status: TAG_STATUS.DEFAULT },
      { label: '술집', status: TAG_STATUS.DEFAULT },
    ],
  },
  {
    title: '음식 종류별 - 육류',
    tags: [
      { label: '소고기', status: TAG_STATUS.DEFAULT },
      { label: '돼지고기', status: TAG_STATUS.DEFAULT },
      { label: '닭고기', status: TAG_STATUS.DEFAULT },
      { label: '양고기', status: TAG_STATUS.DEFAULT },
      { label: '오리고기', status: TAG_STATUS.DEFAULT },
      { label: '스테이크', status: TAG_STATUS.DEFAULT },
      { label: '바베큐', status: TAG_STATUS.DEFAULT },
      { label: '족발/보쌈', status: TAG_STATUS.DEFAULT },
      { label: '곱창/막창', status: TAG_STATUS.DEFAULT },
    ],
  },
  {
    title: '음식 종류별 - 해물류',
    tags: [
      { label: '스시/초밥', status: TAG_STATUS.DEFAULT },
      { label: '회/사시미', status: TAG_STATUS.DEFAULT },
      { label: '게/랍스터', status: TAG_STATUS.DEFAULT },
      { label: '굴/조개', status: TAG_STATUS.DEFAULT },
      { label: '오마카세', status: TAG_STATUS.DEFAULT },
    ],
  },
  {
    title: '음식 종류별 - 메뉴',
    tags: [
      { label: '파스타', status: TAG_STATUS.DEFAULT },
      { label: '브런치', status: TAG_STATUS.DEFAULT },
      { label: '치킨', status: TAG_STATUS.DEFAULT },
      { label: '피자', status: TAG_STATUS.DEFAULT },
      { label: '돈가스', status: TAG_STATUS.DEFAULT },
      { label: '햄버거', status: TAG_STATUS.DEFAULT },
      { label: '샤브샤브', status: TAG_STATUS.DEFAULT },
      { label: '라멘', status: TAG_STATUS.DEFAULT },
      { label: '냉면', status: TAG_STATUS.DEFAULT },
      { label: '국수', status: TAG_STATUS.DEFAULT },
      { label: '찌개/전골', status: TAG_STATUS.DEFAULT },
      { label: '백반/가정식', status: TAG_STATUS.DEFAULT },
      { label: '분식', status: TAG_STATUS.DEFAULT },
      { label: '패스트푸드', status: TAG_STATUS.DEFAULT },
      { label: '도시락', status: TAG_STATUS.DEFAULT },
      { label: '국밥', status: TAG_STATUS.DEFAULT },
      { label: '비건', status: TAG_STATUS.DEFAULT },
      { label: '할랄', status: TAG_STATUS.DEFAULT },
    ],
  },
  {
    title: '주류',
    tags: [
      { label: '이자카야', status: TAG_STATUS.DEFAULT },
      { label: '와인', status: TAG_STATUS.DEFAULT },
      { label: '다이닝바', status: TAG_STATUS.DEFAULT },
      { label: '전통주', status: TAG_STATUS.DEFAULT },
      { label: '칵테일/위스키', status: TAG_STATUS.DEFAULT },
      { label: '맥주/호프', status: TAG_STATUS.DEFAULT },
      { label: '오뎅바', status: TAG_STATUS.DEFAULT },
      { label: '요리주점', status: TAG_STATUS.DEFAULT },
    ],
  },
];

interface CategoryState {
  categories: Category[];
  setTagGood: (_categoryTitle: string, _tagLabel: string) => void;
  setTagBad: (_categoryTitle: string, _tagLabel: string) => void;
  getGoodTagCount: () => number;
  getBadTagCount: () => number;
}

export const useCategoryStore = create<CategoryState>((set, get) => ({
  categories: categoryData,

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
