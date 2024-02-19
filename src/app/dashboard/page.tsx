import { DataList, DataListSkeleton } from '@/components/dashboard/data-list';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: "Emir's Dashboard | Home",
  description: 'A dashboard made with Next.js and TailwindCSS'
};

export default async function HomePage() {
  return (
    <div className='flex h-full w-full flex-col p-5'>
      <Suspense fallback={<DataListSkeleton />}>
        <DataList />
      </Suspense>
      {
        // TODO: Add chartjs uwu
      }
    </div>
  );
}
