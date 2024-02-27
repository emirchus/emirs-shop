'use client';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Home, ScanBarcode, Tag, Ticket, UserIcon } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { TooltipButton } from '../tooltip-button';
import { UserMenu } from '../user-menu';
import { cn } from '@/lib';
import { User } from '@/interfaces/user';

interface Props {
  user: User;
}

export const Sidebar = ({ user }: Props) => {
  const [isOpenSidebar, setIsOpenSidebar] = React.useState(false);

  return (
    <div
      className={cn('relative flex  flex-col p-2 py-4 transition-all duration-300 ease-in-out', {
        'w-[80px] items-center': !isOpenSidebar,
        'w-[180px] items-start justify-start ': isOpenSidebar
      })}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <a
              onClick={() => {
                setIsOpenSidebar(!isOpenSidebar);
              }}
              className='absolute right-1 top-1/2 h-10 w-2 cursor-pointer rounded-full bg-primary'
            ></a>
          </TooltipTrigger>
          <TooltipContent side='right' align='center'>
            {isOpenSidebar ? 'Close' : 'Open'}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Image src='/logo.svg' alt='Logo' width={60} height={60} priority className='mx-auto ' />
      <TooltipProvider>
        <div className='mt-8 flex flex-col space-y-4'>
          <TooltipButton
            href='/'
            icon={<Home size={20} />}
            label='Home'
            withTooltip={!isOpenSidebar}
          />

          <TooltipButton
            href='/products'
            icon={<ScanBarcode size={20} />}
            label='Products'
            withTooltip={!isOpenSidebar}
          />

          <TooltipButton
            href='/users'
            icon={<UserIcon size={20} />}
            label='Users'
            withTooltip={!isOpenSidebar}
          />

          <TooltipButton
            href='/categories'
            icon={<Tag size={20} />}
            label='Categories'
            withTooltip={!isOpenSidebar}
          />

          <TooltipButton
            href='/orders'
            icon={<Ticket size={20} />}
            label='Orders'
            withTooltip={!isOpenSidebar}
          />
        </div>
      </TooltipProvider>
      <div className='flex-1'></div>
      <UserMenu user={user} expanded={isOpenSidebar} />
    </div>
  );
};
