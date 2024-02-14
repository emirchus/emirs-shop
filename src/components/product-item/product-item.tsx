'use client';
import { Product } from '@/interfaces/product';
import Image from 'next/image';
import Link from 'next/link';
import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';

interface Props {
  product: Product;
  index: number;
}

export const ProductItem = ({ product, index}: Props) => {
  const [currentImage, setCurrentImage] = useState(0);

  const imageSrc = useMemo(() => {
    const currentSrc = product.images[currentImage];

    if (!currentSrc || !currentSrc.includes('imgur')) return null;

    // eslint-disable-next-line no-useless-escape
    return currentSrc.replaceAll(/[\[\]\"]/g, '');
  }, [product.images, currentImage]);

  const variants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <Link
      href={`/${product.id}`}
      onMouseEnter={() => {
        setCurrentImage(1);
      }}
      onMouseLeave={() => {
        setCurrentImage(0);
      }}
    >
      <motion.div
        variants={variants}
        initial='hidden'
        animate='visible'
        transition={{
          duration: 0.5,
          ease: 'easeInOut',
          delay: 0.1 * index
        }}
        viewport={{ amount: 0 }}
        className='group relative flex max-w-[300px] flex-col items-start justify-start overflow-hidden rounded-lg bg-card'
      >
        <div className='h-60 w-full overflow-hidden rounded-lg border-2 border-border shadow-xl'>
          {imageSrc ? (
            <Image
              alt={product.title}
              height={400}
              width={400}
              src={imageSrc}
              className='h-60 w-full origin-center object-cover transition-transform duration-300 ease-in-out hover:scale-105'
              style={{
                aspectRatio: '400/400',
                objectFit: 'cover'
              }}
            />
          ) : (
            <div className='h-60 w-full border-2 border-border bg-primary' />
          )}
        </div>
        <div className='flex flex-col items-start justify-between p-4'>
          <div className='flex flex-row items-start justify-between space-x-4'>
            <h3 className='line-clamp-2 text-start  text-lg font-semibold text-card-foreground md:text-xl'>
              {product.title}
            </h3>
            <p>${product.price}</p>
          </div>
          <div className='flex flex-1'></div>
          <p className='text-sm text-secondary-foreground'>{product.category.name}</p>
        </div>
      </motion.div>
    </Link>
  );
};
