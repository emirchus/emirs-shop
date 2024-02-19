import { api } from '@/api';
import { CreateProductForm } from './create-product-form';
import { Skeleton } from '@/components/ui';

export async function CreateProduct() {
  const categories = await api.categories.getAll();

  return (
    <div className='mt-8 max-w-lg'>
      <CreateProductForm categories={categories} />
    </div>
  );
}

export function CreateProductSkeleton() {
  return (
    <div className='mt-8 max-w-lg'>
      <div className='flex w-full flex-col space-y-8 px-2'>
        <Skeleton className='h-12 w-full' />
        <Skeleton className='h-12 w-full' />
        <Skeleton className='h-12 w-full' />
        <Skeleton className='h-12 w-full' />
        <Skeleton className='h-12 w-full' />
      </div>
    </div>
  );
}
