import React from 'react';

export default async function NotFound() {
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
        <p className='mt-3 text-lg text-gray-700 dark:text-gray-300'>Page not found...</p>
      </main>
    </div>
  );
}
