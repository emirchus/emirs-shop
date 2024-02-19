import { Category } from '@/interfaces/category';
import { cn, generateForegroundColor, generatePastelColor } from '@/lib';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface Props {
  category: Category;
}

export const CategoryItem = ({ category }: Props) => {
  const baseColor = generatePastelColor(category.id);
  const foregroundColor = generateForegroundColor(baseColor);

  const imageIsFromImgur = category.image.includes('imgur');

  return (
    <Link href={`/search?category=${category.id}`}>
      <div
        className={cn(
          'flex h-20 w-full select-none items-center justify-between overflow-hidden rounded-md p-4 text-xl font-bold text-white hover:border-2',
          {
            'justify-center text-center': !imageIsFromImgur
          }
        )}
        style={{
          background: baseColor || 'hsl(var(--primary))',
          borderColor: foregroundColor
        }}
      >
        <h4
          className={cn({
            'text-xl': !imageIsFromImgur,
            'text-base': imageIsFromImgur
          })}
          style={{
            color: foregroundColor
          }}
        >
          {category.name}
        </h4>
        {imageIsFromImgur && (
          <Image
            src={category.image}
            width={100}
            height={100}
            alt={category.name}
            className='h-full w-auto rounded-md'
          />
        )}
      </div>
    </Link>
  );
};
