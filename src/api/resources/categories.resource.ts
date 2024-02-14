import { Category } from '@/interfaces/category';
import { Product } from '@/interfaces/product';
import { BASE_URL } from '@/lib/config';

export class CategoriesResource {
  async getAll(): Promise<Category[]> {
    try {
      const res = await fetch(`${BASE_URL}/api/categories`);
      const categories = await res.json();

      const uniqueCategories = categories.filter(
        (category: Category, index: number, self: Category[]) =>
          index === self.findIndex(c => c.name === category.name)
      );

      return uniqueCategories;
    } catch (error) {
      return [];
    }
  }

  async getOne(id: number): Promise<Category | null> {
    try {
      const res = await fetch(`${BASE_URL}/api/categories/${id}`);
      return res.json();
    } catch (error) {
      return null;
    }
  }

  async getProducts(id: number): Promise<Product[]> {
    try {
      const res = await fetch(`${BASE_URL}/api/categories/${id}/products`);
      return res.json();
    } catch (error) {
      return [];
    }
  }
}
