import { api } from '@/api';
import React from 'react';
import { DataCard } from '../data-card';
import { Barcode, Tag, Ticket, User } from 'lucide-react';
import { Skeleton } from '@/components/ui';

export const DataList = async () => {
  const [products, categories, users] = await api.dashboard.getData();

  return (
    <div className='grid h-[150px] w-full grid-cols-1 gap-4  md:grid-cols-2 lg:grid-cols-4'>
      <DataCard
        icon={<Barcode size={20} />}
        title='Products'
        value={products}
        editHref='/products'
      />
      <DataCard
        icon={<Tag size={20} />}
        title='Categories'
        value={categories}
        editHref='/categories'
      />
      <DataCard icon={<User size={20} />} title='Users' value={users} editHref='/users' />
      <DataCard icon={<Ticket size={20} />} title='Orders' value={0} />
    </div>
  );
};

export const DataListSkeleton = () => {
  return (
    <div className='grid h-[150px] w-full grid-cols-1 gap-4  md:grid-cols-2 lg:grid-cols-4'>
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </div>
  );
};
