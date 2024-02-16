import { AuthResource } from './resources/auth.resource';
import { CategoriesResource } from './resources/categories.resource';
import { ProductsResource } from './resources/products.resource';
import { UserResource } from './resources/user.resource';

export const api = {
  categories: new CategoriesResource(),
  products: new ProductsResource(),
  auth: new AuthResource(),
  user: new UserResource()
};
