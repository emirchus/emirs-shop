'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Loading } from '@/components/loading';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Category } from '@/interfaces/category';
import { Textarea } from '@/components/ui/textarea';
import { Minus } from 'lucide-react';
import { api } from '@/api';

const formSchema = z.object({
  title: z.string().min(3, {
    message: 'Title must be at least 3 characters.'
  }),
  description: z.string().min(10, {
    message: 'Description must be at least 10 characters.'
  }),
  price: z.string().min(1, {
    message: 'Price must be at least 1.'
  }),
  category: z.string()
});

interface Props {
  categories: Category[];
}

export const CreateProductForm = ({ categories }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: '',
      description: '',
      price: '',
      title: ''
    }
  });

  const [images, setImages] = useState<string[]>([]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    console.log(images);

    const urlRegexp =
      /^(https?:\/\/)?(www\.)?(i\.imgur\.com)\/[a-zA-Z0-9]+(\.jpeg|\.png|\.jpg|\.gif|\.svg)?/;

    const product = await api.products.createProduct({
      ...values,
      categoryId: parseInt(values.category),
      images: images.filter(image => image.length > 0 && urlRegexp.test(image)),
      price: parseFloat(values.price)
    });

    if (product) {
      form.reset();
      setImages([]);
    } else {
      form.setError('title', {
        type: 'manual',
        message: 'Something went wrong. Please try again.'
      });
    }

    setIsLoading(false);
  }

  const removeImage = (index: number) => () => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-8 px-2'>
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    type='text'
                    autoComplete='title'
                    placeholder='Fantastic Product'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='price'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input type='number' autoComplete='price' placeholder='0' min={0} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='My product is fantastic because...'
                    className='resize-none'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='category'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select a category' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category.id} value={category.id.toString()}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex flex-col space-y-4'>
            {images.map((_, index) => (
              <div key={index} className='space-x-2'>
                <div className='flex flex-row items-center justify-between'>
                  <FormLabel>Image {index + 1}</FormLabel>{' '}
                  <Button variant={'outline'} size={'icon'} onClick={removeImage(index)}>
                    <Minus />
                  </Button>
                </div>

                <Input
                  type='url'
                  autoComplete='image'
                  placeholder='https://image.com'
                  onChange={e => {
                    const newImages = [...images];
                    newImages[index] = e.target.value;
                    setImages(newImages);
                  }}
                  pattern='^(https?:\/\/)?(www\.)?(i\.imgur\.com)\/[a-zA-Z0-9]+(\.jpeg|\.png|\.jpg|\.gif|\.svg)?'
                />
              </div>
            ))}
            <Button
              variant={'outline'}
              onClick={() => {
                setImages([...images, '']);
              }}
            >
              Add Image
            </Button>
          </div>
          <FormMessage />
          <Button type='submit' className='w-full' disabled={isLoading}>
            {isLoading ? <Loading /> : 'Create'}
          </Button>
        </form>
      </Form>
    </>
  );
};
