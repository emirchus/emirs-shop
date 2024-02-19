import { CreateProduct, CreateProductSkeleton } from '@/components/dashboard';
import { Suspense } from 'react';

export const metadata = {
  title: "Emir's Dashbaord | Create Product",
  description: "Emir's Dashbaord - Create, modify and delete your products!"
};
export default function CreateProductPage() {
  return (
    <div className='flex h-full w-full flex-col p-5 pt-0'>
      <div className='mt-8 flex flex-row items-center justify-between'>
        <div className='flex flex-col items-start justify-start'>
          <h1 className='text-4xl font-semibold'>Create Product</h1>
          <p className='mt-3 text-lg text-secondary-foreground'>
            Create, modify and delete your products!
          </p>
        </div>
      </div>
      <Suspense fallback={<CreateProductSkeleton />}>
        <CreateProduct />
      </Suspense>
    </div>
  );
}
