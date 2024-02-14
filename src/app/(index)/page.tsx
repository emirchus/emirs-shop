import { BestSellers } from '@/components/best-sellers/best-sellers';
import { CategoriesHome } from '@/components/categories-home';
import { HomeFeature } from '@/components/home-feature';
import { ProductsHome } from '@/components/products-home';
import { Skeleton } from '@/components/ui/skeleton';
import { MessageCirclePlusIcon, ShieldCheckIcon, TrophyIcon, TruckIcon } from 'lucide-react';
import { Suspense } from 'react';
import { fetchProducts } from '../action';

export default function HomePage({ searchParams }: { searchParams: URLSearchParams }) {
  return (
    <div className='flex h-full w-full flex-col'>
      <Suspense fallback={<Skeleton className='mx-auto my-8 h-[50vh] w-[80%]' />}>
        <BestSellers />
      </Suspense>
      <section className='mx-auto grid w-10/12 gap-4 px-4 md:grid-cols-2 md:grid-rows-2 lg:grid-cols-4 lg:grid-rows-1'>
        <HomeFeature
          description='For all orders above $1000'
          title='Free Shipping'
          icon={<TruckIcon size={24} />}
        />
        <HomeFeature
          title='Secure Payments'
          description='All transactions are secured and encrypted'
          icon={<ShieldCheckIcon size={24} />}
        />
        <HomeFeature
          title='Customer Care'
          description='Get support 24/7 via phone or chat'
          icon={<MessageCirclePlusIcon size={24} />}
        />
        <HomeFeature
          title='Best Prices'
          description='We offer the best prices for our products'
          icon={<TrophyIcon size={24} />}
        />
      </section>

      <hr className='my-8' />
      <Suspense
        fallback={
          <section className='my-4 flex flex-col items-center justify-center space-y-4'>
            <Skeleton className='mx-auto h-[100px] w-[80%]' />
            <Skeleton className='mx-auto h-[100px] w-[80%]' />
          </section>
        }
      >
        <section className='my-4 flex w-full flex-col items-center justify-center space-y-4'>
          <h3 className='mb-4 text-2xl font-bold'>Categories for you!</h3>
          <CategoriesHome />
        </section>
      </Suspense>

      <hr className='my-8' />

      <section className='my-4 flex w-full flex-col items-center justify-center space-y-4'>
        <div className='grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {fetchProducts(1, null, null)}
          <Suspense key={JSON.stringify(searchParams)}>
            <ProductsHome />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
