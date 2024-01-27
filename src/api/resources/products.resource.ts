import { NextURL } from "next/dist/server/web/next-url";
import { GetProductsParams } from "../types/products";

export class ProductsResource {
  async getAll(params: GetProductsParams = {}) {
    const url = new NextURL(`${process.env.VERCEL_URL}/api/products`);

    for (const key in params) {
      if (Object.prototype.hasOwnProperty.call(params, key)) {
        const value = (params as any)[key];
        url.searchParams.append(key, value);
      }
    }

    const res = await fetch(url);
    return res.json();
  }

  async getOne(id: number) {
    const res = await fetch(`${process.env.VERCEL_URL}/api/products/${id}`);
    return res.json();
  }
}
