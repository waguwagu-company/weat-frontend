import { useCategoryStore } from '@/stores';
import { Chip } from '@/components/ui/chip';
import { TAG_STATUS } from '@/constants/category';

import type { Category, CategoryTagStatus } from '@/types/category';

interface SubCategoryProps {
  parentId?: number;
  subCategory: Category;
  status: CategoryTagStatus;
}

export default function SubCategory({ subCategory, status }: SubCategoryProps) {
  const { setTagGood, setTagBad } = useCategoryStore();

  const isDisabled = (tagStatus: CategoryTagStatus) => {
    switch (status) {
      case TAG_STATUS.GOOD:
        return tagStatus === TAG_STATUS.BAD;
      case TAG_STATUS.BAD:
        return tagStatus === TAG_STATUS.GOOD;
      default:
        return false;
    }
  };

  const updateTagStatus = (categoryId: number, categoryTagId: number) => {
    switch (status) {
      case TAG_STATUS.GOOD:
        setTagGood(categoryId, categoryTagId);
        break;
      case TAG_STATUS.BAD:
        setTagBad(categoryId, categoryTagId);
        break;
      default:
        return;
    }
  };

  return (
    <ul className="flex flex-wrap gap-2">
      {subCategory.tags.map((tag) => (
        <li key={tag.categoryTagId}>
          <Chip
            variant={tag.status}
            disabled={isDisabled(tag.status)}
            onClick={() => updateTagStatus(subCategory.categoryId, tag.categoryTagId)}
          >
            {tag.label}
          </Chip>
        </li>
      ))}
    </ul>
  );
}
