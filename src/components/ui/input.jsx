import React from 'react';
import { cn } from '@/components/lib/utils';

export function Input({ className, ...props }) {
  return (
    <input
      className={cn('w-full rounded-md border border-input bg-white/5 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40', className)}
      {...props}
    />
  );
}
