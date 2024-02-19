import { OptionsMenu, ProductsTable } from '@/components/dashboard';
import { Button } from '@/components/ui';
import Link from 'next/link';
import { Suspense } from 'react';

export default function ProductsPage() {
  return (
    <div className='flex h-full w-full flex-col p-5 pt-0'>
      <div className='flex flex-col items-center justify-between md:flex-row'>
        <div className='flex flex-col items-start justify-start'>
          <h1 className='text-4xl font-semibold'>Products</h1>
          <p className='mt-3 text-lg text-secondary-foreground'>
            Create, modify and delete your products!
          </p>
        </div>
        <div className='mt-8 flex flex-col items-center justify-start space-y-2 md:mt-0 md:flex-row md:justify-center md:space-x-2 md:space-y-0'>
          <OptionsMenu />
          <Button asChild>
            <Link href='/products/create'>Create Product</Link>
          </Button>
        </div>
      </div>
      <div className='mt-8'>
        <Suspense fallback={null}>
          <ProductsTable />
        </Suspense>
      </div>
    </div>
  );
}
