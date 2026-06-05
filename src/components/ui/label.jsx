import React from 'react';
import { cn } from '@/components/lib/utils';

export function Label({ className, ...props }) {
  return <label className={cn('text-sm font-medium text-foreground', className)} {...props} />;
}
