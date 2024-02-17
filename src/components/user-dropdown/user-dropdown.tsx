'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../ui/dropdown-menu';
import React from 'react';
import { Button } from '../ui/button';
import { User } from '@/interfaces/user';
import Image from 'next/image';
import {
  CreditCard,
  ExternalLink,
  LayoutDashboard,
  LogOutIcon,
  Settings,
  UserIcon
} from 'lucide-react';
import { logout } from '@/app/action';
import Link from 'next/link';
import { BASE_URL } from '@/lib';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select';
import { useTheme } from 'next-themes';

interface Props {
  user: User;
}

export const UserDropdown = ({ user }: Props) => {
  const dashboardURL = () => {
    const url = new URL(BASE_URL);

    url.hostname = `dashboard.${url.hostname}`;

    return url.toString();
  };

  const { setTheme, theme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'outline'} className='rounded-full p-0 shadow-md '>
          <Image
            src={user.avatar}
            alt={user.name}
            width={40}
            height={40}
            className='rounded-full'
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='mr-4 w-56'>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {user.role === 'admin' && (
            <DropdownMenuItem asChild>
              <a
                href={dashboardURL()}
                className='flex w-full cursor-pointer flex-row items-center justify-start'
              >
                <LayoutDashboard size={16} />
                <span className='ml-2'>Dashboard</span>
              </a>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem asChild>
            <Link
              href={'/profile'}
              className='flex w-full cursor-pointer flex-row items-center justify-start'
            >
              <UserIcon size={16} />
              <span className='ml-2'>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href={'/billing'}
              className='flex w-full cursor-pointer flex-row items-center justify-start'
            >
              <CreditCard size={16} />
              <span className='ml-2'>Billing</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href={'/settings'}
              className='flex w-full cursor-pointer flex-row items-center justify-start'
            >
              <Settings size={16} />
              <span className='ml-2'>Settings</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <div className='flex flex-row items-center justify-between'>
              <p className='mr-5'>Theme: </p>
              <Select defaultValue={theme} onValueChange={setTheme}>
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Mode' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value='dark'>Dark</SelectItem>
                    <SelectItem value='light'>Light</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>About</DropdownMenuLabel>
        <DropdownMenuItem asChild>
          <a
            href='https://x.com/emirchus'
            target='_blank'
            className='flex w-full cursor-pointer flex-row items-center justify-between'
          >
            <span>Twitter</span>
            <ExternalLink size={16} />
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a
            href='https://github.com/emirchus/emirs-shop'
            target='_blank'
            className='flex w-full cursor-pointer flex-row items-center justify-between'
          >
            <span>GitHub</span>
            <ExternalLink size={16} />
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a
            href='https://github.com/PlatziLabs/fake-api-backend'
            target='_blank'
            className='flex w-full cursor-pointer flex-row items-center justify-between'
          >
            <span>API</span>
            <ExternalLink size={16} />
          </a>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <form action={logout}>
            <button
              type='submit'
              className='flex h-full w-full flex-row items-center justify-between'
            >
              <span>Log Out</span>
              <LogOutIcon size={16} />
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
