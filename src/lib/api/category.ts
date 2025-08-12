import axiosInstance from '@/lib/axiosInstance';

import type { Category } from '@/types/category';

type CategoriesResponse = { categoryList: Category[] };

/** 카테고리 목록 조회 */
export const getCategories = async () => {
  const response = await axiosInstance.get<CategoriesResponse>(`/api/categories`);
  return response.data;
};
