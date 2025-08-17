import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 w-full text-lg font-semibold whitespace-nowrap border rounded-lg shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] transition-all disabled:pointer-events-none disabled:border-muted-100 disabled:bg-background disabled:text-muted-200 shrink-0 outline-none cursor-pointer',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground rounded-md',
        outline: 'border-background bg-transparent text-background rounded-md',
        primary: 'border-foreground bg-primary text-background',
        secondary: 'border-muted-300 bg-background text-foreground',
        gradient: 'border-none relative z-0 border-gradient bg-muted-200 text-background',
      },
      size: {
        default: 'h-fit p-4',
        round: 'w-[72px] h-[72px] rounded-full text-md',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

function Button({
  className,
  variant,
  size,
  disabled,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={disabled}
      {...props}
    />
  );
}

export { Button, buttonVariants };
