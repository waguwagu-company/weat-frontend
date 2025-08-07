import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const chipVariants = cva(
  'inline-flex items-center justify-center gap-2 text-md font-semibold whitespace-nowrap border bg-background rounded-sm transition-all outline-none cursor-pointer disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'text-muted-medium border-muted-medium',
        good: 'text-good border-good',
        bad: 'text-bad border-bad',
      },
      size: {
        default: 'w-fit h-fit px-[8px] py-[4px]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

function Chip({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof chipVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(chipVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Chip };
