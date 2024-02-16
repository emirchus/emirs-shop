'use client';

import { FetchProducts, fetchProducts } from '@/app/action';
import { Suspense, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { AnimatePresence, motion } from 'framer-motion';
import { Loading } from '@/components/loading';

let page = 0;

interface Props {
  title?: string | null;
  category?: number | null;
}

export const ProductsHome = ({ title, category }: Props) => {
  const { inView, ref } = useInView();
  const [products, setProducts] = useState<FetchProducts>([]);
  const [canLoadMore, setCanLoadMore] = useState(true);

  useEffect(() => {
    if (inView && canLoadMore) {
      fetchProducts(page, title as string, category).then(res => {
        setProducts([...products, ...res]);
        if (res.length < 10) setCanLoadMore(false);
        page++;
      });
    }
  }, [canLoadMore, category, inView, products, title]);

  return (
    <>
      <Suspense>
        <div className='grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
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
