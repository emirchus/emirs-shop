import { api } from '@/api';
import { fetchProducts } from '@/app/action';
import { ProductsHome, SearchInput } from '@/components/store';
import { Metadata } from 'next';
import { Suspense } from 'react';

interface Props {
  searchParams?: {
    category?: string;
    query?: string;
  };
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const category = await api.categories.getOne(parseInt(searchParams?.category ?? ''));

  if (searchParams?.category && category) {
    return {
      title: `Emir's Shop | Search: ${category.name}`,
      description: `Search results for ${category.name}`
    };
  }

  return {
    title: `Emir's Shop | Search: ${searchParams?.query}`,
    description: `Search results for ${searchParams?.query}`
  };
}

export default async function SearchPage({ searchParams }: Props) {
  const { query, category } = searchParams || {};

  const products = await fetchProducts(
    0,
    query,
    category !== null && category !== undefined ? parseInt(category) : null
  );

  return (
    <div className='flex min-h-screen w-full flex-col items-center justify-start'>
      <Suspense>
        <SearchInput visible className='mt-8 w-full' />
      </Suspense>
      {query && (
        <h1 className='mt-8 text-center text-4xl font-semibold'>Search results for {query}</h1>
      )}

      <div className='mt-8'>
        <ProductsHome
          key={JSON.stringify(searchParams)}
          title={query}
          category={category !== null && category !== undefined ? parseInt(category) : null}
        />
        {!products.length && (
          <>
            <h1 className='mx-auto text-center text-2xl font-semibold'>No products found</h1>
            <h3 className='mx-auto text-center text-lg font-semibold'>
              Try searching for something else
            </h3>
            <ProductsHome />
          </>
        )}
      </div>
    </div>
  );
}
