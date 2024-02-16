import { api } from '@/api';
import { Product } from '@/interfaces/product';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const categoryId = req.nextUrl.searchParams.getAll('categoryId');

  const maxOffset = 20;
  const minOffset = 0;

  const offset = Math.floor(Math.random() * (maxOffset - minOffset + 1)) + minOffset;

  const products = suffleProducts(
    await api.products.getAll({ offset, limit: 10, categoryId: +categoryId })
  );

  return new Response(JSON.stringify(products), { status: 200 });
}

function suffleProducts(array: Product[]) {
  return array.sort(() => Math.random() - 0.5);
}
