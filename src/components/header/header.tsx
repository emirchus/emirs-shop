import Image from 'next/image';
import React, { Suspense } from 'react';
import Link from 'next/link';
import { CategoriesNavbar } from '../categories-navbar';
import { SearchInput } from '../search-input';
import { Skeleton } from '../ui/skeleton';
import { useSession } from '@/hooks/use-session';
import { UserDropdown } from '../user-dropdown/user-dropdown';
import { SignInButton } from '../sign-in';

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
    <div className='h-30 grid w-full  grid-cols-3 grid-rows-2 border-b-2 border-border  px-5 shadow-sm'>
      <div className='col-start-1 flex items-center justify-center'>
        <Link href='/'>
          <Image src='/logo.svg' alt='Logo' width={60} height={60} priority />
        </Link>
      </div>
      <div className='col-start-3 row-span-1 flex flex-row items-center justify-end'>
        <Suspense>
          <SearchInput />
        </Suspense>
        {session.access_token ? <UserDropdown user={session.user!} /> : <SignInButton />}
      </div>
      <div className='col-span-3 row-start-2 flex items-center justify-center'>
        <Suspense fallback={<CategoriesFallback />}>
          <CategoriesNavbar />
        </Suspense>
      </div>
    </div>
  );
};
