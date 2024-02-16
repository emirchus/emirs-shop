import { api } from '@/api';
import { Product } from '@/interfaces/product';

export async function GET() {
  const maxOffset = 20;
  const minOffset = 0;

  const offset = Math.floor(Math.random() * (maxOffset - minOffset + 1)) + minOffset;
  const products = suffleProducts(await api.products.getAll({ offset, limit: 20 }));

  return new Response(JSON.stringify(products), { status: 200 });
}

function suffleProducts(array: Product[]) {
  return array.sort(() => Math.random() - 0.5);
}
