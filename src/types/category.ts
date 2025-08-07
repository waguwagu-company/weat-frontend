import { TAG_STATUS } from '@/constants/category';

interface Tag {
  label: string;
  status: (typeof TAG_STATUS)[keyof typeof TAG_STATUS];
}

export interface Category {
  title: string;
  tags: Tag[];
}
