'use client';
import { Product } from '@/interfaces/product';
import React from 'react';
import styles from './item-carouse.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { getImgurImage } from '@/lib';
interface Props {
  product: Product;
}

export const ItemCarousel = ({ product }: Props) => {

  return (
    <Link href={`/${product.id}`}>
      <AspectRatio ratio={16 / 9}>
        <div className={styles.itemWrapper}>
          <div className='absolute h-full w-full overflow-hidden rounded-xl'>
            <Image
              src={getImgurImage(product.images[0])}
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
          <div className={styles.itemContainer}>
            <div className={styles.itemInfo}>
              <div className='flex flex-row items-center justify-between'>
                <h2 className='text-lg font-semibold'>{product.title}</h2>
                <p className='text-sm font-medium'>${product.price}</p>
              </div>
              <p className='mt-auto line-clamp-2 text-sm font-medium text-secondary-foreground md:line-clamp-3'>
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </AspectRatio>
    </Link>
  );
};
