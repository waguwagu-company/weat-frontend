import axiosInstance from '@/lib/axiosInstance';

import type { Category } from '@/types/category';

type CategoriesResponse = { categoryList: Category[] };

export const getCategories = async () => {
  const response = await axiosInstance.post<CategoriesResponse>(`/api/categories`);
  return response.data;
};
