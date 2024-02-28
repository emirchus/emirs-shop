'use server';
import Image from 'next/image';
import React, { Suspense } from 'react';
import Link from 'next/link';
import { CategoriesNavbar } from '@/components/store/categories-navbar';
import { SearchInput } from '@/components/store/search-input';
import { Skeleton } from '@/components/ui/skeleton';
import { useSession } from '@/hooks/use-session';
import { UserDropdown } from '@/components/store/user-dropdown/user-dropdown';
import { SignInButton } from '@/components/store/sign-in';
import { Button } from '@/components/ui';
import { Heart, ShoppingCart } from 'lucide-react';

const CategoriesFallback = () => (
  <div className='relative z-10 flex h-6 w-full flex-1 flex-row items-center justify-center space-x-5'>
    {Array.from({ length: 8 }).map((_, i) => (
      <Skeleton key={i} className='h-full w-28' />
    ))}
  </div>
);

export const Header = async () => {
  const session = await useSession();

  return (
    <div className='md:h-30 sticky top-0 z-10 grid w-full grid-cols-2 border-b-2 border-border bg-background px-5 py-2 shadow-sm md:grid-cols-3 md:grid-rows-2'>
      <div className='col-span-3 col-start-1 flex items-center justify-center md:col-span-1'>
        <Link href='/'>
          <Image
            src='/logo.svg'
            alt='Logo'
            width={60}
            height={60}
            priority
            className='h-10 md:h-auto'
          />
        </Link>
      </div>
      <div className='col-span-2 row-span-1 flex w-full flex-row items-center justify-start space-x-2 md:col-start-3 md:justify-end'>
        <Suspense>
          <SearchInput />
        </Suspense>
        {/* TODO: Add actions! */}
        <Button size={'icon'} variant={'outline'} title='Shopping cart'>
          <ShoppingCart size={18} />
        </Button>
        <Button size={'icon'} variant={'outline'} title='Wishlist'>
          <Heart size={18} />
        </Button>
        {session.access_token ? <UserDropdown user={session.user!} /> : <SignInButton />}
      </div>
      <div className='col-span-3 row-start-2 hidden items-center justify-center md:flex'>
        <Suspense fallback={<CategoriesFallback />}>
          <CategoriesNavbar />
        </Suspense>
      </div>
    </div>
  );
};
