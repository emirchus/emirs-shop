/* eslint-disable react-hooks/rules-of-hooks */
'use server';

import { api } from '@/api';
import { UpdateProductPayload } from '@/api/types/products';
import { ProductRow, UserRow } from '@/components/dashboard';
import { ProductItem } from '@/components/store/product-item';
import { useSession } from '@/hooks/use-session';
import { Product } from '@/interfaces/product';
import { BASE_URL, getImgurImage } from '@/lib';
import { revalidatePath } from 'next/cache';
import React from 'react';

export const fetchProducts = async (
  page: number,
  title?: string | null,
  categoryId?: number | null
): Promise<React.ReactNode[]> => {
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

export const fetchProductsTable = async (
  page: number,
  title?: string | null,
  categoryId?: number | null
): Promise<React.ReactNode[]> => {
  const offset = page * 10;

  const response = await api.products.getAll({
    offset,
    limit: 10,
    title,
    categoryId
  });

  return response.map((product, index) => (
    <ProductRow key={product.id} product={product} index={index} />
  ));
};

export const fetchUsersTable = async (page: number): Promise<React.ReactNode[]> => {
  const offset = page * 10;

  const response = await api.user.getAll({
    offset,
    limit: 10
  });

  return response.map((user, index) => <UserRow key={user.id} user={user} index={index} />);
};

export async function logout() {
  const session = await useSession();
  session.destroy();
  revalidatePath('/', 'layout');
}

export async function login() {
  revalidatePath('/', 'layout');
}

export async function updateProduct(id: number, data: UpdateProductPayload) {
  await api.products.updateProduct(id, data);
  revalidatePath('/', 'layout');
}

export async function deleteProduct(id: number) {
  await api.products.deleteProduct(id);
  revalidatePath('/products', 'page');
}

export async function duplicateProduct({ id, ...product }: Product) {
  console.log(`Duplicating product with id: ${id}`);
  await api.products.createProduct({
    ...product,
    images: product.images.map(getImgurImage),
    categoryId: product.category.id
  });
  revalidatePath('/', 'layout');
}

export async function RESEED() {
  await fetch(`${BASE_URL}/api/seed`, {
    method: 'POST'
  });

  revalidatePath('/', 'layout');
}
