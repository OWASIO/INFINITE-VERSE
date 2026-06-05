import React from 'react';
import { cn } from '@/components/lib/utils';

const variantClass = {
  default: 'bg-primary text-primary-foreground hover:bg-primary/90',
  outline: 'border border-border bg-transparent hover:bg-white/5',
  ghost: 'hover:bg-white/5',
};

export function Button({ className, variant = 'default', type = 'button', ...props }) {
  return (
    <button
      type={type}
      className={cn('inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition disabled:pointer-events-none disabled:opacity-50', variantClass[variant] || variantClass.default, className)}
      {...props}
    />
  );
}
