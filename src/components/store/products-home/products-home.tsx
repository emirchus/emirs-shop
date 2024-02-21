'use client';

import { fetchProducts } from '@/app/action';
import React, { Suspense, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { AnimatePresence, motion } from 'framer-motion';
import { Loading } from '@/components/loading';

interface Props {
  title?: string | null;
  category?: number | null;
}

export const ProductsHome = ({ title, category }: Props) => {
  const { inView, ref } = useInView();
  const [products, setProducts] = useState<React.ReactNode[]>([]);
  const [canLoadMore, setCanLoadMore] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if ((inView || products.length == 0) && canLoadMore) {
      fetchProducts(page === 1 ? 0 : page, title as string, category).then(res => {
        setProducts([...products, ...res]);
        if (res.length < 10) {
          setCanLoadMore(false);
          return;
        }
        setPage(page + 1);
      });
    }
  }, [canLoadMore, category, inView, page, products, title]);

  return (
    <>
      <Suspense>
        <div className='mt-8 grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {products}
        </div>
      </Suspense>
      <div ref={ref} />
      <AnimatePresence>
        {inView && canLoadMore && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className='flex h-16 w-full items-center justify-center'>
              <Loading />
              <p>Loading...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
