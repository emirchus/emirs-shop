import React from 'react';
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '../ui/navigation-menu';
import Link from 'next/link';
import Image from 'next/image';
import { api } from '@/api';
import { Category } from '@/interfaces/category';
import { Product } from '@/interfaces/product';

interface Props {
  category: Category;
}

export const CategoryNavbar = async ({ category }: Props) => {
  const products = await api.products.getAll({
    categoryId: category.id,
    offset: 0,
    limit: 6
  });

  if (products.length !== 6)
    return (
      <NavigationMenuItem>
        <Link href={`/search?category=${category.id}`} legacyBehavior passHref shallow >
          <NavigationMenuLink className={navigationMenuTriggerStyle}>
            {category.name}
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
    );

  const getImageSrc = ({ images }: Product): string | null => {
    // eslint-disable-next-line no-useless-escape
    const currentSrc = images[0].replaceAll(/[\[\]\"]/g, '');

    if (!currentSrc || !currentSrc.includes('imgur')) return null;

    return currentSrc;
  };

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>
        <Link href={`/search?category=${category.id}`} legacyBehavior passHref>
          <NavigationMenuLink>{category.name}</NavigationMenuLink>
        </Link>
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]'>
          {products.map(product => (
            <li key={product.id}>
              <Link href={`/${product.id}`}>
                <NavigationMenuLink asChild>
                  <div className='relative  flex cursor-pointer select-none flex-row space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground'>
                    {getImageSrc(product) && (
                      <Image
                        src={getImageSrc(product)!}
                        alt={product.title}
                        width={50}
                        height={50}
                        objectFit='cover'
                        className='h-full rounded-md shadow-md'
                      />
                    )}
                    <div className='ml-4'>
                      <div className='text-sm font-medium leading-none'>{product.title}</div>
                      <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
                        {product.description}...
                      </p>
                    </div>
                  </div>
                </NavigationMenuLink>
              </Link>
            </li>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};
