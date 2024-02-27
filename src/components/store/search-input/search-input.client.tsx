'use client';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import React, { useRef } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  visible?: boolean;
}

export const SearchInput = ({ visible, className, ...props }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const inputRef = useRef<HTMLInputElement>(null);
  const queryParams = useSearchParams();

  const [search, setSearch] = React.useState(queryParams.get('query') || '');

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      router.push(`/search?query=${search}`);
    }
  };

  const isSearchPage = pathname === '/search';

  if (isSearchPage && !visible) return <></>;

  return (
    <div
      className={cn('relative max-w-2xl items-center flex', className)}
      {...props}
    >
      <MagnifyingGlassIcon
        className='absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform opacity-50'
        onClick={() => {
          inputRef.current?.focus();
        }}
      />
      <Input
        placeholder='Search...'
        value={search}
        onChange={event => setSearch(event.target.value)}
        onKeyDown={handleKeyDown}
        className='pl-8'
        ref={inputRef}
      />
    </div>
  );
};
