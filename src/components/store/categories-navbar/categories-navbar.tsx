import React from 'react';
import { NavigationMenu, NavigationMenuIndicator, NavigationMenuList } from '@/components/ui/navigation-menu';
import { api } from '@/api';
import { CategoryNavbar } from '@/components/store/category-navbar';

export const CategoriesNavbar = async () => {
  const categories = (await api.categories.getAll()).slice(0, 8);

  return (
    <NavigationMenu className='mx-auto'>
      <NavigationMenuList>
        {categories.map(category => (
          <CategoryNavbar key={category.id} category={category} />
        ))}
        <NavigationMenuIndicator />
      </NavigationMenuList>
    </NavigationMenu>
  );
};
