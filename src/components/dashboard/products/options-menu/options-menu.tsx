'use client';
import { RESEED } from '@/app/action';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui';
import { ListRestart, MoreVertical, SaveIcon, UploadIcon } from 'lucide-react';
import toast from 'react-hot-toast';

export function OptionsMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={'outline'}
          className='flex w-full flex-row items-center justify-between space-x-2 md:w-auto'
        >
          <MoreVertical size={16} />
          <span>Options</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuLabel>Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className='flex flex-row items-center justify-start'>
            <SaveIcon size={16} className='my-auto mr-2' />
            <span className='my-auto'>Export</span>
          </DropdownMenuItem>
          <DropdownMenuItem className='flex flex-row items-center justify-start'>
            <UploadIcon size={16} className='my-auto mr-2' />
            <span className='my-auto'>Upload</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className='flex flex-row items-center justify-start'
            onClick={() => {
              toast.promise(RESEED(), {
                loading: 'Re-seeding...',
                success: 'Re-seeded',
                error: 'An error occurred while re-seeding'
              });
            }}
          >
            <ListRestart size={16} className='my-auto mr-2' />
            <span className='my-auto'>Re-Seed</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
