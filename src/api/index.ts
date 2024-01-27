import { CategoriesResource } from "./resources/categories.resource";
import { ProductsResource } from "./resources/products.resource";

export const api = {
  categories: new CategoriesResource(),
  products: new ProductsResource(),
};
