import { Chip } from '@/components/ui/chip';

import type { Category, Tag } from '@/types/category';

type CategoryProps = Pick<Category, 'title' | 'categoryId' | 'tags'> &
  Pick<Tag, 'status'> & {
    handlerClick: (_categoryId: number, _tagId: number) => void;
  };

export default function CategoryBox({
  title,
  categoryId,
  tags,
  status,
  handlerClick,
}: CategoryProps) {
  return (
    <article className="snap-start">
      <h3 className="text-lg font-semibold pb-2">{title}</h3>
      <ul className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <li key={tag.categoryTagId}>
            <Chip
              variant={tag.status}
              disabled={tag.status === status}
              onClick={() => handlerClick(categoryId, tag.categoryTagId)}
            >
              {tag.label}
            </Chip>
          </li>
        ))}
      </ul>
    </article>
  );
}
