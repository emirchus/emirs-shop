import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import React from 'react';
import { LoadMoreProduct } from './load-more-table';

export const ProductsTable = async () => {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead className='w-[100px]'>Stock</TableHead>
          <TableHead className='w-[100px]'>Price</TableHead>
          <TableHead className='text-right'>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <LoadMoreProduct />
      </TableBody>
    </Table>
  );
};
