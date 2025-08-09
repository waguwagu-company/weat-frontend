'use client';

import { useRouter, useParams } from 'next/navigation';
import { useCategoryStore } from '@/stores';
import CategoryBox from '@/components/category';
import { Button } from '@/components/ui/button';
import { TAG_STATUS, BAD_MAX } from '@/constants/category';

export default function CategoryDislikePage() {
  const router = useRouter();
  const params = useParams<{ uuid: string }>();
  const { categories, setTagBad, getBadTagCount } = useCategoryStore();

  const tagCount = getBadTagCount();

  const saveDislike = () => {
    router.push(`/${params.uuid}/prompt`);
  };

  return (
    <div className="h-full overflow-y-scroll px-5 py-7">
      <section className="flex flex-col gap-6">
        {categories.map((category) => (
          <CategoryBox
            key={category.categoryId}
            title={category.title}
            categoryId={category.categoryId}
            tags={category.tags}
            status={TAG_STATUS.GOOD}
            handlerClick={setTagBad}
          />
        ))}
      </section>
      <Button variant="primary" className="mt-7" disabled={tagCount === 0} onClick={saveDislike}>
        {tagCount === 0
          ? `${BAD_MAX}개까지 선택할 수 있어요. (${tagCount}/${BAD_MAX})`
          : `다 선택했어요. (${tagCount}/${BAD_MAX})`}
      </Button>
    </div>
  );
}
