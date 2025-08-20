'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useCategoryStore } from '@/stores';
import { useCategories } from '@/hooks/useCategory';
import Category from '@/components/Category';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { TAG_STATUS, GOOD_MAX } from '@/constants/category';

export default function CategoryLikePage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { categories, setCategories, getGoodTagCount } = useCategoryStore();
  const { data, isFetching, isSuccess, isError } = useCategories();

  const tagCount = getGoodTagCount();

  const saveLike = () => {
    router.push(`/${params.id}/dislike`);
  };

  useEffect(() => {
    if (isSuccess && data) setCategories(data);
  }, [isSuccess, data]);

  if (isFetching || isError) return <LoadingSpinner />;

  return (
    <div className="h-full flex flex-col justify-between">
      <section className="w-full h-full mt-7 flex flex-col gap-11 overflow-y-auto scroll-smooth snap-y">
        {categories.map((category) => (
          <Category key={category.categoryId} category={category} status={TAG_STATUS.GOOD} />
        ))}
      </section>

      <div className="w-full h-fit px-5 py-7">
        <Button variant="primary" disabled={tagCount === 0} onClick={saveLike}>
          {tagCount === 0
            ? `${GOOD_MAX}개까지 선택할 수 있어요. (${tagCount}/${GOOD_MAX})`
            : `다 선택했어요. (${tagCount}/${GOOD_MAX})`}
        </Button>
      </div>
    </div>
  );
}
