import { NextURL } from 'next/dist/server/web/next-url';
import { GetBestSellersParams, GetProductsParams } from '../types/products';
import { BASE_URL } from '@/lib/config';
import { Product } from '@/interfaces/product';

export class ProductsResource {
  async getAll(
    params: GetProductsParams = {
      offset: 0,
      limit: 10
    }
  ): Promise<Product[]> {
    try {
      const url = new NextURL(`${BASE_URL}/api/products`);

      for (const key in params) {
        if (Object.prototype.hasOwnProperty.call(params, key)) {
          const value = (params as never)[key];
          if (value === null || value === undefined) continue;
          url.searchParams.append(key, value);
        }
      }
      const res = await (
        await fetch(url, {
          next: {
            revalidate: 60
          }
        })
      ).json();
      return res;
    } catch (error) {
      return [];
    }
  }
  async getNewReleased(params: GetBestSellersParams = {}): Promise<Product[]> {
    try {
      const url = new NextURL(`${BASE_URL}/api/product/new-released`);

      for (const key in params) {
        if (Object.prototype.hasOwnProperty.call(params, key)) {
          const value = (params as never)[key];
          url.searchParams.append(key, value);
        }
      }

      const res = await fetch(url);
      return res.json();
    } catch (error) {
      return [];
    }
  }
  async getRecommendations(): Promise<Product[]> {
    try {
      const url = new NextURL(`${BASE_URL}/api/product/recommendations`);
      const res = await fetch(url);
      return res.json();
    } catch (error) {
      return [];
    }
  }
  async getOne(id: number): Promise<Product | null> {
    try {
      const res = await fetch(`${BASE_URL}/api/products/${id}`);
      const json = await res.json();
      if (json.id) {
        return json;
      }
      return null;
    } catch (error) {
      return null;
    }
  }
}
