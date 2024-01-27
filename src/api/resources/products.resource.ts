import { NextURL } from "next/dist/server/web/next-url";
import { GetProductsParams } from "../types/products";
import { BASE_URL } from "@/lib/config";

export class ProductsResource {
  async getAll(params: GetProductsParams = {}) {
    const url = new NextURL(`${BASE_URL}/api/products`);

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
    const res = await fetch(`${BASE_URL}/api/products/${id}`);
    return res.json();
  }
}
