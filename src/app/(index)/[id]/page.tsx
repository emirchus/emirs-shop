import { api } from '@/api';
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
    description: product.description
  };
}

export default async function ProductPage({ params: { id } }: Props) {
  const product = await api.products.getOne(+id);

  if (!product) notFound();

  return (
    <div>
      <h1>Hello Page {id}</h1>
    </div>
  );
}
