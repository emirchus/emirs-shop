import { Category } from "@/interfaces/category";
import { Product } from "@/interfaces/product";

export class CategoriesResource {
  async getAll(): Promise<Category[]> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/categories`);
    return res.json();
  }

  async getOne(id: number): Promise<Category> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/categories/${id}`);
    return res.json();
  }

  async getProducts(id: number): Promise<Product[]> {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/categories/${id}/products`
    );
    return res.json();
  }
}
