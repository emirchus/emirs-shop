import React from 'react';
import { NavigationMenu, NavigationMenuIndicator, NavigationMenuList } from '../ui/navigation-menu';
import { api } from '@/api';
import { CategoryNavbar } from '../category-navbar';

export const CategoriesNavbar = async () => {
  const categories = (await api.categories.getAll()).slice(0, 8);

  return (
    <NavigationMenu className='mx-auto hidden lg:block'>
      <NavigationMenuList>
        {categories.map(category => (
          <CategoryNavbar key={category.id} category={category} />
        ))}
        <NavigationMenuIndicator />
      </NavigationMenuList>
    </NavigationMenu>
  );
};
