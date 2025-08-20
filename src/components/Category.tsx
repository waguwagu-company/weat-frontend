import { useState } from 'react';
import Image from 'next/image';
import { useCategoryStore } from '@/stores';
import SubCategory from '@/components/SubCategory';

import type { Category, CategoryTagStatus } from '@/types/category';

interface CategoryProps {
  category: Category;
  status: CategoryTagStatus;
}

function CategoryTitle({ categoryId, title }: Pick<Category, 'categoryId' | 'title'>) {
  const { getGoodTagCountPerCategory, getBadTagCountPerCategory } = useCategoryStore();

  const goodTagCounts = getGoodTagCountPerCategory();
  const badTagCounts = getBadTagCountPerCategory();

  return (
    <div className="flex items-center gap-1 mb-3">
      <h2 className="text-xl font-semibold">{title}</h2>
      <span
        className={`
            w-5 h-5 justify-center items-center rounded-sm
            bg-good text-white text-md font-semibold
            ${goodTagCounts[categoryId] === 0 ? 'hidden' : 'inline-flex'}    
        `}
      >
        {goodTagCounts[categoryId]}
      </span>
      <span
        className={`
            w-5 h-5 justify-center items-center rounded-sm
            bg-bad text-white text-center text-md font-semibold
            ${badTagCounts[categoryId] === 0 ? 'hidden' : 'inline-flex'}    
        `}
      >
        {badTagCounts[categoryId]}
      </span>
    </div>
  );
}

export default function Category({ category, status }: CategoryProps) {
  const [openSubCategoryId, setOpenSubCategoryId] = useState<number | null>(null);

  const handleSubCategoryClick = (subId: number) => {
    setOpenSubCategoryId((prev) => (prev === subId ? null : subId));
  };

  if (!category.children.length) {
    return (
      <article className="w-full px-5">
        <CategoryTitle categoryId={category.categoryId} title={category.title} />
        <SubCategory subCategory={category} status={status} />
      </article>
    );
  }

  return (
    <article className="w-full px-5">
      <CategoryTitle categoryId={category.categoryId} title={category.title} />

      <ul className="flex flex-wrap gap-2 pb-6">
        {category.children.map((sub) => (
          <li key={sub.categoryId} className="inline-flex flex-col items-center gap-2">
            <button
              type="button"
              className={`inline-flex items-center justify-center gap-2 px-3 py-2
                text-lg font-semibold whitespace-nowrap
                border bg-white rounded-sm transition-all outline-none cursor-pointer
                ${openSubCategoryId === sub.categoryId ? 'text-black border-black shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]' : 'text-muted-200 border-muted-200'}
              `}
              onClick={() => handleSubCategoryClick(sub.categoryId)}
            >
              {sub.title}
            </button>
            {openSubCategoryId === sub.categoryId && (
              <Image src="/images/icon-triangle-down.svg" alt="" width={9} height={8} />
            )}
          </li>
        ))}
      </ul>

      {openSubCategoryId && (
        <SubCategory
          subCategory={category.children.find((c) => c.categoryId === openSubCategoryId)!}
          status={status}
        />
      )}
    </article>
  );
}
