import { api } from '@/api';
import { NextResponse } from 'next/server';

export async function GET() {
  const [products, categories, users] = await Promise.all([
    api.products.getAll(),
    api.categories.getAll(),
    api.user.getAll()
  ]);

  return NextResponse.json([products.length, categories.length, users.length]);
}
