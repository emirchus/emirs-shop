import { api } from '@/api';
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
import { ProductRow } from './product-row';

export const ProductsTable = async () => {
  const products = await api.products.getAll({
    offset: 0,
    limit: 10
  });

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
        {products.map((product, index) => {
          return <ProductRow key={product.id} product={product} index={index} />;
        })}
        <LoadMoreProduct />
      </TableBody>
    </Table>
  );
};
