import React from 'react';
import { api } from '@/api';
import { ProductItem } from '@/components/product-item';

export default async function NotFound() {
  const products = await api.products.getAll({ offset: 0, limit: 5 });

  return (
    <div
      className='flex flex-col items-center justify-center'
      style={{
        minHeight: 'calc(100vh - 80px)'
      }}
    >
      <div className='flex-1'></div>
      <main className='my-auto flex h-full flex-col items-center justify-center text-center'>
        <h1 className='text-6xl font-bold text-gray-900 dark:text-gray-100'>404</h1>
        <p className='mt-3 text-lg text-gray-700 dark:text-gray-300'>El producto no existe</p>
      </main>
      <div className='my-auto flex-1'></div>
      <div className='mx-auto mb-12 flex w-full flex-col items-center justify-center text-center'>
        <h2 className='text-lg font-semibold text-gray-900 dark:text-gray-100'>
          Podrías probar con estos productos
        </h2>
        <div className='flex flex-row mt-8'>
          {products.map(product => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
