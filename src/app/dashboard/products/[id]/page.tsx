import { api } from '@/api';
import {
  Button,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui';
import { BASE_URL, getImgurImage } from '@/lib';
import { Delete, ImagePlus, Pencil } from 'lucide-react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next/types';

interface Props {
  params: {
    id: string;
  };
}
export async function generateMetadata({ params: { id } }: Props): Promise<Metadata> {
  const product = await api.products.getOne(+id);

  if (!product) return {};

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      type: 'article',
      description: product.description,
      title: product.title,
      tags: product.category.name,
      url: `${BASE_URL}/${product.id}`,
      images: [
        {
          url: product.images[0],
          alt: product.title,
          type: 'image/jpeg',
          width: 800,
          height: 600
        }
      ]
    }
  };
}

export default async function ProductPage({ params: { id } }: Props) {
  const product = await api.products.getOne(+id);

  if (!product) notFound();

  return (
    <div className='mx-auto flex w-2/3 flex-col p-5'>
      <div className='grod-cols-1 mt-8 grid w-full gap-10 md:grid-cols-2'>
        <div className='flex flex-col'>
          <Carousel>
            <CarouselContent className='rounded-xl'>
              {product.images.map((image, index) => {
                return (
                  <CarouselItem key={index}>
                    <div className='relative h-full w-full'>
                      <div className='absolute bottom-1 left-1/2 -translate-x-1/2 transform rounded-md bg-accent/50 px-2 py-1 filter backdrop-blur-sm border-border border-2'>
                        <Button variant='ghost' size='sm' title='Edit category'>
                          <Pencil size={16} />
                        </Button>
                        <Button variant='ghost' size='sm' title='Edit category'>
                          <Delete size={16} />
                        </Button>
                      </div>
                      <Image
                        src={getImgurImage(image)}
                        alt={product.title}
                        width={800}
                        height={600}
                        className='h-full w-full origin-center rounded-md object-cover transition-transform duration-300 ease-in-out'
                        style={{
                          objectFit: 'cover'
                        }}
                      />
                    </div>
                  </CarouselItem>
                );
              })}
              <CarouselItem className='relative'>
                <div className='flex h-full w-full flex-col items-center justify-center space-y-3 rounded-md bg-accent'>
                  <input
                    type='file'
                    className='absolute z-[2] h-full w-full cursor-pointer opacity-0'
                  />
                  <ImagePlus size={64} />
                  <p className='font-normal'>Drag/Paste/Search file image</p>
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselNext />
            <CarouselPrevious />
          </Carousel>
        </div>
        <div className='flex h-full w-full flex-col pl-8'>
          <div className='flex items-center space-x-4'>
            <h2 className='text-5xl font-bold text-foreground'>{product.title}</h2>
            <Button variant='ghost' size='sm' title='Edit title'>
              <Pencil size={16} />
            </Button>
          </div>
          <div className='flex items-center space-x-4'>
            <h3 className='text-2xl font-semibold text-muted-foreground'>
              {product.category.name}
            </h3>
            <Button variant='ghost' size='sm' title='Edit category'>
              <Pencil size={16} />
            </Button>
          </div>
          <div className='flex items-center space-x-4'>
            <h3 className='text-2xl font-semibold text-muted-foreground'>${product.price}</h3>
            <Button variant='ghost' size='sm' title='Edit price'>
              <Pencil size={16} />
            </Button>
          </div>

          <hr className='my-8 w-full bg-muted' />

          <div className='flex items-center space-x-4'>
            <h4 className='text-xl font-semibold text-foreground/75'>Description</h4>
            <Button variant='ghost' size='sm' title='Edit description'>
              <Pencil size={16} />
            </Button>
          </div>
          <p className='text-lg font-normal text-secondary-foreground'>{product.description}</p>
        </div>
      </div>
    </div>
  );
}
