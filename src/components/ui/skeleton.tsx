import { cn } from '@/lib/utils';

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-primary/50 ring-2 ring-ring', className)}
      {...props}
    />
  );
}

export { Skeleton };
