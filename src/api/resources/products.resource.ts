import { NextURL } from 'next/dist/server/web/next-url';
import {
  CreateProductPayload,
  GetBestSellersParams,
  GetProductsParams,
  UpdateProductPayload
} from '../types/products';
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
            revalidate: 20
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

      const res = await fetch(url, {
        next: {
          revalidate: 60
        }
      });
      return res.json();
    } catch (error) {
      return [];
    }
  }
  async getRecommendations(): Promise<Product[]> {
    try {
      const url = new NextURL(`${BASE_URL}/api/product/recommendations`);
      const res = await fetch(url, {
        next: {
          revalidate: 60
        }
      });
      return res.json();
    } catch (error) {
      return [];
    }
  }
  async getOne(id: number): Promise<Product | null> {
    try {
      const res = await fetch(`${BASE_URL}/api/products/${id}`, {
        next: {
          revalidate: 20
        }
      });
      const json = await res.json();
      if (json.id) {
        return json;
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  async createProduct(payload: CreateProductPayload): Promise<Product | null> {
    try {
      const res = await fetch(`${BASE_URL}/api/products`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const json = await res.json();
      if (json.id) {
        return json;
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  async updateProduct(id: number, payload: UpdateProductPayload): Promise<Product | null> {
    try {
      const res = await fetch(`${BASE_URL}/api/products/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const json = await res.json();
      if (json.id) {
        return json;
      }
      return null;
    } catch (error) {
      return null;
    }
  }
  async deleteProduct(id: number): Promise<boolean> {
    try {
      const res = await fetch(`${BASE_URL}/api/products/${id}`, {
        method: 'DELETE'
      });
      const data = res.json();
      return Boolean(data);
    } catch (error) {
      return false;
    }
  }
}
