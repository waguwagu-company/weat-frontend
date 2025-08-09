'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useCategoryStore } from '@/stores';
import CategoryBox from '@/components/category';
import { Button } from '@/components/ui/button';
import { TAG_STATUS, GOOD_MAX } from '@/constants/category';

export default function CategoryLikePage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { categories, fetchCategories, setTagGood, getGoodTagCount } = useCategoryStore();

  const tagCount = getGoodTagCount();

  const saveLike = () => {
    router.push(`/${params.id}/dislike`);
  };

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <div className="h-full overflow-y-scroll px-5 py-7">
      <section className="flex flex-col gap-6">
        {categories.map((category) => (
          <CategoryBox
            key={category.categoryId}
            title={category.title}
            categoryId={category.categoryId}
            tags={category.tags}
            status={TAG_STATUS.BAD}
            handlerClick={setTagGood}
          />
        ))}
      </section>
      <Button variant="primary" className="mt-7" disabled={tagCount === 0} onClick={saveLike}>
        {tagCount === 0
          ? `${GOOD_MAX}개까지 선택할 수 있어요. (${tagCount}/${GOOD_MAX})`
          : `다 선택했어요. (${tagCount}/${GOOD_MAX})`}
      </Button>
    </div>
  );
}
