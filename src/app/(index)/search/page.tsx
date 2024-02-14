import { api } from '@/api';
import { fetchProducts } from '@/app/action';
import { ProductsHome } from '@/components/products-home';
import { SearchInput } from '@/components/search-input';
import { Metadata } from 'next';

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
      <SearchInput visible className='mt-8 w-full' />

      {query && (
        <h1 className='mt-8 text-center text-4xl font-semibold'>Search results for {query}</h1>
      )}

      <section className='mt-8 grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {products}
        <ProductsHome key={query} />
      </section>
    </div>
  );
}
