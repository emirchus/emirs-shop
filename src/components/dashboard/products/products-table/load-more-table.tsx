'use client';

import { FetchProducts, fetchProductsTable } from '@/app/action';
import { Loading } from '@/components/loading';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

export const LoadMoreProduct = () => {
  const { inView, ref } = useInView();
  const [products, setProducts] = useState<FetchProducts>([]);
  const [canLoadMore, setCanLoadMore] = useState(true);

  const [page, setPage] = useState(0);

  useEffect(() => {
    if ((inView || products.length == 0) && canLoadMore) {
      fetchProductsTable(page).then(res => {
        setProducts([...products, ...res]);
        if (res.length < 10) {
          setCanLoadMore(false);
          return;
        }
        setPage(page + 1);
      });
    }
  }, [canLoadMore, inView, products, page]);

  return (
    <>
      {products}
      <tr ref={ref}>
        <td colSpan={4} className='text-center'>
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
        </td>
      </tr>
    </>
  );
};
