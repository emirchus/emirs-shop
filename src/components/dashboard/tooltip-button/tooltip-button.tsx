'use client';
import { Button } from '@/components/ui';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface Props {
  icon: React.ReactNode;
  label: string;
  href: string;
}

export const TooltipButton = ({ href, icon, label }: Props) => {
  const pathname = usePathname();

  return (
    <div>
      <Tooltip>
        <TooltipTrigger>
          <Button
            variant={'ghost'}
            asChild
            size={'icon'}
            className={cn({
              'bg-accent text-accent-foreground': href === '/' ? pathname === '/' : pathname.includes(href)
            })}
          >
            <Link href={href} >
              {icon}
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent side='left' align='center'>
          {label}
        </TooltipContent>
      </Tooltip>
    </div>
  );
};
