import { TooltipProvider } from '@/components/ui/tooltip';
import { Home, ScanBarcode, Tag, Ticket, User } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { TooltipButton } from '../tooltip-button';
import { useSession } from '@/hooks/use-session';
import { UserMenu } from '../user-menu';

export const Sidebar = async () => {
  const session = await useSession();

  return (
    <div className='flex w-[80px] flex-col items-center justify-start border-r-2 p-2 py-4'>
      <Image
        src='/logo.svg'
        alt='Logo'
        width={60}
        height={60}
        priority
        className='mx-auto w-10/12'
      />
      <TooltipProvider>
        <div className='mt-8 flex flex-col space-y-4'>
          <TooltipButton href='/' icon={<Home size={20} />} label='Home' />

          <TooltipButton href='/products' icon={<ScanBarcode size={20} />} label='Products' />

          <TooltipButton href='/users' icon={<User size={20} />} label='Users' />

          <TooltipButton href='/categories' icon={<Tag size={20} />} label='Categories' />

          <TooltipButton href='/orders' icon={<Ticket size={20} />} label='Orders' />
        </div>
      </TooltipProvider>
      <div className='flex-1'></div>
      <UserMenu user={session.user!} />
    </div>
  );
};
