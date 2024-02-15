'use client';

import { FetchProducts, fetchProducts } from '@/app/action';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { AnimatePresence, motion } from 'framer-motion';

let page = 2;

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
      {products}
      <div ref={ref} />
      <AnimatePresence>
        {inView && canLoadMore && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className='flex h-16 w-full items-center justify-center'>
              <svg
                className='-ml-1 mr-3 h-5 w-5 animate-spin text-primary-foreground'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
              >
                <circle
                  className='opacity-25'
                  cx='12'
                  cy='12'
                  r='10'
                  stroke='currentColor'
                  strokeWidth='4'
                ></circle>
                <path
                  className='opacity-75'
                  fill='currentColor'
                  d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                ></path>
              </svg>
              <p>Loading...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
