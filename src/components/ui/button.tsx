import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 w-full text-lg font-semibold whitespace-nowrap border rounded-lg shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] transition-all disabled:pointer-events-none disabled:border-muted-light disabled:bg-background disabled:text-muted-medium [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer",
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground rounded-md',
        outline: 'border-background bg-transparent text-background rounded-md',
        primary: 'border-foreground bg-primary text-background',
        secondary: 'border-muted-dark bg-background text-foreground',
        gradient: 'relative z-0 border-gradient bg-muted-medium text-background',
      },
      size: {
        default: 'h-fit p-4',
        round: 'h-fit p-2 rounded-full',
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
