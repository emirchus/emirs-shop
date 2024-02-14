'use client';
import { Product } from '@/interfaces/product';
import React, { useMemo } from 'react';
import styles from './item-carouse.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { AspectRatio } from '../ui/aspect-ratio';
import useMediaQuery from '@/hooks/use-media-query';

interface Props {
  product: Product;
}

export const ItemCarousel = ({ product }: Props) => {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const imageSrc = useMemo(() => {
    const currentSrc = product.images[0];

    if (!currentSrc.includes('imgur')) return;

    return currentSrc;
  }, [product.images]);

  return (
    <Link href={`/${product.id}`}>
      <AspectRatio ratio={isDesktop ? 16 / 9 : 9 / 16}>
        <div className={styles.itemWrapper}>
          {imageSrc && (
            <div className='absolute h-full w-full overflow-hidden rounded-xl'>
              <Image
                src={imageSrc}
                alt={product.title}
                width={1000}
                height={1000}
                className='h-full w-full origin-center object-cover transition-transform duration-300 ease-in-out hover:scale-125'
                style={{
                  aspectRatio: '1000/1000',
                  objectFit: 'cover'
                }}
              />
            </div>
          )}
          <div className={styles.itemContainer}>
            <div className={styles.itemInfo}>
              <h2 className='text-lg font-semibold'>{product.title}</h2>
              <p className='text-sm font-medium text-foreground '>${product.price}</p>
              <p className='line-clamp-3 text-sm font-medium text-muted-foreground mt-auto'>
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </AspectRatio>
    </Link>
  );
};
