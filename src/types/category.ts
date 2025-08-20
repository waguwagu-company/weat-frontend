import { TAG_STATUS } from '@/constants/category';

export type CategoryTagStatus = (typeof TAG_STATUS)[keyof typeof TAG_STATUS];

export interface CategoryTag {
  categoryTagId: number;
  categoryTagOrder: number;
  label: string;
  status: CategoryTagStatus;
}

export interface Category {
  title: string;
  categoryId: number;
  categoryOrder: number;
  tags: CategoryTag[];
  children: Category[];
}
