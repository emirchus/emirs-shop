'use client';
import { Button } from '@/components/ui';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface Props {
  icon: React.ReactNode;
  label: string;
  href: string;
  withTooltip?: boolean;
}

export const TooltipButton = ({ href, icon, label, withTooltip = true }: Props) => {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {withTooltip ? (
        <motion.div>
          <Tooltip>
            <TooltipTrigger>
              <Button
                variant={'ghost'}
                asChild
                size={'icon'}
                className={cn({
                  'bg-accent text-accent-foreground':
                    href === '/' ? pathname === '/' : pathname.includes(href)
                })}
              >
                <Link href={href}>{icon}</Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent side='left' align='center'>
              {label}
            </TooltipContent>
          </Tooltip>
        </motion.div>
      ) : (
        <motion.div
          key='modal'
          initial={{ opacity: 0, width: '36px', height: '36px' }}
          animate={{ opacity: 1, width: '100%', display: 'flex' }}
          exit={{ opacity: 0, width: '36px', height: '36px', display: 'none'}}
          transition={{ duration: .2 }}
        >
          <Button
            variant={'ghost'}
            asChild
            className={cn({
              'w-full bg-accent text-accent-foreground':
                href === '/' ? pathname === '/' : pathname.includes(href)
            })}
          >
            <Link href={href} className='flex flex-row items-center justify-evenly w-full'>
              {icon} <span className='ml-4 w-full'>{label}</span>
            </Link>
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
