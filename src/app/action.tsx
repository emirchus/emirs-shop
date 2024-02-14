'use server';

import { api } from '@/api';
import { ProductItem } from '@/components/product-item';
import React from 'react';

export type FetchProducts = JSX.Element[];

export const fetchProducts = async (
  page: number,
  title?: string | null,
  categoryId?: number | null
): Promise<FetchProducts> => {
  const offset = page * 10;

  const response = await api.products.getAll({
    offset,
    limit: 10,
    title,
    categoryId
  });

  return response.map((product, index) => (
    <ProductItem index={index} key={product.id} product={product} />
  ));
};
