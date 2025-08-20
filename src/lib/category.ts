import { TAG_STATUS, GOOD_MAX, BAD_MAX } from '@/constants/category';

import type { Category, CategoryTagStatus } from '@/types/category';

export function updateTagGood(
  categories: Category[],
  categoryId: number,
  tagId: number,
  goodCount: number
): Category[] {
  return categories.map((category) => {
    if (category.categoryId === categoryId) {
      return {
        ...category,
        tags: category.tags.map((tag) => {
          if (tag.categoryTagId !== tagId) return tag;
          if (tag.status === TAG_STATUS.BAD) return tag;

          if (tag.status === TAG_STATUS.GOOD) {
            return { ...tag, status: TAG_STATUS.DEFAULT };
          }

          if (goodCount >= GOOD_MAX) return tag;

          return { ...tag, status: TAG_STATUS.GOOD };
        }),
      };
    }

    if (category.children.length > 0) {
      return {
        ...category,
        children: updateTagGood(category.children, categoryId, tagId, goodCount),
      };
    }

    return category;
  });
}

export function updateTagBad(
  categories: Category[],
  categoryId: number,
  tagId: number,
  badCount: number
): Category[] {
  return categories.map((category) => {
    if (category.categoryId === categoryId) {
      return {
        ...category,
        tags: category.tags.map((tag) => {
          if (tag.categoryTagId !== tagId) return tag;
          if (tag.status === TAG_STATUS.GOOD) return tag;

          if (tag.status === TAG_STATUS.BAD) {
            return { ...tag, status: TAG_STATUS.DEFAULT };
          }

          if (badCount >= BAD_MAX) return tag;

          return { ...tag, status: TAG_STATUS.BAD };
        }),
      };
    }

    if (category.children.length > 0) {
      return {
        ...category,
        children: updateTagBad(category.children, categoryId, tagId, badCount),
      };
    }

    return category;
  });
}

export function countTagsByStatus(categories: Category[], status: CategoryTagStatus): number {
  return categories.reduce((acc, category) => {
    const tagCount = category.tags.filter((t) => t.status === status).length;
    const childCount = countTagsByStatus(category.children, status);
    return acc + tagCount + childCount;
  }, 0);
}

export function countTagsByStatusPerCategory(
  categories: Category[],
  status: CategoryTagStatus
): Record<number, number> {
  const result: Record<number, number> = {};

  categories.forEach((category) => {
    const tagCount = category.tags.filter((t) => t.status === status).length;
    const childCount = countTagsByStatus(category.children, status);
    result[category.categoryId] = tagCount + childCount;
  });

  return result;
}
