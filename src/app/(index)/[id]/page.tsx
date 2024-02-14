import { api } from '@/api';
import { Breadcum } from '@/components/breadcum';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { BASE_URL } from '@/lib';
import { Metadata } from 'next';
import Image from 'next/image';
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
      <div className='grod-cols-1 grid w-full md:grid-cols-2 gap-10 mt-8'>
        <div className='flex flex-col'>
          <Carousel>
            <CarouselContent>
              {product.images.map((image, index) => {
                return (
                  <CarouselItem key={index}>
                    <Image
                      src={image}
                      alt={product.title}
                      width={800}
                      height={600}
                      className='h-full w-full rounded-xl'
                    />
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  );
}
