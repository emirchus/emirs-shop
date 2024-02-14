import Image from 'next/image';
import React, { Suspense } from 'react';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { CategoriesNavbar } from '../categories-navbar';
import { SearchInput } from '../search-input';
import { Skeleton } from '../ui/skeleton';
import { MenuIcon } from 'lucide-react';

const CategoriesFallback = () => (
  <div className='relative z-10 flex h-6 w-full flex-1 flex-row items-center justify-center space-x-5'>
    {Array.from({ length: 8 }).map((_, i) => (
      <Skeleton key={i} className='h-full w-28' />
    ))}
  </div>
);

export const Header = () => {
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={'outline'}>
              <MenuIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='mr-4 w-56'>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                Profile
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Billing
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Settings
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Keyboard shortcuts
                <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>Email</DropdownMenuItem>
                    <DropdownMenuItem>Message</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>More...</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuItem>
                New Team
                <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>GitHub</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuItem disabled>API</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              Log out
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className='col-span-3 row-start-2 flex items-center justify-center'>
        <Suspense fallback={<CategoriesFallback />}>
          <CategoriesNavbar />
        </Suspense>
      </div>
    </div>
  );
};
