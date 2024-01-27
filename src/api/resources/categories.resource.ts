import { Category } from "@/interfaces/category";
import { Product } from "@/interfaces/product";
import { BASE_URL } from "@/lib/config";

export class CategoriesResource {
  async getAll(): Promise<Category[]> {
    console.log("BASE_URL: ", BASE_URL);
    try {
      const res = await fetch(`${BASE_URL}/api/categories`);
      return res.json();
    } catch (error) {
      console.log("error: ", error);
      return [];
    }
  }

  async getOne(id: number): Promise<Category> {
    const res = await fetch(`${BASE_URL}/api/categories/${id}`);
    return res.json();
  }

  async getProducts(id: number): Promise<Product[]> {
    const res = await fetch(`${BASE_URL}/api/categories/${id}/products`);
    return res.json();
  }
}
