import { AuthResource } from './resources/auth.resource';
import { CategoriesResource } from './resources/categories.resource';
import { DashboardResource } from './resources/dashboard.resource';
import { ProductsResource } from './resources/products.resource';
import { UserResource } from './resources/user.resource';

export const api = {
  categories: new CategoriesResource(),
  products: new ProductsResource(),
  auth: new AuthResource(),
  user: new UserResource(),
  dashboard: new DashboardResource()
};
