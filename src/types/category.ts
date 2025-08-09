import { TAG_STATUS } from '@/constants/category';

export interface Tag {
  label: string;
  categoryTagId: number;
  categoryTagOrder: number;
  status: (typeof TAG_STATUS)[keyof typeof TAG_STATUS];
}

export interface Category {
  title: string;
  categoryId: number;
  categoryOrder: number;
  tags: Tag[];
}
