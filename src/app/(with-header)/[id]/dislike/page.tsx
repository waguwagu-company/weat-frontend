'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useCategoryStore, useAnalysisStore } from '@/stores';
import Category from '@/components/Category';
import { Button } from '@/components/ui/button';
import { TAG_STATUS, BAD_MAX } from '@/constants/category';

export default function CategoryDislikePage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { categories, setCategories, getBadTagCount } = useCategoryStore();
  const { setPreference } = useAnalysisStore();

  const tagCount = getBadTagCount();

  const saveDislike = () => {
    setPreference(categories);
    router.push(`/${params.id}/prompt`);
  };

  useEffect(() => {
    if (!categories.length) router.push(`/${params.id}/like`);
  }, [categories.length, params.id]);

  return (
    <div className="h-full flex flex-col justify-between">
      <section className="w-full h-full mt-7 flex flex-col gap-11 overflow-y-auto scroll-smooth snap-y">
        {categories.map((category) => (
          <Category key={category.categoryId} category={category} status={TAG_STATUS.BAD} />
        ))}
      </section>

      <div className="w-full h-fit px-5 py-7">
        <Button variant="primary" disabled={tagCount === 0} onClick={saveDislike}>
          {tagCount === 0
            ? `${BAD_MAX}개까지 선택할 수 있어요. (${tagCount}/${BAD_MAX})`
            : `다 선택했어요. (${tagCount}/${BAD_MAX})`}
        </Button>
      </div>
    </div>
  );
}
