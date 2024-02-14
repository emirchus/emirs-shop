import { api } from '@/api';
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselOptions,
  CarouselPrevious
} from '../ui/carousel';
import { CategoryItem } from '../category-item';

export const CategoriesHome = async () => {
  const categories = await api.categories.getAll();

  const firstCategories = categories.slice(0, categories.length / 2);
  const secondCategories = categories.slice(categories.length / 2, categories.length);

  const opts: CarouselOptions = {
    align: 'start',
    loop: true,
    active: true
  };

  return (
    <>
      <Carousel opts={opts} className='border-border-2 mx-auto w-full max-w-[80%] rounded-xl'>
        <CarouselContent className=''>
          {firstCategories.map(category => (
            <CarouselItem key={category.id} className='md:basis-1/4'>
              <CategoryItem category={category} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <Carousel opts={opts} className='border- mx-auto w-full max-w-[80%] rounded-xl border-border'>
        <CarouselContent className=''>
          {secondCategories.map(category => (
            <CarouselItem key={category.id} className='md:basis-1/4'>
              <CategoryItem category={category} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  );
};
