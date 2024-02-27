'use client';

import { fetchUsersTable } from '@/app/action';
import { Loading } from '@/components/loading';
import { AnimatePresence, motion } from 'framer-motion';
import React, { ReactElement, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

export const LoadMoreUsers = () => {
  const { inView, ref } = useInView();
  const [users, setUsers] = useState<React.ReactNode[]>([]);
  const [canLoadMore, setCanLoadMore] = useState(true);

  const [page, setPage] = useState(0);
  useEffect(() => {
    if ((inView || users.length == 0) && canLoadMore) {
      fetchUsersTable(page).then(res => {
        if (
          res.some(user => users.find(u => (u as ReactElement).key === (user as ReactElement).key))
        ) {
          setCanLoadMore(false);
          return;
        }

        setUsers([...users, ...res]);

        if (res.length < 10) {
          setCanLoadMore(false);
          return;
        }
        setPage(page + 1);
      });
    }
  }, [canLoadMore, inView, page, users]);

  return (
    <>
      {users}
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
