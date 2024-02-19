'use client';
import { cn } from '@/lib';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useMemo } from 'react';

interface Props {
  paths?: {
    name: string;
    href: string;
  }[];
}

export const Breadcum = ({ paths }: Props) => {
  const pathname = usePathname();

  const pathList = useMemo(() => {
    const pathSegments = pathname.split('/').filter(Boolean);

    return [
      {
        name: 'Home',
        href: '/'
      },
      ...pathSegments.map((path, index) => {
        const href = `/${pathSegments.slice(0, index + 1).join('/')}`;

        return {
          name: path,
          href
        };
      })
    ];
  }, [pathname]);

  return (
    <div className='flex items-center space-x-2 text-sm text-gray-500'>
      {(paths || pathList).map((path, index) => (
        <div key={path.href} className='flex flex-row items-center justify-start'>
          <Link
            className={cn('line-clamp-1 capitalize hover:underline', {
              'text-accent-foreground': index === (paths || pathList).length - 1
            })}
            href={path.href}
            passHref={true}
            prefetch={false}
            shallow={true}
            aria-label='breadcrumb'
          >
            {path.name}
          </Link>
          {index !== (paths || pathList).length - 1 && <span className='ml-2 text-xs'>{'>'}</span>}
        </div>
      ))}
    </div>
  );
};
