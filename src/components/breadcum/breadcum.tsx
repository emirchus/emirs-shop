import { cn } from '@/lib';
import Link from 'next/link';
import React from 'react';

interface Props {
  paths: {
    name: string;
    href: string;
  }[];
}

export const Breadcum = ({ paths }: Props) => {
  return (
    <div className='flex items-center space-x-2 text-sm text-gray-500'>
      {paths.map((path, index) => (
        <div key={path.href} className='flex flex-row items-center justify-start'>
          <Link
            className={cn('hover:underline line-clamp-1', {
              'text-accent-foreground': index === paths.length - 1
            })}
            href={path.href}
            passHref={true}
            prefetch={false}
            shallow={true}
            aria-label='breadcrumb'
          >
            {path.name}
          </Link>
          {index !== paths.length - 1 && <span className='ml-2 text-xs'>{'>'}</span>}
        </div>
      ))}
    </div>
  );
};
