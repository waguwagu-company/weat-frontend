import { useQuery } from '@tanstack/react-query';
import { getCategories } from '@/lib/api/category';
import { useCategoryStore } from '@/stores';

export const useCategories = () => {
  return useQuery({
    queryKey: ['getCategories'],
    queryFn: getCategories,
    select: (data) => {
      const categories = data.categoryList;

      useCategoryStore.getState().setCategories(categories);

      return categories;
    },
  });
};
