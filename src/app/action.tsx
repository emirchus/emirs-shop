/* eslint-disable react-hooks/rules-of-hooks */
'use server';

import { api } from '@/api';
import { ProductItem } from '@/components/product-item';
import { useSession } from '@/hooks/use-session';
import { revalidatePath } from 'next/cache';
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

export async function logout() {
  'use server';

  // false => no db call for logout
  const session = await useSession();
  session.destroy();
  revalidatePath('/', 'layout');
}

export async function login() {
  'use server';

  revalidatePath('/', 'layout');
}
