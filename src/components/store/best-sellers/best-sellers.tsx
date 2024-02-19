import { api } from '@/api';
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { Product } from '@/interfaces/product';
import { ItemCarousel } from '@/components/store/item-carousel/item-carousel';

export const BestSellers = async () => {
  const bestSellers = await api.products.getNewReleased();
  return (
    <div className='my-4 flex flex-col items-center justify-center'>
      <h3 className='mb-4 text-2xl font-bold'>NEW RELEASED</h3>
      <Carousel
        className='mx-auto w-full max-w-[80%] rounded-xl'
        opts={{
          skipSnaps: false,
          align: 'center',
          loop: true
        }}
      >
        <CarouselContent className=''>
          {bestSellers.map((product: Product) => (
            <CarouselItem key={product.id} className='md:basis-1/2'>
              <ItemCarousel key={product.id} product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};
