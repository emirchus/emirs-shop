import { api } from '@/api';
import { Breadcum } from '@/components/breadcum';
import { ImageDetail } from '@/components/image-detail';
import { ProductItem } from '@/components/product-item';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { BASE_URL } from '@/lib';
import { HeartIcon, Share2Icon, ShoppingCartIcon } from 'lucide-react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

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

  const recommendedProducts = await api.products.getRecommendations();
  const bestSellers = await api.products.getNewReleased({ categoryId: product.category.id });

  return (
    <div className='mx-auto flex w-2/3 flex-col p-5'>
      <Breadcum
        paths={[
          {
            href: '/',
            name: 'Home'
          },
          {
            href: `/search?category=${product.category.id}`,
            name: product.category.name
          },
          {
            href: `/${product.id}`,
            name: product.title
          }
        ]}
      />
      <div className='grod-cols-1 mt-8 grid w-full gap-10 md:grid-cols-2'>
        <div className='flex flex-col'>
          <Carousel>
            <CarouselContent className='rounded-xl'>
              {product.images.map((image, index) => {
                return (
                  <CarouselItem key={index}>
                    <ImageDetail src={image} alt={product.title} />
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselNext />
            <CarouselPrevious />
          </Carousel>
        </div>
        <div className='flex h-full w-full flex-col pl-8'>
          <div className='mb-4 flex flex-row items-center'>
            <div className='flex flex-row items-center justify-evenly rounded-xl bg-muted px-2 py-1'>
              <Button variant={'ghost'}>
                <HeartIcon size={24} />
                <span className='ml-2'>Wishlist</span>
              </Button>
              <hr className='mx-2 h-8 w-[2px] rounded-full bg-muted-foreground/20' />
              <Button variant={'ghost'}>
                <ShoppingCartIcon size={24} />
                <span className='ml-2'>Add to cart</span>
              </Button>
            </div>
            <Button variant={'secondary'} className='ml-4'>
              <Share2Icon />
            </Button>
          </div>
          <h2 className='text-5xl font-bold text-primary-foreground'>{product.title}</h2>
          <h3 className='text-2xl font-semibold text-muted-foreground'>${product.price}</h3>
          <hr className='my-8 w-full bg-muted' />
          <h4 className='text-xl font-semibold text-primary-foreground'>Description</h4>
          <p className='text-lg font-normal text-secondary-foreground'>{product.description}</p>
        </div>
      </div>
      {bestSellers.length > 0 && (
        <section className='mt-8'>
          <h3 className='mb-4 text-3xl font-bold'>Best Selled</h3>
          <Carousel className='mx-auto w-full rounded-xl'>
            <CarouselContent>
              {bestSellers.map((product, index) => (
                <CarouselItem key={product.id} className='md:basis-1/4'>
                  <ProductItem key={product.id} product={product} index={index} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselNext />
            <CarouselPrevious />
          </Carousel>
        </section>
      )}

      <section className='mt-8'>
        <h3 className='mb-4 text-3xl font-bold'>Recommendations</h3>
        <Carousel className='mx-auto w-full rounded-xl'>
          <CarouselContent>
            {recommendedProducts.map((product, index) => (
              <CarouselItem key={product.id} className='md:basis-1/4'>
                <ProductItem key={product.id} product={product} index={index} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext />
          <CarouselPrevious />
        </Carousel>
      </section>
    </div>
  );
}
