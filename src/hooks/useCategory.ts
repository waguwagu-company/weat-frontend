import { useQuery } from '@tanstack/react-query';
import { getCategories } from '@/lib/api/category';

export const useCategories = () => {
  return useQuery({
    queryKey: ['getCategories'],
    queryFn: getCategories,
    select: (data) => {
      return data.categoryList;
    },
  });
};
