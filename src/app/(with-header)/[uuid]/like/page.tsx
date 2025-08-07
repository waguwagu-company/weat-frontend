'use client';

import { useCategoryStore } from '@/stores';
import { Chip } from '@/components/ui/chip';
import { Button } from '@/components/ui/button';
import { GOOD_MAX } from '@/constants/category';

import type { Category } from '@/types/category';

function CategoryBox({ title, tags }: Category) {
  const { setTagGood } = useCategoryStore();

  return (
    <article>
      <h3 className="text-lg font-semibold pb-2">{title}</h3>
      <ul className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <li key={tag.label}>
            <Chip variant={tag.status} onClick={() => setTagGood(title, tag.label)}>
              {tag.label}
            </Chip>
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function CategoryLikePage() {
  const { categories, getGoodTagCount } = useCategoryStore();

  const tagCount = getGoodTagCount();

  return (
    <div className="h-full overflow-y-scroll px-5 py-7">
      <section className="flex flex-col gap-6">
        {categories.map((category) => (
          <CategoryBox key={category.title} title={category.title} tags={category.tags} />
        ))}
      </section>
      <Button variant="primary" className="mt-7" disabled={tagCount === 0}>
        {tagCount === 0
          ? `${GOOD_MAX}개까지 선택할 수 있어요.`
          : `다 선택했어요. (${tagCount}/${GOOD_MAX})`}
      </Button>
    </div>
  );
}
