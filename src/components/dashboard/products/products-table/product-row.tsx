'use client';

import { Button, Input } from '@/components/ui';
import { TableCell } from '@/components/ui/table';
import { Product } from '@/interfaces/product';
import { cn, getImgurImage } from '@/lib';
import { DollarSign, ReplyIcon, Share2, Trash } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { motion } from 'framer-motion';
import { Loading } from '@/components/loading';
import { deleteProduct, duplicateProduct, updateProduct } from '@/app/action';
import toast from 'react-hot-toast';

interface Props {
  product: Product;
  index: number;
}

export const ProductRow = ({ product: realProduct, index }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const [product, setProduct] = useState<Product>(realProduct);

  const onBlur = async () => {
    if (isNaN(product.price)) {
      setProduct({
        ...product,
        price: realProduct.price
      });
      return;
    }

    setIsLoading(true);
    await updateProduct(product.id, {
      price: product.price
    });
    setIsLoading(false);
  };

  const onPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (isNaN(+value)) return;

    setProduct({ ...product, price: +value });
  };

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };
  return (
    <motion.tr
      className='border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted'
      variants={variants}
      initial='hidden'
      animate='visible'
      transition={{
        duration: 0.2,
        ease: 'easeInOut',
        delay: 0.1 * index
      }}
      viewport={{ amount: 0 }}
    >
      <TableCell className='font-medium '>
        <div className='flex items-center space-x-2'>
          <div className='h-10 w-10 rounded-md bg-gray-200'>
            <Image
              src={getImgurImage(product.images[0])}
              alt={product.title}
              width={40}
              height={40}
              className='rounded-md'
            />
          </div>
          <Link
            href={`/products/${product.id}`}
            className='text-primary underline-offset-4 hover:underline'
          >
            {product.title}
          </Link>
        </div>
      </TableCell>
      <TableCell className='w-[150px]'>
        <Input placeholder='0' />
      </TableCell>
      <TableCell className='relative w-[150px]'>
        <Input
          value={product.price}
          onBlur={onBlur}
          onChange={onPriceChange}
          placeholder='0'
          className={cn('pl-5', {
            'cursor-not-allowed text-accent-foreground ring-2 ring-accent': isLoading
          })}
          type='number'
          // pattern={'/[0-9]/g'}
          disabled={isLoading}
        />
        {isLoading && (
          <div className='absolute right-3 top-1/2 -translate-y-1/2 transform'>
            <Loading />
          </div>
        )}
        <DollarSign className='absolute left-3 top-1/2 -translate-y-1/2 transform' size={14} />
      </TableCell>
      <TableCell className='space-x-2 text-right'>
        <Button variant={'outline'} size={'icon'} title='share'>
          <Share2 size={16} />
        </Button>
        <Button
          variant={'outline'}
          size={'icon'}
          title='duplicate'
          onClick={() =>
            toast.promise(duplicateProduct(product), {
              loading: 'Loading...',
              success: 'Product duplicated!',
              error: 'An error occurred while duplicating'
            })
          }
        >
          <ReplyIcon size={16} />
        </Button>
        <Button
          variant={'outline'}
          size={'icon'}
          title='delete'
          onClick={() =>
            toast.promise(deleteProduct(product.id), {
              loading: 'Deleting...',
              success: 'Product deleted!',
              error: 'An error occurred while deleting the product'
            })
          }
        >
          <Trash size={16} />
        </Button>
      </TableCell>
    </motion.tr>
  );
};
